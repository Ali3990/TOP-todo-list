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



const taskForm = createForm(fieldDefinitions);

// the <form> element has a special "submit" event type built-in. The browser fires off
// the event when <button type="submit"> is clicked INSIDE the form - in this case. The event
// is fired on the form, not by the submitBtn click event.
// (remember: the createForm function returns the form object called "const form").
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const titleEntry = document.querySelector("#title-field").value;
    const descriptionEntry = document.querySelector("#description-field").value;
    const dueDateEntry = document.querySelector("#due-date-field").value;
    const priorityEntry = document.querySelector("#priority-field").value;

    addTaskToList(titleEntry, descriptionEntry, dueDateEntry, priorityEntry);
});

// createForm(fieldDefinitions); ran and .showModal() will reveal the form that is invisible while 
// everything else is inert in the backdrop.
const addTaskBtn = document.querySelector("#addTaskBtn");
addTaskBtn.addEventListener("click", () => {
    document.querySelector("#task-dialog").showModal();
});





