function renderProjects() {
    const container = document.getElementById("projects-grid");

    if (!container || typeof projectsData === "undefined") {
        return;
    }

    container.innerHTML = projectsData.map(project => `
        <article class="project-card">
            <div class="project-top">
                <span class="project-tag">${project.tag}</span>
            </div>

            <h3>${project.title}</h3>

            <p>${project.description}</p>

            <div class="project-impact">
                ${project.impact.map(item => `
                    <span>✔ ${item}</span>
                `).join("")}
            </div>

            <div class="project-stack">
                ${project.stacks.map(stack => `
                    <span>${stack}</span>
                `).join("")}
            </div>

            <a class="project-link" href="${project.link}">
                ABRIR QUEST →
            </a>
        </article>
    `).join("");
}

renderProjects();