const API_KEY = "87289b53fb416d0279259d6fb06c3672"

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃ `
        city.innerText = data.name
        })
}

function onGeoError(){
    alert("No geolocation for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)