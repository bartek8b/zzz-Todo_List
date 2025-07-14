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
  } else {
    console.log("The project already exists");
  }
}

function editProject(){
  
}

function deleteProject(){
  
}

function createTodo(project, title, description, dueDate, priority) {
  createProject(project);
  const projectName = nameValidator(project);
  for (const p of projects) {
    if (p.name === projectName) {
      const validTitle = nameValidator(title);
      const findTodo = p.todos.find((t) => t.title === validTitle);
      if (!findTodo) {
        p.todos.push(
          new Todo(validTitle, description, dueDate, priority)
        );
      } else {
        console.log("The task already exists");
      }
    }
  }
}

function editTodo(){
  
}

function deleteTodo(){
  
}