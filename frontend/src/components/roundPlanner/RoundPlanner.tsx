import './roundPlanner.scss'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NotificationDialog from '../shared/NotificationDialog'
import FundamentalsSection from './sections/FundamentalsSection'
import SectorSection from './sections/SectorSection'
import FutureSection from './sections/FutureSection'

const RoundPlanner = () => {

    const [notificationDialogProperties, setNotificationDialogProperties] = useState<any>({ isOpen: false, type: "", title: "", message: "" })
    const [roundDetails, setRoundDetails] = useState<App.RoundDetails>({
        preMoneyValuation: 1500000,
        amountRaising: 150000,
        cashInBank: 25000,
        monthlyBurnRate: 5000,
        sector: "",
        stage: "",
        monthlyRevenue: 0,
        month12Revenue: 0,
        isUsesTech: false,
        financials: [{ year: 1, revenue: 10, ebitda: 0 }, { year: 2, revenue: 20, ebitda: 0 }, { year: 3, revenue: 30, ebitda: 0 }]
    })

    return (
        <div className="round-planner-page">
            <MenuBar />

            <div className="content top-page-margin">
                <h1>Round Planner.</h1>
                <p>Welcome to the Venture Assembly Round Planner, a free tool designed to help founders understand the key metrics required for raising capital.</p>
                {/* <p>Most companies will at some of their development look to raise capital to help them scale. This is a complex process and can be daunting for the most seasoned entrepreneur.
                However, there is a standard set of information that underpins the decision making process for the vast majority of investors - this tool will help you to formulate and structure that information.</p> */}
                <p>Enter your information into the sections below to see your company's key metrics generated in real time. If you are struggling or would just prefer to talk this through with one of our friendly 
                experts please take a look at our <a href='#'>services page.</a>
                </p>
            </div>

            <FundamentalsSection
                roundDetails={roundDetails}
                setNotificationDialogProperties={setNotificationDialogProperties}
                setRoundDetails={setRoundDetails}
            />
            <SectorSection
                roundDetails={roundDetails}
                setNotificationDialogProperties={setNotificationDialogProperties}
                setRoundDetails={setRoundDetails}
            />

            <FutureSection
                roundDetails={roundDetails}
                setNotificationDialogProperties={setNotificationDialogProperties}
                setRoundDetails={setRoundDetails}
            />

            <NotificationDialog
                handleClose={() => setNotificationDialogProperties({ ...notificationDialogProperties, isOpen: false })}
                isDialogOpen={notificationDialogProperties.isOpen}
                message={notificationDialogProperties.message}
                title={notificationDialogProperties.title}
                type={notificationDialogProperties.type}
            />

        </div>
    )

}

export default RoundPlanner