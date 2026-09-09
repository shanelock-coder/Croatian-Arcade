'use strict';

(function () {
  const course = window.CroatianCourse;
  const engine = window.CrosswordEngine;
  if (!course || !engine) {
    document.body.innerHTML = '<main style="font-family:sans-serif;padding:40px"><h1>Game files did not load.</h1><p>Keep index.html, course.js, crossword.js, vocabulary.js, app.js and style.css in the same folder.</p></main>';
    return;
  }

  const $ = id => document.getElementById(id);
  const screens = ['hubScreen','lessonScreen','morphScreen','sentenceScreen','runnerScreen','vrScreen','crosswordScreen'];
  const STORAGE_KEY = 'krizalica-arcade-v3-progress';

  const els = {
    globalXp: $('globalXp'), globalStars: $('globalStars'), courseRing: $('courseRing'), coursePercent: $('coursePercent'), courseProgressLabel: $('courseProgressLabel'),
    unitPath: $('unitPath'), selectedUnitNumber: $('selectedUnitNumber'), selectedUnitLevel: $('selectedUnitLevel'), selectedUnitCase: $('selectedUnitCase'), selectedUnitTitle: $('selectedUnitTitle'), selectedUnitDescription: $('selectedUnitDescription'), selectedUnitStars: $('selectedUnitStars'),
    brandHome: $('brandHome'), brandMark: $('brandMark'), themeToggle: $('themeToggle'), vrQuickButton: $('vrQuickButton'), toast: $('toast'),
    musicToggle: $('musicToggle'), musicPopover: $('musicPopover'), musicClose: $('musicClose'), musicModeGrid: $('musicModeGrid'), musicVolume: $('musicVolume'), musicStatus: $('musicStatus'),
    completionModal: $('completionModal'), completionTitle: $('completionTitle'), completionText: $('completionText'), completionXp: $('completionXp'), completionStars: $('completionStars'), completionHome: $('completionHome'), completionReplay: $('completionReplay'),
    hunterEgg: $('hunterEgg'), closeEgg: $('closeEgg'),
    lessonUnitBadge: $('lessonUnitBadge'), lessonCase: $('lessonCase'), lessonTitle: $('lessonTitle'), lessonDescription: $('lessonDescription'), lessonRule: $('lessonRule'), lessonExamples: $('lessonExamples'), lessonTips: $('lessonTips'), lessonQuestion: $('lessonQuestion'), lessonAnswers: $('lessonAnswers'), lessonFeedback: $('lessonFeedback'),
    morphScore: $('morphScore'), morphLives: $('morphLives'), morphBase: $('morphBase'), morphPrompt: $('morphPrompt'), morphOptions: $('morphOptions'), morphFeedback: $('morphFeedback'),
    sentenceScore: $('sentenceScore'), sentenceStreak: $('sentenceStreak'), sentenceEnglish: $('sentenceEnglish'), sentenceBuild: $('sentenceBuild'), sentenceTiles: $('sentenceTiles'), sentenceUndo: $('sentenceUndo'), sentenceReset: $('sentenceReset'), sentenceCheck: $('sentenceCheck'), sentenceFeedback: $('sentenceFeedback'),
    runnerScore: $('runnerScore'), runnerPrompt: $('runnerPrompt'), runnerLives: $('runnerLives'), runnerRound: $('runnerRound'), runnerCanvas: $('runnerCanvas'), runnerFeedback: $('runnerFeedback'),
    cwUnitBadge: $('cwUnitBadge'), cwActiveClue: $('cwActiveClue'), cwPercent: $('cwPercent'), cwProgressBar: $('cwProgressBar'), grid: $('crosswordGrid'), keyboard: $('onscreenKeyboard'), across: $('acrossClues'), down: $('downClues'), cwCheck: $('cwCheck'), cwRevealLetter: $('cwRevealLetter'), cwRevealWord: $('cwRevealWord'), cwReset: $('cwReset'), cwNew: $('cwNew'), cwFeedback: $('cwFeedback')
  };

  const defaultProgress = () => ({ xp: 0, unlocked: 1, selectedUnit: 'unit1', completed: {}, theme: 'light' });
  let progress = loadProgress();
  let selectedChunk = findChunk(progress.selectedUnit) || course.chunks[0];
  let currentMode = 'hub';
  let toastTimer = null;
  let secretBuffer = '';
  let brandClicks = 0;
  let brandClickTimer = null;

  const morphState = { questions: [], index: 0, correct: 0, lives: 3, locked: false };
  const sentenceState = { questions: [], index: 0, correct: 0, streak: 0, chosen: [], tiles: [], locked: false };
  const runnerState = { active: false, questions: [], index: 0, correct: 0, lives: 3, resolving: false, animation: null, keys: { left: false, right: false }, player: null, platforms: [], current: null };
  const cwState = { puzzle: null, selected: null, selectedWordId: null, revealed: new Set() };

  function loadProgress() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Object.assign(defaultProgress(), raw || {});
    } catch (_) { return defaultProgress(); }
  }
  function saveProgress() {
    progress.selectedUnit = selectedChunk.id;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
  function findChunk(id) { return course.chunks.find(c => c.id === id); }
  function chunkRecord(id) {
    if (!progress.completed[id]) progress.completed[id] = { modes: {}, best: {} };
    return progress.completed[id];
  }
  function starCount(id) { return Object.keys(chunkRecord(id).modes || {}).length; }
  function totalStars() { return course.chunks.reduce((n,c) => n + starCount(c.id), 0); }
  function isUnlocked(chunk) { return chunk.order <= progress.unlocked; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i],a[j]] = [a[j],a[i]]; }
    return a;
  }
  function titleCase(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
  function chars(s) { return Array.from(String(s).normalize('NFC')); }
  function norm(s) { return String(s || '').normalize('NFC').toLocaleUpperCase('hr-HR'); }

  function showScreen(id) {
    const previousMode = currentMode;
    stopRunner();
    screens.forEach(s => $(s).hidden = s !== id);
    currentMode = id.replace('Screen','');
    if (previousMode === 'vr' && currentMode !== 'vr') window.dispatchEvent(new CustomEvent('krizalica-close-vr'));
    window.AudioManager?.setContext?.(currentMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function showHub() { showScreen('hubScreen'); renderHub(); }
  function toast(message, tone = '') {
    clearTimeout(toastTimer); els.toast.textContent = message; els.toast.className = `toast ${tone}`.trim(); els.toast.hidden = false;
    toastTimer = setTimeout(() => els.toast.hidden = true, 2300);
  }
  function setFeedback(el, text, tone='') { el.textContent = text; el.className = `feedback ${tone}`.trim(); if (tone === 'good') window.AudioManager?.sfxCorrect?.(); else if (tone === 'bad') window.AudioManager?.sfxWrong?.(); }

  function renderHub() {
    els.globalXp.textContent = progress.xp;
    els.globalStars.textContent = totalStars();
    const completedUnits = course.chunks.filter(c => starCount(c.id) >= 2).length;
    const pct = Math.round((completedUnits / course.chunks.length) * 100);
    els.coursePercent.textContent = `${pct}%`;
    els.courseRing.style.setProperty('--pct', `${pct * 3.6}deg`);
    els.courseProgressLabel.textContent = `Unit ${Math.min(progress.unlocked, course.chunks.length)} of ${course.chunks.length}`;
    els.unitPath.innerHTML = '';
    course.chunks.forEach(chunk => {
      const locked = !isUnlocked(chunk);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `unit-node ${selectedChunk.id === chunk.id ? 'active' : ''} ${locked ? 'locked' : ''}`;
      button.disabled = locked;
      button.innerHTML = `<div class="node-top"><span class="node-num">${String(chunk.order).padStart(2,'0')}</span><span class="node-lock">${locked ? '🔒' : '✓'}</span></div><strong>${chunk.title}</strong><small>${chunk.subtitle}</small><div class="node-stars">${'★'.repeat(Math.min(6,starCount(chunk.id)))}${'☆'.repeat(Math.max(0,6-starCount(chunk.id)))}</div>`;
      if (!locked) button.addEventListener('click', () => { selectedChunk = chunk; saveProgress(); renderHub(); });
      els.unitPath.appendChild(button);
    });
    els.selectedUnitNumber.textContent = String(selectedChunk.order).padStart(2,'0');
    els.selectedUnitLevel.textContent = selectedChunk.level;
    els.selectedUnitCase.textContent = selectedChunk.caseName;
    els.selectedUnitTitle.textContent = selectedChunk.title;
    els.selectedUnitDescription.textContent = selectedChunk.description;
    els.selectedUnitStars.textContent = `${starCount(selectedChunk.id)} / 6`;
  }

  function recordCompletion(mode, scorePct, label) {
    const record = chunkRecord(selectedChunk.id);
    const firstStar = scorePct >= 70 && !record.modes[mode];
    const previousBest = record.best[mode] || 0;
    record.best[mode] = Math.max(previousBest, Math.round(scorePct));
    let earnedXp = Math.max(10, Math.round(scorePct * (firstStar ? 1.2 : .25)));
    let stars = 0;
    if (firstStar) { record.modes[mode] = true; stars = 1; earnedXp += 40; }
    progress.xp += earnedXp;
    if (starCount(selectedChunk.id) >= 2 && progress.unlocked < selectedChunk.order + 1 && selectedChunk.order < course.chunks.length) {
      progress.unlocked = selectedChunk.order + 1;
    }
    saveProgress();
    showCompletion(label, scorePct, earnedXp, stars);
  }

  function showCompletion(label, scorePct, earnedXp, stars) {
    els.completionTitle.textContent = scorePct >= 90 ? 'Excellent round' : scorePct >= 70 ? 'Chunk cleared' : 'Round complete';
    els.completionText.textContent = `${label} — ${Math.round(scorePct)}%. ${scorePct >= 70 ? 'This result counts toward the unit.' : 'Try again for 70% or better to earn the unit star.'}`;
    els.completionXp.textContent = `+${earnedXp}`;
    els.completionStars.textContent = `+${stars} ★`;
    els.completionModal.hidden = false;
  }

  function replayCurrent() {
    els.completionModal.hidden = true;
    if (currentMode === 'lesson') openLesson();
    else if (currentMode === 'morph') openMorph();
    else if (currentMode === 'sentence') openSentence();
    else if (currentMode === 'runner') openRunner();
    else if (currentMode === 'vr') openVr();
    else if (currentMode === 'crossword') openCrossword();
    else showHub();
  }

  // ---------- Lesson ----------
  function openLesson() {
    showScreen('lessonScreen');
    els.lessonUnitBadge.textContent = `Unit ${selectedChunk.order}`;
    els.lessonCase.textContent = `${selectedChunk.level} · ${selectedChunk.caseName}`;
    els.lessonTitle.textContent = selectedChunk.title;
    els.lessonDescription.textContent = selectedChunk.description;
    els.lessonRule.textContent = selectedChunk.rule;
    els.lessonExamples.innerHTML = selectedChunk.examples.map(([hr,en]) => `<div class="example-item"><strong>${hr}</strong><span>${en}</span></div>`).join('');
    els.lessonTips.innerHTML = selectedChunk.tips.map(t => `<li>${t}</li>`).join('');
    const q = shuffle(selectedChunk.morph)[0];
    els.lessonQuestion.textContent = q.prompt;
    els.lessonAnswers.innerHTML = '';
    setFeedback(els.lessonFeedback,'');
    shuffle(q.options).forEach(option => {
      const b = document.createElement('button'); b.type='button'; b.className='choice-button'; b.textContent=option;
      b.addEventListener('click', () => {
        Array.from(els.lessonAnswers.children).forEach(x => x.disabled = true);
        if (norm(option) === norm(q.answer)) {
          b.classList.add('correct'); setFeedback(els.lessonFeedback, `Correct. ${q.note}`, 'good');
          setTimeout(() => recordCompletion('lesson',100,'Lesson quick check'), 600);
        } else {
          b.classList.add('wrong');
          Array.from(els.lessonAnswers.children).find(x => norm(x.textContent) === norm(q.answer))?.classList.add('correct');
          setFeedback(els.lessonFeedback, `The correct form is ${q.answer}. ${q.note}`, 'bad');
          setTimeout(() => recordCompletion('lesson',60,'Lesson quick check'), 900);
        }
      });
      els.lessonAnswers.appendChild(b);
    });
  }

  // ---------- Word Morph ----------
  function openMorph() {
    showScreen('morphScreen');
    morphState.questions = shuffle(selectedChunk.morph).slice(0, Math.min(6, selectedChunk.morph.length));
    morphState.index = 0; morphState.correct = 0; morphState.lives = 3; morphState.locked = false;
    renderMorph();
  }
  function renderMorph() {
    if (morphState.index >= morphState.questions.length || morphState.lives <= 0) {
      const pct = (morphState.correct / morphState.questions.length) * 100;
      recordCompletion('morph', pct, 'Word Morph'); return;
    }
    const q = morphState.questions[morphState.index];
    morphState.locked = false;
    els.morphScore.textContent = `${morphState.correct} / ${morphState.questions.length}`;
    els.morphLives.textContent = `${'♥ '.repeat(morphState.lives)}${'♡ '.repeat(3-morphState.lives)}`.trim();
    els.morphBase.textContent = q.base.toLocaleUpperCase('hr-HR'); els.morphPrompt.textContent = q.prompt;
    els.morphOptions.innerHTML=''; setFeedback(els.morphFeedback,'');
    shuffle(q.options).forEach(option => {
      const b=document.createElement('button');b.type='button';b.className='choice-button';b.textContent=option;
      b.addEventListener('click',()=>answerMorph(b,option,q)); els.morphOptions.appendChild(b);
    });
  }
  function answerMorph(button, option, q) {
    if (morphState.locked) return; morphState.locked = true;
    Array.from(els.morphOptions.children).forEach(x=>x.disabled=true);
    if(norm(option)===norm(q.answer)) { morphState.correct++; button.classList.add('correct'); setFeedback(els.morphFeedback,`Correct — ${q.note}`,'good'); }
    else { morphState.lives--; button.classList.add('wrong'); Array.from(els.morphOptions.children).find(x=>norm(x.textContent)===norm(q.answer))?.classList.add('correct'); setFeedback(els.morphFeedback,`${q.answer} is the form you need. ${q.note}`,'bad'); }
    morphState.index++; setTimeout(renderMorph,950);
  }

  // ---------- Sentence Builder ----------
  function openSentence() {
    showScreen('sentenceScreen');
    sentenceState.questions = shuffle(selectedChunk.sentences).slice(0, Math.min(5, selectedChunk.sentences.length));
    sentenceState.index=0; sentenceState.correct=0; sentenceState.streak=0; sentenceState.locked=false; renderSentence();
  }
  function renderSentence() {
    if (sentenceState.index >= sentenceState.questions.length) { recordCompletion('sentence',(sentenceState.correct/sentenceState.questions.length)*100,'Sentence Builder'); return; }
    const q=sentenceState.questions[sentenceState.index]; sentenceState.chosen=[]; sentenceState.locked=false;
    const rawTiles = q.answer.map((text,i)=>({id:`a${i}-${Math.random()}`,text,answer:true})).concat((q.distractors||[]).map((text,i)=>({id:`d${i}-${Math.random()}`,text,answer:false})));
    sentenceState.tiles=shuffle(rawTiles);
    els.sentenceScore.textContent=`${sentenceState.correct} / ${sentenceState.questions.length}`; els.sentenceStreak.textContent=`${sentenceState.streak} streak`; els.sentenceEnglish.textContent=q.english;
    setFeedback(els.sentenceFeedback,''); renderSentenceTiles();
  }
  function renderSentenceTiles() {
    els.sentenceBuild.innerHTML='';
    if(!sentenceState.chosen.length){const p=document.createElement('span');p.className='sentence-placeholder';p.textContent='Choose tiles below…';els.sentenceBuild.appendChild(p);}
    else sentenceState.chosen.forEach(t=>{const b=document.createElement('button');b.type='button';b.className='word-tile built-tile';b.textContent=t.text;b.addEventListener('click',()=>removeChosen(t.id));els.sentenceBuild.appendChild(b);});
    els.sentenceTiles.innerHTML='';
    sentenceState.tiles.forEach(t=>{const b=document.createElement('button');b.type='button';b.className=`word-tile ${sentenceState.chosen.some(c=>c.id===t.id)?'used':''}`;b.textContent=t.text;b.disabled=sentenceState.locked;b.addEventListener('click',()=>addChosen(t.id));els.sentenceTiles.appendChild(b);});
  }
  function addChosen(id){if(sentenceState.locked)return;const t=sentenceState.tiles.find(x=>x.id===id);if(!t||sentenceState.chosen.some(x=>x.id===id))return;sentenceState.chosen.push(t);renderSentenceTiles();}
  function removeChosen(id){if(sentenceState.locked)return;sentenceState.chosen=sentenceState.chosen.filter(x=>x.id!==id);renderSentenceTiles();}
  function resetSentenceChoice(){if(sentenceState.locked)return;sentenceState.chosen=[];renderSentenceTiles();}
  function checkSentence(){
    if(sentenceState.locked)return;const q=sentenceState.questions[sentenceState.index];
    if(!sentenceState.chosen.length){toast('Choose some word tiles first.','bad');return;}
    sentenceState.locked=true;const built=sentenceState.chosen.map(x=>norm(x.text));const answer=q.answer.map(norm);const correct=built.length===answer.length&&built.every((x,i)=>x===answer[i]);
    if(correct){sentenceState.correct++;sentenceState.streak++;setFeedback(els.sentenceFeedback,`Correct: ${q.answer.join(' ')}.`,'good');}
    else{sentenceState.streak=0;setFeedback(els.sentenceFeedback,`Correct sentence: ${q.answer.join(' ')}.`,'bad');}
    sentenceState.index++;renderSentenceTiles();setTimeout(renderSentence,1050);
  }

  // ---------- Case Runner ----------
  const ctx = els.runnerCanvas.getContext('2d');
  function openRunner(){
    showScreen('runnerScreen'); runnerState.questions=shuffle(selectedChunk.runner).slice(0,Math.min(5,selectedChunk.runner.length)); runnerState.index=0;runnerState.correct=0;runnerState.lives=3;runnerState.resolving=false;runnerState.active=true;setRunnerQuestion(); startRunnerLoop();
  }
  function setRunnerQuestion(){
    if(runnerState.index>=runnerState.questions.length||runnerState.lives<=0){stopRunner();recordCompletion('runner',(runnerState.correct/runnerState.questions.length)*100,'Case Runner');return;}
    runnerState.current=runnerState.questions[runnerState.index]; runnerState.resolving=false;
    els.runnerPrompt.textContent=runnerState.current.prompt; els.runnerScore.textContent=runnerState.correct; els.runnerLives.textContent=`${'♥ '.repeat(runnerState.lives)}${'♡ '.repeat(3-runnerState.lives)}`.trim(); els.runnerRound.textContent=`${runnerState.index+1} / ${runnerState.questions.length}`; setFeedback(els.runnerFeedback,'Run and jump onto the correct platform.');
    const options=shuffle(runnerState.current.options);
    runnerState.platforms=options.map((label,i)=>({x:[55,340,625][i],y:300,w:220,h:22,label,correct:norm(label)===norm(runnerState.current.answer)}));
    resetRunnerPlayer();
  }
  function resetRunnerPlayer(){runnerState.player={x:436,y:378,w:28,h:36,vx:0,vy:0,onGround:true};runnerState.keys.left=false;runnerState.keys.right=false;}
  function startRunnerLoop(){if(runnerState.animation)cancelAnimationFrame(runnerState.animation);const loop=()=>{if(!runnerState.active)return;updateRunner();drawRunner();runnerState.animation=requestAnimationFrame(loop)};loop();}
  function stopRunner(){runnerState.active=false;runnerState.keys.left=false;runnerState.keys.right=false;if(runnerState.animation){cancelAnimationFrame(runnerState.animation);runnerState.animation=null;}}
  function jumpRunner(){if(!runnerState.active||runnerState.resolving)return;if(runnerState.player.onGround){runnerState.player.vy=-13.2;runnerState.player.onGround=false;}}
  function updateRunner(){
    const p=runnerState.player;if(!p)return;const prevBottom=p.y+p.h;
    p.vx=runnerState.keys.left?-5.7:runnerState.keys.right?5.7:0;p.x+=p.vx;p.x=Math.max(0,Math.min(900-p.w,p.x));p.vy+=.65;p.y+=p.vy;p.onGround=false;
    let landed=false;
    for(const plat of runnerState.platforms){const newBottom=p.y+p.h;const overlap=p.x+p.w>plat.x&&p.x<plat.x+plat.w;if(p.vy>=0&&overlap&&prevBottom<=plat.y&&newBottom>=plat.y){p.y=plat.y-p.h;p.vy=0;p.onGround=true;landed=true;if(!runnerState.resolving)evaluateRunnerPlatform(plat);break;}}
    const floorY=414;if(!landed&&p.y+p.h>=floorY){p.y=floorY-p.h;p.vy=0;p.onGround=true;}
    if(p.y>470)resetRunnerPlayer();
  }
  function evaluateRunnerPlatform(plat){
    runnerState.resolving=true;
    if(plat.correct){runnerState.correct++;setFeedback(els.runnerFeedback,`Correct — ${runnerState.current.note}`,'good');}
    else{runnerState.lives--;setFeedback(els.runnerFeedback,`Not this one. ${runnerState.current.answer} is correct. ${runnerState.current.note}`,'bad');}
    runnerState.index++;setTimeout(()=>{if(runnerState.active)setRunnerQuestion();},1100);
  }
  function drawRunner(){
    const c=ctx;c.clearRect(0,0,900,440);
    const grd=c.createLinearGradient(0,0,0,440);grd.addColorStop(0,'#9dd7ff');grd.addColorStop(1,'#e8f4ff');c.fillStyle=grd;c.fillRect(0,0,900,440);
    c.fillStyle='rgba(255,255,255,.5)';[[100,70,75],[280,110,54],[700,70,85]].forEach(([x,y,r])=>{c.beginPath();c.arc(x,y,r/2,0,Math.PI*2);c.arc(x+r*.35,y+4,r*.38,0,Math.PI*2);c.fill();});
    c.fillStyle='#7db866';c.fillRect(0,414,900,26);c.fillStyle='#6aa256';c.fillRect(0,414,900,6);
    runnerState.platforms.forEach(plat=>{c.fillStyle='#ffffff';c.strokeStyle='rgba(32,52,86,.18)';c.lineWidth=2;c.beginPath();c.roundRect(plat.x,plat.y,plat.w,plat.h,8);c.fill();c.stroke();c.fillStyle='#24324a';c.font='700 20px system-ui';c.textAlign='center';c.textBaseline='bottom';c.fillText(plat.label,plat.x+plat.w/2,plat.y-8);});
    const p=runnerState.player;if(p){c.fillStyle='#6d5dfc';c.beginPath();c.roundRect(p.x,p.y,p.w,p.h,8);c.fill();c.fillStyle='#fff';c.fillRect(p.x+7,p.y+9,4,4);c.fillRect(p.x+18,p.y+9,4,4);c.fillStyle='#f4c542';c.fillRect(p.x+5,p.y-5,18,8);}
  }

  // ---------- VR Word Arena ----------
  function openVr() {
    showScreen('vrScreen');
    window.dispatchEvent(new CustomEvent('krizalica-open-vr'));
  }

  // ---------- Crossword ----------
  function openCrossword(){showScreen('crosswordScreen');els.cwUnitBadge.textContent=`Unit ${selectedChunk.order}`;generateChunkCrossword();}
  function generateChunkCrossword(){
    try{
      const pool=course.crosswordEntries(selectedChunk);const target=Math.min(9,pool.length);cwState.puzzle=engine.generateCrossword(pool,target,{maxAttempts:180});cwState.selected=null;cwState.selectedWordId=null;cwState.revealed.clear();renderCrossword();selectFirstCw();updateCwProgress();setFeedback(els.cwFeedback,`${cwState.puzzle.words.length} validated answers from this unit.`,'good');
    }catch(err){console.error(err);setFeedback(els.cwFeedback,'Could not build this crossword. Press New puzzle to retry.','bad');}
  }
  function renderCrossword(){
    const p=cwState.puzzle;els.grid.innerHTML='';els.grid.style.setProperty('--cols',p.cols);els.across.innerHTML='';els.down.innerHTML='';
    for(let r=0;r<p.rows;r++)for(let c=0;c<p.cols;c++){
      const d=p.grid[r][c],cell=document.createElement('div');cell.className='crossword-cell';cell.dataset.row=r;cell.dataset.col=c;
      if(!d){cell.classList.add('block');els.grid.appendChild(cell);continue;}
      if(d.number!==null){const n=document.createElement('span');n.className='cell-number';n.textContent=d.number;cell.appendChild(n);}
      const input=document.createElement('input');input.type='text';input.maxLength=2;input.className='cell-input';input.dataset.row=r;input.dataset.col=c;input.autocomplete='off';input.spellcheck=false;input.addEventListener('focus',()=>selectCwCell(r,c,false));input.addEventListener('click',()=>selectCwCell(r,c,true));input.addEventListener('input',onCwInput);input.addEventListener('keydown',onCwKeyDown);cell.appendChild(input);els.grid.appendChild(cell);
    }
    p.words.slice().sort((a,b)=>a.number-b.number).forEach(w=>{const li=document.createElement('li');li.dataset.wordId=w.id;li.innerHTML=`<span class="clue-num">${w.number}.</span><span>${w.clue}</span>`;li.addEventListener('click',()=>selectCwWord(w.id,true));(w.direction==='across'?els.across:els.down).appendChild(li);});
  }
  function cwCell(r,c){return cwState.puzzle?.grid?.[r]?.[c]||null;}
  function cwInput(r,c){return els.grid.querySelector(`.cell-input[data-row="${r}"][data-col="${c}"]`);}
  function cwWord(id){return cwState.puzzle?.words?.find(w=>w.id===id);}
  function cwWordsFor(r,c){const d=cwCell(r,c);return d?[d.across,d.down].filter(x=>x!==null&&x!==undefined):[];}
  function cwWordCells(w){return w.letters.map((_,i)=>({r:w.row+(w.direction==='down'?i:0),c:w.col+(w.direction==='across'?i:0)}));}
  function selectFirstCw(){const w=cwState.puzzle.words.slice().sort((a,b)=>a.number-b.number)[0];if(w)selectCwWord(w.id,true);}
  function selectCwCell(r,c,cycle){const ids=cwWordsFor(r,c);if(!ids.length)return;const same=cwState.selected&&cwState.selected.r===r&&cwState.selected.c===c;cwState.selected={r,c};if(ids.length===1)cwState.selectedWordId=ids[0];else if(cycle&&same){const idx=Math.max(0,ids.indexOf(cwState.selectedWordId));cwState.selectedWordId=ids[(idx+1)%ids.length];}else if(!ids.includes(cwState.selectedWordId))cwState.selectedWordId=ids[0];updateCwHighlights();}
  function selectCwWord(id,focus){const w=cwWord(id);if(!w)return;cwState.selectedWordId=id;cwState.selected={r:w.row,c:w.col};updateCwHighlights();if(focus)cwInput(w.row,w.col)?.focus();}
  function updateCwHighlights(){
    els.grid.querySelectorAll('.crossword-cell').forEach(x=>x.classList.remove('selected','active-word'));els.across.querySelectorAll('li').forEach(x=>x.classList.remove('active'));els.down.querySelectorAll('li').forEach(x=>x.classList.remove('active'));
    const w=cwWord(cwState.selectedWordId);if(w){cwWordCells(w).forEach(({r,c})=>els.grid.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`)?.classList.add('active-word'));document.querySelector(`li[data-word-id="${w.id}"]`)?.classList.add('active');els.cwActiveClue.textContent=`${w.number} ${titleCase(w.direction)} — ${w.clue}`;}
    if(cwState.selected)els.grid.querySelector(`.crossword-cell[data-row="${cwState.selected.r}"][data-col="${cwState.selected.c}"]`)?.classList.add('selected');
  }
  function setCwValue(r,c,value,advance=true){const input=cwInput(r,c);if(!input||input.disabled)return;const v=chars(value)[0];if(!v)return;input.value=norm(v);input.classList.remove('correct','incorrect');cwState.selected={r,c};updateCwProgress();if(advance)advanceCw(1);}
  function advanceCw(step){const w=cwWord(cwState.selectedWordId);if(!w||!cwState.selected)return;const cells=cwWordCells(w);let i=cells.findIndex(x=>x.r===cwState.selected.r&&x.c===cwState.selected.c);if(i<0)i=0;let next=i+step;while(next>=0&&next<cells.length){const pos=cells[next],inp=cwInput(pos.r,pos.c);if(inp&&!inp.disabled){cwState.selected=pos;inp.focus();updateCwHighlights();return;}next+=step;}}
  function onCwInput(e){const r=+e.target.dataset.row,c=+e.target.dataset.col,v=chars(e.target.value).pop();e.target.value='';if(v&&/^[A-Za-zČĆĐŠŽčćđšž]$/u.test(v))setCwValue(r,c,v,true);}
  function onCwKeyDown(e){const r=+e.target.dataset.row,c=+e.target.dataset.col;if(e.key==='Backspace'){e.preventDefault();if(e.target.value)e.target.value='';else advanceCw(-1);updateCwProgress();return;}if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();moveCwSpatial(r,c,e.key);}}
  function moveCwSpatial(r,c,key){const d={ArrowLeft:[0,-1],ArrowRight:[0,1],ArrowUp:[-1,0],ArrowDown:[1,0]}[key];let rr=r+d[0],cc=c+d[1];while(rr>=0&&cc>=0&&rr<cwState.puzzle.rows&&cc<cwState.puzzle.cols){if(cwCell(rr,cc)){cwState.selected={r:rr,c:cc};cwInput(rr,cc)?.focus();updateCwHighlights();return;}rr+=d[0];cc+=d[1];}}
  function updateCwProgress(){if(!cwState.puzzle)return;let total=0,filled=0;for(let r=0;r<cwState.puzzle.rows;r++)for(let c=0;c<cwState.puzzle.cols;c++)if(cwCell(r,c)){total++;if(cwInput(r,c)?.value)filled++;}const pct=total?Math.round(filled/total*100):0;els.cwPercent.textContent=`${pct}%`;els.cwProgressBar.style.width=`${pct}%`;}
  function checkCw(){
    if(!cwState.puzzle)return;let total=0,correct=0,wrong=0,blank=0;
    for(let r=0;r<cwState.puzzle.rows;r++)for(let c=0;c<cwState.puzzle.cols;c++){const d=cwCell(r,c);if(!d)continue;total++;const inp=cwInput(r,c);inp.classList.remove('correct','incorrect');if(!inp.value){blank++;continue;}if(norm(inp.value)===norm(d.solution)){correct++;inp.classList.add('correct');}else{wrong++;inp.classList.add('incorrect');}}
    const pct=Math.round(correct/total*100);setFeedback(els.cwFeedback,`${correct}/${total} letters correct · ${wrong} wrong · ${blank} blank`,wrong?'bad':'good');if(correct===total){recordCompletion('crossword',100,'Chunk Crossword');}
  }
  function revealCwLetter(){if(!cwState.selected)return;const {r,c}=cwState.selected,d=cwCell(r,c),inp=cwInput(r,c);if(!d||!inp)return;inp.value=d.solution;inp.disabled=true;inp.classList.add('revealed');cwState.revealed.add(`${r},${c}`);updateCwProgress();advanceCw(1);}
  function revealCwWord(){const w=cwWord(cwState.selectedWordId);if(!w)return;cwWordCells(w).forEach(({r,c})=>{const inp=cwInput(r,c),d=cwCell(r,c);inp.value=d.solution;inp.disabled=true;inp.classList.add('revealed');cwState.revealed.add(`${r},${c}`)});updateCwProgress();}
  function resetCw(){if(!cwState.puzzle)return;els.grid.querySelectorAll('.cell-input').forEach(inp=>{inp.value='';inp.disabled=false;inp.classList.remove('correct','incorrect','revealed')});cwState.revealed.clear();selectFirstCw();updateCwProgress();setFeedback(els.cwFeedback,'Puzzle reset.');}
  function handleCwKeyboard(e){const b=e.target.closest('button');if(!b||!cwState.puzzle)return;if(b.dataset.action==='backspace'){if(cwState.selected){const inp=cwInput(cwState.selected.r,cwState.selected.c);if(inp&&!inp.disabled){if(inp.value)inp.value='';else advanceCw(-1);updateCwProgress();}}return;}if(b.dataset.key){if(!cwState.selected)selectFirstCw();if(cwState.selected)setCwValue(cwState.selected.r,cwState.selected.c,b.dataset.key,true);}}

  // ---------- Easter egg ----------
  function showHunterEgg(){els.hunterEgg.hidden=false;secretBuffer='';brandClicks=0;}
  function trackSecretKey(e){if(e.ctrlKey||e.metaKey||e.altKey)return;const ch=e.key.length===1?e.key.toUpperCase():'';if(!ch)return;secretBuffer=(secretBuffer+ch).slice(-6);if(secretBuffer==='HUNTER')showHunterEgg();}
  function trackBrandSecret(){brandClicks++;clearTimeout(brandClickTimer);brandClickTimer=setTimeout(()=>brandClicks=0,1800);if(brandClicks>=7)showHunterEgg();}

  // ---------- Events ----------
  document.querySelectorAll('[data-open-mode]').forEach(b=>b.addEventListener('click',()=>{
    const mode=b.dataset.openMode;if(mode==='lesson')openLesson();else if(mode==='runner')openRunner();else if(mode==='morph')openMorph();else if(mode==='sentence')openSentence();else if(mode==='vr')openVr();else if(mode==='crossword')openCrossword();
  }));
  document.querySelectorAll('[data-back-home]').forEach(b=>b.addEventListener('click',showHub));
  els.brandHome.addEventListener('click',()=>{trackBrandSecret();showHub();});
  els.brandMark.addEventListener('dblclick',e=>{e.stopPropagation();trackBrandSecret();});
  els.themeToggle.addEventListener('click',()=>{document.body.classList.toggle('dark');progress.theme=document.body.classList.contains('dark')?'dark':'light';saveProgress();});
  els.vrQuickButton?.addEventListener('click', openVr);

  function refreshMusicUi(detail) {
    const st = detail || window.AudioManager?.getStatus?.() || { enabled:false, mode:'off', volume:.42 };
    if (els.musicVolume) els.musicVolume.value = st.volume;
    els.musicModeGrid?.querySelectorAll('[data-music-mode]').forEach(b => b.classList.toggle('active', b.dataset.musicMode === st.mode));
    if (els.musicStatus) els.musicStatus.textContent = !st.supported ? 'Web Audio is not supported here.' : st.enabled ? `Playing: ${st.track || st.mode}.` : st.mode === 'off' ? 'Soundtrack is off.' : 'Choose a mode or press ♫ to enable audio.';
    if (els.musicToggle) els.musicToggle.classList.toggle('audio-on', !!st.enabled);
  }
  els.musicToggle?.addEventListener('click', async () => {
    els.musicPopover.hidden = !els.musicPopover.hidden;
    if (!els.musicPopover.hidden && window.AudioManager?.getStatus?.().mode !== 'off') await window.AudioManager?.enable?.();
    refreshMusicUi();
  });
  els.musicClose?.addEventListener('click',()=>els.musicPopover.hidden=true);
  els.musicModeGrid?.addEventListener('click', async e => {
    const b=e.target.closest('[data-music-mode]'); if(!b)return;
    const mode=b.dataset.musicMode; window.AudioManager?.setMode?.(mode);
    if(mode!=='off') await window.AudioManager?.enable?.();
    refreshMusicUi();
  });
  els.musicVolume?.addEventListener('input',e=>window.AudioManager?.setVolume?.(e.target.value));
  window.addEventListener('krizalica-audio-status',e=>refreshMusicUi(e.detail));
  refreshMusicUi();

  els.completionHome.addEventListener('click',()=>{els.completionModal.hidden=true;showHub();});els.completionReplay.addEventListener('click',replayCurrent);els.closeEgg.addEventListener('click',()=>els.hunterEgg.hidden=true);
  els.sentenceUndo.addEventListener('click',()=>{if(sentenceState.locked)return;sentenceState.chosen.pop();renderSentenceTiles();});els.sentenceReset.addEventListener('click',resetSentenceChoice);els.sentenceCheck.addEventListener('click',checkSentence);
  els.cwCheck.addEventListener('click',checkCw);els.cwRevealLetter.addEventListener('click',revealCwLetter);els.cwRevealWord.addEventListener('click',revealCwWord);els.cwReset.addEventListener('click',resetCw);els.cwNew.addEventListener('click',generateChunkCrossword);els.keyboard.addEventListener('click',handleCwKeyboard);
  document.addEventListener('keydown',e=>{
    trackSecretKey(e);
    if(currentMode==='runner'&&runnerState.active){if(['ArrowLeft','ArrowRight','ArrowUp',' ','a','A','d','D','w','W'].includes(e.key))e.preventDefault();if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')runnerState.keys.left=true;if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')runnerState.keys.right=true;if(e.key==='ArrowUp'||e.key===' '||e.key.toLowerCase()==='w')jumpRunner();}
  });
  document.addEventListener('keyup',e=>{if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a')runnerState.keys.left=false;if(e.key==='ArrowRight'||e.key.toLowerCase()==='d')runnerState.keys.right=false;});
  document.querySelectorAll('[data-runner-control]').forEach(b=>{
    const control=b.dataset.runnerControl;
    const down=e=>{e.preventDefault();if(control==='left')runnerState.keys.left=true;else if(control==='right')runnerState.keys.right=true;else jumpRunner();};
    const up=e=>{e.preventDefault();if(control==='left')runnerState.keys.left=false;else if(control==='right')runnerState.keys.right=false;};
    b.addEventListener('pointerdown',down);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('pointerleave',up);
  });

  window.KrizalicaApp = {
    getSelectedChunk: () => selectedChunk,
    getProgress: () => JSON.parse(JSON.stringify(progress)),
    recordCompletion,
    showHub,
    openVr
  };

  if(progress.theme==='dark')document.body.classList.add('dark');
  window.AudioManager?.setContext?.('hub');
  renderHub();
})();
