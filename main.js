
/* =========================================
   ODIWEB TECH SOLUTIONS
   FICHIER PRINCIPAL JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. PRELOADER - ÉCRAN DE CHARGEMENT
       ===================================== */

    function hidePreloader() {
        const preloader = document.querySelector("#preloader, .preloader");

        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.pointerEvents = "none";

            setTimeout(function () {
                preloader.style.display = "none";
            }, 500);
        }
    }

    // Masquer le preloader après le chargement
    window.addEventListener("load", hidePreloader);

    // Sécurité : éviter que le preloader reste bloqué
    setTimeout(hidePreloader, 4000);


    /* =====================================
       2. MENU MOBILE
       ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

        });

        // Fermer le menu après un clic sur un lien
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener("click", function (event) {

            if (
                !menuToggle.contains(event.target) &&
                !navMenu.contains(event.target)
            ) {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* =====================================
       3. DÉFILEMENT FLUIDE
       ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================
       4. FAQ - QUESTIONS FRÉQUENTES
       ===================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        if (question) {

            question.addEventListener("click", function () {

                const isActive = item.classList.contains("active");

                faqItems.forEach(function (otherItem) {
                    otherItem.classList.remove("active");
                });

                if (!isActive) {
                    item.classList.add("active");
                }

            });

        }

    });


    /* =====================================
       5. ANNÉE AUTOMATIQUE DU FOOTER
       ===================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================
       6. ANIMATION DES ÉLÉMENTS AU SCROLL
       ===================================== */

    const animatedElements = document.querySelectorAll(
        ".reveal, .fade-in, .slide-up"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        animatedElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }

});
