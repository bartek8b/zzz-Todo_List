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
  constructor(title, despription, dueDate, priority, notes){
    this._title = title,
    this._despription = despription,
    this._dueDate = dueDate,
    this._priority = priority,
    this._notes = notes,
    this._checked = false;
  }
}
