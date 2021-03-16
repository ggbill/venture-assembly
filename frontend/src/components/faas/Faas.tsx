import { Accordion, AccordionDetails, AccordionSummary, Button, Card } from '@material-ui/core'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import './faas.scss'
import '../pitchDeckReview/pitchDeckReview.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Faas = () => {

    const [isFaasDialogOpen, setIsFaasDialogOpen] = useState<boolean>(false)

    return (
        <div className="faas-page">
            <MenuBar />
            <div className="content top-page-margin">
                <section className="intro-section">
                    <span className="page-title">👨‍🔧👩‍🏭👨‍💻 Founder as a Service (FaaS).</span>
                    <p>
                        Bring the Venture Assembly team on board as co-founders for your company. We have a range of skills, experience and contacts that
                        we can bring to your organisation that can be used to suppliment your existing team. This can be structured on a one of basis for a specific use case
                        or as an ongoing relationship.
                    </p>
                    <Button className="va-button" onClick={() => setIsFaasDialogOpen(true)}>Make an Enquiry</Button>
                </section>
                {/* <div className="feedback-section">
                    <span className="feedback">
                        "Ed's experience and the sheer number of decks he's seen mean he and the team are in a brilliant position to be able to give really
                        useful and practical advice on how to improve a pitch deck. He provided some really excellent pointers that I never would have thought
                        of myself!"
                    </span>
                    <div className="feedbacker-wrapper">
                        <div className="images-wrapper">
                            <a href="https://www.switchd.co.uk" target="_blank" rel="noreferrer">
                                <img className="logo" src={SwitchdImage} alt="Switchd Logo" />
                                <img className="avatar" src={LlwelynImage} alt="Llwelynn Kinch" />
                            </a>

                        </div>
                        <div className="name-wrapper">
                            <span className="name">
                                Llewellyn Kinch
                             </span>
                            <span className="position">
                                Co-Founder <a href="https://www.switchd.co.uk" target="_blank" rel="noreferrer">Switchd</a>
                            </span>
                        </div>
                    </div>
                </div> */}
                <section className="how-it-works-section">
                    <span className="page-subtitle">How it works.</span>
                    <div className="steps-wrapper">
                        <Card className="step-card">
                            <span className="title">1. Make an enquiry 👋</span>
                            <span className="description">Use the button above to let us know specifically what you want to use the service for and to enquire about availability.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">2. Book Session 📅</span>
                            <span className="description">We will send you an invoice for your desired number of sessions, once paid we will send a <a href="https://calendly.com/" target="_blank" rel="norefferer">Calendly</a> link to book an available slot.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">3. FaaS Session 👨‍🔧👩‍🏭</span>
                            <span className="description">You will have a dedicated co-founder from our team and we will bring in other specialist co-founders depending on your requirements.</span>
                        </Card>
                        <Card className="step-card">
                            <span className="title">4. Ongoing Support 💡</span>
                            <span className="description">If you sign up for a series of sessions, we will constantly be on the lookout and keep you notified of
                             opportunities or ideas that could be beneficial, specifically to your business or situation.</span>
                        </Card>
                    </div>
                </section>

                <section className="packages-section">
                    <span className="page-subtitle">Packages.</span>
                    <div className="packages-wrapper">
                        <div className="package-card">
                            <Card>
                                <span className="title">📞 One Off</span>
                                <span className="description">You have a specific task or challenge that you could use some help, guidance or advice for. This could be when about to embark
                            on a funding round, looking to hire new personnel or rebuilding your website.</span>
                                <span className="sub-title">Specifics</span>
                                <span className="structure">1 x 45 minute call. No dedicated slack channel.</span>
                                <span className="sub-title">Cost</span>
                                <span className="cost">£200.</span>
                            </Card>
                        </div>
                        <div className="package-card">
                            <Card>
                                <span className="title">📆 Monthly</span>
                                <span className="description">Monthly calls to update on progress against agreed targets. An ongoing open line of communication through our dedicated Slack channel.</span>
                                <span className="sub-title">Specifics</span>
                                <span className="structure">1 x 45 minute call per month. Dedicated slack channel.</span>
                                <span className="sub-title">Cost</span>
                                <span className="cost">£300 / month.</span>
                            </Card>
                        </div>
                        <div className="package-card">
                            <Card>
                                <span className="title">📆 Fortnightly</span>
                                <span className="description">Fortnightly calls to update on progress against agreed targets. An ongoing open line of communication through our dedicated Slack channel.</span>
                                <span className="sub-title">Specifics</span>
                                <span className="structure">2 x 45 minute calls per month. Dedicated slack channel.</span>
                                <span className="sub-title">Cost</span>
                                <span className="cost">£500 / month.</span>
                            </Card>
                        </div>
                        <div className="package-card">
                            <Card>
                                <span className="title">📆 Weekly</span>
                                <span className="description">Weekly calls to update on progress against agreed targets. An ongoing open line of communication through our dedicated Slack channel.</span>
                            <span className="sub-title">Specifics</span>
                                <span className="structure">4 x 45 minute calls per month. Dedicated slack channel.</span>
                                <span className="sub-title">Cost</span>
                                <span className="cost">£1,000 / month.</span>
                            </Card>
                        </div>



                    </div>
                </section>

                <section className="faq-section">
                    <span className="page-subtitle">FAQs.</span>
                    <div className="accordion-wrapper">
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ Is this service just a series of zoom calls?
                        </AccordionSummary>
                            <AccordionDetails>
                                <span>📣 Absolutely not. The FaaS model is based around regular calls to keep a structure to the relationship and to encourage open discussions about
                                ideas and strategy. However, we will constantly be looking out for new opportunities, customers, partnerships, etc that we come across on a day to day
                                basis and letting you know by <a href="https://www.yac.com/" target="_blank" rel="norefferer">Yac</a> as soon as they crop up. We really do want you to feel like us as a part of your team, albeit limited to a certain
                                number of hours per month.</span>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ What skills can you bring to the table
                        </AccordionSummary>
                            <AccordionDetails>
                                📣
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ What if I do not find your input useful?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣
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

                </section>
            </div>

            {/* <PitchDeckReviewDialog
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
            /> */}

        </div>
    )
}

export default Faas
