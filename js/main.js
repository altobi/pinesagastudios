document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Set static paths for logo and profile
    document.getElementById('logo').src = 'img/logo.png';
    document.getElementById('profile').src = 'img/profile.jpg';

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

    // Projects data structure with exact file information
    const projects = [
        {
            name: 'Procedural Environment in Houdini',
            folder: 'procedural_environment_in_houdini',
            poster: 'poster.png',
            images: ['poster.png', 'image1.png', 'image2.png', 'image3.png', 'image4.png']
        },
        {
            name: 'Lacuna',
            folder: 'lacuna',
            poster: 'poster.jpg',
            images: ['poster.jpg', 'image1.jpg', 'image2.jpg']
        },
        {
            name: 'Deceitful Love',
            folder: 'deceitful_love',
            poster: 'poster.jpg',
            images: ['poster.jpg', 'image1.png', 'image2.png']
        }
    ];

    // Add this to your projects data structure
    const projectDetails = {
        'procedural_environment_in_houdini': {
            title: 'Procedural Environment in Houdini',
            description: 'An innovative approach to creating dynamic and realistic environments using Houdini\'s procedural workflow. This project showcases advanced techniques in environmental design and optimization.',
            technologies: ['Houdini', 'Procedural Modeling', 'Environmental Design'],
            challenge: 'Creating vast, detailed environments while maintaining artistic control and performance.',
            solution: 'Developed custom tools and workflows that allow for rapid iteration and precise control over environmental elements.'
        },
        'lacuna': {
            title: 'Lacuna',
            description: 'A psychological thriller that explores the depths of human memory and consciousness through stunning visuals and compelling narrative.',
            technologies: ['Unreal Engine', 'Motion Capture', 'Visual Effects'],
            challenge: 'Visualizing abstract concepts of memory and consciousness in a tangible way.',
            solution: 'Utilized innovative visual effects techniques combined with traditional storytelling methods.'
        },
        'deceitful_love': {
            title: 'Deceitful Love',
            description: 'A dramatic short film that pushes the boundaries of visual storytelling through innovative cinematography and visual effects.',
            technologies: ['Cinema Camera', 'DaVinci Resolve', 'After Effects'],
            challenge: 'Balancing technical excellence with emotional storytelling.',
            solution: 'Integrated cutting-edge visual effects with traditional filmmaking techniques.'
        }
    };

    // Create project cards and populate poster montage
    const posterMontage = document.getElementById('posterMontage');
    projects.forEach(project => {
        createProjectCard(project);
        addToPosterMontage(project, posterMontage);
    });

    // Add this function after your existing code
    function handleScroll() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.classList.add('visible');
            }
        });
    }

    // Add these event listeners to your DOMContentLoaded function
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
});

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-project', project.folder);

    const img = document.createElement('img');
    img.src = `projects/${project.folder}/${project.poster}`;
    img.alt = project.name;
    
    card.appendChild(img);
    card.addEventListener('click', () => showProjectDetails(project.folder));
    
    document.getElementById('projectsGrid').appendChild(card);
    startImageRotation(project, img);
}

function startImageRotation(project, imgElement) {
    const imageUrls = project.images.map(img => `projects/${project.folder}/${img}`);
    let currentImage = 0;

    setInterval(() => {
        imgElement.src = imageUrls[currentImage];
        currentImage = (currentImage + 1) % imageUrls.length;
    }, 3000);
}

function addToPosterMontage(project, montageElement) {
    const poster = document.createElement('img');
    poster.src = `projects/${project.folder}/${project.poster}`;
    poster.alt = project.name;
    poster.className = 'montage-poster';
    poster.style.opacity = '0';
    poster.style.position = 'absolute';
    poster.style.top = '0';
    poster.style.left = '0';
    poster.style.width = '100%';
    poster.style.height = '100%';
    poster.style.objectFit = 'cover';
    poster.style.transition = 'opacity 1s ease-in-out';
    
    montageElement.appendChild(poster);
}

function showProjectDetails(projectId) {
    const details = projectDetails[projectId];
    const detailsSection = document.getElementById('projectDetails');
    const content = detailsSection.querySelector('.project-details-content');
    
    content.innerHTML = `
        <h3 class="project-title">${details.title}</h3>
        <div class="project-info">
            <p>${details.description}</p>
            <h4>Technologies Used:</h4>
            <ul>${details.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul>
            <h4>Challenge:</h4>
            <p>${details.challenge}</p>
            <h4>Solution:</h4>
            <p>${details.solution}</p>
        </div>
        <button class="close-btn">&times;</button>
    `;

    detailsSection.classList.add('active');
    
    const closeBtn = content.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        detailsSection.classList.remove('active');
    });

    // Smooth scroll to project details
    detailsSection.scrollIntoView({ behavior: 'smooth' });
}

// Add smooth scrolling for navigation buttons
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const target = document.getElementById(e.target.dataset.scrollTo);
        target.scrollIntoView({ behavior: 'smooth' });
    });
}); 