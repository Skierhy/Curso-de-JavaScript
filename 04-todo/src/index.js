/* Importando las clases  desde el archivo index.js. */
import { Todo, TodoList } from './js/classes';

/* Importando el archivo styles.css. */
import './styles.css';

const tarea = new Todo('aprender JavaScript');
const todoList = new TodoList();

todoList.nuevoTodo(tarea);
