import { obtenerChiste, obtenerUsuario } from './http-provider';

const body = document.body;
let btnOtro, olList;

const crearHTML = () => {
	const html = `
    <h1 class="mt-5">Chistes</h1>
    <hr />
    <button class="btn btn-primary">Otro chiste</button>
    <ol class="mt-2 list-group">
    </ol>
    `;
	const divChistes = document.createElement('div');
	divChistes.innerHTML = html;
	body.append(divChistes);
};

const eventos = () => {
	btnOtro = document.querySelector('button');
	olList = document.querySelector('ol');
	btnOtro.addEventListener('click', async () => {
		btnOtro.disabled = true;
		dibujarChistes(await obtenerChiste());
		btnOtro.disabled = false;
	});
};

const dibujarChistes = (chiste) => {
	const olItem = document.createElement('li');
	olItem.innerHTML = `
    <b>${chiste.id}</b>: ${chiste.value}
    `;
	olItem.classList.add('list-group-item');
	olList.append(olItem);
};

/**
 * La función init se llama cuando se carga la página y llama a la función crearHTML.
 */
const init = () => {
	crearHTML();
	eventos();
};

export { init };
