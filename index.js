const add = document.querySelector("h5");
const friends= document.querySelector("#add");
const removed = document.querySelector("#remove");

friends.addEventListener("click" ,() => {
    add.innerHTML ="Friends"
    add.style.color ="green"
});

removed.addEventListener("click", () => {
    add.innerHTML ="Stranger"
    add.style.color ="red"
});