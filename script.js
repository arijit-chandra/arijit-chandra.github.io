// Project data
const projects = [
    {
        title: "MLOps Machine Learning Based Visa Certification Prediction",
        description: "This project demonstrates the end-to-end implementation of a machine learning solution designed for production readiness. The pipeline includes data preprocessing, feature engineering, model training, and deployment using modern MLOps tools and best practices.",
        tags: ["MLOps, Model Training, Model Deployment, Continuous Deployment (CI/CD), Docker, Azure, MongoDB, Feature Engineering, Statistical Modeling"],
        github: "https://github.com/arijit-chandra/MLOps-Machine-Learning-Based-Visa-Certification-Prediction"
    },
    {
        title: "Optimizing Facebook Ads using A/B-Testing",
        description: "This project analyzes Facebook advertising data to compare the effectiveness of 'average bidding' versus 'maximum bidding' strategies through A/B testing. The analysis focuses on key metrics including impressions, clicks, purchases, and earnings to determine the most efficient bidding approach.",
        tags: ["A/B Testing, Hypothesis Testing, Impressions Analysis, Earnings Analysis, Exploratory Data Analysis (EDA), Click-Through Rate (CTR), Conversion Rate"],
        github: "https://github.com/arijit-chandra/Optimizing-Facebook-Bidding-Ads-using-A-B-Testing"
    },
    {
        title: "HR Workforce Analysis with SQL Power-BI",
        description: "This project analyzes and visualizes the distribution of employees within an organization, providing insights into departmental allocations, geographical dispersion, and diversity metrics. The findings inform strategic decisions, optimize resource allocation, and enhance workforce planning.",
        tags: ["SQL, MySQL, Data Cleaning, Diversity Analysis, Turnover Analysis, Dashboard Creation, Workforce Analytics, Geographical Distribution Analysis"],
        github: "https://github.com/arijit-chandra/HR-Workforce-Analysis-with-SQL-Power-BI"
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