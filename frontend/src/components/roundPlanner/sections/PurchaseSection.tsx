import './purchaseSection.scss'
import React, { useEffect, useState } from 'react'
import { Button, Card, CardActionArea, CardContent } from '@material-ui/core'
import { ReactComponent as DownloadSVG } from '../../../images/download.svg'
import { ReactComponent as QuestionSVG } from '../../../images/question.svg'
import { ReactComponent as CallSVG } from '../../../images/call.svg'

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_IUtytCqkv6fvF1xxCSdFkaXf");

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
    // setIsPitchDeckBookingDialogOpen: (boolean: boolean) => void
    setIsDownloadPDFDialogOpen: (boolean: boolean) => void
}

const PurchaseSection = (props: InputProps) => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
            // alert("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
            // alert(
            //     "Order canceled -- continue to shop around and checkout when you're ready."
            // );
        }
    }, []);

    
    return (
        <div className="purchase-section">
            <div className="content">
                <h1>Still looking for more?</h1>

                <div className="row-wrapper">
                    <Card>
                        {/* <CardActionArea> */}
                        <CardContent>
                            <span className="level">Basic</span>
                            <span className="title">Download Round Planner PDF</span>
                            <DownloadSVG className="logo" />
                            <span className="price">Free</span>
                            <Button className="va-button" onClick={() => {props.setIsDownloadPDFDialogOpen(true)}}>Buy</Button>
                            <span className="description">
                                Round Planner Pack includes:
                                <ul>
                                    <li>All information and insights included in this page in shareable pdf format (see example <a href='#'>here</a>)</li>
                                    <li>A list of ten questions likely to be asked by potential investors, generated based on the information provided in the form above.</li>
                                </ul>

                            </span>
                            </CardContent>
                        {/* </CardActionArea> */}

                    </Card>
                    <Card>
                        <CardContent>
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
                        </CardContent>

                    </Card>
                    <Card>
                        <CardContent>
                            <span className="level">Advanced</span>
                            <span className="title">Planner Pack and Pitch Deck Online Review Session</span>
                            <CallSVG className="logo" />
                            <span className="price">£100</span>
                            <Button className="va-button">Book a Session</Button>
                            <span className="description">
                                Round Planner Pack includes:
                                <ul>
                                    <li>All information and insights included in this page in shareable pdf format (see example <a href='#'>here</a>)</li>
                                    <li>A list of ten questions likely to be asked by potential investors, generated based on the information provided in the form above.</li>
                                </ul>
                            </span>
                        </CardContent>

                    </Card>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSection