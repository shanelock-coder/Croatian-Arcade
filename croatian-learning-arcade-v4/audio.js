'use strict';

(function () {
  const STORAGE_KEY = 'krizalica-arcade-v4-audio';
  const state = {
    ctx: null,
    master: null,
    music: null,
    sfx: null,
    enabled: false,
    mode: 'auto',
    context: 'hub',
    volume: 0.42,
    activeTrack: null,
    ambientNodes: [],
    dnbTimer: null,
    dnbNext: 0,
    dnbStep: 0,
    noiseBuffer: null
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && ['off','ambient','dnb','auto'].includes(saved.mode)) state.mode = saved.mode;
    if (saved && Number.isFinite(saved.volume)) state.volume = Math.max(0, Math.min(1, saved.volume));
  } catch (_) {}

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode: state.mode, volume: state.volume })); } catch (_) {}
  }

  function init() {
    if (state.ctx) return state.ctx;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    const music = ctx.createGain();
    const sfx = ctx.createGain();
    master.gain.value = state.volume;
    music.gain.value = 0.62;
    sfx.gain.value = 0.85;
    music.connect(master); sfx.connect(master); master.connect(ctx.destination);
    state.ctx = ctx; state.master = master; state.music = music; state.sfx = sfx;
    state.noiseBuffer = makeNoiseBuffer(ctx);
    return ctx;
  }

  async function enable() {
    const ctx = init();
    if (!ctx) return false;
    if (ctx.state !== 'running') {
      try { await ctx.resume(); } catch (_) {}
    }
    state.enabled = ctx.state === 'running';
    applyTrack();
    emitStatus();
    return state.enabled;
  }

  function disable() {
    state.enabled = false;
    stopAllMusic();
    emitStatus();
  }

  function setMode(mode) {
    if (!['off','ambient','dnb','auto'].includes(mode)) return;
    state.mode = mode;
    save();
    if (mode === 'off') disable(); else if (state.enabled) applyTrack();
    emitStatus();
  }

  function setContext(context) {
    state.context = context || 'hub';
    if (state.enabled && state.mode === 'auto') applyTrack();
  }

  function setVolume(value) {
    state.volume = Math.max(0, Math.min(1, Number(value) || 0));
    if (state.master && state.ctx) state.master.gain.setTargetAtTime(state.volume, state.ctx.currentTime, 0.02);
    save();
    emitStatus();
  }

  function desiredTrack() {
    if (state.mode === 'off') return null;
    if (state.mode === 'ambient' || state.mode === 'dnb') return state.mode;
    return ['runner','morph','sentence','crossword','vr'].includes(state.context) ? 'dnb' : 'ambient';
  }

  function applyTrack() {
    if (!state.enabled || !state.ctx) return;
    const track = desiredTrack();
    if (track === state.activeTrack) return;
    stopAllMusic();
    if (track === 'ambient') startAmbient();
    if (track === 'dnb') startDnb();
    state.activeTrack = track;
    emitStatus();
  }

  function stopAllMusic() {
    state.activeTrack = null;
    state.ambientNodes.forEach(node => { try { node.stop?.(); } catch (_) {} try { node.disconnect?.(); } catch (_) {} });
    state.ambientNodes = [];
    if (state.dnbTimer) clearInterval(state.dnbTimer);
    state.dnbTimer = null;
  }

  function startAmbient() {
    const ctx = state.ctx;
    const bus = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    bus.gain.value = 0.08;
    filter.type = 'lowpass'; filter.frequency.value = 1050; filter.Q.value = 0.5;
    bus.connect(filter); filter.connect(state.music);
    state.ambientNodes.push(bus, filter);

    // Original generative pad: D minor-ish, deliberately simple and unobtrusive.
    [146.83, 174.61, 220.00, 293.66].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i % 2 ? 'triangle' : 'sine';
      osc.frequency.value = freq / (i === 3 ? 2 : 1);
      gain.gain.value = i === 0 ? 0.32 : 0.17;
      osc.connect(gain); gain.connect(bus); osc.start();
      state.ambientNodes.push(osc, gain);
    });

    const lfo = ctx.createOscillator(); const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08; lfoGain.gain.value = 140;
    lfo.connect(lfoGain); lfoGain.connect(filter.frequency); lfo.start();
    state.ambientNodes.push(lfo, lfoGain);
  }

  function startDnb() {
    const ctx = state.ctx;
    state.dnbStep = 0;
    state.dnbNext = ctx.currentTime + 0.06;
    const lookahead = 25;
    state.dnbTimer = setInterval(scheduleDnb, lookahead);
    scheduleDnb();
  }

  function scheduleDnb() {
    if (!state.enabled || !state.ctx || desiredTrack() !== 'dnb') return;
    const ctx = state.ctx;
    const bpm = 174;
    const stepDur = 60 / bpm / 4; // 16th notes
    while (state.dnbNext < ctx.currentTime + 0.12) {
      const s = state.dnbStep % 16;
      if (s === 0 || s === 10) kick(state.dnbNext, s === 0 ? 1 : 0.72);
      if (s === 4 || s === 12) snare(state.dnbNext);
      if (s % 2 === 0) hat(state.dnbNext, s % 4 === 2 ? 0.52 : 0.30);
      if ([0,3,6,8,11,14].includes(s)) bass(state.dnbNext, [73.42,73.42,87.31,65.41,73.42,58.27][[0,3,6,8,11,14].indexOf(s)]);
      state.dnbNext += stepDur;
      state.dnbStep++;
    }
  }

  function kick(t, strength=1) {
    const ctx = state.ctx; if (!ctx) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.11);
    g.gain.setValueAtTime(0.38 * strength, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    o.connect(g); g.connect(state.music); o.start(t); o.stop(t + 0.17);
  }

  function snare(t) {
    const ctx = state.ctx; if (!ctx) return;
    const src = ctx.createBufferSource(); const hp = ctx.createBiquadFilter(); const g = ctx.createGain();
    src.buffer = state.noiseBuffer; hp.type='highpass'; hp.frequency.value=1200;
    g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.001, t+0.12);
    src.connect(hp); hp.connect(g); g.connect(state.music); src.start(t); src.stop(t+0.14);
    const tone=ctx.createOscillator(), tg=ctx.createGain(); tone.type='triangle'; tone.frequency.value=180; tg.gain.setValueAtTime(.08,t); tg.gain.exponentialRampToValueAtTime(.001,t+.09); tone.connect(tg); tg.connect(state.music); tone.start(t); tone.stop(t+.1);
  }

  function hat(t, strength=.35) {
    const ctx=state.ctx;if(!ctx)return;const src=ctx.createBufferSource(),hp=ctx.createBiquadFilter(),g=ctx.createGain();
    src.buffer=state.noiseBuffer;hp.type='highpass';hp.frequency.value=6000;g.gain.setValueAtTime(.06*strength,t);g.gain.exponentialRampToValueAtTime(.001,t+.035);src.connect(hp);hp.connect(g);g.connect(state.music);src.start(t);src.stop(t+.04);
  }

  function bass(t, freq) {
    const ctx=state.ctx;if(!ctx)return;const o=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
    o.type='sawtooth';o.frequency.setValueAtTime(freq,t);lp.type='lowpass';lp.frequency.value=180;lp.Q.value=2.2;g.gain.setValueAtTime(.095,t);g.gain.exponentialRampToValueAtTime(.001,t+.13);o.connect(lp);lp.connect(g);g.connect(state.music);o.start(t);o.stop(t+.14);
  }

  function makeNoiseBuffer(ctx) {
    const len = ctx.sampleRate * 0.3; const b = ctx.createBuffer(1, len, ctx.sampleRate); const d=b.getChannelData(0);
    for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    return b;
  }

  function sfxCorrect() {
    if (!state.enabled || !state.ctx) return;
    const t=state.ctx.currentTime;
    [523.25,659.25,783.99].forEach((f,i)=>tone(f,t+i*.045,.055,'sine',.16));
  }
  function sfxWrong() {
    if (!state.enabled || !state.ctx) return;
    const t=state.ctx.currentTime; tone(180,t,.08,'square',.09);tone(140,t+.06,.11,'square',.07);
  }
  function sfxClick() { if(state.enabled&&state.ctx) tone(440,state.ctx.currentTime,.025,'sine',.035); }
  function tone(freq,t,dur,type,vol){const o=state.ctx.createOscillator(),g=state.ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(state.sfx);o.start(t);o.stop(t+dur+.02);}

  function emitStatus() { window.dispatchEvent(new CustomEvent('krizalica-audio-status', { detail: getStatus() })); }
  function getStatus() { return { enabled: state.enabled, mode: state.mode, track: state.activeTrack, volume: state.volume, supported: !!(window.AudioContext||window.webkitAudioContext) }; }

  window.AudioManager = { enable, disable, setMode, setContext, setVolume, sfxCorrect, sfxWrong, sfxClick, getStatus };
})();
