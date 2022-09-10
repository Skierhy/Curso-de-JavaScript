/* Importando las clases  desde el archivo index.js. */
import { Todo, TodoList } from './js/classes';
import { crearTodoHtml } from './js/componentes';

/* Importando el archivo styles.css. */
import './styles.css';

export const todoList = new TodoList();

todoList.todos.forEach((elemento) => {
	crearTodoHtml(elemento);
});
