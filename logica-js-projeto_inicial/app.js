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
    console.log(numeroSecreto);
}

function reiniciar(){
    gerarNumeroSecreto();
    btnChute.textContent = 'Enviar';
    btnChute.onclick = jogar;
    inputNumero.value = '';
    aviso.textContent = '';
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

function mensagemRapida(mensagem){
    aviso.textContent = mensagem
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
    chute = parseInt(document.querySelector('#inputNumero').value)
    switch(situacao) {
        case 'Acertou' :
            mensagemRapida('Parabéns!!! Acertou, o número secreto é ' + numeroSecreto)
        break

        case 'Chute maior' :
            mensagemRapida('Errouu... O número secreto é menor que ' + chute)
        break

        case 'Chute menor' :
            mensagemRapida('Errouu... O número secreto é maior que ' + chute)
        break
        
        case 'Game Over' :
            mensagemRapida('Game Over')
        break 

    }
}

function verificarSeAcertou(){
    chute = parseInt(document.querySelector('#inputNumero').value)

    if(chute !== numeroSecreto && maxTentativa === 1){
        situacao = 'Game Over'
        gameOver(situacao)
        btnChute.textContent = 'Reiniciar'
        btnChute.onclick = reiniciar
    } else if(numeroSecreto === chute) {
        situacao = 'Acertou'
        gameOver(situacao)
        btnChute.textContent = 'Reiniciar'
        btnChute.onclick = reiniciar
        
    } else if (chute > numeroSecreto) {
        situacao = 'Chute maior'
        gameOver(situacao)
    } else if (chute < numeroSecreto) {
        situacao = 'Chute menor'
        gameOver(situacao)
    } else {
        mensagemRapida('Não foi possível verificar')
    }
}