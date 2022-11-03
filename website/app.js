/* Global Variables */
const apiKey = "c3dabfd2679a4d3f011aba561a6c290f";
const apiUrl = "http://localhost:4000/"
const zipLoc = document.getElementById('zip');
const myFeelings = document.getElementById('feelings');
const projectDate = document.getElementById('date');
const projectTemp = document.getElementById('temp');
const projectContent = document.getElementById('content');
const projectCity = document.getElementById('city');
const projectDescription = document.getElementById('description');
const feelingHolder = document.querySelector('holder_feel');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
let dateNow = newDate;
// Add event listener on generate button 

document.getElementById('generate').addEventListener('click', generate);
document.getElementById('reset').addEventListener('click', resetBtn);
function generate() {
    let data = {
        InfoLocZip: zipLoc.value,
        content: myFeelings.value,
        date: dateNow
    };

    getInfo(data.InfoLocZip).then(infoData => {
        data.temp = infoData.main.temp;
        data.city = infoData.name;
        data.description = infoData.weather[0].description;
        postProject(data);
    });
//Added the loading icon and make it disappear after 0.3 sec
    setTimeout(() => {
        if (document.getElementById('lds-ripple').style.display = 'none') {
        return document.getElementById('lds-ripple').style.display = 'inline-block'
    }},300);

    setTimeout(() => {
        if ((document.getElementById('holder__entry').style.display = 'none')){
        return document.getElementById('lds-ripple').style.display = 'none', document.getElementById('holder__entry').style.display = 'block';
    }}, 1000)

};
// Reload the page
function resetBtn() { location.reload() };

async function getInfo(InfoLocZip) {
    return await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipLoc.value}&appid=${apiKey}&units=imperial`)).json();
}

async function postProject(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });
    try {
        response.json().then(data => {
            if (response) {
                changeLayout();
            } else {
                alert('Not successful')
            }
        }).catch(console.log(error))

    } catch (error) {
        console.log(error);
    }
};


async function changeLayout() {
    
    let response = await fetch(`${apiUrl}getData`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json'
        }
    });
    try {
        response.json().then(data => {
            //convert to Celcius
            let c = (5/9) * ((data.temp) - 32 );
            projectDate.innerHTML = `Today date is: ${dateNow}`;
            //Round the temp to the nearest number 
            projectTemp.innerHTML = `Today temperature is: ${Math.round(data.temp)} °F (${Math.round(c)} °C)` ;
            projectContent.innerHTML = `My feeling is: ${data.content}`;
            projectCity.innerHTML = `City: ${data.city}`;
            projectDescription.innerHTML = `Description: ${data.description}`;
        }
        ).catch(console.log(error));
    } catch (error) {
        console.log(error);
    }
}

