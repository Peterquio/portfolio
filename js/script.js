const projetos = [
    {
        nome: "My Notebook",
        descricao: "Aplicação desktop modular em Python para organização pessoal, finanças, tarefas e planejamento.",
        detalhes: `
        Sistema desktop desenvolvido com Python, PySide6 e SQLite, usando arquitetura modular por domínio.
        O projeto segue separação em camadas UI → Service → Repository → Database, com módulos independentes
        para dashboard, finanças, tarefas, planner e calendário. O objetivo é transformar rotinas pessoais em
        uma aplicação extensível, com dashboards editáveis, cards dinâmicos e configurações visuais.
    `,
        link: "https://github.com/Peterquio/my_notebook",
        tecnologias: ["Python", "PySide6", "SQLite", "Arquitetura Modular", "Repository Pattern"],
        midias: [
            { tipo: "imagem", src: "img/my_notebook_1.png" },
            { tipo: "imagem", src: "img/my_notebook_2.png" },
            { tipo: "imagem", src: "img/my_notebook_3.png" },
            {
                tipo: "video",
                src: "https://youtube.com/embed/oqB45QmgYLM"
            }
        ]
    },
    {
        nome: "AI Pet - Inteligência Artificial para Pets",
        descricao: "Sistema com visão computacional para detecção de pets usando IA e ESP32-CAM.",
        detalhes: `
        Projeto em desenvolvimento voltado para monitoramento inteligente de pets, utilizando Python,
        visão computacional e integração com hardware embarcado. A proposta é detectar animais em tempo real,
        processar imagens da ESP32-CAM e permitir ações automatizadas a partir dos eventos identificados.
    `,
        link: "https://github.com/Peterquio/ai_pet",
        tecnologias: ["Python", "IA", "Visão Computacional", "ESP32-CAM", "Arduino"],
        midias: [
            {
                tipo: "video",
                src: "https://www.youtube.com/embed/ojbSPCltV9U"
            },
            { tipo: "imagem", src: "img/aipet_1.png" },
            { tipo: "imagem", src: "img/aipet_2.png" },
            { tipo: "imagem", src: "img/aipet_3.png" }
        ]
    },
    {
        nome: "Pokedex 2.0",
        descricao: "Aplicação desktop em Python com interface gráfica e banco de dados SQLite.",
        detalhes: `
        Sistema desktop desenvolvido em Python com interface gráfica e banco de dados SQLite.
        O projeto permite cadastrar, consultar e organizar informações de Pokémon, trabalhando conceitos
        de CRUD, persistência de dados, organização de código e construção de uma aplicação desktop funcional.
    `,
        link: "https://github.com/Peterquio/pokedex_2.0",
        tecnologias: ["Python", "SQLite", "Interface Gráfica", "CRUD", "Desktop App"],
        midias: [
            { tipo: "imagem", src: "img/pokedex_1.png" },
            { tipo: "imagem", src: "img/pokedex_2.png" },
            { tipo: "imagem", src: "img/pokedex_3.png" },
            { tipo: "imagem", src: "img/pokedex_4.png" },
            { tipo: "imagem", src: "img/pokedex_5.png" }
        ]
    }
];

const listaProjetos = document.getElementById("lista-projetos");

function extrairYouTubeId(url) {
    try {
        if (url.includes("/embed/")) {
            return url.split("/embed/")[1].split("?")[0];
        }

        if (url.includes("watch?v=")) {
            return url.split("watch?v=")[1].split("&")[0];
        }

        if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1].split("?")[0];
        }

        return "";
    } catch {
        return "";
    }
}

function obterThumbnailYouTube(url) {
    const videoId = extrairYouTubeId(url);
    return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : "";
}

function obterEmbedComAutoplay(url) {
    const separador = url.includes("?") ? "&" : "?";
    return `${url}${separador}autoplay=1`;
}

projetos.forEach(projeto => {
    const div = document.createElement("div");
    div.classList.add("projeto");

    div.innerHTML = `
    <h3>${projeto.nome}</h3>
    <p>${projeto.descricao}</p>

    <div class="projeto-detalhes">
    <p>${projeto.detalhes}</p>

      ${projeto.tecnologias ? `
        <div class="tecnologias">
          ${projeto.tecnologias.map(tech => `<span>${tech}</span>`).join("")}
        </div>
      ` : ""}

      ${projeto.link ? `
        <p>
          🔗 <a href="${projeto.link}" target="_blank" rel="noopener noreferrer">
            Ver no GitHub
          </a>
        </p>
      ` : ""}

      <div class="modal">
        <div class="modal-content"></div>
      </div>

      <div class="preview">
        <div class="preview-media"></div>
      </div>

      <div class="carrossel">
        <button class="seta esquerda" type="button">◀</button>

        <div class="galeria">
          ${projeto.midias.map((midia, i) => {
        if (midia.tipo === "imagem") {
            return `
                <div
                  class="item-galeria ${i === 0 ? "ativa" : ""}"
                  data-index="${i}"
                  data-tipo="imagem"
                  data-src="${midia.src}"
                >
                  <img src="${midia.src}" alt="${projeto.nome}">
                </div>
              `;
        }

        const thumb = obterThumbnailYouTube(midia.src);

        return `
              <div
                class="item-galeria ${i === 0 ? "ativa" : ""}"
                data-index="${i}"
                data-tipo="video"
                data-src="${midia.src}"
              >
                <img src="${thumb}" alt="Vídeo do projeto ${projeto.nome}">
                <span class="play-badge">▶</span>
              </div>
            `;
    }).join("")}
        </div>

        <button class="seta direita" type="button">▶</button>
      </div>
    </div>
  `;

    div.addEventListener("click", () => {
        const aberto = div.classList.contains("aberto");

        document.querySelectorAll(".projeto").forEach(p => {
            p.classList.remove("aberto");
        });

        if (!aberto) {
            div.classList.add("aberto");
        }
    });

    const itens = div.querySelectorAll(".item-galeria");
    const setaDireita = div.querySelector(".seta.direita");
    const setaEsquerda = div.querySelector(".seta.esquerda");
    const previewMedia = div.querySelector(".preview-media");
    const modal = div.querySelector(".modal");
    const modalContent = div.querySelector(".modal-content");

    let indexAtual = 0;

    const renderizarPreview = (item) => {
        const tipo = item.dataset.tipo;
        const src = item.dataset.src;

        if (tipo === "imagem") {
            previewMedia.innerHTML = `
        <img class="preview-img" src="${src}" alt="">
      `;
            return;
        }

        previewMedia.innerHTML = `
      <iframe
        class="preview-video"
        src="${src}"
        title="Vídeo do projeto"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
    };

    const atualizar = () => {
        const total = itens.length;

        itens.forEach(item => {
            item.style.display = "none";
            item.classList.remove("ativa");
            item.style.order = 0;
        });

        if (total === 0) return;

        if (total === 1) {
            itens[0].style.display = "block";
            itens[0].classList.add("ativa");
            itens[0].style.order = 1;
            renderizarPreview(itens[0]);
            return;
        }

        if (total === 2) {
            itens[0].style.display = "block";
            itens[1].style.display = "block";
            itens[0].style.order = 1;
            itens[1].style.order = 2;
            itens[indexAtual].classList.add("ativa");
            renderizarPreview(itens[indexAtual]);
            return;
        }

        if (indexAtual === 0 && !atualizar.jaInteragiu) {
            itens[0].style.display = "block";
            itens[1].style.display = "block";
            itens[2].style.display = "block";

            itens[0].classList.add("ativa");
            itens[0].style.order = 1;
            itens[1].style.order = 2;
            itens[2].style.order = 3;

            renderizarPreview(itens[0]);
            return;
        }

        atualizar.jaInteragiu = true;

        const indexAnterior = (indexAtual - 1 + total) % total;
        const indexProximo = (indexAtual + 1) % total;

        itens[indexAnterior].style.display = "block";
        itens[indexAtual].style.display = "block";
        itens[indexProximo].style.display = "block";

        itens[indexAnterior].style.order = 1;
        itens[indexAtual].style.order = 2;
        itens[indexProximo].style.order = 3;

        itens[indexAtual].classList.add("ativa");
        renderizarPreview(itens[indexAtual]);
    };

    setaDireita.addEventListener("click", e => {
        e.stopPropagation();
        indexAtual = (indexAtual + 1) % itens.length;
        atualizar.jaInteragiu = true;
        atualizar();
    });

    setaEsquerda.addEventListener("click", e => {
        e.stopPropagation();
        indexAtual = (indexAtual - 1 + itens.length) % itens.length;
        atualizar.jaInteragiu = true;
        atualizar();
    });

    itens.forEach((item, i) => {
        item.addEventListener("click", e => {
            e.stopPropagation();
            indexAtual = i;
            atualizar.jaInteragiu = true;
            atualizar();
        });
    });

    previewMedia.addEventListener("click", e => {
        e.stopPropagation();

        const itemAtual = itens[indexAtual];
        const tipo = itemAtual.dataset.tipo;
        const src = itemAtual.dataset.src;

        if (tipo === "imagem") {
            modalContent.innerHTML = `
        <img class="modal-img" src="${src}" alt="">
      `;
        } else {
            modalContent.innerHTML = `
        <iframe
          class="modal-video"
          src="${obterEmbedComAutoplay(src)}"
          title="Vídeo do projeto"
          frameborder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
        }

        modal.style.display = "flex";
    });

    modal.addEventListener("click", e => {
        e.stopPropagation();
        modal.style.display = "none";
        modalContent.innerHTML = "";
    });

    atualizar();
    listaProjetos.appendChild(div);
});

document.querySelectorAll(".skill-stars").forEach(starsDiv => {
    const rating = parseFloat(starsDiv.dataset.rating);

    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {

        if (rating >= i) {
            starsHTML += `<i class="fas fa-star"></i>`;
        }

        else if (rating >= i - 0.5) {
            starsHTML += `<i class="fas fa-star-half-alt"></i>`;
        }

        else {
            starsHTML += `<i class="far fa-star"></i>`;
        }
    }

    starsDiv.innerHTML = starsHTML;
});

function gerarCurriculoPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const margem = 18;
    const larguraTexto = 174;
    let y = 18;

    function titulo(texto) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text(texto, margem, y);
        y += 10;
    }

    function subtitulo(texto) {
        if (y > 270) {
            doc.addPage();
            y = 18;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.text(texto, margem, y);

        y += 8;
    }

    function paragrafo(texto, options = {}) {

        const {
            bold = false,
            indent = 0,
            spacing = 5
        } = options;

        doc.setFont(
            "helvetica",
            bold ? "bold" : "normal"
        );

        doc.setFontSize(
            bold ? 12 : 10
        );

        const largura = larguraTexto - indent;

        const linhas = doc.splitTextToSize(
            texto,
            largura
        );

        if (y + linhas.length * spacing > 280) {
            doc.addPage();
            y = 18;
        }

        doc.text(
            linhas,
            margem + indent,
            y
        );

        y += linhas.length * spacing + 3;
    }

    function lista(itens) {

        itens.forEach(item => {

            paragrafo(
                "• " + item,
                {
                    indent: 6,
                    spacing: 4
                }
            );
        });
    }

    titulo("Diego Francisco Alves Morgado");
    paragrafo("Brasileiro | Centro de São Paulo - SP | 05/10/1991 | Solteiro");
    paragrafo("Telefone: (12) 99756-3257 | E-mail: dimorgs@gmail.com");

    subtitulo("Resumo Profissional");
    paragrafo("Desenvolvedor Python com experiência em automação de processos, aplicações desktop, análise de dados, integração com APIs e soluções com Inteligência Artificial. Atua na criação de ferramentas internas, dashboards operacionais, sistemas de apoio à tomada de decisão e automações voltadas à eficiência de processos.");

    subtitulo("Objetivo");
    paragrafo("Atuar no desenvolvimento de soluções com Python, automação de processos e Inteligência Artificial aplicada, contribuindo para a construção de sistemas, integração de dados e criação de produtos tecnológicos eficientes.");

    subtitulo("Pontos Fortes");
    lista([
        "Python aplicado a problemas reais",
        "Automação de processos industriais e operacionais",
        "Desenvolvimento desktop com interfaces gráficas",
        "Banco de dados, APIs e organização de informações",
        "Projetos com IA, visão computacional e sistemas embarcados",
        "Perfil autodidata, analítico e orientado à solução de problemas"
    ]);

    subtitulo("Formação Acadêmica");
    lista([
        "Engenharia de Automação e Controle — Faculdade Anhanguera de Taubaté — 2013",
        "Pós-graduação em Machine Learning e Inteligência Artificial — Anhanguera — conclusão prevista em maio de 2026"
    ]);

    subtitulo("Cursos e Certificados");
    lista([
        "Foundation Certificate e Agentes de IA — Skyone — 2026",
        "Desenvolvedor Python — Básico, Intermediário e Avançado — FATEC Jundiaí e Huawei — 96h — 2025"
    ]);

    subtitulo("Experiência Profissional");
    paragrafo("Pan-Metal — Analista de Automação de Processos — 03/2026 até atualmente");
    lista([
        "Desenvolvimento de soluções internas utilizando Python",
        "Automação de processos industriais e operacionais",
        "Criação de dashboards, ferramentas de apoio à decisão e sistemas internos",
        "Uso de Python, FastAPI, SQLite, Pandas, APIs e Playwright"
    ]);

    paragrafo("Colégio Tableau – Taubaté/SP — Professor nos cursos de Mecânica e Mecatrônica — 03/2022 até atualmente");
    lista([
        "Atuação em disciplinas técnicas envolvendo automação, programação, IA, eletrônica, CAD, robótica e sistemas industriais",
        "Orientação de projetos envolvendo Python, IA e tecnologias aplicadas"
    ]);

    doc.save("Curriculo_Diego_Morgado.pdf");
}