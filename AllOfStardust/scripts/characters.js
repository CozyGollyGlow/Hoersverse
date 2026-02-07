const concorde_data = {
    name: "Concorde",
    color: '#59b5c3',
    panel_count: 281
};

const aurora_data = {
    name: "Aurora",
    color: '#ffa356',
    panel_count: 86
};

const rosetta_data = {
    name: "Rosetta",
    color: '#8d2bc0',
    panel_count: 52
};

const zambuko_data = {
    name: "Zambuko",
    color: '#d7d7d7',
    panel_count: 44
};

const wolfram_data = {
    name: "Wolfram",
    color: '#9fbacd',
    panel_count: 42
};

const sequoia_data = {
    name: "Sequoia",
    color: '#80a987',
    panel_count: 24
};

const characters = [
    concorde_data,
    aurora_data,
    rosetta_data,
    zambuko_data,
    wolfram_data,
    sequoia_data
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