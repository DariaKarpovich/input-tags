const but = document.getElementsByTagName('button');
const text = document.getElementById('text');
const tagsArea = document.getElementsByClassName('tags-area')[0];
const modeChange = document.getElementsByTagName('input')[0];

const tag = {
    showTags: () => {
        tagsArea.innerHTML = ''
        for (let a = 0; a < tag.tagsName.length; a++) {
            tagsArea.innerHTML += `<span>${tag.tagsName[a]}<button name="${tag.tagsName[a]}">X</button></span> `;
        }

        for (let j = 1; j < but.length; j++) {
            but[j].onclick = (e) => tag.deleteTag(e.target.name);
        }
    },

    deleteTag: (element) => {
        localStorage.removeItem(element);
        tag.showTags();
    },

    get tagsName() {
        let keys = Object.keys(localStorage);
        let arrTags = [];

        for (let key of keys) {
            arrTags.push(localStorage.getItem(key));
        }
        return arrTags;
    },

    set tagsName(tags) {
        if (tags == '' || tags == ' ') {
            alert('you not input tag');
            return;
        }

        if (tags[tags.length - 1] === ' ') tags = tags.slice(0, -1);
        if (tags[0] === ' ') tags = tags.slice(1);

        let arrNewTags = tags.split(' ');

        for (let i = 0; i < arrNewTags.length; i++) {
            localStorage.setItem(arrNewTags[i], arrNewTags[i]);
        }
    }
};

modeChange.onchange = () => {
    text.disabled = !text.disabled;

    for (let u = 0; u < but.length; u++) {
        but[u].classList.toggle('hide');
    }
};

tag.showTags();

text.oninput = () => text.value = text.value.replace(/\s+/g, ' ');

but[0].onclick = () => {
    tag.tagsName = text.value;
    text.value = '';
    tag.showTags();
};
