/* ==========================================================================
   Urdu Poetry 101 - Premium Beautification Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. Ambient Background: Floating "Gold Dust" Particles
       ---------------------------------------------------------------------- */
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.insertBefore(canvas, document.body.firstChild);
    
    // Style the canvas to sit fixed in the background
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        pointerEvents: 'none',
        opacity: '0.6'
    });

    let particlesArray = [];
    const colors = ['#d49573', '#fce3d4', '#9e5b3c']; // Rose gold & copper palette

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; // Tiny dust particles
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();

    /* ----------------------------------------------------------------------
       2. Mouse Spotlight (Ambient Glow)
       ---------------------------------------------------------------------- */
    const spotlight = document.createElement('div');
    Object.assign(spotlight.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: '-1',
        background: 'radial-gradient(circle 600px at 50% 50%, rgba(212, 149, 115, 0.05), transparent 80%)',
        transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(spotlight);

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        spotlight.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, rgba(212, 149, 115, 0.07), transparent 80%)`;
    });

    /* ----------------------------------------------------------------------
       3. Simple Rise Hover Effect for Glass Cards
       ---------------------------------------------------------------------- */
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    /* ----------------------------------------------------------------------
       4. Staggered Scroll Reveals
       ---------------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight stagger delay based on grid position
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.glass-section, .glass-card, .poetry-couplet, .taqtee-block');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        revealObserver.observe(el);
    });

    /* ----------------------------------------------------------------------
       5. Reading Progress Bar 
       ---------------------------------------------------------------------- */
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + '%';
        });
    }
});