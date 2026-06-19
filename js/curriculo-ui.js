function criarListaHTML(itens) {
    return `<ul>${itens.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function criarConteudoSecao(secao) {
    if (secao.tipo === "texto") {
        return `<p>${secao.conteudo}</p>`;
    }

    if (secao.tipo === "lista") {
        return criarListaHTML(secao.itens);
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