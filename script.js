// Neuro Estimator Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize video placeholder functionality
    initVideoPlaceholder();
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .bg-gray-50.p-8');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animations
    document.querySelectorAll('.timeline-item, .bg-gray-50.p-8').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Current date highlighting in the timeline
    const currentDate = new Date();
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const dateString = item.getAttribute('data-date');
        if (dateString) {
            const itemDate = new Date(dateString);
            
            // If the timeline date is in the future relative to current date
            if (itemDate > currentDate) {
                item.querySelector('.timeline-content').classList.add('opacity-50');
            } else {
                item.querySelector('.timeline-content').classList.add('border-l-4', 'border-neuro-primary');
            }
        }
    });

    // Add a simple counter animation for a future metrics section
    // This is just a placeholder and can be expanded later
    const animateCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Activate counters if they exist
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0) {
        counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, 0, target, 2000);
        });
    }
    
    /**
     * Initialize video placeholder functionality
     */
    function initVideoPlaceholder() {
        const videoPlaceholder = document.querySelector('.video-placeholder');
        if (!videoPlaceholder) return;
        
        const playButton = videoPlaceholder.querySelector('.play-button');
        
        if (playButton) {
            playButton.addEventListener('click', function() {
                // Show a modal or alert until the real video is added
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                modal.innerHTML = `
                    <div class="bg-white p-8 rounded-lg max-w-md text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-neuro-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="text-xl font-bold mb-2">Video Coming Soon</h3>
                        <p class="mb-6">We're currently working on our product demo video. Check back soon!</p>
                        <button class="bg-neuro-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">Close</button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Add event listener to close button
                const closeButton = modal.querySelector('button');
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
                
                // Also close when clicking outside the modal content
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
            });
        }
    }
});
