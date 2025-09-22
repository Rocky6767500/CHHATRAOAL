// CHHATRAOAL - Futuristic Artist Portfolio
// Motion-based interactive elements with psychological depth

class ArtisticPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = true;
        this.backgroundCanvas = null;
        this.backgroundCtx = null;
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.portfolioItems = [
            { title: 'Cosmic Dreams', category: 'abstract', image: 'abstract1.jpg' },
            { title: 'Urban Soul', category: 'portraits', image: 'portrait1.jpg' },
            { title: 'Mountain Whispers', category: 'landscapes', image: 'landscape1.jpg' },
            { title: 'Digital Realm', category: 'digital', image: 'digital1.jpg' },
            { title: 'Human Essence', category: 'portraits', image: 'portrait2.jpg' },
            { title: 'Abstract Flow', category: 'abstract', image: 'abstract2.jpg' },
            { title: 'Ocean Dreams', category: 'landscapes', image: 'landscape2.jpg' },
            { title: 'Cyber Art', category: 'digital', image: 'digital2.jpg' },
            { title: 'Inner Light', category: 'portraits', image: 'portrait3.jpg' }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initBackgroundCanvas();
        this.createPortfolioItems();
        this.setupCustomCursor();
        this.startLoadingSequence();
        this.initSectionSwitching();
        this.setupFormHandling();
        this.initParallaxEffects();
    }

    // Loading Sequence with Cinematic Timing
    startLoadingSequence() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingProgress = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingMessages = [
            'Initializing creative universe...',
            'Loading artistic dimensions...',
            'Harmonizing color frequencies...',
            'Synchronizing motion elements...',
            'Awakening the portfolio...'
        ];
        
        let messageIndex = 0;
        let progress = 0;
        
        const updateLoading = () => {
            progress += Math.random() * 15 + 5;
            loadingProgress.style.width = Math.min(progress, 100) + '%';
            
            if (messageIndex < loadingMessages.length - 1 && progress > (messageIndex + 1) * 20) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
            }
            
            if (progress >= 100) {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoading = false;
                    this.startHomeAnimations();
                }, 500);
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
        const particleCount = 50;
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.backgroundCanvas.width,
                y: Math.random() * this.backgroundCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor(),
                phase: Math.random() * Math.PI * 2,
                frequency: Math.random() * 0.02 + 0.005
            });
        }
    }

    getRandomColor() {
        const colors = ['#ffd700', '#00ffff', '#ff00ff', '#ff6b35', '#32ff32'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateBackground() {
        this.backgroundCtx.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        
        // Create flowing gradient background
        const gradient = this.backgroundCtx.createLinearGradient(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        const time = Date.now() * 0.001;
        
        gradient.addColorStop(0, `hsl(${240 + Math.sin(time) * 20}, 70%, 15%)`);
        gradient.addColorStop(0.5, `hsl(${260 + Math.cos(time * 0.8) * 30}, 60%, 20%)`);
        gradient.addColorStop(1, `hsl(${280 + Math.sin(time * 1.2) * 25}, 65%, 18%)`);
        
        this.backgroundCtx.fillStyle = gradient;
        this.backgroundCtx.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        
        // Animate particles
        this.particles.forEach(particle => {
            // Update position with flowing motion
            particle.x += particle.vx + Math.sin(particle.phase + time * particle.frequency) * 0.5;
            particle.y += particle.vy + Math.cos(particle.phase + time * particle.frequency) * 0.3;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.backgroundCanvas.width;
            if (particle.x > this.backgroundCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.backgroundCanvas.height;
            if (particle.y > this.backgroundCanvas.height) particle.y = 0;
            
            // Pulsing opacity
            particle.opacity = 0.3 + Math.sin(time * 2 + particle.phase) * 0.2;
            
            // Draw particle with glow effect
            this.backgroundCtx.shadowBlur = 15;
            this.backgroundCtx.shadowColor = particle.color;
            this.backgroundCtx.globalAlpha = particle.opacity;
            this.backgroundCtx.fillStyle = particle.color;
            this.backgroundCtx.beginPath();
            this.backgroundCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.backgroundCtx.fill();
            this.backgroundCtx.shadowBlur = 0;
        });
        
        this.backgroundCtx.globalAlpha = 1;
        
        requestAnimationFrame(() => this.animateBackground());
    }

    // Custom Cursor with Motion Tracking
    setupCustomCursor() {
        let cursor = document.querySelector('body::before');
        
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            
            // Update cursor position with CSS custom properties
            document.documentElement.style.setProperty('--cursor-x', e.clientX + 'px');
            document.documentElement.style.setProperty('--cursor-y', e.clientY + 'px');
        });
        
        // Add cursor styles to CSS
        const style = document.createElement('style');
        style.textContent = `
            body::before {
                left: var(--cursor-x, -100px);
                top: var(--cursor-y, -100px);
            }
        `;
        document.head.appendChild(style);
    }

    // Home Section Animations
    startHomeAnimations() {
        // Trigger word animations
        const words = document.querySelectorAll('.hero-title .word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.animationPlayState = 'running';
            }, index * 300);
        });

        // Animate floating orbs with mouse interaction
        const orbs = document.querySelectorAll('.floating-orb');
        orbs.forEach(orb => {
            this.animateOrb(orb);
        });
    }

    animateOrb(orb) {
        let initialX = parseFloat(orb.style.left) || 0;
        let initialY = parseFloat(orb.style.top) || 0;
        
        const animate = () => {
            const rect = orb.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = this.mousePosition.x - centerX;
            const deltaY = this.mousePosition.y - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                const moveX = (deltaX / distance) * force * 20;
                const moveY = (deltaY / distance) * force * 20;
                
                orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.2})`;
            } else {
                orb.style.transform = 'translate(0, 0) scale(1)';
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Section Switching with Smooth Transitions
    initSectionSwitching() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.switchToSection(targetSection);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // CTA button navigation
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('click', () => {
            this.switchToSection('portfolio');
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('[href="#portfolio"]').classList.add('active');
        });
    }

    switchToSection(sectionName) {
        const sections = document.querySelectorAll('.section');
        const targetSection = document.getElementById(sectionName);
        
        if (targetSection) {
            // Hide all sections first
            sections.forEach(section => {
                section.style.display = 'none';
                section.style.opacity = '0';
                section.classList.remove('active');
            });
            
            // Show target section with fade-in effect
            targetSection.style.display = sectionName === 'home' ? 'flex' : 'block';
            targetSection.classList.add('active');
            
            // Trigger fade-in animation
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
            
            this.currentSection = sectionName;
            
            // Trigger section-specific animations
            setTimeout(() => {
                switch(sectionName) {
                    case 'portfolio':
                        this.animatePortfolioItems();
                        break;
                    case 'about':
                        this.animateAboutSection();
                        break;
                    case 'contact':
                        this.animateContactSection();
                        break;
                }
            }, 300);
        }
    }

    // Portfolio Section with Dynamic Item Generation
    createPortfolioItems() {
        const grid = document.querySelector('.portfolio-grid');
        
        this.portfolioItems.forEach((item, index) => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <div class="portfolio-image">
                    <div class="image-overlay"></div>
                </div>
                <div class="portfolio-content">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${item.category}</span>
                </div>
            `;
            
            // Add hover effects
            portfolioItem.addEventListener('mouseenter', () => {
                this.animatePortfolioHover(portfolioItem, true);
            });
            
            portfolioItem.addEventListener('mouseleave', () => {
                this.animatePortfolioHover(portfolioItem, false);
            });
            
            grid.appendChild(portfolioItem);
        });
        
        // Setup category filtering
        this.setupPortfolioFilter();
    }

    animatePortfolioHover(item, isHover) {
        const image = item.querySelector('.portfolio-image');
        
        if (isHover) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'hover-ripple';
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rippleExpand 0.6s ease-out forwards;
                pointer-events: none;
            `;
            
            image.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
        
        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes rippleExpand {
                    0% { width: 0; height: 0; opacity: 1; }
                    100% { width: 200px; height: 200px; opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupPortfolioFilter() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items with animation
                portfolioItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    const shouldShow = category === 'all' || itemCategory === category;
                    
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8) translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    animatePortfolioItems() {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        });
    }

    // About Section Animations
    animateAboutSection() {
        // Animate title lines
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.2 + 0.5}s`;
            line.style.animationPlayState = 'running';
        });
        
        // Animate skill orbs with constellation effect
        const skillOrbs = document.querySelectorAll('.skill-orb');
        skillOrbs.forEach((orb, index) => {
            setTimeout(() => {
                orb.style.animation = 'orbAppear 0.6s ease forwards';
                orb.style.animationDelay = `${index * 0.2}s`;
            }, 1000);
        });
        
        // Add constellation connecting lines
        this.createSkillConstellation();
    }

    createSkillConstellation() {
        const skillsContainer = document.querySelector('.skills-constellation');
        const orbs = skillsContainer.querySelectorAll('.skill-orb');
        
        // Create SVG for connecting lines
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '-1';
        
        skillsContainer.style.position = 'relative';
        skillsContainer.appendChild(svg);
        
        // Create animated lines between orbs
        for (let i = 0; i < orbs.length - 1; i++) {
            setTimeout(() => {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                const rect1 = orbs[i].getBoundingClientRect();
                const rect2 = orbs[i + 1].getBoundingClientRect();
                const containerRect = skillsContainer.getBoundingClientRect();
                
                line.setAttribute('x1', rect1.left - containerRect.left + rect1.width / 2);
                line.setAttribute('y1', rect1.top - containerRect.top + rect1.height / 2);
                line.setAttribute('x2', rect2.left - containerRect.left + rect2.width / 2);
                line.setAttribute('y2', rect2.top - containerRect.top + rect2.height / 2);
                line.setAttribute('stroke', 'rgba(255, 215, 0, 0.3)');
                line.setAttribute('stroke-width', '1');
                line.style.opacity = '0';
                line.style.transition = 'opacity 0.6s ease';
                
                svg.appendChild(line);
                
                setTimeout(() => {
                    line.style.opacity = '1';
                }, 100);
            }, i * 300 + 1500);
        }
    }

    // Contact Section Animations
    animateContactSection() {
        const formGroups = document.querySelectorAll('.form-group');
        const socialLinks = document.querySelectorAll('.social-link');
        
        // Animate form elements
        formGroups.forEach((group, index) => {
            group.style.opacity = '0';
            group.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                group.style.transition = 'all 0.6s ease';
                group.style.opacity = '1';
                group.style.transform = 'translateX(0)';
            }, index * 200);
        });
        
        // Animate social links
        socialLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.6s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 150 + 500);
        });
    }

    // Form Handling with Visual Feedback
    setupFormHandling() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.querySelector('.submit-btn');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form, submitBtn);
        });
        
        // Add real-time validation effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const formGroup = input.parentElement;
        const isValid = input.checkValidity();
        
        if (input.value.length > 0) {
            if (isValid) {
                formGroup.classList.add('valid');
                formGroup.classList.remove('invalid');
            } else {
                formGroup.classList.add('invalid');
                formGroup.classList.remove('valid');
            }
        } else {
            formGroup.classList.remove('valid', 'invalid');
        }
    }

    handleFormSubmission(form, button) {
        // Create loading state
        const originalText = button.querySelector('span').textContent;
        button.querySelector('span').textContent = 'Sending...';
        button.disabled = true;
        
        // Add loading animation
        button.classList.add('loading');
        
        // Simulate form submission
        setTimeout(() => {
            // Success state
            button.querySelector('span').textContent = 'Message Sent!';
            button.style.background = 'linear-gradient(45deg, #32ff32, #00ffff)';
            
            // Create success particles
            this.createSuccessParticles(button);
            
            // Reset form
            setTimeout(() => {
                form.reset();
                button.querySelector('span').textContent = originalText;
                button.disabled = false;
                button.classList.remove('loading');
                button.style.background = '';
            }, 3000);
        }, 2000);
    }

    createSuccessParticles(element) {
        const rect = element.getBoundingClientRect();
        const particles = 20;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.className = 'success-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #32ff32;
                border-radius: 50%;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i / particles) * Math.PI * 2;
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                document.body.removeChild(particle);
            };
        }
    }

    // Parallax Effects for Depth
    initParallaxEffects() {
        window.addEventListener('scroll', () => {
            this.updateParallax();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.updateMouseParallax(e);
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll('.layer, .floating-orb');
        
        elements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateMouseParallax(e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = (e.clientX - centerX) / centerX;
        const mouseY = (e.clientY - centerY) / centerY;
        
        // Apply subtle parallax to depth layers
        const layers = document.querySelectorAll('.layer');
        layers.forEach((layer, index) => {
            const intensity = (index + 1) * 10;
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            layer.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Window resize handling
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.switchToSection('home');
            }
        });
        
        // Performance optimization: Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtisticPortfolio();
});

// Add some additional utility functions for enhanced interactivity

// Sound effects (using Web Audio API for subtle audio feedback)
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    playTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.01, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
}

// Initialize audio manager for subtle interaction sounds
const audioManager = new AudioManager();

// Add subtle sound effects to interactions
document.addEventListener('DOMContentLoaded', () => {
    // Navigation sounds
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            audioManager.playTone(800, 0.1);
        });
    });
    
    // Button sounds
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            audioManager.playTone(1000, 0.2);
        });
    });
    
    // Portfolio item sounds
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('portfolio-item')) {
            audioManager.playTone(600, 0.15);
        }
    });
});

// Performance monitoring and optimization
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.init();
    }
    
    init() {
        this.measureFPS();
        this.optimizeBasedOnPerformance();
    }
    
    measureFPS() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            this.optimizeBasedOnPerformance();
        }
        
        requestAnimationFrame(() => this.measureFPS());
    }
    
    optimizeBasedOnPerformance() {
        if (this.fps < 30) {
            // Reduce particle count for low-end devices
            document.documentElement.style.setProperty('--particle-count', '20');
            document.documentElement.style.setProperty('--animation-complexity', 'low');
        } else if (this.fps < 45) {
            document.documentElement.style.setProperty('--particle-count', '35');
            document.documentElement.style.setProperty('--animation-complexity', 'medium');
        } else {
            document.documentElement.style.setProperty('--particle-count', '50');
            document.documentElement.style.setProperty('--animation-complexity', 'high');
        }
    }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();