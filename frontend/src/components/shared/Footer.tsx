import React from "react"
import { Link } from 'react-router-dom'
import "./footer.scss"

interface InputProps {

}

const Footer = (props: InputProps) => {
    return (
        <section className="footer-section">
            <div className="links-wrapper">
                <span><b>© 2021 Venture Assembly Ltd.</b></span>
                <a href="https://www.privacypolicies.com/live/316d82ad-209d-4fc9-9eea-fe71324a69a4" target="_blank">Privacy Policy</a>
                <a href="#">LinkedIn</a>
                <a href="https://www.buymeacoffee.com/ventureassembly" target="_blank">Buy us a coffee!</a>
            </div>
            <div className="disclaimer">
                All product and company names are trademarks or registered trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.
            </div>
        </section>
    )
}

export default Footer