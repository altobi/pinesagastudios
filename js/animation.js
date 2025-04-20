document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animated words
    const words = ['Film', 'VFX', 'Storytelling', 'Innovation'];
    const animatedText = document.getElementById('animated-words');
    let currentWord = 0;

    function updateWord() {
        animatedText.style.opacity = '0';
        setTimeout(() => {
            animatedText.textContent = words[currentWord];
            animatedText.style.opacity = '1';
            currentWord = (currentWord + 1) % words.length;
        }, 500);
    }

    updateWord();
    setInterval(updateWord, 3000);
}); 