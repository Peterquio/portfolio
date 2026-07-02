function renderDashboard() {
    const container = document.getElementById("dashboard-grid");

    if (!container || typeof dashboardData === "undefined") {
        return;
    }

    container.innerHTML = dashboardData.map(item => {
        const statusClass = item.status === "online" ? "status-online" : "";

        return `
            <article class="dashboard-card ${statusClass}">
                <span class="label">${item.label}</span>
                <strong>${item.value}</strong>
                <p>${item.description}</p>
            </article>
        `;
    }).join("");
}

renderDashboard();