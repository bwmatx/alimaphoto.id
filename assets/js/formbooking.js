/**
 * Contact Page — Visual Enhancements Only
 * 
 * This file handles ONLY:
 * - GSAP scroll animations for the hero section
 * 
 * It does NOT touch:
 * - Form submission (handled by old_formbooking/alima.js)
 * - File upload (handled by old_formbooking/alima.js)
 * - Validation (handled by old_formbooking/alima.js)
 * - Modals (handled by old_formbooking/alima.js)
 * - Date picker (handled by old_formbooking/alima.js)
 */

document.addEventListener("DOMContentLoaded", () => {
    // Only run GSAP animations if GSAP is available
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero section fade-up sequence
    gsap.from(".contact-hero .hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from(".contact-hero h1", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
    });

    gsap.from(".contact-hero .hero-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.6
    });

    // Stagger form cards on scroll
    gsap.from(".booking-form-section .card", {
        scrollTrigger: {
            trigger: ".booking-form-section",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });
});
