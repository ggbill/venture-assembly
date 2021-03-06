import './purchaseSection.scss'
import React, { useState } from 'react'
import { Button, Card, CardActionArea, CardContent } from '@material-ui/core'
import RocketSmall from '../../../images/rocket-small.png'
import RocketMedium from '../../../images/rocket-med.png'
import useGoogleAnalytics from '../../../hooks/useGoogleAnalytics'

// import { loadStripe } from "@stripe/stripe-js";
// const stripePromise = loadStripe("pk_test_IUtytCqkv6fvF1xxCSdFkaXf");

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
    setIsDownloadPDFDialogOpen: (boolean: boolean) => void
    setIsCallBookingDialogOpen: (boolean: boolean) => void
}

const PurchaseSection = (props: InputProps) => {

    // const [message, setMessage] = useState("");
    const [raised1, setRaised1] = useState(false);
    const [raised2, setRaised2] = useState(false);

    const googleAnalytics = useGoogleAnalytics()

    // useEffect(() => {
    //     // Check to see if this is a redirect back from Checkout
    //     const query = new URLSearchParams(window.location.search);
    //     if (query.get("success")) {
    //         setMessage("Order placed! You will receive an email confirmation.");
    //         // alert("Order placed! You will receive an email confirmation.");
    //     }
    //     if (query.get("canceled")) {
    //         setMessage(
    //             "Order canceled -- continue to shop around and checkout when you're ready."
    //         );
    //         // alert(
    //         //     "Order canceled -- continue to shop around and checkout when you're ready."
    //         // );
    //     }
    // }, []);

    const handleOpenPdfDownloadDialog = () => {
        googleAnalytics.trackButtonClick("Open PDF Download Dialog")
        props.setIsDownloadPDFDialogOpen(true)
    }

    const handleOpen15MinCallBookingDialog = () => {
        googleAnalytics.trackButtonClick("Open 15 Min Call Booking Dialog")
        props.setIsCallBookingDialogOpen(true)
    }


    return (
        <div className="purchase-section">
            <div className="content">
                <span className="page-subtitle">Next Steps</span>

                <div className="row-wrapper">
                    <Card onMouseOver={() => setRaised1(!raised1)}
                        onMouseOut={() => setRaised1(!raised1)}
                        raised={raised1}
                        onClick={handleOpenPdfDownloadDialog}>
                        <CardContent>
                            {/* <span className="level">Basic</span> */}
                            <span className="title">Download Round Planner PDF</span>
                            {/* <DownloadSVG className="logo" /> */}
                            <div className="image-wrapper">
                                <img className="image" src={RocketSmall} alt="VA Download Round Planner Rocket" />
                            </div>
                            <div className="price">Free <span className="always">(Always)</span></div>
                            <Button className="va-button" onClick={handleOpenPdfDownloadDialog}>Download</Button>
                            <span className="description">
                                <ul>
                                    <li>Instantly download all the information entered in the form above.</li>
                                    <li>Customise for your company, optionally adding contact details and logo.</li>
                                    <li>No messing around or faff, just download a PDF to do whatever you like with.</li>
                                </ul>

                            </span>
                        </CardContent>

                    </Card>
                    <Card onMouseOver={() => setRaised2(!raised2)}
                        onMouseOut={() => setRaised2(!raised2)}
                        raised={raised2}
                        onClick={handleOpen15MinCallBookingDialog}
                    >
                        <CardContent>
                            {/* <span className="level">Intermediate</span> */}
                            <span className="title">15 Minute "What Next?" Call</span>
                            {/* <QuestionSVG className="logo" /> */}
                            <div className="image-wrapper">
                                <img className="image" src={RocketMedium} alt="VA Book 15 Min Call Rocket" />
                            </div>

                            <div className="price">Free <span className="limited-time">(Limited time only)</span></div>
                            <Button className="va-button" onClick={handleOpen15MinCallBookingDialog}>Book</Button>
                            <span className="description">
                                <ul>
                                    <li>Book a 15 minute slot to have a chat with us about your company, whether you are looking to raise capital or not.</li>
                                    <li>We have over 10 years experience and can offer help and advice on the next steps on your journey.</li>
                                    {/* <li>Why are we offering this free? We are just starting out on our own startup journey so understanding the types of things our users are
                                        looking for will help to shape the future roadmap of our product. It won't last forever so make the most of it!</li> */}
                                </ul>
                                <div className="extra-info">* Why are we offering this free? We are just starting out on our own startup journey so understanding the types of things our users are
                                        looking for will help to shape the future roadmap of our product. It won't last forever so make the most of it!</div>

                            </span>
                        </CardContent>

                    </Card>
                    {/* <Card>
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

                    </Card> */}
                </div>
            </div>
        </div>
    )
}

export default PurchaseSection