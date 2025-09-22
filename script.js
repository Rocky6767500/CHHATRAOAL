// CHHATRAOAL - Futuristic Artist Portfolio (Original Complex Script)
// Motion-based interactive elements with psychological depth

class ArtisticPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.backgroundCanvas = null;
        this.backgroundCtx = null;
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initBackgroundCanvas();
        this.setupCustomCursor();
        this.startLoadingSequence(); // This will handle the auto-navigation
        this.initSectionSwitching();
        this.setupPortfolioFilter(); // Make sure filter setup is called
        // Other init calls from original script can be added back if needed
        // this.setupFormHandling();
        // this.initParallaxEffects();
    }

    // Loading Sequence with Cinematic Timing & AUTO-NAVIGATION
    startLoadingSequence() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingProgress = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');
        
        // ... (loading messages array)
        
        let progress = 0;
        const updateLoading = () => {
            progress += Math.random() * 15 + 5;
            loadingProgress.style.width = Math.min(progress, 100) + '%';
            
            if (progress >= 100) {
                // --- AUTO-NAVIGATION LOGIC ---
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoading = false;
                    
                    // Automatically switch to the portfolio section after a delay
                    setTimeout(() => {
                        this.switchToSection('portfolio');
                        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                        document.querySelector('[href="#portfolio"]').classList.add('active');
                    }, 2000); // 2-second delay on the home/landing page

                }, 500); // Short delay to show 100%
            } else {
                setTimeout(updateLoading, 100 + Math.random() * 200);
            }
        };
        
        updateLoading();
    }

    // Dynamic Background Canvas with Flowing Particles
    initBackgroundCanvas() {
        this.backgroundCanvas = document.getElementById('background-canvas');
        this.backgroundCtx = this.backgroundCanvas.getContext('2d');
        this.resizeCanvas();
        this.createParticles();
        this.animateBackground();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.backgroundCanvas.width = window.innerWidth;
        this.backgroundCanvas.height = window.innerHeight;
    }

    createParticles() {
        // ... (original particle creation logic)
        const particleCount = 50;
        this.particles = [];
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.backgroundCanvas.width,
                y: Math.random() * this.backgroundCanvas.height,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1, opacity: Math.random() * 0.5 + 0.2,
                color: ['#ffd700', '#00ffff', '#ff00ff', '#ff6b35', '#32ff32'][Math.floor(Math.random() * 5)],
                phase: Math.random() * Math.PI * 2, frequency: Math.random() * 0.02 + 0.005
            });
        }
    }

    animateBackground() {
        // ... (original complex background animation)
        this.backgroundCtx.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        const time = Date.now() * 0.001;
        this.particles.forEach(p => {
            p.x += p.vx + Math.sin(p.phase + time * p.frequency) * 0.5;
            p.y += p.vy + Math.cos(p.phase + time * p.frequency) * 0.3;
            if (p.x < 0) p.x = this.backgroundCanvas.width; if (p.x > this.backgroundCanvas.width) p.x = 0;
            if (p.y < 0) p.y = this.backgroundCanvas.height; if (p.y > this.backgroundCanvas.height) p.y = 0;
            p.opacity = 0.3 + Math.sin(time * 2 + p.phase) * 0.2;
            this.backgroundCtx.shadowBlur = 15; this.backgroundCtx.shadowColor = p.color;
            this.backgroundCtx.globalAlpha = p.opacity; this.backgroundCtx.fillStyle = p.color;
            this.backgroundCtx.beginPath(); this.backgroundCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.backgroundCtx.fill(); this.backgroundCtx.shadowBlur = 0;
        });
        this.backgroundCtx.globalAlpha = 1;
        requestAnimationFrame(() => this.animateBackground());
    }

    // Custom Cursor with Motion Tracking
    setupCustomCursor() {
        document.addEventListener('mousemove', (e) => {
            document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        });
        const style = document.createElement('style');
        style.textContent = `body::before { left: var(--cursor-x, -100px); top: var(--cursor-y, -100px); }`;
        document.head.appendChild(style);
    }

    // Section Switching with Smooth Transitions
    initSectionSwitching() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.switchToSection(targetSection);
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    switchToSection(sectionName) {
        const sections = document.querySelectorAll('.section');
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            targetSection.style.display = sectionName === 'home' ? 'flex' : 'block';
            targetSection.classList.add('active');
            setTimeout(() => { targetSection.style.opacity = '1'; }, 50);
        }
    }

    // Portfolio Filtering
    setupPortfolioFilter() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                portfolioItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    const shouldShow = category === 'all' || itemCategory === category;
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1) translateY(0)'; }, index * 100);
                    } else {
                        item.style.opacity = '0'; item.style.transform = 'scale(0.8) translateY(20px)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => { if (this.backgroundCanvas) this.resizeCanvas(); });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ArtisticPortfolio();
});
