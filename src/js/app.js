import requester from "./requester.js";

const App = {
    $: {
        input: document.getElementById('url'),
        convertBtn: document.getElementById('convert-btn')
    },
    handleResponse(response) {
        console.log(response)
    },
    handleError(error) {
        console.log(error);
    },
    bindEvents() {
        App.$.convertBtn.addEventListener('click', function(e) {
            e.preventDefault();
            requester.post("http://127.0.0.1:3000/conversion/create", {
                "conversion" : {
                    "input_url" : App.$.input.value
                }
            })
            .then(response => App.handleResponse(response))
            .catch(error => App.handleError(error))
        })
    },
    init() {
        App.bindEvents();
    }
}

App.init();