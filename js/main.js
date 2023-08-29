// search input 

let searchInput = document.getElementById("search")

// Today variables 
let todayName = document.getElementById("todayName")
let todayNumber = document.getElementById("todayNum")
let todayMonth = document.getElementById("todayMonth")
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let todayConditionImg = document.getElementById("todayImg")
let todayConditionText = document.getElementById("todayCondition")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")

// next data 
let tommorowDay = document.getElementsByClassName("tommorowName")
let tommorowConditionImg = document.getElementsByClassName("tommorowImg")
let tommorowMaxTemp = document.getElementsByClassName("maxTemp")
let tommorowMinTemp = document.getElementsByClassName("minTemp")

let tommorowConditionText = document.getElementsByClassName("tommorowCondition")



async function getData(cityName)
{
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


function displayData(data)
{
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})

    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
}





function displayTommorowData(data)
{
    let forecast = data.forecast.forecastday

    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecast[i+1].date)

        tommorowDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})

        tommorowMaxTemp[i].innerHTML = forecast[i+1].day.maxtemp_c

        tommorowMinTemp[i].innerHTML = forecast[i+1].day.mintemp_c

        tommorowConditionImg[i].setAttribute("src",forecast[i+1].day.condition.icon)

        tommorowConditionText[i].innerHTML = forecast[i+1].day.condition.text
    }
}






async function startApp(city="cairo"){

    let weatherData = await getData(city)
    if(!weatherData.error)
    {
        displayData(weatherData)
        displayTommorowData(weatherData)
    }
}

startApp()


searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})