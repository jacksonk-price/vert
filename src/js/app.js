import { ConversionFactory } from "./conversion.js";
import Helper from "./helper.js";

const App = {
    $: {
        input: document.getElementById('url'),
        convertBtn: document.getElementById('convert-btn')
    },
    bindEvents() {
        App.$.convertBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = App.$.input.value;
            if (Helper.validYtUrl(url)) {
                const conversion = ConversionFactory(App);
                conversion.create(url);
            }
        });
    },
    disableFormElements() {
        App.$.input.disabled = true;
        App.$.convertBtn.disabled = true;
    },
    enableFormElements() {
        App.$.input.disabled = false;
        App.$.convertBtn.disabled = false;
    },
    init() {
        App.bindEvents();
    }
}

App.init();
