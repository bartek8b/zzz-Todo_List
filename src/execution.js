import { Project, Todo, projects } from "./data";

function nameValidator(name) {
  return name.trim().toUpperCase();
}

function isProject(name) {
  const validName = nameValidator(name);
  return projects.some((p) => p.name === validName);
}

function createProject(name) {
  if (!isProject(name)) {
    const validName = nameValidator(name);
    projects.push(new Project(validName));
  }
}

function createTodo(project, title, despription, dueDate, priority, notes) {
  createProject(project);
  const projectName = nameValidator(project);
  for (const p of projects) {
    if (p.name === projectName) {
      p.todos.push(new Todo(title, despription, dueDate, priority, notes));
    }
  }
}