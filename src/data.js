import { assignProjectId } from "./execution.js";

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
  }
}

export let projects = [];