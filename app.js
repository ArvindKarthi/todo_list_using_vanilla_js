// functions
const checkToDelete = (list) => {
  return Array.from(list).includes("delete");
};

const checkToAdd = (list) => {
  return Array.from(list).includes("add-task");
};

// this is the todo users todo list.
const todoList = document.querySelector(".todo-list");
// this is the button to add new list.
const addButton = document.querySelector(".add-button");
// this is the form that is used to get new task name
const form = document.querySelector(".task-form");
// ul where the deleted tasks to be added when show deleted is clicked.
const hiddenList = document.querySelector(".deleted-list");
//this is the button to show deleted list.
const showButton = document.querySelector(".show-button");
//this is the button to clear the all deleted task.
const clearAll = document.querySelector(".clear-list");
//this is to get the search text .
const search = document.querySelector(`input[name="search"]`);

/* To toggle the form display */
addButton.addEventListener("click", () => {
  form.classList.toggle("hidden");
  form["new-task"].value = "";
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
  icon.setAttribute("class", "far fa-trash-alt todo-icon delete");

  taskBox.append(task);
  taskBox.append(icon);
  todoList.append(taskBox);

  form.classList.toggle("hidden");
});

/* To delete a task */
todoList.addEventListener("click", (event) => {
  const element = event.target;
  if (checkToDelete(element.classList)) {
    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", element.getAttribute("class"));
    element.setAttribute("class", "fas fa-redo todo-icon add-task");
    element.parentNode.append(deleteIcon);
    hiddenList.append(element.parentNode);

    if (todoList.innerHTML === "" && hiddenList.innerHTML !== "") {
      hiddenList.parentNode.classList.toggle("hidden");
    }
  }
});

/*To show the deleted tasks*/
showButton.addEventListener("click", () => {
  if (hiddenList.innerHTML !== "") {
    hiddenList.parentNode.classList.toggle("hidden");
  }
});

/*To permanently delete the task */
hiddenList.addEventListener("click", (event) => {
  const element = event.target;
  if (checkToDelete(element.classList)) {
    const deleteOrNo = confirm("Do you want to delete the task from history?");
    if (deleteOrNo) {
      const parentElement = element.parentNode;
      parentElement.remove();
    }
  } else if (checkToAdd(element.classList)) {
    const parentElement = element.parentNode;
    parentElement.querySelector(".add-task").remove();
    todoList.append(parentElement);
  }
  /* to delete the clear list button if the hidden list is empty */
  if (hiddenList.innerHTML === "") {
    hiddenList.parentNode.classList.toggle("hidden");
  }
});

/*To clear all the deleted tasks from history*/
clearAll.addEventListener("click", () => {
  const deleteOrNo = confirm(
    "Do you want to clear history of all deleted tasks?"
  );
  if (deleteOrNo) {
    hiddenList.innerHTML = "";
    hiddenList.parentNode.classList.toggle("hidden");
  }
});

/*To make an search field to search and filter the tasks*/

const filterList = (value) => {
  const childElements = todoList.children;
  let found = false;
  for (let itr = 0; itr < childElements.length; itr++) {
    const curr = childElements[itr].querySelector("p");
    if (!curr.textContent.toLowerCase().includes(value) && value !== "") {
      curr.parentElement.style.display = "none";
    } else {
      found = true;
      curr.parentElement.style.display = "flex";
    }
  }
  return value === "" ? true : found;
};

search.addEventListener("keyup", (event) => {
  if (filterList(event.target.value.trim().toLowerCase())) {
    document.querySelector(".not-found").style.display = "none";
  } else {
    document.querySelector(".not-found").style.display = "block";
  }
});

/* to prevent the submit action of the form */
search.parentElement.addEventListener("submit", (event) => {
  event.preventDefault();
});
