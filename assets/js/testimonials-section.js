/**
 * Testimonials Section - Native Infinite Marquee
 * Handles cloning, responsive sizing, and CSS animation variable injection
 * without relying on external libraries like Swiper.js.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTestimonialsMarquee();
});

function initTestimonialsMarquee() {
    const container = document.querySelector('.testimonials-native-container');
    const track = document.getElementById('testimonials-track');
    
    if (!container || !track) return;

    const originalCards = Array.from(track.querySelectorAll('.testimonial-card-native'));
    if (originalCards.length === 0) return;

    // We need to calculate the gap
    const gap = 24; // 1.5rem = 24px

    function calculateAndApplySizes() {
        // Desktop: 3 cards, Mobile: 2 cards
        // Using window.innerWidth or checking a matchMedia to determine
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const visibleCardsCount = isMobile ? 2 : 3;
        
        // Container width available for cards
        const containerWidth = container.clientWidth;
        
        // Calculate exact card width to fit the specified number of visible cards
        // Total width = (CardWidth * count) + (gap * (count - 1))
        // CardWidth = (ContainerWidth - (gap * (count - 1))) / count
        const cardWidth = (containerWidth - (gap * (visibleCardsCount - 1))) / visibleCardsCount;
        
        // Apply width to all cards (both original and clones)
        const allCards = track.querySelectorAll('.testimonial-card-native');
        allCards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
        
        return cardWidth;
    }

    // Set initial sizes
    calculateAndApplySizes();

    // To make an infinite scrolling loop, we duplicate the cards.
    // Since we have 6 cards, and we show at most 3, duplicating them once (total 12) is enough to cover the screen
    // while scrolling, but for a safe infinite loop via CSS, we clone the entire set.
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        // Mark as clone for accessibility (optional, prevents screen readers reading twice)
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    // We animate the track by translating it left by the width of exactly ONE SET of original cards.
    // Once it reaches that point, it snaps back to 0 instantly, creating an infinite loop.
    function setupAnimation() {
        const cardWidth = calculateAndApplySizes();
        
        // Total width of one original set of cards + gaps
        // This is exactly how far we need to translate before snapping back
        const totalSetWidth = (cardWidth * originalCards.length) + (gap * originalCards.length);
        
        // Update CSS variables for the keyframes
        // We inject a dynamic style tag to define the keyframes since translate values depend on screen size
        let styleTag = document.getElementById('testimonials-marquee-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'testimonials-marquee-style';
            document.head.appendChild(styleTag);
        }
        
        // Speed: 30 seconds for a full cycle (adjust as needed for "soft marquee-style movement")
        const duration = 30;
        
        styleTag.innerHTML = `
            @keyframes native-marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-${totalSetWidth}px); }
            }
            .testimonials-marquee-track {
                animation: native-marquee-scroll ${duration}s linear infinite;
            }
        `;
    }

    setupAnimation();

    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupAnimation();
        }, 150); // Debounce
    });
    
    // Pause on hover
    container.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    container.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}
