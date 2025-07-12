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
