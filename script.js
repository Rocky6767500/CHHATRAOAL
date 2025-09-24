// --- TEMPLATE V5.1 SCRIPT (Final Check) ---

document.addEventListener('DOMContentLoaded', function() {

    // --- Animated Background Sparkles ---
    const bgAnimation = document.getElementById('background-animation');
    if (bgAnimation) {
        const numberOfSparkles = 50;
        for (let i = 0; i < numberOfSparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = `${Math.random() * 2 + 1}px`;
            sparkle.style.height = sparkle.style.width;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.backgroundColor = 'white';
            sparkle.style.borderRadius = '50%';
            sparkle.style.animationDelay = `${Math.random() * 5}s`;
            sparkle.style.animationDuration = `${Math.random() * 5 + 5}s`;
            bgAnimation.appendChild(sparkle);
        }
    }

    // --- Scroll Animations for Content Sections ---
    const sections = document.querySelectorAll('.content-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

});
