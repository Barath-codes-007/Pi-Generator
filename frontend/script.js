const API_URL = "https://pi-generator-apg0.onrender.com";

const digits = document.getElementById("digits");
const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");
const txtBtn = document.getElementById("txtBtn");
const pdfBtn = document.getElementById("pdfBtn");
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");
const loading = document.getElementById("loading");
const progress = document.getElementById("progress");
const digitCount = document.getElementById("digitCount");
const timeTaken = document.getElementById("timeTaken");

let generatedPi = "";

themeBtn.onclick = () => {
    document.body.classList.toggle("dark");
};

copyBtn.onclick = () => {
    if (!generatedPi) return;
    navigator.clipboard.writeText(generatedPi);
    alert("Copied!");
};

generateBtn.onclick = async () => {

    const n = parseInt(digits.value);

    if (!n || n < 1) {
        alert("Enter a valid number.");
        return;
    }

    loading.style.display = "block";
    progress.style.width = "0%";
    output.value = "";

    let p = 0;

    const animation = setInterval(() => {
        p += 2;
        if (p <= 90)
            progress.style.width = p + "%";
    }, 100);

    const start = performance.now();

    try {

        const response = await fetch(API_URL + "/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                digits: n
            })

        });

        const data = await response.json();

        generatedPi = data.pi;

        output.value = generatedPi;

        digitCount.innerHTML = generatedPi.length - 2;

        const end = performance.now();

        timeTaken.innerHTML =
            ((end - start) / 1000).toFixed(2) + " sec";

        clearInterval(animation);

        progress.style.width = "100%";

    }

    catch (err) {

        alert("Server Error");

        console.log(err);

    }

    loading.style.display = "none";

};

txtBtn.onclick = () => {

    if (!generatedPi) return;

    const blob = new Blob([generatedPi], {

        type: "text/plain"

    });

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "pi.txt";

    a.click();

};

pdfBtn.onclick = () => {

    if (!generatedPi) return;

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const lines = pdf.splitTextToSize(generatedPi, 180);

    pdf.text(lines, 10, 10);

    pdf.save("pi.pdf");

};