const outputElement = document.querySelector('#output');
const btnCopy = document.querySelector('#btnCopy');
const passwordLengthElement = document.querySelector('#length');
const numberElement = document.querySelector('#number');
const capitalElement = document.querySelector('#capital');
const smallElement = document.querySelector('#small');
const symbolElement = document.querySelector('#symbol');
const frm = document.querySelector('#frm');

// Button Click to copy password
btnCopy.addEventListener('click', async () => {
  const pass = outputElement.value;
  if (pass) {
    await navigator.clipboard.writeText(pass);
    alert("Copied to clipboard");
  } else {
    alert("There is no password to copy");
  }
});

// Function to update the span with the current length value
function updateLengthValue(value) {
  document.getElementById('lengthValue').innerText = value;
}

// Initialize the span with the initial slider value
document.addEventListener('DOMContentLoaded', function () {
  const lengthSlider = document.getElementById('length');
  updateLengthValue(lengthSlider.value);

  // Add an event listener to update the span whenever the slider value changes
  lengthSlider.addEventListener('input', function () {
    updateLengthValue(lengthSlider.value);
  });
});

function generateRandomChar(min, max) {
  const limit = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

function capitalValue() {
  return generateRandomChar(65, 90);
}

function smallValue() {
  return generateRandomChar(97, 122);
}

function numberValue() {
  return generateRandomChar(48, 57);
}

function symbolValue() {
  const symbols = "~!@#$%^&*()_+|}{<>*./";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const functionArray = [
  {
    element: numberElement,
    fun: numberValue
  },
  {
    element: capitalElement,
    fun: capitalValue
  },
  {
    element: smallElement,
    fun: smallValue
  },
  {
    element: symbolElement,
    fun: symbolValue
  }
];

frm.addEventListener('submit', (e) => {
  e.preventDefault();

  const limit = passwordLengthElement.value;
  let generatedPassword = "";

  const funArray = functionArray.filter(({ element }) => element.checked);

  for (let i = 0; i < limit; i++) {
    const index = Math.floor(Math.random() * funArray.length);
    const letter = funArray[index].fun();
    generatedPassword += letter;
  }

  outputElement.value = generatedPassword;
});
