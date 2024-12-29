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

    // Initialize typing animation
    initTypeWriter();

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

// Fixed typing animation
function initTypeWriter() {
    const targetElement = document.getElementById('typing-text');
    const text = "Machine Learning Solutions for Real-World Problems";
    const speed = 50;
    let i = 0;
    
    // Clear any existing text
    targetElement.textContent = '';
    
    function type() {
        if (i < text.length) {
            targetElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Handle contact form submission with EmailJS
function sendEmail(e) {
    e.preventDefault();
    
    // Get form elements
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    
    // Show loading state
    const submitButton = e.target.querySelector('button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message
    };

    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            showNotification('Message sent successfully!', 'success');
            e.target.reset();
        }, function(error) {
            showNotification('Failed to send message. Please try again.', 'error');
            console.error('Email error:', error);
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });

    return false;
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