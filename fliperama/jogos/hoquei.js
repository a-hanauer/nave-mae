/* HÓQUEI DE MESA — jogado na mesa do meio da sala, contra o Kai e o Zorp.
   O piloto controla o rebatedor de baixo arrastando o dedo na mesa (ele segue o dedo, com velocidade máxima).
   Ganha a rodada quem fizer 5 gols. Cada rodada vencida conta uma vitória e chama um adversário mais rápido;
   perder uma rodada encerra a partida. Pontos = vitórias seguidas.
   Desenho em pixels (1 px de arte = 2 px na tela), física simples de disco e rebatedores redondos. */
(function(){
const GOALS=5;
const RIVAIS=[{nome:'KAI',cor:['#5fa0d8','#2a5a8a','#a8d8ff']},{nome:'ZORP',cor:['#7ad86a','#3a8a3a','#c8ffb0']}];
function disc(x,cx,cy,r,c){for(let dy=-r;dy<=r;dy++){const w=Math.floor(Math.sqrt(r*r-dy*dy+r*.8));x.fillStyle=c;x.fillRect(Math.round(cx-w),Math.round(cy+dy),w*2+1,1)}}
ARC.add({id:'hoquei',name:'HÓQUEI DE MESA',unit:'VITÓRIAS',cell:8,lugar:'hockey',controls:'touch',
  tema:{cab:'#1f4a8a',luz:'#2ad4ff',deco:'hoquei'},
  desc:'Arraste o rebatedor e faça 5 gols antes do adversário. Cada vitória chama um rival mais rápido.',
  make(api){
    const{ctx,cols,rows,sfx}=api,W=cols*8,H=rows*8,GW=Math.round(W*.42),PR=4,MR=8;
    const meCol=(()=>{try{const o=(JSON.parse(localStorage.getItem('navemae-avatar'))||{}).ov||{};return[o[2]||'#5dff83',o[3]||'#1f9a3a',o[1]||'#c4ff9e']}catch(e){return['#5dff83','#1f9a3a','#c4ff9e']}})();
    let pk,me,ai,sc,round,wins,running=false,paused=false,raf=0,last=0,hold=0,msg='',msgT=0,target={x:W/2,y:H*.8},trail=[];
    function resetPuck(toMe){pk={x:W/2,y:toMe?H*.62:H*.38,vx:0,vy:0};hold=.7}
    function reset(full){me={x:W/2,y:H*.85,vx:0,vy:0};ai={x:W/2,y:H*.15,vx:0,vy:0};target={x:me.x,y:me.y};sc=[0,0];
      if(full){round=1;wins=0;api.score(0)}resetPuck(true);trail=[]}
    const aiSpeed=()=>1.6+round*.45;
    function collide(m){const dx=pk.x-m.x,dy=pk.y-m.y,d=Math.hypot(dx,dy),R=PR+MR;if(d>=R||d===0)return;
      const nx=dx/d,ny=dy/d;pk.x=m.x+nx*R;pk.y=m.y+ny*R;
      const rv=(pk.vx-m.vx)*nx+(pk.vy-m.vy)*ny;if(rv<0){pk.vx-=1.9*rv*nx;pk.vy-=1.9*rv*ny}
      pk.vx+=m.vx*.35;pk.vy+=m.vy*.35;const s=Math.hypot(pk.vx,pk.vy),MAX=7.5;if(s>MAX){pk.vx*=MAX/s;pk.vy*=MAX/s}
      sfx.noise(.04,0,{f:2200,filter:'bandpass',vol:.05})}
    function moveMallet(m,tx,ty,maxS,minY,maxY){let dx=tx-m.x,dy=ty-m.y;const d=Math.hypot(dx,dy);if(d>maxS){dx*=maxS/d;dy*=maxS/d}
      const ox=m.x,oy=m.y;m.x=Math.max(MR+2,Math.min(W-MR-2,m.x+dx));m.y=Math.max(minY,Math.min(maxY,m.y+dy));m.vx=m.x-ox;m.vy=m.y-oy}
    function goal(mine){if(mine){sc[0]++;sfx.arp([523,659,784,1047],.07,{vol:.05});msg='GOL!'}else{sc[1]++;sfx.arp([392,330,262],.1,{vol:.05,type:'triangle'});msg='GOL DO '+RIVAIS[(round-1)%2].nome}
      msgT=1.1;
      if(sc[0]>=GOALS){wins++;api.score(wins);round++;msg='VITÓRIA!';msgT=1.6;sfx.arp([523,659,784,1047,1319],.08,{vol:.05});setTimeout(()=>{if(running){reset(false);msg='RODADA '+round+': '+RIVAIS[(round-1)%2].nome;msgT=1.6}},1400);hold=99}
      else if(sc[1]>=GOALS){running=false;msg='FIM DA PARTIDA';msgT=9;setTimeout(()=>api.over(),1300)}
      else resetPuck(!mine)}
    function step(dt){const f=dt*60;
      moveMallet(me,target.x,target.y,9*f,H/2+MR,H-MR-2);
      // adversário: defende o gol e ataca quando o disco está do lado dele
      let tx,ty;const s=aiSpeed()*f;
      if(pk.y<H/2&&!(hold>0)){tx=pk.x+(pk.x-W/2)*.15;ty=pk.y-MR*.6;if(pk.vy<-1.5){ty=Math.min(ty,H*.2)}}
      else{tx=W/2+(pk.x-W/2)*.55;ty=H*.13}
      moveMallet(ai,tx,ty,s,MR+2,H/2-MR);
      if(hold>0){hold-=dt;if(hold<=0)hold=0;else return}
      pk.x+=pk.vx*f;pk.y+=pk.vy*f;pk.vx*=Math.pow(.993,f);pk.vy*=Math.pow(.993,f);
      if(pk.x<PR+2){pk.x=PR+2;pk.vx=Math.abs(pk.vx);sfx.note(660,.03,0,{vol:.03})}
      if(pk.x>W-PR-2){pk.x=W-PR-2;pk.vx=-Math.abs(pk.vx);sfx.note(660,.03,0,{vol:.03})}
      const inGoal=Math.abs(pk.x-W/2)<GW/2;
      if(pk.y<PR+2){if(inGoal){if(pk.y<-PR){goal(true);return}}else{pk.y=PR+2;pk.vy=Math.abs(pk.vy);sfx.note(660,.03,0,{vol:.03})}}
      if(pk.y>H-PR-2){if(inGoal){if(pk.y>H+PR){goal(false);return}}else{pk.y=H-PR-2;pk.vy=-Math.abs(pk.vy);sfx.note(660,.03,0,{vol:.03})}}
      collide(me);collide(ai);
      trail.push([pk.x,pk.y]);if(trail.length>5)trail.shift()}
    function draw(t){const x=ctx;
      x.fillStyle='#dfeaf8';x.fillRect(0,0,W,H);
      x.fillStyle='#c8d8ee';for(let j=6;j<H;j+=8)for(let i=(j/8%2)*4+4;i<W;i+=8)x.fillRect(i,j,1,1);   // furinhos de ar
      x.fillStyle='#2a6ad8';x.fillRect(0,0,2,H);x.fillRect(W-2,0,2,H);
      x.fillStyle='#e03a3a';x.fillRect(0,Math.floor(H/2),W,1);
      x.strokeStyle='#e03a3a';x.lineWidth=1;x.beginPath();x.arc(W/2,H/2,18,0,Math.PI*2);x.stroke();
      x.fillStyle='#2a6ad8';x.fillRect(0,0,(W-GW)/2,2);x.fillRect((W+GW)/2,0,(W-GW)/2,2);x.fillRect(0,H-2,(W-GW)/2,2);x.fillRect((W+GW)/2,H-2,(W-GW)/2,2);
      x.fillStyle='#07060f';x.fillRect((W-GW)/2,0,GW,2);x.fillRect((W-GW)/2,H-2,GW,2);
      // placar da rodada no meio da mesa
      x.fillStyle='rgba(42,106,216,.18)';x.font='bold 16px monospace';x.textAlign='center';x.textBaseline='middle';
      x.fillText(sc[1],W/2,H/2-12);x.fillText(sc[0],W/2,H/2+13);
      trail.forEach(([a,b],i)=>{x.fillStyle=`rgba(7,6,15,${.08*(i+1)})`;x.fillRect(Math.round(a)-1,Math.round(b)-1,2,2)});
      const rv=RIVAIS[(round-1)%2].cor;
      disc(x,ai.x,ai.y+1,MR,'rgba(0,0,0,.25)');disc(x,ai.x,ai.y,MR,'#07060f');disc(x,ai.x,ai.y,MR-1,rv[1]);disc(x,ai.x-1,ai.y-1,MR-3,rv[0]);disc(x,ai.x-2,ai.y-2,2,rv[2]);
      disc(x,me.x,me.y+1,MR,'rgba(0,0,0,.25)');disc(x,me.x,me.y,MR,'#07060f');disc(x,me.x,me.y,MR-1,meCol[1]);disc(x,me.x-1,me.y-1,MR-3,meCol[0]);disc(x,me.x-2,me.y-2,2,meCol[2]);
      disc(x,pk.x,pk.y,PR,'#07060f');x.fillStyle='#4a4a5a';x.fillRect(Math.round(pk.x)-1,Math.round(pk.y)-2,2,1);
      if(msgT>0){x.font='bold 13px monospace';x.fillStyle='#07060f';x.fillText(msg,W/2+1,H/2+1);x.fillStyle=msg.startsWith('GOL DO')||msg==='FIM DA PARTIDA'?'#e03a3a':'#1f9a3a';x.fillText(msg,W/2,H/2)}
      x.font='bold 9px monospace';x.fillStyle='#2a6ad8';x.textAlign='left';x.fillText(RIVAIS[(round-1)%2].nome,4,10)}
    function loop(t){raf=requestAnimationFrame(loop);const dt=Math.min(.05,(t-(last||t))/1000);last=t;
      if(running&&!paused){step(dt);if(msgT>0)msgT-=dt}draw(t)}
    return{
      ready(){cancelAnimationFrame(raf);reset(true);running=false;paused=false;msg='';msgT=0;last=0;raf=requestAnimationFrame(loop)},
      start(){running=true;msg='RODADA 1: '+RIVAIS[0].nome;msgT=1.4;hold=.9},
      input(){},
      touch(px,py){target={x:px,y:py}},
      pause(){paused=true},resume(){paused=false;last=0},
      stop(){cancelAnimationFrame(raf);running=false}}}});
})();
