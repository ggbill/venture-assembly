import React from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import moment from 'moment'
import useSwotHelperTextGenerator from '../components/roundPlanner/sections/useSwotHelperTextGenerator';
import VaLogoGrey from '../images/VA-Logo-Grey-Square.png'
import useRoundPlannerCalculator from './useRoundPlannerCalculator';

const usePdfGenerator = () => {

    let swotHelperTextGenerator = useSwotHelperTextGenerator()
    let roundPlannerCalculator = useRoundPlannerCalculator()

    const styles = StyleSheet.create({
        header: {
            display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "6px 12px",
            backgroundColor: "black", color: "white", marginBottom: 6
        },
        body: { paddingLeft: 48, paddingRight: 48 },
        topSection: { display: "flex", flexDirection: "column", },
        pageRow: { display: "flex", flexDirection: "row", alignItems: "center" },
        left2Thirds: { display: "flex", flexDirection: "column", width: "50%", paddingLeft: 48, marginRight: 48 },
        right1Third: { display: "flex", flexDirection: "column", width: "40%", paddingRight: 48 },
        table: { display: "table", width: "auto" },
        tableCol40: { width: "30%", borderStyle: "solid", fontWeight: "bold" },
        tableCol60: { width: "70%", borderStyle: "solid" },
        tableRow: { margin: "auto", flexDirection: "row" },
        tableCell: { marginTop: 2, fontSize: 7, padding: 1, fontFamily: "Poppins", color: "#333333" },
        pinkSection: { display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d81747", paddingHorizontal: 48, paddingVertical: 12, marginVertical: 12 },
        keyFiguresWrapper: { display: "flex", flexDirection: "column", flexGrow: 1 },
        middleSection: { display: "flex", flexDirection: "column", },
        subtitle: { fontSize: 12, fontWeight: "bold", color: "#333333", marginBottom: 6 }
    });

    const generateRoundPlannerPdf = (roundDetails: App.RoundDetails): any => {

        // console.log(pdfObject.companyLogoBase64String)
        console.log(roundDetails)

        return (
            <Document>
                <Page size="A4" style={{ display: "flex", justifyContent: "space-between", fontFamily: "Poppins" }} >
                    <View>
                        <View style={styles.header}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                    Venture Assembly
                                </Text>
                                <Text style={{ fontSize: 12, color: "#d81747", fontFamily: "Poppins", fontWeight: 'bold' }}>
                                    .
                                </Text>
                            </View>

                            <Text style={{ fontSize: 12, fontFamily: "Poppins" }}>
                                Round Planner
                            </Text>
                        </View>


                        <View style={styles.topSection}>

                            <View style={styles.pageRow}>
                                <View style={styles.left2Thirds}>

                                    {roundDetails.companyLogoBase64String ?
                                        <Image
                                            src={roundDetails.companyLogoBase64String}
                                            style={{ height: 50, width: 50 }}
                                        /> :
                                        <Image
                                            src={VaLogoGrey}
                                            style={{ height: 50, width: 50 }}
                                        />

                                    }


                                    <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                        {roundDetails.companyName}
                                    </Text>


                                    <View style={{ display: "flex", flexDirection: "row", fontFamily: "Poppins", color: "#333333", fontSize: 9, marginBottom: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {`Sector: `}
                                        </Text>
                                        <Text style={{ marginRight: 12 }}>
                                            {roundDetails.sector}
                                        </Text>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {`Stage: `}
                                        </Text>
                                        <Text>
                                            {roundDetails.stage}
                                        </Text>
                                    </View>

                                    <View style={{ display: "flex", flexDirection: "row", fontFamily: "Poppins", color: "#333333", fontSize: 9, marginBottom: 10 }}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {`Business Type: `}
                                        </Text>
                                        <Text style={{ marginRight: 12 }}>
                                            {roundDetails.businessType}
                                        </Text>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {`Business Model: `}
                                        </Text>
                                        <Text>
                                            {roundDetails.businessModel}
                                        </Text>
                                    </View>

                                    <Text style={{ fontSize: 8, fontFamily: "Poppins", color: "#333333", marginBottom: 10 }}>
                                        {roundDetails.companyIntro}
                                    </Text>

                                    <View style={styles.keyFiguresWrapper}>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`🏷️     Pre-Money Valuation: `}
                                            </Text>
                                            <Text >
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.preMoneyValuation)}
                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`💷     Amount Raising: `}
                                            </Text>
                                            <Text >
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.amountRaising)}
                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`🏦     Cash in Bank: `}
                                            </Text>
                                            <Text >
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.cashInBank)}
                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`🔥     Monthly Burn Rate: `}
                                            </Text>
                                            <Text >
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.monthlyBurnRate)}
                                            </Text>
                                        </View>

                                    </View>



                                </View>
                                <View style={styles.right1Third}>
                                    <Image src={roundDetails.radarBase64String} style={{ height: 160, objectFit: "cover" }} />

                                    <View style={styles.table}>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol40}>
                                                <Text style={styles.tableCell}>Team</Text>
                                            </View>
                                            <View style={styles.tableCol60}>
                                                <Text style={styles.tableCell}>{swotHelperTextGenerator.getHelperText("team", roundDetails.swot.team)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol40}>
                                                <Text style={styles.tableCell}>Technology</Text>
                                            </View>
                                            <View style={styles.tableCol60}>
                                                <Text style={styles.tableCell}>{swotHelperTextGenerator.getHelperText("technology", roundDetails.swot.technology)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol40}>
                                                <Text style={styles.tableCell}>Advisors</Text>
                                            </View>
                                            <View style={styles.tableCol60}>
                                                <Text style={styles.tableCell}>{swotHelperTextGenerator.getHelperText("advisors", roundDetails.swot.advisors)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol40}>
                                                <Text style={styles.tableCell}>Traction</Text>
                                            </View>
                                            <View style={styles.tableCol60}>
                                                <Text style={styles.tableCell}>{swotHelperTextGenerator.getHelperText("traction", roundDetails.swot.traction)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={styles.tableCol40}>
                                                <Text style={styles.tableCell}>Market</Text>
                                            </View>
                                            <View style={styles.tableCol60}>
                                                <Text style={styles.tableCell}>{swotHelperTextGenerator.getHelperText("market", roundDetails.swot.market)}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>


                            </View>
                        </View>



                        <View style={styles.pinkSection}>

                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Text>
                                    {`🗞️`}
                                </Text>
                                <View style={{ display: "flex", flexDirection: "column", color: "white", marginLeft: 6, alignItems: "center", fontFamily: "Poppins" }}>
                                    <Text style={{ fontSize: 10 }}>
                                        Equity to be Sold
                                        </Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {`${roundPlannerCalculator.calculateEquity(roundDetails.preMoneyValuation, roundDetails.amountRaising)}%`}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Text>
                                    {`🏷️`}
                                </Text>
                                <View style={{ display: "flex", flexDirection: "column", color: "white", marginLeft: 6, alignItems: "center", fontFamily: "Poppins" }}>
                                    <Text style={{ fontSize: 10 }}>
                                        Post Money Valuation
                                        </Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundPlannerCalculator.calculatePostMoney(roundDetails.preMoneyValuation, roundDetails.amountRaising))}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Text>
                                    {`🛬`}
                                </Text>
                                <View style={{ display: "flex", flexDirection: "column", color: "white", marginLeft: 6, alignItems: "center", fontFamily: "Poppins" }}>
                                    <Text style={{ fontSize: 10 }}>
                                        Runway (months)
                                        </Text>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {`${roundPlannerCalculator.calculateBurn(roundDetails.monthlyBurnRate, roundDetails.cashInBank)}`}
                                    </Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.middleSection}>
                            <View style={styles.pageRow}>
                                <View style={{marginLeft: 48, flexBasis: 0, flexGrow: 1 }}>
                                    <View style={{ display: "flex", flexDirection: "column" }}>
                                        <Text style={styles.subtitle}>Financial Forecast</Text>
                                        <View style={[styles.table, { borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0, borderColor: "#eaeaea" }]}>
                                            <View style={[styles.tableRow, { fontWeight: "bold" }]}>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>Year 1</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>Year 2</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>Year 3</Text>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9, fontWeight: "bold" }]}>Revenue</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[0].revenue)}</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[1].revenue)}</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 6 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[2].revenue)}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9, fontWeight: "bold" }]}>EBITDA</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[0].ebitda)}</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[1].ebitda)}</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[2].ebitda)}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.tableRow}>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9, fontWeight: "bold" }]}>Costs</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[0].revenue - roundDetails.financials[0].ebitda)}</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[1].revenue - roundDetails.financials[1].ebitda)}</Text>
                                                </View>
                                                <View style={{ width: "25%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[2].revenue - roundDetails.financials[2].ebitda)}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                                <View style={{marginLeft: 12, marginRight: 48, flexBasis: 0, flexGrow: 1 }}>
                                    <Image
                                        src={roundDetails.financialsBase64String}
                                    // style={{  width: 80 }}
                                    />
                                </View>


                            </View>

                            <View style={[styles.pinkSection, { flexDirection: "column" }]}>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <Text>
                                            {`🏦`}
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "column", color: "white", marginLeft: 6, alignItems: "center", fontFamily: "Poppins" }}>
                                            <Text style={{ fontSize: 10 }}>
                                                Valuation / Rev
                                        </Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`${(roundDetails.preMoneyValuation / roundDetails.financials[0].revenue).toFixed(0)}x`}
                                            </Text>
                                        </View>
                                    </View>
                                    {(
                                        roundDetails.month12Revenue === 0 ||
                                        typeof (roundDetails.month12Revenue) === "undefined" ||
                                        roundDetails.monthlyRevenue === 0 ||
                                        typeof (roundDetails.monthlyRevenue) === "undefined"
                                    ) ?
                                        null :
                                        <>
                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <Text>
                                                    {`🚀`}
                                                </Text>
                                                <View style={{ display: "flex", flexDirection: "column", color: "white", marginLeft: 6, alignItems: "center", fontFamily: "Poppins" }}>
                                                    <Text style={{ fontSize: 10 }}>
                                                        Growth Rate
                                                    </Text>
                                                    <Text style={{ fontWeight: "bold" }}>
                                                        {`${(roundDetails.month12Revenue / roundDetails.monthlyRevenue).toFixed(1)}x`}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                <Text>
                                                    {`📈`}
                                                </Text>
                                                <View style={{ display: "flex", flexDirection: "column", color: "white", marginLeft: 6, alignItems: "center", fontFamily: "Poppins" }}>
                                                    <Text style={{ fontSize: 10 }}>
                                                        Monthly Growth Rate
                                                    </Text>
                                                    <Text style={{ fontWeight: "bold" }}>
                                                        {`${((Math.pow(roundDetails.month12Revenue / roundDetails.monthlyRevenue, (1 / 11)) - 1) * 100).toFixed(0)}%`}
                                                    </Text>
                                                </View>
                                            </View>
                                        </>
                                    }
                                </View>
                                <Text style={{ color: "white", fontSize: 8, lineHeight: 1.5, textAlign: "center" }}>
                                    {`Growth rate is calculated as the increase in current or 1st month revenue (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.monthlyRevenue)}) to 12 month revenue (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.month12Revenue)}). The Compound growth shows the minimum expected monthly growth to get there.`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bottomSection}>

                            <View style={[styles.pageRow, { alignItems: "flex-start" }]}>
                                <View style={{ paddingLeft: 48, flexBasis: 0, flexGrow: 1 }}>
                                    <View style={{ display: "flex", flexDirection: "column" }}>
                                        <Text style={styles.subtitle}>Exit Multiples</Text>
                                        <View style={[styles.table, { borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0, borderColor: "#eaeaea" }]}>
                                            <View style={[styles.tableRow, { fontWeight: "bold" }]}>
                                                <View style={{ width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 2 }]}>10x</Text>
                                                </View>
                                                <View style={{ width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 2 }]}>25x</Text>
                                                </View>
                                                <View style={{ width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 2 }]}>50x</Text>
                                                </View>
                                            </View>

                                            <View style={styles.tableRow}>
                                                <View style={{ width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 2 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.preMoneyValuation * 10)}</Text>
                                                </View>
                                                <View style={{ width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 2 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.preMoneyValuation * 25)}</Text>
                                                </View>
                                                <View style={{ width: "33%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, borderColor: "#eaeaea" }}>
                                                    <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 2 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.preMoneyValuation * 50)}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>


                                </View>
                                <View style={{ paddingLeft: 12, marginRight: 48, flexBasis: 0, flexGrow: 1 }}>
                                    <View style={styles.keyFiguresWrapper}>
                                        <Text style={styles.subtitle}>
                                            Contact Details
                                        </Text>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`😀     Key Contact: `}
                                            </Text>
                                            <Text >
                                                {roundDetails.name}
                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`📧     Email Address: `}
                                            </Text>
                                            <Text >
                                                {roundDetails.email}
                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`☎️     Phone: `}
                                            </Text>
                                            <Text >
                                                {roundDetails.phone}
                                            </Text>
                                        </View>
                                        <View style={{ display: "flex", flexDirection: "row", marginBottom: 6, fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                {`🌐     Website: `}
                                            </Text>
                                            <Text >
                                                {roundDetails.companyWebsite}
                                            </Text>
                                        </View>

                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.header, { marginBottom: 0, paddingVertical: 18 }]}>
                        <Text style={{ fontSize: 8, fontFamily: "Poppins" }}>
                            www.ventureassembly.co
                        </Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <Text style={{ fontSize: 12, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                Venture Assembly
                                </Text>
                            <Text style={{ fontSize: 12, color: "#d81747", fontFamily: "Poppins", fontWeight: 'bold' }}>
                                .
                                </Text>
                        </View>
                        <Text style={{ fontSize: 8, fontFamily: "Poppins" }}>
                            hello@ventureassembly.co
                        </Text>
                    </View>

                </Page>
            </Document>


        )
    }
    return {
        generateRoundPlannerPdf
    }

}

export default usePdfGenerator