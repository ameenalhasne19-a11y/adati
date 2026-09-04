const text = document.getElementById("text");
const words = document.getElementById("words");
const chars = document.getElementById("chars");
const noSpaces = document.getElementById("noSpaces");

function update() {
    const value = text.value.trim();

    words.textContent = value ? value.split(/\s+/).length : 0;
    chars.textContent = text.value.length;
    noSpaces.textContent = text.value.replace(/\s/g, "").length;
}

text.addEventListener("input", update);

document.getElementById("clear").onclick = () => {
    text.value = "";
    update();
};

document.getElementById("copy").onclick = async () => {
    if (!text.value) return;

    await navigator.clipboard.writeText(text.value);

    const button = document.getElementById("copy");
    button.textContent = "تم النسخ ✓";

    setTimeout(() => {
        button.textContent = "نسخ النص";
    }, 1500);
};
