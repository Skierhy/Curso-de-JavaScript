let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosComputadora = 0;

// referencias del html
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#Computadora-cartas');
const mensaje = document.querySelector('#mensaje');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const mensajesBJ = document.createElement('p');
const img = document.querySelectorAll('img');

const crearDeck = () => {
	for (let i = 2; i <= 10; i++) {
		for (const tipo of tipos) {
			deck.push(i + tipo);
		}
	}
	for (const tipo of tipos) {
		for (const especial of especiales) {
			deck.push(especial + tipo);
		}
	}
	// para revolver el deck se necesita un librería de tercero
	// para eso se usa la librería underscore.js
	// se puede descargar desde https://underscorejs.org/
	deck = _.shuffle(deck);
	return deck;
};

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
	if (deck.length === 0) {
		// throw es para lanzar un error
		throw 'no hay cartas en deck';
	}
	const carta = deck.pop();
	return carta;
};

const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);
	// el valor de la carta 10D es 10
	// isNaN es para saber si no es un número
	// siglas de is not a number
	return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
};

// turno de la computadora
const turnoComputadora = (puntosMin) => {
	do {
		const carta = pedirCarta();
		const cartaImagen = document.createElement('img');
		puntosComputadora = puntosComputadora + valorCarta(carta);
		puntosHTML[1].innerText = puntosComputadora;
		cartaImagen.classList.add('carta');
		cartaImagen.alt = `carta ${carta}`;
		cartaImagen.src = `./assets/cartas/${carta}.png`;
		divCartasComputadora.append(cartaImagen);
		if (puntosMin > 21) {
			break;
		}
	} while (puntosComputadora < puntosMin && puntosMin <= 21);

	setTimeout(() => {
		if (puntosComputadora === puntosMin) {
			mensajesBJ.innerText = 'Empate';
			mensajesBJ.classList.add('perdiste', 'empate');
			mensaje.append(mensajesBJ);
		} else if (puntosMin > 21) {
			mensajesBJ.innerText = 'Gana la computadora :)';
			mensajesBJ.classList.add('perdiste');
			mensaje.append(mensajesBJ);
		} else if (puntosComputadora > 21) {
			mensajesBJ.innerText = 'Ganaste :)';
			mensajesBJ.classList.add('perdiste', 'ganaste');
			mensaje.append(mensajesBJ);
		} else {
			mensajesBJ.innerText = 'Gana la computadora :)';
			mensajesBJ.classList.add('perdiste');
			mensaje.append(mensajesBJ);
		}
	}, 10);
};

// eventos
btnPedir.addEventListener('click', () => {
	const carta = pedirCarta();
	const cartaImagen = document.createElement('img');
	puntosJugador = puntosJugador + valorCarta(carta);
	puntosHTML[0].innerText = puntosJugador;
	cartaImagen.classList.add('carta');
	cartaImagen.alt = `carta ${carta}`;
	cartaImagen.src = `./assets/cartas/${carta}.png`;
	divCartasJugador.append(cartaImagen);

	if (puntosJugador > 21) {
		mensajesBJ.innerText = 'Perdiste';
		mensajesBJ.classList.add('perdiste');
		mensaje.append(mensajesBJ);
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugador);
	} else if (puntosJugador === 21) {
		mensajesBJ.innerText = 'Ya tienes 21 puntos';
		mensajesBJ.classList.add('ganaste', 'perdiste');
		mensaje.append(mensajesBJ);
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugador);
	}
});

btnDetener.addEventListener('click', () => {
	btnPedir.disabled = true;
	btnDetener.disabled = true;
	turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
	mensajesBJ.remove();
	deck = [];
	deck = crearDeck();
	puntosJugador = 0;
	puntosComputadora = 0;
	puntosHTML[0].innerText = 0;
	puntosHTML[1].innerText = 0;
	divCartasJugador.innerHTML = '';
	divCartasComputadora.innerHTML = '';
	btnPedir.disabled = false;
	btnDetener.disabled = false;
	console.log(deck);
});
