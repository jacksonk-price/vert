import { ConversionFactory } from "./conversion.js";

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
                const conversion = ConversionFactory(App);
                conversion.create(url);
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
