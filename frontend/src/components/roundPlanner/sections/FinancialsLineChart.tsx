import { Paper } from '@material-ui/core'
import React from 'react'
import { Line} from "react-chartjs-2"
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
                            
                          return "end"
                        },
                      display: (context) => {
                        return context.dataset.label === "Revenue";
                      },
                      formatter: (value, context) => {

                        console.log(context)

                        if (Number(ebitdaDataSet[context.dataIndex]) < 0){
                            return (Math.round((Number(ebitdaDataSet[context.dataIndex]) / value ) * 100) - 100 + '%')
                        }else{
                            return (Math.round((Number(ebitdaDataSet[context.dataIndex]) / value ) * 100)+ '%')
                        }


                      }
                    }
                  }  
             }}
              />
        </Paper>
    )
}

export default FinancialsLineChart