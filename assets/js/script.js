document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. Mobile Navigation & Sticky
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navbar = document.getElementById('navbar');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =========================================
    // 2. Hero Background Slideshow (Auto Slide)
    // =========================================
    const slides = document.querySelectorAll('.hero-slides .slide');
    let currentSlide = 0;
    const slideDuration = 6000; // 6 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if(slides.length > 0) {
        setInterval(nextSlide, slideDuration);
    }

    // =========================================
    // 3. Horizontal Strip Carousel (Swiper.js)
    // =========================================
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
    const swiperContainer = document.querySelector('.horizontal-swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            horizontalSwiper.autoplay.stop();
        });
        swiperContainer.addEventListener('mouseleave', () => {
            horizontalSwiper.autoplay.start();
        });
    }

    // =========================================
    // 4. GSAP & ScrollTrigger Animations
    // =========================================
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Fade In (Play on load)
    gsap.fromTo(".gsap-hero", 
        { y: 20, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );

    // Hero Background Cinematic Zoom on Scroll
    const heroBgContainer = document.getElementById('hero-bg-container');
    if(heroBgContainer) {
        gsap.to(heroBgContainer, {
            scale: 1.2, // Zoom in progressive
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1 // Smooth scrubbing
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

    // =========================================
    // 7. Client Testimonials Stacked Carousel
    // =========================================
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        effect: 'cards',
        grabCursor: false,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 1200, // 1200ms per card transition
        allowTouchMove: false, // Disable touch/hover interactions
        cardsEffect: {
            perSlideOffset: 12, // Stack offset
            perSlideRotate: 0, // Keep cards straight
            slideShadows: false, // Clean glass look
        }
    });

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
