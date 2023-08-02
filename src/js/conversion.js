import requester from "./requester.js";
import helper from "./helper.js";

const Conversion = {
    create(app, url) {
        app.disableFormElements();

        this.showLoading();

        requester.post("http://127.0.0.1:3000/conversion/create", {
            "conversion" : {
                "input_url" : url
            }
        })
        .then(response => Conversion.handleResponse(response))
        .catch(error => Conversion.handleError(error))
        .finally(() => app.enableFormElements())
    },
    handleResponse(response) {
        this.removeLoading();
        helper.insertHTML(document.getElementById('conversion-tank'),
        `<div class="conversion-item animate__animated animate__headShake">
            <p id="name" class="video-name">${helper.truncateText(response["video_title"], 30)}</p>
            <p id="status" class="video-status" data-status="success">Complete</p>
            <p id="size" class="download-size">17MB</p>
            <button class="secondary-btn">Download</button>
        </div>`
        )
    },
    handleError(error) {
        console.log(error);
    },
    showLoading() {
        helper.insertHTML(document.getElementById('conversion-tank'),
            `<div class="conversion-item animate__animated animate__fadeIn" data-conversion="loading">
                <p>Loading...</p>
                <i class="fa-solid fa-spinner fa-spin"></i>
            </div>`
        );
    },
    removeLoading() {
        const loadingElement = document.querySelector('[data-conversion="loading"]');
        if (loadingElement) {
            loadingElement.classList.add('animate__fadeOut');
            loadingElement.remove();
        }
    }
}

export default Conversion;