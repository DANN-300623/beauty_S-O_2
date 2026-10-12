const SCRIPT_URL='';
const doc=document.documentElement;
const hdr=document.getElementById('hdr');
const burger=document.getElementById('burger');
const nav=document.getElementById('nav');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
function setHdr(){if(hdr&&!hdr.classList.contains('solid')){hdr.classList.toggle('s',window.scrollY>40)}}
setHdr();
window.addEventListener('scroll',setHdr,{passive:true});
if(burger&&nav){
const close=()=>{nav.classList.remove('open');hdr.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.textContent='☰'};
burger.addEventListener('click',()=>{const o=nav.classList.toggle('open');hdr.classList.toggle('open',o);burger.setAttribute('aria-expanded',o?'true':'false');burger.textContent=o?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
}
const els=document.querySelectorAll('.rv');
els.forEach((e,i)=>{const sib=[...e.parentElement.children].filter(c=>c.classList.contains('rv'));const k=sib.indexOf(e);if(k>0)e.style.setProperty('--d',(Math.min(k,5)*0.09)+'s')});
if('IntersectionObserver' in window){
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
els.forEach(e=>io.observe(e));
}else{els.forEach(e=>e.classList.add('in'))}
const hero=document.getElementById('hero');
const stage=document.getElementById('stage');
if(hero&&stage){
const frames=[];
frames[3]=stage.querySelector('.fr');
let cur=3;
function show(i){i=Math.max(0,Math.min(6,Math.round(i)));if(i===cur||!frames[i]||!frames[i].complete)return;frames[cur].classList.remove('on');frames[i].classList.add('on');cur=i}
function loadAll(){for(let i=0;i<7;i++){if(frames[i])continue;const im=new Image();im.className='fr';im.alt='';im.width=620;im.height=1200;im.decoding='async';im.src='img/lala'+i+'.webp';stage.appendChild(im);frames[i]=im}}
window.addEventListener('load',()=>{setTimeout(loadAll,fine?500:2200)});
if(!reduce){
if(fine){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();show(((e.clientX-r.left)/r.width)*6)});hero.addEventListener('pointerleave',()=>show(3))}
else{let t=false;window.addEventListener('scroll',()=>{if(t)return;t=true;requestAnimationFrame(()=>{t=false;const h=hero.offsetHeight||1;const p=Math.min(1,Math.max(0,window.scrollY/h));show(1+p*4)})},{passive:true})}
let py=0,rx=0,ry=0,tk=false;
function ap(){stage.style.transform='perspective(1100px) translate3d(0,'+py.toFixed(1)+'px,0) rotateY('+ry.toFixed(2)+'deg) rotateX('+rx.toFixed(2)+'deg)'}
window.addEventListener('scroll',()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{tk=false;const y=window.scrollY;if(y<window.innerHeight*1.2){py=y*0.08;ap()}})},{passive:true});
if(fine){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();ry=(((e.clientX-r.left)/r.width)-.5)*-14;rx=(((e.clientY-r.top)/r.height)-.5)*8;ap()});hero.addEventListener('pointerleave',()=>{ry=0;rx=0;ap()})}
}
}
if(fine&&!reduce){
document.querySelectorAll('.card').forEach(c=>{
c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;c.style.setProperty('--cry',((x-.5)*9).toFixed(2)+'deg');c.style.setProperty('--crx',((.5-y)*7).toFixed(2)+'deg');c.style.setProperty('--gx',(x*100).toFixed(0)+'%');c.style.setProperty('--gy',(y*100).toFixed(0)+'%')});
c.addEventListener('pointerleave',()=>{c.style.setProperty('--cry','0deg');c.style.setProperty('--crx','0deg')});
});
const coll=document.querySelector('.coll');
if(coll){
coll.addEventListener('pointermove',e=>{const r=coll.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;coll.style.setProperty('--ry2',(x*10).toFixed(2)+'deg');coll.style.setProperty('--rx2',(-y*8).toFixed(2)+'deg')});
coll.addEventListener('pointerleave',()=>{coll.style.setProperty('--ry2','0deg');coll.style.setProperty('--rx2','0deg')});
}
}
const tabs=[...document.querySelectorAll('.tab')];
const panels=[...document.querySelectorAll('.panel')];
const views=[...document.querySelectorAll('.pvi')];
function pick(id){
tabs.forEach(t=>t.setAttribute('aria-selected',t.dataset.t===id?'true':'false'));
panels.forEach(p=>{const on=p.id==='p-'+id;p.hidden=!on;p.classList.toggle('in',on)});
views.forEach(v=>v.classList.toggle('on',v.dataset.for===id));
}
if(tabs.length){
tabs.forEach(t=>t.addEventListener('click',()=>pick(t.dataset.t)));
tabs.forEach((t,i)=>t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];n.focus();pick(n.dataset.t)}}));
document.querySelectorAll('.card .more').forEach(a=>a.addEventListener('click',()=>{const id=(a.getAttribute('href')||'').replace('#c-','');if(tabs.some(t=>t.dataset.t===id))pick(id)}));
pick('lice');
}
const form=document.getElementById('kform');
if(form){
const msg=document.getElementById('kmsg');
form.addEventListener('submit',async ev=>{
ev.preventDefault();
msg.className='msg';
if(form.website.value){return}
const ime=form.ime.value.trim(),tel=form.tel.value.trim(),por=form.poruka.value.trim();
if(!ime||!tel||!por){msg.textContent='Popunite ime, telefon i poruku.';msg.className='msg er';return}
if(!form.saglasnost.checked){msg.textContent='Potvrdite saglasnost da Vas možemo kontaktirati.';msg.className='msg er';return}
if(!SCRIPT_URL){msg.textContent='Nacrt: slanje još nije povezano. Pozovite nas na telefon.';msg.className='msg er';return}
const btn=form.querySelector('button[type=submit]');
btn.disabled=true;
try{
const r=await fetch(SCRIPT_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({ime:ime,telefon:tel,poruka:por})});
const j=await r.json();
if(j&&j.ok){msg.textContent='Hvala, poruka je poslata. Javićemo Vam se.';msg.className='msg ok';form.reset()}else{throw new Error('x')}
}catch(e){msg.textContent='Slanje nije uspelo. Pozovite nas na 065 425 2602.';msg.className='msg er'}
btn.disabled=false;
});
}
