import { Chart } from 'chart.js'
import { InfiniteSquareWell } from '../../engine/wavefunctions/infinite_square_well'
import { convert } from '../../reference/units'

var sampleCount = 50

let a = 10

let t = 0.0

let chart: Chart = null
let waveFunction = new InfiniteSquareWell()
var startX = 0
var endX = waveFunction.a

let nCount = 6

function updateChart() {
    a = parseFloat((<HTMLInputElement>document.getElementById('aInput')).value)
    waveFunction.a = convert(a, "nm", "m")

    var startX = 0
    var endX = waveFunction.a

    document.getElementById('aValue').innerText = (a).toString()
    document.getElementById('tValue').innerText = (t).toPrecision(3).toString()

    // document.getElementById('x2MeanValue').innerText = (a * a + (1 / (2 * lambda))).toFixed(2).toString()
    // document.getElementById('sigmaValue').innerText = (1 / (2 * lambda)).toFixed(2).toString()

    if (chart == undefined) {
        let ctx = (<HTMLCanvasElement>document.getElementById('chartCanvas')).getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',

            // The data for our dataset
            data: {
                labels: labels(),
                datasets: initialDataset(),
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },

                scales: {
                    yAxes: [{
                        ticks: {
                            max: -16000,
                            min: 16000,
                        }
                    }]
                },
                animation: {
                    duration: 0 // general animation time
                },
                hover: {
                    animationDuration: 0 // duration of animations when hovering an item
                },
                responsiveAnimationDuration: 0 // animation duration after a resize
            }
        })
    } else {
        for (let i = 0; i < chart.data.datasets.length; i++) {
            chart.data.datasets[i].data = sampleWaveFunction(Math.floor(i / 2) + 1, t, i % 2 == 0)
        }
        chart.data.labels = labels()
        chart.update()
    }
}

document.getElementById('aInput').addEventListener('change', () => {
    updateChart()
});

// document.getElementById('nInput').addEventListener('change', () => {
//     updateChart()
// });

function initialDataset() {
    let out = []
    for (let n = 1; n < nCount; n++) {
        out.push({
            data: sampleWaveFunction(n, t, true),
            label: "n=" + n,
            borderColor: "blue",
        })
        out.push({
            data: sampleWaveFunction(n, t, false),
            label: "n=" + n + "imaginary",
            borderColor: "green",
        })

    }
    return out
}

function sampleWaveFunction(n: number, t: number, real: boolean): number[] {
    let out = []
    for (let x = 0; x <= waveFunction.a; x += (waveFunction.a - 0) / sampleCount) {
        let v = waveFunction.WaveFunctionSolution(n, x, t)
        // console.log(n, x, t, v)

        if (real) {
            out.push(v.re)
        } else {
            out.push(v.im)
        }
    }
    return out
}

function labels(): number[] {
    let out = []
    for (let x = 0; x <= waveFunction.a; x += (waveFunction.a - 0) / sampleCount) {
        out.push(x.toPrecision(3))
    }

    return out
}

let timer = setInterval(() => {
    t += .00000000000001
    updateChart()
}, 100)

function pause() {
    clearInterval(timer)
}
document.getElementById("pauseButton").addEventListener("click", () => {
    clearInterval(timer)
})

function reset() {
    t = 0
    waveFunction = new InfiniteSquareWell()
    pause()
}

function start() {
    timer = setInterval(() => {
        t += .00000000000001
        updateChart()
    }, 100)
}

// for (let n = 1; n < 10; n++) {
//     console.log("<tr><td>", n, "</td><td>", waveFunction.E(n).toPrecision(3), "</td><td>", convert(waveFunction.E(n), "J", "meV").toPrecision(5), "</td></tr>")
// }


