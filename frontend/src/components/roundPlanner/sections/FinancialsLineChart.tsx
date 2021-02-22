import { Paper } from '@material-ui/core'
import React, { useRef } from 'react'
import { Line } from "react-chartjs-2"
import './financialsLineChart.scss'
import "chartjs-plugin-datalabels"

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
}


const FinancialsLineChart = (props: InputProps) => {
    const chartRef = useRef<any>(null);

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
                ref={chartRef}
                data={data}
                options={{
                    animation: {
                        onComplete: function () {
                            // console.log("animation complete")
                            props.setRoundDetails({ ...props.roundDetails, financialsBase64String: chartRef.current.chartInstance.toBase64Image() })
                        }
                    },
                    plugins: {
                        datalabels: {
                            align: (context) => {

                                return "end"
                            },
                            display: (context) => {
                                return context.dataset.label === "Revenue";
                            },
                            formatter: (value, context) => {
                                if (Number(ebitdaDataSet[context.dataIndex]) < 0) {
                                    return (Math.round((Number(ebitdaDataSet[context.dataIndex]) / value) * 100) - 100 + '%')
                                } else {
                                    return (Math.round((Number(ebitdaDataSet[context.dataIndex]) / value) * 100) + '%')
                                }
                            }
                        }
                    },
                    tooltips: {

                        callbacks: {
                            label: function (tooltipItem, data) {
                                return (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(tooltipItem.value))
                            },
                            afterLabel: function (tooltipItem, data) {
                                console.log(tooltipItem)
                                if (tooltipItem.datasetIndex === 0) {
                                    if (Number(ebitdaDataSet[tooltipItem.index]) < 0) {
                                        return (`Margin:  ${Math.round((Number(ebitdaDataSet[tooltipItem.index]) / tooltipItem.value) * 100) - 100}%`)
                                    } else {
                                        return (`Margin: ${Math.round((Number(ebitdaDataSet[tooltipItem.index]) / tooltipItem.value) * 100)}%`)
                                    }
                                }
                            }
                        },
                        textAlign: 'center',
                        font: {
                            // weight: 'bold',
                            size: 12,
                            family: 'Poppins',
                        },
                        color: "black",
                        backgroundColor: "#071013",
                        borderRadius: 4,
                    },
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