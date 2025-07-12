export class Project {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  todos = [];
}

export const projects = [
  {
    name: "Default",
    todos: [],
  },
];

export class Todo {
  constructor(title, despription, dueDate, priority, notes) {
    (this._title = title),
      (this._despription = despription),
      (this._dueDate = dueDate),
      (this._priority = priority),
      (this._notes = notes),
      (this._done = false);
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get despription() {
    return this._despription;
  }

  set despription(despription) {
    this._despription = despription;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    this._priority = priority;
  }

  get notes() {
    return this._notes;
  }

  set notes(notes) {
    this._notes = notes;
  }

  get done() {
    return this._done;
  }

  set done(done) {
    this._done = done;
  }
}
