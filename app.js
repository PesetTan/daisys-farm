(() => {
  const game = document.querySelector('#game');
  const daisy = document.querySelector('#daisy');
  const guide = document.querySelector('#guide');
  let count = 3;
  let picked = new Set();
  let stage = 'home';
  let standalone = false;
  let cleanup = () => {};
  const paths = {
    1: 'M85 65 L120 35 L120 265',
    2: 'M50 80 C55 10 195 10 190 85 C185 135 60 200 50 265 L195 265',
    3: 'M55 50 C180 -5 230 115 120 145 C230 150 210 295 50 255',
    4: 'M160 35 L45 190 L205 190 L160 190 L160 270',
    5: 'M195 40 L65 40 L60 140 C220 90 240 290 55 255'
  };
  function berry() {
    return '<img class="produce" src="assets/strawberry.png" alt="">';
  }
  function fruit(n) { return Array.from({length:n}, berry).join(''); }
  function tray(n, id = '') { return '<div class="painted-tray"><img class="tray-art" src="assets/harvest-tray.png" alt=""><div class="tray-produce"'+(id?' id="'+id+'"':'')+'>'+fruit(n)+'</div></div>'; }
  function icon(name) {
    const shapes = {
      play:'<path d="M19 10 48 32 19 54Z" fill="currentColor" stroke="none"/>',
      next:'<path d="M10 32h42M36 15l17 17-17 17"/>',
      restart:'<path d="M15 23a22 22 0 1 1-3 21M15 8v16H2"/>',
      trace:'<path d="M17 15c25-14 38 12 14 17 27 2 13 32-14 18" stroke-dasharray="3 7"/><circle cx="17" cy="15" r="5" fill="currentColor"/>',
      stand:'<path d="M9 28h46v27H9zM6 28l8-17h36l8 17M21 11l-4 17m15-17v17m11-17 4 17M8 42h48"/>',
      check:'<path d="m13 32 13 13 26-29"/>',
      hand:'<path d="M25 34V12a5 5 0 0 1 10 0v15l3-2 7 3 8 5v13L42 58H28L13 41a5 5 0 0 1 7-7l5 5Z" fill="#fff2cc"/><path d="M19 8l-4-4M40 8l4-4M11 19H5"/>'
    };
    return '<svg class="cue-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+shapes[name]+'</svg>';
  }
  function action(label, next) {
    const pictures={pick:'play',stand:'stand',find:'next',reveal:'hand',trace:'trace',done:'check',restart:'restart',demo:'hand'};
    return '<button class="picture-action" data-next="'+next+'" aria-label="'+label+'">'+icon(pictures[next]||'next')+'<span class="adult-label">'+label+'</span></button>';
  }
  function tapCue(selector) {
    game.querySelectorAll('.tap-cue').forEach(cue=>cue.remove());
    const target=game.querySelector(selector);
    if(target) target.insertAdjacentHTML('beforeend','<span class="tap-cue" aria-hidden="true">'+icon('hand')+'</span>');
  }
  function pictureGuide() {
    if(stage==='pick') {
      game.querySelector('h2').insertAdjacentHTML('afterend','<div class="picture-goal" aria-label="Pick '+count+' strawberries"><strong>'+count+'</strong>'+berry()+icon('next')+'<img src="assets/harvest-tray.png" alt=""></div>');
      tapCue('[data-pick]:not(:disabled)');
    } else if(stage==='read') tapCue('.basket');
    else if(stage==='stand'||stage==='reveal'||stage==='done') tapCue('.actions button');
  }
  function look(text, target) {
    guide.textContent = text;
    requestAnimationFrame(() => {
      const el = game.querySelector(target || 'button');
      if (!el) return;
      const a = daisy.getBoundingClientRect(), b = el.getBoundingClientRect();
      const angle = Math.max(-8, Math.min(8, (b.top-a.top)/55));
      daisy.style.transform = 'rotate('+angle+'deg)';
    });
  }
  function show(next) {
    cleanup(); cleanup = () => {};
    stage = next;
    game.dataset.stage = stage;
    game.classList.remove('arrive');
    if (stage === 'home') {
      game.innerHTML = '<h1>Daisy’s Farm</h1><p>A little harvest. A number to discover.</p>'+action('Play with Daisy','pick')+'<div class="tiles">'+['pick','find','read','trace'].map((s,i)=>'<button data-practice="'+s+'">'+(s==='pick'?berry():s==='read'?'<img class="tile-art" src="assets/basket-closed.png" alt="">':s==='find'?'<span class="tile-number" aria-hidden="true">1 2 3</span>':icon('trace'))+'<span class="adult-label">'+['Pick and Count','Find the Number','Read the Sign','Trace the Sign'][i]+'</span></button>').join('')+'</div>';
      look('Let’s visit the strawberry patch.');
    } else if (stage === 'pick') {
      game.innerHTML = '<h2>Pick '+count+' strawberries</h2><div class="harvest"><div class="bed" aria-label="Strawberry patch"><img class="soil-art" src="assets/soil-tray.png" alt=""><div class="plants">'+Array.from({length:count},(_,i)=>'<div class="plant" style="--lean:'+(i%2?'-2deg':'2deg')+'"><img class="plant-leaves" src="assets/strawberry-plant.png" alt=""><button class="berry" data-pick="'+i+'" aria-label="Pick strawberry '+(i+1)+'">'+berry()+'</button></div>').join('')+'</div></div><div class="number" id="tally" aria-label="Strawberries picked">0</div>'+tray(0,'tray')+'</div><div class="actions" id="continue"></div>';
      look('Tap a ripe strawberry.', '[data-pick]');
    } else if (stage === 'stand') {
      game.innerHTML = '<h2>At the farm stand</h2><div class="stand">'+tray(count)+'</div><div class="actions">'+action('Find the sign','find')+'</div>';
      look('Let’s label our harvest.');
    } else if (stage === 'find') {
      const wrong = count === 5 ? 2 : count+1;
      const choices = Math.random()<.5 ? [count,wrong] : [wrong,count];
      game.innerHTML = '<h2>Find the number</h2>'+tray(count)+'<div class="choice-prompt" aria-hidden="true">'+icon('hand')+'</div><div class="choices">'+choices.map(n=>'<button class="number" data-answer="'+n+'">'+n+'</button>').join('')+'</div><p id="hint">Choose the sign for our strawberries.</p>';
      look('Choose a number sign.', '[data-answer]');
    } else if (stage === 'read') {
      game.innerHTML = '<h2>What number is this?</h2><div class="number">'+count+'</div><button class="basket closed" data-next="reveal" aria-label="Open basket"><img src="assets/basket-closed.png" alt="Closed painted basket"></button>';
      look('Say the number, then open the basket.', '.basket');
    } else if (stage === 'reveal') {
      game.innerHTML = '<h2>'+count+' strawberries!</h2><div class="number">'+count+'</div><div class="basket open"><img src="assets/basket-empty.png" alt=""><div class="basket-fruit">'+fruit(count)+'</div></div><div class="actions">'+action(standalone?'Play again':'Trace the sign',standalone?'restart':'trace')+'</div>';
      look('Our strawberries are all here.');
    } else if (stage === 'trace') {
      game.innerHTML = '<h2>Trace the '+count+'</h2><svg id="trace" viewBox="0 0 250 300" aria-label="Trace number '+count+'"><path class="trace-base" d="'+paths[count]+'"/><path class="trace-progress" d="'+paths[count]+'"/></svg><div class="actions">'+action('Show me','demo')+action('Finish together','done')+'</div>';
      tracing(); look('Follow the golden trail.', '#trace');
    } else if (stage === 'done') {
      game.innerHTML = '<h2>You made a '+count+'!</h2><div class="number">'+count+'</div>'+tray(count)+'<div class="actions">'+action('Play again','restart')+'</div>';
      look('Ready for another harvest?');
    }
    pictureGuide();
    requestAnimationFrame(()=>game.classList.add('arrive'));
  }
  function tracing() {
    const svg=game.querySelector('#trace'), base=svg.querySelector('.trace-base'), progress=svg.querySelector('.trace-progress');
    const length=base.getTotalLength();
    const start=base.getPointAtLength(0);
    svg.insertAdjacentHTML('beforeend','<circle class="trace-start" cx="'+start.x+'" cy="'+start.y+'" r="12"/><circle class="trace-finger" cx="'+start.x+'" cy="'+start.y+'" r="9"/>');
    const finger=svg.querySelector('.trace-finger');
    function placeFinger(at) { const p=base.getPointAtLength(at);finger.setAttribute('cx',p.x);finger.setAttribute('cy',p.y); }

    let distance=0, pointer=null, timer=null;
    progress.style.strokeDasharray=length;
    progress.style.strokeDashoffset=length;
    function move(event) {
      if(event.pointerId!==pointer) return;
      const p=new DOMPoint(event.clientX,event.clientY).matrixTransform(svg.getScreenCTM().inverse());
      const expected=base.getPointAtLength(distance);
      if(Math.hypot(p.x-expected.x,p.y-expected.y)>38) return;
      distance=Math.min(length,distance+8);
      progress.style.strokeDashoffset=length-distance;
      placeFinger(distance);
      if(distance>=length) show('done');
    }
    svg.onpointerdown=e=>{clearInterval(timer);progress.style.strokeDashoffset=length-distance;placeFinger(distance);pointer=e.pointerId;svg.setPointerCapture(pointer);move(e);};
    svg.onpointermove=move;
    svg.onpointerup=svg.onpointercancel=()=>{pointer=null;};
    function demo() {
      clearInterval(timer); let shown=0;
      if(matchMedia('(prefers-reduced-motion: reduce)').matches) {placeFinger(distance);return;}
      timer=setInterval(()=>{
        shown=Math.min(length,shown+5);progress.style.strokeDashoffset=length-shown;placeFinger(shown);
        if(shown>=length){clearInterval(timer);progress.style.strokeDashoffset=length-distance;placeFinger(distance);}
      },20);
    }
    game.querySelector('[data-next="demo"]').onclick=e=>{e.stopPropagation();demo();};
    demo();
    cleanup=()=>clearInterval(timer);
  }
  function rustle(plant) {
    if (!plant || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const leaves=plant.querySelector('.plant-leaves');
    leaves.getAnimations().forEach(animation=>animation.cancel());
    leaves.animate([
      {transform:'rotate(0deg)'}, {transform:'rotate(-3deg)'},
      {transform:'rotate(2deg)'}, {transform:'rotate(-1deg)'}, {transform:'rotate(0deg)'}
    ], {duration:650,easing:'ease-in-out'});
  }
  game.addEventListener('pointerover', e=>{
    const plant=e.target.closest('.plant');
    if(plant && !plant.contains(e.relatedTarget)) rustle(plant);
  });
  game.addEventListener('pointerdown', e=>rustle(e.target.closest('.plant')));
  game.addEventListener('focusin', e=>rustle(e.target.closest('.plant')));
  game.addEventListener('click', e=>{
    const button=e.target.closest('button'); if(!button) return;
    if(button.dataset.practice){standalone=true;picked=new Set();show(button.dataset.practice);return;}
    if(button.dataset.pick!==undefined){
      const id=button.dataset.pick;if(picked.has(id))return;picked.add(id);button.disabled=true;
      document.querySelector('#tally').textContent=picked.size;
      const plant=button.closest('.plant');
      rustle(plant);
      const trayFruit=document.querySelector('#tray');
      trayFruit.insertAdjacentHTML('beforeend',berry());
      trayFruit.lastElementChild.classList.add('just-picked');
      tapCue('[data-pick]:not(:disabled)');
      if(picked.size===count){game.querySelector('.picture-goal').innerHTML=icon('check')+'<strong>'+count+'</strong>'+berry();game.querySelector('h2').textContent=count+' strawberries!';document.querySelector('#continue').innerHTML=action(standalone?'Play again':'Take to the stand',standalone?'restart':'stand');look('Take your tray to the stand.','#continue button');tapCue('#continue button');}
      return;
    }
    if(button.dataset.answer){
      if(Number(button.dataset.answer)===count){show(standalone?'done':'read');}
      else {button.classList.add('try-again');tapCue('[data-answer="'+count+'"]');document.querySelector('#hint').textContent='Let’s look for '+count+'. Try the other sign.';look('Look at the other sign.','[data-answer="'+count+'"]');}
      return;
    }
    let next=button.dataset.next;
    if(next==='demo')return;
    if(next==='restart'){count=count%5+1;picked=new Set();next='pick';}
    if(next){if(stage==='home'){standalone=false;picked=new Set();}show(next);}
  });
  document.querySelector('#home').onclick=()=>show('home');
  show('home');
  function updateSeason() {
    const season = document.documentElement.dataset.season || window.SeasonScene.seasonAt();
    document.querySelector('#season-name').textContent = season;
    daisy.src = 'assets/daisy-' + season + '.png';
  }
  new MutationObserver(updateSeason).observe(document.documentElement, {attributes:true, attributeFilter:['data-season']});
  updateSeason();
})();
