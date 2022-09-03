/* Una función de auto invocación. */
const miModulo = (() => {
	'use strict';

	let deck = [];
	let puntosJugadores = [];
	const tipos = ['C', 'D', 'H', 'S'],
		especiales = ['A', 'J', 'Q', 'K'];

	// referencias del html
	const btnPedir = document.querySelector('#btnPedir'),
		btnNuevo = document.querySelector('#btnNuevo'),
		btnDetener = document.querySelector('#btnDetener');

	const divCartasJugadores = document.querySelectorAll('.divCartas'),
		puntosHTML = document.querySelectorAll('small');

	const mensaje = document.querySelector('#mensaje'),
		mensajesBJ = document.createElement('p');

	const inicializarJuego = (numJugadores = 2) => {
		crearDeck();
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0);
		}
		mensajesBJ.classList.remove('perdiste', 'empate', 'ganaste');
		mensajesBJ.remove();
		puntosHTML.forEach((elemento) => {
			elemento.innerText = 0;
		});
		divCartasJugadores.forEach((elemento) => {
			elemento.innerHTML = '';
		});
		btnPedir.disabled = false;
		btnDetener.disabled = false;
	};

	const crearDeck = () => {
		deck = [];
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
		return (deck = _.shuffle(deck));
	};

	// Esta función me permite tomar una carta
	const pedirCarta = () => {
		if (deck.length === 0) {
			// throw es para lanzar un error
			// throw 'no hay cartas en deck';
			mostrarMensajeHTML('No hay cartas en deck', 'perdiste');
		}
		return deck.pop();
	};

	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length - 1);
		// el valor de la carta 10D es 10
		// isNaN es para saber si no es un número
		// siglas de is not a number
		return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
	};

	// turno: 0 = primer jugador y el ultimo sera la computadora
	const acumularPuntos = (turno, carta) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		puntosHTML[turno].innerText = puntosJugadores[turno];
		return puntosJugadores[turno];
	};

	const mostrarCarta = (turno, carta) => {
		const cartaImagen = document.createElement('img');
		cartaImagen.classList.add('carta');
		cartaImagen.alt = `carta ${carta}`;
		cartaImagen.src = `./assets/cartas/${carta}.png`;
		divCartasJugadores[turno].append(cartaImagen);
	};

	const mostrarMensajeHTML = (mensajeInfo, clases1, clases2 = 'test') => {
		mensajesBJ.innerText = mensajeInfo;
		mensajesBJ.classList.add(clases1, clases2);
		mensaje.append(mensajesBJ);
	};

	const mostrarMensaje = () => {
		const [puntosMin, puntosComputadora] = puntosJugadores;
		setTimeout(() => {
			if (puntosComputadora === puntosMin) {
				mostrarMensajeHTML('Empate', 'perdiste', 'empate');
			} else if (puntosMin > 21) {
				mostrarMensajeHTML('Gana la computadora :)', 'perdiste');
			} else if (puntosComputadora > 21) {
				mostrarMensajeHTML('Ganaste :)', 'perdiste', 'ganaste');
				if (puntosMin === 21) {
					mostrarMensajeHTML(
						'Ya tienes 21 puntos y ganaste :)',
						'ganaste',
						'perdiste'
					);
				}
			} else {
				mostrarMensajeHTML('Gana la computadora :)', 'perdiste');
			}
		}, 10);
	};

	// turno de la computadora
	const turnoComputadora = (puntosMin) => {
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta();
			puntosComputadora = acumularPuntos(
				puntosJugadores.length - 1,
				carta
			);
			mostrarCarta(puntosJugadores.length - 1, carta);
		} while (puntosComputadora < puntosMin && puntosMin <= 21);
		mostrarMensaje();
	};

	// eventos
	btnPedir.addEventListener('click', () => {
		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(0, carta);
		mostrarCarta(0, carta);
		if (puntosJugador > 21) {
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		} else if (puntosJugador === 21) {
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			turnoComputadora(puntosJugador);
		}
	});

	btnDetener.addEventListener('click', () => {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugadores[0]);
	});

	btnNuevo.addEventListener('click', () => {
		inicializarJuego();
	});
	return {
		nuevoJuego: inicializarJuego,
	};
})();
