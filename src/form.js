const fieldDefinitions = [
    {id: "title-field", label: "Title: ", type: "text", },
    {id: "description-field", label: "Description: ", type: "text"},
    {id: "due-date-field", label: "Due date: ", type: "date"},
    {id: "priority-field", label: "Priority: ", type: "select", options: ["low", "medium", "high"]},
];



function createForm(fields) {
    const form = document.createElement("form");
    form.id = "task-form";
    document.querySelector("#task-dialogue").append(form);
    
    if (fields)


    // const titleLabel = document.createElement("label");
    // titleLabel.textContent = "Title: ";
    // titleLabel.htmlFor = "title-field";
    // const titleInput = document.createElement("input");
    // titleInput.type = "text";
    // titleInput.id = "title-field";
    // titleInput.name = "Title";
    // form.append(titleLabel);
    // form.append(titleInput);

};