const navigationLinks = document.querySelectorAll(".nav-link[data-view]");
const pageTitle = document.getElementById("page-title");
const dashboardView = document.getElementById("dashboard-view");

const views = {
    dashboard: document.getElementById("dashboard-view"),
    tasks: document.getElementById("tasks-view"),
    focus: document.getElementById("focus-view"),
    statistics: document.getElementById("statistics-view")
};

// Switch between application views.
function showView(viewName) {
    if (!views[viewName]) return;

    Object.entries(views).forEach(([name, element]) => {
        element.classList.toggle("hidden", name !== viewName);
    });

    navigationLinks.forEach(link => {
        const isActive = link.dataset.view === viewName;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    pageTitle.textContent = {
        dashboard: "Dashboard",
        tasks: "My Tasks",
        focus: "Focus",
        statistics: "Statistics"
    }[viewName];

    document.getElementById("sidebar").classList.remove("open");
}

navigationLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showView(link.dataset.view);
    });
});

// Open the focus interface from the dashboard.
document.getElementById("quick-focus").addEventListener("click", () => {
    showView("focus");
});

document.getElementById("focus-dashboard-link").addEventListener("click", () => {
    showView("dashboard");
    document.getElementById("focus-panel").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// The task form will receive its full functionality on Day 2.
document.getElementById("view-all-tasks").addEventListener("click", () => {
    showView("tasks");
});

// Mobile navigation.
document.getElementById("mobile-menu").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("open");
});

// Theme preference.
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    themeIcon.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-theme");

    applyTheme(isDark);

    try {
        localStorage.setItem("focusforge-theme", isDark ? "dark" : "light");
    } catch (error) {
        console.warn("Theme preference could not be saved.", error);
    }
});

try {
    applyTheme(localStorage.getItem("focusforge-theme") === "dark");
} catch {
    applyTheme(false);
}

// Timer presets update the displayed duration.
// Countdown functionality will be implemented on Day 3.
const timerDisplay = document.getElementById("timer-display");
const timerCaption = document.getElementById("timer-caption");
const timerStart = document.getElementById("timer-start");
const timerReset = document.getElementById("timer-reset");
const presetButtons = document.querySelectorAll(".preset-button");

let selectedMinutes = 25;

function displayTimer(minutes) {
    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:00`;
}

presetButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedMinutes = Number(button.dataset.minutes);

        presetButtons.forEach(preset => {
            preset.classList.toggle("active", preset === button);
        });

        displayTimer(selectedMinutes);
        timerCaption.textContent = "Ready when you are";
        timerStart.textContent = "▶ Start session";
    });
});

timerStart.addEventListener("click", () => {
    timerCaption.textContent = "Timer functionality arrives on Day 3";
});

timerReset.addEventListener("click", () => {
    displayTimer(selectedMinutes);
    timerCaption.textContent = "Ready when you are";
    timerStart.textContent = "▶ Start session";
});

console.log("FocusForge dashboard initialized successfully.");