document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Find and set logo
    fetch('img/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const files = Array.from(doc.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => href.toLowerCase().includes('logo'));
            
            if (files.length > 0) {
                document.getElementById('logo').src = files[0];
            }
        });

    // Find and set profile image
    fetch('img/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const files = Array.from(doc.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => href.toLowerCase().includes('profile'));
            
            if (files.length > 0) {
                document.getElementById('profile').src = files[0];
            }
        });

    // Animated words
    const words = document.querySelectorAll('.word');
    let currentWord = 0;

    function showNextWord() {
        words.forEach(word => word.classList.remove('active'));
        words[currentWord].classList.add('active');
        currentWord = (currentWord + 1) % words.length;
    }

    showNextWord();
    setInterval(showNextWord, 2000);

    // Load projects
    fetch('projects/')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const projectFolders = Array.from(doc.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => !href.endsWith('..'));

            projectFolders.forEach(projectFolder => {
                fetch(projectFolder)
                    .then(response => response.text())
                    .then(data => {
                        const projectDoc = parser.parseFromString(data, 'text/html');
                        const images = Array.from(projectDoc.querySelectorAll('a'))
                            .map(a => a.href)
                            .filter(href => href.match(/\.(jpg|jpeg|png|gif)$/i));
                        
                        const poster = images.find(img => img.toLowerCase().includes('poster'));
                        if (poster) {
                            createProjectCard(poster, images);
                        }
                    });
            });
        });
});

function createProjectCard(poster, images) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');

    const img = document.createElement('img');
    img.src = poster;
    card.appendChild(img);

    let currentImage = 0;
    setInterval(() => {
        img.src = images[currentImage];
        currentImage = (currentImage + 1) % images.length;
    }, 3000);

    document.getElementById('projectsGrid').appendChild(card);
} 