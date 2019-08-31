import Cat from "./sprites/cat-small.png";

function component() {
  const element = document.createElement("div");

  element.innerHTML = "Hello webpack!"

  const sprite = new Image();
  sprite.src = Cat;
  element.appendChild(sprite);

  return element;
}

document.body.appendChild(component());