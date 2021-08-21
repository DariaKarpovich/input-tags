const btnAdd = document.querySelector('.add');
const text = document.getElementById('text');
const tagsArea = document.getElementsByClassName('tags-area')[0];
const modeChange = document.getElementsByTagName('input')[0];

class Tag {
    deleteTag(element) {
        localStorage.removeItem(element);
    }

    addTag() {
        this.tags = text.value;
        text.value = '';
    }

    get tags() {
        return Object.values(localStorage);
    }

    set tags(el) {
        if (el == '' || el == ' ') {
            alert('you not input tag');
            return;
        }

        if (el[el.length - 1] === ' ') el = el.slice(0, -1);
        if (el[0] === ' ') el = el.slice(1);

        let tagArr = el.split(' ');
        tagArr.forEach(el => localStorage.setItem(el, el));
    }
}

class Render {
    constructor(tag) {
        this.tag = tag;
    }

    toggleReadOnly() {
        text.disabled = !text.disabled;
        btnAdd.disabled = !btnAdd.disabled;
        Array.from(this.btn).forEach(el => el.classList.toggle('hide'));
    }

    get btn() {
        return document.querySelectorAll('.btn-del');
    }

    renderTags() {
        let reducer = (acc, value) => `<span>${value}<button name="${value}" class="btn-del">X</button></span> ` + acc;
        tagsArea.innerHTML = this.tag.tags.reduce(reducer, '');
        this.createBtnDel(this.btn);
    }

    createBtnDel() {
        for (let b of this.btn) {
            b.onclick = (e) => {
                this.tag.deleteTag(e.target.name);
                this.renderTags();
            };
        }
    }
}

const tag = new Tag();
const render = new Render(tag);
render.renderTags();

text.oninput = () => text.value = text.value.replace(/\s+/g, ' ');
modeChange.addEventListener('click', () => render.toggleReadOnly());

btnAdd.onclick = () => {
    tag.addTag();
    render.renderTags();
};