import './purchaseSection.scss'
import React from 'react'
import { Button, Card, CardActionArea } from '@material-ui/core'
import { ReactComponent as DownloadSVG } from '../../../images/download.svg'
import { ReactComponent as QuestionSVG } from '../../../images/question.svg'
import { ReactComponent as CallSVG } from '../../../images/call.svg'

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
    setIsPitchDeckBookingDialogOpen: (boolean: boolean) => void
}

const PurchaseSection = (props: InputProps) => {

    return (
        <div className="purchase-section">
            <div className="content">
                <h1>Still looking for more?</h1>

                <div className="row-wrapper">
                    <Card>
                        <CardActionArea>
                            <span className="level">Basic</span>
                            <span className="title">Download Round Planner Pack</span>
                            <DownloadSVG className="logo" />
                            <span className="price">£10</span>
                            <Button className="va-button">Buy</Button>
                            <span className="description">
                                Round Planner Pack includes:
                                <ul>
                                    <li>All information and insights included in this page in shareable pdf format (see example <a href='#'>here</a>)</li>
                                    <li>A list of ten questions likely to be asked by potential investors, generated based on the information provided in the form above.</li>
                                </ul>

                            </span>
                        </CardActionArea>

                    </Card>
                    <Card>
                        <CardActionArea>
                            <span className="level">Intermediate</span>
                            <span className="title">Planner Pack Reviewed with Questions</span>
                            <QuestionSVG className="logo" />
                            <span className="price">£25</span>
                            <Button className="va-button">Buy</Button>
                            <span className="description">
                                Round Planner Pack includes:
                                <ul>
                                    <li>All information and insights included in this page in shareable pdf format (see example <a href='#'>here</a>)</li>
                                    <li>A list of ten questions likely to be asked by potential investors, generated based on the information provided in the form above.</li>
                                </ul>

                            </span>
                        </CardActionArea>

                    </Card>
                    <Card>
                        <CardActionArea onClick={() => props.setIsPitchDeckBookingDialogOpen(true)}>
                            <span className="level">Advanced</span>
                            <span className="title">Planner Pack and Pitch Deck Online Review Session</span>
                            <CallSVG className="logo" />
                            <span className="price">£100</span>
                            <Button className="va-button" onClick={() => props.setIsPitchDeckBookingDialogOpen(true)}>Book a Session</Button>
                            <span className="description">
                                Round Planner Pack includes:
                                <ul>
                                    <li>All information and insights included in this page in shareable pdf format (see example <a href='#'>here</a>)</li>
                                    <li>A list of ten questions likely to be asked by potential investors, generated based on the information provided in the form above.</li>
                                </ul>
                            </span>
                        </CardActionArea>

                    </Card>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSection