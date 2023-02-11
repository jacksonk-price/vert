const inputForm = document.getElementById('inputForm');
const convertBtn = document.getElementById('convertSubmit');
const inputUrl = document.getElementById('urlinput');
let downloadBtn;
let convertAnotherBtn;
let spinner = document.getElementById('spin');
let videoTitle;
let base64;

inputForm.addEventListener('submit', async function (e) {
    hideElem(convertBtn);
    showElem(spinner);
    e.preventDefault();
    const formData = new FormData(inputForm).entries()
    const response = await fetch('http://127.0.0.1:3000/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const result = await response.json();
    if (result["status"] === "success"){
        base64 = result["mp3_base"]
        hideElem(spinner);
        displayDownloadButton();
        displayConvertAnotherBtn();
    } else {
        hideElem(spinner);
        displayError(result["message"]);
    }
});

inputUrl.addEventListener('click', function() {
    let error = document.getElementById('error');
    if (error != null) {
        showElem(convertBtn);
        error.remove();
    }
})

function displayDownloadButton(){
    const buttonOptionDiv = document.getElementById("btn-option");
    downloadBtn = document.createElement('button');
    const text = document.createTextNode("Download");
    downloadBtn.appendChild(text);
    downloadBtn.classList.add('btn');
    downloadBtn.classList.add('btn-download');
    downloadBtn.setAttribute("id", "downloadSubmit");
    downloadBtn.setAttribute("type", "button");
    buttonOptionDiv.appendChild(downloadBtn);

    downloadBtn.addEventListener('click', function(){
        downloadBase64AsMP3(base64);
    })
}

function hideElem(elem){
    elem.classList.remove('active');
    elem.classList.add('hide');
}

function showElem(elem){                            
    elem.classList.add('active');
    elem.classList.remove('hide');
}

function downloadBase64AsMP3(base64) {
    const linkSource = "data:audio/mp3;base64," + base64;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = "Untitled.mp3";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function displayError(message) {
    divAppend = document.getElementById('btn-option');
    const newP = document.createElement("p");
    newP.classList.add('error-text');
    newP.setAttribute('id', 'error')
    const newContent = document.createTextNode(message + '.' + ' Please try again.');
    newP.appendChild(newContent);

    divAppend.append(newP);
}

function displayConvertAnotherBtn() {
    divAppend = document.getElementById('btn-option');
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

function resetForm(){ 
    console.log('resetting form');
    hideElem(downloadBtn);
    hideElem(convertAnotherBtn);
    showElem(convertBtn);
    inputUrl.value = '';
}

