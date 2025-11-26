// Modern Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Tech carousel duplication for infinite scroll
    const techTrack = document.getElementById('techTrack');
    if (techTrack) {
        const items = techTrack.innerHTML;
        techTrack.innerHTML = items + items; // Duplicate for seamless loop
    }

    // Ocean waves canvas animation
    const canvas = document.getElementById('ocean-waves');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let waves = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createWave(index) {
            return {
                amplitude: 30 + Math.random() * 40,
                frequency: 0.01 + Math.random() * 0.02,
                speed: 0.001 + Math.random() * 0.002,
                offset: Math.random() * Math.PI * 2,
                opacity: 0.05 + Math.random() * 0.1,
                y: canvas.height * (0.3 + index * 0.15)
            };
        }

        function initWaves() {
            waves = [];
            for (let i = 0; i < 4; i++) {
                waves.push(createWave(i));
            }
        }

        function drawWave(wave, time) {
            ctx.beginPath();
            ctx.moveTo(0, wave.y);

            for (let x = 0; x <= canvas.width; x++) {
                const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, canvas.height);
            gradient.addColorStop(0, `rgba(0, 217, 255, ${wave.opacity})`);
            gradient.addColorStop(0.5, `rgba(0, 149, 255, ${wave.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(0, 53, 102, 0)`);

            ctx.fillStyle = gradient;
            ctx.fill();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now();

            waves.forEach(wave => drawWave(wave, time));
            animationId = requestAnimationFrame(animate);
        }

        resizeCanvas();
        initWaves();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initWaves();
        });
    }

    // Particle system
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 10}s linear infinite;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Add particle float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            from {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Navigation height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.glass-card, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });

    // Navigation scroll effect
    const nav = document.querySelector('.nav-glass');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 8, 20, 0.95)';
            nav.style.backdropFilter = 'blur(24px) saturate(200%)';
        } else {
            nav.style.background = 'rgba(0, 8, 20, 0.7)';
            nav.style.backdropFilter = 'blur(20px) saturate(180%)';
        }

        lastScroll = currentScroll;
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // For now, just adds a visual feedback
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Add hover effect for tech items
    document.querySelectorAll('.tech-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1) rotateZ(5deg)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) scale(1) rotateZ(0)';
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        const floats = document.querySelectorAll('.float-element');
        floats.forEach((float, index) => {
            const speed = (index + 1) * 20;
            float.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    });

    // Add ripple effect on buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .contact-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                width: 100px;
                height: 100px;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Performance optimization - Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll performance
    const optimizedScroll = debounce(() => {
        // Handle any intensive scroll operations here
    }, 100);

    window.addEventListener('scroll', optimizedScroll, { passive: true });
});

// Console Easter Egg
console.log('%c Welcome to Kirikae\'s Portfolio! ', 'background: linear-gradient(135deg, #00D9FF, #0095FF); color: white; font-size: 20px; padding: 10px; border-radius: 5px; font-weight: bold;');
console.log('%c Built with ❤️ and precision engineering ', 'color: #00D9FF; font-size: 14px;');