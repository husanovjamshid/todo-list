let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");
let elAll = document.querySelector(".all");
let elComplate = document.querySelector(".complate");
let elUncomplate = document.querySelector(".uncomplate");
let elModal = document.querySelector(".js-modla");
let elCompBtn = document.querySelector(".compBtn");
let elAllBtn = document.querySelector(".allBtn");
let elUncompBtn = document.querySelector(".uncompBtn");

let todos = [];
function todoFunc(array, node) {
  node.innerHTML = "";

  array.forEach((item) => {
    let newEl = document.createElement("li");
    newEl.setAttribute("class", "list-group-item d-flex align-items-center");

    let itemInput = document.createElement("input");
    itemInput.type = "checkbox";
    itemInput.setAttribute("class", "m-0 form-check-input");
    itemInput.dataset.todoId = item.id;

    let itemSpan = document.createElement("span");
    itemSpan.textContent = item.title;
    itemSpan.setAttribute("class", "flex-grow-1 ms-3");

    let itemEditBtn = document.createElement("button");
    itemEditBtn.textContent = "Edit";
    itemEditBtn.dataset.todoId = item.id;
    itemEditBtn.setAttribute("class", "btn btn-warning me-2 edit-btn");
    // itemEditBtn.setAttribute('data-bs-toggle', 'modal')
    // itemEditBtn.setAttribute('href', '#exampleModalToggle')
    // itemEditBtn.setAttribute('role', 'button')

    let itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.textContent = "Delete";
    itemDeleteBtn.dataset.todoId = item.id;
    itemDeleteBtn.setAttribute("class", "btn btn-danger  delete-btn");

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
}

elAllBtn.addEventListener("click", () => {
  todoFunc(todos, elList);
});

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (elInput.value.trim() == "") {
    alert("Qiymat kiriting");
    return;
  }

  let obj = {
    id: todos.length + 1,
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
    console.log(findIndex);
    todoFunc(todos, elList);
  }

  if (evt.target.matches(".form-check-input")) {
    let todoId = evt.target.dataset.todoId;
    let findIndex = todos.find((item) => item.id == todoId);
    findIndex.isCompleted = !findIndex.isCompleted;

    let todoFilter = todos.filter((item) => item.isCompleted == true);

    elComplate.textContent = todoFilter.length;

    elUncomplate.textContent = elAll.textContent - elComplate.textContent;
    todoFunc(todos, elList);
  }

  let complateArray = [];
  elCompBtn.addEventListener("click", () => {
    let todoFilter = todos.filter((item) => item.isCompleted == true);
    complateArray.push(todoFilter);
    console.log(complateArray[0]);
    todoFunc(complateArray[0], elList);
  });

  let unComplateArray = [];
  elUncompBtn.addEventListener("click", () => {
    let todoFilter = todos.filter((item) => item.isCompleted == false);
    unComplateArray.push(todoFilter);
    console.log(unComplateArray[0]);
    todoFunc(unComplateArray[0], elList);
  });
});
