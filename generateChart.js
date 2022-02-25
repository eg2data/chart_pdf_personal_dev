import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import fs from "fs";
import labelmake from "labelmake";
import template from "./labelmake-template.json";
import {fromPath} from "pdf2pic";
import makeDir from "make-dir";

// 한글처리
const NanumGothic = fs.readFileSync("./NanumGothic-Regular.ttf")
const font = {
    NanumGothic : {
        data: NanumGothic,
        subset: false
    }
};

async function generateChart(data) {
// <defaults>
    const signalsScales =  { // 1) 신호등
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
    const rateBarScales =  { // 2) 가로바(채움)

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
    const changesByYearScales = { // 3) 연도별

        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                font: {
                    size: 10,
                    lineHeight: 0.1,
                    weight: "bold",
                },
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                drawBorder: false,
                color: [
                    'white',
                ],
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
    const kosssfScales =  { // 4) 가로바(점)

        x: {
            grid: {
                drawBorder: false,
                display: false
            },
            ticks: {
                display: false,
            },
            min: 0,
            max: 50,
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
// <canvas>
    const signalsCanvas = new ChartJSNodeCanvas({ width: 240, height: 60 }); // 1) 신호등
    const rateBarCanvas = new ChartJSNodeCanvas({ width: 480, height: 36 }); // 2) 가로바(채움)
    const changesByYearCanvas = new ChartJSNodeCanvas({ width: 240, height: 120 }); // 3) 연도별
    const kosssfCanvas = new ChartJSNodeCanvas({ width: 240, height: 36 }); // 4) 가로바(점)
// <label 중 일부>
    const now = new Date();
    const year = now.getFullYear();
    const changesByYearLabels = [
        // year-4,
        // year-3,
        // year-2,
        // year-1,
        year,
    ]

// <신호등>
    // 1) data
    let kosssfSignalsData;
    if (data["koss-sf"]["signals"] == null) {
        kosssfSignalsData = [-1];
    } else {
        kosssfSignalsData = data["koss-sf"]["signals"]
    }
    let phq9SignalsData;
    if (data["phq-9"]["signals"] == null) {
        phq9SignalsData = [-1];
    } else {
        phq9SignalsData = data["phq-9"]["signals"]
    }
    let gad7SignalsData;
    if (data["gad-7"]["signals"] == null) {
        gad7SignalsData = [-1];
    } else {
        gad7SignalsData = data["gad-7"]["signals"]
    }
    let adnm4SignalsData;
    if (data["adnm-4"]["signals"] == null) {
        adnm4SignalsData = [-1];
    } else {
        adnm4SignalsData = data["adnm-4"]["signals"]
    }
    let pcptsd5SignalsData;
    if (data["pc-ptsd-5"]["signals"] == null) {
        pcptsd5SignalsData = [-1];
    } else {
        pcptsd5SignalsData = data["pc-ptsd-5"]["signals"]
    }
    let isiSignalsData;
    if (data["isi"]["signals"] == null) {
        isiSignalsData = [-1];
    } else {
        isiSignalsData = data["isi"]["signals"]
    }
    let cssSignalsData;
    if (data["css"]["signals"] == null) {
        cssSignalsData = [-1];
    } else {
        cssSignalsData = data["css"]["signals"]
    }
    // 2) config
    const kosssfSignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfSignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const phq9SignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: phq9SignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const adnm4SignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: adnm4SignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const isiSignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: isiSignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const gad7SignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: gad7SignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const pcptsd5SignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: pcptsd5SignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const cssSignalsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: cssSignalsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: signalsScales,
            plugins: {
                datalabels: {
                    color: [''],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: [''],
                    borderWidth: 37, // 47
                    borderRadius: 50,
                    font: {
                        size: 2,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };

    // 3) 입력값에 따른 색상+위치 변경
    if (kosssfSignalsConfig.data.datasets[0].data == 24) {
        kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (kosssfSignalsConfig.data.datasets[0].data == 45) {
        kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (kosssfSignalsConfig.data.datasets[0].data == 66) {
        kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (kosssfSignalsConfig.data.datasets[0].data == 87) {
        kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (kosssfSignalsConfig.data.datasets[0].data == -1) {
        kosssfSignalsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (phq9SignalsConfig.data.datasets[0].data == 24) {
        phq9SignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        phq9SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (phq9SignalsConfig.data.datasets[0].data == 45) {
        phq9SignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        phq9SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (phq9SignalsConfig.data.datasets[0].data == 66) {
        phq9SignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        phq9SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (phq9SignalsConfig.data.datasets[0].data == 87) {
        phq9SignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        phq9SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (phq9SignalsConfig.data.datasets[0].data == -1) {
        phq9SignalsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (gad7SignalsConfig.data.datasets[0].data == 24) {
        gad7SignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        gad7SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (gad7SignalsConfig.data.datasets[0].data == 45) {
        gad7SignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        gad7SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (gad7SignalsConfig.data.datasets[0].data == 66) {
        gad7SignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        gad7SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (gad7SignalsConfig.data.datasets[0].data == 87) {
        gad7SignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        gad7SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (gad7SignalsConfig.data.datasets[0].data == -1) {
        gad7SignalsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (adnm4SignalsConfig.data.datasets[0].data == 24) {
        adnm4SignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        adnm4SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (adnm4SignalsConfig.data.datasets[0].data == 45) {
        adnm4SignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        adnm4SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (adnm4SignalsConfig.data.datasets[0].data == 66) {
        adnm4SignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        adnm4SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (adnm4SignalsConfig.data.datasets[0].data == 87) {
        adnm4SignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        adnm4SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (adnm4SignalsConfig.data.datasets[0].data == -1) {
        adnm4SignalsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (pcptsd5SignalsConfig.data.datasets[0].data == 24) {
        pcptsd5SignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        pcptsd5SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (pcptsd5SignalsConfig.data.datasets[0].data == 45) {
        pcptsd5SignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        pcptsd5SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (pcptsd5SignalsConfig.data.datasets[0].data == 66) {
        pcptsd5SignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        pcptsd5SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (pcptsd5SignalsConfig.data.datasets[0].data == 87) {
        pcptsd5SignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        pcptsd5SignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (pcptsd5SignalsConfig.data.datasets[0].data == -1) {
        pcptsd5SignalsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (isiSignalsConfig.data.datasets[0].data == 24) {
        isiSignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        isiSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (isiSignalsConfig.data.datasets[0].data == 45) {
        isiSignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        isiSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (isiSignalsConfig.data.datasets[0].data == 66) {
        isiSignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        isiSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (isiSignalsConfig.data.datasets[0].data == 87) {
        isiSignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        isiSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (isiSignalsConfig.data.datasets[0].data == -1) {
        isiSignalsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (cssSignalsConfig.data.datasets[0].data == 24) {
        cssSignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
        cssSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    } else if (cssSignalsConfig.data.datasets[0].data == 45) {
        cssSignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
        cssSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    } else if (cssSignalsConfig.data.datasets[0].data == 66) {
        cssSignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
        cssSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    } else if (cssSignalsConfig.data.datasets[0].data == 87) {
        cssSignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
        cssSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    } else if (cssSignalsConfig.data.datasets[0].data == -1) {
        cssSignalsConfig.options.plugins.datalabels.borderWidth = ""
    }

// <가로바(채움)>
    // 1) data
    let phq9RateBarData;
    if (data["phq-9"]["rates"] == null) {
        phq9RateBarData = [-1];
    } else {
        phq9RateBarData = data["phq-9"]["rates"]
    }
    let gad7RateBarData;
    if (data["gad-7"]["rates"] == null) {
        gad7RateBarData = [-1];
    } else {
        gad7RateBarData = data["gad-7"]["rates"]
    }
    let adnm4RateBarData;
    if (data["adnm-4"]["rates"] == null) {
        adnm4RateBarData = [-1];
    } else {
        adnm4RateBarData = data["adnm-4"]["rates"]
    }
    let pcptsd5RateBarData;
    if (data["pc-ptsd-5"]["rates"] == null) {
        pcptsd5RateBarData = [-1];
    } else {
        pcptsd5RateBarData = data["pc-ptsd-5"]["rates"]
    }
    let isiRateBarData;
    if (data["isi"]["rates"] == null) {
        isiRateBarData = [-1];
    } else {
        isiRateBarData = data["isi"]["rates"]
    }
    let cssRateBarData;
    if (data["css"]["rates"] == null) {
        cssRateBarData = [-1];
    } else {
        cssRateBarData = data["css"]["rates"]
    }
    // 2) config
    const phq9RateBarConfig = { // radius 아쉽다
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: phq9RateBarData,
                    barPercentage: 100,
                    backgroundColor: [
                        "#339999"
                    ]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                legend: {
                    display: false
                },

            }
        }
    }
    const gad7RateBarConfig = { // radius 아쉽다
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: gad7RateBarData,
                    barPercentage: 100,
                    backgroundColor: [
                        "#339999"
                    ]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                legend: {
                    display: false
                },

            }
        }
    }
    const adnm4RateBarConfig = { // radius 아쉽다
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: adnm4RateBarData,
                    barPercentage: 100,
                    backgroundColor: [
                        "#339999"
                    ]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                legend: {
                    display: false
                },

            }
        }
    }
    const pcptsd5RateBarConfig = { // radius 아쉽다
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: pcptsd5RateBarData,
                    barPercentage: 100,
                    backgroundColor: [
                        "#339999"
                    ]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                legend: {
                    display: false
                },

            }
        }
    }
    const isiRateBarConfig = { // radius 아쉽다
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: isiRateBarData,
                    barPercentage: 100,
                    backgroundColor: [
                        "#339999"
                    ]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                legend: {
                    display: false
                },

            }
        }
    }
    const cssRateBarConfig = { // radius 아쉽다
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: cssRateBarData,
                    barPercentage: 100,
                    backgroundColor: [
                        "#339999"
                    ]
                }
            ]
        },
        options: {
            indexAxis: 'y',
            scales: rateBarScales,
            plugins: {
                legend: {
                    display: false
                },

            }
        }
    }
    // 3) 입력값이 null일 경우 차트 비우기
    if (phq9RateBarConfig.data.datasets[0].data == -1) {
        phq9RateBarConfig.data.datasets[0].barPercentage = ""
        phq9RateBarConfig.data.datasets[0].backgroundColor = ""
    }
    if (gad7RateBarConfig.data.datasets[0].data == -1) {
        gad7RateBarConfig.data.datasets[0].barPercentage = ""
        gad7RateBarConfig.data.datasets[0].backgroundColor = ""
    }
    if (adnm4RateBarConfig.data.datasets[0].data == -1) {
        adnm4RateBarConfig.data.datasets[0].barPercentage = ""
        adnm4RateBarConfig.data.datasets[0].backgroundColor = ""
    }
    if (pcptsd5RateBarConfig.data.datasets[0].data == -1) {
        pcptsd5RateBarConfig.data.datasets[0].barPercentage = ""
        pcptsd5RateBarConfig.data.datasets[0].backgroundColor = ""
    }
    if (isiRateBarConfig.data.datasets[0].data == -1) {
        isiRateBarConfig.data.datasets[0].barPercentage = ""
        isiRateBarConfig.data.datasets[0].backgroundColor = ""
    }
    if (cssRateBarConfig.data.datasets[0].data == -1) {
        cssRateBarConfig.data.datasets[0].barPercentage = ""
        cssRateBarConfig.data.datasets[0].backgroundColor = ""
    }

// <연도별>
    // 1) data
    let kosssfChangesByYearData;
    if (data["koss-sf"]["changes-by-year"] == null) {
        kosssfChangesByYearData = [0];
    } else {
        kosssfChangesByYearData = data["koss-sf"]["changes-by-year"]
    }
    let phq9ChangesByYearData;
    if (data["phq-9"]["changes-by-year"] == null) {
        phq9ChangesByYearData = [0];
    } else {
        phq9ChangesByYearData = data["phq-9"]["changes-by-year"]
    }
    let gad7ChangesByYearData;
    if (data["gad-7"]["changes-by-year"] == null) {
        gad7ChangesByYearData = [0];
    } else {
        gad7ChangesByYearData = data["gad-7"]["changes-by-year"]
    }
    let adnm4ChangesByYearData;
    if (data["adnm-4"]["changes-by-year"] == null) {
        adnm4ChangesByYearData = [0];
    } else {
        adnm4ChangesByYearData = data["adnm-4"]["changes-by-year"]
    }
    let pcptsd5ChangesByYearData;
    if (data["pc-ptsd-5"]["changes-by-year"] == null) {
        pcptsd5ChangesByYearData = [0];
    } else {
        pcptsd5ChangesByYearData = data["pc-ptsd-5"]["changes-by-year"]
    }
    let isiChangesByYearData;
    if (data["isi"]["changes-by-year"] == null) {
        isiChangesByYearData = [0];
    } else {
        isiChangesByYearData = data["isi"]["changes-by-year"]
    }
    let cssChangesByYearData;
    if (data["css"]["changes-by-year"] == null) {
        cssChangesByYearData = [0];
    } else {
        cssChangesByYearData = data["css"]["changes-by-year"]
    }
    // 2) config
    const kosssfChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: kosssfChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };
    const phq9ChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: phq9ChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };
    const gad7ChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: gad7ChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };
    const adnm4ChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: adnm4ChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };
    const pcptsd5ChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: pcptsd5ChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };
    const isiChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: isiChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };
    const cssChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: cssChangesByYearData,
                    barPercentage: 0.1,
                    backgroundColor: [
                        "black",
                        "black",
                        "black",
                        "black",
                        "red"
                    ],
                }
            ]
        },
        options: {
            scales: changesByYearScales,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
    };

// <가로바(점)>
    // 1) data
    // generateChart / generateFile 함수 모두에서 동일하게 사용되나, 각 함수에 각각 선언함.
    let kosssfCompensationData;
    if (data["koss-sf"]["compensation"] == null) {
        kosssfCompensationData = [0, '0'];
    } else {
        kosssfCompensationData = data["koss-sf"]["compensation"]
    }
    let kosssfJobInstabilityData;
    if (data["koss-sf"]["jobInstability"] == null) {
        kosssfJobInstabilityData = [0, '0'];
    } else {
        kosssfJobInstabilityData = data["koss-sf"]["jobInstability"]
    }
    let kosssfRequirementsData;
    if (data["koss-sf"]["requirements"] == null) {
        kosssfRequirementsData = [0, '0'];
    } else {
        kosssfRequirementsData = data["koss-sf"]["requirements"]
    }
    let kosssfCultureData;
    if (data["koss-sf"]["culture"] == null) {
        kosssfCultureData = [0, '0'];
    } else {
        kosssfCultureData = data["koss-sf"]["culture"]
    }
    let kosssfAutonomyData;
    if (data["koss-sf"]["autonomy"] == null) {
        kosssfAutonomyData = [0, '0'];
    } else {
        kosssfAutonomyData = data["koss-sf"]["autonomy"]
    }
    let kosssfSystemData;
    if (data["koss-sf"]["system"] == null) {
        kosssfSystemData = [0, '0'];
    } else {
        kosssfSystemData = data["koss-sf"]["system"]
    }
    let kosssfRelationshipData;
    if (data["koss-sf"]["relationship"] == null) {
        kosssfRelationshipData = [0, '0'];
    } else {
        kosssfRelationshipData = data["koss-sf"]["relationship"]
    }
    // 2) config
    const kosssfCompensationConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfCompensationData.slice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참 => splice 사용 시 그 상태 그대로 데이터가 저장됨.. => slice 대체
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const kosssfJobInstabilityConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfJobInstabilityData.slice(0,1),
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const kosssfRequirementsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfRequirementsData.slice(0,1),
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const kosssfCultureConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfCultureData.slice(0,1),
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const kosssfAutonomyConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfAutonomyData.slice(0,1),
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const kosssfSystemConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfSystemData.slice(0,1),
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    const kosssfRelationshipConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfRelationshipData.slice(0,1),
                    barPercentage: 0.0,
                }
            ]
        },
        plugins: [ChartDataLabels],
        options: {
            indexAxis: 'y',
            scales: kosssfScales,
            plugins: {
                datalabels: {
                    color: ['red'],
                    anchor: 'end',
                    align: 'center',
                    // offset:
                    backgroundColor: ['red'],
                    borderWidth: 15,
                    borderRadius: 50,
                    font: {
                        size: 1,
                        weight: 'bold'
                    },
                },
                legend: {
                    display: false
                }
            }
        },
    };
    // 3) 입력값이 null일 경우 차트 비우기
    if (kosssfCompensationConfig.data.datasets[0].data == 0) {
        kosssfCompensationConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (kosssfJobInstabilityConfig.data.datasets[0].data == 0) {
        kosssfJobInstabilityConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (kosssfRequirementsConfig.data.datasets[0].data == 0) {
        kosssfRequirementsConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (kosssfCultureConfig.data.datasets[0].data == 0) {
        kosssfCultureConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (kosssfAutonomyConfig.data.datasets[0].data == 0) {
        kosssfAutonomyConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (kosssfSystemConfig.data.datasets[0].data == 0) {
        kosssfSystemConfig.options.plugins.datalabels.borderWidth = ""
    }
    if (kosssfRelationshipConfig.data.datasets[0].data == 0) {
        kosssfRelationshipConfig.options.plugins.datalabels.borderWidth = ""
    }

// <generate base64 types img through renderToDataURL>
    // 1) 신호등
    const kosssfSignalsChart = await signalsCanvas.renderToDataURL(kosssfSignalsConfig)
    const phq9SignalsChart = await signalsCanvas.renderToDataURL(phq9SignalsConfig)
    const gad7SignalsChart = await signalsCanvas.renderToDataURL(gad7SignalsConfig)
    const adnm4SignalsChart = await signalsCanvas.renderToDataURL(adnm4SignalsConfig)
    const pcptsd5SignalsChart = await signalsCanvas.renderToDataURL(pcptsd5SignalsConfig)
    const isiSignalsChart = await signalsCanvas.renderToDataURL(isiSignalsConfig)
    const cssSignalsChart = await signalsCanvas.renderToDataURL(cssSignalsConfig)
    // 2) 가로바(채움)
    const phq9RateBarChart = await rateBarCanvas.renderToDataURL(phq9RateBarConfig)
    const gad7RateBarChart = await rateBarCanvas.renderToDataURL(gad7RateBarConfig)
    const adnm4RateBarChart = await rateBarCanvas.renderToDataURL(adnm4RateBarConfig)
    const pcptsd5RateBarChart = await rateBarCanvas.renderToDataURL(pcptsd5RateBarConfig)
    const isiRateBarChart = await rateBarCanvas.renderToDataURL(isiRateBarConfig)
    const cssRateBarChart = await rateBarCanvas.renderToDataURL(cssRateBarConfig)
    // 3) 연도별
    const kosssfChangesByYearChart = await changesByYearCanvas.renderToDataURL(kosssfChangeByYearConfig)
    const phq9ChangesByYearChart = await changesByYearCanvas.renderToDataURL(phq9ChangeByYearConfig)
    const gad7ChangesByYearChart = await changesByYearCanvas.renderToDataURL(gad7ChangeByYearConfig)
    const adnm4ChangesByYearChart = await changesByYearCanvas.renderToDataURL(adnm4ChangeByYearConfig)
    const pcptsd5ChangesByYearChart = await changesByYearCanvas.renderToDataURL(pcptsd5ChangeByYearConfig)
    const isiChangesByYearChart = await changesByYearCanvas.renderToDataURL(isiChangeByYearConfig)
    const cssChangesByYearChart = await changesByYearCanvas.renderToDataURL(cssChangeByYearConfig)
    // 4) 가로바(점)
    const kosssfCompensationChart = await kosssfCanvas.renderToDataURL(kosssfCompensationConfig)
    const kosssfJobInstabilityChart = await kosssfCanvas.renderToDataURL(kosssfJobInstabilityConfig)
    const kosssfRequirementsChart = await kosssfCanvas.renderToDataURL(kosssfRequirementsConfig)
    const kosssfCultureChart = await kosssfCanvas.renderToDataURL(kosssfCultureConfig)
    const kosssfAutonomyChart = await kosssfCanvas.renderToDataURL(kosssfAutonomyConfig)
    const kosssfSystemChart = await kosssfCanvas.renderToDataURL(kosssfSystemConfig)
    const kosssfRelationshipChart = await kosssfCanvas.renderToDataURL(kosssfRelationshipConfig)

// <add to charts and return>
    return {
        "koss-sf-signals": kosssfSignalsChart,
        "phq-9-signals": phq9SignalsChart,
        "gad-7-signals": gad7SignalsChart,
        "adnm-4-signals": adnm4SignalsChart,
        "pc-ptsd-5-signals": pcptsd5SignalsChart,
        "isi-signals": isiSignalsChart,
        "css-signals": cssSignalsChart,

        "phq-9-rate-bar": phq9RateBarChart,
        "gad-7-rate-bar": gad7RateBarChart,
        "adnm-4-rate-bar": adnm4RateBarChart,
        "pc-ptsd-5-rate-bar": pcptsd5RateBarChart,
        "isi-rate-bar": isiRateBarChart,
        "css-rate-bar": cssRateBarChart,

        "koss-sf-changes-by-year": kosssfChangesByYearChart,
        "phq-9-changes-by-year": phq9ChangesByYearChart,
        "gad-7-changes-by-year": gad7ChangesByYearChart,
        "adnm-4-changes-by-year": adnm4ChangesByYearChart,
        "pc-ptsd-5-changes-by-year": pcptsd5ChangesByYearChart,
        "isi-changes-by-year": isiChangesByYearChart,
        "css-changes-by-year": cssChangesByYearChart,

        "koss-sf-surroundings": kosssfCompensationChart, // 받는 부분은 수정 안함. 그래서, template 내 변수명은 수정 안함.
        "koss-sf-instability": kosssfJobInstabilityChart, // 받는 부분은 수정 안함. 그래서, template 내 변수명은 수정 안함.
        "koss-sf-demands": kosssfRequirementsChart, // 받는 부분은 수정 안함. 그래서, template 내 변수명은 수정 안함.
        "koss-sf-culture": kosssfCultureChart,
        "koss-sf-autonomy": kosssfAutonomyChart,
        "koss-sf-system": kosssfSystemChart,
        "koss-sf-conflict": kosssfRelationshipChart, // 받는 부분은 수정 안함. 그래서, template 내 변수명은 수정 안함.
    };
};



async function generateFile(data, charts) {
    let kosssfRatesData;
    if (data["koss-sf"]["rates"] == null) {
        kosssfRatesData = [0];
    } else {
        kosssfRatesData = data["koss-sf"]["rates"]
    }
    let kosssfPointsData;
    if (data["koss-sf"]["points"] == null) {
        kosssfPointsData = [0];
    } else {
        kosssfPointsData = data["koss-sf"]["points"]
    }
    let kosssfMeansData;
    if (data["koss-sf"]["means"] == null) {
        kosssfMeansData = [0];
    } else {
        kosssfMeansData = data["koss-sf"]["means"]
    }
    let phq9RatesData;
    if (data["phq-9"]["rates"] == null) {
        phq9RatesData = [0];
    } else {
        phq9RatesData = data["phq-9"]["rates"]
    }
    let phq9PointsData;
    if (data["phq-9"]["points"] == null) {
        phq9PointsData = [0];
    } else {
        phq9PointsData = data["phq-9"]["points"]
    }
    let gad7RatesData;
    if (data["gad-7"]["rates"] == null) {
        gad7RatesData = [0];
    } else {
        gad7RatesData = data["gad-7"]["rates"]
    }
    let gad7PointsData;
    if (data["gad-7"]["points"] == null) {
        gad7PointsData = [0];
    } else {
        gad7PointsData = data["gad-7"]["points"]
    }
    let adnm4RatesData;
    if (data["adnm-4"]["rates"] == null) {
        adnm4RatesData = [0];
    } else {
        adnm4RatesData = data["adnm-4"]["rates"]
    }
    let adnm4PointsData;
    if (data["adnm-4"]["points"] == null) {
        adnm4PointsData = [0];
    } else {
        adnm4PointsData = data["adnm-4"]["points"]
    }
    let pcptsd5RatesData;
    if (data["pc-ptsd-5"]["rates"] == null) {
        pcptsd5RatesData = [0];
    } else {
        pcptsd5RatesData = data["pc-ptsd-5"]["rates"]
    }
    let pcptsd5PointsData;
    if (data["pc-ptsd-5"]["points"] == null) {
        pcptsd5PointsData = [0];
    } else {
        pcptsd5PointsData = data["pc-ptsd-5"]["points"]
    }
    let isiRatesData;
    if (data["isi"]["rates"] == null) {
        isiRatesData = [0];
    } else {
        isiRatesData = data["isi"]["rates"]
    }
    let isiPointsData;
    if (data["isi"]["points"] == null) {
        isiPointsData = [0];
    } else {
        isiPointsData = data["isi"]["points"]
    }
    let cssRatesData;
    if (data["css"]["rates"] == null) {
        cssRatesData = [0];
    } else {
        cssRatesData = data["css"]["rates"]
    }
    let cssPointsData;
    if (data["css"]["points"] == null) {
        cssPointsData = [0];
    } else {
        cssPointsData = data["css"]["points"]
    }
    // generateChart / generateFile 함수 모두에서 동일하게 사용되나, 각 함수에 각각 선언함.
    let kosssfCompensationData;
    if (data["koss-sf"]["compensation"] == null) {
        kosssfCompensationData = [0, '0'];
    } else {
        kosssfCompensationData = data["koss-sf"]["compensation"]
    }
    let kosssfJobInstabilityData;
    if (data["koss-sf"]["jobInstability"] == null) {
        kosssfJobInstabilityData = [0, '0'];
    } else {
        kosssfJobInstabilityData = data["koss-sf"]["jobInstability"]
    }
    let kosssfRequirementsData;
    if (data["koss-sf"]["requirements"] == null) {
        kosssfRequirementsData = [0, '0'];
    } else {
        kosssfRequirementsData = data["koss-sf"]["requirements"]
    }
    let kosssfCultureData;
    if (data["koss-sf"]["culture"] == null) {
        kosssfCultureData = [0, '0'];
    } else {
        kosssfCultureData = data["koss-sf"]["culture"]
    }
    let kosssfAutonomyData;
    if (data["koss-sf"]["autonomy"] == null) {
        kosssfAutonomyData = [0, '0'];
    } else {
        kosssfAutonomyData = data["koss-sf"]["autonomy"]
    }
    let kosssfSystemData;
    if (data["koss-sf"]["system"] == null) {
        kosssfSystemData = [0, '0'];
    } else {
        kosssfSystemData = data["koss-sf"]["system"]
    }
    let kosssfRelationshipData;
    if (data["koss-sf"]["relationship"] == null) {
        kosssfRelationshipData = [0, '0'];
    } else {
        kosssfRelationshipData = data["koss-sf"]["relationship"]
    }

    // 7. <generate PDF file>
    const inputs = [
        {
            "user-name": data["basic-info"]["user-name"],
            // "distinct-number": data["basic-info"]["distinct-number"],
            // "classification-code": data["basic-info"]["classification-code"],
            "submit-date": data["basic-info"]["submit-date"],
            "report-date": data["basic-info"]["report-date"],
            "company-info-name": data["basic-info"]["company-info"]["name"],
            "company-info-address": data["basic-info"]["company-info"]["address"],
            "company-info-via": data["basic-info"]["company-info"]["via"],
            "company-info-contact": data["basic-info"]["company-info"]["contact"],
            // "check-list-number": data["basic-info"]["check-list-number"] + " 종",
            "test-type": data["basic-info"]["test-type"],
            "test-method": data["basic-info"]["test-method"],
            "test-adequacy": data["basic-info"]["test-adequacy"],

            "overall-user-name": data["basic-info"]["user-name"],
            // "overall-classification-code": data["basic-info"]["classification-code-details"],
            "overall-koss-sf-signal-texts": data["koss-sf"]["signal-texts"],
            "overall-koss-sf-signals": charts['koss-sf-signals'],
            "overall-koss-sf-points": kosssfPointsData.toString() + "점  /",
            "overall-koss-sf-rates": kosssfRatesData.toString() + "%",
            "overall-koss-sf-means": kosssfMeansData.toString() + "점",

            "overall-phq-9-signal-texts": data["phq-9"]["signal-texts"],
            "overall-phq-9-signals": charts['phq-9-signals'],
            "overall-phq-9-points": phq9PointsData.toString() + "점  /",
            "overall-phq-9-rates": phq9RatesData.toString() + "%",
            "overall-phq-9-comments": data["phq-9"]["comments"],

            "overall-gad-7-signal-texts": data["gad-7"]["signal-texts"],
            "overall-gad-7-signals": charts['gad-7-signals'],
            "overall-gad-7-points": gad7PointsData.toString() + "점  /",
            "overall-gad-7-rates": gad7RatesData.toString() + "%",
            "overall-gad-7-comments": data["gad-7"]["comments"],

            "overall-adnm-4-signal-texts": data["adnm-4"]["signal-texts"],
            "overall-adnm-4-signals": charts['adnm-4-signals'],
            "overall-adnm-4-points": adnm4PointsData.toString() + "점  /",
            "overall-adnm-4-rates": adnm4RatesData.toString() + "%",
            "overall-adnm-4-comments": data["adnm-4"]["comments"],

            "overall-pc-ptsd-5-signal-texts": data["pc-ptsd-5"]["signal-texts"],
            "overall-pc-ptsd-5-signals": charts['pc-ptsd-5-signals'],
            "overall-pc-ptsd-5-points": pcptsd5PointsData.toString() + "점  /",
            "overall-pc-ptsd-5-rates": pcptsd5RatesData.toString() + "%",
            "overall-pc-ptsd-5-comments": data["pc-ptsd-5"]["comments"],

            "overall-isi-signal-texts": data["isi"]["signal-texts"],
            "overall-isi-signals": charts['isi-signals'],
            "overall-isi-points": isiPointsData.toString() + "점  /",
            "overall-isi-rates": isiRatesData.toString() + "%",
            "overall-isi-comments": data["isi"]["comments"],

            "overall-css-signal-texts": data["css"]["signal-texts"],
            "overall-css-signals": charts['css-signals'],
            "overall-css-points": cssPointsData.toString() + "점  /",
            "overall-css-rates": cssRatesData.toString() + "%",
            "overall-css-comments": data["css"]["comments"],

            "koss-sf-signals": charts['koss-sf-signals'],
            "koss-sf-surroundings": charts['koss-sf-surroundings'],
            "koss-sf-instability": charts['koss-sf-instability'],
            "koss-sf-demands": charts['koss-sf-demands'],
            "koss-sf-culture": charts['koss-sf-culture'],
            "koss-sf-autonomy": charts['koss-sf-autonomy'],
            "koss-sf-system": charts['koss-sf-system'],
            "koss-sf-conflict": charts['koss-sf-conflict'],
            "koss-sf-changes-by-year": charts['koss-sf-changes-by-year'],
            "koss-sf-comment-details": data["koss-sf"]["comment-details"],

            "koss-sf-surroundings-points": kosssfCompensationData[0].toString() + "점  /",
            "koss-sf-surroundings-rates": kosssfCompensationData[1] + "%",
            "koss-sf-instability-points": kosssfCompensationData[0].toString() + "점  /",
            "koss-sf-instability-rates": kosssfJobInstabilityData[1] + "%",
            "koss-sf-demands-points": kosssfCompensationData[0].toString() + "점  /",
            "koss-sf-demands-rates": kosssfRequirementsData[1] + "%",
            "koss-sf-culture-points": kosssfCompensationData.toString() + "점  /",
            "koss-sf-culture-rates": kosssfCultureData[1] + "%",
            "koss-sf-autonomy-points": kosssfCompensationData[0].toString() + "점  /",
            "koss-sf-autonomy-rates": kosssfAutonomyData[1] + "%",
            "koss-sf-system-points": kosssfCompensationData[0].toString() + "점  /",
            "koss-sf-system-rates": kosssfSystemData[1] + "%",
            "koss-sf-conflict-points": kosssfCompensationData.toString() + "점  /",
            "koss-sf-conflict-rates": kosssfRelationshipData[1] + "%",

            "phq-9-signals": charts['phq-9-signals'],
            "phq-9-rates": phq9RatesData.toString() + "%",
            "phq-9-signal-texts": data["phq-9"]["signal-texts"],
            "phq-9-rate-bar": charts['phq-9-rate-bar'],
            "phq-9-comments": data["phq-9"]["comments"],
            "phq-9-requirements": data["phq-9"]["requirements"],
            "phq-9-requirements-texts": data["phq-9"]["requirement-texts"],
            "phq-9-changes-by-year": charts['phq-9-changes-by-year'],
            "phq-9-comment-details": data["phq-9"]["comment-details"],

            "gad-7-signals": charts['gad-7-signals'],
            "gad-7-rates": gad7RatesData.toString() + "%",
            "gad-7-signal-texts": data["gad-7"]["signal-texts"],
            "gad-7-rate-bar": charts['gad-7-rate-bar'],
            "gad-7-comments": data["gad-7"]["comments"],
            "gad-7-requirements": data["gad-7"]["requirements"],
            "gad-7-requirements-texts": data["gad-7"]["requirement-texts"],
            "gad-7-changes-by-year": charts['gad-7-changes-by-year'],
            "gad-7-comment-details": data["gad-7"]["comment-details"],

            "adnm-4-signals": charts['adnm-4-signals'],
            "adnm-4-rates": adnm4RatesData.toString() + "%",
            "adnm-4-signal-texts": data["adnm-4"]["signal-texts"],
            "adnm-4-rate-bar": charts['adnm-4-rate-bar'],
            "adnm-4-comments": data["adnm-4"]["comments"],
            "adnm-4-requirements": data["adnm-4"]["requirements"],
            "adnm-4-requirements-texts": data["adnm-4"]["requirement-texts"],
            "adnm-4-changes-by-year": charts['adnm-4-changes-by-year'],
            "adnm-4-comment-details": data["adnm-4"]["comment-details"],

            "pc-ptsd-5-signals": charts['pc-ptsd-5-signals'],
            "pc-ptsd-5-rates": pcptsd5RatesData.toString() + "%",
            "pc-ptsd-5-signal-texts": data["pc-ptsd-5"]["signal-texts"],
            "pc-ptsd-5-rate-bar": charts['pc-ptsd-5-rate-bar'],
            "pc-ptsd-5-comments": data["pc-ptsd-5"]["comments"],
            "pc-ptsd-5-requirements": data["pc-ptsd-5"]["requirements"],
            "pc-ptsd-5-requirements-texts": data["pc-ptsd-5"]["requirement-texts"],
            "pc-ptsd-5-changes-by-year": charts['pc-ptsd-5-changes-by-year'],
            "pc-ptsd-5-comment-details": data["pc-ptsd-5"]["comment-details"],

            "isi-signals": charts['isi-signals'],
            "isi-rates": isiRatesData.toString() + "%",
            "isi-signal-texts": data["isi"]["signal-texts"],
            "isi-rate-bar": charts['isi-rate-bar'],
            "isi-comments": data["isi"]["comments"],
            "isi-requirements": data["isi"]["requirements"],
            "isi-requirements-texts": data["isi"]["requirement-texts"],
            "isi-changes-by-year": charts['isi-changes-by-year'],
            "isi-comment-details": data["isi"]["comment-details"],

            "css-signals": charts['css-signals'],
            "css-rates": cssRatesData.toString() + "%",
            "css-signal-texts": data["css"]["signal-texts"],
            "css-rate-bar": charts['css-rate-bar'],
            "css-comments": data["css"]["comments"],
            "css-requirements": data["css"]["requirements"],
            "css-requirements-texts": data["css"]["requirement-texts"],
            "css-changes-by-year": charts['css-changes-by-year'],
            "css-comment-details": data["css"]["comment-details"],
        }
    ];

    // jpg 경로 생성 준비
    // 센터코드 => 센터명 변경
    const centerCode = data["path-info"]["center-code"]
    let centerName;
    // if문으로 대체
    // switch (centerCode) {
    //     case 111:
    //         centerName = "his_jno"
    //         break;
    //     case 112:
    //         centerName = "his_ydp"
    //         break;
    //     case 113:
    //         centerName = "his_gnm"
    //         break;
    //     case 211:
    //         centerName = "his_swn"
    //         break;
    //     case 611:
    //         centerName = "his_tae"
    //         break;
    //     case 612:
    //         centerName = "his_pus"
    //         break;
    //     case 711:
    //         centerName = "his_kwj"
    //         break;
    // }
    if (centerCode == 111) {
        centerName = "his_jno"
    } else if (centerCode == 112) {
        centerName = "his_ydp"
    } else if (centerCode == 113) {
        centerName = "his_gnm"
    } else if (centerCode == 211) {
        centerName = "his_swn"
    } else if (centerCode == 611) {
        centerName = "his_tae"
    } else if (centerCode == 612) {
        centerName = "his_pus"
    } else if (centerCode == 711) {
        centerName = "his_kwj"
    }


    const submitDate = data["basic-info"]["submit-date"].replace(/-/g, "") // 기존 데이터 활용 위해. '-' 제거
    const reservationNumber = data["path-info"]["reservation-number"]

    // pdf 생성 경로에 따른 디렉토리 생성 + pdf 파일명 설정
    const pdfPath = await makeDir('pdf')
    const pdfName = `${pdfPath}/${centerCode}_${submitDate}_${reservationNumber}.pdf`;

    try {
        const pdf = await labelmake({ inputs, template, font })
        fs.writeFileSync(pdfName, pdf, "utf-8");

        // jpg 생성 경로에 따른 디렉토리 생성 + jpg 파일명 설정
        const jpgPath = await makeDir(`jpg/${centerName}/${submitDate}`)
        const options = {
            density: 100,
            savePath: jpgPath,
            saveFilename: `${reservationNumber}`,
            format: "jpg",
            width: 2100,
            height: 2970
        };
        const storeAsImage = fromPath(pdfName, options);
        let pages = 0;
        for (let i = 1; i < 11; i++) {
            await storeAsImage(i);
            pages++;
        }
        console.log(`Convert complete.`);
        return pages;
    } catch(exception) {
        console.log(exception)
    }
}

// 사용안함
// async function rsyncFile() {
//     try {
//         const command = util.promisify(exec)
//         // await command('rsync --remove-source-files -ar jpg/ ~/'); // 수신지가 바뀌면 되지 않을까 싶음.
//         await command('touch test.js'); // 접속이 되려나?
//         // await exec('rsync --remove-source-files -ar jpg/ eg2data@34.64.201.251:/');
//         // await exec('rsync --remove-source-files -ar -e jpg/ ssh -i ~/.ssh/report_rsa_4096 eg2data@34.64.201.251:/');
//     } catch(exception) {
//         console.log(exception)
//     }
// }

export {
    generateChart, generateFile
}

