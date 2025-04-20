document.addEventListener('DOMContentLoaded', function() {
    const projectsGrid = document.getElementById('projects-grid');
    const montageContainer = document.getElementById('montage');

    // Function to load projects
    async function loadProjects() {
        try {
            const response = await fetch('projects/index.json');
            const projects = await response.json();
            
            // Create montage background
            projects.forEach(project => {
                const img = document.createElement('img');
                img.src = project.poster;
                img.alt = project.title;
                img.style.display = 'none';
                montageContainer.appendChild(img);
            });

            // Start montage animation
            const montageImages = montageContainer.getElementsByTagName('img');
            let currentImage = 0;
            montageImages[0].style.display = 'block';

            setInterval(() => {
                montageImages[currentImage].style.display = 'none';
                currentImage = (currentImage + 1) % montageImages.length;
                montageImages[currentImage].style.display = 'block';
            }, 3000);

            // Create project cards
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-aos', 'fade-up');
                
                card.innerHTML = `
                    <img src="${project.poster}" alt="${project.title}">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                    </div>
                `;
                
                projectsGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    loadProjects();
}); 