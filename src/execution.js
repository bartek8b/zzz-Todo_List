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

function setStorage(value) {
  const data = JSON.stringify(value);
  localStorage.setItem("data", data);
}

export function createProject(name) {
  if (!isProject(name)) {
    const validName = nameValidator(name);
    projects.push(new Project(validName));
  } else {
    console.log("The project already exists");
  }
  setStorage(projects);
}

export function editProject(name, newName) {
  const oldName = nameValidator(name);
  const validNewName = nameValidator(newName);
  const project = spotItem(projects, "name", oldName);
  if (!project) {
    throw new Error("Such project doesn't exist");
  }
  if (spotItem(projects, "name", validNewName)) {
    throw new Error("The project already exists");
  }
  project.name = validNewName;
  setStorage(projects);
}

export function deleteProject(name) {
  const projectName = nameValidator(name);
  const toDelete = spotItem(projects, "name", projectName);
  const index = projects.indexOf(toDelete);
  if (index !== -1) {
    projects.splice(index, 1);
  } else {
    throw new Error("Such project doesn't exist");
  }
  setStorage(projects);
}

export function createTodo(projectName, title, description, dueDate, priority) {
  createProject(projectName);
  const validProjectName = nameValidator(projectName);
  for (const p of projects) {
    if (p.name === validProjectName) {
      const validTitle = nameValidator(title);
      const findTodo = spotItem(p.todos, "title", validTitle);
      if (!findTodo) {
        p.todos.push(
          new Todo(validTitle, description.trim(), dueDate, priority)
        );
      } else {
        throw new Error("The task already exists");
      }
    }
  }
  setStorage(projects);
}

export function editTodo(
  projectName,
  newProjectName,
  title,
  newTitle,
  newDescription,
  newDueDate,
  newPriority
) {
  const validProjectName = nameValidator(projectName);
  const project = spotItem(projects, "name", validProjectName);
  if (!project) {
    throw new Error("Such project doesn't exist");
  }
  const validTitle = nameValidator(title);
  const toEdit = spotItem(project.todos, "title", validTitle);
  if (!toEdit) {
    throw new Error("Such task doesn't exist");
  }
  if (validProjectName !== nameValidator(newProjectName)) {
    const index = project.todos.indexOf(toEdit);
    project.todos.splice(index, 1);
    createTodo(
      newProjectName,
      newTitle,
      newDescription,
      newDueDate,
      newPriority
    );
  } else {
    toEdit.title = nameValidator(newTitle);
    toEdit.description = newDescription.trim();
    toEdit.dueDate = newDueDate;
    toEdit.priority = newPriority;
  }
  setStorage(projects);
}

export function deleteTodo(projectName, title) {
  const validProjectName = nameValidator(projectName);
  const project = spotItem(projects, "name", validProjectName);
  if (!project) {
    throw new Error("Such project doesn't exist");
  }
  const validTitle = nameValidator(title);
  const toDelete = spotItem(project.todos, "title", validTitle);
  if (!toDelete) {
    throw new Error("Such task doesn't exist");
  }
  const index = project.todos.indexOf(toDelete);
  project.todos.splice(index, 1);
  setStorage(projects);
}
