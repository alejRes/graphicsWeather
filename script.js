let tempActu = []
let tempMax = []
let tempMin = []
let tempFeel = []
let ejeY = []
let txtCity;
var myChart;

document.getElementById('btnSend').addEventListener('click', () => {
    txtCity = document.getElementById('city').value
    getResource(txtCity).then(data => data.map(timeStep => Char(timeStep)))
        .then(() => {
            paintChar()
            document.getElementById('city').value=""
        })
})

const getResource = async (city) => {

    tempActu=[]
    tempFeel=[]
    tempMax=[]
    tempMin=[]
    ejeY = []
    let res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=15&appid=4d548be3703aebfa1659953c82c4642d`)
    let data = await res.json();
    console.log(data)
    return data.list

}

const Char = ({ dt_txt, main }) => {
    tempActu.push(main.temp)
    tempMax.push(main.temp_max)
    tempMin.push(main.temp_min)
    tempFeel.push(main.feels_like)
    ejeY.push(dt_txt)
}

const paintChar = () => {
    if(myChart){
        myChart.destroy();
    }

    const labels = ejeY
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'temp Actual',
                data: tempActu,
                borderColor: 'red',
                backgroundColor: ('red'),
            },
            {
                label: 'temperatura máxima',
                data: tempMax,
                borderColor: 'blue',
                backgroundColor: 'blue'
            },
            {
                label: 'temperatura minima',
                data: tempMin,
                borderColor: 'aqua',
                backgroundColor: 'aqua'
            },
            {
                label: 'Sensacion térmica',
                data: tempFeel,
                borderColor: 'pink',
                backgroundColor: 'pink'
            }
        ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            
            elements: {
                bar: {
                    borderColor: 'black',
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `Temperaturas de ${txtCity}`
                }
            }
        },
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    return myChart
}