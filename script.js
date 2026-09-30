// =========================================================
// CADASTRO DAS AÇÕES
// =========================================================

// Pegamos o formulário pelo ID que criamos no HTML
const formulario = document.getElementById("formularioAcao");

// Quando o usuário enviar o formulário, esta função será executada
formulario.addEventListener("submit", function(evento) {

    // Impede que o navegador recarregue a página
    evento.preventDefault();

    // Pegamos os valores que o usuário digitou em cada campo
    const categoria = document.getElementById("categoria").value;
    const local = document.getElementById("local").value;
    const participantes = document.getElementById("participantes").value;
    const descricao = document.getElementById("descricao").value;

    // Criamos automaticamente a data e a hora do cadastro
    const data = new Date();

    // Criamos um objeto contendo todos os dados da ficha
    const novaAcao = {
        categoria: categoria,
        local: local,
        participantes: Number(participantes),
        descricao: descricao,
        data: data.toLocaleString("pt-BR")
    };

    // Tentamos pegar as ações que já estão salvas no navegador
    const acoesSalvas = localStorage.getItem("acoesZootopiaPet");

    // Se já existirem ações, transformamos o texto salvo em uma lista.
    // Caso não exista nenhuma, começamos com uma lista vazia.
    const acoes = acoesSalvas
        ? JSON.parse(acoesSalvas)
        : [];

    // Adicionamos a nova ação no final da lista
    acoes.push(novaAcao);

    // Transformamos a lista em texto e salvamos no localStorage
    localStorage.setItem(
        "acoesZootopiaPet",
        JSON.stringify(acoes)
    );

    // Mostramos uma mensagem para avisar que o cadastro foi realizado
    alert("Ação cadastrada com sucesso!");

    // Limpamos os campos do formulário
    formulario.reset();
});
// =========================================================
// EXIBIÇÃO DAS AÇÕES CADASTRADAS
// =========================================================

// Pegamos o espaço do HTML onde as ações serão mostradas
const listaAcoes = document.getElementById("listaAcoes");

// Esta função busca as ações salvas e mostra cada uma na página
function mostrarAcoes() {

    // Buscamos as ações que estão salvas no localStorage
    const acoesSalvas = localStorage.getItem("acoesZootopiaPet");

    // Se não houver nenhuma ação salva, mostramos uma mensagem
    if (!acoesSalvas) {
        listaAcoes.innerHTML = "<p>Nenhuma ação cadastrada ainda.</p>";
        return;
    }

    // Transformamos o texto salvo no localStorage em uma lista
    const acoes = JSON.parse(acoesSalvas);

    // Limpamos o conteúdo atual antes de mostrar as ações
    listaAcoes.innerHTML = "";

    // Percorremos cada ação cadastrada
    acoes.forEach(function(acao, index) {


        // Criamos uma caixa para representar a ação
        const ficha = document.createElement("div");

        // Adicionamos uma classe para podermos estilizar essa ficha depois
        ficha.classList.add("ficha-acao");

                // Colocamos as informações da ação dentro da ficha
                ficha.innerHTML = `
                <h3>${acao.categoria}</h3>
    
                <p><strong>Local:</strong> ${acao.local}</p>
    
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
    
                <!-- Botão usado para excluir esta ficha -->
                <button class="botao-excluir">Excluir</button>
            `;
    
            // Pegamos o botão de exclusão que acabamos de criar
            const botaoExcluir = ficha.querySelector(".botao-excluir");
    
            // Quando o botão for clicado, executamos a exclusão
            botaoExcluir.addEventListener("click", function() {
    
                // Perguntamos ao usuário se ele realmente deseja excluir
                const confirmar = confirm(
                    "Tem certeza que deseja excluir esta ação?"
                );
    
                // Se o usuário cancelar, não fazemos nada
                if (!confirmar) {
                    return;
                }
    
                // Removemos a ação da lista usando sua posição
                acoes.splice(index, 1);
    
                // Salvamos novamente a lista atualizada no localStorage
                localStorage.setItem(
                    "acoesZootopiaPet",
                    JSON.stringify(acoes)
                );
    
                // Atualizamos a lista exibida na tela
                mostrarAcoes();
            });
    

        // Colocamos a ficha dentro da lista de ações
        listaAcoes.appendChild(ficha);
    });
}

// Mostra as ações assim que a página é aberta
mostrarAcoes();
