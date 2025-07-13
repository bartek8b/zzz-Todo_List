export class Project {
  constructor(name) {
    this.name = name;
  }

  todos = [];
}
export let projects = [];

export class Todo {
  constructor(title, despription, dueDate, priority, notes) {
    this.title = title;
    this.despription = despription;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.done = false;
  }
}

// Maybe should be moved to different part of program (entry?)
projects.push(new Project("DEFAULT"));