export function Project(name) {
    this.name = name;
    this.todos = [];
};

//store all the project categories
const projects = [];
const defaultProject = new Project("Default");
projects.push(defaultProject);

let currentProject = defaultProject;

export function addProject(name) {
    const trimmedName = name.trim();
    if (trimmedName === "") {
        return null;
    } else {
        const newProject = new Project(trimmedName);
        projects.push(newProject);
        currentProject = newProject;
        return newProject;
    };
};

export function getCurrentProject() {
    return currentProject;
};

export function setCurrentProject(project) {
    if (projects.includes(project)) {
        currentProject = project;
    };
};

export function getProjects() {
    return projects;
};

