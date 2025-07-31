const gridContainer = document.querySelector(".grid-container");

import arrowDown from "./assets/arrow-down-bold.svg";
import arrowUp from "./assets/arrow-up-bold.svg";
import mediumPrior from "./assets/minus-thick.svg";
import editIcon from "./assets/pencil.svg";
import deleteIcon from "./assets/delete.svg";
import { projects } from "./data.js";

function assignPriorityIcon(priority) {
  switch (Number(priority)) {
    case 1:
      return arrowDown;
    case 2:
      return mediumPrior;
    case 3:
      return arrowUp;
    default:
      console.error("Wrong priority");
      return;
  }
}

function createGridItem(
  project,
  title,
  description,
  dueDate,
  priority,
  checked,
  id
) {
  const priorityIcon = assignPriorityIcon(Number(priority));
  const priorityLevel = () => {
    switch (Number(priority)) {
      case 1:
        return "low";
      case 2:
        return "mid";
      case 3:
        return "high";
      default:
        console.error("Wrong priority");
        return;
    }
  };
  const isChecked = checked ? "checked" : "";

  return `<div class="grid-item">
          <div class="data-set">
            <!-- <strong>Project</strong> -->
            <p class="font-title" style="font-size: .9rem">${project}</p>
          </div>
          <div class="data-set">
            <!-- <strong>Title</strong> -->
            <p class="font-title">${title}</p>
          </div>
          <div class="data-set">
            <!-- <strong>Description</strong> -->
            <p class="description-para">
              ${description}
            </p>
          </div>
          <div class="card-low-bar">
            <div class="data-set">
              <strong>Due Date</strong>
              <p>${dueDate}</p>
            </div>
            <div class="data-set">
              <strong>Priority</strong>
              <p><img src="${priorityIcon}" alt="${priorityLevel()}" /></p>
            </div>
            <div class="data-set">
              <strong><label for="${id}" style="cursor: pointer;">Checked</label></strong>
              <br />
               <input type="checkbox" id="${id}" data-id="${id}" ${isChecked}/>
            </div>
          </div>
          <div class="data-set card-btns-container">
            <button class="edit-todo-btn" data-id="${id}"><img src=${editIcon} alt="edit button" /></button>
            <button class="delete-todo-btn" data-id="${id}"><img src=${deleteIcon} alt="delete button" /></button>
          </div>
        </div>`;
}

export function createGrid(arrayToDisplay) {
  gridContainer.innerHTML = "";
  let pushHTML = "";

  // Tablica projektów:
  if (
    arrayToDisplay.length > 0 &&
    arrayToDisplay[0].hasOwnProperty("todos")
  ) {
    for (const p of arrayToDisplay) {
      for (const t of p.todos) {
        pushHTML += createGridItem(
          p.name,
          t.title,
          t.description,
          t.dueDate,
          t.priority,
          t.checked,
          t.id
        );
      }
    }
  } else {
    // Tablica todosów:
    for (const t of arrayToDisplay) {
      // Jeśli chcesz wyświetlić nazwę projektu, musisz ją znaleźć po id todo!
      // Zakładam, że todo nie ma projectName, więc musisz zrobić lookup:
      const project = projects.find((p) =>
        p.todos.some((todo) => todo.id === t.id)
      );
      pushHTML += createGridItem(
        project ? project.name : "",
        t.title,
        t.description,
        t.dueDate,
        t.priority,
        t.checked,
        t.id
      );
    }
  }
  gridContainer.innerHTML += pushHTML;
}
