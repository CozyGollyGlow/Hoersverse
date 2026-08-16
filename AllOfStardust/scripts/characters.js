const concorde_data = {
    name: "Concorde",
    color: '#59b5c3',
    panel_count: 300
};

const aurora_data = {
    name: "Aurora",
    color: '#ffa356',
    panel_count: 90
};

const rosetta_data = {
    name: "Rosetta",
    color: '#8d2bc0',
    panel_count: 65
};

const zambuko_data = {
    name: "Zambuko",
    color: '#d7d7d7',
    panel_count: 50
};

const wolfram_data = {
    name: "Wolfram",
    color: '#9fbacd',
    panel_count: 45
};

const sequoia_data = {
    name: "Sequoia",
    color: '#80a987',
    panel_count: 24
};

const redwood_data = {
    name: "Redwood",
    color: '#a96e44',
    panel_count: 19
};

const charger_data = {
    name: "Charger",
    color: '#e4dbb2',
    panel_count: 33
};

const dusky_data = {
    name: "Dusky",
    color: '#daaec5',
    panel_count: 26
};


const characters = [
    concorde_data,
    aurora_data,
    rosetta_data,
    zambuko_data,
    wolfram_data,
    sequoia_data,
    redwood_data,
    charger_data,
    dusky_data
];

const characters_array = {
    list: characters,

    get names() {
        return this.list.map(c => c.name);
    },

    get colors() {
        return this.list.map(c => c.color);
    },

    get panel_counts() {
        return this.list.map(c => c.panel_count);
    }
};