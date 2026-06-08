// assets/js/about.js

document.addEventListener('DOMContentLoaded', () => {
    // === TEAM PROFILE JS HAS BEEN REMOVED IN FAVOR OF STATIC HTML LIST FOR PERFORMANCE ===

    // === GSAP ANIMATIONS ===
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        let mm = gsap.matchMedia();

        // Only run ScrollTrigger animations on desktop (min-width: 769px) to optimize mobile scroll
        mm.add("(min-width: 769px)", () => {
            // Fade up elements
            gsap.utils.toArray('.gsap-fade-up').forEach(element => {
                gsap.fromTo(element, 
                    { y: 50, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 1, 
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                        }
                    }
                );
            });

            // Stagger blocks
            gsap.utils.toArray('.gsap-stagger').forEach(container => {
                gsap.fromTo(container.children, 
                    { y: 30, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 0.8, 
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                        }
                    }
                );
            });
        });
    }
});
