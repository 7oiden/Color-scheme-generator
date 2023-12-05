const baseUrl = "https://www.thecolorapi.com/";

const colorForm = document.querySelector("#color-form");
const colorPicker = document.querySelector("#color-picker");
const colorDropdown = document.querySelector("#color-dropdown");

const colorContainer = document.querySelector("#color-container");
const valueContainer = document.querySelector("#value-container");

let hex = "ffffff";
let mode = "monochrome";
const count = 5;

colorPicker.value = "#ffffff";
colorDropdown.value = "monochrome";


//generates url for fetch request
let url = generateUrl();

function generateUrl() {
  return `${baseUrl}scheme?hex=${hex}&mode=${mode}&count=${count}`;
}

//copies color value to clipboard
valueContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-copy")) {
    const value = event.target.dataset.value;
    copyColor(value);
  }
});

function copyColor(value) {
  navigator.clipboard.writeText(value).then(function () {
    alert(`Color ${value} copied to clipboard`);
  });
}

//changes color scheme when user selects a new color
colorForm.addEventListener("submit", getInputColors);

function getInputColors(event) {
  event.preventDefault();

  hex = colorPicker.value.replace("#", "");
  mode = colorDropdown.value;

  url = generateUrl();

  fetchColor();
}

//fetches color scheme from API
async function fetchColor() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const colors = data.colors;
    displayColors(colors);
  } catch (error) {
    console.log(error);
  }
}

fetchColor();

//displays color scheme
function displayColors(colors) {
  colorContainer.innerHTML = "";
  valueContainer.innerHTML = "";

  colors.forEach((color) => {
    colorContainer.innerHTML += `
    <div class="color-box" style="background-color: ${color.hex.value}"></div>`;

    valueContainer.innerHTML += `
    <div class="value-box" "><div>${color.hex.value}</div>
    <i class="far fa-copy" data-value="${color.hex.value}"></i></div>`;
  });
}
