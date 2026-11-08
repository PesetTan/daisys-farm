(() => {
  const game = document.querySelector('#game');
  const daisy = document.querySelector('#daisy');
  const guide = document.querySelector('#guide');
  let count = 3;
  let picked = new Set();
  let stage = 'home';
  let activity = 'pick';
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
    return '<svg class="cue-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="assets/ui-icons.svg#'+name+'"></use></svg>';
  }
  function action(label, next) {
    const pictures={restart:'restart',demo:'hand',home:'home'};
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
  }
  function look(text, target) {
    guide.textContent = text;
    requestAnimationFrame(() => {
      if(stage==='done') return;
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
    daisy.hidden = stage === 'done';
    document.querySelector('main').classList.toggle('celebrating',stage==='done');
    game.classList.remove('arrive');
    if (stage === 'home') {
      game.innerHTML = '<h1>Daisy’s Farm</h1><div class="tiles">'+['pick','find','read','trace'].map((s,i)=>'<button data-practice="'+s+'">'+(s==='pick'?berry():s==='read'?'<img class="tile-art" src="assets/basket-closed.png" alt="">':s==='find'?'<span class="tile-number" aria-hidden="true">1 2 3</span>':icon('trace'))+'<span class="adult-label">'+['Pick and Count','Find the Number','Read the Sign','Trace the Sign'][i]+'</span></button>').join('')+'</div>';
      look('Choose a game.');
    } else if (stage === 'pick') {
      game.innerHTML = '<h2>Pick '+count+' strawberries</h2><div class="harvest"><div class="bed" aria-label="Strawberry patch"><img class="soil-art" src="assets/soil-tray.png" alt=""><div class="plants">'+Array.from({length:count},(_,i)=>'<div class="plant" style="--lean:'+(i%2?'-2deg':'2deg')+'"><img class="plant-leaves" src="assets/strawberry-plant.png" alt=""><button class="berry" data-pick="'+i+'" aria-label="Pick strawberry '+(i+1)+'">'+berry()+'</button></div>').join('')+'</div></div><div class="number" id="tally" aria-label="Strawberries picked">0</div>'+tray(0,'tray')+'</div><div class="actions" id="continue"></div>';
      look('Tap a ripe strawberry.', '[data-pick]');
    } else if (stage === 'find') {
      const wrong = count === 5 ? 2 : count+1;
      const choices = Math.random()<.5 ? [count,wrong] : [wrong,count];
      game.innerHTML = '<h2>Find the number</h2>'+tray(count)+'<div class="choice-prompt" aria-hidden="true">'+icon('hand')+'</div><div class="choices">'+choices.map(n=>'<button class="number" data-answer="'+n+'">'+n+'</button>').join('')+'</div><p id="hint">Choose the sign for our strawberries.</p>';
      look('Choose a number sign.', '[data-answer]');
    } else if (stage === 'read') {
      game.innerHTML = '<h2>What number is this?</h2><div class="number">'+count+'</div><button class="basket closed" data-next="done" aria-label="Open basket"><img src="assets/basket-closed.png" alt="Closed painted basket"></button>';
      look('Say the number, then open the basket.', '.basket');
    } else if (stage === 'trace') {
      game.innerHTML = '<h2>Trace the '+count+'</h2><svg id="trace" viewBox="0 0 250 300" aria-label="Trace number '+count+'"><path class="trace-base" d="'+paths[count]+'"/><path class="trace-progress" d="'+paths[count]+'"/></svg><div class="actions">'+action('Show me','demo')+'</div>';
      tracing(); look('Follow the golden trail.', '#trace');
    } else if (stage === 'done') {
      const season=document.documentElement.dataset.season || 'autumn';
      const harvest=activity==='read'?'<div class="basket open"><img src="assets/basket-empty.png" alt=""><div class="basket-fruit">'+fruit(count)+'</div></div>':tray(count);
      game.innerHTML = '<h2>'+({pick:'You picked them all!',find:'That’s the number!',read:'Look what’s inside!',trace:'You traced it!'})[activity]+'</h2><div class="success-scene"><div class="daisy-reward" role="img" aria-label="Daisy looks at you with a little tongue peeking out and wags her tail"><span class="reward-tail" aria-hidden="true"><img class="tail-static" src="assets/daisy-tail.png" alt=""><canvas class="tail-flex" width="900" height="780"></canvas></span><img class="celebration-dog" src="assets/daisy-happy-v2-'+season+'.png" alt=""><img class="celebration-dog tail-root-cover" src="assets/daisy-happy-v2-'+season+'.png" alt="" aria-hidden="true"></div><div class="success-harvest"><div class="success-number">'+icon('check')+'<strong>'+count+'</strong></div>'+harvest+'</div></div><div class="actions">'+action('Play again','restart')+action('Choose a game','home')+'</div>';
      animateTail();
      look(activity==='read'?'You discovered '+count+' strawberries.':'You did it!');
    }
    pictureGuide();
    requestAnimationFrame(()=>game.classList.add('arrive'));
  }
  function animateTail() {
    const tail=game.querySelector('.reward-tail');
    const image=tail.querySelector('.tail-static');
    const canvas=tail.querySelector('.tail-flex');
    const ctx=canvas.getContext('2d');
    if(!ctx) return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0, disposed=false, start=null;
    function draw(elapsed, moving) {
      ctx.clearRect(0,0,900,780);
      const envelope=moving?Math.min(1,elapsed/300):0;
      // Warp narrow texture strips along a continuous curve. The root stays
      // fixed while bend amplitude and phase delay grow toward the tip.
      // Fuller cross-section with extra canvas padding; root remains at y=480.
      for(let x=0;x<900;x+=4) {
        const u=Math.max(0,(882-x)/882);
        const bend=76*Math.pow(u,1.7)*Math.sin(elapsed*Math.PI*2/820-u*1.25)*Math.max(0,envelope);
        const width=Math.min(4.5,900-x);
        ctx.drawImage(image,x/900*image.naturalWidth,0,width/900*image.naturalWidth,image.naturalHeight,x,76.8+bend,width,504);
      }
    }
    function tick(now) {
      if(disposed) return;
      if(start===null) start=now;
      const elapsed=now-start;
      if(reduced.matches){draw(0,false);return;}
      draw(elapsed,true);
      frame=requestAnimationFrame(tick);
    }
    function begin() {
      if(disposed || !image.naturalWidth) return;
      draw(0,false);tail.classList.add('flex-ready');
      if(!reduced.matches) frame=requestAnimationFrame(tick);
    }
    function stopMotion() {
      cancelAnimationFrame(frame);
      if(disposed || !image.naturalWidth) return;
      if(reduced.matches) draw(0,false);
      else {start=null;frame=requestAnimationFrame(tick);}
    }
    reduced.addEventListener('change',stopMotion);
    image.addEventListener('load',begin,{once:true});
    if(image.complete){image.removeEventListener('load',begin);begin();}
    cleanup=()=>{disposed=true;cancelAnimationFrame(frame);image.removeEventListener('load',begin);reduced.removeEventListener('change',stopMotion);};
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
      // Follow the nearest point ahead instead of requiring a fixed number of events.
      // A bounded window prevents jumping across the numeral to its endpoint.
      let nearest=distance, error=Infinity;
      for(let at=distance;at<=Math.min(length,distance+80);at+=2) {
        const point=base.getPointAtLength(at), delta=Math.hypot(p.x-point.x,p.y-point.y);
        if(delta<error){error=delta;nearest=at;}
      }
      if(error>32) return;
      distance=nearest;
      const end=base.getPointAtLength(length);
      if(length-distance<16 && Math.hypot(p.x-end.x,p.y-end.y)<20) distance=length;
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
    if(button.dataset.practice){activity=button.dataset.practice;picked=new Set();show(activity);return;}
    if(button.dataset.pick!==undefined){
      const id=button.dataset.pick;if(picked.has(id))return;picked.add(id);button.disabled=true;
      document.querySelector('#tally').textContent=picked.size;
      const plant=button.closest('.plant');
      rustle(plant);
      const trayFruit=document.querySelector('#tray');
      trayFruit.insertAdjacentHTML('beforeend',berry());
      trayFruit.lastElementChild.classList.add('just-picked');
      tapCue('[data-pick]:not(:disabled)');
      if(picked.size===count) show('done');
      return;
    }
    if(button.dataset.answer){
      if(Number(button.dataset.answer)===count){show('done');}
      else {button.classList.add('try-again');tapCue('[data-answer="'+count+'"]');document.querySelector('#hint').textContent='Let’s look for '+count+'. Try the other sign.';look('Look at the other sign.','[data-answer="'+count+'"]');}
      return;
    }
    let next=button.dataset.next;
    if(next==='demo')return;
    if(next==='restart'){count=count%5+1;picked=new Set();next=activity;}
    if(next) show(next);
  });
  document.querySelector('#home').onclick=()=>show('home');
  show('home');
  function updateSeason() {
    const season = document.documentElement.dataset.season || window.SeasonScene.seasonAt();
    document.querySelector('#season-name').textContent = season;
    daisy.src = 'assets/daisy-guide-v2-' + season + '.png';
    game.querySelectorAll('.celebration-dog').forEach(happy=>{happy.src='assets/daisy-happy-v2-'+season+'.png';});
  }
  new MutationObserver(updateSeason).observe(document.documentElement, {attributes:true, attributeFilter:['data-season']});
  updateSeason();
})();
