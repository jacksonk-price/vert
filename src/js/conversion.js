import Requester from "./requester.js";
import Helper from "./helper.js";

export const ConversionFactory = (application) => {
    const app = application;
    const _uniqueId = Helper.uniqueId();
    const _isConversionsHidden = () => document.getElementById('converter').hasAttribute('hidden');
    const _getDownloadButton = () => document.getElementById(_uniqueId);
    const create = (url) => {
        app.disableFormElements();
        _showLoading();
        Requester.post("https://vert-api.onrender.com/conversion/create", {
            "conversion" : {
                "input_url" : url
            }
        })
        .then(response => _handleResponse(response))
        .catch(error => _handleError(error))
        .finally(() => app.enableFormElements())
    }
    const _handleResponse = (response) => {
        _removeLoading();
        Helper.insertHTML(document.getElementById('conversion-tank'),
            `<div class="conversion-item">
                <div class="option-wrap">
                    <p id="status" class="video-status animate__bounceIn" data-status="success">Complete</p>
                    <p id="name" class="video-name">${Helper.truncateText(response["video_title"], 50)}</p>
                </div>
                <button id="${_uniqueId}" class="secondary-btn"><i class="fa-solid fa-download"></i>Download</button>
            </div>`
        );
        _setDownloadListener(response);
    }
    const _handleError = (error) => {
        _removeLoading();
        Helper.insertHTML(document.getElementById('conversion-tank'),
            `<div class="conversion-item">
                <div class="option-wrap">
                    <p id="status" class="video-status" data-status="error">Error</p>
                    <p id="name" class="video-name">Something went wrong. Please refresh and try again.</p>
                </div>
            </div>`
        );
    }
    const _showLoading = () => {
        if (_isConversionsHidden()) {
            document.getElementById('converter').removeAttribute('hidden');
        }
        Helper.insertHTML(document.getElementById('conversion-tank'),
            `<div id="loading-${_uniqueId}" class="conversion-item animate__animated animate__fadeIn">
                <p>Loading...</p>
                <i class="fa-solid fa-spinner fa-spin"></i>
            </div>`
        );
    }
    const _removeLoading = () => {
        const loadingElement = document.getElementById('loading-' + _uniqueId);
        if (loadingElement) {
            loadingElement.remove();
        }
    }
    const _setDownloadListener = (response) => {
        const downloadButton = _getDownloadButton();
        downloadButton.addEventListener('click', () => {
            _downloadBase64(response["wav_base64"], response["video_title"]);
        });
    }
    const _downloadBase64 = (base64, video_title) => {
        const bytes = Helper.base64ToUint8Array(base64);
        const blob = Helper.uint8ArrayToBlob(bytes);
        const downloadLink = document.createElement('a');

        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${video_title}.wav`;
        downloadLink.click();
        downloadLink.remove();
    }

    return { create }
}