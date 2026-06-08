document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Gallery Images (Fade in on scroll)
    const galleryItems = document.querySelectorAll('.portfolio-item');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggering the fade in
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 100); 
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        galleryItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // Fallback
        galleryItems.forEach(item => item.classList.add('show'));
    }

    // 2. Filtering System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mobileFilterSelect = document.getElementById('mobile-filter-select');

    function applyFilter(filterValue) {
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            // Hide animation
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Small delay to allow display block to apply before transition
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            }, 400); // Wait for fade out
        });
    }

    if (mobileFilterSelect) {
        mobileFilterSelect.addEventListener('change', (e) => {
            const filterValue = e.target.value;
            
            // Sync desktop buttons state
            filterBtns.forEach(btn => {
                if (btn.getAttribute('data-filter') === filterValue) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            applyFilter(filterValue);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            
            // Sync native select value on mobile
            if (mobileFilterSelect) {
                mobileFilterSelect.value = filterValue;
            }

            applyFilter(filterValue);
        });
    });

    // 3. Lightbox Experience
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCategory = document.getElementById('lightbox-category');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const backdrop = document.getElementById('lightbox-backdrop');
    
    let currentImageIndex = 0;
    // Get visible items dynamically
    let visibleItems = [];

    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    function openLightbox(index) {
        updateVisibleItems();
        currentImageIndex = index;
        const item = visibleItems[currentImageIndex];
        
        const imgEl = item.querySelector('img');
        const titleEl = item.querySelector('h3');
        const catEl = item.querySelector('span');

        lightboxImg.classList.remove('loaded');
        
        // Use timeout to allow CSS transition
        setTimeout(() => {
            lightboxImg.src = imgEl.src;
            lightboxTitle.textContent = titleEl.textContent;
            lightboxCategory.textContent = catEl.textContent;
            
            lightboxImg.onload = () => {
                lightboxImg.classList.add('loaded');
            };
        }, 50);

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.classList.remove('loaded');
        }, 400);
    }

    function showNext() {
        if (visibleItems.length === 0) return;
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
        openLightbox(currentImageIndex);
    }

    function showPrev() {
        if (visibleItems.length === 0) return;
        currentImageIndex = (currentImageIndex - 1 + visibleItems.length) % visibleItems.length;
        openLightbox(currentImageIndex);
    }

    // Event Listeners for Gallery Items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const index = visibleItems.indexOf(item);
            if (index !== -1) {
                openLightbox(index);
            }
        });
    });

    // Lightbox Controls
    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if(backdrop) backdrop.addEventListener('click', closeLightbox);
    if(nextBtn) nextBtn.addEventListener('click', showNext);
    if(prevBtn) prevBtn.addEventListener('click', showPrev);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });
});
