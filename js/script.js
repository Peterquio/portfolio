const projetos = [
    {
        nome: "AI Pet - Inteligência Artificial para Pets",
        descricao: "Detecção de pessoas e animais com IA e comunicação com Arduino e Raspberry PI",
        detalhes: "Sistema embarcado com visão computacional.",
        midias: [
            { tipo: "imagem", src: "img/esp32_1.png" },
            { tipo: "imagem", src: "img/esp32_2.png" },
            {
                tipo: "video",
                src: "https://www.youtube.com/embed/SEU_VIDEO_ID_AQUI"
            },
            { tipo: "imagem", src: "img/esp32_3.png" }
        ]
    },
    {
        nome: "Pokedex 2.0",
        descricao: "Aplicação em Python com SQLite e interface gráfica",
        detalhes: "Sistema desktop com banco de dados.",
        link: "https://github.com/Peterquio/pokedex_2.0",
        midias: [
            { tipo: "imagem", src: "img/pokedex_1.png" },
            { tipo: "imagem", src: "img/pokedex_2.png" },
            { tipo: "imagem", src: "img/pokedex_3.png" },
            {
                tipo: "video",
                src: "https://www.youtube.com/embed/SEU_OUTRO_VIDEO_ID_AQUI"
            },
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
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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