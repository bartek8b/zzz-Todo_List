// Test of app logic - should be pasted to entry

console.log("----- TEST -----");
import {
  createTodo,
  createProject,
  deleteProject,
  editProject,
  deleteTodo,
  editTodo,
} from "./execution.js";
// import { projects } from "./data.js";

createTodo("Default", "Groceries", "Buy food", "2025-11-21", 3);
createProject("Another Project");
createTodo("Sports", "BJJ", "Choke friend unconcious", "2025-06-01", 2);
createTodo("Sports", "Football", "Fake injury", "2025-08-15", 1);
editProject("Default", "Shopping");
deleteTodo("Sports", "Football");
editTodo(
  "Sports",
  "Martial arts",
  "BJJ",
  "Brazilian Jiu Jitsu",
  "Choke friend, make crazy moves. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales nulla non viverra sodales.",
  "2025-06-23",
  1
);
deleteProject("Another Project");
console.log(projects);