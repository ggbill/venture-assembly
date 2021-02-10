import './home.scss'
import React from 'react'
import MenuBar from '../shared/MenuBar'
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';


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
                                    <span>build their network<span className="full-stop">.</span></span>
                                    <Typist.Backspace count={21} delay={2000} />
                                    <Typist.Delay ms={1000} />
                                    <span>hire staff<span className="full-stop">.</span></span>
                                    <Typist.Backspace count={11} delay={2000} />
                                    <Typist.Delay ms={1000} />
                                    <span><b>wage war on startup bloat<span className="full-stop">.</span></b></span>
                                </Typist>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="read-more">
                    read more
                <div className="arrow">↓</div>
                </div>
            </section>

        </div>
    )
}

export default Home