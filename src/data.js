function assignProjectId() {
  let id;
  do {
    id = self.crypto.randomUUID();
  } while (projects.some((p) => p.id === id));
  return id;
}

function assignTodoId() {
  let id;
  const idExist = () => {
    for (const p of projects) {
      if (p.todos.some((t) => t.id === id)) {
        return true;
      }
    }
    return false;
  };

  do {
    id = self.crypto.randomUUID();
  } while (idExist());
  return id;
}

export class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id = assignProjectId();
  }
}

export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = false;
    this.id = assignTodoId();
  }
}

export const projects = [];