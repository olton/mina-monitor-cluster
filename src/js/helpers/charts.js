export const chartOptions = {
    border: {
        color: "transparent"
    },
    height: 100,
    legend: {
        position: 'top-left',
        vertical: true,
        background: "#fff",
        margin: {
            left: 4,
            top: 4
        },
        border: {
            color: "#fafbfc"
        },
        padding: 2,
        font: {
            color: "#24292e",
            size: 10
        },
    },
    axis: {
        x: {
            line: {
                color: "#fafbfc",
                shortLineSize: 0
            },
            label: {
                count: 10,
                fixed: 0,
                color: "#24292e",
                font: {
                    size: 10
                }
            },
            skip: 2,
        },
        y: {
            line: {
                color: "#fafbfc"
            },
            label: {
                count: 10,
                fixed: 0,
                color: "#24292e",
                font: {
                    size: 10
                },
                skip: 2,
                showLabel: false
            }
        }
    },
    arrows: false,
    padding: 0,
    margin: 0,
    boundaries: {
        maxY: 0,
        minY: 0
    },
    tooltip: false,
    onDrawLabelX: () => ''
}

export const gaugeOptions = {
    radius: 80,
    backWidth: 20,
    valueWidth: 20,
    border: false,
    fillStyle: [
        [30, '#00fa9a'],
        [60, '#60a917'],
        [80, '#f0a30a'],
        [90, '#ff6347'],
        [100, '#a20025']
    ],
    value: {
        color: "#7dc37b",
        font: {
            size: 20
        }
    },
    label: {
        min: false,
        max: false,
    },
    padding: 0,
    margin: 0,
    backStyle: '#f0f6fc',
    onDrawValue: (v, p) => +p.toFixed(0) + "%"
}

export const histogramOptions = {
    bars: [{
        name: "Bar",
        stroke: '#fff',
        color: Metro.colors.toRGBA('#00AFF0', .5)
    }],
    boundaries: {
        maxY: 100,
        minY: 0
    },
    graphSize: 20,
    legend: {
        position: 'top-left',
        vertical: true,
        background: Metro.colors.toRGBA('#ffffff', .2),
        margin: {
            left: 4,
            top: 4
        },
        border: {
            color: "#fafbfc"
        },
        padding: 2,
        font: {
            color: "#24292e",
            size: 10
        },
    },
    axis: {
        x: {
            line: {
                color: "#fafbfc",
                shortLineSize: 0
            },
            label: {
                count: 10,
                color: "#24292e",
            },
            arrow: false
        },
        y: {
            line: {
                color: "#fafbfc"
            },
            label: {
                count: 10,
                font: {
                    size: 10
                },
                color: "#24292e",
                skip: 2,
                fixed: 0
            },
            arrow: false,
        }
    },
    padding: 1,
    border: {
        color: "transparent"
    },
    onDrawLabelX: () => "",
    onDrawLabelY: () => ""
}