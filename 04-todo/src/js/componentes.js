import { Todo } from './classes';
import { todoList } from '../index';

//referencias html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const clearCompleted = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
	const htmlTodo = `
	<li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

	const div = document.createElement('div');
	div.innerHTML = htmlTodo;
	divTodoList.append(div.firstElementChild);
	return div.firstElementChild;
};

//eventos
// event es la tecla que se presiona
txtInput.addEventListener('keyup', (event) => {
	if (event.keyCode === 13 && txtInput.value.length > 0) {
		const nuevoTodo = new Todo(event.target.value);
		todoList.nuevoTodo(nuevoTodo);
		crearTodoHtml(nuevoTodo);
		event.target.value = '';
	}
});

divTodoList.addEventListener('click', (event) => {
	const nombreElemento = event.target.localName; // input, label, button
	const todoElemento = event.target.parentElement.parentElement;
	const todoId = todoElemento.getAttribute('data-id');
	const todoClass = todoElemento.getAttribute('class');

	if (nombreElemento.includes('input')) {
		todoList.marcarCompletado(todoId);
		todoElemento.classList.toggle('completed');
	} else if (nombreElemento.includes('button')) {
		todoList.eliminarTodo(todoId);
		divTodoList.removeChild(todoElemento);
	}
});

clearCompleted.addEventListener('click', () => {
	todoList.eliminarCompletado();
	for (let i = divTodoList.children.length - 1; i > -1; i--) {
		const elemento = divTodoList.children[i];
		if (elemento.classList.contains('completed')) {
			divTodoList.removeChild(elemento);
		}
	}
});

ulFiltros.addEventListener('click', (event) => {
	const filtro = event.target.text;
	if (!filtro) {
		return;
	}
	anchorFiltros.forEach((removeSelected) => {
		removeSelected.classList.remove('selected');
	});
	event.target.classList.add('selected');
	for (const elemento of divTodoList.children) {
		elemento.classList.remove('hidden');
		const completado = elemento.classList.contains('completed');
		switch (filtro) {
			case 'Pendientes':
				if (completado) {
					elemento.classList.add('hidden');
				}
				break;
			case 'Completados':
				if (!completado) {
					elemento.classList.add('hidden');
				}
				break;
		}
	}
});
