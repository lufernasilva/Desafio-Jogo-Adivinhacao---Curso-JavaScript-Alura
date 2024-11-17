let numeroSecreto = 0
let contador = 0
let min = 1
let max = 100
let maxTentativa = 6
let situacao = ''

// Selecionar Elementos
let inputNumero = document.querySelector('#inputNumero')
let btnChute = document.querySelector('#btnChute')
let aviso = document.querySelector('#aviso')
let tentativas = document.querySelector('#tentativas')
let tentativasRestantes = document.querySelector('#tentativasRestantes')

// Funções do Jogo

function gerarNumeroSecreto() {
    numeroSecreto = parseInt(Math.random() * max + 1);    
    // console.log(numeroSecreto);
}

function reiniciar(){
    gerarNumeroSecreto();
    btnChute.textContent = 'Enviar';
    btnChute.onclick = jogar;
    inputNumero.value = '';
    aviso.textContent = '';
    aviso.style.color = 'white';
    tentativas.textContent = '';
    tentativasRestantes.textContent = '';
    contador = 0;
    maxTentativa = 6; 
}


function validarNumeroDigitado(numero) {
    if(numero <= 0 || numero > 100){
        mensagemRapida('Digite um Número Inteiro entre 1 e 100')
        btnChute.textContent = 'Reiniciar'
        btnChute.onclick = reiniciar       
    }
}

function mensagemRapida(mensagem, cor){
    aviso.textContent = mensagem;
    aviso.style.color = cor;
}

function qtdTentativa(qtd){
    tentativas.textContent = qtd
}

function qtdRestante(restante){
    tentativasRestantes.textContent = restante
}

function jogar(){
    verificarSeAcertou();
    contador++;
    maxTentativa--;
    qtdTentativa('Tentativas: ' + contador);
    qtdRestante('Tentativas Restantes: ' + maxTentativa);
}

function gameOver(situacao) {
    let chute = parseInt(document.querySelector('#inputNumero').value);
    switch(situacao) {
        case 'Acertou':
            mensagemRapida('Parabéns!!! Acertou, o número secreto é ' + numeroSecreto, 'green');
            break;

        case 'Chute maior':
            mensagemRapida('Errouu... O número secreto é menor que ' + chute, 'white');
            break;

        case 'Chute menor':
            mensagemRapida('Errouu... O número secreto é maior que ' + chute), 'white';
            break;

        case 'Game Over':
            mensagemRapida('Game Over', 'red');
            break;
    }
}

function verificarSeAcertou() {
    let chute = parseInt(document.querySelector('#inputNumero').value);
    let situacao;

    if (maxTentativa === 1) {
        situacao = 'Game Over';
    } else if (numeroSecreto === chute) {
        situacao = 'Acertou';
    } else if (chute > numeroSecreto) {
        situacao = 'Chute maior';
    } else if (chute < numeroSecreto) {
        situacao = 'Chute menor';
    } else {
        mensagemRapida('Não foi possível verificar');
        return; // Adiciona um retorno para evitar múltiplas chamadas de gameOver
    }

    gameOver(situacao);
    if (situacao === 'Acertou' || situacao === 'Game Over') {
        btnChute.textContent = 'Reiniciar';
        btnChute.onclick = reiniciar;
    }
}
