const gridContainer = document.querySelector(".grid-container");

import arrowDown from "./assets/arrow-down-bold.svg";
import arrowUp from "./assets/arrow-up-bold.svg";
import mediumPrior from "./assets/minus-thick.svg";
import editIcon from "./assets/pencil.svg";
import deleteIcon from "./assets/delete.svg";

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
  const isChecked = () => (checked ? "checked" : "");

  return `<div class="grid-item">
          <div class="data-set">
            <!-- <strong>Project</strong> -->
            <p class="fontTitle" style="font-size: .9rem">${project}</p>
          </div>
          <div class="data-set">
            <!-- <strong>Title</strong> -->
            <p class="fontTitle">${title}</p>
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
              <strong>Checked</strong>
              <br />
              <input type="checkbox" ${isChecked()}/>
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
  for (const p of arrayToDisplay) {
    for (const t of p.todos) {
      const project = p.name;
      const title = t.title;
      const description = t.description;
      const dueDate = t.dueDate;
      const priority = t.priority;
      const checked = t.checked;
      const id = t.id;

      pushHTML += createGridItem(
        project,
        title,
        description,
        dueDate,
        priority,
        checked,
        id
      );
    }
  }
  gridContainer.innerHTML += pushHTML;
}
