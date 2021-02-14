import './roundPlanner.scss'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NotificationDialog from '../shared/NotificationDialog'
import FundamentalsSection from './sections/FundamentalsSection'
import SectorSection from './sections/SectorSection'
import FutureSection from './sections/FutureSection'
import PurchaseSection from './sections/PurchaseSection'

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
                <p>We built a free tool designed to help founders understand the key metrics required for raising capital. Enter your information into the sections below to see
                    tour company's key metrics generated in real time. If you are struggling to understand and need advice reach out.</p>
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

            <PurchaseSection
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