import { createForm, fieldDefinitions } from "./form.js";


const toDoList = [];

// construction function.
function Task(title, description, dueDate, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
};

// pushes task to the render list
function addTaskToList(title, description, dueDate, priority, notes) {
    const newTask = new Task(title, description, dueDate, priority, notes);
    toDoList.push(newTask)
};


// build the form once, and .showModal() will show the form that is invisible.
createForm(fieldDefinitions);

const addTaskBtn = document.querySelector("#addTaskBtn");
addTaskBtn.addEventListener("click", () => {
    document.querySelector("#task-dialog").showModal();
});





