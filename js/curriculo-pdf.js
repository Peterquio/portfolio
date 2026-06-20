function gerarCurriculoPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 18;
    const margem = 18;
    const larguraTexto = 174;

    function novaPagina() {
        if (y > 275) {
            doc.addPage();
            y = 18;
        }
    }

    function limparTexto(conteudo) {
        return String(conteudo)
            .replace(/\s+/g, " ")
            .trim();
    }

    function texto(conteudo, tamanho = 10, negrito = false, recuo = 0) {
        doc.setFont("helvetica", negrito ? "bold" : "normal");
        doc.setFontSize(tamanho);

        const conteudoLimpo = limparTexto(conteudo);
        const linhas = doc.splitTextToSize(conteudoLimpo, larguraTexto - recuo);

        doc.text(linhas, margem + recuo, y);

        y += linhas.length * 5 + 3;
        novaPagina();
    }

    function tituloSecao(titulo) {
        y += 3;
        texto(titulo, 13, true);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(curriculoData.nome, margem, y);
    y += 10;

    curriculoData.informacoesBasicas.forEach(info => {
        texto(`${info.rotulo}: ${info.valor}`);
    });

    curriculoData.secoes.forEach(secao => {
        tituloSecao(secao.titulo);

        if (secao.tipo === "texto") {
            texto(secao.conteudo);
        }

        if (secao.tipo === "lista") {
            secao.itens.forEach(item => {
                texto(`• ${item}`, 10, false, 6);
            });
        }

        if (secao.tipo === "experiencia") {
            secao.itens.forEach(item => {
                texto(item.titulo, 11, true);
                texto(`Cargo: ${item.cargo}`, 10, true, 4);

                item.descricao.forEach(paragrafo => {
                    texto(`• ${paragrafo}`, 10, false, 6);
                });

                y += 2;
            });
        }
    });

    doc.save(curriculoData.arquivoPDF);
}