import { Paper } from '@material-ui/core'
import React from 'react'
import { Line } from "react-chartjs-2"
import './financialsLineChart.scss'
import "chartjs-plugin-datalabels"

interface InputProps {
    roundDetails: App.RoundDetails
}


const FinancialsLineChart = (props: InputProps) => {

    // let revenueDataSet, ebitdaDataSet: Number[] = []
    let revenueDataSet: Number[] = []
    let ebitdaDataSet: Number[] = []

    if (props.roundDetails.financials) (
        props.roundDetails.financials.forEach(element => {
            // console.log(element)
            revenueDataSet.push(element.revenue)
            ebitdaDataSet.push(element.ebitda)
        })
    )


    let data = {
        labels: ["Year 1", "Year 2", "Year 3"],
        datasets: [
            {
                label: "Revenue",
                data: revenueDataSet,
                fill: true,
                backgroundColor: "rgba(218,65,103,0.2)",
                borderColor: "rgba(218,65,103,1)"
            },
            {
                label: "EBITDA",
                data: ebitdaDataSet,
                fill: false,
                borderColor: "#07A0C3"
            }
        ]
    };

    return (
        <Paper className="financials-line-chart">
            <Line
                data={data}
                options={{
                    plugins: {
                        datalabels: {
                            align: (context) => {
                                if (context.dataIndex === 0) {
                                    return "right"
                                } else if (context.dataIndex === 2) {
                                    return "left"
                                } else {
                                    return "start"
                                }
                            },
                            display: (context) => {
                                return context.dataset.label === "Revenue";
                            },
                            formatter: (value, context) => {
                                if (Number(ebitdaDataSet[context.dataIndex]) < 0) {
                                    return (`Margin: \n ${Math.round((Number(ebitdaDataSet[context.dataIndex]) / value) * 100) - 100}%`)
                                } else {
                                    return (`Margin: \n${Math.round((Number(ebitdaDataSet[context.dataIndex]) / value) * 100)}%`)
                                }
                            },
                            textAlign: 'center',
                            font: {
                                // weight: 'bold',
                                size: 12,
                                family: 'Poppins',
                            },
                            color: "black",
                            backgroundColor: "#da41677a",
                            borderColor: "#d81747",
                            borderRadius: 4,
                            clamp: true
                        }
                    },
                    tooltips: { enabled: false },
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                userCallback: function (value, index, values) {
                                    return (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value))
                                }
                            }
                        }]
                    }
                }}
            />
        </Paper>
    )
}

export default FinancialsLineChart