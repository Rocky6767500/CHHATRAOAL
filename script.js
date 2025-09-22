// --- TEMPLATE V2.2 SCRIPT ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Animated Starry Background ---
    // (This part remains the same)
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
    // (This part remains the same)
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
    // (This part remains the same)
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

    // --- NEW: 3D Tilt Effect for Welcome Text ---
    const welcomeText = document.querySelector('.welcome-content h1');
    if (welcomeText) {
        const welcomeSection = document.querySelector('.welcome-section');
        welcomeSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = welcomeSection;

            // Calculate mouse position from -1 to 1
            const x = (clientX / offsetWidth - 0.5) * 2;
            const y = (clientY / offsetHeight - 0.5) * 2;

            // Define the intensity of the tilt
            const tiltIntensity = 8;

            // Apply the 3D transform
            welcomeText.style.transform = `rotateY(${x * tiltIntensity}deg) rotateX(${-y * tiltIntensity}deg)`;
        });

        // Reset transform when mouse leaves the section
        welcomeSection.addEventListener('mouseleave', () => {
             welcomeText.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }
});
