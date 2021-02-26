var largura = 0
var altura = 0
var vidas = 3
var tempo = null

var criaMosquitoTempo = null

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'facil') {
    tempo = 10
    criaMosquitoTempo = 1500
}
else if (nivel === 'medio') {
    tempo = 15
    criaMosquitoTempo = 1000
}
else if (nivel === 'dificil') {
    tempo = 20
    criaMosquitoTempo = 750
}

// Verifica o tamanho de tela disponivel
function ajustaTamanhoPalcoJogo() {
    largura = window.innerWidth
    altura = window.innerHeight

    console.log(largura + ' x ' + altura)
}

ajustaTamanhoPalcoJogo()

// Gera o cronometro
var cronometro = setInterval(function() {
    tempo--

    // Verifica o tempo 
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        
        window.location.href = 'vitoria.html'
    }
    else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

// Gera valores aleatórios dentro da tela disponivel para posicionar o mosquito e faz a chamada das outras funções
function posicaoRandomica() {
    // Remover o mosquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        // Modifica os corações de vida
        if (vidas === 0) {
            window.location.href = 'fim-de-jogo.html'
        }
        else {
            document.getElementById('v' + vidas).src = "images/coracao_vazio.png"
        }

        vidas--
    }

    var posicaoX = Math.floor(Math.random() * largura)
    var posicaoY = Math.floor(Math.random() * altura)

    // Impede que a imagem seja gerada fora da tela disponivel
    posicaoX = posicaoX >= largura - 90 ? largura - 90: posicaoX
    posicaoY = posicaoY >= altura - 90 ? altura - 90: posicaoY
    
    // Criar o elemento html (mosquito)
    var mosquito = document.createElement('img')
    mosquito.src = 'images/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.position = 'absolute'
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)

    // Chama de outras funções
    tamanhoAleatorio()
    ladoAleatorio()
}

// Seleciona o tamanho do mosquito
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}
// Seleciona o lado que o mosquito estará olhando
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'olhandoEsquerda'

        case 1:
            return 'olhandoDireita'
    }
}