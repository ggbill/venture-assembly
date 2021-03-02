import './roundPlanner.scss'
import React, { useEffect, useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NotificationDialog from '../shared/NotificationDialog'
import FundamentalsSection from './sections/FundamentalsSection'
import SectorSection from './sections/SectorSection'
import PurchaseSection from './sections/PurchaseSection'
import SwotSection from './sections/SwotSection'
import PdfDownloadDialog from '../shared/PdfDownloadDialog'
import { Font } from '@react-pdf/renderer';
import CallBookingDialog from '../callBookingDialog/CallBookingDialog'

const registerFont = () => {
    Font.register({
        family: 'Poppins', fonts: [
            { src: './fonts/Poppins-Medium.ttf' },
            { src: './fonts/Poppins-ExtraBold.ttf', fontWeight: 'bold' },
        ]
    });

    Font.registerEmojiSource({
        format: 'png',
        url: 'https://twemoji.maxcdn.com/2/72x72/',
      });
};

const RoundPlanner = () => {
    const [notificationDialogProperties, setNotificationDialogProperties] = useState<any>({ isOpen: false, type: "", title: "", message: "", isShowDonateButton: false })
    const [roundDetails, setRoundDetails] = useState<App.RoundDetails>({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        companyWebsite: "",
        companyIntro: "",
        // name: "William Oliver Hamilton",
        // email: "wohamilton@gmail.com",
        // phone: "07123 123456",
        // companyName: "Bill's Long Company Name Ltd",
        // companyWebsite: "www.longwebsitename.com",
        // companyIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        preMoneyValuation: 1500000,
        amountRaising: 150000,
        cashInBank: 25000,
        monthlyBurnRate: 5000,
        sector: "",
        stage: "",
        businessType: "",
        businessModel: "",
        monthlyRevenue: 0,
        month12Revenue: 0,
        isUsesTech: false,
        financials: [{ year: 1, revenue: 80000, ebitda: 15000 }, { year: 2, revenue: 125000, ebitda: 45000 }, { year: 3, revenue: 325000, ebitda: 299000 }],
        swot: { team: 1, technology: 1, advisors: 1, traction: 1, market: 1 }
    } as App.RoundDetails)
    const [isDownloadPDFDialogOpen, setIsDownloadPDFDialogOpen] = useState<boolean>(false)
    const [isCallBookingDialogOpen, setIsCallBookingDialogOpen] = useState<boolean>(false)

    useEffect(() => {
        registerFont();
    }, []);


    return (
        <div className="round-planner-page">
            <MenuBar />

            <div className="content top-page-margin intro-section">
                <span className="page-title">Round Planner.</span>
                <p>Round Planner is a <b>free</b> tool designed to help founders better understand the key metrics that investors will ask for
                when deciding whether or not to invest in a company. Simply enter your information below and let the tool calculate
                your company's key metrics in real time. Your results can then be downloaded as a PDF or you can book a 15 minute intro session
                with us to help decide what to do next. All this completely free - not bad eh?</p>
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
            />

            <PurchaseSection
                roundDetails={roundDetails}
                setNotificationDialogProperties={setNotificationDialogProperties}
                setRoundDetails={setRoundDetails}
                setIsDownloadPDFDialogOpen={setIsDownloadPDFDialogOpen}
                setIsCallBookingDialogOpen={setIsCallBookingDialogOpen}
            />

            <NotificationDialog
                handleClose={() => setNotificationDialogProperties({ ...notificationDialogProperties, isOpen: false })}
                isDialogOpen={notificationDialogProperties.isOpen}
                message={notificationDialogProperties.message}
                title={notificationDialogProperties.title}
                type={notificationDialogProperties.type}
                isShowDonateButton={notificationDialogProperties.isShowDonateButton}
            />


            <PdfDownloadDialog
                handleClose={() => setIsDownloadPDFDialogOpen(false)}
                isDialogOpen={isDownloadPDFDialogOpen}
                roundDetails={roundDetails}
                setRoundDetails={setRoundDetails}
                setNotificationDialogProperties={setNotificationDialogProperties}
            />

            <CallBookingDialog
                handleClose={() => setIsCallBookingDialogOpen(false)}
                isDialogOpen={isCallBookingDialogOpen}
                roundDetails={roundDetails}
                setRoundDetails={setRoundDetails}
            />



        </div>
    )
}

export default RoundPlanner