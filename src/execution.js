import { Project, Todo, projects } from "./data.js";

function nameValidator(name) {
  return name.trim().toUpperCase();
}

function isProject(name) {
  const validName = nameValidator(name);
  return projects.some((p) => p.name === validName);
}

function spotItem(array, property, condition){
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

function editProject() {}

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

export function createTodo(project, title, description, dueDate, priority) {
  createProject(project);
  const projectName = nameValidator(project);
  for (const p of projects) {
    if (p.name === projectName) {
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

function deleteTodo() {}
