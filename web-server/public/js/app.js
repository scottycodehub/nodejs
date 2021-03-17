
console.log('Client side javascript file is loaded!')


const weathersearch = document.querySelector('form')
const search = document.querySelector("input")
const msg1 = document.querySelector("#msg1")
const msg2 = document.querySelector("#msg2")



weathersearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/report?city=' + city).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
            }
                
            else{
                console.log(data)
                msg1.textContent = 'Report: ' + data.city + ' (Latitude: ' + data.latitude + ' Longitude: ' + data.longitude + ')'
                msg2.textContent = 'Details: ' + data.description + ' with temperature: ' + data.temperature + ' It feels like: ' + data.feelslike 
            }
               
        })
    })
})