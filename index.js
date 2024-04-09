const restCountriesByNameURL = "https://restcountries.com/v3.1/name/"

const currencyDiv = document.getElementById('country-currency')
const formElement = document.querySelector('form')
const input = document.getElementById('currency-search')
const sectionElement = document.getElementById('currency')

formElement.onsubmit = fetchCountryData

async function fetchCountryData(e) {
    e.preventDefault()
    const searchTerm = input.value.trim()
    if(!searchTerm) {
        return
    }
    input.value = ""
    const countryNameURL = restCountriesByNameURL + searchTerm
    try {
        const res = await fetch(countryNameURL)  
        if(res.status !== 200) {
            throw new Error('Country not found')
        }
        const countryData = await res.json()
        renderCountryCurrency(countryData)
    } catch(err) {
        renderErrorInfo(err)
    }
}

const renderErrorInfo = (err) => {
    sectionElement.innerHTML = ""
    const h2 = document.createElement('h2')
    h2.textContent = err.message
    sectionElement.appendChild(h2)
}

function renderCountryCurrency(countryData){
    console.log(countryData)
    const currencyName = Object.values(countryData[0].currencies)[0].name
    console.log(currencyName)
    sectionElement.innerHTML = ""
    const h2 = document.createElement('h2')
    h2.textContent = `${currencyName}`
    sectionElement.appendChild(h2)
}