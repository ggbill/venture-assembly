import { Accordion, AccordionDetails, AccordionSummary, Button, Card } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MenuBar from '../shared/MenuBar'
import './pitchDeckReview.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PitchDeckReviewDialog from './PitchDeckReviewDialog';
import NotificationDialog from '../shared/NotificationDialog';
import { useHistory } from 'react-router-dom'

const PitchDeckReview = () => {

    const [isPitchDeckReviewDialogOpen, setIsPitchDeckReviewDialogOpen] = useState<boolean>(false)
    const [notificationDialogProperties, setNotificationDialogProperties] = useState<any>({ isOpen: false, type: "", title: "", message: "", isShowDonateButton: false })

    const history = useHistory()

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            setNotificationDialogProperties({
                isOpen: true,
                type: "NOTIFICATION",
                title: "🎉 Success!",
                message: "Your card has been charged and a receipt emailed to the email address provided. We will review your pitch deck and notify you via email once it is complete. In the meantime if you have any questions please don't hesitate to drop us an email to hello@ventureassembly.co."
            })
        }
        if (query.get("cancelled")) {
            setNotificationDialogProperties({
                isOpen: true,
                type: "NOTIFICATION",
                title: "⛔ Order Cancelled",
                message: "Your order has been cancelled and your card has not been charged. If you have any questions please don't hesitate to drop us an email to hello@ventureassembly.co."
            })
        }
    }, []);

    return (
        <div className="pitch-deck-review-page">
            <MenuBar />
            <div className="content top-page-margin">
                <div className="intro-wrapper">
                    <span className="page-title">🕵️ Pitch Deck Review.</span>
                    <p>We see hundreds of pitch decks every year and work with investors on a daily basis so we are well placed to provide unbiased opinions and suggestions.
                        The quality of your pitch deck can be instrumental in whether or not you're successful in your fundraising round.</p>
                    <Button className="va-button" onClick={() => setIsPitchDeckReviewDialogOpen(true)}>Let's Go</Button>
                </div>
                <div className="how-it-works-wrapper">
                    <span className="page-subtitle">How it works.</span>
                    <div className="steps-wrapper">
                        <Card className="step-card">
                            <span className="title">1. Book a Session 📆</span>
                            <span className="description">Upload your pitch deck and find a slot in the calendar to book a session.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">2. Fee Payment (£60) 💰</span>
                            <span className="description">Once you have booked, we will email you an online invoice powered by Stripe. Please ensure payment has gone through prior to the call.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">3. Deck Review 🔎</span>
                            <span className="description">We will review your deck in advance of the call.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">4. Feedback Session 💻</span>
                            <span className="description">We will step through your deck with you via video call, providing comments and feedback.</span>
                        </Card>
                    </div>
                </div>
                <div className="faq-wrapper">
                    <span className="page-subtitle">FAQs.</span>
                    <div className="accordion-wrapper">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ How much does a pitch deck review cost?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 Each pitch deck review is £60.
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ How long will the review session be?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 Each pitch deck review is roughly 40 minutes.
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ How will I receive my feedback?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 Having reviewed your deck in advance we will step through your deck with you, providing comments and feedback on each slide.
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ I can't afford a graphic designer to make my deck look super slick, will that be a problem?
                        </AccordionSummary>
                            <AccordionDetails>
                                <div>📣 TLDR version - No.</div>
                                <div>📣 Longer answer - It is certainly not a requirement to use a graphic designer to create a compelling pitch deck.
                                We will be reviewing the content of the deck from the eyes of an investor and will only comment on design if it is affecting the quality of the deck as a whole.</div>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                </div>
            </div>

            <PitchDeckReviewDialog
                handleClose={() => setIsPitchDeckReviewDialogOpen(false)}
                isDialogOpen={isPitchDeckReviewDialogOpen}
            />

            <NotificationDialog
                handleClose={() => {
                    setNotificationDialogProperties({ ...notificationDialogProperties, isOpen: false })
                    history.push(`/pitch-deck-review`)
                }}
                isDialogOpen={notificationDialogProperties.isOpen}
                message={notificationDialogProperties.message}
                title={notificationDialogProperties.title}
                type={notificationDialogProperties.type}
                isShowDonateButton={notificationDialogProperties.isShowDonateButton}
            />

        </div>
    )
}

export default PitchDeckReview
