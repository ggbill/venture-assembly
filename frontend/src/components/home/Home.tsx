import './home.scss'
import React from 'react'
import MenuBar from '../shared/MenuBar'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import { Button, Card } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { Link } from 'react-router-dom'
import RocketImage from '../../images/startups.png'
import EdImage from '../../images/ed-small-square.png'
import BillImage from '../../images/bill-small-square.jpeg'

const Home = () => {
    return (
        <div className="home-page">
            <MenuBar />
            <section className="header-section">
                <div className="content">
                    <div className="title-wrapper">
                        <span className="title">Venture Assembly<span className="full-stop">.</span></span>
                        <div className="sub-title"><span>Where startups come to&nbsp;</span>
                            <div className="typing-text-wrapper">
                                <Typist>
                                    <Typist.Delay ms={4000} />
                                    <span>plan funding rounds<span className="full-stop">.</span></span>
                                    <Typist.Backspace count={20} delay={2000} />
                                    <Typist.Delay ms={1000} />
                                    <span>find specialist help<span className="full-stop">.</span></span>
                                    <Typist.Backspace count={21} delay={2000} />
                                    <Typist.Delay ms={1000} />
                                    <span>expand their network<span className="full-stop">.</span></span>
                                    <Typist.Backspace count={21} delay={2000} />
                                    <Typist.Delay ms={1000} />
                                    <span>build a world beating team<span className="full-stop">.</span></span>
                                    <Typist.Backspace count={27} delay={2000} />
                                    <Typist.Delay ms={1000} />
                                    <span>wage war on startup <b>bloat</b><span className="full-stop">.</span></span>
                                </Typist>
                            </div>
                        </div>
                        <div className="cta-wrapper">
                            <Link to={'/round-planner'}>
                                <Button className="va-button cta">
                                    <span>Free Round Planner</span>
                                    {/* <span>Get Started</span> <ArrowForwardIcon /> */}
                                </Button>
                            </Link>
                            <a href="mailto: hello@ventureassembly.co">
                                <Button className="va-button cta secondary">
                                    <span>Get in touch</span>
                                    {/* <span>Get Started</span> <ArrowForwardIcon /> */}
                                </Button>
                            </a>
                        </div>

                        <div className="image-wrapper">
                            <img src={RocketImage} />
                        </div>
                    </div>

                </div>
                <div className="read-more">
                    <span>read more</span>
                    <ArrowDownwardIcon />
                </div>
            </section>
            <section className="body-section">

                <div className="intro-wrapper content">
                    <div className="section-title">
                        <div className="pink-line"></div>
                        <span>Waging war on startup bloat.</span>
                        <div className="pink-line"></div>
                    </div>

                    {/* <span>We are on a mission to try and help startups. To plan, network or grow. Bit by bit and tool by tool we're going to try and make the process of growing a startup easier. Why? Because it's just the way we think it should be...</span> */}
                   
                    <p>
                        Some aspects of starting a company are really hard. Coming up with a compelling idea, executing on that idea, pivoting to keep the company on track - these things
                        are hard and often depend on the hard work and resilience of the founders. Other aspects of starting a company are actually pretty straight forward as long as you 
                        understand the process and have the right people and tools at your disposal.</p>
                        <div className="emoji">👩‍🔬🛠️</div>
                    <p>
                        We are on a mission to help startups succeed. We can’t help you with the really hard stuff, you have to do that on your own. But what we can do is make sure that you don’t 
                        waste time and money on what we call "startup bloat": doing completely unnecessary things, doing the right things in the wrong order or doing the right things, badly.</p>
                        <div className="emoji">🙅‍♂️🎈</div>
                    <p>
                        Too much "startup bloat" in the early stages of a business can be terminal. That’s where we come in. We are building a toolkit, a knowledge base,
                        a community to make sure you nail the easy things quickly and efficiently – leaving you to focus on the hard stuff to make your startup a success.
                    </p>
                    {/* <div className="emoji"></div> */}
                </div>
                <div className="team-wrapper content">
                <div className="section-title">
                        <div className="pink-line"></div>
                        <span>Who we are.</span>
                        <div className="pink-line"></div>
                    </div>
                    <div className="card-wrapper">
                        <Card>
                            <img src={EdImage}></img>
                            <div className="name-wrapper">
                                <span>Ed Stephens 👨‍🔧</span>
                            </div>
                            <div className="description-wrapper">
                                Head of Brokerage at the Angel Investment Network (AIN). Over 10 years' experience working with startups, successfully raising over
                                £50 million of funding.
                        </div>
                        </Card>
                        <Card>
                            <img src={BillImage}></img>
                            <div className="name-wrapper">
                                <span>Bill Hamilton 👨‍💻</span>
                            </div>
                            <div className="description-wrapper">
                                Head of Technology at the Wealth Holdings. Spent a career in technology desiging and building systems for a variety of companies of all sizes.
                            </div>
                        </Card>
                    </div>


                </div>

            </section>
        </div>
    )
}

export default Home