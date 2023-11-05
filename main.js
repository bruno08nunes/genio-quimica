const botoes = document.querySelectorAll(".botao");
const h1 = document.querySelector(".pergunta");
const faseIndicador = document.querySelector(".fase");

let fase = 0

const requestURL = "perguntas.json";
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();
let perguntas;
request.onload = () => {
    perguntas = request.response;
    mudarPagina();
};

for (let pos = 0; pos < botoes.length; pos++) {
    botoes[pos].addEventListener("click", verificarResposta);
};

function verificarResposta(e) {
    if (perguntas[fase].alternativas[e.target.id][1]) {
        fase++
        mudarPagina()
    } else {
        fase = 0;
        mudarPagina()
    }
};

function mudarPagina() {
    h1.textContent = perguntas[fase].pergunta;

    for (let pos = 0; pos < botoes.length; pos++) {
        botoes[pos].innerHTML = perguntas[fase].alternativas[pos][0];
    };
    faseIndicador.innerHTML = perguntas[fase].fase + ".";
};