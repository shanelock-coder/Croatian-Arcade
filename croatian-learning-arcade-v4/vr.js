'use strict';

(function () {
  const canvas = document.getElementById('vrCanvas');
  const enterButton = document.getElementById('enterVrButton');
  const resetButton = document.getElementById('vrResetButton');
  const statusEl = document.getElementById('vrStatus');
  const scoreEl = document.getElementById('vrScore');
  const roundEl = document.getElementById('vrRound');
  const promptEl = document.getElementById('vrPromptText');
  if (!canvas || !enterButton) return;

  const gl = canvas.getContext('webgl', { antialias: true, alpha: false, xrCompatible: true });
  if (!gl) {
    enterButton.disabled = true;
    statusEl.textContent = 'WebGL is unavailable in this browser.';
    return;
  }

  const state = {
    active: false,
    questions: [],
    index: 0,
    correct: 0,
    locked: false,
    current: null,
    session: null,
    refSpace: null,
    hover: -1,
    selectedFlash: -1,
    selectedCorrect: null,
    textures: { prompt: null, answers: [null,null,null] },
    panels: [
      { x: -1.35, y: 1.18, z: -2.70, w: 1.08, h: 0.62 },
      { x: 0,     y: 1.18, z: -2.70, w: 1.08, h: 0.62 },
      { x: 1.35,  y: 1.18, z: -2.70, w: 1.08, h: 0.62 }
    ],
    desktopBounds: [],
    pendingComplete: false
  };

  const vsSource = `
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    uniform mat4 uMVP;
    varying vec2 vTexCoord;
    void main(){ gl_Position = uMVP * vec4(aPosition,1.0); vTexCoord = aTexCoord; }
  `;
  const fsSource = `
    precision mediump float;
    varying vec2 vTexCoord;
    uniform vec4 uColor;
    uniform sampler2D uTexture;
    uniform float uUseTexture;
    void main(){
      vec4 tex = texture2D(uTexture, vTexCoord);
      vec4 base = mix(vec4(1.0), tex, uUseTexture);
      gl_FragColor = base * uColor;
    }
  `;

  const program = createProgram(vsSource, fsSource);
  const loc = {
    pos: gl.getAttribLocation(program,'aPosition'), uv: gl.getAttribLocation(program,'aTexCoord'),
    mvp: gl.getUniformLocation(program,'uMVP'), color: gl.getUniformLocation(program,'uColor'),
    tex: gl.getUniformLocation(program,'uTexture'), useTex: gl.getUniformLocation(program,'uUseTexture')
  };

  const quadVertices = new Float32Array([
    -0.5,-0.5,0, 0,1,   0.5,-0.5,0, 1,1,   0.5,0.5,0, 1,0,
    -0.5,-0.5,0, 0,1,   0.5,0.5,0, 1,0,  -0.5,0.5,0, 0,0
  ]);
  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer); gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
  const lineBuffer = gl.createBuffer();
  gl.enable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  function createShader(type, src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
  function createProgram(vs,fs){const p=gl.createProgram();gl.attachShader(p,createShader(gl.VERTEX_SHADER,vs));gl.attachShader(p,createShader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;}

  function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function norm(s){return String(s||'').normalize('NFC').toLocaleUpperCase('hr-HR');}

  function getChunk(){return window.KrizalicaApp?.getSelectedChunk?.() || window.CroatianCourse?.chunks?.[0];}

  function startRound() {
    const chunk = getChunk();
    const source = chunk?.runner?.length ? chunk.runner : chunk?.morph || [];
    state.questions = shuffle(source).slice(0, Math.min(5, source.length));
    state.index = 0; state.correct = 0; state.locked = false; state.pendingComplete = false;
    setQuestion();
    drawDesktop();
  }

  function setQuestion() {
    if (state.index >= state.questions.length) { completeRound(); return; }
    state.current = state.questions[state.index]; state.locked = false; state.hover = -1; state.selectedFlash=-1; state.selectedCorrect=null;
    const options = shuffle(state.current.options || []);
    state.current.displayOptions = options;
    promptEl.textContent = state.current.prompt;
    scoreEl.textContent = state.correct;
    roundEl.textContent = `${state.index + 1} / ${state.questions.length}`;
    statusEl.textContent = state.session ? 'Point at an answer and pull the trigger. Hand pinch also works when exposed as WebXR select input.' : 'Desktop preview: click one of the floating answer panels. In a headset, point and trigger.';
    updateTextures();
    if (!state.session) drawDesktop();
  }

  function choose(index) {
    if (state.locked || !state.current || index < 0 || index > 2) return;
    state.locked = true;
    const answer = state.current.displayOptions[index];
    const correct = norm(answer) === norm(state.current.answer);
    if (correct) { state.correct++; window.AudioManager?.sfxCorrect?.(); }
    else window.AudioManager?.sfxWrong?.();
    state.selectedFlash = index; state.selectedCorrect = correct;
    const explanation = correct ? `Correct — ${state.current.note || ''}` : `Not quite. Correct: ${state.current.answer}. ${state.current.note || ''}`;
    statusEl.textContent = explanation;
    updatePromptTexture(explanation, correct ? 'correct' : 'wrong');
    if (!state.session) drawDesktop();
    state.index++;
    setTimeout(() => { if (!state.pendingComplete) setQuestion(); }, 1150);
  }

  function completeRound() {
    if (state.pendingComplete) return;
    state.pendingComplete = true; state.locked = true;
    const pct = state.questions.length ? Math.round(state.correct / state.questions.length * 100) : 0;
    const msg = `Round complete — ${state.correct}/${state.questions.length} correct (${pct}%).`;
    promptEl.textContent = msg; statusEl.textContent = msg; scoreEl.textContent = state.correct; roundEl.textContent = 'Complete';
    updatePromptTexture(msg, pct >= 70 ? 'correct' : 'neutral');
    if (!state.session) drawDesktop();
    if (state.session) {
      setTimeout(async () => { try { await state.session.end(); } catch (_) {} finishRecord(pct); }, 1700);
    } else finishRecord(pct);
  }

  let recordedGuard = false;
  function finishRecord(pct) {
    if (recordedGuard) return; recordedGuard = true;
    setTimeout(()=>recordedGuard=false,1000);
    window.KrizalicaApp?.recordCompletion?.('vr', pct, 'VR Word Arena');
  }

  // ---------- Textures ----------
  function updateTextures(){updatePromptTexture(state.current?.prompt || 'Croatian VR Word Arena','neutral');for(let i=0;i<3;i++)updateAnswerTexture(i,state.current?.displayOptions?.[i]||'');}
  function makeTextCanvas(text, opts={}) {
    const c=document.createElement('canvas');c.width=opts.width||1024;c.height=opts.height||512;const x=c.getContext('2d');
    const bg=opts.bg||'#151c2d'; const fg=opts.fg||'#f7f9ff';
    x.fillStyle=bg;x.fillRect(0,0,c.width,c.height);
    x.strokeStyle=opts.border||'#6d5dfc';x.lineWidth=12;x.strokeRect(10,10,c.width-20,c.height-20);
    if(opts.kicker){x.fillStyle='#a99fff';x.font='700 30px system-ui';x.textAlign='center';x.fillText(opts.kicker.toUpperCase(),c.width/2,70);}
    x.fillStyle=fg;x.font=`800 ${opts.fontSize||58}px system-ui`;x.textAlign='center';x.textBaseline='middle';
    wrapCanvasText(x,text,c.width/2,c.height/2+(opts.kicker?22:0),c.width-110,opts.lineHeight||72);
    return c;
  }
  function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight){const words=String(text).split(/\s+/);let lines=[],line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);const start=y-(lines.length-1)*lineHeight/2;lines.slice(0,5).forEach((l,i)=>ctx.fillText(l,x,start+i*lineHeight));}
  function textureFromCanvas(c, old){if(old)gl.deleteTexture(old);const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);return t;}
  function updatePromptTexture(text,tone){const colors=tone==='correct'?['#0c3025','#32d296']:tone==='wrong'?['#35151b','#ff6d7d']:['#151c2d','#7b6cff'];state.textures.prompt=textureFromCanvas(makeTextCanvas(text,{width:1400,height:600,bg:colors[0],border:colors[1],kicker:'Croatian challenge',fontSize:54,lineHeight:65}),state.textures.prompt);}
  function updateAnswerTexture(i,text){state.textures.answers[i]=textureFromCanvas(makeTextCanvas(text,{width:800,height:430,bg:'#f8faff',fg:'#172033',border:'#9186ff',kicker:`Option ${i+1}`,fontSize:68,lineHeight:76}),state.textures.answers[i]);}

  // ---------- Matrix helpers ----------
  function identity(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);}
  function multiply(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)o[c*4+r]=a[0*4+r]*b[c*4+0]+a[1*4+r]*b[c*4+1]+a[2*4+r]*b[c*4+2]+a[3*4+r]*b[c*4+3];return o;}
  function model(tx,ty,tz,sx,sy,sz,rx=0,ry=0,rz=0){const cx=Math.cos(rx),sxr=Math.sin(rx),cy=Math.cos(ry),syr=Math.sin(ry),cz=Math.cos(rz),szr=Math.sin(rz);const r=new Float32Array([
    cy*cz, sxr*syr*cz-cx*szr, cx*syr*cz+sxr*szr,0,
    cy*szr, sxr*syr*szr+cx*cz, cx*syr*szr-sxr*cz,0,
    -syr, sxr*cy, cx*cy,0,
    0,0,0,1
  ]);r[0]*=sx;r[1]*=sx;r[2]*=sx;r[4]*=sy;r[5]*=sy;r[6]*=sy;r[8]*=sz;r[9]*=sz;r[10]*=sz;r[12]=tx;r[13]=ty;r[14]=tz;return r;}
  function perspective(fovy,aspect,near,far){const f=1/Math.tan(fovy/2),nf=1/(near-far);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)*nf,-1,0,0,(2*far*near)*nf,0]);}
  function lookAt(eye,target,up){let zx=eye[0]-target[0],zy=eye[1]-target[1],zz=eye[2]-target[2];let zl=Math.hypot(zx,zy,zz)||1;zx/=zl;zy/=zl;zz/=zl;let xx=up[1]*zz-up[2]*zy,xy=up[2]*zx-up[0]*zz,xz=up[0]*zy-up[1]*zx;let xl=Math.hypot(xx,xy,xz)||1;xx/=xl;xy/=xl;xz/=xl;let yx=zy*xz-zz*xy,yy=zz*xx-zx*xz,yz=zx*xy-zy*xx;return new Float32Array([xx,yx,zx,0,xy,yy,zy,0,xz,yz,zz,0,-(xx*eye[0]+xy*eye[1]+xz*eye[2]),-(yx*eye[0]+yy*eye[1]+yz*eye[2]),-(zx*eye[0]+zy*eye[1]+zz*eye[2]),1]);}
  function transformPoint(m,p){const x=p[0],y=p[1],z=p[2],w=1;return [m[0]*x+m[4]*y+m[8]*z+m[12]*w,m[1]*x+m[5]*y+m[9]*z+m[13]*w,m[2]*x+m[6]*y+m[10]*z+m[14]*w,m[3]*x+m[7]*y+m[11]*z+m[15]*w];}

  function bindQuad(){gl.bindBuffer(gl.ARRAY_BUFFER,quadBuffer);gl.enableVertexAttribArray(loc.pos);gl.vertexAttribPointer(loc.pos,3,gl.FLOAT,false,20,0);gl.enableVertexAttribArray(loc.uv);gl.vertexAttribPointer(loc.uv,2,gl.FLOAT,false,20,12);}
  function drawQuad(vp,m,color,texture=null){gl.useProgram(program);bindQuad();gl.uniformMatrix4fv(loc.mvp,false,multiply(vp,m));gl.uniform4fv(loc.color,color);gl.uniform1f(loc.useTex,texture?1:0);if(texture){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(loc.tex,0);}gl.drawArrays(gl.TRIANGLES,0,6);}
  function drawLine(vp,a,b,color){const data=new Float32Array([a[0],a[1],a[2],0,0,b[0],b[1],b[2],0,0]);gl.bindBuffer(gl.ARRAY_BUFFER,lineBuffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);gl.useProgram(program);gl.enableVertexAttribArray(loc.pos);gl.vertexAttribPointer(loc.pos,3,gl.FLOAT,false,20,0);gl.enableVertexAttribArray(loc.uv);gl.vertexAttribPointer(loc.uv,2,gl.FLOAT,false,20,12);gl.uniformMatrix4fv(loc.mvp,false,vp);gl.uniform4fv(loc.color,color);gl.uniform1f(loc.useTex,0);gl.lineWidth(3);gl.drawArrays(gl.LINES,0,2);}

  function renderScene(vp, controllerRays=[]) {
    // floor and back wall
    drawQuad(vp,model(0,0,-3.2,8,8,1,-Math.PI/2,0,0),[0.055,0.075,0.13,1]);
    drawQuad(vp,model(0,2.2,-4.5,8,4.5,1),[0.075,0.095,0.17,1]);
    // neon strips
    drawQuad(vp,model(-3.3,1.2,-4.45,.045,2.4,1),[0.42,0.36,1,1]);
    drawQuad(vp,model(3.3,1.2,-4.45,.045,2.4,1),[1,.42,.62,1]);
    // prompt board
    drawQuad(vp,model(0,2.15,-3.15,2.85,1.15,1),[1,1,1,1],state.textures.prompt);
    // answers
    state.panels.forEach((p,i)=>{
      let tint=[1,1,1,1];
      if(i===state.hover) tint=[0.88,0.94,1,1];
      if(i===state.selectedFlash) tint=state.selectedCorrect?[0.55,1,0.72,1]:[1,0.55,0.62,1];
      drawQuad(vp,model(p.x,p.y,p.z,p.w,p.h,1),tint,state.textures.answers[i]);
    });
    // floor marker / plinth
    drawQuad(vp,model(0,.015,-1.6,2.6,2.0,1,-Math.PI/2,0,0),[0.20,0.18,0.38,.35]);
    controllerRays.forEach(r=>drawLine(vp,r.origin,r.end,[0.55,0.48,1,0.95]));
  }

  // ---------- Desktop preview ----------
  function resizeDesktop(){const dpr=Math.min(window.devicePixelRatio||1,2);const rect=canvas.getBoundingClientRect();const w=Math.max(1,Math.round(rect.width*dpr)),h=Math.max(1,Math.round(rect.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}return {w,h,dpr};}
  function desktopVP(){const {w,h}=resizeDesktop();const proj=perspective(Math.PI/3,w/h,.05,50);const view=lookAt([0,1.65,1.55],[0,1.45,-2.7],[0,1,0]);return multiply(proj,view);}
  function drawDesktop(){if(state.session)return;const {w,h}=resizeDesktop();gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);gl.clearColor(.035,.045,.08,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const vp=desktopVP();renderScene(vp);updateDesktopBounds(vp,w,h);}
  function project(vp,p,w,h){const v=transformPoint(vp,p);if(!v[3])return null;const nx=v[0]/v[3],ny=v[1]/v[3];return {x:(nx*.5+.5)*w,y:(1-(ny*.5+.5))*h};}
  function updateDesktopBounds(vp,w,h){state.desktopBounds=state.panels.map(p=>{const a=project(vp,[p.x-p.w/2,p.y+p.h/2,p.z],w,h),b=project(vp,[p.x+p.w/2,p.y-p.h/2,p.z],w,h);return a&&b?{x1:Math.min(a.x,b.x),x2:Math.max(a.x,b.x),y1:Math.min(a.y,b.y),y2:Math.max(a.y,b.y)}:null;});}
  canvas.addEventListener('click',e=>{if(state.session||state.locked)return;const rect=canvas.getBoundingClientRect(),sx=canvas.width/rect.width,sy=canvas.height/rect.height,x=(e.clientX-rect.left)*sx,y=(e.clientY-rect.top)*sy;const i=state.desktopBounds.findIndex(b=>b&&x>=b.x1&&x<=b.x2&&y>=b.y1&&y<=b.y2);if(i>=0)choose(i);});
  canvas.addEventListener('mousemove',e=>{if(state.session)return;const rect=canvas.getBoundingClientRect(),sx=canvas.width/rect.width,sy=canvas.height/rect.height,x=(e.clientX-rect.left)*sx,y=(e.clientY-rect.top)*sy;const i=state.desktopBounds.findIndex(b=>b&&x>=b.x1&&x<=b.x2&&y>=b.y1&&y<=b.y2);if(i!==state.hover){state.hover=i;canvas.style.cursor=i>=0?'pointer':'default';drawDesktop();}});
  window.addEventListener('resize',()=>requestAnimationFrame(drawDesktop));

  // ---------- WebXR ----------
  async function detectXR() {
    if (!window.isSecureContext) {
      enterButton.disabled = true;
      enterButton.textContent = 'VR needs HTTPS';
      statusEl.textContent = 'Immersive VR requires a secure context. Host this folder on HTTPS, then open that URL in Meta Quest Browser.';
      return;
    }
    if (!navigator.xr) {
      enterButton.disabled = true; enterButton.textContent='VR not detected';
      statusEl.textContent='This browser does not expose WebXR immersive VR. The desktop 3D preview still works.';
      return;
    }
    try {
      const supported=await navigator.xr.isSessionSupported('immersive-vr');
      enterButton.disabled=!supported; enterButton.textContent=supported?'Enter VR':'Immersive VR unavailable';
      if(supported)statusEl.textContent='VR ready. On Quest, use controller rays + trigger; compatible hand input can select too.';
    } catch(err){enterButton.disabled=true;enterButton.textContent='VR unavailable';statusEl.textContent=`WebXR check failed: ${err.name||'unknown error'}.`;}
  }

  async function enterVR() {
    if (!navigator.xr || !window.isSecureContext) return;
    window.AudioManager?.enable?.(); window.AudioManager?.setContext?.('vr');
    try {
      if (gl.makeXRCompatible) await gl.makeXRCompatible();
      const session=await navigator.xr.requestSession('immersive-vr',{requiredFeatures:['local-floor'],optionalFeatures:['bounded-floor','hand-tracking']});
      state.session=session;state.refSpace=await session.requestReferenceSpace('local-floor');
      session.updateRenderState({baseLayer:new XRWebGLLayer(session,gl,{alpha:false,antialias:true,depth:true})});
      session.addEventListener('end',onXREnd);
      session.addEventListener('select',onXRSelect);
      statusEl.textContent='VR session active.';
      session.requestAnimationFrame(onXRFrame);
    } catch(err){statusEl.textContent=`Could not enter VR: ${err.message||err.name}`;state.session=null;drawDesktop();}
  }
  function onXREnd(){state.session=null;state.refSpace=null;state.hover=-1;enterButton.textContent='Enter VR';statusEl.textContent=state.pendingComplete?'VR round complete.':'VR session ended. Desktop preview is active.';drawDesktop();}
  function onXRSelect(e){if(state.locked||!state.refSpace)return;const pose=e.frame.getPose(e.inputSource.targetRaySpace,state.refSpace);if(!pose)return;const ray=poseToRay(pose.transform);const hit=rayHitPanel(ray.origin,ray.direction);if(hit>=0)choose(hit);}
  function poseToRay(transform){const p=transform.position,o=transform.orientation;const d=quatRotate([0,0,-1],[o.x,o.y,o.z,o.w]);return {origin:[p.x,p.y,p.z],direction:d};}
  function quatRotate(v,q){const [x,y,z,w]=q,[vx,vy,vz]=v;const tx=2*(y*vz-z*vy),ty=2*(z*vx-x*vz),tz=2*(x*vy-y*vx);return [vx+w*tx+(y*tz-z*ty),vy+w*ty+(z*tx-x*tz),vz+w*tz+(x*ty-y*tx)];}
  function rayHitPanel(origin,dir){if(Math.abs(dir[2])<1e-5)return -1;const t=(state.panels[0].z-origin[2])/dir[2];if(t<=0)return -1;const x=origin[0]+dir[0]*t,y=origin[1]+dir[1]*t;for(let i=0;i<state.panels.length;i++){const p=state.panels[i];if(Math.abs(x-p.x)<=p.w/2&&Math.abs(y-p.y)<=p.h/2)return i;}return -1;}
  function onXRFrame(time,frame){const session=frame.session,base=session.renderState.baseLayer,pose=frame.getViewerPose(state.refSpace);gl.bindFramebuffer(gl.FRAMEBUFFER,base.framebuffer);gl.clearColor(.025,.03,.065,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const rays=[];let hover=-1;for(const source of session.inputSources){const rp=frame.getPose(source.targetRaySpace,state.refSpace);if(rp){const r=poseToRay(rp.transform);const hit=rayHitPanel(r.origin,r.direction);if(hover<0&&hit>=0)hover=hit;rays.push({origin:r.origin,end:[r.origin[0]+r.direction[0]*4,r.origin[1]+r.direction[1]*4,r.origin[2]+r.direction[2]*4]});}}
    state.hover=hover;
    if(pose){for(const view of pose.views){const viewport=base.getViewport(view);gl.viewport(viewport.x,viewport.y,viewport.width,viewport.height);const vp=multiply(new Float32Array(view.projectionMatrix),new Float32Array(view.transform.inverse.matrix));renderScene(vp,rays);}}
    session.requestAnimationFrame(onXRFrame);
  }

  enterButton.addEventListener('click',enterVR);
  resetButton.addEventListener('click',()=>{state.pendingComplete=false;startRound();});
  window.addEventListener('krizalica-open-vr',()=>{state.active=true;state.pendingComplete=false;startRound();detectXR();});
  window.addEventListener('krizalica-close-vr',()=>{state.active=false;if(state.session){try{state.session.end();}catch(_){}}});

  // Initialise the desktop preview immediately, then the selected unit is refreshed when the mode opens.
  startRound();
  detectXR();
})();
