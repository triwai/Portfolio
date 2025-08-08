// script.js
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

/* Toggle film noise */
const noise = document.getElementById('noise');
const toggleNoise = document.getElementById('toggleNoise');
if (toggleNoise) {
    toggleNoise.addEventListener('click', () => {
        const on = noise.style.opacity !== '0.22';
        noise.style.opacity = on ? '0.22' : '0';
        toggleNoise.setAttribute('aria-pressed', String(on));
    });
}

/* Particle field (silver dust) */
(() => {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(2, window.devicePixelRatio || 1);
    let w, h, particles;

    function resize(){
        w = canvas.width = Math.floor(innerWidth * DPR);
        h = canvas.height = Math.floor(innerHeight * DPR);
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        init();
    }

    function init(){
        const count = Math.floor((innerWidth * innerHeight) / 18000);
        particles = new Array(count).fill().map(() => ({
            x: Math.random()*w,
            y: Math.random()*h,
            vx: (Math.random()-.5)*.12*DPR,
            vy: (Math.random()-.5)*.12*DPR,
            r: (Math.random()*1.6 + .4) * DPR,
            a: Math.random()*0.6 + 0.2
        }));
    }

    function step(){
        ctx.clearRect(0,0,w,h);
        ctx.globalCompositeOperation = 'lighter';
        for (const p of particles){
            p.x += p.vx; p.y += p.vy;
            if (p.x < -10) p.x = w+10; if (p.x > w+10) p.x = -10;
            if (p.y < -10) p.y = h+10; if (p.y > h+10) p.y = -10;
            const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*2.5);
            g.addColorStop(0, `rgba(255,255,255,${0.45*p.a})`);
            g.addColorStop(1, `rgba(192,192,192,0)`);
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        }
        requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    step();
})();

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
}, {threshold:.2});
reveals.forEach(el=>io.observe(el));

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
        const id = a.getAttribute('href');
        const el = document.querySelector(id);
        if (el){
            e.preventDefault();
            el.scrollIntoView({behavior:'smooth', block:'start'});
        }
    });
});

// Works は削除したため、GitHub取得処理はありません