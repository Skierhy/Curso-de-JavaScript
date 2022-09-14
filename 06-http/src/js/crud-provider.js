const urlCRUD = 'https://reqres.in/api/users';

const getUsuario = async (id) => {
	try {
		const usuario = await fetch(`${urlCRUD}/${id}`);
		if (!usuario.ok) throw 'No se pudo realizar la petición';
		const { data } = await usuario.json();
		return data;
	} catch (err) {
		throw err;
	}
};

const createUsuario = async (usuario) => {
	try {
		const createUsuario = await fetch(urlCRUD, {
			method: 'POST',
			body: JSON.stringify(usuario),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!createUsuario.ok) throw 'No se pudo realizar la petición';
		const respuesta = await createUsuario.json();
		return respuesta;
	} catch (err) {
		throw err;
	}
};

const updateUsuario = async (usuario, id) => {
	try {
		const updateUsuario = await fetch(`${urlCRUD}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(usuario),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!updateUsuario.ok) throw 'No se pudo realizar la petició2';
		const respuesta = await updateUsuario.json();
		return respuesta;
	} catch (error) {
		throw error;
	}
};

const deleteUsuario = async (id) => {
	try {
		const deleteUsers = await fetch(`${urlCRUD}/${id}`, {
			method: 'DELETE',
		});

		return deleteUsers.ok ? 'Borrado' : 'No se puedo eliminar';
	} catch (error) {
		throw error;
	}
};

export { getUsuario, createUsuario, updateUsuario, deleteUsuario };
