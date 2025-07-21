const projectsList = document.querySelector(".projects-list");

import editIcon from "./assets/pencil.svg";
import deleteIcon from "./assets/delete.svg";

function createListItem(name, id) {
  return `<li>
              <button class="fontTitle">${name}</button>
              <button class="edit-project-btn" data-id="${id}">
                <img src="${editIcon}" alt="edit project" />
              </button>
              <button class="delete-project-btn" data-id="${id}">
                <img src="${deleteIcon}" alt="delete project" />
              </button>
            </li>`;
}

export function createProjectsList(arrayToDisplay) {
  projectsList.innerHTML = "";
  let pushHTML = "";
  for (const p of arrayToDisplay) {
    pushHTML += createListItem(p.name, p.id);
  }
  projectsList.innerHTML += pushHTML;
}