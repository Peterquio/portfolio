function gerarCurriculoPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 18;
    const margem = 18;
    const larguraTexto = 174;

    function limparTexto(conteudo) {
        return String(conteudo)
            .replace(/\s+/g, " ")
            .trim();
    }

    function novaPagina() {
        if (y > 275) {
            doc.addPage();
            y = 18;
        }
    }

    function texto(conteudo, tamanho = 10, negrito = false, recuo = 0, espacamento = 3, alinhamento = "left") {
        doc.setFont("helvetica", negrito ? "bold" : "normal");
        doc.setFontSize(tamanho);

        const conteudoLimpo = limparTexto(conteudo);
        const linhas = doc.splitTextToSize(conteudoLimpo, larguraTexto - recuo);

        doc.text(linhas, margem + recuo, y, {
            align: alinhamento,
            maxWidth: larguraTexto - recuo
        });

        y += linhas.length * 4.6 + espacamento;
        novaPagina();
    }

    function textoCentralizado(conteudo, tamanho = 10, negrito = false, espacamento = 4) {
        doc.setFont("helvetica", negrito ? "bold" : "normal");
        doc.setFontSize(tamanho);

        doc.text(limparTexto(conteudo), 105, y, { align: "center" });
        y += tamanho * 0.45 + espacamento;
        novaPagina();
    }

    function tituloSecao(titulo) {
        y += 4;
        texto(titulo, 12, true, 0, 4);
    }

    // Cabeçalho centralizado
    textoCentralizado(curriculoData.nome.toUpperCase(), 16, true, 5);
    textoCentralizado("Brasileiro | São Paulo - SP (Região Central)", 10, false, 3);
    textoCentralizado("Tel.: (12) 99756-3257 | E-mail: dimorgs@gmail.com", 10, false, 7);

    curriculoData.secoes.forEach(secao => {
        tituloSecao(secao.titulo);

        if (secao.tipo === "texto") {
            if (Array.isArray(secao.conteudo)) {
                secao.conteudo.forEach(paragrafo => {
                    texto(paragrafo, 10, false, 0, 5, "justify");
                });
            } else {
                texto(secao.conteudo, 10, false, 0, 5, "justify");
            }
        }

        if (secao.tipo === "lista") {
            secao.itens.forEach(item => {
                texto(`• ${item}`, 10, false, 5, 1.5);
            });
        }

        if (secao.tipo === "experiencia") {
            secao.itens.forEach(item => {
                texto(item.titulo, 11, true, 0, 2);
                texto(`Cargo: ${item.cargo}`, 10, true, 4, 3);

                item.descricao.forEach(paragrafo => {
                    texto(`• ${paragrafo}`, 10, false, 6, 2, "justify");
                });

                y += 2;
            });
        }
    });

    doc.save(curriculoData.arquivoPDF);
}