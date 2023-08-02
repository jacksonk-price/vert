import Conversion from "./conversion.js";
import helper from "./helper.js";

const App = {
    $: {
        input: document.getElementById('url'),
        convertBtn: document.getElementById('convert-btn')
    },
    bindEvents() {
        this.$.convertBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = this.$.input.value;
            if (url) {
                Conversion.create(this, url);
            }
        });
    },
    disableFormElements() {
        this.$.input.disabled = true;
        this.$.convertBtn.disabled = true;
    },
    enableFormElements() {
        this.$.input.disabled = false;
        this.$.convertBtn.disabled = false;
    },
    init() {
        this.bindEvents();
    }
}

App.init();
