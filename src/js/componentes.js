import { todoList } from "..";
import { Todo } from "../classes";
import { TodoList } from "../classes";
//referencias en el html

const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const btnBorrar = document.querySelector(".clear-completed");
const ulFiltros = document.querySelector(".filters");
const anchorFiltros = document.querySelectorAll(".filtro");
export const crearTodoHtml = (todo) => {
  const htmlTodo = `
  <li class="${todo.completado ? "completed" : ""}" data-id="${todo.id}">
  <div class="view">
    <input class="toggle" type="checkbox" ${
      todo.completado ? todo.checked : ""
    }>
    <label>${todo.tarea}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template">
</li> `;

  const div = document.createElement("div");
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild); //retorna el primer div hijo un elemento de li, no un div sin clase
  return div.firstElementChild;
};
//eventos
txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    // el keycode del enter es 13, cada enter es un nuevo todo
    const nuevoTodo = new Todo(txtInput.value);
    todoList.nuevoTodo(nuevoTodo);
    // console.log(todoList);

    crearTodoHtml(nuevoTodo);

    txtInput.value = "";
  }
});

divTodoList.addEventListener("click", (event) => {
  // console.log(event.target.localName);
  const nombreElemento = event.target.localName; //input , label, button
  // console.log(event.target.parentElement.parentElement);
  const todoElemento = event.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute("data-id");
  // console.log(todoId);

  if (nombreElemento.includes("input")) {
    //click en el check
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle("completed");
  } else if (nombreElemento.includes("button")) {
    //click en la X
    todoList.eliminarTodo(todoId); //removerlo en la lista
    divTodoList.removeChild(todoElemento);
  }
});
btnBorrar.addEventListener("click", () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    // console.log(elemento);
    if (elemento.classList.contains("completed")) {
      divTodoList.removeChild(elemento);
    }
  }
});
ulFiltros.addEventListener("click", (event) => {
  const filtro = event.target.text;

  if (!filtro) {
    return;
  }
  anchorFiltros.forEach((element) => {
    element.classList.remove("selected");
  });
  event.target.classList.add("selected");

  for (const elemento of divTodoList.children) {
    elemento.classList.remove("hidden");

    const completado = elemento.classList.contains("completed");

    switch (filtro) {
      case "Pendientes":
        if (completado) {
          elemento.classList.add("hidden");
        }
        break;
      case "Completados":
        if (!completado) {
          elemento.classList.add("hidden");
        }
    }
  }
});
