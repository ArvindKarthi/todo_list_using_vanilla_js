const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".add-button");
const form = document.querySelector(".task-form");

/* To toggle the form display */
addButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

/* To add a new task */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskBox = document.createElement("li");
  taskBox.setAttribute("class", "todo-task");

  const task = document.createElement("p");
  task.textContent = form["new-task"].value;
  task.setAttribute("class", "todo-para");

  const icon = document.createElement("i");
  icon.setAttribute("class", "far fa-trash-alt todo-icon");

  taskBox.append(task);
  taskBox.append(icon);
  todoList.append(taskBox);

  form["new-task"].value = "";
  form.classList.toggle("hidden");
});

/* To delete a task */
todoList.addEventListener("click", (event) => {
  const element = event.target;
  if (element.tagName === "I") {
    element.parentNode.remove();
  }
});
