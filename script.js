// Ultra-modern Interactive System - BEST PORTFOLIO 2025
document.addEventListener('DOMContentLoaded', () => {
    // Set year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Duplicate carousel items for infinite scroll
    const carouselTrack = document.getElementById('carouselTrack');
    if (carouselTrack) {
        const items = carouselTrack.innerHTML;
        carouselTrack.innerHTML = items + items;
    }

    // Advanced Particle System
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: 0, y: 0 };
        let animationId;

        // Resize canvas
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.hue = Math.random() * 60 + 200; // Blue to purple range
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
                ctx.shadowBlur = 15;
                ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        function init() {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        // Connect particles with lines
        function connectParticles() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.save();
                        ctx.globalAlpha = 0.1 * (1 - distance / 120);
                        ctx.strokeStyle = '#007AFF';
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            connectParticles();
            animationId = requestAnimationFrame(animate);
        }

        // Mouse move handler
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Initialize
        resize();
        init();
        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            resize();
            init();
        });
    }

    // Smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                smoothScroll(targetPosition, 1000);
            }
        });
    });

    // Custom smooth scroll function
    function smoothScroll(target, duration) {
        const start = window.pageYOffset;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Navigation transparency on scroll
    const nav = document.querySelector('.navigation');
    let lastScrollY = 0;

    function updateNavigation() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(50px) saturate(200%)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.backdropFilter = 'blur(40px) saturate(180%)';
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', updateNavigation, { passive: true });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.feature-card, .skill-group, .contact-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Language carousel hover effects
    document.querySelectorAll('.language-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) rotateX(10deg) rotateY(-5deg) scale(1.05)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Parallax effect for orbs
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        document.querySelectorAll('.orb').forEach((orb, index) => {
            const speed = (index + 1) * 30;
            orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });

    // Magnetic button effect
    document.querySelectorAll('.btn-main, .btn-outline').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Performance monitoring
    let fps = 0;
    let lastTime = performance.now();

    function measureFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;

        if (fps < 30) {
            // Reduce particle count if performance is poor
            console.warn('Low FPS detected, optimizing...');
        }

        requestAnimationFrame(measureFPS);
    }

    measureFPS();

    // Console branding
    console.log(
        '%c KIRIKAE PORTFOLIO 2025 ',
        'background: linear-gradient(135deg, #007AFF, #5856D6); color: white; font-size: 24px; font-weight: bold; padding: 20px; border-radius: 10px;'
    );
    console.log(
        '%c Crafted with precision and passion ',
        'color: #007AFF; font-size: 14px; font-style: italic;'
    );
});

// Preload critical resources
window.addEventListener('load', () => {
    // Remove loading state
    document.body.style.opacity = '1';

    // Trigger initial animations
    document.querySelector('.hero-section').classList.add('loaded');
});