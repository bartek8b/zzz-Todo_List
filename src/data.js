import { assignProjectId, assignTodoId } from "./execution.js";

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

export let projects = [];
