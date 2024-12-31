// Project data
const projects = [
    {
        title: "MLOps Machine Learning Based Visa Certification Prediction",
        description: "This project demonstrates the end-to-end implementation of a machine learning solution designed for production readiness. The pipeline includes data preprocessing, feature engineering, model training, and deployment using modern MLOps tools and best practices.",
        tags: ["MLOps", "Model Training", "Model Deployment", "CI/CD", "Docker", "Azure", "MongoDB", "Feature Engineering", "Statistical Modeling"],
        github: "https://github.com/arijit-chandra/MLOps-Machine-Learning-Based-Visa-Certification-Prediction"
    },
    {
        title: "Optimizing Facebook Ads using A/B-Testing",
        description: "This project analyzes Facebook advertising data to compare the effectiveness of 'average bidding' versus 'maximum bidding' strategies through A/B testing. The analysis focuses on key metrics including impressions, clicks, purchases, and earnings to determine the most efficient bidding approach.",
        tags: ["A/B Testing", "Hypothesis Testing", "Impressions Analysis", "EDA", "CTR", "Conversion Rate"],
        github: "https://github.com/arijit-chandra/Optimizing-Facebook-Bidding-Ads-using-A-B-Testing"
    },
    {
        title: "HR Workforce Analysis with SQL Power-BI",
        description: "This project analyzes and visualizes the distribution of employees within an organization, providing insights into departmental allocations, geographical dispersion, and diversity metrics. The findings inform strategic decisions, optimize resource allocation, and enhance workforce planning.",
        tags: ["SQL", "MySQL", "Data Cleaning", "Diversity Analysis", "Dashboard Creation", "Workforce Analytics"],
        github: "https://github.com/arijit-chandra/HR-Workforce-Analysis-with-SQL-Power-BI"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    loadProjects();
    initTypeWriter();
    initializeAnimations();
    initializeScrollEvents();
});

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks.classList.remove('active');
                hamburger?.classList.remove('active');
            }
        });
    });
}

function loadProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (projectsContainer) {
        projects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card bg-white rounded-lg shadow-lg overflow-hidden';
    
    card.innerHTML = `
        <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">${project.title}</h3>
            <p class="text-gray-600 mb-4 h-32 overflow-y-auto">${project.description}</p>
            <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                    ${project.tags.map(tag => 
                        `<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">${tag}</span>`
                    ).join('')}
                </div>
            </div>
            <a href="${project.github}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View Code
            </a>
        </div>
    `;
    
    return card;
}

function initTypeWriter() {
    const targetElement = document.getElementById('typing-text');
    if (!targetElement) return;

    const text = "Machine Learning Solutions for Real-World Problems";
    const speed = 50;
    let i = 0;
    
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

function initializeAnimations() {
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

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

function initializeScrollEvents() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

function sendEmail(e) {
    e.preventDefault();
    
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    };
    
    const submitButton = e.target.querySelector('button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(() => {
            showNotification('Message sent successfully!', 'success');
            e.target.reset();
        })
        .catch(error => {
            showNotification('Failed to send message. Please try again.', 'error');
            console.error('Email error:', error);
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });

    return false;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}