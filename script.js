const inputForm = document.getElementById('inputForm');
const convertBtn = document.getElementById('convertSubmit');
const inputUrl = document.getElementById('urlinput');
const inputLabel = document.getElementById('input-label');
let spinner = document.getElementById('spin');
let downloadBtn;
let convertAnotherBtn;

async function handleSubmit(e) {
    hideElem(convertBtn);
    showElem(spinner);
    e.preventDefault();
    const formData = new FormData(inputForm).entries();
    const response = await fetchConversionResult(formData);
    const result = await response.json();

    if (result["status"] === "success") {
        handleConversionSuccess(result);
    } else {
        handleConversionError(result);
    }
}

async function fetchConversionResult(formData) {
    return await fetch('http://127.0.0.1:3000/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });
}

function handleConversionSuccess(result) {
    let base64 = result["wav_base64"];
    hideElem(spinner);
    createDownloadButton(base64, result["video_title"]);
    createConvertAnotherBtn();
    displaySuccess(result["video_title"]);
    hideElem(inputUrl);
    hideElem(inputLabel);
}

function handleConversionError(result) {
    hideElem(spinner);
    displayError(result["message"]);
}

const hideElem = (elem) => {
    elem.classList.remove('active');
    elem.classList.add('hide');
};

const showElem = (elem) => {                            
    elem.classList.add('active');
    elem.classList.remove('hide');
};

const displayError = (message) => {
    divAppend = document.getElementById('options');
    const errorP = document.createElement("p");
    errorP.classList.add('error-text');
    errorP.setAttribute('id', 'error')
    const newContent = document.createTextNode(message + '.' + ' Please try again.');
    errorP.appendChild(newContent);

    divAppend.append(errorP);
}

const displaySuccess = (message) => {
    divAppend = document.getElementById('success-container');
    const successP = document.createElement("p");
    successP.classList.add('success-text');
    successP.setAttribute('id', 'success');
    successP.innerText = message;


    divAppend.append(successP);
}

const removeError = () => {
    const error = document.getElementById('error');
    if (error?.parentNode) {
        showElem(convertBtn);
        error.parentNode.removeChild(error);
    }
}

const removeSuccess = () => {
    const success = document.getElementById('success');
    if (success?.parentNode) {
        showElem(convertBtn);
        success.parentNode.removeChild(success);
    }
}

const resetForm = () => { 
    hideElem(downloadBtn);
    hideElem(convertAnotherBtn);
    hideElem(document.getElementById('success'));
    showElem(inputUrl);
    showElem(inputLabel);
    showElem(convertBtn);
    inputUrl.value = '';
};

const createConvertAnotherBtn = () => {
    divAppend = document.getElementById('options');
    convertAnotherBtn = document.createElement('button');
    convertAnotherBtn.classList.add('btn');
    convertAnotherBtn.classList.add('btn-primary');
    convertAnotherBtn.setAttribute('id', 'convertAnother');
    convertAnotherBtn.setAttribute("type", "button");
    const btnContent = document.createTextNode('Convert another');
    convertAnotherBtn.appendChild(btnContent);

    divAppend.append(convertAnotherBtn);

    convertAnotherBtn.addEventListener('click', resetForm);
}

const createDownloadButton = (base64, video_title) => {
    const buttonOptionDiv = document.getElementById("options");
    downloadBtn = document.createElement('button');
    const text = document.createTextNode("Download");
    downloadBtn.appendChild(text);
    downloadBtn.classList.add('btn');
    downloadBtn.classList.add('btn-download');
    downloadBtn.setAttribute("id", "downloadSubmit");
    downloadBtn.setAttribute("type", "button");
    buttonOptionDiv.appendChild(downloadBtn);

    downloadBtn.addEventListener('click', () => {
        downloadBase64AsWAV(base64, video_title);
    });
}

const downloadBase64AsWAV = (base64, video_title) => {
    const linkSource = "data:audio/wav;base64," + base64;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = `${video_title}.wav`;
    document.body.appendChild(downloadLink);

    downloadLink.click();
    document.body.removeChild(downloadLink);
}

inputForm.addEventListener('submit', handleSubmit);
inputUrl.addEventListener('click', removeError);

