import { Paper } from '@material-ui/core'
import React from 'react'
import { Line, Radar } from "react-chartjs-2"
import './radarChart.scss'
import "chartjs-plugin-datalabels"

interface InputProps {
    roundDetails: App.RoundDetails
}


const RadarChart = (props: InputProps) => {


    let data = {
        labels: ['Team', 'Technology', 'Advisors', 'Traction', 'Market'],
        datasets: [{
            data: [
                props.roundDetails.swot.team,
                props.roundDetails.swot.technology,
                props.roundDetails.swot.advisors,
                props.roundDetails.swot.traction,
                props.roundDetails.swot.market,
            ],
            fill: true,
            backgroundColor: "#da416778",
            borderColor: "#da4167",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#da4167",
        }]
    };

    return (
        <Paper className="radar-chart">
            <Radar
                data={data}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            max: 5,
                            min: 0,
                            stepSize: 1
                        }
                      }
                    
                }}
            />
        </Paper>
    )
}

export default RadarChart