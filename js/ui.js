document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }

    const langToggleBtn = document.getElementById("lang-toggle-btn");
    const langDropdown = document.getElementById("lang-dropdown");

    if (langToggleBtn && langDropdown) {
        langToggleBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            langDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", (event) => {
            if (!langToggleBtn.contains(event.target) && !langDropdown.contains(event.target)) {
                langDropdown.classList.add("hidden");
            }
        });
    }

    document.querySelectorAll("[data-view]").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const viewId = link.getAttribute("data-view");
            const scrollTarget = link.getAttribute("data-scroll-target");
            showView(viewId, scrollTarget);
        });
    });

    document.querySelectorAll("[data-carousel-target]").forEach((button) => {
        button.addEventListener("click", () => {
            const carouselId = button.getAttribute("data-carousel-target");
            const direction = button.getAttribute("data-direction") || "right";
            scrollCarousel(carouselId, direction);
        });
    });
});

function scrollCarousel(id, direction) {
    const track = document.getElementById(id);
    if (!track) return;

    const scrollAmount = 350;
    const offset = direction === "left" ? -scrollAmount : scrollAmount;

    track.scrollBy({ left: offset, behavior: "smooth" });
}

function showView(viewId, scrollTargetId) {
    document.querySelectorAll(".page-view").forEach((view) => {
        view.classList.add("hidden");
    });

    const view = document.getElementById(viewId);
    if (!view) return;

    view.classList.remove("hidden");
    window.scrollTo(0, 0);

    if (scrollTargetId) {
        const target = document.getElementById(scrollTargetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
}

window.showView = showView;
window.scrollCarousel = scrollCarousel;