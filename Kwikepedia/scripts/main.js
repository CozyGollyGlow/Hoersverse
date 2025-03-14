// Get all main headings of the page and display then in the left-panel div
function get_list_headings(){
    let i = 0;
    const left_panel = document.getElementById('left-panel');
    const top_panel = document.getElementById('top-panel');
    const headings = document.getElementsByClassName('content-headings');

    const title = document.createElement("h3");
    title.textContent = "Contents"
    left_panel.appendChild(title);

    const top_heading = document.createElement("a");
    top_heading.textContent = "(Top)";
    top_heading.href = "#top-panel";
    top_heading.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById(top_panel.id).scrollIntoView({ behavior: "smooth" });
    });
    left_panel.appendChild(top_heading);

    // Convert HTMLCollection to an array
    Array.from(headings).forEach(h => {
        h.id = "heading-" + i;

        const content_heading = document.createElement("a");
        content_heading.textContent = h.textContent;
        content_heading.href = `#${h.id}`;
        content_heading.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById(h.id).scrollIntoView({ behavior: "smooth" });
        });

        left_panel.appendChild(content_heading);

        i += 1;
    });
}

// Inject the top panel into the page
function add_top_panel(){
    const top_panel_HTML = `
    <img id="logo" src="../../assets/logo.png">
    <input id="search-input" type="text">
    <button id="search-button" type="button" name="button">SEARCH</button>
    `;

    document.getElementById("top-panel").innerHTML = top_panel_HTML;
};

add_top_panel();
get_list_headings();
