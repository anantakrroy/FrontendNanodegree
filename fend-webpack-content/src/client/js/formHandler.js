export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=700084,in&appid=b2715585670e356f6a77d0d47b451a7b')
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            document.getElementById('results').innerHTML = data.main.temp
        })
}

