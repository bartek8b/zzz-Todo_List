export class Project {
  constructor(name) {
    this.name = name;
  }

  todos = [];
}

export const projects = [];

export class Todo {
  constructor(project, title, despription, dueDate, priority, notes) {
    this.project = project;
    this.title = title;
    this.despription = despription;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.done = false;
  }
}

projects.push(new Project("DEFAULT"));
