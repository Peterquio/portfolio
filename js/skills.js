function renderSkills() {
    const container = document.getElementById("skills-grid");

    if (!container || typeof skillsData === "undefined") {
        return;
    }

    container.innerHTML = skillsData.map(skill => `
        <article class="skill-card">
            <div class="skill-icon">${skill.icon}</div>

            <div class="skill-header">
                <h3>${skill.title}</h3>
                <span class="skill-arrow">▼</span>
            </div>

            <div class="skill-body">
                <p class="skill-description">${skill.description}</p>

                <div class="stack-list">
                    ${skill.stacks.map(stack => `
                        <span class="stack-badge">${stack}</span>
                    `).join("")}
                </div>
            </div>
        </article>
    `).join("");

    document.querySelectorAll(".skill-card").forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("open");
        });
    });
}

renderSkills();