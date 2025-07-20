const gridContainer = document.querySelector(".grid-container");

function assignPriorityIcon(priority) {
  const low = "assets/arrow-down-bold.svg";
  const mid = "assets/minus-thick.svg";
  const high = "assets/arrow-up-bold.svg";

  switch (Number(priority)) {
    case 1:
      return low;
    case 2:
      return mid;
    case 3:
      return high;
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
  checked
) {
  priority = assignPriorityIcon(Number(priority));
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
            <p class="fontTitle">${project}</p>
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
              <p><img src=${priority} alt=${priorityLevel()} /></p>
            </div>
            <div class="data-set">
              <strong><label for="check">Checked</label></strong>
              <br />
              <input type="checkbox" ${isChecked()}/>
            </div>
          </div>
          <div class="data-set card-btns-container">
            <button data-project=${project} data-title=${title}><img src="assets/pencil.svg" alt="" /></button>
            <button data-project=${project} data-title=${title}><img src="assets/delete.svg" alt="" /></button>
          </div>
        </div>`;
}

export function createGrid(arrayToDisplay) {
  let pushHTML = "";
  for (const p of arrayToDisplay) {
    for (const t of p.todos) {
      const project = p.name;
      const title = t.title;
      const description = t.description;
      const dueDate = t.dueDate;
      const priority = t.priority;
      const checked = t.checked;

      pushHTML += createGridItem(
        project,
        title,
        description,
        dueDate,
        priority,
        checked
      );
    }
  }
  gridContainer.innerHTML += pushHTML;
}
