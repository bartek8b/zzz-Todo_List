const gridContainer = document.querySelector(".grid-container");

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
