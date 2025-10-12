
// variables 
var tasksection = document.getElementById("newTaskSection");
var largeline = document.getElementById("large-line2");
var newtaskbtn = document.getElementById("newTaskBtn");
var addbtn = document.getElementById("addTask");
var taskinput = document.getElementById("taskInput");

// some style and simple animation operator 
tasksection.style.display = "none";
largeline.style.display = "none";

newtaskbtn.addEventListener("click" , () => {

    tasksection.style.display = "flex";
    tasksection.style.transition = "0.4s";
    largeline.style.display = "block";
      setTimeout(() => {
        tasksection.classList.add("show");
        largeline.classList.add("show");
    }, 10);

});

// real-work and add task to LocalStorage

let savedTasks = localStorage.getItem("tasks");
let arr1 = savedTasks ? JSON.parse(savedTasks) : [];
let savedCompleted = localStorage.getItem("completed");
let arr2 = savedCompleted ? JSON.parse(savedCompleted) : [];

addbtn.addEventListener("click", () => {
  const inputvalue = taskinput.value.trim();
  
  if (inputvalue) {
    const task = {
    text: inputvalue,
    date: new Date().toLocaleString() 
    };
    arr1.push(task);
    localStorage.setItem("tasks", JSON.stringify(arr1));
    taskinput.value = ""; 
    renderTasks();
   
  }
});


function renderTasks() {
  const parent = document.getElementById("taskPanelParent");
  parent.innerHTML = "";
  arr1.forEach((taskText, index) => {
    const panel = document.createElement("div");
    panel.classList.add("taskPanel");
    const p = document.createElement("p");
    const d = document.createElement("p");
    d.classList.add("datetime")
    d.textContent = taskText.date;
    p.textContent = taskText.text;
    panel.appendChild(p);
    

    const btns = document.createElement("div");
    btns.classList.add("taskButtons");

    const doneBtn = document.createElement("img");
    doneBtn.src = "../img/svg/done.svg";


    const delBtn = document.createElement("img");
    delBtn.src = "../img/svg/delete.svg";


    delBtn.addEventListener("click", () => {
      arr1.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(arr1));
      renderTasks();
    });
    doneBtn.addEventListener("click", () => {
        const clickedTask = arr1.splice(index , 1)[0];
        arr2.push(clickedTask);
        localStorage.setItem("completed" , JSON.stringify(arr2));
        localStorage.setItem("tasks", JSON.stringify(arr1));
        renderTasks();
        
    });
    btns.appendChild(d);
    btns.append(doneBtn, delBtn);
    
    panel.appendChild(btns);
    parent.appendChild(panel);
  });
}

    window.addEventListener("DOMContentLoaded", renderTasks);
    renderTasks();

