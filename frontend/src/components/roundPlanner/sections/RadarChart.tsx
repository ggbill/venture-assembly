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
                    plugins: {
                        datalabels: {
                            opacity: 1,
                            textAlign: 'left',
                            borderColor: '#da4167',
                            borderWidth: 2,
                            borderRadius: 25,
                            color: '#000',
                            font: {
                                // weight: 'bold',
                                // size: 12,
                                // lineHeight: 1 /* align v center */
                                size: 14,
                            weight: 'bold',
                            color: '#000',
                            fontFamily: "'Poppins', 'Helvetica', sans-serif"
                            },
                        padding: {
                            top: 6,
                            left: 8,
                            right: 8,
                            bottom: 4
                        },
                        backgroundColor: 'white',
                            /* hover styling */
                            // backgroundColor: function (context) {
                            //     return context.hovered ? context.dataset.borderColor : 'white';
                            // },
                            // color: function (context) {
                            //     return context.hovered ? 'white' : context.dataset.borderColor;
                            // },
                            listeners: {
                                enter: function (context) {
                                    context.hovered = true;
                                    return true;
                                },
                                leave: function (context) {
                                    context.hovered = false;
                                    return true;
                                }
                            }
                        }
                    },
                    legend: {
                        display: false
                    },
                    scale: {
                        ticks: {
                            beginAtZero: true,
                            max: 5,
                            min: 0,
                            stepSize: 1,
                            display: false
                        },
                        pointLabels: {
                            fontSize: 14,
                            fontStyle: '500',
                            fontColor: '#000',
                            fontFamily: "'Poppins', 'Helvetica', sans-serif"
                        },
                    },
                    tooltips: false

                }}
            />
        </Paper>
    )
}

export default RadarChart