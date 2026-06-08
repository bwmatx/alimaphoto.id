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
    const slideDuration = 6000; // 6 seconds
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
    // 3. Horizontal Strip Carousel (Swiper.js)
    // =========================================
    const horizontalSwiperContainer = document.querySelector('.horizontal-swiper');
    if (horizontalSwiperContainer && typeof Swiper !== 'undefined') {
        const horizontalSwiper = new Swiper('.horizontal-swiper', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 0, 
                disableOnInteraction: false,
            },
            speed: 4000, // Smooth continuous scroll effect
            grabCursor: true,
            freeMode: true,
            mousewheel: {
                forceToAxis: true,
            },
        });

        // Pause autoplay on hover for better UX
        horizontalSwiperContainer.addEventListener('mouseenter', () => {
            horizontalSwiper.autoplay.stop();
        });
        horizontalSwiperContainer.addEventListener('mouseleave', () => {
            horizontalSwiper.autoplay.start();
        });
    }

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
    // On mobile: disable scrub (expensive continuous GPU calculation)
    // On desktop: keep original scrub behavior
    const heroBgContainer = document.getElementById('hero-bg-container');
    if(heroBgContainer) {
        if (isMobile) {
            // Simple scale, no continuous scrub — much lighter on GPU
            gsap.to(heroBgContainer, {
                scale: 1.08,
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    toggleActions: "play none none reverse"
                }
            });
        } else {
            gsap.to(heroBgContainer, {
                scale: 1.2, // Zoom in progressive
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1 // Smooth scrubbing — desktop only
                }
            });
        }
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
        const horizontalEl = document.querySelector('.horizontal-swiper');
        const testimonialsEl = document.querySelector('.testimonials-swiper');

        if (horizontalEl) carouselObserver.observe(horizontalEl);
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
