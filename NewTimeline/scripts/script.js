const tlStart = 1980; // Start of the timeline (will be the offset of everything)
const container = document.getElementById("timeline");
const scale = 25; // pixel per time unit
container.style.setProperty("--scale", scale + "px");

// Generate decades
const axis = document.getElementById("axis");
const decadeStep = 10; // 10 time units = decade
const offset = 15; // Offset of the whole timeline
container.style.setProperty("--offset", offset + "px");

// Displaying the Stardust timeline by default
displayTimeline(tl_stardust)

// Display all flows of the timeline in argument
function displayTimeline(timeline){
    container.innerHTML = "";

    // Get maximum date in the timeline
    const maxTime = Math.max(
        ...timeline.flatMap(f =>
            f.events.map(e => e.end ?? e.start)
        )
    );
    container.style.width = ((maxTime - tlStart + 1) * scale) + "px";

    for (let t = 0; t <= maxTime - tlStart; t += decadeStep) {
        const tick = document.createElement("div");
        tick.className = "tick";
        tick.style.left = (t * scale + offset   ) + "px";
        tick.textContent = t + tlStart; // or "1900", etc.

        axis.appendChild(tick);
    }

    timeline.forEach(flow => {
        const row = document.createElement("div");
        row.className = "row";

        const rowName = document.createElement("p");
        rowName.className = "row-name";
        rowName.innerHTML = `${flow.name}`

        // Clicking makes the parent row collapse
        rowName.addEventListener("click", () => {
            row.classList.toggle("collapsed");
        });

        row.appendChild(rowName)

        if(flow.lifetime) {
            const rowLifetime = document.createElement("div");
            rowLifetime.className = "row-lifetime";

            const lifetimeX = (flow.lifetime.start - tlStart) * scale + offset;
            rowLifetime.style.left = lifetimeX + "px";
            if(flow.lifetime.end){
                rowLifetime.style.width = ((flow.lifetime.end - flow.lifetime.start) * scale) + "px";
            } else {
                rowLifetime.style.width = ((maxTime - flow.lifetime.start) * scale) + "px";
            }

            rowLifetime.innerHTML = flow.lifetime.label;
            rowLifetime.style.background = flow.color;
            row.appendChild(rowLifetime)
        }

        const rowEvents = document.createElement("div"); // Durable events
        const rowPoints = document.createElement("div"); // Punctual events
        rowEvents.className = "row-events";
        rowPoints.className = "row-events";
        row.appendChild(rowEvents)
        row.appendChild(rowPoints)

        flow.events.forEach(e => {
            const x = (e.start - tlStart) * scale + offset;

            if (e.end !== undefined && e.end !== e.start) {
                // Event during in the time
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";

                eventDiv.style.left = x + "px";
                eventDiv.style.width = ((e.end - e.start) * scale) + "px";
                eventDiv.style.background = flow.color;
                eventDiv.textContent = e.label;

                rowEvents.appendChild(eventDiv);
            } else {
                // Punctual event
                const dot = document.createElement("div");
                dot.className = "event-dot";
                dot.style.left = x + "px";

                const label = document.createElement("span");
                label.className = "event-dot-label";
                label.textContent = e.label;

                dot.appendChild(label);
                rowPoints.appendChild(dot);
            }
        });

        container.appendChild(row);
    });
}

// Handling the toggle between Stardust and Sunjackers
const toggle = document.getElementById('toggle');
const left = document.getElementById('label-left');
const right = document.getElementById('label-right');

function updateToggle() {
    if (toggle.checked) { // Sunjackers
        left.classList.remove('active');
        right.classList.add('active');
        document.body.classList.add('sunjackers');
        displayTimeline(tl_sunjackers);
    } else { // Stardust
        left.classList.add('active');
        right.classList.remove('active');
        document.body.classList.remove('sunjackers');
        displayTimeline(tl_stardust);
    }
}

toggle.addEventListener('change', updateToggle);
left.addEventListener('click', () => { toggle.checked = false; update(); });
right.addEventListener('click', () => { toggle.checked = true; update(); });