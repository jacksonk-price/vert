const inputForm = document.getElementById('inputForm');
const convertBtn = document.getElementById('convertSubmit');
const inputUrl = document.getElementById('urlinput');
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
    let base64 = result["mp3_base"];
    hideElem(spinner);
    createDownloadButton(base64);
    createConvertAnotherBtn();
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

const removeError = () => {
    const error = document.getElementById('error');
    if (error?.parentNode) {
        showElem(convertBtn);
        error.parentNode.removeChild(error);
    }
}

const resetForm = () => { 
    hideElem(downloadBtn);
    hideElem(convertAnotherBtn);
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

const createDownloadButton = (base64) => {
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
        downloadBase64AsMP3(base64);
    });
}

const downloadBase64AsMP3 = (base64) => {
    const linkSource = "data:audio/mp3;base64," + base64;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = "Untitled.mp3";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

inputForm.addEventListener('submit', handleSubmit);
inputUrl.addEventListener('click', removeError);

