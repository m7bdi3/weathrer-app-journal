/* Global Variables */
const apiKey = "c3dabfd2679a4d3f011aba561a6c290f";
const apiUrl = "http://localhost:4000/"
const myZipCode = document.getElementById('zip');
const getMyFeelings = document.getElementById('feelings');
const projectDate = document.getElementById('date');
const projectTemp = document.getElementById('temp');
const projectContent = document.getElementById('content');
const projectCity = document.getElementById('city');
const projectDescription = document.getElementById('description');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
let dateNow = newDate;
// Add event listener on generate button 
const catchError = (error) => console.log(error);

document.getElementById('generate').addEventListener('click', generate);
document.getElementById('reset').addEventListener('click', resetBtn);

// Main function to get the data by using zip Code
function generate() {
    let data = {
        zipCode: myZipCode.value,
        content: getMyFeelings.value,
        date: dateNow
    };

    getZipCode(data.zipCode).then(zipData => {

        if (zipData.cod != 200) {
            return alert(zipData.message)
        }
        data.temp = zipData.main.temp;
        data.city = zipData.name;
        data.description = zipData.weather[0].description;
        postToServer(data);
    }).catch(catchError);
};
//A reset function to reload the page 
function resetBtn() { location.reload() };


async function getZipCode(zipCode) {
    return await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${myZipCode.value}&appid=${apiKey}&units=imperial`)).json();
}



//Add the data to the server 
async function postToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });
    try {
        if (!response.ok) {
            alert('Not successful');
            return;
        }

        response.json().then(data => {
            if (response.ok) {
                updateUi();
            } else {
                alert('Not successful')
            }
        }).catch(catchError)

    } catch (error) {
        catchError(error);
    }
};

// update ui with the information recived
async function updateUi() {
    let response = await fetch(`${apiUrl}getData`, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json'
        }
    });
    try {
        response.json().then(data => {
            projectDate.innerHTML = `Today date is: ${dateNow}`;
            projectTemp.innerHTML = `Today temperature is: ${data.temp}°F`;
            projectContent.innerHTML = `My feeling is: ${data.content}`;
            projectCity.innerHTML = `City: ${data.city}`;
            projectDescription.innerHTML = `Description: ${data.description}`;
            console.log(data);
        }
        ).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}

