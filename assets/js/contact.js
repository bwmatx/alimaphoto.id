/**
 * Contact Page Scripts
 * Handles GSAP animations, FAQ accordion, and Form submission for contact.html
 */

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Animations
    const heroTl = gsap.timeline();
    
    heroTl.from(".hero-left > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    })
    .from(".hero-right", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.8");

    // 2. Contact Cards Stagger Reveal
    gsap.from(".contact-card", {
        scrollTrigger: {
            trigger: ".contact-info-cards",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 3. Booking Form Section
    gsap.from(".booking-left", {
        scrollTrigger: {
            trigger: ".booking-split",
            start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".booking-right", {
        scrollTrigger: {
            trigger: ".booking-split",
            start: "top 80%",
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.2
    });

    // 4. Features Stagger Reveal
    gsap.from(".feature-block", {
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // 5. FAQ Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 6. Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic UI feedback for submission (since backend isn't defined yet)
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Inquiry Sent Successfully!';
                submitBtn.style.backgroundColor = '#28a745'; // Success green
                submitBtn.style.borderColor = '#28a745';
                submitBtn.style.opacity = '1';
                
                // Reset form
                contactForm.reset();
                
                // Revert button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = ''; // Revert to CSS
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
