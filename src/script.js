/* APP ICON BEHAVIOR */
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', function() {
        if(icon.dataset.internal) {
            createOsWindow({ title: "Internet Marexplorer", url: icon.dataset.internal, left: 100, top: 100 });
        } else if (icon.dataset.external) {
            window.open(icon.dataset.external, "_blank");
        }
    });
});

/* SYSTEM CLOCK */
const clock = document.querySelector("#clock");

function updateClock() {
    clock.textContent = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

updateClock();
setInterval(updateClock, 1000);

/* WINDOWS HANDLING */
function createOsWindow({ title = "Internet Marexplorer", url = "AllOfStardust/", left = 100, top = 100 } = {}) {
    const windowElement = document.createElement("div");
    windowElement.className = "os-window";
    windowElement.style.position = "absolute";
    windowElement.style.left = `${left}px`;
    windowElement.style.top = `${top}px`;

    windowElement.innerHTML = `
        <div class="title-bar">
            <span>${title}</span>
            <button class="close-button">×</button>
        </div>
        <div class="address-bar">Adress<input type="text" value="${url}"></input></div>
        <div class="window-content">
            <iframe src="${url}" style="width: 100%; height: 100%; border: 0;"></iframe>
        </div>
    `;

    document.body.appendChild(windowElement);
    initOsWindow(windowElement);

    return windowElement;
}

function initOsWindow(windowElement) {
    const titleBar = windowElement.querySelector(".title-bar");
    const closeButton = windowElement.querySelector(".close-button");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener("pointerdown", (event) => {
        if (event.target.closest(".close-button")) return;

        isDragging = true;

        const rect = windowElement.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        titleBar.setPointerCapture(event.pointerId);

        windowElement.style.zIndex = Date.now();
    });

    titleBar.addEventListener("pointermove", (event) => {
        if (!isDragging) return;

        windowElement.style.left = `${event.clientX - offsetX}px`;
        windowElement.style.top = `${event.clientY - offsetY}px`;
    });

    titleBar.addEventListener("pointerup", () => {
        isDragging = false;
    });

    titleBar.addEventListener("pointercancel", () => {
        isDragging = false;
    });

    closeButton.addEventListener("click", () => {
        windowElement.remove();
    });
}