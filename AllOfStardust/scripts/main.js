/*********************************/
const pages_div = document.getElementById("pages");
const stats_div = document.getElementById("stats");

const stats_btn = document.getElementById("stats-btn");
stats_btn.addEventListener("click", toggle_stats);

// Hide pages to show stats and vice versa
function toggle_stats() {
    if (stats_div.classList.contains("inactive")) {
        pages_div.classList.add("inactive");
        stats_div.classList.remove("inactive");
    } else {
        pages_div.classList.remove("inactive");
        stats_div.classList.add("inactive");
    }
}

add_pie_chart("Characters appearances", characters_array.names, characters_array.panel_counts, characters_array.colors, 8, "Changeling shenanigans count twice!");
add_info_card("As of page 55, there are 434 panels in the whole comic!", 4);
add_bar_chart("Pages", pages.labels, pages.panel_amounts, 12);

// Add info card
function add_info_card(text, grid_span) {
    const card = document.createElement('div');
    card.classList.add("info-card", "card");
    card.style.gridColumn = `span ${grid_span}`;
    card.innerHTML = text;
    stats_div.appendChild(card);
}

// Add a pie chart
function add_pie_chart(title, labels, values, colors, grid_span, notes = "") {
    const card = document.createElement('div');
    card.classList.add("graph-card", "card");
    card.style.gridColumn = `span ${grid_span}`;
    stats_div.appendChild(card);

    const t = document.createElement('h2');
    t.innerHTML = title;
    card.appendChild(t);

    const chart_wrapper = document.createElement('div');
    chart_wrapper.classList.add("chart-wrapper");
    card.appendChild(chart_wrapper);

    const chart = document.createElement('canvas');
    new Chart(chart, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                datalabels: {
                    formatter: (v, ctx) => {
                        const sum = ctx.chart.data.datasets[0].data
                            .reduce((a, b) => a + b, 0);
                        return ((v / sum) * 100).toFixed(1) + '%';
                    },
                    color: '#fff'
                }
            }
        }
    });

    chart_wrapper.appendChild(chart);

    if(notes != ""){
        const n = document.createElement('span');
        n.innerHTML = notes;
        card.appendChild(n);
    }
}

function add_bar_chart(title, labels, values, grid_span, notes = ""){
    const card = document.createElement('div');
    card.classList.add("graph-card", "card");
    card.style.gridColumn = `span ${grid_span}`;
    stats_div.appendChild(card);

    const chart_wrapper = document.createElement('div');
    chart_wrapper.classList.add("chart-wrapper");
    card.appendChild(chart_wrapper);

    const chart = document.createElement('canvas');
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: values
            }]
        }
    });

    chart_wrapper.appendChild(chart);

    if(notes != ""){
        const n = document.createElement('span');
        n.innerHTML = notes;
        card.appendChild(n);
    }
}