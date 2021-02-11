import { Paper } from '@material-ui/core';
import React from 'react'
import { Line } from "react-chartjs-2";
import './financialsLineChart.scss'

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
                // data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "EBITDA",
                data: ebitdaDataSet,
                // data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    return (
        <Paper className="financials-line-chart">
            <Line data={data} />
        </Paper>
    )
}

export default FinancialsLineChart