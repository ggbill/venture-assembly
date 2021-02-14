import './home.scss'
import React from 'react'
import MenuBar from '../shared/MenuBar'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import { Button } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { Link } from 'react-router-dom'

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
                            <Link to={'/round-planner'}>
                                <Button className="va-button cta secondary">
                                    <span>Talk to an expert</span>
                                    {/* <span>Get Started</span> <ArrowForwardIcon /> */}
                                </Button>
                            </Link>
                        </div>

                    </div>

                </div>
                <div className="read-more">
                    <span>read more</span>
                    <ArrowDownwardIcon />
                </div>
            </section>
        </div>
    )
}

export default Home