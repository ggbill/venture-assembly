import './roundPlanner.scss'
import React, { useEffect, useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NotificationDialog from '../shared/NotificationDialog'
import FundamentalsSection from './sections/FundamentalsSection'
import SectorSection from './sections/SectorSection'
import FutureSection from './sections/FutureSection'
import PurchaseSection from './sections/PurchaseSection'
import SwotSection from './sections/SwotSection'
import PdfDownloadDialog from '../shared/PdfDownloadDialog'
import { Font } from '@react-pdf/renderer';

const registerFont = () => {
    Font.register({ family: 'Poppins', fonts: [
        { src: './fonts/Poppins-Medium.ttf' }, 
        { src: './fonts/Poppins-ExtraBold.ttf', fontWeight: 'bold' }, 
        // { src: source2, fontStyle: 'italic' },
        // { src: source3, fontStyle: 'italic', fontWeight: 700 },
       ]});
};



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
        financials: [{ year: 1, revenue: 80000, ebitda: 15000 }, { year: 2, revenue: 125000, ebitda: 45000 }, { year: 3, revenue: 325000, ebitda: 299000 }],
        swot: { team: 1, technology: 1, advisors: 1, traction: 1, market: 1 }
    })
    const [isDownloadPDFDialogOpen, setIsDownloadPDFDialogOpen] = useState<boolean>(false)
    const [radarChartBase64String, setRadarChartBase64String] = useState<string>("")
    const [financialsChartBase64String, setFinancialsChartBase64String] = useState<string>("")

    useEffect(() => {
        registerFont();
    }, []);


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

            <SwotSection
                roundDetails={roundDetails}
                setNotificationDialogProperties={setNotificationDialogProperties}
                setRoundDetails={setRoundDetails}
                setRadarChartBase64String={setRadarChartBase64String}

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
                // setIsPitchDeckBookingDialogOpen={setIsPitchDeckBookingDialogOpen}
                setIsDownloadPDFDialogOpen={setIsDownloadPDFDialogOpen}
            />

            <NotificationDialog
                handleClose={() => setNotificationDialogProperties({ ...notificationDialogProperties, isOpen: false })}
                isDialogOpen={notificationDialogProperties.isOpen}
                message={notificationDialogProperties.message}
                title={notificationDialogProperties.title}
                type={notificationDialogProperties.type}
            />


                <PdfDownloadDialog
                    handleClose={() => setIsDownloadPDFDialogOpen(false)}
                    isDialogOpen={isDownloadPDFDialogOpen}
                    roundDetails={roundDetails}
                    radarChartBase64String={radarChartBase64String}
                />



        </div>
    )
}

export default RoundPlanner