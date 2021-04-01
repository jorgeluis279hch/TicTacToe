let elements = document.querySelectorAll('.cuadrantes');
let turn = true;
let players = {
  playerA:{
    name: '', 
    score: 0
  }, 
  playerB:{
    name: '', 
    score: 0
  }
};

let posiciones = {
  playerOne:[],
  playerTwo:[]
};

const puntajeTo = to => {
  (turn) 
    ? document.getElementById('puntaje__uno').textContent = ++players.playerA.score
    : document.getElementById('puntaje__dos').textContent = ++players.playerB.score; 
}

const register = e => {
  let g1 = document.getElementById('userOne');
  let g2 = document.getElementById('userTwo');

  if ( g1.value === '') {
    g1.focus();
  } else if (g2.value === '') {
    g2.focus();
  } else {
    players.playerA.name = g1.value,
    players.playerB.name = g2.value;

    document.getElementById('jugador-uno').textContent = players.playerA.name;
    document.getElementById('jugador-dos').textContent = players.playerB.name;

    document.querySelector('.reg').classList.add('hidden');
    document.querySelector('.board').classList.remove('not-show');
  }

  turno();
}

let secuenciaGanador = [
  // regex
  /([1].?[2].?[3])/,
  /([4].?[5].?[6])/,
  /([7].?[8].?[9])/,
  /([1].?[4].?[7])/,
  /([2].?[5].?[8])/,
  /([3].?[6].?[9])/,
  /([1].?[5].?[9])/,
  /([3].?[5].?[7])/
];

elements.forEach(elem => {
  elem.addEventListener('click', play);
})

const colorToCuadrante = numbers => {
  document.querySelector(`.cuadrantes:nth-child(${parseInt(numbers[0])})`)
    .classList.add('win-cuadrante');
  document.querySelector(`.cuadrantes:nth-child(${parseInt(numbers[1])})`)
    .classList.add('win-cuadrante');
  document.querySelector(`.cuadrantes:nth-child(${parseInt(numbers[2])})`)
    .classList.add('win-cuadrante');
}

function play(e) {

  let temp = '';

  if (turn) {
    temp = '<span class="icon-radio-unchecked"></span>';
    posiciones.playerOne.push(e.target.dataset.val);
  }
  else {
    temp = '<span class="icon-cross"></span>';
    posiciones.playerTwo.push(e.target.dataset.val);
  }

  document.querySelector(`[data-val='${e.target.dataset.val}']`).innerHTML = temp;

  if (posiciones.playerOne.length > 2) {
    let pO = posiciones.playerOne.sort().join('');
    let pT= posiciones.playerTwo.sort().join('');

    secuenciaGanador.forEach(elem => {
      // esta variable almacena todos los digitos de la expresion regular
      let elemToString = elem.toString().replace(/\D/g, '');
      if (elem.test(pO)){
        colorToCuadrante(elemToString);
        puntajeTo(turn);
        alert('Gano ' + turno()); 
      }
      else if (elem.test(pT)) {
        puntajeTo(turn);
        colorToCuadrante(elemToString);
        alert('Gano ' + turno());
      } 
    })

  } else if (posiciones.playerOne.length > 4){
    alert('nadie Gano intentalo otra vez');
  }
  turn = !turn;
  turno();
}

const reset = () => {
  elements.forEach(elem => {
    elem.innerHTML = '';
    elem.classList.remove('win-cuadrante');
  });
  turn = true;
  turno();
  posiciones.playerOne = [];
  posiciones.playerTwo = [];

}

function turno() {
  let t = (turn) 
  ? players.playerA.name
  : players.playerB.name;
  document.querySelector('.info__turno').textContent = 'Turno de ' +  t;
  return t;
}

function clearLocal() {
  location.reload();
  players.playerA.name = '';
  players.playerA.score = 0;
  players.playerB.name = '';
  players.playerB.score = 0;

}



