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
const signalsScales =  {
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

//  2) 가로바(채움)
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

//  4) 가로바(점)
const kosssfScales =  {
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


async function generateChart() {
    // 4. <configurations>
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

    // 왜 안돼? (switch, 함수)
    // function pickColor(config) {
    //     const data = config.data.datasets[0].data
    //     const color = config.options.plugins.datalabels.color[0]
    //     const backgroundColor = config.options.plugins.datalabels.backgroundColor[0]
    //
    //     if (data == 24) {
    //         color = '#00cccc' // 왜 안돼?
    //         backgroundColor = '#00cccc'
    //     }
    // 왜 안돼?
    // switch (kosssfSignalsConfig.data.datasets[0].data) {
    //     case 24:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#00cccc'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#00cccc'
    //     case 45:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#ffb266'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#ffb266'
    //     case 66:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#Ff0000'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#Ff0000'
    //     case 87:
    //         kosssfSignalsConfig.options.plugins.datalabels.color[0] = '#994c00'
    //         kosssfSignalsConfig.options.plugins.datalabels.backgroundColor[0] = '#994c00'
    // }

    // 입력값에 따른 색상+위치 변경 구현
    // switch + 함수 적용해보기
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

    //  2) 가로바(채움)
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

    //  3) 연도별
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

    //  4) 가로바(점)
    const kosssfSurroundingsConfig = {
        type: 'bar',
        data: {
            labels: ['a'],
            datasets: [
                {
                    data: kosssfSurroundingsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
                    data: kosssfInstabilityData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
                    data: kosssfDemandsData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
                    data: kosssfCultureData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
                    data: kosssfAutonomyData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
                    data: kosssfSystemData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
                    data: kosssfConflictData.splice(0,1), // [0]은 안되고 splice(0,1)은 되네 거참
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
    //  1) 신호등
    const kosssfSignalsChart = await signalsCanvas.renderToDataURL(kosssfSignalsConfig)
    const phq9SignalsChart = await signalsCanvas.renderToDataURL(phq9SignalsConfig)
    const gad7SignalsChart = await signalsCanvas.renderToDataURL(gad7SignalsConfig)
    const adnm4SignalsChart = await signalsCanvas.renderToDataURL(adnm4SignalsConfig)
    const pcptsd5SignalsChart = await signalsCanvas.renderToDataURL(pcptsd5SignalsConfig)
    const isiSignalsChart = await signalsCanvas.renderToDataURL(isiSignalsConfig)
    const cssSignalsChart = await signalsCanvas.renderToDataURL(cssSignalsConfig)

    //  2) 가로바(채움)
    const phq9RateBarChart = await rateBarCanvas.renderToDataURL(phq9RateBarConfig)
    const gad7RateBarChart = await rateBarCanvas.renderToDataURL(gad7RateBarConfig)
    const adnm4RateBarChart = await rateBarCanvas.renderToDataURL(adnm4RateBarConfig)
    const pcptsd5RateBarChart = await rateBarCanvas.renderToDataURL(pcptsd5RateBarConfig)
    const isiRateBarChart = await rateBarCanvas.renderToDataURL(isiRateBarConfig)
    const cssRateBarChart = await rateBarCanvas.renderToDataURL(cssRateBarConfig)

    //  3) 연도별
    const kosssfChangesByYearChart = await changesByYearCanvas.renderToDataURL(kosssfChangeByYearConfig)
    const phq9ChangesByYearChart = await changesByYearCanvas.renderToDataURL(phq9ChangeByYearConfig)
    const gad7ChangesByYearChart = await changesByYearCanvas.renderToDataURL(gad7ChangeByYearConfig)
    const adnm4ChangesByYearChart = await changesByYearCanvas.renderToDataURL(adnm4ChangeByYearConfig)
    const pcptsd5ChangesByYearChart = await changesByYearCanvas.renderToDataURL(pcptsd5ChangeByYearConfig)
    const isiChangesByYearChart = await changesByYearCanvas.renderToDataURL(isiChangeByYearConfig)
    const cssChangesByYearChart = await changesByYearCanvas.renderToDataURL(cssChangeByYearConfig)

    //  4) 가로바(점)
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

export { generateChart };

