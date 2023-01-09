let inputText = document.querySelector(".input");
let submit = document.querySelector(".btnAdd");
let removeAll = document.querySelector(".removeAll");

let tasks = document.querySelector(".tasks");


let ArrayTasks = [] ;

removeAll.onclick = function () {
    tasks.innerHTML = "" ;
    window.localStorage.clear();
}

if (localStorage.getItem("tasks")) {
    ArrayTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorge();

submit.onclick  = function () {
    if (inputText.value !== "") {
        addTaskeToArray(inputText.value);
        inputText.value = "" ;
    }
};


tasks.addEventListener("click" , (e) => {

    if (e.target.classList.contains("del")) {
        removeTakeInLocalStorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("Done");
      }

});



function addTaskeToArray(textVlaue) {
    const task = {
        id: Date.now(),
        title : textVlaue ,
        completed : false ,
    };

    ArrayTasks.push(task);
    AddElementToPageFrom(ArrayTasks);
    addDataToLocalStorgeFrom(ArrayTasks)
};



function AddElementToPageFrom(ArrayTasks) {
    
    tasks.innerHTML = "" ;

    ArrayTasks.forEach(task => {
        let div = document.createElement("div");
        div.className = "task" ;
        div.setAttribute("data-id" , task.id);
        div.appendChild(document.createTextNode(task.title));

        if (task.completed) {
            div.className = "task Done";
        }
        
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);

       tasks.appendChild(div);
    });

}



function addDataToLocalStorgeFrom(ArrayTasks) {
    window.localStorage.setItem("tasks" , JSON.stringify(ArrayTasks));
}



function getDataFromLocalStorge() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        AddElementToPageFrom(tasks);
    }

}

function removeTakeInLocalStorage(taskId){
    ArrayTasks = ArrayTasks.filter((task) => task.id != taskId);
    addDataToLocalStorgeFrom(ArrayTasks);
}


function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < ArrayTasks.length; i++) {
      if (ArrayTasks[i].id == taskId) {
        ArrayTasks[i].completed == false ? (ArrayTasks[i].completed = true) : (ArrayTasks[i].completed = false);
      }
    }

    addDataToLocalStorgeFrom(ArrayTasks);
}