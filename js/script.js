const projetos = [
  {
    nome: "Sistema com ESP32-CAM",
    descricao: "Detecção de objetos com IA e comunicação com Arduino",
    detalhes: "Sistema embarcado com visão computacional.",
    imagens: [
      "img/esp32_1.png",
      "img/esp32_2.png",
      "img/esp32_3.png"
    ]
  },
  {
    nome: "Pokedex 2.0",
    descricao: "Aplicação em Python com SQLite e interface gráfica",
    detalhes: "Sistema desktop com banco de dados.",
    imagens: [
      "img/pokedex_1.png",
      "img/pokedex_2.png",
      "img/pokedex_3.png",
      "img/pokedex_4.png",
      "img/pokedex_5.png"
    ]
  }
];

const listaProjetos = document.getElementById("lista-projetos");

projetos.forEach(projeto => {
  const div = document.createElement("div");
  div.classList.add("projeto");

  div.innerHTML = `
    <h3>${projeto.nome}</h3>
    <p>${projeto.descricao}</p>

    <div class="projeto-detalhes">
      <p>${projeto.detalhes}</p>

      <div class="modal">
        <img class="modal-img">
      </div>

      <div class="preview">
        <img class="preview-img">
      </div>
      
      <div class="carrossel">
        <button class="seta esquerda">◀</button>

        <div class="galeria">
          ${projeto.imagens
            .map(
              (img, i) =>
                `<img src="${img}" data-index="${i}" class="${i === 0 ? "ativa" : ""}">`
            )
            .join("")}
        </div>

        <button class="seta direita">▶</button>
      </div>
    </div>
  `;

  /* ----------- ABRIR / FECHAR PROJETO ----------- */
  div.addEventListener("click", () => {
    const aberto = div.classList.contains("aberto");

    document.querySelectorAll(".projeto").forEach(p => {
      p.classList.remove("aberto");
    });

    if (!aberto) div.classList.add("aberto");
  });


 /* ----------- CARROSSEL ----------- */
 const imagens = div.querySelectorAll(".galeria img");
 const setaDireita = div.querySelector(".seta.direita");
 const setaEsquerda = div.querySelector(".seta.esquerda");
 const previewImg = div.querySelector(".preview-img");
 
 let indexAtual = 0;
 
const atualizar = () => {
  const total = imagens.length;

  imagens.forEach(img => {
    img.style.display = "none";
    img.classList.remove("ativa");
    img.style.order = 0;
  });

  // Caso inicial
  if (total >= 3 && indexAtual === 0 && !atualizar.jaInteragiu) {
    imagens[0].style.display = "block";
    imagens[1].style.display = "block";
    imagens[2].style.display = "block";

    imagens[0].classList.add("ativa");

    imagens[0].style.order = 1;
    imagens[1].style.order = 2;
    imagens[2].style.order = 3;

    previewImg.src = imagens[0].src; // 🔥 importante

    return;
  }

  atualizar.jaInteragiu = true;

  const indexAnterior = (indexAtual - 1 + total) % total;
  const indexProximo = (indexAtual + 1) % total;

  imagens[indexAnterior].style.display = "block";
  imagens[indexAtual].style.display = "block";
  imagens[indexProximo].style.display = "block";

  imagens[indexAnterior].style.order = 1;
  imagens[indexAtual].style.order = 2;
  imagens[indexProximo].style.order = 3;

  imagens[indexAtual].classList.add("ativa");

  previewImg.src = imagens[indexAtual].src; // 🔥 atualiza sempre
};
 
 setaDireita.addEventListener("click", e => {
   e.stopPropagation();
   indexAtual = (indexAtual + 1) % imagens.length;
   atualizar();
 });

 setaEsquerda.addEventListener("click", e => {
   e.stopPropagation();
   indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
   atualizar();
 });

 imagens.forEach((img, i) => {
   img.addEventListener("click", e => {
     e.stopPropagation();
 
     indexAtual = i;
     atualizar();
   });
 });

 /* Inicializa */
 atualizar();


  /* ----------- MODAL ----------- */
  const modal = div.querySelector(".modal");
  const modalImg = div.querySelector(".modal-img");

  previewImg.addEventListener("click", e => {
    e.stopPropagation();

    modalImg.src = previewImg.src;
    modal.style.display = "flex";
  });

  modal.addEventListener("click", e => {
    e.stopPropagation();
    modal.style.display = "none";
  });

  listaProjetos.appendChild(div);
});