
////////////////////////////////////////////////////
/* Global Variables */
//////////////////////////////////////////////////// 

const apikey = "&appid=c3dabfd2679a4d3f011aba561a6c290f&units=imperial";
const host = "http://localhost:3000/"
const apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?q="
const weatherDate = document.getElementById('date');
const weatherTemp = document.getElementById('temp');
const weatherContent = document.getElementById('content');
const weatherCity = document.getElementById('city');
const weatherDescription = document.getElementById('description');
const feelingHolder = document.querySelector('holder_feel');
let error = 'The code throw an error of ';

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
//////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
//                        Main Event Listeners                          //
//////////////////////////////////////////////////////////////////////////
document.getElementById('generate').addEventListener('click', main);
document.getElementById('feelings','zip').addEventListener('keypress', enterKeyPressed);
document.getElementById('zip').addEventListener('keypress', enterKeyPressed);

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
      // console.log("Enter key is pressed");
       return main();
    } else {
       return false;
    }
 }
// Reload the page

document.getElementById('reset').addEventListener('click', function () { location.reload() });

//////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
//                           Main Function                              //
/////////////////////////////////////////////////////////////////////////

function main() {
    if (isNaN(document.getElementById('zip').value)) {

        return btnAction2()
    } else {
        return btnAction()
    }
}
function btnAction2(e) {
    const locationCode = document.getElementById('zip').value
    const Feelings = document.getElementById('feelings').value
    ////      Function to Fetcg Data from API and posting it to server Function      ////
    fetchAndPost(apiUrl2, locationCode, apikey)
        .then(data => {
           // console.log(data);
            let dataFetched = {
                date: newDate,
                temp: data.main.temp,
                content: Feelings,
                city: data.name,
                description: data.weather[0].description
            };
            postweather(`/postData`, dataFetched);

        }).then(() => weatherGet())
        .then(
            //Added the loading icon and making it disappear after 0.3 sec

            setTimeout(() => {
                if (document.getElementById('lds-ripple').style.display = 'none') {
                    return document.getElementById('lds-ripple').style.display = 'inline-block'
                }
            }, 300),

            setTimeout(() => {
                if ((document.getElementById('holder__entry').style.display = 'none')) {
                    return document.getElementById('lds-ripple').style.display = 'none', document.getElementById('holder__entry').style.display = 'block';
                }
            }, 1000))
}

function btnAction(e) {
    const locationCode = document.getElementById('zip').value
    const Feelings = document.getElementById('feelings').value
    ////      Function to Fetcg Data from API and posting it to server Function      ////
    fetchAndPost(apiUrl1, locationCode, apikey)
        .then(data => {
           // console.log(data);
            let dataFetched = {
                date: newDate,
                temp: data.main.temp,
                content: Feelings,
                city: data.name,
                description: data.weather[0].description
            };
            postweather(`/postData`, dataFetched);

        }).then(() => weatherGet())
        .then(
            //Added the loading icon and making it disappear after 0.3 sec

            setTimeout(() => {
                if (document.getElementById('lds-ripple').style.display = 'none') {
                    return document.getElementById('lds-ripple').style.display = 'inline-block'
                }
            }, 300),

            setTimeout(() => {
                if ((document.getElementById('holder__entry').style.display = 'none')) {
                    return document.getElementById('lds-ripple').style.display = 'none', document.getElementById('holder__entry').style.display = 'block';
                }
            }, 1000))
}



const fetchAndPost = async (apiUrl1, zipCode, apiKey) => {

    const res = await fetch(apiUrl1 + zipCode + apiKey);
    try {
        const data = await res.json();
       // console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const postweather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
       // console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}
//                  Update application by given data from server                          //

const weatherGet = async () => {
    const req = await fetch('/getData');
    try {
        const dataGet = await req.json();
      //  console.log(dataGet);
        //convert to Celcius
        let c = (5 / 9) * ((dataGet.temp) - 32);
        weatherDate.innerHTML = `Today date is: ${newDate}`;
        //Round the temp to the nearest number 
        weatherTemp.innerHTML = `Today temperature is: ${Math.round(dataGet.temp)} °F (${Math.round(c)} °C)`;
        weatherContent.innerHTML = `My feeling is: ${dataGet.content}`;
        weatherCity.innerHTML = `City: ${dataGet.city}`;
        weatherDescription.innerHTML = `Description: ${dataGet.description}`;
    } catch (error) {
        console.error()
    }
}
