function handleClassify(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('urlString').value
    let reqObj = { url: formText }
    let errorElem = document.getElementById('errorText')
    let fetchAlert = document.getElementsByClassName('fetchAlert')[0]
    let resultDiv = document.getElementById('results')
    if (Client.isValidURL(formText)) {
        console.log(`::: Form Submitted ::: with value : ${formText}`)
        fetchAlert.style.display = 'block'
        errorElem.style.display = 'none'
        fetch('/classifyArticle', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqObj)
        })
            .then(res => res.json())
            .then(function (res) {
                fetchAlert.style.display = 'none'
                resultDiv.innerHTML = ''
                console.log('Response from API - ', res)
                res['categories'].forEach((elem, idx) => {
                    let listItem = document.createElement('p')
                    listItem.innerHTML = `
                    ${idx + 1}. <strong class='item'>Label</strong> : ${elem.label}
                    <strong class='item'>Code</strong> : ${elem.code} 
                    <strong class='item'>Confidence</strong> : ${elem.confidence}
                    `
                    resultDiv.appendChild(listItem)
                })
            })
    } else {
        errorElem.innerHTML = 'Enter valid URL!!!'
    }
}

module.exports = handleClassify
