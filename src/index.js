const btnAdd = document.querySelector('.add');
const text = document.getElementById('text');
const tagsArea = document.getElementsByClassName('tags-area')[0];
const modeChange = document.getElementsByTagName('input')[0];

class Tag {
    deleteTag(element) {
        localStorage.removeItem(element);
    }

    addTag(el) {
        if (el == '' || el == ' ') {
            alert('you not input tag');
            return;
        }

        let tagArr = el.trim().split(' ');
        tagArr.forEach(el => localStorage.setItem(el, el));
    }

    get tags() {
        return Object.values(localStorage);
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
    tag.addTag(text.value);
    text.value = '';
    render.renderTags();
};
