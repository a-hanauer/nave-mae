/* VERME DOS DUTOS — o Snake da Nave-Mãe.
   Um verme alien rasteja pelos dutos da estação comendo ovos. Cada ovo aumenta o corpo e a velocidade.
   Bater na parede do duto ou no próprio corpo encerra. A cada 5 ovos aparece um ovo dourado por pouco tempo (+3).
   Arte desenhada em células de 8×8 pixels, exibida a 2 px por pixel (mesmo grid do app). */
(function(){
const P={k:'#050608',H:'#93a2bb',h:'#55617a',d:'#2f3747',D:'#1b2029',W:'#f0f5fb',g:'#39e35f',G:'#c4ff9e',r:'#ff5a3d',
  A:'#dcc390',a:'#a8865a',b:'#6b5236',Y:'#fff3a0',O:'#ffb300',o:'#a86f00'};
const HEAD=['.kkkkk..','kdhHHhkk','khHWHhWk','kdhHhkgk','kdhhhkgk','khhhhhWk','kddhhdkk','.kkkkk..'];  // virada para a direita: domo liso, dentes e boca ácida
const BODY=['.kkkkkk.','kdhHHhdk','khHWHHhk','kdhHHhdk','kddhhddk','kgddddgk','.kddddk.','..kkkk..'];  // anel do corpo indo para cima, poros de ácido nos lados
const BOD2=['.kkkkkk.','kdhHHhdk','khHHHhhk','kdhHhhdk','kddhhddk','kDddddDk','.kddddk.','..kkkk..'];
const TAIL=['........','..kkkk..','.kdhHdk.','.khhhdk.','..kddk..','...kk...','........','........'];
const EGG =['..kkkk..','.kAAAak.','kAAkgAak','kAAgAaak','kAaaaabk','kaaaabbk','.kbbbbk.','..kkkk..'];
const GOLD=EGG.map(r=>r.replace(/A/g,'Y').replace(/a/g,'O').replace(/b/g,'o'));
const rot=g=>g[0].split('').map((_,x)=>g.map(r=>r[x]).reverse().join(''));   // gira 90° no sentido horário
const turns=g=>{const o={right:g};o.down=rot(g);o.left=rot(o.down);o.up=rot(o.left);return o};
function mk(rows,sub){const c=document.createElement('canvas');c.width=rows[0].length;c.height=rows.length;const x=c.getContext('2d');
  rows.forEach((r,y)=>[...r].forEach((ch,i)=>{if(ch==='.')return;x.fillStyle=(sub&&sub[ch])||P[ch];x.fillRect(i,y,1,1)}));return c}
const imgs=(g,sub)=>{const t=turns(g),o={};for(const k in t)o[k]=mk(t[k],sub);return o};
const OPP={up:'down',down:'up',left:'right',right:'left'},DV={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
const dirOf=(a,b)=>a.x>b.x?'right':a.x<b.x?'left':a.y>b.y?'down':'up';

ARC.add({id:'verme',name:'VERME DOS DUTOS',tema:{cab:'#24352b',luz:'#8dff3a',deco:'acido'},unit:'OVOS',cell:8,
  desc:'Coma os ovos sem bater nas paredes nem no próprio corpo.',
  icon:['................','..kkkk..........','.kHHhdk.........','kHhhddWk...kkk..','khdkkdWg..kAAak.','khdk.kkk.kAgAak.',
        'khdk.....kAaabk.','khddkkkk..kbbk..','.kdhhhhdk..kk...','..kddddDk.......','...kkkkk........','................'],
  iconPal:P,
  /* tela da máquina na sala (8×7 pixels): o verme dando voltas atrás de um ovo */
  attract(x,X,Y,w,h,t){x.fillStyle='#06140b';x.fillRect(X,Y,w,h);
    const ring=[];for(let i=1;i<w-1;i++)ring.push([i,1]);for(let j=2;j<h-1;j++)ring.push([w-2,j]);for(let i=w-3;i>0;i--)ring.push([i,h-2]);for(let j=h-3;j>1;j--)ring.push([1,j]);
    const k=Math.floor(t/160);x.fillStyle='#d8bf8a';x.fillRect(X+3,Y+3,2,1);
    for(let s=0;s<4;s++){const[a,b]=ring[(k-s+ring.length*9)%ring.length];x.fillStyle=s?'#1f9a3a':'#c4ff9e';x.fillRect(X+a,Y+b,1,1)}},
  make(api){
    const{ctx,cols,rows,sfx}=api,C=8;
    const E={k:'#1f5a33'}; // contorno verde-ácido escuro: o verme se destaca do piso
    const S={head:imgs(HEAD,E),dead:imgs(HEAD,{k:'#5a1a10',H:'#ff9a7a',h:'#c8402a',d:'#7a1a10',D:'#4a0a06'}),body:imgs(rot(BODY),E),bod2:imgs(rot(BOD2),E),tail:mk(TAIL,E),
      egg:[mk(EGG),mk(EGG,{g:P.G})],gold:[mk(GOLD),mk(GOLD,{g:'#ffffff'})]};
    // piso do duto: chapas com bisel, grades de ventilação e manchas de ácido
    const bg=document.createElement('canvas');bg.width=cols*C;bg.height=rows*C;
    (function(){const x=bg.getContext('2d');let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
      for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const X=i*C,Y=j*C;
        x.fillStyle='#101318';x.fillRect(X,Y,C,C);x.fillStyle='#151920';x.fillRect(X,Y,C,1);x.fillRect(X,Y,1,C);
        x.fillStyle='#0b0d11';x.fillRect(X,Y+C-1,C,1);x.fillRect(X+C-1,Y,1,C);
        if((i*3+j*5)%11===0){x.fillStyle='#08090c';for(let k=2;k<6;k+=2)x.fillRect(X+2,Y+k,4,1)}
        else if(rnd()<.05){x.fillStyle='#0f2216';x.fillRect(X+2+(rnd()*3|0),Y+3,2,2)}}
      // rebites nas junções das chapas
      x.fillStyle='#1f232c';for(let j=0;j<rows;j+=4)for(let i=0;i<cols;i+=4)x.fillRect(i*C,j*C,1,1)})();
    let sn,dir,q,egg,gold,score,eaten,tick,acc,lastT,raf=0,dead=0,parts=[],paused=false,running=false;
    const free=()=>{const occ=new Set(sn.map(p=>p.x+','+p.y));if(egg)occ.add(egg.x+','+egg.y);if(gold)occ.add(gold.x+','+gold.y);
      const f=[];for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)if(!occ.has(x+','+y))f.push({x,y});return f[Math.random()*f.length|0]};
    function reset(){const cy=rows>>1,cx=(cols>>1)-1;sn=[{x:cx+1,y:cy},{x:cx,y:cy},{x:cx-1,y:cy}];dir='right';q=[];score=0;eaten=0;gold=null;egg=null;dead=0;parts=[];tick=170;
      egg=free();api.score(0)}
    function splash(p,col){for(let i=0;i<8;i++)parts.push({x:p.x*C+4,y:p.y*C+4,vx:(Math.random()-.5)*1.6,vy:(Math.random()-.5)*1.6,t:14,c:col})}
    function step(){if(q.length)dir=q.shift();const h=sn[0],[dx,dy]=DV[dir],n={x:h.x+dx,y:h.y+dy};
      const grow=(egg&&n.x===egg.x&&n.y===egg.y)||(gold&&n.x===gold.x&&n.y===gold.y);
      const body=grow?sn:sn.slice(0,-1);
      if(n.x<0||n.y<0||n.x>=cols||n.y>=rows||body.some(p=>p.x===n.x&&p.y===n.y)){die();return}
      sn.unshift(n);
      if(egg&&n.x===egg.x&&n.y===egg.y){score++;eaten++;api.score(score);splash(n,P.g);
        sfx.note(520+Math.min(eaten,24)*25,.07,0,{vol:.05});sfx.noise(.06,0,{f:2600,filter:'bandpass',vol:.03});
        egg=free();if(eaten%5===0&&!gold){gold=free();gold.t=Math.max(24,Math.min(cols,rows)*2)}}
      else if(gold&&n.x===gold.x&&n.y===gold.y){score+=3;api.score(score);splash(n,P.O);gold=null;sfx.arp([784,988,1175,1568],.05,{vol:.05})}
      else sn.pop();
      if(gold&&--gold.t<=0)gold=null;
      tick=Math.max(78,170-score*3)}
    function die(){dead=performance.now();running=false;splash(sn[0],P.r);
      sfx.noise(.45,0,{f:900,to:120,vol:.09});sfx.note(330,.4,0,{to:80,type:'sawtooth',vol:.05});
      setTimeout(()=>api.over(),1000)}
    function draw(t){ctx.drawImage(bg,0,0);
      const blink=Math.floor(t/300)%2;
      if(egg)ctx.drawImage(S.egg[blink],egg.x*C,egg.y*C);
      if(gold&&(gold.t>8||blink))ctx.drawImage(S.gold[Math.floor(t/150)%2],gold.x*C,gold.y*C);
      const show=!dead||Math.floor((t-dead)/120)%2===0||t-dead>700;
      if(show)for(let i=sn.length-1;i>=0;i--){const p=sn[i],X=p.x*C,Y=p.y*C;
        if(i===0)ctx.drawImage((dead?S.dead:S.head)[sn.length>1?dirOf(sn[0],sn[1]):dir],X,Y);
        else if(i===sn.length-1)ctx.drawImage(S.tail,X,Y);
        else{const d=dirOf(sn[i-1],p),o=(i+(running?Math.floor(t/140):0))%3===0;ctx.drawImage((o?S.body:S.bod2)[d],X,Y)}}
      parts=parts.filter(s=>{s.x+=s.vx;s.y+=s.vy;s.t--;ctx.fillStyle=s.c;ctx.fillRect(Math.round(s.x),Math.round(s.y),1,1);return s.t>0})}
    function loop(t){raf=requestAnimationFrame(loop);if(paused)return;
      if(running){acc+=Math.min(250,t-lastT);while(running&&acc>=tick){acc-=tick;step()}}
      lastT=t;draw(t)}
    window.__verme=()=>({sn,egg,dir,cols,rows}); // leitura do estado para testes automáticos
    return{
      ready(){cancelAnimationFrame(raf);reset();running=false;paused=false;lastT=performance.now();raf=requestAnimationFrame(loop)},
      start(){running=true;acc=0;lastT=performance.now()},
      input(d){const l=q.length?q[q.length-1]:dir;if(d===l||OPP[d]===l||q.length>=2)return;q.push(d)},
      pause(){paused=true},resume(){paused=false;lastT=performance.now()},
      stop(){cancelAnimationFrame(raf)}}}});
})();
