document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Mobile Navigation & Sticky (Throttled)
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Throttled scroll listener for navbar (reduces reflow)
    let lastScrollY = 0;
    let ticking = false;
    
    function updateNavbar() {
        if (lastScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // =========================================
    // 2. Hero Background Slideshow (Visibility-Aware)
    // =========================================
    const slides = document.querySelectorAll('.hero-slides .slide');
    let currentSlide = 0;
    const slideDuration = 1800; // 1.8 seconds
    let heroInterval = null;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function startHeroSlideshow() {
        if (!heroInterval && slides.length > 0) {
            heroInterval = setInterval(nextSlide, slideDuration);
        }
    }

    function stopHeroSlideshow() {
        if (heroInterval) {
            clearInterval(heroInterval);
            heroInterval = null;
        }
    }

    // Start slideshow initially
    startHeroSlideshow();

    // Pause hero slideshow when not visible (saves CPU)
    const heroSection = document.getElementById('home');
    if (heroSection && 'IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startHeroSlideshow();
                } else {
                    stopHeroSlideshow();
                }
            });
        }, { threshold: 0.1 });
        heroObserver.observe(heroSection);
    }

    // =========================================
    // 3. Horizontal Strip Carousel (Native Marquee)
    // =========================================
    function initRecentProjectsMarquee() {
        const container = document.querySelector('.recent-projects-native-container');
        const track = document.getElementById('recent-projects-track');
        
        if (!container || !track) return;

        const originalCards = Array.from(track.querySelectorAll('.project-card'));
        if (originalCards.length === 0) return;

        // Clone cards for infinite loop
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });

        function setupAnimation() {
            let cardWidth = originalCards[0].offsetWidth;
            if (cardWidth === 0) cardWidth = 350; 
            
            const gap = 40; 
            const totalSetWidth = (cardWidth * originalCards.length) + (gap * originalCards.length);
            
            let styleTag = document.getElementById('recent-projects-marquee-style');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'recent-projects-marquee-style';
                document.head.appendChild(styleTag);
            }
            
            const duration = 40; 
            
            styleTag.innerHTML = `
                @keyframes recent-projects-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${totalSetWidth}px); }
                }
                .recent-projects-marquee-track {
                    animation: recent-projects-scroll ${duration}s linear infinite;
                    display: flex;
                    gap: ${gap}px;
                    width: max-content;
                }
            `;
        }

        setTimeout(setupAnimation, 100);

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(setupAnimation, 150);
        });
        // Pause animation when scrolling for GPU efficiency, resume when stopped
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            track.style.animationPlayState = 'paused';
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                track.style.animationPlayState = 'running';
            }, 150);
        }, { passive: true });
    }
    initRecentProjectsMarquee();

    // =========================================
    // 4. GSAP & ScrollTrigger Animations
    // =========================================
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    // Hero Text Fade In (Play on load)
    gsap.fromTo(".gsap-hero", 
        { y: 20, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );

    // Hero Background Cinematic Zoom on Scroll
    // Disabled scrub on both desktop and mobile to prevent heavy scroll jank
    const heroBgContainer = document.getElementById('hero-bg-container');
    if(heroBgContainer) {
        gsap.to(heroBgContainer, {
            scale: 1.08,
            scrollTrigger: {
                trigger: heroBgContainer.parentElement,
                start: "top top",
                end: "bottom top",
                toggleActions: "play none none reverse"
            }
        });
    }

    // General Fade Up Animation
    gsap.utils.toArray('.gsap-fade').forEach(element => {
        gsap.fromTo(element, 
            { y: 30, autoAlpha: 0 },
            {
                y: 0, 
                autoAlpha: 1, 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // =========================================
    // 5. Services Interactive Selection
    // =========================================
    const serviceBtns = document.querySelectorAll('.service-btn');
    const serviceImgs = document.querySelectorAll('.service-img');

    if(serviceBtns.length > 0 && serviceImgs.length > 0) {
        serviceBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                serviceBtns.forEach(b => b.classList.remove('active'));
                serviceImgs.forEach(img => img.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Add active class to corresponding image
                const targetId = btn.getAttribute('data-target');
                const targetImg = document.getElementById(targetId);
                if(targetImg) {
                    targetImg.classList.add('active');
                }
            });
        });
    }

    // =========================================
    // 6. Mobile Services Carousel
    // =========================================
    if (document.querySelector('.services-swiper') && typeof Swiper !== 'undefined') {
        const servicesSwiper = new Swiper('.services-swiper', {
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 600, // 400-700ms smooth transition
            grabCursor: true,
            navigation: {
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
            },
        });
    }

    // (Testimonials Swiper removed in favor of native marquee in testimonials-section.js)

    // =========================================
    // 8. Visibility-Based Carousel Control
    //    Pause carousels when off-screen (saves GPU/CPU)
    // =========================================
    if ('IntersectionObserver' in window) {
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const swiper = entry.target.swiper;
                if (swiper && swiper.autoplay) {
                    if (entry.isIntersecting) {
                        swiper.autoplay.start();
                    } else {
                        swiper.autoplay.stop();
                    }
                }
            });
        }, { threshold: 0.1 });

        // Observe each carousel container
        const testimonialsEl = document.querySelector('.testimonials-swiper');

        if (testimonialsEl) carouselObserver.observe(testimonialsEl);
    }

    // Staggered Animations for Cards (Masonry)
    const staggerSections = [
        { container: '.masonry-grid', items: '.gsap-reveal' }
    ];

    staggerSections.forEach(section => {
        const items = document.querySelectorAll(`${section.container} ${section.items}`);
        if(items.length > 0) {
            gsap.fromTo(items, 
                { y: 30, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section.container,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });

    // Slide Animations for Contact Section
    const slideRight = document.querySelector('.gsap-slide-right');
    const slideLeft = document.querySelector('.gsap-slide-left');
    
    if(slideRight && slideLeft) {
        gsap.fromTo(slideRight,
            { x: -30, autoAlpha: 0 },
            {
                x: 0, autoAlpha: 1, duration: 1, ease: "power2.out",
                scrollTrigger: {
                    trigger: '.contact-container',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        gsap.fromTo(slideLeft,
            { x: 30, autoAlpha: 0 },
            {
                x: 0, autoAlpha: 1, duration: 1, ease: "power2.out",
                scrollTrigger: {
                    trigger: '.contact-container',
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
});
