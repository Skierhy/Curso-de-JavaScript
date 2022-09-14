const jokeURL = 'https://api.chucknorris.io/jokes/random';
const urlUsuario = 'https://reqres.in/api/users?page=2';

// cludinary.com
const cloudPreset = 'gkkbrld6';
const cloudURL = 'https://api.cloudinary.com/v1_1/skierhy/upload';

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

// archivosubir :: File
const subirImagen = async (archivoSubir) => {
	// FormData :: Objeto que permite enviar archivos
	// crea un formulario con los datos que le pasemos
	const formData = new FormData();
	/* Agregar un par clave-valor al objeto formData. */
	// upload_preset :: clave
	formData.append('upload_preset', cloudPreset);
	// file es el nombre que le damos al archivo
	formData.append('file', archivoSubir);
	// puede fallar la subida de la imagen
	try {
		const respuesta = await fetch(cloudURL, {
			method: 'POST',
			body: formData,
		});
		if (respuesta.ok) {
			const cloudResp = await respuesta.json();
			// console.log(cloudResp);
			return cloudResp.secure_url;
		} else {
			throw await respuesta.json();
		}
	} catch (error) {
		throw error;
	}
};

export { obtenerChiste, obtenerUsuario, subirImagen };
