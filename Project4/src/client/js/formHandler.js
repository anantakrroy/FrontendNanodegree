function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (Client.checkValidURL(formText)) {
        console.log(`::: Form Submitted ::: with value : ${formText}`)
        fetch('http://localhost:8080/classify', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url : formText})
        })
            .then(res => res.json())
            .then(function (res) {
                document.getElementById('results').innerHTML = res.categories
            })
    } else {
        alert('Enter valid url!')
    }
}

export { handleSubmit }
