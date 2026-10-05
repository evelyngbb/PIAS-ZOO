alert("O JavaScript está funcionando!");
/*
    Teste para verificar se o navegador consegue
    guardar uma informação no localStorage.
*/
localStorage.setItem("testeZootopia", "funcionando");

/*
    Recuperamos a informação que acabamos de salvar.
*/
const testeLocalStorage = localStorage.getItem("testeZootopia");

/*
    Mostramos o resultado do teste.
*/
alert(testeLocalStorage);

/*
    Pegamos o formulário criado no index.html.
*/
const formulario = document.getElementById("formularioAcao");


/*
    Pegamos os elementos que mostram as ações
    e o contador na página.
*/
const listaAcoes = document.getElementById("listaAcoes");
const mensagemSemAcoes = document.getElementById("mensagemSemAcoes");
const contadorAcoes = document.getElementById("contadorAcoes");


/*
    Esta função busca as ações que estão salvas
    no localStorage.

    Se não existir nenhuma ação salva,
    devolvemos uma lista vazia.
*/
function buscarAcoes() {

    const dadosSalvos = localStorage.getItem("acoesZootopia");

    if (dadosSalvos === null) {
        return [];
    }

    return JSON.parse(dadosSalvos);
}


/*
    Esta função mostra na tela todas as ações
    que estão salvas.
*/
function mostrarAcoes() {

    /*
        Buscamos as ações armazenadas.
    */
    const acoes = buscarAcoes();


    /*
        Limpamos a área das ações antes
        de desenhá-las novamente.
    */
    listaAcoes.innerHTML = "";


    /*
        Atualizamos o contador com a quantidade
        real de ações salvas.
    */
    contadorAcoes.textContent =
        "Total de ações cadastradas: " + acoes.length;


    /*
        Se não existir nenhuma ação,
        mostramos a mensagem.
    */
    if (acoes.length === 0) {

        mensagemSemAcoes.style.display = "block";

        return;
    }


    /*
        Se existirem ações, escondemos
        a mensagem de lista vazia.
    */
    mensagemSemAcoes.style.display = "none";


    /*
        Percorremos todas as ações salvas.
    */
    acoes.forEach(function(acao) {

        /*
            Criamos uma ficha para a ação.
        */
        const ficha = document.createElement("article");


        /*
            Colocamos as informações da ação
            dentro da ficha.
        */
        ficha.innerHTML = `
            <h3>${acao.titulo}</h3>

            <p>
                <strong>Categoria:</strong>
                ${acao.categoria}
            </p>

            <p>
                <strong>Local:</strong>
                ${acao.local}
            </p>

            <p>
                <strong>Participantes:</strong>
                ${acao.participantes}
            </p>

            <p>
                <strong>O que foi feito:</strong>
                ${acao.descricao}
            </p>

            <p>
                <strong>Data:</strong>
                ${acao.data}
            </p>

            <button class="botaoExcluir">
                Excluir ação
            </button>
        `;


        /*
            Colocamos a ficha dentro da lista.
        */
        listaAcoes.appendChild(ficha);


        /*
            Encontramos o botão de excluir
            desta ficha.
        */
        const botaoExcluir =
            ficha.querySelector(".botaoExcluir");


        /*
            Criamos o funcionamento do botão.
        */
        botaoExcluir.addEventListener("click", function() {

            /*
                Pedimos confirmação antes de excluir.
            */
            const confirmar = confirm(
                "Tem certeza que deseja excluir esta ação?"
            );


            /*
                Se a pessoa cancelar,
                não fazemos nada.
            */
            if (!confirmar) {
                return;
            }


            /*
                Encontramos a posição da ação
                dentro da lista.
            */
            const indice = acoes.indexOf(acao);


            /*
                Removemos a ação da lista.
            */
            acoes.splice(indice, 1);


            /*
                Salvamos novamente a lista atualizada.
            */
            localStorage.setItem(
                "acoesZootopia",
                JSON.stringify(acoes)
            );


            /*
                Atualizamos a tela.
            */
            mostrarAcoes();
        });
    });
}


/*
    Aqui começa o funcionamento do formulário.

    Quando o usuário clicar em "Cadastrar ação",
    este código será executado.
*/
formulario.addEventListener("submit", function(evento) {

    /*
        Impede o navegador de recarregar a página.
    */
    evento.preventDefault();


    /*
        Pegamos os valores preenchidos no formulário.
    */
    const titulo =
        document.getElementById("titulo").value.trim();

    const categoria =
        document.getElementById("categoria").value;

    const local =
        document.getElementById("local").value.trim();

    const participantes =
        Number(document.getElementById("participantes").value);

    const descricao =
        document.getElementById("descricao").value.trim();


    /*
        Verificamos se a quantidade de participantes
        é válida.
    */
    if (Number.isNaN(participantes) || participantes < 0) {

        alert("Digite uma quantidade válida de participantes.");

        return;
    }


    /*
        Criamos a data automaticamente.
    */
    const data = new Date().toLocaleDateString("pt-BR");


    /*
        Criamos o objeto que representa
        a nova ação.
    */
    const novaAcao = {
        titulo: titulo,
        categoria: categoria,
        local: local,
        participantes: participantes,
        descricao: descricao,
        data: data
    };


    /*
        Buscamos as ações que já estavam salvas.
    */
    const acoes = buscarAcoes();


    /*
        Adicionamos a nova ação à lista.
    */
    acoes.push(novaAcao);


    /*
        Salvamos a lista atualizada no localStorage.
    */
    localStorage.setItem(
        "acoesZootopia",
        JSON.stringify(acoes)
    );


    /*
        Mostramos uma mensagem confirmando o cadastro.
    */
    alert("Ação cadastrada com sucesso!");


    /*
        Limpamos o formulário.
    */
    formulario.reset();


    /*
        Atualizamos imediatamente a lista na tela.
    */
    mostrarAcoes();
});


/*
    Quando a página abre, mostramos as ações
    que já estavam salvas.
*/
mostrarAcoes();
