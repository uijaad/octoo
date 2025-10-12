// variables
var largeline = document.getElementById("large-line2");
var newtaskbtn = document.getElementById("newTaskBtn");
var addbtn = document.getElementById("addTask");
var delallbtn = document.getElementById("deleteAllCompleted");
let savedCompleted = localStorage.getItem("completed");
let arr2 = savedCompleted ? JSON.parse(savedCompleted) : [];
// work
function renderCompleted() {
  const parent = document.getElementById("taskPanelParent");
  parent.innerHTML = "";

  arr2.forEach((taskText, index) => {
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

    const delBtn = document.createElement("img");
    delBtn.src = "../img/svg/delete.svg";

    delBtn.addEventListener("click", () => {
      arr2.splice(index, 1);
      localStorage.setItem("completed", JSON.stringify(arr2));
      renderCompleted();
    });

    btns.appendChild(d);
    btns.append(delBtn);
    panel.appendChild(btns);
    parent.appendChild(panel);
  });
}
// delete all completed 
delallbtn.addEventListener("click" , () => {
    localStorage.removeItem("completed");
    arr2 = [];
    renderCompleted();
    
});

renderCompleted();
