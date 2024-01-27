// Pega alguns elementos da página
const botoes = document.querySelectorAll(".botao");
const h1 = document.querySelector(".pergunta");
const faseIndicador = document.querySelector(".fase");

// Define fase como 0 (usado para verificar e pegar a fase que estamos)
let fase = 0

// Comando para pegar o json com as perguntas e respostas das fases
const requestURL = "perguntas.json"; //URL do JSON
const request = new XMLHttpRequest(); //Cria uma nova API com métodos dela
request.open("GET", requestURL); //Fala de onde vai pegar as informações
request.responseType = "json"; //Fala que vai ser do tipo JSON (podia ser uma string, por exemplo)
request.send(); //Manda o envio
let perguntas;
request.onload = () => { //Quando chegar o JSON executa o código abaixo
    perguntas = request.response; //A variável perguntas se torna a resposta da requisição
    mudarPagina();
};

for (let pos = 0; pos < botoes.length; pos++) {
    //Adiciona o evento no botão
    botoes[pos].addEventListener("click", verificarResposta);
};

function verificarResposta(e) {
    // Verifica se a resposta é verdadeira, comparando se o botão que ativou essa função tem um elemento true no JSON
    if (perguntas[fase].alternativas[e.target.id][1]) {
        fase++
        mudarPagina()
    } else {
        fase = 0;
        mudarPagina()
    }
};

function mudarPagina() {
    if (fase === 9) {
        // Se for a última fase, faz com que o icone da fase se torne clicavel
        faseIndicador.className += " clicavel";
        faseIndicador.addEventListener("click", () => {
            window.location.href = "pages/vitoria.html";
        })
    }

    // Muda o número da fase, as respostas e a pergunta, utilizando o JSON
    h1.textContent = perguntas[fase].pergunta;

    for (let pos = 0; pos < botoes.length; pos++) {
        botoes[pos].innerHTML = perguntas[fase].alternativas[pos][0];
    };
    faseIndicador.innerHTML = fase + 1 + ".";
};