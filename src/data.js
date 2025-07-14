export class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }  
}
export let projects = [];

export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }
}

// Maybe should be moved to different part of program (entry?)
projects.push(new Project("DEFAULT"));