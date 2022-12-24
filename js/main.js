let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elAll = document.querySelector(".all");
let elComplete = document.querySelector(".complate");
let elUncomplete = document.querySelector(".uncomplate");
let elModal = document.querySelector(".js-modla");
let elCompleteBtn = document.querySelector(".compBtn");
let elAllBtn = document.querySelector(".allBtn");
let elUncompleteBtn = document.querySelector(".uncompBtn");
let elEmpty = document.querySelector(".emptyTodo");
let elDark = document.querySelector(".js-dark");
let elTodoApp = document.querySelector(".todoApp");
let elDelete = document.querySelector(".deleteBtn");
let elDarkTitle = document.querySelector(".darkTitle");
let elDarkTitle1 = document.querySelector(".darkTitle1");

let LocalData = JSON.parse(window.localStorage.getItem("todos"));
let todos = LocalData || [];

function todoFunc(array, node) {
  node.innerHTML = "";

  array.forEach((item) => {
    let newEl = document.createElement("li");
    newEl.setAttribute("class", "list-group-item d-flex align-items-center ");

    let itemInput = document.createElement("input");
    itemInput.type = "checkbox";
    itemInput.setAttribute("class", "m-0 form-check-input");
    itemInput.dataset.todoId = item.id;

    let itemSpan = document.createElement("span");
    itemSpan.textContent = item.title;
    itemSpan.setAttribute("class", "flex-grow-1 ms-3 overflow-hidden w-25");

    let itemEditBtn = document.createElement("button");
    itemEditBtn.textContent = `Edit`;
    itemEditBtn.dataset.todoId = item.id;
    itemEditBtn.setAttribute("class", "btn btn-warning me-2 edit-btn shadows");
    // itemEditBtn.setAttribute('data-bs-toggle', 'modal')
    // itemEditBtn.setAttribute('href', '#exampleModalToggle')
    // itemEditBtn.setAttribute('role', 'button')

    let itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.textContent = `Delete`;
    itemDeleteBtn.dataset.todoId = item.id;
    itemDeleteBtn.setAttribute("class", "btn btn-danger  delete-btn shadows");

    newEl.appendChild(itemInput);
    newEl.appendChild(itemSpan);
    newEl.appendChild(itemEditBtn);
    newEl.appendChild(itemDeleteBtn);

    if (item.isCompleted) {
      itemInput.checked = true;
      itemSpan.style.textDecoration = "line-through";
    }

    elList.appendChild(newEl);
  });

  elAll.textContent = todos.length;

  if (todos.filter((item) => item.isCompleted)) {
    elComplete.textContent = todos.filter((item) => item.isCompleted).length;
  }
  if (todos.filter((item) => item.isCompleted === false)) {
    elUncomplete.textContent = todos.filter(
      (item) => item.isCompleted === false
    ).length;
  }

  window.localStorage.setItem("todos", JSON.stringify(todos));
}

if (todos.length > 0) {
  todoFunc(todos, elList);
}
if (todos.length == 0) {
  elEmpty.textContent = "Todo list bo'sh 😕";
}

elAllBtn.addEventListener("click", () => {
  todoFunc(todos, elList);
});

elCompleteBtn.addEventListener("click", () => {
  let todoFilter = todos.filter((item) => item.isCompleted == true);
  todoFunc(todoFilter, elList);
});

elUncompleteBtn.addEventListener("click", () => {
  let todoFilter = todos.filter((item) => item.isCompleted == false);
  todoFunc(todoFilter, elList);
});

elDelete.addEventListener("click", function () {
  todos = [];
  todoFunc(todos, elList);
});

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (elInput.value.trim() == "") {
    alert("Qiymat kiriting");
    return;
  }

  let obj = {
    id: new Date(),
    title: elInput.value,
    isCompleted: false,
  };

  todos.push(obj);

  todoFunc(todos, elList);
  elInput.value = "";
});

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-btn")) {
    let todoId = evt.target.dataset.todoId;
    let findIndex = todos.findIndex((item) => item.id == todoId);
    todos.splice(findIndex, 1);
    todoFunc(todos, elList);
  }

  if (evt.target.matches(".edit-btn")) {
    let todoId = evt.target.dataset.todoId;
    let findIndex = todos.find((item) => item.id == todoId);
    let changes = prompt("O'zgartiring: ", findIndex.title);
    findIndex.title = changes;
    todoFunc(todos, elList);
  }

  if (evt.target.matches(".form-check-input")) {
    let todoId = evt.target.dataset.todoId;
    let findIndex = todos.find((item) => item.id == todoId);
    findIndex.isCompleted = !findIndex.isCompleted;

    todoFunc(todos, elList);
  }
});

// let darkData = JSON.parse(window.localStorage.getItem("theme"));

let theme = false;

elDark.addEventListener("click", function () {
  theme = !theme;
  let darkBg = theme ? "dark" : "light";
  window.localStorage.setItem("theme", darkBg);
  funcDark();
});

function funcDark() {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add('dark')
    document.body.classList.remove('light')
    elTodoApp.style.color = "white";
    elEmpty.style.color = "white";
    elDark.style.color = "white";
    elDarkTitle.style.color = "white";
    elDarkTitle1.style.color = "white";
  }
  if (window.localStorage.getItem("theme") == "light") {
    document.body.classList.add('light')
    document.body.classList.remove('dark')
    elTodoApp.style.color = "inherit";
    elEmpty.style.color = "inherit";
    elDark.style.color = "inherit";
    elDarkTitle.style.color = "inherit";
    elDarkTitle1.style.color = "inherit";
  }
}
funcDark();
