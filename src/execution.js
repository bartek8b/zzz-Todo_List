import { Project, Todo, projects } from "./data";

function nameValidator(name){
    return name.trim().toUpperCase();
}

function isProject(name) {
  const validName = nameValidator(name);
  return projects.some((p) => p.name === validName);
}

function createProject(name) {
  const validName = nameValidator(name);
  if (!isProject(name)) {
    projects.push(new Project(validName));
  }
}

// function createTodo(project, title, despription, dueDate, priority, notes) {
//   if (!projects.project) {
//     createProject(project);
//   }
//   projects.project.todos.push(
//     new Todo(title, despription, dueDate, priority, notes)
//   );
// }
