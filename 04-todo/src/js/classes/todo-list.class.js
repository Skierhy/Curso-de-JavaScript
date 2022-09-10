import { Todo } from './todo.class';

export class TodoList {
	constructor() {
		// this.todos = [];
		this.cargarLocalStorage();
	}

	nuevoTodo(todo) {
		this.todos.push(todo);
		this.guardarLocalStorage();
	}

	eliminarTodo(id) {
		/* Filtrar la matriz de todos y devolver los todos que no tienen el mismo id que el pasado. */
		this.todos = this.todos.filter((elemento) => {
			elemento.id !== id;
		});
		this.guardarLocalStorage();
	}

	marcarCompletado(id) {
		for (const todo of this.todos) {
			if (todo.id == id) {
				todo.completado = !todo.completado;
				this.guardarLocalStorage();
				break;
			}
		}
	}

	eliminarCompletado() {
		this.todos = this.todos.filter((elemento) => {
			elemento.completado !== true;
		});
		this.guardarLocalStorage();
	}

	guardarLocalStorage() {
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	cargarLocalStorage() {
		this.todos = localStorage.getItem('todos')
			? JSON.parse(localStorage.getItem('todos'))
			: [];
		this.todos = this.todos.map((elementoTodo) => {
			return Todo.fromJSON(elementoTodo);
		});
		// resumido:
		// this.todos = this.todos.map(Todo.fromJSON)
	}
}
