const content = document.getElementById('itemTitle');

function addItem() {
    if (content.value === "") {
        alert("Please add some text!");
        return;
    }
    let existingTodos = JSON.parse(localStorage.getItem("todos"));
    const contentObj = {
        content: content.value,
        _id: (Math.floor(100000 + Math.random() * 900000)).toString(),
    }
    if (existingTodos !== null) {
        existingTodos.push(contentObj);
    } else {
        existingTodos = [];
        existingTodos.push(contentObj);
    }

    localStorage.setItem("todos", JSON.stringify(existingTodos));
    updateTodoList(localStorage.getItem("todos"));
    content.value = "";
}

function updateTodoList(todos) {
    const myList = document.getElementById("myList");

    const parsedTodos = JSON.parse(todos);

    myList.innerHTML = "";

    for (let i = 0; i < parsedTodos.length; i++) {
        myList.innerHTML += `
        <li>${parsedTodos[i].content} <i class="fas fa-trash-alt" onclick="deleteTodo(${parsedTodos[i]._id})"></i></li>
       `
    }
}

function deleteTodo(id) {
    const todoId = id.toString();
    const parsedTodos = JSON.parse(localStorage.getItem("todos"));
    let changedTodos = [];

    for (let i = 0; i < parsedTodos.length; i++) {
        if (parsedTodos[i]._id !== todoId) {
            changedTodos.push(parsedTodos[i]);
        }
    }

    localStorage.setItem("todos", JSON.stringify(changedTodos));
    updateTodoList(localStorage.getItem("todos"));
}

window.addEventListener("load", function() {
    if (localStorage.getItem("todos") !== null) {
        updateTodoList(localStorage.getItem("todos"));
    }
})