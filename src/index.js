import "./modern-normalize.css";
import "./style.css";

console.log("----- TEST -----");
import { createTodo, createProject, deleteProject, editProject } from "./execution.js";
import { projects } from "./data.js";

createTodo("Default", "Groceries", "Buy food", "2025-11-21", 3);
createProject("Another Project");
createTodo("Sports", "BJJ", "Choke friend", "2025-06-01", 2);
createTodo("Sports", "Football", "Fake injury", "2025-08-15", 1);
editProject("Default", "Shopping")
deleteProject("Another Project");

console.log(projects);
