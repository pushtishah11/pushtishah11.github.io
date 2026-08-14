/* ---------- router ---------- */
const routes={'/':'p-home','/about':'p-about','/experience':'p-exp','/projects':'p-proj','/skills':'p-skills','/beyond':'p-beyond','/contact':'p-contact'};
function route(){
  const h=(location.hash.replace('#','')||'/');
  const id=routes[h]||'p-home';
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('on',p.id===id));
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('on',a.dataset.r===h));
  window.scrollTo({top:0,behavior:'auto'});
}
window.addEventListener('hashchange',route);
route();

/* ---------- terminal ---------- */
const out=document.getElementById('term-out');
const input=document.getElementById('term-input');
const P='<span class="p">➜</span> <span class="c">~</span> ';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function lineTo(el,html){const d=document.createElement('div');d.className='term-line';d.innerHTML=html;el.appendChild(d);el.scrollTop=el.scrollHeight;}
function line(html){lineTo(out,html);}

function typeLine(html,cmd,done){
  if(reduced){line(P+'<span>'+cmd+'</span>');line(html);done&&done();return;}
  const d=document.createElement('div');d.className='term-line';d.innerHTML=P;out.appendChild(d);
  let i=0;const cur=document.createElement('span');cur.className='cursor';d.appendChild(cur);
  const t=setInterval(()=>{
    if(i<cmd.length){cur.insertAdjacentText('beforebegin',cmd[i++]);out.scrollTop=out.scrollHeight;}
    else{clearInterval(t);cur.remove();setTimeout(()=>{line(html);done&&done();},220);}
  },55);
}

function goto(h,print,after){print('<span class="m">opening ~'+h.replace('#/','/')+'…</span>');setTimeout(()=>{location.hash=h;after&&after();},350);}
const CMDS={
  help:(p)=>p('<span class="m">available commands:</span>\n  <span class="c">whoami</span>      — who is this\n  <span class="c">now</span>         — what I\'m doing currently\n  <span class="c">home</span>        — back to start\n  <span class="c">about</span>       — the longer story\n  <span class="c">projects</span>    — jump to projects\n  <span class="c">experience</span>  — jump to experience\n  <span class="c">skills</span>      — the toolbox\n  <span class="c">beyond</span>      — life outside the editor\n  <span class="c">contact</span>     — how to reach me\n  <span class="c">resume</span>      — download my resume\n  <span class="c">clear</span>       — clear terminal'),
  whoami:(p)=>p('Pushti Shah — AI engineer. Math–CS @ UC San Diego \'27. I build retrieval systems, ML pipelines, and products that ship.'),
  now:(p)=>p('<span class="p">AI Engineering Intern @ Paramount / CBS News</span> — building AI media workflows in NYC. Summer 2026.'),
  home:(p,after)=>goto('#/',p,after),
  about:(p,after)=>goto('#/about',p,after),
  projects:(p,after)=>goto('#/projects',p,after),
  experience:(p,after)=>goto('#/experience',p,after),
  skills:(p,after)=>goto('#/skills',p,after),
  beyond:(p,after)=>goto('#/beyond',p,after),
  contact:(p,after)=>goto('#/contact',p,after),
  resume:(p)=>{p('<span class="m">opening resume…</span>');window.open('resume/Pushti_Shah_Resume.pdf','_blank','noopener');},
  clear:(p,_,el)=>{el.innerHTML='';}
};
function runCmd(v,el,after){
  const p=(h)=>lineTo(el,h);
  lineTo(el,P+v.replace(/</g,'&lt;'));
  const fn=CMDS[v];
  fn?fn(p,after,el):p('<span class="m">command not found: '+v.replace(/</g,'&lt;')+' — try `help`</span>');
}

input.addEventListener('keydown',e=>{
  if(e.key!=='Enter')return;
  const v=input.value.trim().toLowerCase();
  if(!v)return;
  runCmd(v,out);
  input.value='';
});
document.querySelector('#p-home .term-body').addEventListener('click',()=>input.focus());

/* ---------- drop-down console ---------- */
const qterm=document.getElementById('qterm');
const qout=document.getElementById('qterm-out');
const qinput=document.getElementById('qterm-input');
const qbtn=document.getElementById('qterm-toggle');
let qintro=false;
function qtoggle(force){
  const open=typeof force==='boolean'?force:!qterm.classList.contains('open');
  qterm.classList.toggle('open',open);
  qterm.setAttribute('aria-hidden',String(!open));
  if(open){
    if(!qintro){lineTo(qout,'<span class="m">console ready — type `help`, or a page name to jump there.</span>');qintro=true;}
    setTimeout(()=>qinput.focus(),120);
  } else {qinput.blur();}
}
qbtn.addEventListener('click',()=>qtoggle());
document.addEventListener('keydown',e=>{
  if(e.key==='`' && document.activeElement!==input && document.activeElement!==qinput){e.preventDefault();qtoggle();}
  if(e.key==='Escape' && qterm.classList.contains('open')) qtoggle(false);
});
qinput.addEventListener('keydown',e=>{
  if(e.key!=='Enter')return;
  const v=qinput.value.trim().toLowerCase();
  if(!v)return;
  runCmd(v,qout,()=>qtoggle(false));
  qinput.value='';
});

/* intro sequence */
typeLine('Pushti Shah — AI engineer.\n<span class="m">Math–CS @ UC San Diego · Data Science minor · class of 2027</span>',
 'whoami',()=>{
  setTimeout(()=>{
    typeLine('<span class="p">AI Engineering Intern @ Paramount / CBS News</span> <span class="m">· New York · summer 2026</span>\n<span class="m">building AI media workflows, RAG systems & document intelligence</span>',
     'now',()=>{
       setTimeout(()=>line('<span class="m">type `help` to explore ↴</span>'),400);
     });
  },500);
});
