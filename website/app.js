/* Global Variables */

////////////////////////////////////////////////////
const key = "c3dabfd2679a4d3f011aba561a6c290f";
const url = "http://localhost:3000/"
const locationZipCode = document.getElementById('zip');
const Feelings = document.getElementById('feelings');
const weatherDate = document.getElementById('date');
const weatherTemp = document.getElementById('temp');
const weatherContent = document.getElementById('content');
const weatherCity = document.getElementById('city');
const weatherDescription = document.getElementById('description');
const feelingHolder = document.querySelector('holder_feel');
//////////////////////////////////////////////////////


// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

let error = 'The code throw an error of ';

let data = {
    InfoLocZip: locationZipCode.value,
    date: newDate
};
let fetchInfo = async (InfoLocZip) => {
    return await (await (fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${locationZipCode.value}&appid=${key}&units=imperial`))).json();
}

let fetchData = () => {
    fetchInfo(data.InfoLocZip).then(data => {
        data.temp = data.main.temp;
        data.city = data.name;
        data.description = data.weather[0].description;
        weatherPost(data)
    });
//Added the loading icon and make it disappear after 0.3 sec

    setTimeout(() => {
        if (document.getElementById('lds-ripple').style.display = 'none') {
            return document.getElementById('lds-ripple').style.display = 'inline-block'
        }
    }, 300);
    
    setTimeout(() => {
        if ((document.getElementById('holder__entry').style.display = 'none')) {
            return document.getElementById('lds-ripple').style.display = 'none', document.getElementById('holder__entry').style.display = 'block';
        }
    }, 1000)
    
};

document.getElementById('generate').addEventListener('click', fetchData);
// Reload the page

document.getElementById('reset').addEventListener('click', function () { location.reload() });





async function weatherPost(data) {
    let response = await fetch(`${url}postData`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });
    try {
        response.json().then(data => {
            if (response) {
                weatherGet();
            } else {
                alert('Not successful')
            }
        }).catch(error)

    } catch (error) {
        console.error();
    }
};


async function weatherGet() {

    let response = await fetch(`${url}getData`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json'
        }
    });
    try {
        response.json().then(data => {
            //convert to Celcius
            let c = (5 / 9) * ((data.temp) - 32);
            weatherDate.innerHTML = `Today date is: ${newDate}`;
            //Round the temp to the nearest number 
            weatherTemp.innerHTML = `Today temperature is: ${Math.round(data.temp)} °F (${Math.round(c)} °C)`;
            weatherContent.innerHTML = `My feeling is: ${Feelings.value}`;
            weatherCity.innerHTML = `City: ${data.city}`;
            weatherDescription.innerHTML = `Description: ${data.description}`;
        }
        ).catch(error);
    } catch (error) {
        console.error();
    }
}