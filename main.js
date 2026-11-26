
/* ==================================================
   ODIWEB PORTFOLIO
   MAIN.JS - CODE COMPLET
   PARTIE 1/2
================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ======================================
       1. MENU MOBILE
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
       2. ANNÉE AUTOMATIQUE DU FOOTER
    ====================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }


    /* ======================================
       3. NAVIGATION FLUIDE
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


    /* ======================================
       FIN DE LA PARTIE 1
    ====================================== */

    /* ==================================================
       4. FORMULAIRE DE CONTACT - FORMSUBMIT AJAX
    ================================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const contactStatus = document.getElementById("contactStatus");

        const submitButton =
            contactForm.querySelector('[type="submit"]');

        const formSubmitURL =
            "https://formsubmit.co/ajax/odilonlaly50@gmail.com";

        let formIsSubmitting = false;


        /* AFFICHER UN MESSAGE */

        function showContactMessage(message, color) {

            if (!contactStatus) return;

            contactStatus.textContent = message;
            contactStatus.style.color = color;

        }


        /* ENVOI DU FORMULAIRE */

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            if (formIsSubmitting) return;

            if (!contactForm.reportValidity()) return;

            formIsSubmitting = true;


            /* RÉCUPÉRATION DES INFORMATIONS */

            const name =
                document.getElementById("contactName").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const subject =
                document.getElementById("contactSubject").value.trim();

            const message =
                document.getElementById("contactMessage").value.trim();


            /* VÉRIFICATION DES CHAMPS */

            if (!name || !email || !subject || !message) {

                showContactMessage(
                    "Veuillez remplir tous les champs.",
                    "red"
                );

                formIsSubmitting = false;

                return;
            }


            /* ENREGISTREMENT POUR MERCI.HTML */

            const clientData = {

                name: name,
                email: email,
                subject: subject,
                message: message

            };

            localStorage.setItem(
                "odiweb-client-message",
                JSON.stringify(clientData)
            );


            /* PRÉPARATION DES DONNÉES */

            const formData = new FormData(contactForm);

            formData.set("name", name);
            formData.set("email", email);
            formData.set("subject", subject);
            formData.set("message", message);

            formData.set(
                "_subject",
                "Nouvelle demande depuis ODIWEB PORTFOLIO"
            );

            formData.set("_template", "table");
            formData.set("_captcha", "false");


            /* DÉSACTIVATION DU BOUTON */

            const originalButtonText = submitButton
                ? submitButton.textContent
                : "";

            if (submitButton) {

                submitButton.disabled = true;
                submitButton.textContent = "Envoi en cours...";

            }

            showContactMessage(
                "Envoi de votre message...",
                "#087DE0"
            );


            /* ENVOI FORMSUBMIT */

            try {

                const response = await fetch(formSubmitURL, {

                    method: "POST",

                    headers: {
                        "Accept": "application/json"
                    },

                    body: formData

                });


                const data = await response.json();

                console.log("Réponse FormSubmit :", data);


                if (
                    !response.ok ||
                    String(data.success).toLowerCase() !== "true"
                ) {

                    throw new Error(
                        data.message ||
                        "FormSubmit n'a pas accepté votre message."
                    );

                }


                /* CONFIRMATION DE L'ENVOI */

                showContactMessage(
                    "Votre message a été envoyé avec succès !",
                    "green"
                );


                /* REDIRECTION VERS MERCI.HTML */

                window.location.href = "merci.html";


            } catch (error) {

                console.error("Erreur FormSubmit :", error);

                showContactMessage(
                    "Échec de l'envoi : " + error.message,
                    "red"
                );

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;

                }

                formIsSubmitting = false;

            }

        });

    }


    /* ==================================================
       5. GESTION DE LA FAQ
    ================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        const answer = item.querySelector(".faq-answer");

        if (question && answer) {

            question.addEventListener("click", function () {

                const isActive = item.classList.contains("active");


                /* FERMER TOUTES LES RÉPONSES */

                faqItems.forEach(function (faqItem) {

                    faqItem.classList.remove("active");

                    const faqAnswer =
                        faqItem.querySelector(".faq-answer");

                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = null;
                    }

                });


                /* OUVRIR LA RÉPONSE SÉLECTIONNÉE */

                if (!isActive) {

                    item.classList.add("active");

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                }

            });

        }

    });


    /* ==================================================
       6. ANIMATION AU DÉFILEMENT
    ================================================== */

    const revealElements = document.querySelectorAll(

        ".skill-card, " +
        ".service-card, " +
        ".project-card, " +
        ".process-card, " +
        ".advantages-card"

    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

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


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* ==================================================
       7. BOUTON RETOUR EN HAUT
    ================================================== */

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


    /* ==================================================
       8. LIEN WHATSAPP
    ================================================== */

    const whatsappButton =
        document.querySelector(".whatsapp-float");

    if (whatsappButton) {

        whatsappButton.setAttribute("target", "_blank");

        whatsappButton.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    }


    /* ==================================================
       9. FIN DU MAIN.JS
    ================================================== */

    console.log(
        "ODIWEB PORTFOLIO : JavaScript chargé avec succès."
    );

});
