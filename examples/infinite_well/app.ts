import { Chart } from 'chart.js'
import { InfiniteSquareWell } from '../../engine/wavefunctions/infinite_square_well'
import { convert } from '../../reference/units'
import { HBar } from '../../reference/constants'

var fps = 10
var sampleCount = 50
var deltaT = 0.00000000000001
let nCount = 5
let singleState = false

let t = 0.0

let chart: Chart = null
let waveFunction = new InfiniteSquareWell()

function updateChart() {

    let a = parseFloat((<HTMLInputElement>document.getElementById('aInput')).value)
    if (waveFunction.a != convert(a, "nm", "m")) {
        waveFunction.a = convert(a, "nm", "m")
        updateTable()
    }


    let m = parseFloat((<HTMLInputElement>document.getElementById('mInput')).value)
    if (waveFunction.m != m * 1e-32) {
        waveFunction.m = m * 1e-32
        updateTable()
    }

    if (nCount != parseInt((<HTMLInputElement>document.getElementById('nInput')).value)) {
        nCount = parseInt((<HTMLInputElement>document.getElementById('nInput')).value)
        chart.data.labels = labels()
        chart.data.datasets = initialDataset()
        updateTable()
    }

    if (singleState != (<HTMLInputElement>document.getElementById("singleState")).checked) {
        singleState = (<HTMLInputElement>document.getElementById("singleState")).checked
        chart.data.labels = labels()
        chart.data.datasets = initialDataset()
        updateTable()
    }

    if (sampleCount != parseInt((<HTMLInputElement>document.getElementById('sampleCountInput')).value)) {
        sampleCount = parseInt((<HTMLInputElement>document.getElementById('sampleCountInput')).value)
        chart.data.labels = labels()
        chart.data.datasets = initialDataset()
        updateTable()
    }

    let deltaTIn = parseFloat((<HTMLInputElement>document.getElementById('dtInput')).value)
    deltaT = deltaTIn * 1E-15

    if (fps != parseFloat((<HTMLInputElement>document.getElementById('fpsInput')).value)) {
        fps = parseFloat((<HTMLInputElement>document.getElementById('fpsInput')).value)
        pause();
        start();
    }

    document.getElementById('aValue').innerText = (waveFunction.a / 1.0E-9).toString()
    document.getElementById('mValue').innerText = (m).toString()
    document.getElementById('nValue').innerText = (nCount).toString()
    document.getElementById('tValue').innerText = (t).toPrecision(3).toString()
    document.getElementById('dtValue').innerText = (deltaTIn).toString()
    document.getElementById('fpsValue').innerText = (fps).toString()
    document.getElementById('sampleCountValue').innerText = (sampleCount).toString()
    document.getElementById('dtValue').innerText = (deltaTIn).toString()
    document.getElementById('fpsValue').innerText = (fps).toString()


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
                    display: true
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
        if (singleState) {
            chart.data.datasets[0].data = sampleWaveFunction(nCount, t, true)
            chart.data.datasets[1].data = sampleWaveFunction(nCount, t, false)
        } else {
            for (let i = 0; i < chart.data.datasets.length; i++) {
                chart.data.datasets[i].data = sampleWaveFunction(Math.floor(i / 2) + 1, t, i % 2 == 0)
            }
        }
        chart.data.labels = labels()
        chart.update()
    }
}

function initialDataset() {
    let out = []

    if (singleState) {
        out.push({
            data: sampleWaveFunction(nCount, t, true),
            label: "n=" + nCount + ", real",
            borderColor: "blue",
        })
        out.push({
            data: sampleWaveFunction(nCount, t, false),
            label: "n=" + nCount + ", imaginary",
            borderColor: "green",
        })

        return out
    }

    for (let n = 1; n <= nCount; n++) {
        out.push({
            data: sampleWaveFunction(n, t, true),
            label: "n=" + n + ", real",
            borderColor: "blue",
        })
        out.push({
            data: sampleWaveFunction(n, t, false),
            label: "n=" + n + ", imaginary",
            borderColor: "green",
        })
    }

    return out
}

function sampleWaveFunction(n: number, t: number, real: boolean): number[] {
    let out = []
    for (let x = 0; x <= waveFunction.a; x += (waveFunction.a - 0) / sampleCount) {
        let v = waveFunction.WaveFunctionSolution(n, x, t)

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
    t += deltaT
    updateChart()
}, 1000 / fps)

function pause() {
    clearInterval(timer)
}

document.getElementById("pauseButton").addEventListener("click", () => pause())
document.getElementById("playButton").addEventListener("click", () => start())
document.getElementById("resetButton").addEventListener("click", () => {
    window.location.reload()
})

document.getElementById("aInput").addEventListener("change", () => {
    let a = parseFloat((<HTMLInputElement>document.getElementById('aInput')).value)
    if (waveFunction.a != convert(a, "nm", "m")) {
        waveFunction.a = convert(a, "nm", "m")
        updateTable()
    }
    document.getElementById('aValue').innerText = (waveFunction.a / 1.0E-9).toString()

})

document.getElementById("mInput").addEventListener("change", () => {
    let m = parseFloat((<HTMLInputElement>document.getElementById('mInput')).value)
    if (waveFunction.m != m * 1e-32) {
        waveFunction.m = m * 1e-32
        updateTable()
    }

    document.getElementById('mValue').innerText = (m).toString()

})

document.getElementById("nInput").addEventListener("change", () => {
    if (nCount != parseInt((<HTMLInputElement>document.getElementById('nInput')).value)) {
        nCount = parseInt((<HTMLInputElement>document.getElementById('nInput')).value)
        chart.data.labels = labels()
        chart.data.datasets = initialDataset()
        updateTable()
    }
    document.getElementById('nValue').innerText = (nCount).toString()
})


// document.getElementById()

function reset() {
    t = 0
    waveFunction = new InfiniteSquareWell()
    pause()
}

function start() {
    timer = setInterval(() => {
        t += deltaT
        updateChart()
    }, 1000 / fps)
}

function updateTable() {
    var table = <HTMLTableElement>document.getElementById("tableBody");
    table.innerHTML = ""

    for (let n = 1; n <= nCount; n++) {

        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(-1);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        row.insertCell(-1).innerText = n.toString()
        row.insertCell(-1).innerText = convert(waveFunction.E(n), "J", "meV").toPrecision(3).toString()
        row.insertCell(-1).innerText = waveFunction.ExpectationX(n).toPrecision(3).toString()
        row.insertCell(-1).innerText = waveFunction.ExpectationXSquared(n).toPrecision(3).toString()
        row.insertCell(-1).innerText = waveFunction.ExpectationP(n).toPrecision(3).toString()
        row.insertCell(-1).innerText = waveFunction.ExpectationPSquared(n).toPrecision(3).toString()
        row.insertCell(-1).innerText = waveFunction.SigmaXSquared(n).toPrecision(3).toString()
        row.insertCell(-1).innerText = waveFunction.SigmaPSquared(n).toPrecision(3).toString()
        row.insertCell(-1).innerText = (2 * waveFunction.Uncertainty(n) / HBar).toPrecision(3).toString()


        console.log(n, waveFunction.E(n), convert(waveFunction.E(n), "J", "meV"))
    }
}
updateTable()