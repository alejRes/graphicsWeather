let speed = [];
let horas = [];
let grafica2 = "";
let nameCity = "";
let myChart = "";
let myChart2 = "";
let myChart3 = "";
let presion = [];
let presionNMar = [];
let presionNTierra = [];
let tempMax = [];
let tempMin = [];
let tempNormal = [];
let senseTermica = [];

console.log(nameCity);
 
document.getElementById("enviar").addEventListener("click", function () {
  
  let nameCity = document.getElementById("meterCiudad").value;
  
  document.getElementById("resultado").innerHTML = "";

 

  tiempo(nameCity);
 
  myChart  = new Chart(document.getElementById("myChart"),  config);
  myChart2 = new Chart(document.getElementById("myChart2"), config2);
  myChart3 = new Chart(document.getElementById("myChart3"), config3);
  
 
});

const tiempo = async (ciudad) => {

  let res = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&units=metric&appid=4d548be3703aebfa1659953c82c4642d`
  );
  let data = await res.json();
 
  sacardatos(data.list);
  document.getElementById("meterCiudad").value = ""
};

function sacardatos(datos) {
  for (let index = 0; index < datos.length; index++) {

    tempMax.push(datos[index].main.temp_max);
    tempMin.push(datos[index].main.temp_min);
    tempNormal.push(datos[index].main.temp);
    speed.push(datos[index].wind.speed);

    horas.push(datos[index].dt_txt);
    presionNMar.push(datos[index].main.sea_level);
    presionNTierra.push(datos[index].main.grnd_level);
  }

}

 
 
const labels = horas;
const data = {
  labels: horas,
  datasets: [
    {
      label: "Viento km/h",
      data: speed,
      borderColor: "blue",
      backgroundColor: "blue",
    },
  ],
};

const labels2 = presionNMar;
const data2 = {
  labels: presionNMar,
  datasets: [
    {
      label: "Presion a nivel del suelo",
      data: presionNTierra,
      borderColor: "blue",
      backgroundColor: "blue",
    },
    {
      label: "Presion a nivel del mar",
      data: presionNMar,
      borderColor: "red",
      backgroundColor: "red",
    },
  ],
};

const labels3 = presionNMar;
const data3 = {
  labels: horas,
  datasets: [
    {
      label: "Temperatura Maxima",
      data: tempMax,
      borderColor: "red",
      backgroundColor: "red",
    },
    {
      label: "Temperatura Minima",
      data: tempMin,
      borderColor: "green",
      backgroundColor: "green",
    },
    {
      label: "Temperatura Normal",
      data: tempNormal,
      borderColor: "yellow",
      backgroundColor: "yellow",
    },
    {
      label: "Temperatura Normal",
      data: horas,
      borderColor: "blue",
      backgroundColor: "blue",
    },
  ],
};

const config3 = {
  type: "bar",
  data: data3,
  options: {
    ///
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: `${nameCity}`,
      },
    },
  },
};

const config2 = {
  type: "bar",
  data: data2,
  options: {
    ///
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: `${nameCity}`,
      },
    },
  },
};

const config = {
  type: "bar",
  data: data,
  options: {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: `${nameCity}`,
      },
    },
  },
};
