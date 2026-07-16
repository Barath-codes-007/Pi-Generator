// ==========================
// PI GENERATOR PRO
// Part 1 - UI & Theme
// ==========================

// Elements
const digitsInput = document.getElementById("digits");
const generateBtn = document.getElementById("generateBtn");

const output = document.getElementById("output");

const digitCount = document.getElementById("digitCount");
const status = document.getElementById("status");

const progressCircle = document.getElementById("progressCircle");
const progressText = document.getElementById("progressText");

const copyBtn = document.getElementById("copyBtn");
const txtBtn = document.getElementById("txtBtn");
const pdfBtn = document.getElementById("pdfBtn");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const themeToggle = document.getElementById("themeToggle");

// Store generated pi
let generatedPi = "";

// Progress Circle
const radius = 70;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {

    const offset =
        circumference -
        (percent / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;

    progressText.textContent =
        Math.floor(percent) + "%";
}

// Initial state
setProgress(0);

status.textContent = "Waiting...";
digitCount.textContent = "0";

// ==========================
// Dark / Light Mode
// ==========================

let darkMode = true;

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    darkMode = !darkMode;

    if (darkMode) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

});

// ==========================
// Placeholder
// ==========================

generateBtn.addEventListener("click", () => {

    const digits =
        parseInt(digitsInput.value);

    if (!digits || digits <= 0) {

        alert("Please enter a valid number.");

        return;
    }

    status.textContent = "Preparing...";

    digitCount.textContent = digits;

    output.value = "";

    generatedPi = "";

    setProgress(5);

    // Real generator will be added
    setTimeout(() => {

        status.textContent =
            "Ready for generation";

        setProgress(10);

    }, 500);

});