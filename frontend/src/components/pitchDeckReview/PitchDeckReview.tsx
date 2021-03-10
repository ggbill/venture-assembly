import { Accordion, AccordionDetails, AccordionSummary, Button, Card } from '@material-ui/core'
import React from 'react'
import MenuBar from '../shared/MenuBar'
import './pitchDeckReview.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const PitchDeckReview = () => {
    return (
        <div className="pitch-deck-review-page">
            <MenuBar />
            <div className="content top-page-margin">
                <div className="intro-wrapper">
                    <span className="page-title">🕵️ Pitch Deck Review.</span>
                    <p>We see hundreds of pitch decks every year and work with investors on a daily basis so we are well placed to provide unbiased opinions and suggestions on your pitch deck.
                        The quality of your pitch deck can be instrumental in whether or not you will be successful in your fundraising round.</p>
                    <Button className="va-button">Let's Go</Button>
                </div>
                <div className="how-it-works-wrapper">
                    <span className="page-subtitle">How it works.</span>
                    <div className="steps-wrapper">
                        <Card className="step-card">
                            <span className="title">1. Upload Deck 📤</span>
                            <span className="description">Enter your details at the bottom of this page and upload your pitch deck.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">2. Fee Payment 💰</span>
                            <span className="description">You will be directed to our secure payment portal powered by Stripe. Each review costs £50.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">3. Deck Review 🔎</span>
                            <span className="description">We will aim to have your deck reviewed within 2 working days.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">4. Receive Feedback 📧</span>
                            <span className="description">We will send the review feedback to the email address provided.</span>
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
                                ❓ What format will the feeback be presented in?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 We will send you an email including a video review talking through your deck, along with a 1 page document outlining a summary of the feedback.
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ What should I do if I have not had a response within 2 working days?
                        </AccordionSummary>
                            <AccordionDetails>
                                <div>📣 In the extremely unlikely scenario that you have not heard back fro us in 2 working days please drop us an email to <a href="mailto:hello@ventureassembly.co">hello@ventureassembly.co</a> to notify us of the situation.</div>
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
        </div>
    )
}

export default PitchDeckReview
