let content = document.createElement('div');
content.setAttribute('class','container');
content.setAttribute("id", "hidden")
content.innerHTML += `<h1 class="text-center" id="title">RESTCOUNTRIES USING API</h1>`

let row = document.createElement('div');
row.setAttribute('class','row');

async function getCountries(){
    let rest = fetch("https://restcountries.com/v2/all")
    .then((data) =>data.json()).then((data1) =>{
        for(let i=0;i<data1.length;i++){
            const Column1 = document.createElement("div");
            Column1.setAttribute("class", "col-sm-6 col-md-4 col-lg-4 col-xl-4");
            Column1.setAttribute('id','col');

            const card1 = document.createElement("div");
            card1.setAttribute("class", "card h-100 ");

            const card2 = document.createElement("div");
            card2.setAttribute("class", "card text-black text-center");

            card2.innerHTML = ` 
            <div class="card-header">
                <h5 class="card-title" style='text-align:center'>${data1[i].name} </h5>
            </div>
            <img src="${data1[i].flag}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="card-text">
                    <h5 class="card-title">Capital : ${data1[i].capital}</h5>
                    <h5 class="card-title"> Region : ${data1[i].region}</h5>
                    <h5 class="card-title">Country Code : ${data1[i].alpha3Code}</h5>
                </div>
            </div>`

            const button = document.createElement("button");
            button.classList.add("btn", "btn-primary");
            button.setAttribute('id','btn1')
            button.textContent = "Click for Weather";

            card1.append(card2);
            card2.append(button);
            Column1.append(card1);
            row.append(Column1);

            button.addEventListener("click", weatherReport);

            async function weatherReport() {
                const weather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=33&lon=65&appid=ea7700c23a178b997160292f22af8960');
                const weatherData = await weather.json();
                document.getElementById("hidden").innerHTML=``;

                const Container2 = document.createElement("div");
                Container2.setAttribute("class", "container");
                document.body.append(Container2);

                let Row2 = document.createElement("div");
                Row2.classList.add("row", "g-3", "container");
                Container2.append(Row2);

                let Column2 = document.createElement("div");
                Column2.setAttribute("class", "col-sm-6 col-md-4 col-lg-4 col-xl-4");
                Column2.setAttribute('id','col');
                Row2.append(Column2);

                let card3 = document.createElement("div");
                card3.setAttribute("class", "card h-100 text-black text-center");
                card3.innerHTML = ` 
                <div class="card-header">
                    <h5 class="card-title" style='text-align:center'>${data1[i].name} </h5>
                </div>
                <img src="${data1[i].flag}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-text">Temperature: ${weatherData.main.temp}</h6>
                <h6 class="card-text">Pressure: ${weatherData.main.pressure}</h6>
                <h6 class="card-text">Temp-Max: ${weatherData.main.temp_max}</h6>
                    <h6 class="card-text">Temp-Min: ${weatherData.main.temp_min}</h6>
                </div>`;

                Column2.append(card3);

                let button1 = document.createElement("button");
                button1.setAttribute("class", "btn btn-primary");
                button1.innerText = "Return Back";
                card3.append(button1);

                button1.addEventListener("click", () => {
                    location.reload()
                })
            }
            
        }
    })
}

getCountries();

content.append(row);
document.body.append(content);