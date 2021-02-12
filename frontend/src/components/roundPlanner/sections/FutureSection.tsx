import './futureSection.scss'
import React from 'react'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const FutureSection = (props: InputProps) => {

    return (
        <div className="multiple-section">
            <div className="content">
                <h1>Future.</h1>
                <h3>Exit Multiples.</h3>

                <Paper className="multiples-table" >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <span>10x</span>
                                </TableCell>
                                <TableCell>
                                    <span>25x</span>
                                </TableCell>
                                <TableCell>
                                    <span>50x</span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 10)}
                                </TableCell>
                                <TableCell>
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 25)}
                                </TableCell>
                                <TableCell>
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 50)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        </div>
    )
}

export default FutureSection