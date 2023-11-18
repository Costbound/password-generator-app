const body = document.querySelector("body");
const form = document.querySelector(".pswd-settings__form");
const submitBtn = document.querySelector(".form__submit-btn");
const copyBtn = document.querySelector(".password__icon-copy");
const copyPara = document.querySelector(".copy__para")
// Input
const lengthInput = document.querySelector(".form__pswd-length-input");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
// Output
const pswdOutput = document.querySelector(".password__para");
const lengthOutput = document.querySelector(".form__pswd-length-output");
const strengthPara = document.querySelector(".strength-scale__para");
const strengthScales = document.querySelectorAll(".strength-scale__scale");
const lengthMessage = document.querySelector(".form__pswd-length-output::before");



const delay = async (ms) => { await new Promise(resolve => setTimeout(resolve, ms)) };

pswdOutput.style.opacity = "0.25";

copyBtn.onclick = async function () {
    if (pswdOutput.textContent !== "P4$5W0rD!") {
        const copyInput = document.createElement("input");
        copyInput.setAttribute("type", "text");
        copyInput.setAttribute("value", pswdOutput.textContent);
        copyInput.setAttribute("class", "temporary-input");
        form.append(copyInput);
        document.querySelector(".temporary-input").select();
        document.execCommand("copy");
        document.querySelector(".temporary-input").remove();
        copyPara.style.display = "block";
        await delay(1);
        copyPara.style.color = "#A4FFAF";
        await delay(3000);
        copyPara.style.color = "";
        await delay(150);
        copyPara.style.display = "";
    }
}

lengthInput.oninput = function () {
    lengthOutput.textContent = lengthInput.value;
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.background = 'linear-gradient(to right, #A4FFAF 0%, #A4FFAF ' + value + '%, #18171F ' + value + '%, #18171F 100%)'
};

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    generatePswd();
})

async function generatePswd() {
    const lettersLowerCase = "abcdefghijklmnopqrstuvwxyz";
    const lettersUpperCase = lettersLowerCase.toUpperCase();
    const numbers = "0123456789";
    const symbols = "!#$%&'()*+,-./:;<=>?@[]^_{}|~`" + '"';
    let check = "";
    let result = "";
    if (lengthInput.value != 0 && (uppercaseCheck.checked || lowercaseCheck.checked || numbersCheck.checked || symbolsCheck.checked)) {
        if (uppercaseCheck.checked) check += lettersUpperCase;
        if (lowercaseCheck.checked) check += lettersLowerCase;
        if (numbersCheck.checked) check += numbers;
        if (symbolsCheck.checked) check += symbols;

        while (result.length < Number(lengthInput.value)) {
            result += check[Math.floor(Math.random() * check.length)];
        }
        pswdOutput.textContent = result;
        pswdOutput.style.opacity = "";
        generatePswdStrength(result);
        body.style.backgroundColor = "#A4FFAF";
        body.style.backgroundImage = "none";
        await delay(150);
        body.style.backgroundColor = "";
        body.style.backgroundImage = "";
    } else {
        body.style.backgroundColor = "#F64A4A";
        body.style.backgroundImage = "none";
        await delay(150);
        body.style.backgroundColor = "";
        body.style.backgroundImage = "";
    }
}

function generatePswdStrength(pswd) {
    const reLow = /[a-z]/;
    const reUp = /[A-Z]/;
    const reNum = /[0-9]/;
    const reSymb = /[!#$%&'()*+,-./:;<=>?@[\]^_{}|~`"]/;
    let strength = 0;
    if (reLow.test(pswd)) strength += 1;
    if (reUp.test(pswd)) strength += 1;
    if (reNum.test(pswd)) strength += 1;
    if (reSymb.test(pswd)) strength += 1;
    if (strength === 4) {
        strengthScales.forEach(scale => { strengthStyling(scale, "#A4FFAF", "strong", 3) })
    } else if (strength === 3) {
        strengthScales.forEach((scale, i) => {
            i < 3 ? strengthStyling(scale, "#F8CD65", "medium", 3) :
                strengthStyling(scale);
        });
    } else if (strength === 2) {
        strengthScales.forEach((scale, i) => {
            i < 2 ? strengthStyling(scale, "#FB7C58", "weak", 3) :
                strengthStyling(scale);
        });
    } else if (strength === 1) {
        strengthScales.forEach((scale, i) => {
            i < 1 ? strengthStyling(scale, "#F64A4A", "too weak!", 3) :
                strengthStyling(scale);
        });
    }
}

function strengthStyling(scale, color, text, bul) {
    if (bul) {
        scale.style.border = "none";
        scale.style.backgroundColor = color;
        strengthPara.textContent = text.toUpperCase();
    } else {
        scale.style.border = "";
        scale.style.backgroundColor = "";
    }
}

