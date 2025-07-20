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

export function retrieveStorage() {
  const data = JSON.parse(localStorage.getItem("data"));
  let isValidData = false;
  if (Array.isArray(data)) {
    isValidData = data.every(
      (p) =>
        typeof p === "object" &&
        typeof p.name === "string" &&
        Array.isArray(p.todos)
    );
  }
  if (isValidData) {
    projects.length = 0;
    projects.push(...data);
  }
}

export function ensureDefaultProject() {
  if (projects.length === 0) {
    createProject("Unassigned");
  }
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
    console.error("Such project doesn't exist");
    return;
  }
  if (spotItem(projects, "name", validNewName)) {
    console.error("The project already exists");
    return;
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
    console.error("Such project doesn't exist");
    return;
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
        console.error("The task already exists");
        return;
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
    console.error("Such project doesn't exist");
    return;
  }
  const validTitle = nameValidator(title);
  const toEdit = spotItem(project.todos, "title", validTitle);
  if (!toEdit) {
    console.error("Such task doesn't exist");
    return;
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
    console.error("Such project doesn't exist");
    return;
  }
  const validTitle = nameValidator(title);
  const toDelete = spotItem(project.todos, "title", validTitle);
  if (!toDelete) {
    console.error("Such task doesn't exist");
    return;
  }
  const index = project.todos.indexOf(toDelete);
  project.todos.splice(index, 1);
  setStorage(projects);
}

export function editChecked(projectName, title, checked) {
  const validProjectName = nameValidator(projectName);
  const project = spotItem(projects, "name", validProjectName);
  if (!project) {
    console.error("Such project doesn't exist");
    return;
  }
  const validTitle = nameValidator(title);
  const todo = spotItem(project.todos, "title", validTitle);
  if (!todo) {
    console.error("The task doesn't exists");
    return;
  }
  todo.checked = checked;
  setStorage(projects);
}

function filterByProject(projectName) {
  const project = spotItem(projects, "name", nameValidator(projectName));
  return project ? [project] : [];
}

function filterByPriority(array, priority) {
  const todosByPriority = [];
  for (const p of array) {
    const filtered = p.todos.filter((t) => t.priority === priority);
    todosByPriority.push(...filtered);
  }
  return todosByPriority;
}

function filterLate(array) {
  const todosLate = [];
  const today = new Date();
  for (const p of array) {
    for (const t of p.todos) {
      const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
      if (dayLeft < 0) {
        todosLate.push(t);
      }
    }
  }
  return todosLate;
}

function filterDay(array) {
  const todosDay = [];
  const today = new Date();
  for (const p of array) {
    for (const t of p.todos) {
      const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
      if (dayLeft >= 0 && dayLeft < 1) {
        todosDay.push(t);
      }
    }
  }
  return todosDay;
}

function filterWeek(array) {
  const todosWeek = [];
  const today = new Date();
  for (const p of array) {
    for (const t of p.todos) {
      const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
      if (dayLeft >= 0 && dayLeft < 7) {
        todosWeek.push(t);
      }
    }
  }
  return todosWeek;
}
