let translations = {};
let currentLang = "en";

async function loadTranslations(lang) {
    try {
        // TRUCO: Le agregamos un timestamp falso al final del archivo 
        // para obligar al navegador a descargar siempre la versión más fresca
        const response = await fetch(`./lang/${lang}.json?nocache=${new Date().getTime()}`); 
        
        if (!response.ok) {
            console.error(`🚨 Error al cargar el archivo: ${lang}.json`);
            return;
        }
        
        translations[lang] = await response.json();
        currentLang = lang;
        applyTranslations();
    } catch (error) {
        console.error("🚨 Error de red o JSON inválido:", error);
    }
}

function applyTranslations() {
    const dict = translations[currentLang];
    if (!dict) return;

    // Traducir textos
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    // Traducir placeholders (textos fantasma en formularios)
    document.querySelectorAll("[data-key-placeholder]").forEach(el => {
        const key = el.getAttribute("data-key-placeholder");
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    // Cambiar la etiqueta del menú (EN/ES)
    const currentLangDisplay = document.getElementById("current-lang-display");
    if (currentLangDisplay) {
        currentLangDisplay.innerText = currentLang.toUpperCase();
    }
}

// Función expuesta globalmente por si acaso
window.changeLanguage = function(lang, event) {
    if (event) event.preventDefault();
    
    // Ocultar dropdown al hacer click
    const langDropdown = document.getElementById("lang-dropdown");
    if (langDropdown) langDropdown.classList.add("hidden");

    if (translations[lang]) {
        currentLang = lang;
        applyTranslations();
    } else {
        loadTranslations(lang);
    }
};

// Conectar botones cuando la página cargue
document.addEventListener("DOMContentLoaded", () => {
    const langEnBtn = document.getElementById("lang-en-btn");
    const langEsBtn = document.getElementById("lang-es-btn");

    if (langEnBtn) langEnBtn.addEventListener("click", (e) => window.changeLanguage("en", e));
    if (langEsBtn) langEsBtn.addEventListener("click", (e) => window.changeLanguage("es", e));

    // Cargar idioma inicial
    loadTranslations(currentLang);
});