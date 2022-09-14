// import { obtenerUsuario } from './js/http-provider';
import * as CRUD from './js/crud-provider';
// import { init } from './js/usuarios-page';
import './styles.css';
// import { init } from './js/chistes-page';

// init();

// obtenerUsuario().then(console.log);

// init();
CRUD.getUsuario(2).then((respuesta) => {
	console.log('================GET================');
	console.log(respuesta);
});

CRUD.createUsuario({
	name: 'morpheus',
	job: 'leader',
}).then((respuesta) => {
	console.log('=================POST===============');
	console.log(respuesta);
});

CRUD.updateUsuario(
	{
		name: 'skierhy',
		job: 'front-end developer',
	},
	2
).then((respuesta) => {
	console.log('=================PUT===============');
	console.log(respuesta);
});

CRUD.deleteUsuario(2).then((respuesta) => {
	console.log('=================DELETE===============');
	console.log(respuesta);
});
