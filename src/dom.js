
// renders all the tasks onto a grid like display.
export function renderTasks(tasks) {
    const container = document.querySelector("#task-grid");
    container.innerHTML = '';

    // loop through the project list containing submitted tasks
    tasks.forEach((task) => {
        const taskCard = document.createElement("div");
        taskCard.classList.add("tasks");
        taskCard.innerHTML = `   
            <h3>${task.title}</h3>
            <p>Description: ${task.description}</p>
            <p>Due date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            `;
        container.append(taskCard);
    });
};