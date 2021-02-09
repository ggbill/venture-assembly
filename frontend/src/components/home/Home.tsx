import './home.scss'
import React from 'react'
import MenuBar from '../shared/MenuBar'
import { Link } from 'react-router-dom'


const Home = () => {
    return (
        <div className="home-page">
            <MenuBar />
            <section className="header-section">
                <div className="content">
                    <div className="title-wrapper">
                        <span className="title">Venture Assembly<span className="full-stop">.</span></span>
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