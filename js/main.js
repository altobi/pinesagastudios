// First, define our project details outside any function
const projectDetails = {
    'procedural_environment_in_houdini': {
        title: 'Procedural Environment in Houdini',
        description: 'A comprehensive masterclass in creating cinematic environments using Houdini & Karma.',
        overview: 'An in-depth course covering procedural environment creation, from modeling to final compositing, designed for all skill levels.',
        process: [
            'Procedural Modeling & Geometry Refinement',
            'Digital Assets (HDAs) Creation',
            'USD & Performance Optimization',
            'MaterialX & Shading Systems',
            'Lighting & Cinematography',
            'Final Compositing in Nuke'
        ],
        technologies: ['Houdini', 'Karma', 'USD', 'MaterialX', 'Nuke'],
        details: [
            { label: 'Duration', value: '22h 55m 55s' },
            { label: 'Level', value: 'Beginner to Advanced' },
            { label: 'Release Date', value: 'April 20, 2025' },
            { label: 'Categories', value: 'Essentials, FX, Modeling, Rendering, Sculpting, Cinematography' }
        ],
        callToAction: {
            text: 'Get the Course',
            url: 'https://bit.ly/3RXu4wB'
        }
    },
    'lacuna': {
        title: 'Lacuna',
        description: 'A poignant silent short film about grief and memory.',
        overview: 'Shot in England, this wordless narrative follows a grieving man who creates a robotic system to recreate his wife\'s piano performances.',
        process: [
            'Shot on soundstage',
            'Extensive 3D augmentation in Houdini',
            'Compositing in Nuke',
            'Color grading in DaVinci Resolve'
        ],
        technologies: ['Houdini', 'Nuke', 'DaVinci Resolve'],
        details: [
            { label: 'Director', value: 'Ali Al-Tobi' },
            { label: 'Location', value: 'England' },
            { label: 'Format', value: 'Short Film' },
            { label: 'Type', value: 'Silent Film' }
        ]
    },
    'deceitful_love': {
        title: 'Deceitful Love',
        description: 'A compelling short film exploring the complexities of forbidden attraction.',
        overview: 'A young man, carrying his family\'s unconventional legacy of love, finds himself drawn to what he strictly cannot have.',
        process: [
            'Shot on location in Norway',
            'English language production',
            'Character-driven narrative'
        ],
        technologies: ['Cinema Camera', 'Post-Production Suite'],
        details: [
            { label: 'Director', value: 'Ali Al-Tobi' },
            { label: 'Writer', value: 'Ali Al-Tobi' },
            { label: 'Duration', value: '27 minutes' },
            { label: 'Location', value: 'Norway' },
            { label: 'Language', value: 'English' }
        ]
    }
};

// Then define our functions
function showProjectDetails(projectId, projectImages) {
    const details = projectDetails[projectId];
    const detailsSection = document.getElementById('projectDetails');
    
    if (!detailsSection) {
        console.error('Project details section not found!');
        return;
    }

    // Create image gallery HTML
    const imagesHTML = projectImages
        .map((img, index) => `
            <div class="project-image ${index === 0 ? 'active' : ''}">
                <img src="projects/${projectId}/${img}" alt="${details.title} image ${index + 1}">
            </div>
        `).join('');

    // Create details HTML
    const detailsHTML = details.details.map(detail => 
        `<p><strong>${detail.label}:</strong> ${detail.value}</p>`
    ).join('');

    detailsSection.innerHTML = `
        <div class="project-details-content">
            <button class="close-btn">&times;</button>
            <div class="project-details-grid">
                <div class="project-details-images">
                    <div class="image-gallery">
                        ${imagesHTML}
                    </div>
                    <div class="image-nav">
                        ${projectImages.map((_, index) => `
                            <button class="image-nav-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                        `).join('')}
                    </div>
                </div>
                <div class="project-details-info">
                    <h3 class="project-title">${details.title}</h3>
                    <p class="project-description">${details.description}</p>
                    
                    <h4>Overview</h4>
                    <p>${details.overview}</p>
                    
                    ${details.process.length ? `
                        <h4>Process</h4>
                        <ul>
                            ${details.process.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    ${details.technologies.length ? `
                        <h4>Technologies Used</h4>
                        <ul>
                            ${details.technologies.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    <h4>Project Details</h4>
                    <div class="details-grid">
                        ${detailsHTML}
                    </div>

                    ${details.callToAction ? `
                        <a href="${details.callToAction.url}" target="_blank" class="cta-button">
                            ${details.callToAction.text}
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    // Add the CSS for the CTA button
    const style = document.createElement('style');
    style.textContent = `
        .cta-button {
            display: inline-block;
            background: var(--accent-color);
            color: var(--primary-color);
            padding: 12px 24px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 20px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(200, 164, 130, 0.3);
        }
        
        .details-grid {
            display: grid;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);

    detailsSection.classList.add('active');
    
    // Add event listeners for image navigation
    const dots = detailsSection.querySelectorAll('.image-nav-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            const images = detailsSection.querySelectorAll('.project-image');
            
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
            
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    const closeBtn = detailsSection.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            detailsSection.classList.remove('active');
        });
    }

    detailsSection.scrollIntoView({ behavior: 'smooth' });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-project', project.folder);

    const img = document.createElement('img');
    img.src = `projects/${project.folder}/${project.poster}`;
    img.alt = project.name;

    const titleOverlay = document.createElement('div');
    titleOverlay.className = 'project-title-overlay';
    titleOverlay.innerHTML = `<h3>${project.name}</h3>`;

    card.appendChild(img);
    card.appendChild(titleOverlay);
    
    card.addEventListener('click', () => {
        console.log('Project clicked:', project.folder);
        showProjectDetails(project.folder, project.images);
    });
    
    document.getElementById('projectsGrid').appendChild(card);
}

// Main initialization
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

    // Create project cards and populate poster montage
    const posterMontage = document.getElementById('posterMontage');
    projects.forEach(project => {
        createProjectCard(project);
        addToPosterMontage(project, posterMontage);
    });

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
});

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

function addToPosterMontage(project, montageElement) {
    const poster = document.createElement('img');
    poster.src = `projects/${project.folder}/${project.poster}`;
    poster.alt = project.name;
    poster.className = 'montage-poster';
    montageElement.appendChild(poster);
}

// Add smooth scrolling for navigation buttons
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const target = document.getElementById(e.target.dataset.scrollTo);
        target.scrollIntoView({ behavior: 'smooth' });
    });
}); 