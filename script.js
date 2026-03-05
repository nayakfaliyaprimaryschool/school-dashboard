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

    /* ==================================
          ACTIVITY LIGHTBOX
    =================================== */
    const activityCards = document.querySelectorAll(".activity-card");
    const activityLightbox = document.getElementById("activity-lightbox");
    const activityLightboxImg = document.getElementById("activity-lightbox-img");
    const activityLightboxClose = document.getElementById("activity-lightbox-close");
    const activityLightboxNext = document.getElementById("activity-lightbox-next");
    const activityLightboxPrev = document.getElementById("activity-lightbox-prev");

    let currentActivityIndex = 0;
    // We capture the image src inside .activity-card
    const activityImages = Array.from(document.querySelectorAll(".activity-card .activity-img")).map(img => img.src);

    const updateActivityLightboxImage = (index) => {
        activityLightboxImg.src = activityImages[index];
    };

    activityCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            currentActivityIndex = index;
            updateActivityLightboxImage(currentActivityIndex);
            activityLightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    // Next image
    if (activityLightboxNext) {
        activityLightboxNext.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing lightbox when clicking on the wrapper
            currentActivityIndex = (currentActivityIndex + 1) % activityImages.length;
            updateActivityLightboxImage(currentActivityIndex);
        });
    }

    // Previous image
    if (activityLightboxPrev) {
        activityLightboxPrev.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing lightbox
            currentActivityIndex = (currentActivityIndex - 1 + activityImages.length) % activityImages.length;
            updateActivityLightboxImage(currentActivityIndex);
        });
    }

    // Close lightbox
    const closeActivityLightbox = () => {
        activityLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        // Add a slight delay to clear the src so the transition finishes before image jumps
        setTimeout(() => { activityLightboxImg.src = ""; }, 300);
    };

    if (activityLightboxClose) {
        activityLightboxClose.addEventListener("click", closeActivityLightbox);
    }

    // Close on clicking outside image
    if (activityLightbox) {
        activityLightbox.addEventListener("click", (e) => {
            if (e.target === activityLightbox) {
                closeActivityLightbox();
            }
        });
    }

    // ----------------------------------------------------
    // 6. Video Lightbox
    // ----------------------------------------------------
    const videoCards = document.querySelectorAll(".video-card");
    const videoLightbox = document.getElementById("video-lightbox");
    const videoLightboxContent = document.getElementById("video-lightbox-content");
    const videoLightboxClose = document.getElementById("video-lightbox-close");
    const videoLightboxPrev = document.getElementById("video-lightbox-prev");
    const videoLightboxNext = document.getElementById("video-lightbox-next");

    let currentVideoIndex = 0;
    const videoSources = Array.from(videoCards).map(card => {
        const source = card.querySelector("source");
        return source ? source.src : "";
    }).filter(src => src !== "");

    const updateLightboxVideo = (index) => {
        videoLightboxContent.src = videoSources[index];
        videoLightboxContent.play(); // autoplay when navigating
    };

    videoCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            currentVideoIndex = index;
            updateLightboxVideo(currentVideoIndex);
            videoLightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    if (videoLightboxNext) {
        videoLightboxNext.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing lightbox
            currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
            updateLightboxVideo(currentVideoIndex);
        });
    }

    if (videoLightboxPrev) {
        videoLightboxPrev.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing lightbox
            currentVideoIndex = (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
            updateLightboxVideo(currentVideoIndex);
        });
    }

    const closeVideoLightbox = () => {
        videoLightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        videoLightboxContent.pause();
        setTimeout(() => {
            videoLightboxContent.src = ""; // clear src after transition
        }, 300);
    };

    if (videoLightboxClose) {
        videoLightboxClose.addEventListener("click", closeVideoLightbox);
    }

    if (videoLightbox) {
        videoLightbox.addEventListener("click", (e) => {
            if (e.target === videoLightbox) {
                closeVideoLightbox();
            }
        });
    }

});
