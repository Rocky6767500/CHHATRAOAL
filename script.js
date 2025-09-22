// --- NEW TEMPLATE V2.0 SCRIPT ---

document.addEventListener('DOMContentLoaded', () => {

    // --- Animated Starry Background ---
    const starContainer = document.getElementById('background-animation');
    if (starContainer) {
        const starCount = 150; // Number of stars
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

            // For parallax effect
            const z = Math.random() * 3 + 1; // z-index simulation
            star.dataset.depth = z;

            starContainer.appendChild(star);
        }

        // Parallax scroll effect for stars
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
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Fade-in elements on scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});
