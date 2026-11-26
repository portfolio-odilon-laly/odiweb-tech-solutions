
/* ==========================================
   ODIWEB PORTFOLIO
   PROJECTS.JS
   PARTIE 1/2
   DONNÉES ET AFFICHAGE DES PROJETS
========================================== */


/* ==========================================
   1. BASE DE DONNÉES DES PROJETS
========================================== */

const projectsData = [

    {
        id: 1,
        title: "Site Web Restaurant",
        category: "web",
        description: "Création d'un site web moderne et professionnel pour un restaurant.",
        image: "projet-restaurant.jpg",
        link: "#",
        technologies: ["HTML", "CSS", "JavaScript"]
    },

    {
        id: 2,
        title: "Boutique en Ligne",
        category: "web",
        description: "Conception d'une boutique en ligne élégante pour la présentation et la vente de produits.",
        image: "projet-boutique.jpg",
        link: "#",
        technologies: ["HTML", "CSS", "JavaScript"]
    },

    {
        id: 3,
        title: "Projet Graphisme",
        category: "design",
        description: "Création graphique professionnelle avec une identité visuelle moderne.",
        image: "projet-graphisme.jpg",
        link: "#",
        technologies: ["Photoshop", "Illustrator", "Canva"]
    }

];


/* ==========================================
   2. CONTENEUR DES PROJETS
========================================== */

const projectsContainer = document.getElementById("projectsGrid");


/* ==========================================
   3. CRÉATION D'UNE CARTE PROJET
========================================== */

function createProjectCard(project) {

    const card = document.createElement("article");

    card.className = "project-card";

    card.dataset.category = project.category;


    card.innerHTML = `

        <div class="project-image">

            <img
                src="${project.image}"
                alt="${project.title}"
                loading="lazy"
            >

        </div>


        <div class="project-content">

            <span class="project-category">
                ${project.category}
            </span>

            <h3>${project.title}</h3>

            <p>${project.description}</p>


            <div class="project-technologies">

                ${project.technologies.map(function (technology) {

                    return `<span>${technology}</span>`;

                }).join("")}

            </div>


            <a href="${project.link}" class="project-link">

                Voir le projet

                <i class="fas fa-arrow-right"></i>

            </a>

        </div>

    `;


    return card;

}


/* ==========================================
   4. AFFICHAGE DE TOUS LES PROJETS
========================================== */

function displayProjects(projects) {

    if (!projectsContainer) {
        return;
    }


    projectsContainer.innerHTML = "";


    projects.forEach(function (project) {

        const projectCard = createProjectCard(project);

        projectsContainer.appendChild(projectCard);

    });

}


/* ==========================================
   5. CHARGEMENT INITIAL
========================================== */

if (projectsContainer) {

    displayProjects(projectsData);

}

/* ==========================================
   ODIWEB PORTFOLIO
   PROJECTS.JS
   PARTIE 2/2
   FILTRAGE ET INTERACTIONS
========================================== */


/* ==========================================
   1. BOUTONS DE FILTRAGE
========================================== */

const projectFilterButtons = document.querySelectorAll(".filter-btn");


/* ==========================================
   2. FILTRER LES PROJETS
========================================== */

projectFilterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Récupérer la catégorie sélectionnée */

        const selectedCategory = button.dataset.filter;


        /* Modifier le bouton actif */

        projectFilterButtons.forEach(function (filterButton) {

            filterButton.classList.remove("active");

        });

        button.classList.add("active");


        /* Filtrer les projets */

        const filteredProjects = projectsData.filter(function (project) {

            if (selectedCategory === "all") {

                return true;

            }

            return project.category === selectedCategory;

        });


        /* Afficher les projets filtrés */

        displayProjects(filteredProjects);

    });

});


/* ==========================================
   3. VÉRIFIER LES CATÉGORIES
========================================== */

const availableCategories = ["web", "design", "video"];


projectsData.forEach(function (project) {

    if (!availableCategories.includes(project.category)) {

        console.warn(
            "Catégorie inconnue pour le projet :",
            project.title
        );

    }

});


/* ==========================================
   4. MESSAGE SI AUCUN PROJET
========================================== */

function showProjectsMessage() {

    if (!projectsContainer) {
        return;
    }

    if (projectsContainer.children.length === 0) {

        projectsContainer.innerHTML = `

            <div class="no-projects">

                <i class="fas fa-folder-open"></i>

                <h3>Aucun projet disponible</h3>

                <p>
                    Cette catégorie ne contient pas encore de projet.
                    Revenez bientôt pour découvrir mes nouvelles réalisations.
                </p>

            </div>

        `;

    }

}


/* ==========================================
   5. FIN DU PROJECTS.JS
========================================== */

console.log("ODIWEB PORTFOLIO : Projets chargés avec succès.");
