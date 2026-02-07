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

/*****************************/
// #TODO: make a function to process each amount
// #Should also make a basic class or structure to store pony name, appearance amount, and colors (and more if it's used in other graphs?)
// for now only the 20 first pages because I'm testing
const CONCORDE_AMOUNT = 117;
const AURORA_AMOUNT = 30;
const ROSETTA_AMOUNT = 16;
const ZAMBUKO_AMOUNT = 23;
const WOLFRAM_AMOUNT = 9;

add_pie_chart("Characters appearances (in the first 20 pages)", ["Concorde", "Aurora", "Rosetta", "Zambuko", "Wolfram"], [CONCORDE_AMOUNT, AURORA_AMOUNT, ROSETTA_AMOUNT, ZAMBUKO_AMOUNT, WOLFRAM_AMOUNT], ['#59b5c3', '#fe7330', '#c580d1', "#bdbdbd", "#d1dde7"])

// Add a pie chart
function add_pie_chart(title, labels, values, colors) {
    const card = document.createElement('div');
    card.classList.add("graph-card");
    stats_div.appendChild(card);

    const t = document.createElement('h2');
    t.innerHTML = title;
    card.appendChild(t);

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

    card.appendChild(chart);
}