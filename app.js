(() => {
  const game = document.querySelector('#game');
  const daisy = document.querySelector('#daisy');
  const guide = document.querySelector('#guide');
  const maxCount = 10;
  let count = 0;
  let picked = new Set();
  let stage = 'home';
  let activity = 'pick';
  let cleanup = () => {};
  const paths = {
    1: 'M85 65 L120 35 L120 265',
    2: 'M50 80 C55 10 195 10 190 85 C185 135 60 200 50 265 L195 265',
    3: 'M55 50 C180 -5 230 115 120 145 C230 150 210 295 50 255',
    4: 'M160 35 L45 190 L205 190 L160 190 L160 270',
    5: 'M195 40 L65 40 L60 140 C220 90 240 290 55 255',
    6: 'M180 40 C80 45 45 140 55 215 C65 285 195 285 195 205 C195 125 80 125 55 205',
    7: 'M45 40 L205 40 L95 265',
    8: 'M125 145 C20 100 45 30 125 35 C205 30 230 100 125 145 C15 195 40 270 125 265 C210 270 235 195 125 145',
    9: 'M195 105 C195 15 55 15 55 105 C55 185 195 185 195 105 C195 190 155 245 70 265',
    10: ['M35 70 L65 40 L65 260', 'M170 40 C100 40 100 260 170 260 C240 260 240 40 170 40']
  };
  function berry() {
    return '<img class="produce" src="assets/strawberry.png" alt="">';
  }
  function fruit(n) { return Array.from({length:n}, berry).join(''); }
  function tray(n) { return '<div class="painted-tray"><img class="tray-art" src="assets/harvest-tray.png" alt=""><div class="tray-produce">'+fruit(n)+'</div></div>'; }
  const harvestBasketArt = 'assets/basket-harvest-no-handle.png';
  function basket(n, dropTarget = false) {
    const isHarvest = dropTarget || activity === 'pick';
    const art = isHarvest ? harvestBasketArt : 'assets/basket-empty.png';
    const target = dropTarget ? ' id="harvest-basket" aria-label="Drop strawberries in this basket"' : '';
    return '<div class="basket open'+(isHarvest?' harvest-basket':'')+'"'+target+'><img src="'+art+'" alt=""><div class="basket-fruit">'+fruit(n)+'</div></div>';
  }
  function icon(name) {
    return '<svg class="cue-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="assets/ui-icons.svg#'+name+'"></use></svg>';
  }
  function action(label, next) {
    const pictures={restart:'restart',demo:'hand',home:'home'};
    return '<button class="picture-action" data-next="'+next+'" aria-label="'+label+'">'+icon(pictures[next]||'next')+'<span class="adult-label">'+label+'</span></button>';
  }
  function signGrass(seed) {
    // Stable, distinct tufts on each sign, without repeating a sprite.
    function sample() {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    }
    const clumps = [23 + sample()*13, 76 + sample()*25, 133 + sample()*15];
    let blades = '';
    for (let layer=0; layer<3; layer++) {
      for (const center of clumps) {
        for (let i=0; i<7; i++) {
          const root = Math.round(center + (sample()-.5)*(layer===2?40:27));
          const height = Math.round(12 + sample()*(layer===0?41:28));
          const lean = Math.round(15 + height*.48 + sample()*17);
          const width = Math.round(5 + sample()*6);
          const tip = root + lean;
          const y = 61-height;
          blades += '<path class="grass-tone-'+((layer+i)%4)+'" d="M'+root+' 61 C'+(root+2)+' '+(61-height*.56)+' '+(tip-15)+' '+(y-3)+' '+tip+' '+y+' C'+(tip-16)+' '+(y+8)+' '+(root+width+5)+' '+(61-height*.28)+' '+(root+width)+' 62Z"/>';
          if (layer===0 && i===1) {
            blades += '<path class="grass-tone-3" d="M'+(tip-12)+' '+(y+8)+' Q'+(tip-6)+' '+(y-5)+' '+(tip+10)+' '+(y-6)+' Q'+(tip+4)+' '+(y+1)+' '+(tip-12)+' '+(y+8)+'Z"/>';
          }
        }
      }
    }
    return '<svg class="sign-grass" viewBox="0 0 220 65" aria-hidden="true" focusable="false">'+blades+'</svg>';
  }

  function gamePicture(kind) {
    const hand='<span class="preview-hand">'+icon('hand')+'</span>';
    if(kind==='pick') return '<span class="game-picture preview-pick" aria-hidden="true"><img class="preview-soil" src="assets/soil-tray.png" alt=""><img class="preview-leaves" src="assets/strawberry-plant.png" alt=""><img class="preview-picked" src="assets/strawberry.png" alt=""><img class="preview-tray" src="'+harvestBasketArt+'" alt="">'+hand+'</span>';
    if(kind==='find') return '<span class="game-picture preview-find" aria-hidden="true"><span class="preview-fruit">'+fruit(3)+'</span><span class="preview-sign wrong"><b>2</b></span><span class="preview-sign right"><b>3</b></span>'+hand+'</span>';
    if(kind==='read') return '<span class="game-picture preview-read" aria-hidden="true"><span class="preview-sign"><b>3</b></span><span class="preview-basket"><img src="assets/basket-empty.png" alt=""><span class="preview-fruit">'+fruit(3)+'</span></span>'+hand+'</span>';
    return '<span class="game-picture preview-trace" aria-hidden="true"><svg viewBox="0 0 250 300"><path class="preview-track" d="'+paths[3]+'"/><path class="preview-ink" pathLength="100" d="'+paths[3]+'"/><circle cx="55" cy="50" r="13"/></svg>'+hand+'</span>';
  }
  function tapCue(selector) {
    game.querySelectorAll('.tap-cue').forEach(cue=>cue.remove());
    const target=game.querySelector(selector);
    if(target) target.insertAdjacentHTML('beforeend','<span class="tap-cue" aria-hidden="true">'+icon('hand')+'</span>');
  }
  function pictureGuide() {
    if(stage==='pick') {
      game.querySelector('h2').insertAdjacentHTML('afterend','<div class="picture-goal" aria-label="Pick '+count+' strawberries"><strong>'+count+'</strong>'+berry()+icon('next')+'<img src="'+harvestBasketArt+'" alt=""></div>');
      tapCue('[data-pick]:not(:disabled)');
    } else if(stage==='read') tapCue('.basket');
  }
  function setGuide(text) {
    guide.textContent = text;
  }
  function show(next) {
    if(drag) finishDrag({pointerId:drag.id});
    cleanup(); cleanup = () => {};
    stage = next;
    game.dataset.stage = stage;
    game.classList.toggle('many-fruit', count > 5);
    document.querySelector('main').classList.toggle('celebrating',stage==='done');
    document.querySelector('main').classList.toggle('choosing',stage==='home');
    game.classList.remove('arrive');
    if (stage === 'home') {
      const names=['Pick and Count','Find the Number','Read the Sign','Trace the Sign'];
      game.innerHTML = '<div class="tiles" role="group" aria-label="Choose a game">'+['pick','find','read','trace'].map((s,i)=>'<button data-practice="'+s+'" aria-label="'+names[i]+'">'+gamePicture(s)+'<span class="adult-label">'+names[i]+'</span></button>').join('')+'</div>';
      setGuide('Choose a game.');
    } else if (stage === 'pick') {
      game.innerHTML = '<h2>Pick '+count+' strawberries</h2><div class="harvest"><div class="bed" aria-label="Strawberry patch"><img class="soil-art" src="assets/soil-tray.png" alt="">'+(count>5?'<img class="soil-art soil-back-row" src="assets/soil-tray.png" alt="">':'')+'<div class="plants">'+Array.from({length:count},(_,i)=>'<div class="plant" style="--lean:'+(i%2?'-2deg':'2deg')+'"><img class="plant-leaves" src="assets/strawberry-plant.png" alt=""><button class="berry" data-pick="'+i+'" aria-label="Pick strawberry '+(i+1)+'">'+berry()+'</button></div>').join('')+'</div></div><div class="number" id="tally" aria-label="Strawberries picked">0</div>'+basket(0,true)+'</div>';
      setGuide('Drag a strawberry into the basket, or tap it.');
    } else if (stage === 'find') {
      const wrong = count === maxCount ? count-1 : count+1;
      const choices = Math.random()<.5 ? [count,wrong] : [wrong,count];
      game.innerHTML = '<h2>Find the number</h2>'+tray(count)+'<div class="choice-prompt" aria-hidden="true">'+icon('hand')+'</div><div class="choices">'+choices.map((n,i)=>'<button class="number farm-sign" data-answer="'+n+'"><span>'+n+'</span>'+signGrass(n*19+i+1)+'</button>').join('')+'</div><p id="hint" class="number-instructions">Tap the number that matches the strawberries.</p>';
      setGuide('');
    } else if (stage === 'read') {
      game.innerHTML = '<h2>What number is this?</h2><div class="number farm-sign read-sign"><span>'+count+'</span>'+signGrass(271+count)+'</div><button class="basket closed" data-next="done" aria-label="Open basket"><img src="assets/basket-closed.png" alt="Closed painted basket"></button>';
      setGuide('Say the number, then open the basket.');
    } else if (stage === 'trace') {
      game.innerHTML = '<h2>Trace the '+count+'</h2><div class="farm-sign trace-sign"><svg id="trace" viewBox="0 0 250 300" aria-label="Trace number '+count+'">'+[].concat(paths[count]).map(d=>'<path class="trace-base" d="'+d+'"/>').join('')+[].concat(paths[count]).map(d=>'<path class="trace-progress" d="'+d+'"/>').join('')+'</svg>'+signGrass(419+count)+'</div><div class="actions">'+action('Show me','demo')+'</div>';
      tracing(); setGuide('Follow the golden trail.');
    } else if (stage === 'done') {
      const harvest=activity==='read'||activity==='pick'?basket(count):tray(count);
      game.innerHTML = '<h2>'+({pick:'You picked them all!',find:'That’s the number!',read:'Look what’s inside!',trace:'You traced it!'})[activity]+'</h2><div class="success-number"><span class="success-check">'+icon('check')+'</span><strong>'+count+'</strong></div>'+harvest+'<div class="actions">'+action('Play again','restart')+action('Choose a game','home')+'</div>';
      setGuide(activity==='read'?'You discovered '+count+' strawberries.':'You did it!');
    }
    pictureGuide();
    requestAnimationFrame(()=>game.classList.add('arrive'));
  }
  function tracing() {
    const svg=game.querySelector('#trace');
    const bases=[...svg.querySelectorAll('.trace-base')], progresses=[...svg.querySelectorAll('.trace-progress')];
    let stroke=0, base=bases[0], progress=progresses[0], length=base.getTotalLength();
    progresses.forEach((path,i)=>{path.style.strokeDasharray=bases[i].getTotalLength();path.style.strokeDashoffset=bases[i].getTotalLength();});
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
      if(distance>=length) {
        if(stroke===bases.length-1) {show('done');return;}
        // Lift and start the next digit; never draw a connecting line in 10.
        pointer=null; stroke++; base=bases[stroke]; progress=progresses[stroke];
        length=base.getTotalLength(); distance=0;
        const nextStart=base.getPointAtLength(0), marker=svg.querySelector('.trace-start');
        marker.setAttribute('cx',nextStart.x);marker.setAttribute('cy',nextStart.y);
        placeFinger(0);
      }
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
  function collectBerry(button) {
    if(stage!=='pick' || picked.has(button.dataset.pick)) return;
    picked.add(button.dataset.pick);
    button.disabled=true;
    game.querySelector('#tally').textContent=picked.size;
    rustle(button.closest('.plant'));
    const fruitLayer=game.querySelector('#harvest-basket .basket-fruit');
    fruitLayer.insertAdjacentHTML('beforeend',berry());
    fruitLayer.lastElementChild.classList.add('just-picked');
    tapCue('[data-pick]:not(:disabled)');
    if(picked.size===count) show('done');
  }

  let drag = null;
  let suppressPickClick = false;

  function overBasket(event, target) {
    const {left,right,top,bottom}=target.getBoundingClientRect();
    return event.clientX>=left && event.clientX<=right &&
      event.clientY>=top && event.clientY<=bottom;
  }

  game.addEventListener('pointerdown',event=>{
    const button=event.target.closest('[data-pick]:not(:disabled)');
    if(!button || !event.isPrimary || event.button!==0 || drag) return;
    suppressPickClick=false;
    drag={button,id:event.pointerId,x:event.clientX,y:event.clientY,
      basket:game.querySelector('#harvest-basket'),ghost:null};
    button.setPointerCapture(event.pointerId);
  });

  game.addEventListener('pointermove',event=>{
    if(!drag || event.pointerId!==drag.id) return;
    if(!drag.ghost) {
      if(Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<8) return;
      const image=drag.button.querySelector('.produce');
      drag.ghost=image.cloneNode();
      drag.ghost.classList.add('drag-berry');
      drag.ghost.style.width=image.offsetWidth+'px';
      drag.ghost.style.height=image.offsetHeight+'px';
      document.body.append(drag.ghost);
      drag.button.classList.add('drag-source');
      suppressPickClick=true;
    }
    drag.ghost.style.left=event.clientX+'px';
    drag.ghost.style.top=event.clientY+'px';
    drag.basket.classList.toggle('drop-ready',overBasket(event,drag.basket));
  });

  function finishDrag(event) {
    if(!drag || event.pointerId!==drag.id) return;
    const {button,basket,ghost}=drag;
    drag=null;
    ghost?.remove();
    button.classList.remove('drag-source');
    basket.classList.remove('drop-ready');
    if(ghost && event.type==='pointerup' && overBasket(event,basket)) collectBerry(button);
  }

  game.addEventListener('pointerup',finishDrag);
  game.addEventListener('pointercancel',finishDrag);
  game.addEventListener('lostpointercapture',finishDrag);

  // Keep browser menus and native drag out of active rounds.
  for (const eventName of ['contextmenu', 'dragstart']) {
    game.addEventListener(eventName, event => {
      if (stage !== 'home') event.preventDefault();
    });
  }

  function startRound(gameName) {
    const available = count ? maxCount - 1 : maxCount;
    const roll = 1 + Math.floor(Math.random() * available);
    // Skip the previous number so every new round feels different.
    count = count && roll >= count ? roll + 1 : roll;
    activity = gameName;
    picked = new Set();
    show(activity);
  }

  game.addEventListener('click', e=>{
    const button=e.target.closest('button'); if(!button) return;
    if(button.dataset.practice){startRound(button.dataset.practice);return;}
    if(button.dataset.pick!==undefined){
      if(!suppressPickClick || e.detail===0) collectBerry(button);
      return;
    }
    if(button.dataset.answer){
      if(Number(button.dataset.answer)===count){show('done');}
      else {
        button.classList.remove('try-again');
        // Restart the feedback even when the same number is tapped twice.
        void button.offsetWidth;
        button.classList.add('try-again');
        game.querySelector('#hint').textContent='Try again. Count the berries and tap a number.';
      }
      return;
    }
    const next=button.dataset.next;
    if(next==='demo')return;
    if(next==='restart'){startRound(activity);return;}
    if(next) show(next);
  });
  document.querySelector('#home').onclick=()=>show('home');
  show('home');
  const daisyMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function updateSeason() {
    const season = document.documentElement.dataset.season || window.SeasonScene.seasonAt();
    document.querySelector('#season-name').textContent = season;
    const extension = daisyMotion.matches ? 'png' : 'gif';
    daisy.src = 'assets/daisy-guide-v3-' + season + '.' + extension;
  }
  new MutationObserver(updateSeason).observe(document.documentElement, {attributes:true, attributeFilter:['data-season']});
  daisyMotion.addEventListener('change', updateSeason);
  updateSeason();
})();
