/* PATRULHA ESTELAR — tiro de nave vista de cima, no espírito de Star Fox e dos jogos de nave de fliperama.
   A nave é a do Hangar (modelo, pintura, adesivo e cor do fogo). O dedo arrasta a nave (ela fica um pouco acima do dedo)
   e ela atira sozinha. Infinito: a cada 20 s sobe o nível e chegam mais inimigos, mais rápidos e mais resistentes.
   Vida: 3 corações (máximo 5). Encostar em inimigo, asteroide ou tiro tira 1 coração e baixa 1 nível de tiro.
   Itens: P = tiro mais forte (até 5), ♥ = recupera 1 coração, ◆ = escudo por 6 s.
   Pontos: drone 10, caça 20, atirador 30, asteroide 15 (grande 40), kamikaze 25, nave-mãe 300. */
(function(){
const P={k:'#07060f',w:'#f3eeff',g:'#9aa6b8',G:'#5a6476',r:'#ff3d2e',R:'#a8180c',o:'#ffb300',y:'#ffd23f',p:'#ff3df2',P:'#8a1a86',
  c:'#2ad4ff',C:'#1a6a9a',v:'#5dff83',V:'#1f9a3a',b:'#a8784a',B:'#6a4a2a',n:'#3a2a1a',x:'#c8a8ff',X:'#5a3a9a'};
function mk(rows,pal){const c=document.createElement('canvas');c.width=rows[0].length;c.height=rows.length;const x=c.getContext('2d');
  rows.forEach((r,y)=>[...r].forEach((ch,i)=>{if(ch==='.')return;x.fillStyle=(pal||P)[ch]||'#f0f';x.fillRect(i,y,1,1)}));return c}
const flip=rows=>rows.slice().reverse();
const S={
  drone:mk(['..kkkk..','.krrrrk.','krRwwRrk','krwccwrk','kRrrrrRk','.kRkkRk.','..k..k..']),
  caca:mk(flip(['....kk....','...kppk...','..kpwwpk..','.kpppppPk.','kkpPkkPpkk','kpPk..kPpk','kPk....kPk','kk......kk'])),
  atirador:mk(['..kkkkkk..','.kxxxxxxk.','kxXwwwwXxk','kxXwccwXxk','kXxxxxxxXk','.kXkkkkXk.','..kyk.kyk.','...k...k..']),
  kami:mk(flip(['...kk...','..koyk..','.koyyok.','kooyyook','kokyykok','kk.kk.kk'])),
  rock:mk(['..kkkk..','.kbbbBk.','kbbnbbBk','kbBbbbnk','kbbbBbBk','kBbnbbBk','.kBBBBk.','..kkkk..']),
  rockG:mk(['....kkkkkk....','..kkbbbbbBkk..','.kbbbnbbbbbBk.','.kbbbbbBbnbBk.','kbbnbbbbbbbbBk','kbbbbBbbnbbbBk','kbBbbbbbbbbnBk',
    'kbbbnbbbBbbbBk','kbbbbbbbbbbBBk','.kBbbnbbbBbBk.','.kBBbbbbbBBBk.','..kkBBBBBBkk..','....kkkkkk....']),
  mae:mk(flip(['......kkkkkkkk......','....kkGGGGGGGGkk....','..kkGgggwwwwgggGkk..','.kGgggcccccccccgggk.','kGgggkkkkkkkkkkgggGk',
    'kgggkrrkoyyokrrkgggk','kGgggkkkkkkkkkkgggGk','.kGGgggggggggggGGGk.','..kkGGkGGGGGGkGGkk..','....kk.kkkkkk.kk....'])),
  pw:mk(['.kkkkkkk.','kyykkkyyk','kyykyykyk','kyykkkyyk','kyykyyyyk','kyykyyyyk','.kkkkkkk.']),
  hp:mk(['.kk.kk.','krrkrrk','krwrrrk','krrrrrk','.krrrk.','..krk..','...k...']),
  sh:mk(['...k...','..kck..','.kcwck.','kcwcCck','.kcCck.','..kck..','...k...']),
  heart:mk(['.k.k.','krkrk','krrrk','.krk.','..k..']),heartE:mk(['.k.k.','kGkGk','kGGGk','.kGk.','..k..'])
};
ARC.add({id:'patrulha',name:'PATRULHA ESTELAR',unit:'PONTOS',cell:8,controls:'touch',
  tema:{cab:'#1a2a5a',luz:'#ff8a3d',deco:'estrelas'},
  desc:'Arraste o dedo: a nave segue e atira sozinha. Pegue P para tiros mais fortes, ♥ para vida e ◆ para escudo.',
  icon:['................','.......kk.......','......kwck......','......kcck......','....k.kwwk.k....','...kwkkwwkkwk...','..kwwwwwwwwwwk..',
        '..kkkkkkkkkkkk..','.......yy.......','.......o........','................','..k..........k..'],iconPal:Object.assign({},P,{w:'#d8d6ff'}),
  /* tela da máquina na sala (8×7): navezinha atirando e um inimigo descendo */
  attract(x,X,Y,w,h,t){x.fillStyle='#05040c';x.fillRect(X,Y,w,h);const k=Math.floor(t/180);
    x.fillStyle='#3a3a6a';for(let i=0;i<4;i++)x.fillRect(X+((i*3+k)%w),Y+((i*5+k*2)%h),1,1);
    x.fillStyle='#ff3d2e';x.fillRect(X+((k>>1)%(w-2))+1,Y+(k%3),2,1);
    x.fillStyle='#ffd23f';x.fillRect(X+3+((k>>2)%2),Y+2+(k%3),1,1);
    x.fillStyle='#d8d6ff';x.fillRect(X+3,Y+h-2,2,1);x.fillRect(X+4,Y+h-3,1,1)},
  make(api){
    const{ctx,cols,rows,sfx}=api,W=cols*8,H=rows*8;
    // nave do piloto (do Hangar) — se não houver, uma nave padrão
    const AV=(()=>{try{return (JSON.parse(localStorage.getItem('navemae-avatar'))||{}).shipPx}catch(e){return null}})();
    const SHIP=AV&&AV.rows?mk(AV.rows,AV.pal):mk(['.......kk.......','......kwck......','......kcck......','....k.kwwk.k....','...kwkkwwkkwk...','..kwwwwwwwwwwk..','..kkkkkkkkkkkk..'],Object.assign({},P,{w:'#d8d6ff'}));
    const FL=AV&&AV.f1?[mk(AV.f1,AV.pal),mk(AV.f2,AV.pal)]:null;
    const SW=SHIP.width,SH=SHIP.height,HIT=Math.max(3,Math.round(SW*.22));
    let me,tgt,shots,foes,eShots,items,parts,stars,score,lives,pow,shield,inv,t,lvl,spawnT,lastShot,running=false,paused=false,raf=0,last=0,boss,flash=0,lvlMsg=0;
    function reset(){me={x:W/2,y:H-SH-14};tgt={x:me.x,y:me.y};shots=[];foes=[];eShots=[];items=[];parts=[];score=0;lives=3;pow=1;shield=0;inv=0;t=0;lvl=1;spawnT=1.2;lastShot=0;boss=null;flash=0;lvlMsg=0;
      stars=Array.from({length:70},(_,i)=>({x:Math.random()*W,y:Math.random()*H,z:i%3}));api.score(0)}
    const boom=(x,y,n,cols)=>{for(let i=0;i<n;i++){const a=Math.random()*6.283,s=Math.random()*1.8+.4;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:14+Math.random()*12,c:cols[i%cols.length]})}};
    const D=()=>1+(lvl-1)*.18;                          // multiplicador de dificuldade
    function spawn(){const r=Math.random(),x=12+Math.random()*(W-24);
      if(lvl>=3&&r<.12+lvl*.01){foes.push({k:'rock',big:Math.random()<.35,x,y:-12,vx:(Math.random()-.5)*.4,vy:.5+Math.random()*.4*D(),hp:0,pts:0});const f=foes[foes.length-1];f.hp=f.big?6+lvl:2;f.pts=f.big?40:15;return}
      if(lvl>=4&&r<.3){foes.push({k:'kami',x,y:-8,vx:0,vy:1.1*D(),hp:1,pts:25});return}
      if(lvl>=2&&r<.5){foes.push({k:'atirador',x,y:-8,vx:0,vy:.5*D(),hp:3+Math.floor(lvl/3),pts:30,cd:1+Math.random()});return}
      if(r<.75){const n=3+Math.min(3,Math.floor(lvl/2));for(let i=0;i<n;i++)foes.push({k:'drone',x:Math.max(8,Math.min(W-8,x+(i-n/2)*12)),y:-8-i*10,vx:0,vy:.9*D(),hp:1,pts:10});return}
      foes.push({k:'caca',x,y:-10,x0:x,ph:Math.random()*6,vy:.8*D(),hp:2,pts:20})}
    function fire(){const lv=pow,sp=-5.2,add=(dx,vx,dmg=1,c='y')=>shots.push({x:me.x+dx,y:me.y-SH/2,vx,vy:sp,dmg,c});
      if(lv===1)add(0,0);else if(lv===2){add(-4,0);add(4,0)}else if(lv===3){add(0,0);add(-4,-.9);add(4,.9)}
      else if(lv===4){add(-4,0);add(4,0);add(-6,-1.2);add(6,1.2)}else{add(0,0,2,'c');add(-5,0);add(5,0);add(-7,-1.4);add(7,1.4)}
      sfx.note(lv>=5?1320:1040,.035,0,{vol:.012,type:'triangle'})}
    function hurt(){if(inv>0)return;if(shield>0){shield=0;inv=.8;sfx.noise(.15,0,{f:2000,filter:'bandpass',vol:.04});return}
      lives--;pow=Math.max(1,pow-1);inv=1.6;flash=.25;boom(me.x,me.y,18,['#ffd23f','#ff3d2e','#f3eeff']);sfx.noise(.4,0,{f:1200,to:150,vol:.08});sfx.note(220,.3,0,{to:90,type:'sawtooth',vol:.04});
      if(lives<=0){running=false;boom(me.x,me.y,40,['#ffd23f','#ff8a3d','#ff3d2e','#f3eeff']);setTimeout(()=>api.over(),1300)}}
    function kill(f){score+=f.pts;api.score(score);boom(f.x,f.y,f.k==='mae'?50:f.big?20:10,f.k==='rock'?['#a8784a','#6a4a2a','#ffd23f']:['#ffd23f','#ff8a3d','#f3eeff']);
      sfx.noise(f.k==='mae'?.7:.22,0,{f:f.k==='mae'?800:1800,to:200,vol:f.k==='mae'?.09:.05});
      const r=Math.random(),drop=f.k==='mae'?'pw':r<(f.k==='atirador'||f.big?.3:.07)?(Math.random()<.55?'pw':Math.random()<.65?'hp':'sh'):null;
      if(f.k==='mae'){items.push({k:'hp',x:f.x-10,y:f.y,vy:.6});items.push({k:'sh',x:f.x+10,y:f.y,vy:.6})}
      if(drop)items.push({k:drop,x:f.x,y:f.y,vy:.7});
      if(f.k==='rock'&&f.big)for(let i=0;i<3;i++)foes.push({k:'rock',big:false,x:f.x+(i-1)*6,y:f.y,vx:(i-1)*.5,vy:.7,hp:1,pts:15})}
    const hitBox=(f)=>f.k==='mae'?[34,14]:f.k==='rock'&&f.big?[12,11]:[7,6];
    function step(dt){const f=dt*60;t+=dt;
      // nível sobe a cada 20 s; a cada 5 níveis chega uma nave-mãe inimiga
      const nl=1+Math.floor(t/20);if(nl>lvl){lvl=nl;lvlMsg=1.6;sfx.arp([523,659,784],.07,{vol:.04});if(lvl%5===0){boss={x:W/2,y:-14};foes.push(Object.assign(boss,{k:'mae',vx:.5,vy:.35,hp:30+lvl*4,pts:300,cd:1.2}))}}
      // nave segue o dedo
      const dx=tgt.x-me.x,dy=tgt.y-me.y,dl=Math.hypot(dx,dy),ms=4.2*f;if(dl>ms){me.x+=dx/dl*ms;me.y+=dy/dl*ms}else{me.x=tgt.x;me.y=tgt.y}
      me.x=Math.max(SW/2,Math.min(W-SW/2,me.x));me.y=Math.max(H*.35,Math.min(H-SH/2-2,me.y));
      lastShot-=dt;if(lastShot<=0){fire();lastShot=pow>=5?.13:.18}
      if(inv>0)inv-=dt;if(shield>0)shield-=dt;if(flash>0)flash-=dt;if(lvlMsg>0)lvlMsg-=dt;
      spawnT-=dt;if(spawnT<=0&&!(boss&&foes.includes(boss))){spawn();spawnT=Math.max(.45,1.5-lvl*.09)*(.7+Math.random()*.6)}
      stars.forEach(s=>{s.y+=(.3+s.z*.5)*f;if(s.y>H){s.y=0;s.x=Math.random()*W}});
      shots.forEach(s=>{s.x+=s.vx*f;s.y+=s.vy*f});shots=shots.filter(s=>s.y>-6&&s.x>-4&&s.x<W+4);
      for(const e of foes){
        if(e.k==='caca'){e.ph+=.05*f;e.x=e.x0+Math.sin(e.ph)*18;e.y+=e.vy*f}
        else if(e.k==='kami'){e.vx+=(Math.sign(me.x-e.x)*.06)*f;e.vx=Math.max(-1.6,Math.min(1.6,e.vx));e.x+=e.vx*f;e.y+=e.vy*f}
        else if(e.k==='mae'){if(e.y<26)e.y+=e.vy*f;e.x+=e.vx*f;if(e.x<26||e.x>W-26)e.vx*=-1}
        else{e.x+=(e.vx||0)*f;e.y+=e.vy*f}
        if(e.k==='atirador'||e.k==='mae'){e.cd-=dt;if(e.cd<=0&&e.y>0&&e.y<H*.6){e.cd=(e.k==='mae'?.9:2.2)/Math.min(1.6,D());
          const n=e.k==='mae'?5:1;for(let i=0;i<n;i++){const ax=me.x-e.x,ay=me.y-e.y,al=Math.hypot(ax,ay)||1,sp=1.3*Math.min(1.8,D());const a=Math.atan2(ay,ax)+(i-(n-1)/2)*.28;
            eShots.push({x:e.x,y:e.y+4,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp})}sfx.note(330,.05,0,{vol:.02,type:'triangle'})}}
        // tiros do piloto
        const[hw,hh]=hitBox(e);
        for(const s of shots)if(!s.dead&&Math.abs(s.x-e.x)<hw&&Math.abs(s.y-e.y)<hh){s.dead=1;e.hp-=s.dmg;e.flash=.08;parts.push({x:s.x,y:s.y,vx:0,vy:-.3,l:4,c:'#ffffff'});if(e.hp<=0&&!e.dead){e.dead=1;kill(e)}}
        // encostou na nave
        if(!e.dead&&Math.abs(me.x-e.x)<hw+HIT-2&&Math.abs(me.y-e.y)<hh+HIT-2){hurt();if(e.k!=='mae'){e.dead=1;boom(e.x,e.y,8,['#ffd23f','#ff8a3d'])}}
        if(e.flash>0)e.flash-=dt}
      shots=shots.filter(s=>!s.dead);foes=foes.filter(e=>!e.dead&&e.y<H+16);if(boss&&!foes.includes(boss))boss=null;
      eShots.forEach(s=>{s.x+=s.vx*f;s.y+=s.vy*f;if(Math.abs(s.x-me.x)<HIT&&Math.abs(s.y-me.y)<HIT+1){s.dead=1;hurt()}});eShots=eShots.filter(s=>!s.dead&&s.y<H+4&&s.y>-4&&s.x>-4&&s.x<W+4);
      items.forEach(it=>{it.y+=it.vy*f;if(Math.abs(it.x-me.x)<HIT+5&&Math.abs(it.y-me.y)<HIT+5){it.dead=1;
        if(it.k==='pw'){pow=Math.min(5,pow+1);score+=50;sfx.arp([659,784,988,1319],.05,{vol:.04})}
        else if(it.k==='hp'){lives=Math.min(5,lives+1);sfx.arp([523,659,784,1047],.06,{vol:.04,type:'triangle'})}
        else{shield=6;sfx.arp([784,1047,1319],.06,{vol:.04})}api.score(score)}});items=items.filter(i=>!i.dead&&i.y<H+8);
      parts.forEach(p=>{p.x+=p.vx*f;p.y+=p.vy*f;p.l-=f});parts=parts.filter(p=>p.l>0)}
    function draw(tm){const x=ctx;x.fillStyle='#04030c';x.fillRect(0,0,W,H);
      // nebulosa ao fundo e estrelas em três camadas
      x.fillStyle='rgba(90,40,140,.10)';x.fillRect(0,((tm/60)%(H*2))-H,W,H*.5);
      stars.forEach(s=>{x.fillStyle=['#2a2a4a','#5a5a8a','#c8c8f0'][s.z];x.fillRect(Math.round(s.x),Math.round(s.y),1,s.z===2?2:1)});
      items.forEach(it=>{const b=Math.floor(tm/200)%2,im=S[it.k];x.drawImage(im,Math.round(it.x-im.width/2),Math.round(it.y-3+b))});
      foes.forEach(e=>{const img=e.k==='rock'?(e.big?S.rockG:S.rock):S[e.k];x.drawImage(img,Math.round(e.x-img.width/2),Math.round(e.y-img.height/2));
        if(e.flash>0){x.globalCompositeOperation='lighter';x.drawImage(img,Math.round(e.x-img.width/2),Math.round(e.y-img.height/2));x.globalCompositeOperation='source-over'}});
      if(boss&&foes.includes(boss)){x.fillStyle='#07060f';x.fillRect(W/2-30,3,60,4);x.fillStyle='#ff3d2e';x.fillRect(W/2-29,4,Math.max(0,58*boss.hp/(30+lvl*4)),2)}
      shots.forEach(s=>{x.fillStyle=s.c==='c'?'#2ad4ff':'#ffd23f';x.fillRect(Math.round(s.x)-(s.c==='c'?1:0),Math.round(s.y)-3,s.c==='c'?2:1,4);x.fillStyle='#fff';x.fillRect(Math.round(s.x),Math.round(s.y)-3,1,1)});
      eShots.forEach(s=>{x.fillStyle=Math.floor(tm/90)%2?'#ff3df2':'#ff8a3d';x.fillRect(Math.round(s.x)-1,Math.round(s.y)-1,3,3)});
      // nave
      if(running||lives>0){const vis=!(inv>0&&Math.floor(tm/90)%2);if(vis){x.drawImage(SHIP,Math.round(me.x-SW/2),Math.round(me.y-SH/2));
        if(FL){const fl=FL[Math.floor(tm/80)%2];x.drawImage(fl,Math.round(me.x-SW/2),Math.round(me.y+SH/2-1))}}
        if(shield>0&&(shield>1.5||Math.floor(tm/120)%2)){x.strokeStyle='rgba(42,212,255,.8)';x.beginPath();x.arc(Math.round(me.x),Math.round(me.y),SW*.75,0,6.283);x.stroke()}}
      parts.forEach(p=>{x.fillStyle=p.c;x.fillRect(Math.round(p.x),Math.round(p.y),1,1)});
      if(flash>0){x.fillStyle=`rgba(255,61,46,${flash})`;x.fillRect(0,0,W,H)}
      // vidas e força do tiro
      for(let i=0;i<5;i++)if(i<Math.max(3,lives))x.drawImage(i<lives?S.heart:S.heartE,4+i*7,4);
      x.fillStyle='#ffd23f';x.font='bold 7px monospace';x.textAlign='right';x.textBaseline='top';x.fillText('P'+pow,W-4,4);
      x.fillStyle='#9aa6b8';x.textAlign='left';x.fillText('NÍVEL '+lvl,4,12);
      if(lvlMsg>0&&lvl>1){x.textAlign='center';x.font='bold 12px monospace';x.fillStyle='#07060f';x.fillText('NÍVEL '+lvl,W/2+1,H*.4+1);x.fillStyle=lvl%5===0?'#ff3d2e':'#5dff83';x.fillText(lvl%5===0?'NAVE-MÃE INIMIGA!':'NÍVEL '+lvl,W/2,H*.4)}}
    function loop(tm){raf=requestAnimationFrame(loop);const dt=Math.min(.05,(tm-(last||tm))/1000);last=tm;if(running&&!paused)step(dt);else if(!paused)stars.forEach(s=>{s.y+=(.15+s.z*.25);if(s.y>H){s.y=0}});draw(tm)}
    window.__patrulha=()=>({me,foes,lives,pow,lvl,t,warp:s=>{t=s},give:()=>{pow=5;lives=5}}); // leitura do estado (e atalhos) para testes automáticos
    return{
      ready(){cancelAnimationFrame(raf);reset();running=false;paused=false;last=0;raf=requestAnimationFrame(loop)},
      start(){running=true;sfx.arp([392,523,659,784],.06,{vol:.04})},
      input(){},
      touch(px,py){tgt={x:px,y:py-26}},  // a nave fica acima do dedo, para o dedo não cobrir
      pause(){paused=true},resume(){paused=false;last=0},
      stop(){cancelAnimationFrame(raf);running=false}}}});
})();
