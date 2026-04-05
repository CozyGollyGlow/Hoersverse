// Filter inline functions to define timelines
const getFlows = (...ids) => flows.filter(f => ids.includes(f.id));

const flows = [
    {
        id: "world_stardust",
        name: "World Events (Stardust)",
        color: "#808080",
        events: [
            { start: 2010, label: "Return of Princess Luna" },
            { start: 2036, label: "Twilight elected Prime Minister" },
            { start: 2045, label: "Launch of Stardust 21" }
        ]
    },
    {
        id: "world_sunjackers",
        name: "World Events (Sunjackers)",
        color: "#808080",
        events: [
            { start: 2010, label: "Return of Princess Luna" },
            { start: 2037, label: "The Sundown" },
            { start: 2077, label: "Start of the Sunjackers" }
        ]
    },
    {
        id: "spitfire",
        name: "Spitfire",
        color: "#ffa500",
        lifetime: { start: 1982, label: "Born November 13th, 1982" },
        events: [
            { start: 2008, end: 2014, label: "Captain of the Wonderbolt" }
        ]
    },
    {
        id: "concorde_stardust",
        name: "Concorde",
        color: "#d1f0ff",
        lifetime: { start: 2017, label: "Born December 17th, 2017" },
        events: [
            { start: 2029, label: "Gets their cutie mark" },
            { start: 2038, label: "Kwadube Observatory Visit" },
            { start: 2035, end: 2038.88, label: "University" },
            { start: 2039, end: 2044, label: "EASA Astronaut Group 42 Training" },
            { start: 2044.12, end: 2064, label: "EASA Astronaut" }
        ]
    },
    {
        id: "concorde_sunjackers",
        name: "Concorde",
        color: "#d1f0ff",
        lifetime: { start: 2017, label: "Born December 17th, 2017" },
        events: [
            { start: 2029, label: "Gets their cutie mark" },
            { start: 2038, label: "Kwadube Observatory Visit" },
            { start: 2035, end: 2038.88, label: "University" }
        ]
    },
    {
        id: "aurora",
        name: "Aurora",
        color: "#ffe49d",
        lifetime: { start: 2015, label: "Birth date unknown (~2015 ?)" },
        events: [
            { start: 2044.12, end: 2064, label: "EASA Astronaut" }
        ]
    },
    {
        id: "rosetta",
        name: "Rosetta",
        color: "#ce99e9",
        lifetime: { start: 2003, label: "Birth date unknown (~2003 ?)" },
        events: [
            { start: 2038, label: "Kwadube Observatory Visit" },
            { start: 2044.12, end: 2064, label: "EASA Astronaut" }
        ]
    },
    {
        id: "zambuko",
        name: "Zambuko",
        color: "#d8d8d8",
        lifetime: { start: 2014, label: "Birth date unknown (~2014 ?)" },
        events: [
            { start: 2044.12, end: 2064, label: "EASA Astronaut" }
        ]
    },
    {
        id: "wolfram",
        name: "Wolfram",
        color: "#9fbacd",
        lifetime: { start: 2005, label: "Birth date unknown (~2005 ?)" },
        events: [
            { start: 2044.12, end: 2064, label: "EASA Astronaut" }
        ]
    },
    {
        id: "atom",
        name: "Atom Smasher",
        color: "#35c965",
        lifetime: { start: 2052, label: "Born in 2052" },
        events: [
            { start: 2052.5, label: "Death of their mother" },
        ]
    },
    {
        id: "code",
        name: "Rainbow Code",
        color: "#e4c993",
        lifetime: { start: 2042, label: "Birth date estimated to 2042" },
        events: [
            { start: 2052.5, label: "Death of their mother" },
        ]
    },
    {
        id: "candy",
        name: "Candy Chip",
        color: "#ffb9d6",
        lifetime: { start: 2052, label: "Birth date unknown" },
        events: [
        ]
    },
    {
        id: "throttle",
        name: "Throttle Track",
        color: "#58abfe",
        lifetime: { start: 2052, label: "Birth date unknown" },
        events: [
        ]
    },
    {
        id: "jump",
        name: "Jump Cannon",
        color: "#ffc062",
        lifetime: { start: 2052, label: "Birth date unknown" },
        events: [
        ]
    }
];

const tl_stardust = getFlows("world_stardust", "spitfire", "concorde_stardust", "aurora", "rosetta", "zambuko", "wolfram");
const tl_sunjackers = getFlows("world_sunjackers", "spitfire", "concorde_sunjackers", "atom", "code", "candy", "throttle", "jump");
