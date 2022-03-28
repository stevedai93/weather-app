console.log('client side js is loading')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


// fetch('http://localhost:3000/weather?address=san%20diego').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.temperature)
//             console.log(data.feelslike)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message1.textContent = data.error
            } else {
                console.log(data.temperature)
                console.log(data.feelslike)
                message2.textContent = data.temperature + ' ' + data.feelslike + ' ' + data.weather_descriptions
            }
            })
    })

    console.log(location)
})