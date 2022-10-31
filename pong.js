//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 22;
let raio = dBolinha / 2;
let colidiu = false;

//velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;

//variáveis das raquetes
//raquete aliada (esquerda)
let xRaqueteAliado = 3;
let yRaqueteAliado = 150;
let lRaqueteAliado = 12;
let cRaqueteAliado = 100;
//raquete oponente (direita)
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let lRaqueteOponente = 12;
let cRaqueteOponente = 100;
let movOponente;
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
});

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraElementos();
  movimentaBolinha();
  verificaColisaoBorda();
  movimentaRaqueteAliada();
  movimentaRaqueteOponente();
  colisaoRaqueteLib(xRaqueteAliado, yRaqueteAliado);
  colisaoRaqueteLib(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraElementos() {
  circle(xBolinha, yBolinha, dBolinha)
  rect(xRaqueteAliado,yRaqueteAliado, lRaqueteAliado, cRaqueteAliado)
  rect(xRaqueteOponente, yRaqueteOponente, lRaqueteOponente, cRaqueteOponente)
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
    if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}
function movimentaRaqueteAliada() {
  if (keyIsDown(UP_ARROW)){
    yRaqueteAliado -= 10;
  }
    if (keyIsDown(DOWN_ARROW)){
    yRaqueteAliado += 10;
  }
}
function colisaoRaqueteLib(x, y) {
  colidiu = 
  collideRectCircle(x, 
                    y, 
                    lRaqueteAliado, 
                    cRaqueteAliado, 
                    xBolinha, 
                    yBolinha, 
                    raio);
  if (colidiu == true) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function movimentaRaqueteOponente() {
  movOponente = yBolinha - yRaqueteOponente - cRaqueteOponente / 2 - chanceDeErrar;
  yRaqueteOponente += movOponente;
}
function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}
function marcaPonto() {
  if(xBolinha > 588){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 12){
    pontosOponente += 1;
    ponto.play();
  }
}
function calculaChanceDeErrar() {
    chanceDeErrar = Math.round(Math.random()*140);
}
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
const LoopErro = setInterval(function LoopErro() {
  calculaChanceDeErrar();
}, 1000);