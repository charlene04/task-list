
const addTask = document.getElementById("addTask");
const clearTask = document.getElementById("clearTask");
const input = document.getElementById("input");
const taskList = document.getElementById("taskList");

addTask.addEventListener("submit", add);
clearTask.addEventListener("click", clear);
document.addEventListener("DOMContentLoaded", getTasks);
document.body.addEventListener("click", deleteTask);

function add() {
    const task = input.value;
    if(task === ''){
        alert("task cannot be empty!")
    }else{
        const li = document.createElement("li");
        li.className = "task-item";
        li.appendChild(document.createTextNode(task));
        const a = document.createElement('a');
        a.href = "#delete";
        a.id = "cancel";
        a.appendChild(document.createTextNode("x"))
        li.appendChild(a);
        taskList.appendChild(li);
        storeInLocalStorage(task);
        input.value = "";
    }
    
}

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        li = document.createElement("li");
        li.className = "task-item";
        li.appendChild(document.createTextNode(task));
        const a = document.createElement('a');
        a.href = "#delete";
        a.id = "cancel";
        a.appendChild(document.createTextNode("x"))
        li.appendChild(a);
        taskList.appendChild(li);
    })
}


function clear() {
    if(confirm("Are you sure?")){
    while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
            localStorage.clear();
        }
        
    }
}

function taskFilter() {
    const filter = document.getElementById("filter").value.toLowerCase();
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(function(task) {
        let item = task.firstChild.textContent.toLowerCase();
        if(item.indexOf(filter) != -1){
            task.style.display = "flex";
        }else{
            task.style.display = "none";
        }

    })

}

function storeInLocalStorage(Task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(Task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
    if(e.target.id == "cancel"){
        if(confirm("Are you sure?")){
            e.target.parentElement.remove();
            deleteTaskFromLocalStorage(e.target.parentElement);
        }
       
    }

}

function deleteTaskFromLocalStorage(taskItem){
    let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        tasks.forEach(function(task, index) {
            if(taskItem.textContent === task+"x"){
                tasks.splice(index , 1);
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasks));
       
}