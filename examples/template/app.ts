// import { Chart } from 'chart.js'

// var sampleCount = 100
// var startX = -10
// var endX = 10

// let A = 1
// let a = 1
// let lambda = 1

// let chart: Chart = null

// function updateChart() {
//     a = parseFloat((<HTMLInputElement>document.getElementById('aInput')).value)
//     lambda = parseFloat((<HTMLInputElement>document.getElementById('lambdaInput')).value)

//     A = Math.sqrt(lambda / Math.PI)

//     document.getElementById('aValue').innerText = (a).toString()
//     document.getElementById('lambdaValue').innerText = (lambda).toString()
//     document.getElementById('AValue').innerText = (A).toString()

//     document.getElementById('xMeanValue').innerText = (a).toString()
//     document.getElementById('x2MeanValue').innerText = (a * a + (1 / (2 * lambda))).toFixed(2).toString()
//     document.getElementById('sigmaValue').innerText = (1 / (2 * lambda)).toFixed(2).toString()


//     if (chart == undefined) {
//         let ctx = (<HTMLCanvasElement>document.getElementById('chartCanvas')).getContext('2d');
//         chart = new Chart(ctx, {
//             type: 'line',

//             // The data for our dataset
//             data: {
//                 labels: labels(),
//                 datasets: [{
//                     backgroundColor: 'rgb(2, 117, 216)',
//                     borderColor: 'rgb(2, 117, 216)',
//                     data: sample()
//                 }]
//             },

//             // Configuration options go here
//             options: {
//                 legend: {
//                     display: false
//                 },
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             max: 2,
//                             min: 0,
//                             stepSize: 0.01
//                         }
//                     }]
//                 }

//             }
//         })
//     } else {
//         chart.data.datasets[0].data = sample()
//         chart.update()
//     }
// }

// document.getElementById('aInput').addEventListener('change', () => {
//     updateChart()
// });

// document.getElementById('lambdaInput').addEventListener('change', () => {
//     updateChart()
// });

// function sample(): number[] {
//     let out = []
//     for (let x = startX; x < endX; x += (endX - startX) / sampleCount) {
//         let r = A * Math.exp(-lambda * Math.pow(x - a, 2))
//         out.push(r)
//     }

//     return out
// }

// function labels(): number[] {
//     let out = []
//     for (let x = startX; x < endX; x += (endX - startX) / sampleCount) {
//         out.push(x.toFixed(2))
//     }

//     return out
// }


// updateChart()