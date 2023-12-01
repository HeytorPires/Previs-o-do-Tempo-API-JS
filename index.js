let Cidade = "";


//API de Bandeira
const APIpaisURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?"



// Função para Puxar o valor do input para usar no Get da API
document.getElementById("search").addEventListener("click", function () {
    let inputCidade = document.getElementById("city-input").value;
    Cidade = inputCidade;

    // Remover a class d "hide" dos elementos ao clicar em pesquisar
    setTimeout(() => {
    let Hide = document.querySelectorAll(".hide");
    Hide.forEach(function (Elemento) {
        Elemento.classList.remove("hide");
    });
    }, 1000);
    // API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Cidade}&appid=4266c371550f53788f2b02d3e6311ae1&lang=pt_br`)
        .then(Resposta => Resposta.json())
        .then(Corpo => {
            console.log(Corpo);
           
            

            // Declaração para ícone da situação do tempo
            const DescricaoClima = Corpo.weather[0].description;
            let country = Corpo.sys.country;
            let ExibirCidade = Corpo.name
            console.log(ExibirCidade)

            //Transformar Sigla para minuscula para conseguir pegar imagem na web
            let transCountry = country.toLowerCase()
            let umidade = Corpo.main.humidity;
            let PullWeather = Corpo.main.temp;
            let MaxWeather = Corpo.main.temp_max;
            let MinWeather = Corpo.main.temp_min;
            let WindSpeed = Corpo.wind.speed;
            let icon = Corpo.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
            let weatherIconElement = document.getElementById("weather-icon");
            let WindSpeedtag = document.querySelector("#wind span")
            let umidadeTag = document.querySelector("#umidity span")
            let BandeiraPais = document.querySelector("#country")
            let URLCountry = `https://flagcdn.com/16x12/${transCountry}.png`
            
            

            // Puxando função de Clima
            ArrumandoTemperatura(PullWeather);
            ArrumandoTemperaturaMax(MaxWeather);
            ArrumandoTemperaturaMin(MinWeather);

            // Teste de Resultado no Console
            console.log("Descrição do Clima:", DescricaoClima);
            console.log("Clima atual:", ClimaAtual);
            console.log("Máxima:", TemperaturaMaxima);
            console.log("Mínima:", TemperaturaMinima);

            // Inserindo informações
            BandeiraPais.src = URLCountry
            document.getElementById("city").innerHTML = ExibirCidade;
            document.getElementById("temperature").innerHTML = ClimaAtual;
            weatherIconElement.src = iconUrl
            WindSpeedtag.innerHTML = WindSpeed + " m/s";
            umidadeTag.innerHTML = umidade
            document.getElementById("description").innerHTML = DescricaoClima;
            document.body.style.backgroundImage = `url("${apiUnsplash + Cidade}")`
            // Adicionando a bandeira do país
            let countryFlagElement = document.getElementById("country");
            countryFlagElement.setAttribute("class", `flag-icon flag-icon-${country.toLowerCase()}`);
        })
        .catch(error => {
            console.error('Erro ao obter dados meteorológicos:', error);
        });
});

// Função para converter o valor do clima de Kelvin para Celsius e mostrar apenas 2 dígitos
function ArrumandoTemperatura(pullWeather) {
    pullWeather -= 273.15;
    ClimaAtual = pullWeather.toFixed(2);
}

function ArrumandoTemperaturaMax(maxWeather) {
    maxWeather -= 273.15;
    TemperaturaMaxima = maxWeather.toFixed(2);
}

function ArrumandoTemperaturaMin(minWeather) {
    minWeather -= 273.15;
    TemperaturaMinima = minWeather.toFixed(2);
}
