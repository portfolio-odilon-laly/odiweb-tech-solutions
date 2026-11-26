
/* ==========================================
   ODIWEB PORTFOLIO
   MAIN.JS
   PARTIE 1/3
   INITIALISATION ET NAVIGATION
========================================== */


/* ==========================================
   1. INITIALISATION DU SITE
========================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       2. MENU MOBILE
    ====================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });


        /* Fermer le menu après un clic */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.classList.remove("active");

            });

        });

    }


    /* ======================================
       3. ANNÉE AUTOMATIQUE DU FOOTER
    ====================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* ======================================
       4. NAVIGATION FLUIDE
    ====================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


});

/* ==========================================
   ODIWEB PORTFOLIO
   MAIN.JS
   PARTIE 2/3
   FORMULAIRE DE CONTACT - FORMSUBMIT
========================================== */


/* ==========================================
   1. CONFIGURATION DU FORMULAIRE
========================================== */

const contactForm = document.getElementById("contactForm");

const contactStatus = document.getElementById("contactStatus");

const formSubmitURL = "https://formsubmit.co/ajax/odilonlaly086@gmail.com";


/* ==========================================
   2. ENVOI DU FORMULAIRE
========================================== */

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Récupération des informations */

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();


        /* Vérification des champs */

        if (!name || !email || !subject || !message) {

            if (contactStatus) {
                contactStatus.textContent = "Veuillez remplir tous les champs.";
            }

            return;

        }


        /* Préparation des données */

        const formData = new FormData(contactForm);

        formData.set("name", name);
        formData.set("email", email);
        formData.set("subject", subject);
        formData.set("message", message);

        formData.set("_subject", "Nouvelle demande depuis ODIWEB PORTFOLIO");

        formData.set("_template", "table");

        formData.set("_captcha", "false");


        /* Désactiver le bouton pendant l'envoi */

        const submitButton = contactForm.querySelector('[type="submit"]');

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Envoi en cours...";
        }

        if (contactStatus) {
            contactStatus.textContent = "Envoi de votre message...";
        }


        /* Envoyer les informations avec FormSubmit */

        try {

            const response = await fetch(formSubmitURL, {

                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }

            });


            const result = await response.json();


            if (!response.ok || result.success === false) {

                throw new Error("Échec de l'envoi du formulaire.");

            }


            /* Enregistrer le nom pour la page merci */

            sessionStorage.setItem("odiwebClientName", name);


            /* Redirection après confirmation de l'envoi */

            window.location.href = "merci.html";


        } catch (error) {

            console.error("Erreur FormSubmit :", error);

            if (contactStatus) {

                contactStatus.textContent =
                    "Une erreur est survenue. Veuillez réessayer.";

            }

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent = originalButtonText;

            }

        }

    });

}

/* ==========================================
   ODIWEB PORTFOLIO
   MAIN.JS
   PARTIE 3/3
   FAQ ET INTERACTIONS FINALES
========================================== */


/* ==========================================
   1. GESTION DE LA FAQ
========================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    if (question && answer) {

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");


            /* Fermer toutes les réponses */

            faqItems.forEach(function (faqItem) {

                faqItem.classList.remove("active");

                const faqAnswer = faqItem.querySelector(".faq-answer");

                if (faqAnswer) {
                    faqAnswer.style.maxHeight = null;
                }

            });


            /* Ouvrir la réponse sélectionnée */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    }

});


/* ==========================================
   2. ANIMATION AU DÉFILEMENT
========================================== */

const revealElements = document.querySelectorAll(
    ".skill-card, .service-card, .project-card, .process-card, .advantages-card"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    });


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


/* ==========================================
   3. BOUTON RETOUR EN HAUT
========================================== */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* ==========================================
   4. LIEN WHATSAPP
========================================== */

const whatsappButton = document.querySelector(".whatsapp-float");

if (whatsappButton) {

    whatsappButton.setAttribute("target", "_blank");

    whatsappButton.setAttribute("rel", "noopener noreferrer");

}


/* ==========================================
   5. FIN DU MAIN.JS
========================================== */

console.log("ODIWEB PORTFOLIO : JavaScript chargé avec succès.");



/* =====================================
   ENREGISTREMENT DES INFORMATIONS CLIENT
===================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function () {

        const clientData = {
            name: document.getElementById("contactName").value.trim(),
            email: document.getElementById("contactEmail").value.trim(),
            subject: document.getElementById("contactSubject").value.trim(),
            message: document.getElementById("contactMessage").value.trim()
        };

        localStorage.setItem(
            "odiweb-client-message",
            JSON.stringify(clientData)
        );

    });

}

