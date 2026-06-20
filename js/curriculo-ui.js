function criarListaHTML(itens) {
    return `<ul>${itens.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function criarConteudoSecao(secao) {
    if (secao.tipo === "texto") {

        if (Array.isArray(secao.conteudo)) {
            return secao.conteudo
                .map(paragrafo => `<p>${paragrafo}</p>`)
                .join("");
        }

        return `<p>${secao.conteudo}</p>`;
    }

    if (secao.tipo === "lista") {
        return criarListaHTML(secao.itens);
    }

    if (secao.tipo === "experiencia") {
        return criarExperienciaHTML(secao.itens);
    }

    return "";
}

function criarSecaoCurriculo(titulo, conteudo, aberta = false) {
    return `
        <article class="curriculo-section ${aberta ? "aberto" : ""}">
            <button class="curriculo-section-header" type="button">
                <span>${titulo}</span>
                <span class="seta-curriculo">▼</span>
            </button>

            <div class="curriculo-section-body">
                ${conteudo}
            </div>
        </article>
    `;
}

function criarExperienciaHTML(itens) {
    return itens.map(item => `
        <div class="experiencia-item">
            <h4>${item.titulo}</h4>
            <p><strong>Cargo:</strong> ${item.cargo}</p>
            ${item.descricao.map(paragrafo => `<p>${paragrafo}</p>`).join("")}
        </div>
    `).join("");
}

function renderizarCurriculo() {
    const container = document.getElementById("curriculo-conteudo");

    const infoHTML = curriculoData.informacoesBasicas.map(info => `
        <p><strong>${info.rotulo}:</strong> ${info.valor}</p>
    `).join("");

    container.innerHTML = [
        criarSecaoCurriculo("Informações básicas", infoHTML, true),
        ...curriculoData.secoes.map(secao =>
            criarSecaoCurriculo(secao.titulo, criarConteudoSecao(secao))
        )
    ].join("");

    document.querySelectorAll(".curriculo-section-header").forEach(botao => {
        botao.addEventListener("click", () => {
            botao.closest(".curriculo-section").classList.toggle("aberto");
        });
    });
}

renderizarCurriculo();