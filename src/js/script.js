const inputForm = document.getElementById('inputForm');
const convertBtn = document.getElementById('convertSubmit');
const inputUrl = document.getElementById('urlinput');
const inputLabel = document.getElementById('input-label');
const successElem = document.getElementById('success');
const convertAnotherBtn = document.getElementById('convertAnother');
const spinner = document.getElementById('spin');
let downloadBtn;

async function handleSubmit(e) {
    toggleElem(convertBtn);
    toggleElem(spinner);
    e.preventDefault();
    const formData = {
        "conversion": {
            "input_url": inputUrl.value
        }
    }
    const response = await fetchConversionResult(formData);
    const result = await response.json();

    if (response.ok) {
        handleConversionSuccess(result);
    } else {
        handleConversionError(result);
    }
}

async function fetchConversionResult(formData) {
    return await fetch('http://127.0.0.1:3000/conversion/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
}

function handleConversionSuccess(result) {
    createDownloadButton(result["wav_base64"], result["video_title"]);
    displaySuccess(result["video_title"]);
    toggleElem(convertAnotherBtn);
    toggleElem(spinner);
    toggleElem(inputUrl);
    toggleElem(inputLabel);
}

function handleConversionError(result) {
    toggleElem(spinner);
    displayError(result["message"]);
}

function toggleElem(elem) {
    elem.classList.toggle('hide');
}

function displayError(message) {
    let divAppend = document.getElementById('options');
    const errorP = document.createElement("p");
    const newContent = document.createTextNode(message + '.' + ' Please try again.');
    errorP.classList.add('error-text');
    errorP.setAttribute('id', 'error')
    errorP.appendChild(newContent);

    divAppend.append(errorP);
}

function displaySuccess(message) {
    toggleElem(successElem);
    successElem.innerText = message;
}

function removeError() {
    let error = document.getElementById('error');
    if (error?.parentNode) {
        toggleElem(convertBtn);
        inputUrl.value = '';
        error.parentNode.removeChild(error);
    }
}

function removeSuccess() {
    let success = document.getElementById('success');
    success.remove();
}

function resetForm() { 
    document.getElementById('downloadSubmit').remove();
    toggleElem(convertAnotherBtn);
    toggleElem(successElem);
    toggleElem(inputUrl);
    toggleElem(inputLabel);
    toggleElem(convertBtn);
    inputUrl.value = '';
    successElem.innerText = '';
}

function createDownloadButton(base64, video_title) {
    const buttonOptionDiv = document.getElementById("options");
    downloadBtn = document.createElement('button');
    const text = document.createTextNode("Download");
    downloadBtn.appendChild(text);
    downloadBtn.classList.add("bg-slate-200", "hover:bg-slate-400", "text-gray-800", "font-bold", "py-2", "px-4", "mt-2", "rounded");
    downloadBtn.setAttribute("id", "downloadSubmit");
    downloadBtn.setAttribute("type", "button");
    buttonOptionDiv.insertBefore(downloadBtn, convertAnotherBtn);

    downloadBtn.addEventListener('click', () => {
        downloadBase64AsWAV(base64, video_title);
    });
}

function downloadBase64AsWAV(base64, video_title) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const arrayBuffer = bytes.buffer;

    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${video_title}.wav`;

    downloadLink.click();
    downloadLink.remove();
}

convertAnotherBtn.addEventListener('click', resetForm);
inputForm.addEventListener('submit', handleSubmit);
inputUrl.addEventListener('click', removeError);

