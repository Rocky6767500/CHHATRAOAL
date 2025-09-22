// --- TEMPLATE V2.3 SCRIPT ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Animated Starry Background ---
    const starContainer = document.getElementById('background-animation');
    if (starContainer) {
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            const size = Math.random() * 2 + 0.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            // Add a random delay to the animation for each star
            star.style.animationDelay = `${Math.random() * 5}s`;
            const z = Math.random() * 3 + 1;
            star.dataset.depth = z;
            starContainer.appendChild(star);
        }
        window.addEventListener('scroll', () => {
            const top = window.scrollY;
            const stars = starContainer.children;
            for(let i=0; i<stars.length; i++) {
                const star = stars[i];
                const depth = star.dataset.depth;
                const moveY = -(top / depth);
                star.style.transform = `translateY(${moveY}px)`;
            }
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.querySelector(link.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Fade-in elements on scroll ---
    const sectionsToObserve = document.querySelectorAll('.content-section');
    if (sectionsToObserve.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sectionsToObserve.forEach(section => {
            observer.observe(section);
        });
    }

    // --- UPDATED: 3D Tilt Effect for Welcome Text ---
    const welcomeText = document.querySelector('.welcome-content h1');
    if (welcomeText) {
        const welcomeSection = document.querySelector('.welcome-section');
        
        // On mouse move, stop the CSS animation and apply JS-based transform
        welcomeSection.addEventListener('mousemove', (e) => {
            // Pause the CSS animation
            welcomeText.style.animationPlayState = 'paused';

            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = welcomeSection;
            const x = (clientX / offsetWidth - 0.5) * 2;
            const y = (clientY / offsetHeight - 0.5) * 2;
            const tiltIntensity = 8;
            
            // Apply the 3D transform from mouse
            welcomeText.style.transform = `translateY(-7.5px) rotateY(${x * tiltIntensity}deg) rotateX(${-y * tiltIntensity}deg)`;
        });

        // On mouse leave, resume the CSS animation
        welcomeSection.addEventListener('mouseleave', () => {
             // Resume the CSS animation
             welcomeText.style.animationPlayState = 'running';
             // Remove the JS-based transform so the CSS animation can take over
             welcomeText.style.transform = '';
        });
    }
});
