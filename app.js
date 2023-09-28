// Get input from user 
// add input to the array then make the input html empty 
// add array to the local storage 
// add the elements to the page of html
// when it init add data-id to  elemnts of the task html 
// add delete btn on click event 
// add del class 
// remove the deleted data from localStorage
// add completed class on click event on localStorage


// add class done to the page 
// undo the done class
// make the filter button completed in progress


let input = document.getElementById("input-field");
let addBtn = document.querySelector(".submit-button");
let bottom = document.querySelector(".bottom");
let radioInputs = document.querySelectorAll('input[type="radio"]');



// initalize the array that will store in the localStorage
let arrayOfTasks = [];

checkTasks();
checkTheRadio();

function checkTheRadio(){
    radioInputs.forEach((radioInput) => {
        if (radioInput.checked && radioInput.id=="value-1"){
            let active = arrayOfTasks.filter((task) => task.completed == false)
            addTaskToPage(active)
        }
        else if(radioInput.checked && radioInput.id=="value-2"){
            let active = arrayOfTasks.filter((task) => task.completed == true)
            addTaskToPage(active)
        }
        else if (radioInput.checked && radioInput.id=="value-3"){
            addTaskToPage(arrayOfTasks)
        }

    radioInput.addEventListener("click", function() {
          let clickedId = this.id;
          if (this.id == "value-1"){
              let active = arrayOfTasks.filter((task) => task.completed == false)
              addTaskToPage(active)
          }
          else if (this.id == "value-2"){
              let active = arrayOfTasks.filter((task) => task.completed == true)
              addTaskToPage(active)
          }
          else if (this.id == "value-3"){
              addTaskToPage(arrayOfTasks)
          }
        });
      });
}

// addTaskToPage(arrayOfTasks);

addBtn.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = ""; // Empty Input Field
  }
};

// Check if Theres Tasks In Local Storage

function addTaskToArray(taskText){
    
    // init the task object
    const task = {
        id: Date.now(),
        name: taskText,
        completed: false,
        };

    // pushe data we get the data from user 
    arrayOfTasks.push(task)
    checkTheRadio();
    addDataToLocalStorage(task);
}

// but in this function there is a bug that when reload the new data override the data already in localStorage 
function addDataToLocalStorage(data){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}


// fixing the above bug
function checkTasks(){
    let data = window.localStorage.getItem("tasks")
    if (data) {
        arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
      };
}

function deleteDataFromLocalStorage(){
    window.localstorage.removeItem('tasks');
}

function addTaskToPage(arrayOfTasks){
    bottom.innerHTML = "";
    arrayOfTasks.forEach((ts) =>{
        let newTask = document.createElement("div")
        // newTask.innerHTML = ts.name;
        newTask.className = "card"
        
        // Create a div element with the class "checkbox-wrapper"
        // Create the label element
        let label = document.createElement("label");
        label.className = "container";

        // Create the input element
        let input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        // input.setAttribute("checked", "checked");

        // Create the div element for the checkmark
        let checkmark = document.createElement("div");
        checkmark.className = "checkmark";

        // Append the input and checkmark elements to the label
        label.appendChild(input);
        label.appendChild(checkmark);


        newTask.appendChild(label)

        if (ts.completed) {
            input.setAttribute("checked", "checked");
        }
        newTask.setAttribute("data-id", ts.id);
        newTask.appendChild(document.createTextNode(ts.name));
        // Create Delete Button

        let delBtn = document.createElement("button");
        delBtn.className = "danger-button";
        delBtn.appendChild(document.createTextNode("Delete"));
        // Append Button To Main Div
        newTask.appendChild(delBtn);
        // Add Task Div To Tasks Container
        bottom.appendChild(newTask);
    })
}


bottom.addEventListener("click", () =>{
    let deleted = document.querySelectorAll(".danger-button")
    deleted.forEach((button, index) => {
        button.addEventListener("click", () => {
            deleteTaskWithID(button.parentElement.getAttribute("data-id"));
            button.parentElement.remove();
        });
    });
    let checkbox = document.querySelectorAll(".container")
    checkbox.forEach((box,index)=>{
        box.addEventListener("click",()=>{
            let isChecked = checkbox.checked;
            toggleCompletedTask(box.parentElement.dataset.id);
        })
    })
    
})


function toggleCompletedTask(taskId){
    
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if(arrayOfTasks[i].id==taskId){
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true :arrayOfTasks[i].completed = false;

        }
    }
    addDataToLocalStorage(arrayOfTasks);
}

function deleteTaskWithID(id){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != id);
    addDataToLocalStorage(arrayOfTasks);
}

// Get all the radio input elements

// Add click event listeners to each radio input


