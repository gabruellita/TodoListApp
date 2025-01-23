let todo = JSON.parse(localStorage.getItem('todo')) || [];
const  todo_input = document.getElementById("text-bar");
const todo_list = document.getElementById("todo_list");
const deleteAllButton = document.getElementById("deleteButton");
const counter = document.getElementById("count");
const clearCompleted = document.getElementById("clearCompleted");
const completeAll = document.getElementById("btn-complete-all");
const filter = document.querySelector(".filter-todos");


document.addEventListener("DOMContentLoaded", function(){
    todo_input.addEventListener("keydown", function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        addTask();
    } });
    deleteAllButton.addEventListener("click", deleteAllTasks); 
    clearCompleted.addEventListener("click", clearTaskCompleted);
    completeAll.addEventListener("click", completeAllfunc);
    filter.addEventListener("change", displayTasks);
    displayTasks();
});

function completeAllfunc(){
    todo.forEach((item, index) => {
        item.disabled = true;
    })
    displayTasks();
}

function clearTaskCompleted(){
    for(let i = todo.length - 1; i >= 0; i--){
        if(todo[i].disabled === true){
            deleteTask(i);
        }
    }
    displayTasks();
}

function addTask(){
    const newTask = todo_input.value.trim();
    if(newTask !== ""){
        todo.push({
            text: newTask,
            disbaled: false,
        });
        saveToLocalStorage();
        todo_input.value = "";  
        displayTasks();
    }
}

function saveToLocalStorage(){
    localStorage.setItem('todo', JSON.stringify(todo));
}

function displayAllTasks(){
    todo_list.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML =` <div class="todo-main">
                <div class="todo-container">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
                        item.disabled ? "checked" : ""
                      }>
                      <p id="todo-${index}" class="${
                        item.disabled ? "disabled" : ""
                      }" onclick="editTask(${index})">${item.text}</p>
                </div>
                <input id="del-${index}" class="del-todo" type="button" value="X" />
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => 
        toggleTask(index)
        );
        p.querySelector(".del-todo").addEventListener("click", () => deleteTask(index));
        todo_list.appendChild(p);
    })
    counter.textContent = document.getElementsByClassName("todo-main").length - document.getElementsByClassName("disabled").length;
}

function displayCompleted(){
    let count_disabled = 0;
    let count_active = 0
    todo_list.innerHTML = "";
    todo.forEach((item, index) => {
        if(item.disabled === true){
            const p = document.createElement("p");
            p.innerHTML =` <div class="todo-main">
                <div class="todo-container">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
                        item.disabled ? "checked" : ""
                      }>
                      <p id="todo-${index}" class="${
                        item.disabled ? "disabled" : ""
                      }" onclick="editTask(${index})">${item.text}</p>
                </div>
                <input id="del-${index}" class="del-todo" type="button" value="X" />
            </div>
            `;
            p.querySelector(".todo-checkbox").addEventListener("change", () => 
            toggleTask(index)
            );
            p.querySelector(".del-todo").addEventListener("click", () => deleteTask(index));
            todo_list.appendChild(p);
            count_active++;
        } else{
            count_disabled++;
        }  
    })
    counter.textContent = count_disabled;
}

function displayUncompleted(){
    todo_list.innerHTML = "";
    todo.forEach((item, index) => {
        if(item.disabled !== true){
            const p = document.createElement("p");
            p.innerHTML =` <div class="todo-main">
                <div class="todo-container">
                    <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
                        item.disabled ? "checked" : ""
                      }>
                      <p id="todo-${index}" class="${
                        item.disabled ? "disabled" : ""
                      }" onclick="editTask(${index})">${item.text}</p>
                </div>
                <input id="del-${index}" class="del-todo" type="button" value="X" />
            </div>
            `;
            p.querySelector(".todo-checkbox").addEventListener("change", () => 
            toggleTask(index)
            );
            p.querySelector(".del-todo").addEventListener("click", () => deleteTask(index));
            todo_list.appendChild(p);
            }   
    })
    counter.textContent = document.getElementsByClassName("todo-main").length - document.getElementsByClassName("disabled").length;
}

function displayTasks(){
    const filterValue = filter.value;
    switch(filterValue) {
        case 'all':
            displayAllTasks();
            break;
        case 'completed':
            displayCompleted();
            break;
        case 'uncompleted':
            displayUncompleted();
            break;
        default:
            console.error(`Unknown filter value: ${filterValue}`);
    }
    
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
}

function editTask(index) {
    const todoElement = document.getElementById(`todo-${index}`);
    const existingTask = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingTask;
    inputElement.style.fontSize = "2.5rem";
    todoElement.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function(event){
        const newText = inputElement.value.trim();
        if(newText){
            todo[index].text = newText;
            saveToLocalStorage();
            displayTasks();
        }
    });

    inputElement.addEventListener("keypress", function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            const newText = inputElement.value.trim();
            if(newText){
                todo[index].text = newText;
                saveToLocalStorage();
                displayTasks();
            }
        }
    }); 
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

