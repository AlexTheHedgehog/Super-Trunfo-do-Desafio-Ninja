var carta1 = {
  nome:"Flooring Upgrade",
  atributos: {
    ataque:90,
    defesa:130,
    magia:78,
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/0/01/FLOORING_UPGRADE_card_image.png"
}

var carta2 = {
  nome:"Shadow Guy & Gamma Gal",
  atributos: {
    ataque:80,
    defesa:65,
    magia:120,
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/c/c6/SHADOW_GUY_%26_GAMMA_GAL_card_image.png"
}

var carta3 = {
  nome:"Cacto",
  atributos: {
    ataque:110,
    defesa:70,
    magia:15
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/1/1c/CACTUS_card_image.png"
}

var carta4 = {
  nome:"Astro Barrier",
  atributos: {
    ataque:85,
    defesa:20,
    magia:65
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/2/22/ASTRO_BARRIER_card_image.png"
}

var carta5 = {
  nome:"Mighty Plunger (Super Trunfo)",
  atributos: {
    ataque:12000,
    defesa:90000,
    magia:1928301919283
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/c/c3/MIGHTY_PLUNGER_card_image.png"
}

var carta6 = {
  nome:"Aqua Grabber",
  atributos: {
    ataque:100,
    defesa:20,
    magia:150
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/6/64/AQUA_GRABBER_card_image.png"
}

var carta7 = {
  nome:"Sensei",
  atributos: {
    ataque:140,
    defesa:76,
    magia:200
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/c/ce/Sensei_card_image.png"
}

var carta8 = {
  nome:"Chocolate Quente",
  atributos: {
    ataque:30,
    defesa:170,
    magia:5
  },
  imagem:"https://static.wikia.nocookie.net/clubpenguin/images/3/3d/HOT_CHOCOLATE_card_image.png"
}

var cartas = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8]

var cartaJog
var cartaMaq

var pontosJog = 0
var pontosMaq = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
  var divQuantidadeCartas = document.getElementById('quantidade-cartas')
  var html = `Quantidade de cartas no jogo: ${cartas.length}`
  
  divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
  var divPlacar = document.getElementById('placar')
  var html = `Jogador ${pontosJog}/${pontosMaq} Máquina`
  divPlacar.innerHTML = html
}

function sortearCarta() {
  var numMaq = cartas.length
  var numJog = cartas.length
  while (numMaq > cartas.length - 1) {
    numMaq = parseInt(Math.random() * cartas.length)
  }
  cartaMaq = cartas[numMaq]
  cartas.splice(numMaq, 1)
  
  while (numJog > cartas.length - 1) {
    numJog = parseInt(Math.random() * cartas.length)
    if (numJog == numMaq) {
      numJog = parseInt(Math.random() * cartas.length)
    }
  }
  cartaJog = cartas[numJog]
  cartas.splice(numJog, 1)
  
  console.log(cartaJog)
  console.log(cartaMaq)
  
  document.getElementById('btnSortear').disabled = true
  document.getElementById('btnJogar').disabled = false
  
  exibeCartaJogador()
}

function exibeCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador")
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">'
  divCartaJogador.style.backgroundImage = `url(${cartaJog.imagem})`
  var nome = `<p class="carta-subtitle">${cartaJog.nome}</p>`
  var opcoesTexto = ""
  
  for (var atributo in cartaJog.atributos) {
    opcoesTexto += `<input type='radio' name='atributo' value='${atributo}'>${atributo} ${cartaJog.atributos[atributo]}<br>`
    
  var html = "<div id='opcoes' class='carta-status'>"
    
  divCartaJogador.innerHTML = moldura+nome+html+opcoesTexto
  }
}

function exibeCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina")
  var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">'
  divCartaMaquina.style.backgroundImage = `url(${cartaMaq.imagem})`
  var nome = `<p class="carta-subtitle">${cartaMaq.nome}</p>`
  var opcoesTexto = ""
  
  for (var atributo in cartaMaq.atributos) {
    opcoesTexto += `<p type='text' name='atributo' value='${atributo}'>${atributo} ${cartaMaq.atributos[atributo]}<br>`
    
  var html = "<div id='opcoes' class='carta-status' --spacing>"
    
  divCartaMaquina.innerHTML = moldura+nome+html+opcoesTexto+"</div>"
  }
}

function obterAtributo() {
  var radioAtributo = document.getElementsByName('atributo')
  for (var i=0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value
    }
  }
}

function jogar() {
  var divResultado = document.getElementById("resultado")
  var atributoSelecionado = obterAtributo()
//  var ganhou = new Audio('Sonic 3 & Knuckles _Act Clear_ music request.ogg');
  
  if (cartaJog.atributos[atributoSelecionado] > cartaMaq.atributos[atributoSelecionado]) {
    var htmlResultado = "<p class='resultado-final'>Venceu a carta da máquina!</p>"
    pontosJog++
//    ganhou.play()
  } else if (cartaJog.atributos[atributoSelecionado] < cartaMaq.atributos[atributoSelecionado]) {
    var htmlResultado = "<p class='resultado-final'>Perdeu. A carta da máquina é maior.</p>"
    pontosMaq++
  } else {
    var htmlResultado = "<p class='resultado-final'>Empatou!</p>"
  }
  divResultado.innerHTML = htmlResultado
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = false
  
  exibeCartaMaquina()
  atualizaPlacar()
  atualizaQuantidadeDeCartas()
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  var htmlResultado = ""
  
  if (cartas.length == 0) {
    alert("Fim de jogo!")
    if (pontosJog > pontosMaq) {
      htmlResultado = "<p class='resultado-final'>VENCEU</p>"
    } else if (pontosMaq > pontosJog) {
      htmlResultado = "<p class='resultado-final'>PERDEU</p>"
    } else {
      htmlResultado = "<p class='resultado-final'>EMPATE</p>"
    }
  } else {
    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    
    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
  }
  
  document.getElementById('btnProximaRodada').disabled = true
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = htmlResultado
}