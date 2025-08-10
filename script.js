const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.card');
const dotsContainer = document.getElementById('dots');
let index = 0;
const total = cards.length;

// Build dots
for(let i=0;i<total;i++){
  const d = document.createElement('div');
  d.className='dot'+(i===0?' active':'');
  d.dataset.idx=i;
  d.addEventListener('click', ()=>show(i));
  dotsContainer.appendChild(d);
}

function updateDots(){
  document.querySelectorAll('.dot').forEach((el, i)=> el.classList.toggle('active', i===index));
}

function show(i){
  index = Math.max(0, Math.min(i, total-1));
  const w = cards[0].offsetWidth + 14;
  carousel.style.transform = `translateX(-${index * w}px)`;
  updateDots();
}

// Touch drag
let startX=0, dragging=false, startTranslate=0;
carousel.addEventListener('pointerdown', (e)=>{
  dragging=true;
  startX = e.clientX;
  startTranslate = getTranslateX();
  carousel.style.transition='none';
  e.target.setPointerCapture(e.pointerId);
});
window.addEventListener('pointermove', (e)=>{
  if(!dragging) return;
  const dx = e.clientX - startX;
  carousel.style.transform = `translateX(${startTranslate + dx}px)`;
});
window.addEventListener('pointerup', (e)=>{
  if(!dragging) return;
  dragging=false;
  const dx = e.clientX - startX;
  const w = cards[0].offsetWidth + 14;
  if(Math.abs(dx) > w/4){
    if(dx < 0 && index < total-1) index++;
    else if(dx > 0 && index > 0) index--;
  }
  carousel.style.transition='transform 0.3s ease';
  show(index);
});

function getTranslateX(){
  const st = window.getComputedStyle(carousel).transform;
  if(st === 'none') return 0;
  const m = st.match(/matrix\(([-0-9., ]+)\)/);
  if(m) {
    const parts = m[1].split(',');
    return parseFloat(parts[4]);
  }
  return 0;
}

show(0);

// Modal + YouTube
const openBtn = document.getElementById('openBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');
const yt = document.getElementById('yt');
const ytId = 'QUQhkscsQd4';

openBtn.addEventListener('click', ()=>{
  modal.style.display='flex';
  yt.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
});
closeBtn.addEventListener('click', ()=>{
  yt.src='';
  modal.style.display='none';
});
modal.addEventListener('click', (e)=>{
  if(e.target === modal){ yt.src=''; modal.style.display='none'; }
});
