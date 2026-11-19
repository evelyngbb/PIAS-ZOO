
/* =========================================
   ZOOTOPIA PET - SCRIPT PRINCIPAL
   ========================================= */

// 1. CONFIGURAÇÕES INICIAIS

let fichas = [];

const chaveStorage = "zootopia_fichas";

const formulario = document.getElementById("form-ficha");
const listaFichas = document.getElementById("lista-fichas");
const contadorImpacto = document.getElementById("contador-impacto");

const pixButton = document.getElementById("pix-button");
const pixMessage = document.getElementById("pix-message");


// 2. DATA ATUAL

function pegarDataHoje() {
    const data = new Date();

    return `${String(data.getDate()).padStart(2, "0")}/${String(data.getMonth() + 1).padStart(2, "0")}/${data.getFullYear()}`;
}


// 3. CARREGAR AÇÕES SALVAS

function carregarFichas() {
    try {
        const guardado = localStorage.getItem(chaveStorage);

        if (guardado) {
            const dados = JSON.parse(guardado);
            fichas = Array.isArray(dados) ? dados : [];
        }
    } catch (erro) {
        console.error("Erro ao carregar ações:", erro);
        fichas = [];
    }

    mostrarFichas();
}


// 4. SALVAR AÇÕES

function salvarFichas() {
    try {
        localStorage.setItem(chaveStorage, JSON.stringify(fichas));
        return true;
    } catch (erro) {
        console.error("Erro ao salvar ações:", erro);
        alert("Não foi possível salvar os dados.");
        return false;
    }
}


// 5. MOSTRAR AÇÕES NO MURAL

function mostrarFichas() {
    listaFichas.innerHTML = "";

    contadorImpacto.textContent =
        `Ações cadastradas: ${fichas.length}`;

    if (fichas.length === 0) {
        const mensagem = document.createElement("p");

        mensagem.className = "sem-fichas";
        mensagem.textContent =
            "Nenhuma ação cadastrada ainda. Seja o primeiro a registrar uma ação!";

        listaFichas.appendChild(mensagem);
        return;
    }

    fichas.forEach((ficha, indice) => {
        const card = document.createElement("article");
        card.className = "ficha";

        // Botão de excluir
        const excluir = document.createElement("button");

        excluir.className = "btn-excluir";
        excluir.type = "button";
        excluir.title = "Excluir esta ação";
        excluir.setAttribute("aria-label", "Excluir ação");
        excluir.textContent = "×";

        excluir.addEventListener("click", () => {
            excluirFicha(indice);
        });

        // Título
        const titulo = document.createElement("h3");
        titulo.textContent = ficha.titulo;

        // Categoria
        const etiqueta = document.createElement("span");
        etiqueta.className = "etiqueta";
        etiqueta.textContent = ficha.categoria;

        // Local
        const local = document.createElement("p");
        local.className = "info";
        local.textContent = `📍 Local: ${ficha.local}`;

        // Participantes
        const pessoas = document.createElement("p");
        pessoas.className = "info";
        pessoas.textContent =
            `👥 Participantes: ${ficha.pessoas} pessoa(s)`;

        // Data
        const data = document.createElement("p");
        data.className = "info";
        data.textContent = `📅 Data: ${ficha.data}`;

        // Descrição
        const descricao = document.createElement("p");
        descricao.className = "descricao";
        descricao.textContent = ficha.descricao;

        // Montar cartão
        card.append(
            excluir,
            titulo,
            etiqueta,
            local,
            pessoas,
            data,
            descricao
        );

        listaFichas.appendChild(card);
    });
}


// 6. EXCLUIR AÇÃO

function excluirFicha(indice) {
    const confirmar = window.confirm(
        "Tem certeza que deseja excluir esta ação?"
    );

    if (!confirmar) return;

    const copiaAnterior = [...fichas];

    fichas.splice(indice, 1);

    if (!salvarFichas()) {
        fichas = copiaAnterior;
    }

    mostrarFichas();
}


// 7. CADASTRAR NOVA AÇÃO

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.reportValidity()) return;

    const dados = new FormData(formulario);

    const novaFicha = {
        titulo: String(dados.get("titulo")).trim(),
        categoria: String(dados.get("categoria")).trim(),
        local: String(dados.get("local")).trim(),
        pessoas: String(dados.get("pessoas")).trim(),
        descricao: String(dados.get("descricao")).trim(),
        data: pegarDataHoje()
    };

    if (
        !novaFicha.titulo ||
        !novaFicha.categoria ||
        !novaFicha.local ||
        !novaFicha.descricao
    ) {
        alert("Preencha todos os campos antes de cadastrar.");
        return;
    }

    fichas.unshift(novaFicha);

    if (!salvarFichas()) {
        fichas.shift();
        return;
    }

    mostrarFichas();

    formulario.reset();

    alert("Ação cadastrada com sucesso! Ela já aparece no mural.");
});


// 8. BOTÃO DE DOAÇÃO PIX

pixButton.addEventListener("click", () => {
    pixMessage.textContent =
        "PIX disponível em breve. Obrigado por querer ajudar! 💜";
});


// 9. INICIAR SITE

carregarFichas();
