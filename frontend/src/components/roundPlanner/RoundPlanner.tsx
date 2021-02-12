import './roundPlanner.scss'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NotificationDialog from '../shared/NotificationDialog'
import PlannerSection from './sections/PlannerSection'
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

            <PlannerSection
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