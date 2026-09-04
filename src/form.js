export const fieldDefinitions = [
    {id: "title-field", label: "Title: ", type: "text", },
    {id: "description-field", label: "Description: ", type: "text"},
    {id: "due-date-field", label: "Due date: ", type: "date"},
    {id: "priority-field", label: "Priority: ", type: "select", options: ["low", "medium", "high"]},
];


export function createForm(fields) {
    const form = document.createElement("form");
    form.id = "task-form";
    document.querySelector("#task-dialog").append(form);
    
    fields.forEach(field => {
        const label = document.createElement("label")
        label.textContent = field.label;
        label.htmlFor = field.id;
        form.append(label);

        // creates the options under select element
        if (field.type === "select") {
            const selection = document.createElement("select");
            selection.id = field.id;
            field.options.forEach((option) => {
                const optionElement = document.createElement("option");
                // '(option)' is the strings in the options list.
                optionElement.value = option;
                optionElement.textContent = option;
                selection.append(optionElement);
            });
            form.append(selection);
        } else {
            const input = document.createElement("input");
            input.type = field.type;
            input.id = field.id;
            form.append(input);
        };
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit";
    form.append(submitBtn);
    
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.textContent = "Cancel";
    closeBtn.addEventListener("click", () =>{
        document.querySelector("#task-dialog").close();
    });
    form.append(closeBtn)

    return form;
};

