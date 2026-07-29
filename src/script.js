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

const windows = document.querySelectorAll(".os-window");

windows.forEach((windowElement) => { // Not calling this "window" because I think that's a base class
    const titleBar = windowElement.querySelector(".title-bar");
    const closeButton = windowElement.querySelector(".close-button");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener("pointerdown", (event) => {
        // Exclude close button from the dragging
        if (event.target.closest(".close-button")) return;

        isDragging = true;

        const rect = windowElement.getBoundingClientRect();

        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        titleBar.setPointerCapture(event.pointerId);

        // Bring the window to the front
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
});