// Project data
const projects = [
    {
        title: "Deep Learning for Medical Imaging",
        description: "Developed a CNN-based system for automated diagnosis of medical conditions using chest X-rays. Achieved 95% accuracy on test dataset.",
        tags: ["Deep Learning", "PyTorch", "Medical AI", "Computer Vision"],
        github: "https://github.com/yourusername/medical-imaging",
        demo: "https://demo.example.com/medical-imaging"
    },
    {
        title: "NLP-Powered Customer Service Bot",
        description: "Built an intelligent chatbot using BERT for customer service automation. Reduced response time by 60% and improved customer satisfaction.",
        tags: ["NLP", "BERT", "TensorFlow", "FastAPI"],
        github: "https://github.com/yourusername/customer-service-bot",
        demo: "https://demo.example.com/service-bot"
    },
    {
        title: "Time Series Forecasting Platform",
        description: "Created a scalable platform for time series forecasting using LSTM and Prophet. Deployed on AWS using Docker and Kubernetes.",
        tags: ["Time Series", "Prophet", "AWS", "Docker"],
        github: "https://github.com/yourusername/forecasting-platform",
        demo: "https://demo.example.com/forecasting"
    }
];

// Publications data
const publications = [
    {
        title: "Novel Approach to Transfer Learning in Deep Neural Networks",
        authors: "Your Name, Co-author Name",
        journal: "Journal of Machine Learning Research",
        year: 2023,
        link: "https://journal.example.com/paper1"
    },
    {
        title: "Efficient Natural Language Processing in Healthcare",
        authors: "Your Name, Other Authors",
        journal: "Computational Linguistics Journal",
        year: 2022,
        link: "https://journal.example.com/paper2"
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Navigation functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle mobile menu
    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger?.classList.remove('active');
            }
        });
    });

    // Load projects dynamically
    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer) {
        projects.forEach(project => {
            const projectElement = createProjectCard(project);
            projectsContainer.appendChild(projectElement);
        });
    }

    // Load publications dynamically
    const publicationsContainer = document.getElementById('publicationsContainer');
    if (publicationsContainer) {
        publications.forEach(pub => {
            const pubElement = createPublicationItem(pub);
            publicationsContainer.appendChild(pubElement);
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for animations
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    card.innerHTML = `
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> View Code
                </a>
                <a href="${project.demo}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            </div>
        </div>
    `;
    
    return card;
}

// Create publication item element
function createPublicationItem(publication) {
    const item = document.createElement('div');
    item.className = 'publication-item';
    
    item.innerHTML = `
        <h3>${publication.title}</h3>
        <p>${publication.authors}</p>
        <p>${publication.journal}, ${publication.year}</p>
        <a href="${publication.link}" target="_blank" rel="noopener noreferrer">Read Paper</a>
    `;
    
    return item;
}

// Handle contact form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        showNotification('Message sent successfully!', 'success');
        form.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add scroll-based navbar styling
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Typing animation for hero section
function initTypeWriter() {
    const text = "Machine Learning Solutions for Real-World Problems";
    const speed = 50;
    let i = 0;
    
    function type() {
        if (i < text.length) {
            document.querySelector('.hero-content p').textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', initTypeWriter);

// Add CSS styles for animations and notifications
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 4px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification.success {
        background-color: #2ecc71;
    }
    
    .notification.error {
        background-color: #e74c3c;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(5px);
    }
`;

document.head.appendChild(style);