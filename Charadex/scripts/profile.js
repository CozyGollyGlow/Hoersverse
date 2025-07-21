const colors_cat = document.getElementById("colors");

function addCategory(id, title, tags = []) {
    const new_cat = document.createElement('div');
    new_cat.classList.add("color-cat");
    new_cat.id = id;

    const cat_title = document.createElement('h2');
    let final_title =
        (tags.includes("fs") ? '<tag class="firestarter">FS</tag>' : '') +
        (tags.includes("sj") ? '<tag class="sunjackers">SJ</tag>' : '') +
        (tags.includes("sd") ? '<tag class="stardust">SD</tag>' : '') +
        title;

    cat_title.innerHTML = final_title
    new_cat.appendChild(cat_title);

    colors_cat.appendChild(new_cat);
}

function addColor(catId, title, hex){
    const parent_cat = document.getElementById(catId);

    const new_color = document.createElement('div');
    new_color.classList.add("color");

    const color_sample = document.createElement('span');
    color_sample.classList.add("color-sample");
    color_sample.style.backgroundColor = hex;
    new_color.appendChild(color_sample)

    color_sample.addEventListener('click', () => {
        navigator.clipboard.writeText(hex).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });

    const color_info = document.createElement('div');
    color_info.classList.add("color-info");
    new_color.appendChild(color_info)

    const color_title = document.createElement('span');
    color_title.classList.add("color-title");
    color_title.innerHTML = title;
    color_info.appendChild(color_title);

    const color_code = document.createElement('span');
    color_code.classList.add("color-codes");
    color_code.innerHTML = hex;
    color_info.appendChild(color_code);

    parent_cat.appendChild(new_color);
}
