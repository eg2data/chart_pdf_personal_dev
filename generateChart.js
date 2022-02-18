import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import fs from "fs";
import labelmake from "labelmake";
import template from "./labelmake-template.json";
import {fromPath} from "pdf2pic";

// 한글처리
const NanumGothic = fs.readFileSync("./NanumGothic-Regular.ttf")
const font = {
    NanumGothic : {
        data: NanumGothic,
        subset: false
    }
};

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

async function generateChart(data) {

// <data>
    // 1) 신호등
    const kosssfSignalsData = data["koss-sf"]["signals"]
    const phq9SignalsData = data["phq-9"]["signals"]
    const gad7SignalsData = data["gad-7"]["signals"]
    const adnm4SignalsData = data["adnm-4"]["signals"]
    const pcptsd5SignalsData = data["pc-ptsd-5"]["signals"]
    const isiSignalsData = data["isi"]["signals"]
    const cssSignalsData = data["css"]["signals"]
    // 2) 가로바(채움)
    const phq9RateBarData = data["phq-9"]["rates"]
    const gad7RateBarData = data["gad-7"]["rates"]
    const adnm4RateBarData = data["adnm-4"]["rates"]
    const pcptsd5RateBarData = data["pc-ptsd-5"]["rates"]
    const isiRateBarData = data["isi"]["rates"]
    const cssRateBarData = data["css"]["rates"]
    // 3) 연도별
    const kosssfChangesByYearData = data["koss-sf"]["changes-by-year"]
    const phq9ChangesByYearData = data["phq-9"]["changes-by-year"]
    const gad7ChangesByYearData = data["gad-7"]["changes-by-year"]
    const adnm4ChangesByYearData = data["adnm-4"]["changes-by-year"]
    const pcptsd5ChangesByYearData = data["pc-ptsd-5"]["changes-by-year"]
    const isiChangesByYearData = data["isi"]["changes-by-year"]
    const cssChangesByYearData = data["css"]["changes-by-year"]
    // 4) 가로바(점)
    const kosssfSurroundingsData = data["koss-sf"]["surroundings"]
    const kosssfInstabilityData = data["koss-sf"]["instability"]
    const kosssfDemandsData = data["koss-sf"]["demands"]
    const kosssfCultureData = data["koss-sf"]["culture"]
    const kosssfAutonomyData = data["koss-sf"]["autonomy"]
    const kosssfSystemData = data["koss-sf"]["system"]
    const kosssfConflictData = data["koss-sf"]["conflict"]

// <canvas>
    const signalsCanvas = new ChartJSNodeCanvas({ width: 240, height: 60 }); // 1) 신호등
    const rateBarCanvas = new ChartJSNodeCanvas({ width: 480, height: 36 }); // 2) 가로바(채움)
    const changesByYearCanvas = new ChartJSNodeCanvas({ width: 240, height: 120 }); // 3) 연도별
    const kosssfCanvas = new ChartJSNodeCanvas({ width: 240, height: 36 }); // 4) 가로바(점)

// <label 중 일부>
    const now = new Date();
    const year = now.getFullYear();
    const changesByYearLabels = [
        year-4,
        year-3,
        year-2,
        year-1,
        year,
    ]

// <configurations>
    //  1) 신호등
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

    // 입력값에 따른 색상+위치 변경
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
    }
    // 왜 안돼? (if+else => case)
    // switch (kosssfSignalsConfig.data.datasets[0].data) {
    //     case 24:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    //         break
    //     case 45:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    //         break
    //     case 66:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    //         break
    //     case 87:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    //         break
    // }

    // 2) 가로바(채움)
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
    // 3) 연도별
    const kosssfChangeByYearConfig = {
        type: 'bar',
        data: {
            labels: changesByYearLabels,
            datasets: [
                {
                    data: kosssfChangesByYearData,
                    barPercentage: 0.3,
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
                    barPercentage: 0.3,
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
                    barPercentage: 0.3,
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
                    barPercentage: 0.3,
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
                    barPercentage: 0.3,
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
                    barPercentage: 0.3,
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
                    barPercentage: 0.3,
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
    // 4) 가로바(점)
    const kosssfSurroundingsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfSurroundingsData.slice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참 => splice 사용 시 그 상태 그대로 데이터가 저장됨.. => slice 대체
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
    const kosssfInstabilityConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfInstabilityData.slice(0,1),
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
    const kosssfDemandsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfDemandsData.slice(0,1),
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
    const kosssfConflictConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfConflictData.slice(0,1),
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

    // 5. <generate base64 types img through renderToDataURL>
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
    const kosssfSurroundingsChart = await kosssfCanvas.renderToDataURL(kosssfSurroundingsConfig)
    const kosssfInstabilityChart = await kosssfCanvas.renderToDataURL(kosssfInstabilityConfig)
    const kosssfDemandsChart = await kosssfCanvas.renderToDataURL(kosssfDemandsConfig)
    const kosssfCultureChart = await kosssfCanvas.renderToDataURL(kosssfCultureConfig)
    const kosssfAutonomyChart = await kosssfCanvas.renderToDataURL(kosssfAutonomyConfig)
    const kosssfSystemChart = await kosssfCanvas.renderToDataURL(kosssfSystemConfig)
    const kosssfConflictChart = await kosssfCanvas.renderToDataURL(kosssfConflictConfig)

    // 6. <add to charts and return>
    const charts = {
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

        "koss-sf-surroundings": kosssfSurroundingsChart,
        "koss-sf-instability": kosssfInstabilityChart,
        "koss-sf-demands": kosssfDemandsChart,
        "koss-sf-culture": kosssfCultureChart,
        "koss-sf-autonomy": kosssfAutonomyChart,
        "koss-sf-system": kosssfSystemChart,
        "koss-sf-conflict": kosssfConflictChart,
    }
    return charts
};

async function generateFile(data, charts) {
    // 7. <generate PDF file>
    const inputs = [
        {
            "user-name": data["basic-info"]["user-name"],
            "distinct-number": data["basic-info"]["distinct-number"],
            "classification-code": data["basic-info"]["classification-code"],
            "submit-date": data["basic-info"]["submit-date"],
            "report-date": data["basic-info"]["report-date"],
            "company-info-name": data["basic-info"]["company-info"]["name"],
            "company-info-address": data["basic-info"]["company-info"]["address"],
            "company-info-via": data["basic-info"]["company-info"]["via"],
            "company-info-contact": data["basic-info"]["company-info"]["contact"],
            "check-list-number": data["basic-info"]["check-list-number"] + " 종",
            "test-type": data["basic-info"]["test-type"],
            "test-method": data["basic-info"]["test-method"],
            "test-adequacy": data["basic-info"]["test-adequacy"],

            "overall-user-name": data["basic-info"]["user-name"],
            "overall-classification-code": data["basic-info"]["classification-code-details"],
            "overall-koss-sf-signal-texts": data["koss-sf"]["signal-texts"],
            "overall-koss-sf-signals": charts['koss-sf-signals'],
            "overall-koss-sf-points": data["koss-sf"]["points"].toString() + "점  /",
            "overall-koss-sf-rates": data["koss-sf"]["rates"].toString() + "%",
            "overall-koss-sf-means": data["koss-sf"]["means"].toString() + "점",

            "overall-phq-9-signal-texts": data["phq-9"]["signal-texts"],
            "overall-phq-9-signals": charts['phq-9-signals'],
            "overall-phq-9-points": data["phq-9"]["points"].toString() + "점  /",
            "overall-phq-9-rates": data["phq-9"]["rates"].toString() + "%",
            "overall-phq-9-comments": data["phq-9"]["comments"],

            "overall-gad-7-signal-texts": data["gad-7"]["signal-texts"],
            "overall-gad-7-signals": charts['gad-7-signals'],
            "overall-gad-7-points": data["gad-7"]["points"].toString() + "점  /",
            "overall-gad-7-rates": data["gad-7"]["rates"].toString() + "%",
            "overall-gad-7-comments": data["gad-7"]["comments"],

            "overall-adnm-4-signal-texts": data["adnm-4"]["signal-texts"],
            "overall-adnm-4-signals": charts['adnm-4-signals'],
            "overall-adnm-4-points": data["adnm-4"]["points"].toString() + "점  /",
            "overall-adnm-4-rates": data["adnm-4"]["rates"].toString() + "%",
            "overall-adnm-4-comments": data["adnm-4"]["comments"],

            "overall-pc-ptsd-5-signal-texts": data["pc-ptsd-5"]["signal-texts"],
            "overall-pc-ptsd-5-signals": charts['pc-ptsd-5-signals'],
            "overall-pc-ptsd-5-points": data["pc-ptsd-5"]["points"].toString() + "점  /",
            "overall-pc-ptsd-5-rates": data["pc-ptsd-5"]["rates"].toString() + "%",
            "overall-pc-ptsd-5-comments": data["pc-ptsd-5"]["comments"],

            "overall-isi-signal-texts": data["isi"]["signal-texts"],
            "overall-isi-signals": charts['isi-signals'],
            "overall-isi-points": data["isi"]["points"].toString() + "점  /",
            "overall-isi-rates": data["isi"]["rates"].toString() + "%",
            "overall-isi-comments": data["isi"]["comments"],

            "overall-css-signal-texts": data["css"]["signal-texts"],
            "overall-css-signals": charts['css-signals'],
            "overall-css-points": data["css"]["points"].toString() + "점  /",
            "overall-css-rates": data["css"]["rates"].toString() + "%",
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

            "koss-sf-surroundings-points": data["koss-sf"]["surroundings"][0].toString() + "점  /",
            "koss-sf-surroundings-rates": data["koss-sf"]["surroundings"][1] + "%",
            "koss-sf-instability-points": data["koss-sf"]["instability"][0].toString() + "점  /",
            "koss-sf-instability-rates": data["koss-sf"]["instability"][1] + "%",
            "koss-sf-demands-points": data["koss-sf"]["demands"][0].toString() + "점  /",
            "koss-sf-demands-rates": data["koss-sf"]["demands"][1] + "%",
            "koss-sf-culture-points": data["koss-sf"]["culture"][0].toString() + "점  /",
            "koss-sf-culture-rates": data["koss-sf"]["culture"][1] + "%",
            "koss-sf-autonomy-points": data["koss-sf"]["autonomy"][0].toString() + "점  /",
            "koss-sf-autonomy-rates": data["koss-sf"]["autonomy"][1] + "%",
            "koss-sf-system-points": data["koss-sf"]["system"][0].toString() + "점  /",
            "koss-sf-system-rates": data["koss-sf"]["system"][1] + "%",
            "koss-sf-conflict-points": data["koss-sf"]["conflict"][0].toString() + "점  /",
            "koss-sf-conflict-rates": data["koss-sf"]["conflict"][1] + "%",

            "phq-9-signals": charts['phq-9-signals'],
            "phq-9-rates": data["phq-9"]["rates"].toString() + "%",
            "phq-9-signal-texts": data["phq-9"]["signal-texts"],
            "phq-9-rate-bar": charts['phq-9-rate-bar'],
            "phq-9-comments": data["phq-9"]["comments"],
            "phq-9-requirements": data["phq-9"]["requirements"],
            "phq-9-requirements-texts": data["phq-9"]["requirement-texts"],
            "phq-9-changes-by-year": charts['phq-9-changes-by-year'],
            "phq-9-comment-details": data["phq-9"]["comment-details"],

            "gad-7-signals": charts['gad-7-signals'],
            "gad-7-rates": data["gad-7"]["rates"].toString() + "%",
            "gad-7-signal-texts": data["gad-7"]["signal-texts"],
            "gad-7-rate-bar": charts['gad-7-rate-bar'],
            "gad-7-comments": data["gad-7"]["comments"],
            "gad-7-requirements": data["gad-7"]["requirements"],
            "gad-7-requirements-texts": data["gad-7"]["requirement-texts"],
            "gad-7-changes-by-year": charts['gad-7-changes-by-year'],
            "gad-7-comment-details": data["gad-7"]["comment-details"],

            "adnm-4-signals": charts['adnm-4-signals'],
            "adnm-4-rates": data["adnm-4"]["rates"].toString() + "%",
            "adnm-4-signal-texts": data["adnm-4"]["signal-texts"],
            "adnm-4-rate-bar": charts['adnm-4-rate-bar'],
            "adnm-4-comments": data["adnm-4"]["comments"],
            "adnm-4-requirements": data["adnm-4"]["requirements"],
            "adnm-4-requirements-texts": data["adnm-4"]["requirement-texts"],
            "adnm-4-changes-by-year": charts['adnm-4-changes-by-year'],
            "adnm-4-comment-details": data["adnm-4"]["comment-details"],

            "pc-ptsd-5-signals": charts['pc-ptsd-5-signals'],
            "pc-ptsd-5-rates": data["pc-ptsd-5"]["rates"].toString() + "%",
            "pc-ptsd-5-signal-texts": data["pc-ptsd-5"]["signal-texts"],
            "pc-ptsd-5-rate-bar": charts['pc-ptsd-5-rate-bar'],
            "pc-ptsd-5-comments": data["pc-ptsd-5"]["comments"],
            "pc-ptsd-5-requirements": data["pc-ptsd-5"]["requirements"],
            "pc-ptsd-5-requirements-texts": data["pc-ptsd-5"]["requirement-texts"],
            "pc-ptsd-5-changes-by-year": charts['pc-ptsd-5-changes-by-year'],
            "pc-ptsd-5-comment-details": data["pc-ptsd-5"]["comment-details"],

            "isi-signals": charts['isi-signals'],
            "isi-rates": data["isi"]["rates"].toString() + "%",
            "isi-signal-texts": data["isi"]["signal-texts"],
            "isi-rate-bar": charts['isi-rate-bar'],
            "isi-comments": data["isi"]["comments"],
            "isi-requirements": data["isi"]["requirements"],
            "isi-requirements-texts": data["isi"]["requirement-texts"],
            "isi-changes-by-year": charts['isi-changes-by-year'],
            "isi-comment-details": data["isi"]["comment-details"],

            "css-signals": charts['css-signals'],
            "css-rates": data["css"]["rates"].toString() + "%",
            "css-signal-texts": data["css"]["signal-texts"],
            "css-rate-bar": charts['css-rate-bar'],
            "css-comments": data["css"]["comments"],
            "css-requirements": data["css"]["requirements"],
            "css-requirements-texts": data["css"]["requirement-texts"],
            "css-changes-by-year": charts['css-changes-by-year'],
            "css-comment-details": data["css"]["comment-details"],
        }
    ];
    const path = "./pdf/personal_report_test_220218_11.pdf"
    labelmake({ inputs, template, font })
        .then((pdf) => {
            fs.writeFileSync(path, pdf, "utf-8");
        })
        // 8. <generate JPG file>
        .then(() => {
            const options = {
                density: 100,
                saveFilename: "personal_report_test_220218_11", // 생성된 pdf 이름이 들어오게 할 방법은?
                savePath: "./jpg",
                format: "jpg",
                width: 2100,
                height: 2970
            };
            const storeAsImage = fromPath(path, options);
            for (let i = 1; i < 11; i++) {
                const pageToConvertAsImage = i;
                storeAsImage(pageToConvertAsImage).then((resolve) => {
                    console.log(`Page ${pageToConvertAsImage} is now converted as image`);
                    return resolve;
                });
            }
        })
}

export {
    generateChart, generateFile
}

