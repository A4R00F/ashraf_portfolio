
const navCollapse = document.getElementById("mainNav");

const navLinks = document.querySelectorAll(
    ".navbar-nav .nav-link, .navbar-nav .nav-contact"
);

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (
            navCollapse.classList.contains("show") &&
            window.bootstrap
        ) {
            window.bootstrap.Collapse
                .getOrCreateInstance(navCollapse)
                .hide();
        }
    });
});


// =========================
// 2. Reveal Elements on Scroll
// =========================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// =========================
// 3. Active Navigation Link
// =========================

const sections = document.querySelectorAll("main section[id]");

const sectionLinks = document.querySelectorAll(
    ".navbar-nav .nav-link"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    sectionLinks.forEach((link) => {
                        const active =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", active);
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// =========================
// 4. Back To Top Button
// =========================

const backToTop = document.getElementById("back-to-top");

window.addEventListener(
    "scroll",
    () => {
        backToTop.classList.toggle(
            "visible",
            window.scrollY > 450
        );
    },
    {
        passive: true
    }
);

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =========================
// 5. Current Year
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();


// =========================
// 6. Profile Photo Placeholder
// =========================

const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto) {
    const photoFrame = profilePhoto.closest(".photo-frame");

    profilePhoto.addEventListener("error", () => {
        photoFrame.classList.add("photo-missing");
    });

    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {
        photoFrame.classList.add("photo-missing");
    }
}
