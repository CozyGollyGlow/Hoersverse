/*** Constants / config ***/
const CONFIG = {
    tlStart: 1980,
    decadeStep: 10,
    offset: 15,
    defaultScale: 23,
};

/*** Variables ***/
let scale = 0;
let currentTimeline = tl_stardust;

/*** DOM elements ***/
const container = document.getElementById("timeline");
container.style.setProperty("--offset", CONFIG.offset + "px");

const axis = document.getElementById("axis");

const scaleSlider = document.getElementById("scale-slider");
const scaleLabel = document.getElementById("scale-label");

const toggle = document.getElementById("toggle");
const labelLeft = document.getElementById("label-left");
const labelRight = document.getElementById("label-right");

/*** Setting timeline scale ***/
function setScale(v) {
    scale = v;
    scaleLabel.textContent = v;
    container.style.setProperty("--scale", scale + "px");
    displayTimeline(currentTimeline);
}

scaleSlider.addEventListener("input", () => setScale(scaleSlider.value));
setScale(CONFIG.defaultScale);


/*** Timeline rendering ***/
// Get the maximum date in the timeline among all flows
function getMaxTime(timeline) {
    return Math.max(...timeline.flatMap(f => f.events.map(e => e.end ?? e.start)));
}

// Render the axis at the top of the timeline
function renderAxis(maxTime) {
    axis.innerHTML = "";
    for (let t = 0; t <= maxTime - CONFIG.tlStart; t += CONFIG.decadeStep) {
        const tick = document.createElement("div");
        tick.className = "tick";
        tick.style.left = (t * scale + CONFIG.offset) + "px";
        tick.textContent = t + CONFIG.tlStart;
        axis.appendChild(tick);
    }
}

// Render the lifetime bar of every flow
function renderLifetime(flow, row, maxTime) {
    if (!flow.lifetime) return;

    const bar = document.createElement("div");
    bar.className = "row-lifetime";
    bar.innerHTML = flow.lifetime.label;
    bar.style.background = flow.color;
    bar.style.left = (flow.lifetime.start - CONFIG.tlStart) * scale + CONFIG.offset + "px";
    bar.style.width = (
        (flow.lifetime.end ?? maxTime) - flow.lifetime.start
    ) * scale + "px";

    row.appendChild(bar);
}

// Render durable events (that have a start and an end)
function renderDurableEvent(e, color) {
    const div = document.createElement("div");
    div.className = "event";
    div.style.left       = (e.start - CONFIG.tlStart) * scale + CONFIG.offset + "px";
    div.style.width      = (e.end - e.start) * scale + "px";
    div.style.background = color;
    div.textContent      = e.label;
    return div;
}

// Render punctual events
function renderPointEvent(e) {
    const dot = document.createElement("div");
    dot.className = "event-dot";
    dot.style.left = (e.start - CONFIG.tlStart) * scale + CONFIG.offset + "px";

    const label = document.createElement("span");
    label.className = "event-dot-label";
    label.textContent = e.label;

    dot.appendChild(label);
    return dot;
}

// Render a single flow (its lifetime and its events)
function renderFlow(flow, maxTime) {
    const row = document.createElement("div");
    row.className = "row";

    const rowName = document.createElement("p");
    rowName.className = "row-name";
    rowName.innerHTML = flow.name;
    rowName.addEventListener("click", () => row.classList.toggle("collapsed"));
    row.appendChild(rowName);

    renderLifetime(flow, row, maxTime);

    const durableContainer  = document.createElement("div");
    const pointContainer    = document.createElement("div");
    durableContainer.className = "row-events";
    pointContainer.className   = "row-events";

    flow.events.forEach(e => {
        if (e.end !== undefined && e.end !== e.start) {
            durableContainer.appendChild(renderDurableEvent(e, flow.color));
        } else {
            pointContainer.appendChild(renderPointEvent(e));
        }
    });

    row.appendChild(durableContainer);
    row.appendChild(pointContainer);
    return row;
}

// Display a whole timeline (rendering the axis and the flows)
function displayTimeline(timeline) {
    currentTimeline = timeline;

    container.querySelectorAll(".row").forEach(r => r.remove());

    const maxTime = getMaxTime(timeline) + CONFIG.offset;
    container.style.width = ((maxTime - CONFIG.tlStart + 1) * scale) + "px";

    renderAxis(maxTime);
    timeline.forEach(flow => container.appendChild(renderFlow(flow, maxTime)));
}

/*** Toggling between the two timelines ***/
function setActiveTimeline(useSunjackers) {
    toggle.checked = useSunjackers;
    labelLeft.classList.toggle("active",  !useSunjackers);
    labelRight.classList.toggle("active",  useSunjackers);
    document.body.classList.toggle("sunjackers", useSunjackers);
    displayTimeline(useSunjackers ? tl_sunjackers : tl_stardust);
}

toggle.addEventListener("change", () => setActiveTimeline(toggle.checked));
labelLeft.addEventListener("click",  () => setActiveTimeline(false));
labelRight.addEventListener("click", () => setActiveTimeline(true));