import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import ChartJS from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import fs from "fs";
import { getData } from "./DB.js";

// 1. <input data>
//  1) 신호등 == 원소 1개짜리 list
const kosssfSignalsData = getData("koss-sf")["signals"]
const phq9SignalsData = getData("phq-9")["signals"]
const gad7SignalsData = getData("gad-7")["signals"]
const adnm4SignalsData = getData("adnm-4")["signals"]
const pcptsd5SignalsData = getData("pc-ptsd-5")["signals"]
const isiSignalsData = getData("isi")["signals"]
const cssSignalsData = getData("css")["signals"]
//  2) 가로바(채움) == 원소 1개짜리 list
const phq9RateBarData = getData("phq-9")["rates"]
const gad7RateBarData = getData("gad-7")["rates"]
const adnm4RateBarData = getData("adnm-4")["rates"]
const pcptsd5RateBarData = getData("pc-ptsd-5")["rates"]
const isiRateBarData = getData("isi")["rates"]
const cssRateBarData = getData("css")["rates"]
//  3) 연도별 == 원소 5개짜리 list
const kosssfChangesByYearData = getData("koss-sf")["changes-by-year"]
const phq9ChangesByYearData = getData("phq-9")["changes-by-year"]
const gad7ChangesByYearData = getData("gad-7")["changes-by-year"]
const adnm4ChangesByYearData = getData("adnm-4")["changes-by-year"]
const pcptsd5ChangesByYearData = getData("pc-ptsd-5")["changes-by-year"]
const isiChangesByYearData = getData("isi")["changes-by-year"]
const cssChangesByYearData = getData("css")["changes-by-year"]
//  4) 가로바(점) == 원소 2개짜리 list
const kosssfSurroundingsData = getData("koss-sf")["surroundings"]
const kosssfInstabilityData = getData("koss-sf")["instability"]
const kosssfDemandsData = getData("koss-sf")["demands"]
const kosssfCultureData = getData("koss-sf")["culture"]
const kosssfAutonomyData = getData("koss-sf")["autonomy"]
const kosssfSystemData = getData("koss-sf")["system"]
const kosssfConflictData = getData("koss-sf")["conflict"]

// 2. <4 types of canvas>
const signalsCanvas = new ChartJSNodeCanvas({ width: 240, height: 60 });
const rateBarCanvas = new ChartJSNodeCanvas({ width: 480, height: 36 });
const changesByYearCanvas = new ChartJSNodeCanvas({ width: 240, height: 120 });
const kosssfCanvas = new ChartJSNodeCanvas({ width: 240, height: 36 });


// 3. <defaults>
//  1) 신호등

//  2) 가로바(채움) + (점)
const rateBarScales =  {
    x: {
        grid: {
            drawBorder: false,
            display: false
        },
        ticks: {
            display: false,
        },
        min: 0,
        max: 100,
    },
    y: {
        grid: {
            drawBorder: false,
            display: false,
        },
        ticks: {
            display: false,
        }
    }
}

//  3) 연도별
const now = new Date();
const year = now.getFullYear();
const changesByYearLabels = [
    year-4,
    year-3,
    year-2,
    year-1,
    year,
]
const changesByYearScales = {
    x: {
        grid: {
            display: false
        },
        ticks: {
            font: {
                size: 18,
                weight: 'bold',
                lineHeight: 0
            },
            color: [
                'rgb(0, 0, 0)',
                'rgb(0, 0, 0)',
                'rgb(0, 0, 0)',
                'rgb(0, 0, 0)',
                'rgb(0, 0, 0)', // white로 하면 글자 아예 안보이네
            ],
        },
    },
    y: {
        beginAtZero: true,
        grid: {
            drawBorder: false,
            color: [
                'black',
                'rgb(239, 239, 239)',
                'rgb(251, 240, 220)',
                'rgb(244, 209, 212)',
                'rgb(223, 207, 209)'
            ], // black 안넣고 표현 안되나.. 시작이 0이 아니도록.
        },
        ticks: {
            display: false,
            beginAtZero: true,
            stepSize: 25,
        },
        min: 0,
        max: 100,
    }
}



async function generateChart() {
    // 4. <configurations>
    //  1) 신호등
    // 이거 신호등에 활용합시다 => 1이면 배경 그 색. 등등.
    // input data의 value에 따라 bar+value의 배경색으로 정상/경계/위험/심각 표현
    // for( let i = 0; i < generalMentalIllnessMean5yrsData.length; i++) {
    //     if (generalMentalIllnessMean5yrsData[i] < 25) {
    //         generalMentalIllnessMean5yrsConfig.data.datasets[0].backgroundColor[i] = 'rgba(239, 239, 239, 0.5)'
    //         // generalMentalIllnessMean5yrsData[0].data[i] = generalMentalIllnessMean5yrsData[0].data[i].toString().concat('                    ') // 이건 잡히는거 보니, 알파벳 문제인가본데.
    //         // generalMentalIllnessMean5yrsData[0].data[i] = "한글" // 이거 안잡히네. 한글처리 문제다. 음........
    //         // generalMentalIllnessMean5yrsData[0].data[i] = "abc" // 이거 안잡히네. 그냥 문자열 처리 문제구나.
    //         generalMentalIllnessMean5yrsConfig.options.plugins.datalabels.backgroundColor[i] = 'rgba(239, 239, 239, 0.5)'
    //     } else if (generalMentalIllnessMean5yrsData[i] < 50) {
    //         generalMentalIllnessMean5yrsConfig.data.datasets[0].backgroundColor[i] = 'rgba(251, 240, 220, 0.5)'
    //         generalMentalIllnessMean5yrsConfig.options.plugins.datalabels.backgroundColor[i] = 'rgba(251, 240, 220, 0.5)'
    //     } else if (generalMentalIllnessMean5yrsData[i] < 75) {
    //         generalMentalIllnessMean5yrsConfig.data.datasets[0].backgroundColor[i] = 'rgba(244, 209, 212, 0.5)'
    //         generalMentalIllnessMean5yrsConfig.options.plugins.datalabels.backgroundColor[i] = 'rgba(244, 209, 212, 0.5)'
    //     } else {
    //         generalMentalIllnessMean5yrsConfig.data.datasets[0].backgroundColor[i] = 'rgba(223, 207, 209, 0.5)'
    //         generalMentalIllnessMean5yrsConfig.options.plugins.datalabels.backgroundColor[i] = 'rgba(223, 207, 209, 0.5)'
    //     }
    // }
    // 차트 위 point를 정상/경계/위험/심각 색상으로 표현하려 한 시도. 근데 색이 너무 연해서..
    // if (generalMentalIllnessEachPHQ9Data[0] < 25) {
    //     generalMentalIllnessEachPHQ9Config.options.plugins.datalabels.color[0] = 'rgba(239, 239, 239)'
    //     generalMentalIllnessEachPHQ9Config.options.plugins.datalabels.backgroundColor[0] = 'rgba(239, 239, 239)'
    //
    // } else if (generalMentalIllnessEachPHQ9Data[0] < 50) {
    //     generalMentalIllnessEachPHQ9Config.options.plugins.datalabels.backgroundColor[0] = 'rgba(251, 240, 220)'
    // } else if (generalMentalIllnessEachPHQ9Data[0] < 75) {
    //     generalMentalIllnessEachPHQ9Config.options.plugins.datalabels.backgroundColor[0] = 'rgba(244, 209, 212)'
    // } else {
    //     generalMentalIllnessEachPHQ9Config.options.plugins.datalabels.backgroundColor[0] = 'rgba(223, 207, 209)'
    // }


    //  2) 가로바(채움)


    //  3) 연도별
    const kosssfChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: kosssfChangesByYearData,
                    barPercentage: 0.3,
                    backgroundColor: [],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
        },
    };


    //  4) 가로바(점)
    const kosssfSurroundingsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfSurroundingsData[0],
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 5,
                    borderRadius: 5,
                    font: {
                        size: 5,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };



    // 5. <generate base64 types img through renderToDataURL>
    //  1) 신호등
    // const kosssfSignalsChart = await signalsCanvas.renderToDataURL(<configuration>)
    // const phq9SignalsChart = await signalsCanvas.renderToDataURL(<configuration>)
    // const gad7SignalsChart = await signalsCanvas.renderToDataURL(<configuration>)
    // const adnm4SignalsChart = await signalsCanvas.renderToDataURL(<configuration>)
    // const pcptsd5SignalsChart = await signalsCanvas.renderToDataURL(<configuration>)
    // const isiSignalsChart = await signalsCanvas.renderToDataURL(<configuration>)
    // const cssSignalsChart = await signalsCanvas.renderToDataURL(<configuration>)

    //  2) 가로바(채움)
    // const phq9RateBarChart = await
    // const gad7RateBarChart = await
    // const adnm4RateBarChart = await
    // const pcptsd5RateBarChart = await
    // const isiRateBarChart = await
    // const cssRateBarChart = await

    //  3) 연도별
    // const kosssfChangesByYearChart = await
    // const phq9ChangesByYearChart = await
    // const gad7ChangesByYearChart = await
    // const adnm4ChangesByYearChart = await
    // const pcptsd5ChangesByYearChart = await
    // const isiChangesByYearChart = await
    // const cssChangesByYearChart = await

    //  4) 가로바(점)
    // const kosssfSurroundingsChart = await
    // const kosssfInstabilityChart = await
    // const kosssfDemandsChart = await
    // const kosssfCultureChart = await
    // const kosssfAutonomyChart = await
    // const kosssfSystemChart = await
    // const kosssfConflictChart = await


    // 6. <add to charts and return>
    const charts = {
        // "koss-sf-signals": kosssfSignalsChart,
        // "phq-9-signals": phq9SignalsChart,
        // "gad-7-signals": gad7SignalsChart,
        // "adnm-4-signals": adnm4SignalsChart,
        // "pc-ptsd-5-signals": pcptsd5SignalsChart,
        // "isi-signals": isiSignalsChart,
        // "css-signals": cssSignalsChart,
        //
        // "phq-9-rate-bar": phq9RateBarChart,
        // "gad-7-rate-bar": gad7RateBarChart,
        // "adnm-4-rate-bar": adnm4RateBarChart,
        // "pc-ptsd-5-rate-bar": pcptsd5RateBarChart,
        // "isi-rate-bar": isiRateBarChart,
        // "css-rate-bar": cssRateBarChart,
        //
        // "koss-sf-changes-by-year": kosssfChangesByYearChart,
        // "phq-9-changes-by-year": phq9ChangesByYearChart,
        // "gad-7-changes-by-year": gad7ChangesByYearChart,
        // "adnm-4-changes-by-year": adnm4ChangesByYearChart,
        // "pc-ptsd-5-changes-by-year": pcptsd5ChangesByYearChart,
        // "isi-changes-by-year": isiChangesByYearChart,
        // "css-changes-by-year": cssChangesByYearChart,
        //
        // "koss-sf-surroundings": kosssfSurroundingsChart,
        // "koss-sf-instability": kosssfInstabilityChart,
        // "koss-sf-demands": kosssfDemandsChart,
        // "koss-sf-culture": kosssfCultureChart,
        // "koss-sf-autonomy": kosssfAutonomyChart,
        // "koss-sf-system": kosssfSystemChart,
        // "koss-sf-conflict": kosssfConflictChart,
    }
    return charts
};

export { generateChart };