document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------------------
    // 1. Current Year for Footer
    // ----------------------------------------------------
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ----------------------------------------------------
    // 2. Mobile Menu (Hamburger)
    // ----------------------------------------------------
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }
    });

    // ----------------------------------------------------
    // 3. Smooth Scrolling with Offset
    // ----------------------------------------------------
    navItems.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ----------------------------------------------------
    // 4. Scroll Reveal Settings (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ----------------------------------------------------
    // 5. Gallery Lightbox
    // ----------------------------------------------------
    const galleryCards = document.querySelectorAll(".gallery-card");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxNext = document.getElementById("lightbox-next");
    const lightboxPrev = document.getElementById("lightbox-prev");

    let currentImageIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll(".gallery-card img")).map(img => img.src);

    const updateLightboxImage = (index) => {
        lightboxImg.src = galleryImages[index];
    };

    galleryCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            currentImageIndex = index;
            updateLightboxImage(currentImageIndex);
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing lightbox when clicking on the wrapper
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage(currentImageIndex);
        });
    }

    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing lightbox
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage(currentImageIndex);
        });
    }

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        // Add a slight delay to clear the src so the transition finishes before image jumps
        setTimeout(() => { lightboxImg.src = ""; }, 300);
    };

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    // Close on clicking outside image
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

});
