// Get all main headings of the page and display then in the left-panel div
function get_list_headings(){
    let i = 0;
    const left_panel = document.getElementById('left-panel');
    const headings = document.getElementsByClassName('content-headings');

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

get_list_headings();
