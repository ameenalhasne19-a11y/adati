function openTool(toolName) {
  document.querySelector(".tools-grid").classList.add("hidden");
  document.querySelector(".hero").classList.add("hidden");
  document.getElementById("toolArea").classList.remove("hidden");

  document.querySelectorAll(".tool").forEach(tool => {
    tool.classList.add("hidden");
  });

  document.getElementById(toolName + "Tool").classList.remove("hidden");

  window.scrollTo({
    top: document.getElementById("toolArea").offsetTop - 20,
    behavior: "smooth"
  });
}

function closeTool() {
  document.getElementById("toolArea").classList.add("hidden");
  document.querySelector(".tools-grid").classList.remove("hidden");
  document.querySelector(".hero").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const counterText = document.getElementById("counterText");

counterText.addEventListener("input", updateCounter);

function updateCounter() {
  const text = counterText.value;

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const chars = text.length;
  const noSpaces = text.replace(/\s/g, "").length;

  document.getElementById("words").textContent = words;
  document.getElementById("chars").textContent = chars;
  document.getElementById("noSpaces").textContent = noSpaces;
}

function cleanText() {
  const textarea = document.getElementById("cleanText");

  textarea.value = textarea.value
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

function changeCase(type) {
  const textarea = document.getElementById("caseText");

  if (type === "upper") {
    textarea.value = textarea.value.toUpperCase();
  } else {
    textarea.value = textarea.value.toLowerCase();
  }
}

function updateLength() {
  const length = document.getElementById("passwordLength").value;
  document.getElementById("lengthValue").textContent = length;
}

function generatePassword() {
  const length = Number(
    document.getElementById("passwordLength").value
  );

  let characters = "";

  if (document.getElementById("upper").checked) {
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (document.getElementById("lower").checked) {
    characters += "abcdefghijklmnopqrstuvwxyz";
  }

  if (document.getElementById("numbers").checked) {
    characters += "0123456789";
  }

  if (document.getElementById("symbols").checked) {
    characters += "!@#$%^&*()-_=+[]{}";
  }

  if (!characters) {
    alert("اختر نوعًا واحدًا على الأقل.");
    return;
  }

  let password = "";

  const randomArray = new Uint32Array(length);
  crypto.getRandomValues(randomArray);

  for (let i = 0; i < length; i++) {
    password += characters[randomArray[i] % characters.length];
  }

  document.getElementById("passwordResult").value = password;
}

function copyText(id) {
  const textarea = document.getElementById(id);

  if (!textarea.value) {
    return;
  }

  navigator.clipboard.writeText(textarea.value)
    .then(() => {
      alert("تم النسخ بنجاح ✓");
    })
    .catch(() => {
      textarea.select();
      document.execCommand("copy");
      alert("تم النسخ بنجاح ✓");
    });
}

function clearText(id) {
  document.getElementById(id).value = "";

  if (id === "counterText") {
    updateCounter();
  }
}

generatePassword();
