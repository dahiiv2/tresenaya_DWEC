const divX = document.querySelector(".x");
const divO = document.querySelector(".o");

divX.addEventListener("dragstart", dragstart);
divO.addEventListener("dragstart", dragstart);

function dragstart (e) {
    e.dataTransfer.setData("text/plain", e.target.id);
}

const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    e.target.appendChild(draggable);
}