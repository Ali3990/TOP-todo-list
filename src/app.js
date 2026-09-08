import { createForm, fieldDefinitions } from "./form.js";
import { renderTasks, renderProjects } from "./dom.js";
import { addProject, getCurrentProject, setCurrentProject, getProjects } from "./projects.js";


// construction function.
function Task(title, description, dueDate, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
};


// pushes task to the list to render in DOM later.
function addTaskToList(title, description, dueDate, priority) {
    const newTask = new Task(title, description, dueDate, priority);
    getCurrentProject().todos.push(newTask);
    console.log(getCurrentProject().todos);
};

const dialog = document.querySelector("#task-dialog");
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
    
    // reset form entries and close.
    taskForm.reset();
    dialog.close();

    // after the submit button is pressed, it will render the tasks onto the page.
    renderTasks(getCurrentProject().todos);
});

// createForm(fieldDefinitions); ran and .showModal() will reveal the form that is invisible while 
// everything else is inert in the backdrop.
const addTaskBtn = document.querySelector("#addTaskBtn");
addTaskBtn.addEventListener("click", () => {
    document.querySelector("#task-dialog").showModal();
});


// selects the current project
function handleProjectSelect(project) {
    setCurrentProject(project);
    renderProjects(getProjects(), handleProjectSelect);
    renderTasks(getCurrentProject().todos);
};


// opens up a simple input window to enter project name
const addProjBtn = document.querySelector("#addProjBtn");
addProjBtn.addEventListener("click", () => {
    let projectInput = prompt("Project name: ");
    const trimmedProjName = projectInput.trim();
    
    if (trimmedProjName === "") {
        return null
    };

    addProject(trimmedProjName);
    renderTasks(getCurrentProject().todos);
    renderProjects(getProjects(), handleProjectSelect);
});

// initial render of the project list
renderTasks(getCurrentProject().todos);
renderProjects(getProjects(), handleProjectSelect);






