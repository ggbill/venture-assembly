import './futureSection.scss'
import React from 'react'
import { Card, FormHelperText, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import useQuestionGenerator from '../../../hooks/useQuestionGenerator';

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const FutureSection = (props: InputProps) => {

    let questionGenerator = useQuestionGenerator()

    return (
        <div className="future-section">
            <div className="content">
                <h1>Future.</h1>
                <h3>Exit Multiples.</h3>

                <div className="row-wrapper">
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
                        <FormHelperText>Angels typically look for 10x returns. So it's worth being able to explain your route to these numbers.</FormHelperText>
                    </Paper>
                    <div></div>
                </div>


                <div className="outro-wrapper">
                    <p>We realise this is getting a bit long, but there is loads more we can share with you.
                        Based on your inputs above, here are a few questions for you to consider. </p>
                    <Card>
                        <h3><span className="emoji">💡</span>Generated Questions</h3>

                        {questionGenerator.generateQuestions().map(question => {
                            return <p>{question}</p>
                        })}
                    </Card>



                    <p>We built this tool, because we are trying to demystify loads of startup issues. Its going to take
                        us a while. For now, you can copy all of this page down for free. </p>

                    <p>There's loads more insights we can share and if you want to download the report with custom questions
                    click below we've set this to give you what you feel its worth (we've set it at £10, any extra goes
                    a long way to helping us make this tool better). Or we can review your pitch deck or book in a slot
                        to call us. </p>
                </div>
            </div>
        </div>
    )
}

export default FutureSection