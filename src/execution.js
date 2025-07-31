import { Project, Todo, projects } from "./data.js";

function nameValidator(name) {
  return name.trim().toUpperCase();
}

function isProject(name) {
  const validName = nameValidator(name);
  return projects.some((p) => p.name === validName);
}

export function setStorage(value) {
  const data = JSON.stringify(value);
  localStorage.setItem("data", data);
}

export function spotItem(array, property, condition) {
  return array.find((e) => e[property] === condition);
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
  const validName = nameValidator(name);
  if (validName.length === 0) {
    console.error("Project name cannot be empty");
    return false;
  }
  if (!isProject(name)) {
    projects.push(new Project(validName));
    projects.sort((a, b) => a.name.localeCompare(b.name));
    setStorage(projects);
    return true;
  } else {
    console.error("The project already exists");
    return false;
  }
}

export function editProject(currentName, newName) {
  const validCurrentName = nameValidator(currentName);
  const validNewName = nameValidator(newName);
  const project = spotItem(projects, "name", validCurrentName);
  if (!project) {
    console.error("Such project doesn't exist");
    return false;
  }
  if (spotItem(projects, "name", validNewName)) {
    console.error("The project already exists");
    return false;
  }
  if (!validNewName) {
    return false;
  }
  project.name = validNewName;
  projects.sort((a, b) => a.name.localeCompare(b.name));
  setStorage(projects);
  return true;
}

export function deleteProject(name) {
  const projectName = nameValidator(name);
  const toDelete = spotItem(projects, "name", projectName);
  const index = projects.indexOf(toDelete);
  if (index !== -1) {
    projects.splice(index, 1);
  } else {
    console.error("Such project doesn't exist");
    return false;
  }
  ensureDefaultProject();
  setStorage(projects);
  return true;
}

export function createTodo(projectName, title, description, dueDate, priority) {
  createProject(projectName);
  const validProjectName = nameValidator(projectName);
  for (const p of projects) {
    if (p.name === validProjectName) {
      const validTitle = nameValidator(title);
      if (validTitle.length === 0) {
        console.error("Todo name cannot be empty");
        return false;
      }
      const findTodo = spotItem(p.todos, "title", validTitle);
      if (!findTodo) {
        p.todos.push(
          new Todo(validTitle, description.trim(), dueDate, priority)
        );
      } else {
        console.error("The todo already exists");
        return false;
      }
    }
  }
  setStorage(projects);
  return true;
}

export function editTodo(
  currentProjectName,
  newProjectName,
  currentTitle,
  newTitle,
  newDescription,
  newDueDate,
  newPriority
) {
  const validCurrentProjectName = nameValidator(currentProjectName);
  const project = spotItem(projects, "name", validCurrentProjectName);
  if (!project) {
    console.error("Such project doesn't exist");
    return false;
  }
  const validCurrentTitle = nameValidator(currentTitle);
  const toEdit = spotItem(project.todos, "title", validCurrentTitle);
  if (!toEdit) {
    console.error("Such todo doesn't exist");
    return false;
  }
  if (validCurrentProjectName !== nameValidator(newProjectName)) {
    const index = project.todos.indexOf(toEdit);
    project.todos.splice(index, 1);
    // TO BE CHECKED IF createTodo IS TRUE OR FALSE SO RETURN SUCCESS VAR.
    const success = createTodo(
      newProjectName,
      newTitle,
      newDescription,
      newDueDate,
      newPriority
    );
    setStorage(projects);
    return success; // RETURN SUCCESS VAR.
  } else {
    toEdit.title = nameValidator(newTitle);
    toEdit.description = newDescription.trim();
    toEdit.dueDate = newDueDate;
    toEdit.priority = newPriority;
    setStorage(projects);
    return true;
  }
}

export function deleteTodo(projectName, title) {
  const validProjectName = nameValidator(projectName);
  const project = spotItem(projects, "name", validProjectName);
  if (!project) {
    console.error("Such project doesn't exist");
    return false;
  }
  const validTitle = nameValidator(title);
  const toDelete = spotItem(project.todos, "title", validTitle);
  if (!toDelete) {
    console.error("Such todo doesn't exist");
    return false;
  }
  const index = project.todos.indexOf(toDelete);
  project.todos.splice(index, 1);
  setStorage(projects);
  return true;
}

export function editChecked(projectName, title, checked) {
  const validProjectName = nameValidator(projectName);
  const project = spotItem(projects, "name", validProjectName);
  if (!project) {
    console.error("Such project doesn't exist");
    return false;
  }
  const validTitle = nameValidator(title);
  const todo = spotItem(project.todos, "title", validTitle);
  if (!todo) {
    console.error("The todo doesn't exists");
    return false;
  }
  todo.checked = checked;
  setStorage(projects);
  return true;
}

export function filterByProject(array, projectName) {
  // Jeśli mamy tablicę projektów
  if (array.length && array[0].hasOwnProperty("todos")) {
    const validName = nameValidator(projectName);
    const project = array.find((p) => p.name === validName);
    return project ? [project] : [];
  } else {
    // Tablica todosów
    const validName = nameValidator(projectName);
    return array.filter((t) => {
      // Szukamy todosa w projekcie o zadanej nazwie
      // Musimy znaleźć projekt, w którym ten todo jest
      const parentProject = projects.find((p) =>
        p.todos.some((todo) => todo.id === t.id)
      );
      return parentProject && parentProject.name === validName;
    });
  }
}

export function filterByPriority(array, priority) {
  // Zamiana tekstu na liczbę:
  let prioValue = priority;
  if (typeof priority === "string") {
    switch (priority.toLowerCase()) {
      case "low":
        prioValue = 1;
        break;
      case "medium":
        prioValue = 2;
        break;
      case "high":
        prioValue = 3;
        break;
      default:
        prioValue = 1;
    }
  }
  if (array.length && array[0].hasOwnProperty("todos")) {
    // Tablica projektów
    const todosByPriority = [];
    for (const p of array) {
      const filtered = p.todos.filter((t) => t.priority === prioValue);
      todosByPriority.push(...filtered);
    }
    return todosByPriority;
  } else {
    // Tablica todosów
    return array.filter((t) => t.priority === prioValue);
  }
}

export function filterLate(array) {
  const today = new Date();
  if (array.length && array[0].hasOwnProperty("todos")) {
    // Tablica projektów
    const todosLate = [];
    for (const p of array) {
      for (const t of p.todos) {
        const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
        if (dayLeft < 0) {
          todosLate.push(t);
        }
      }
    }
    return todosLate;
  } else {
    // Tablica todosów
    return array.filter((t) => {
      const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
      return dayLeft < 0;
    });
  }
}

export function filterDay(array) {
  const today = new Date();
  if (array.length && array[0].hasOwnProperty("todos")) {
    // Tablica projektów
    const todosDay = [];
    for (const p of array) {
      for (const t of p.todos) {
        const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
        if (dayLeft >= 0 && dayLeft < 1) {
          todosDay.push(t);
        }
      }
    }
    return todosDay;
  } else {
    // Tablica todosów
    return array.filter((t) => {
      const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
      return dayLeft >= 0 && dayLeft < 1;
    });
  }
}

export function filterWeek(array) {
  const today = new Date();
  if (array.length && array[0].hasOwnProperty("todos")) {
    // Tablica projektów
    const todosWeek = [];
    for (const p of array) {
      for (const t of p.todos) {
        const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
        if (dayLeft >= 0 && dayLeft < 7) {
          todosWeek.push(t);
        }
      }
    }
    return todosWeek;
  } else {
    // Tablica todosów
    return array.filter((t) => {
      const dayLeft = (new Date(t.dueDate) - today) / (1000 * 60 * 60 * 24);
      return dayLeft >= 0 && dayLeft < 7;
    });
  }
}
