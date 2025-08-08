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
  // ARRAY OF PROJECTS
  if (array.length && array[0].hasOwnProperty("todos")) {
    const validName = nameValidator(projectName);
    const project = array.find((p) => p.name === validName);
    return project ? [project] : [];
  } else {
    // ARRAY OF TODOS
    const validName = nameValidator(projectName);
    return array.filter((t) => {
      const parentProject = projects.find((p) =>
        p.todos.some((todo) => todo.id === t.id)
      );
      return parentProject && parentProject.name === validName;
    });
  }
}

export function filterByPriority(array, priority) {
  let priorityValue = priority;
  if (typeof priority === "string") {
    switch (priority.toLowerCase()) {
      case "low":
        priorityValue = 1;
        break;
      case "medium":
        priorityValue = 2;
        break;
      case "high":
        priorityValue = 3;
        break;
      default:
        priorityValue = 1;
    }
  }
  if (array.length && array[0].hasOwnProperty("todos")) {
    // ARRAY OF PROJECTS
    const todosByPriority = [];
    for (const p of array) {
      const filtered = p.todos.filter((t) => t.priority === priorityValue);
      todosByPriority.push(...filtered);
    }
    return todosByPriority;
  } else {
    // ARRAY OF TODOS
    return array.filter((t) => t.priority === priorityValue);
  }
}

export function filterLate(array) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  if (array.length && array[0].hasOwnProperty("todos")) {
    // ARRAY OF PROJECTS
    const todosLate = [];
    for (const p of array) {
      for (const t of p.todos) {
        const dueString = new Date(t.dueDate).toISOString().split("T")[0];
        if (dueString < todayString) {
          todosLate.push(t);
        }
      }
    }
    return todosLate;
  } else {
    // ARRAY OF TODOS
    return array.filter((t) => {
      const dueString = new Date(t.dueDate).toISOString().split("T")[0];
      return dueString < todayString;
    });
  }
}

export function filterDay(array) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  // ARRAY OF PROJECTS
  if (array.length && array[0].hasOwnProperty("todos")) {
    const todosDay = [];
    for (const p of array) {
      for (const t of p.todos) {
        const dueString = new Date(t.dueDate).toISOString().split("T")[0];
        if (dueString === todayString) {
          todosDay.push(t);
        }
      }
    }
    return todosDay;
  } else {
    // ARRAY OF TODOS
    return array.filter((t) => {
      const dueString = new Date(t.dueDate).toISOString().split("T")[0];
      return dueString === todayString;
    });
  }
}

export function filterWeek(array) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const weekAhead = new Date(today);
  weekAhead.setDate(weekAhead.getDate() + 7);
  const weekAheadString = weekAhead.toISOString().split("T")[0];

  if (array.length && array[0].hasOwnProperty("todos")) {
    // ARRAY OF PROJECTS
    const todosWeek = [];
    for (const p of array) {
      for (const t of p.todos) {
        const dueString = new Date(t.dueDate).toISOString().split("T")[0];
        if (dueString >= todayString && dueString < weekAheadString) {
          todosWeek.push(t);
        }
      }
    }
    return todosWeek;
  } else {
    // ARRAY OF TODOS
    return array.filter((t) => {
      const dueString = new Date(t.dueDate).toISOString().split("T")[0];
      return dueString >= todayString && dueString < weekAheadString;
    });
  }
}
