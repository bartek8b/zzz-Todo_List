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

function createGrid(arrayToDisplay) {
  for (const p of arrayToDisplay) {
    for (const t of p.todos) {
      const project = p.name;
      const title = t.title;
      const description = t.description;
      const dueDate = t.dueDate;
      const priority = t.priority;
      const checked = t.checked;
    }
  }
}
