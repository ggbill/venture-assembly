import { Accordion, AccordionDetails, AccordionSummary, Button, Card } from '@material-ui/core'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import './faas.scss'
import '../pitchDeckReview/pitchDeckReview.scss'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FaasEnquiryDialog from './FaasEnquiryDialog'

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
                        we can bring to your organisation that can be used to suppliment your existing team.
                    </p>
                    <p>
                        This service has been deisnged to be as flexible as possible. We will not take any equity in your business and you will not be
                        tied in with long contracts. You can cancel at any time for no penalty and if you feel our service is of no value we will happily
                        provide a refund no questions asked.
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
                                <span className="title">📆 Occasional</span>
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
                                <span className="title">📆 Dedicated </span>
                                <span className="description">Three calls per month with optional guest experts invited to support on specific issues. Priority support through our dedicated Slack channel.</span>
                                <span className="sub-title">Specifics</span>
                                <span className="structure">3 x 45 minute calls per month. Specialist support available. Dedicated slack channel.</span>
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
                                ❓ What types of company will benefit most from FaaS?
                        </AccordionSummary>
                            <AccordionDetails>
                                <span>📣 Founder as a Service (FaaS) is ideal for companies who are looking to fill a skills gap within the team, either on a
                                temporary or longer term basis. Some examples as follows:
                                    <ul>
                                        <li>You are about to undertake a significant project within the company such as a technical implementation or a fundraising
                                            round and you want some specialist advice to ensure the project is a success.
                                        </li>
                                        <li>You have identified a specific skills gap within the team that is holding the company back. However, you do not have the funds
                                            to hire a full time employee or contractor and you do not want to hand over equity to a new co-founder.
                                        </li>
                                        <li>You are in the process of expanding the team and you want support identifying and selecting the right candidate.</li>
                                        <li>You are a single founder and you want a direct line of communication with a team with a range of skills and experience
                                            to validate thinking and bounce around ideas.
                                        </li>
                                    </ul>
                                </span>

                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ What skills can can the VA team bring to my business?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 Our team have vast experience of working closely with startups and are well placed to support with the vast array of activities 
                                that are required to set up and run a new business. We also have more specialist skills in the following areas:
                                <ul>
                                    <li>Fundraising</li>
                                    <li>Technology</li>
                                    <li>Design</li>
                                    <li>Marketing</li>
                                </ul>
                                If we don't think we are well placed to support you for your specific use case we will tell you and even refund you if we agree we have
                                not been of any use. However, we have a strong experience in startups and feel fairly confident that we can bring some sort of value to
                                most companies.
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ How do I know it is going to be worth the cost?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 Every business is different and their needs are unique, so we can't guarantee we are going to be able to help and to a certain extent
                                you will have to suck it and see. However, you can rest assured that our primary goal is to bring benefit and value to your company in 
                                any way that we can. If you feel that we havent been able to do that, we will happily provide you with a full refund.
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                ❓ What is Faas&nbsp;<b>{`not`}</b>&nbsp;suitable for?
                        </AccordionSummary>
                            <AccordionDetails>
                                📣 We will support, advise and guide you on any topics that you require but what we will not do is physically work on tasks on behalf of
                                your company. We act in an advisory role only.
                        </AccordionDetails>
                        </Accordion>

                    </div>

                </section>
            </div>

            <FaasEnquiryDialog
                handleClose={() => setIsFaasDialogOpen(false)}
                isDialogOpen={isFaasDialogOpen}
            />

            {/* <NotificationDialog
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
