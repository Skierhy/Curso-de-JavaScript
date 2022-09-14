const jokeURL = 'https://api.chucknorris.io/jokes/random';
const urlUsuario = 'https://reqres.in/api/users?page=2';

const obtenerChiste = async () => {
	try {
		const respuesta = await fetch(jokeURL);
		/* Comprobando si la respuesta está bien, si no, arroja un error. */
		// se usa para que no regrese undefined
		// para aqui y no siga ejecutando el codigo
		if (!respuesta.ok) throw 'No se pudo realizar la petición';
		const { icon_url, id, value } = await respuesta.json();
		return { icon_url, id, value };
	} catch (error) {
		/* Tirando un error. */
		throw error;
	}
};

const obtenerUsuario = async () => {
	try {
		const respuesta = await fetch(urlUsuario);
		if (!respuesta.ok) throw 'No se pudo realizar la petición';
		const { data: usuario } = await respuesta.json();
		return usuario;
	} catch (error) {
		throw error;
	}
};

export { obtenerChiste, obtenerUsuario };
