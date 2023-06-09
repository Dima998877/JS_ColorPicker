const cols = document.querySelectorAll(".col");
const popup = document.getElementById("popup");

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}
function copyToClipBoard(text) {
  return navigator.clipboard.writeText(text);
}
function updateColorHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => `#${color}`);
  }
  return [];
}
function toggleLockIcon(e) {
  const node =
    e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

  node.classList.toggle("fa-lock-open");
  node.classList.toggle("fa-lock");
}
function showPopup(e) {
  copyToClipBoard(e.target.textContent);
  popup.classList.toggle("show");
  setTimeout(() => {
    popup.classList.toggle("show");
  }, "2000");
}
function setRandomColor(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const color = isInitial && colors[index] ? colors[index] : chroma.random();

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    if (!isInitial) {
      colors.push(color);
    }

    col.style.background = color;
    text.textContent = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateColorHash(colors);
}

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColor();
  }
});
document.addEventListener("click", (e) => {
  const { type } = e.target.dataset;

  if (type === "lock") {
    toggleLockIcon(e);
  } else if (type === "copy") {
    showPopup(e);
  }
});

// function generateRandomColor() {
//   const hexCode = '0123456789ABCDEF';
//   let color = '';

//   for (let i = 0; i < 6; i++) {
//     color += hexCode[Math.floor(Math.random() * hexCode.length)];
//   }
//   return `#${color}`;
// }

setRandomColor(true);
