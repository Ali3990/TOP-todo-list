

const toDoList = [];

// construction function.
function task(title, description, dueDate, priority, notes) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
};

function addTaskToList(title, description, dueDate, priority, notes) {
    const newTask = new task(title, description, dueDate, priority, notes);
    toDoList.push(newTask)
};

// handle event when wanting to add task

function createForm() {
    const form = document.createElement("form");
    form.id = "task-form";
    document.querySelector("#task-dialogue").append(form);
    
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title: ";
    titleLabel.htmlFor = ""

};
