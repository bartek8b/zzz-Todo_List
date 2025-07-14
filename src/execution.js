import { Project, Todo, projects } from "./data.js";

function nameValidator(name) {
  return name.trim().toUpperCase();
}

function isProject(name) {
  const validName = nameValidator(name);
  return projects.some((p) => p.name === validName);
}

function spotItem(array, property, condition) {
  return array.find((e) => e[property] === condition);
}

export function createProject(name) {
  if (!isProject(name)) {
    const validName = nameValidator(name);
    projects.push(new Project(validName));
  } else {
    console.log("The project already exists");
  }
}

export function editProject(name, newName) {
  const oldName = nameValidator(name);
  const validNewName = nameValidator(newName);
  const project = spotItem(projects, "name", oldName);
  if (!project) {
    console.log("Such project doesn't exist");
    return;
  }
  if (spotItem(projects, "name", validNewName)) {
    console.log("Project with the new name already exists");
    return;
  }
  project.name = validNewName;
}

export function deleteProject(name) {
  const projectName = nameValidator(name);
  const toDelete = spotItem(projects, "name", projectName);
  const index = projects.indexOf(toDelete);
  if (index !== -1) {
    projects.splice(index, 1);
  } else {
    console.log("Such project doesn't exist");
  }
}

export function createTodo(projectName, title, description, dueDate, priority) {
  createProject(projectName);
  const validProjectName = nameValidator(projectName);
  for (const p of projects) {
    if (p.name === validProjectName) {
      const validTitle = nameValidator(title);
      const findTodo = spotItem(p.todos, "title", validTitle);
      if (!findTodo) {
        p.todos.push(new Todo(validTitle, description, dueDate, priority));
      } else {
        console.log("The task already exists");
      }
    }
  }
}

function editTodo() {}

export function deleteTodo(projectName, title) {
  const validProjectName = nameValidator(projectName);
  const project = spotItem(projects, "name", validProjectName);
  if (!project) {
    console.log("Such project doesn't exist");
    return;
  }
  const validTitle = nameValidator(title);
  const toDelete = spotItem(project.todos, "title", validTitle);
  if (!toDelete) {
    console.log("Such task doesn't exist");
    return;
  }
  const index = project.todos.indexOf(toDelete);
  project.todos.splice(index, 1);
}
