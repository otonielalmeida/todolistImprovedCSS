const taskbtn = document.getElementById("taskBtn");
const inputTask = document.getElementById("inputTask");
const result = document.querySelector(".result");
const tasks = document.querySelector(".tasks")


//Create functions

function createLi() {
    const li = document.createElement('li');
    return li;
}

function createTask(textInput) {
    const li = createLi();

    li.innerText = textInput;
    tasks.appendChild(li);
    createBtnDelete(li);
    inputTask.value = '';
    inputTask.focus();
    saveTasks();
}

function createBtnDelete(li) {
    li.innerText += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = "Delete";
    btnDelete.setAttribute('class', 'Delete');
    btnDelete.setAttribute('title', 'Click to delete this task');
    li.appendChild(btnDelete);
}


//Event Listeners

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
})

taskbtn.addEventListener('click', function () {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

document.addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('Delete')) {
        el.parentElement.remove();
        saveTasks();
    }
})


//JSON related functions

function saveTasks(){
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('Delete', '').trim();
        taskList.push(taskText);
        console.log(taskList);
    }
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks(){
    const tasks = localStorage.getItem('tasks');
    const taskList = JSON.parse(tasks);

    for (let task of taskList){
        createTask(task);
    }
}

addSavedTasks();