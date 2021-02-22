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
            display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "6px 24px",
            backgroundColor: "black", color: "white", marginBottom: 24
        },
        body: { paddingLeft: 48, paddingRight: 48 },
        topSection: { display: "flex", flexDirection: "column", },
        thirdsRow: { display: "flex", flexDirection: "row", paddingBottom: 24 },
        left2Thirds: { display: "flex", flexDirection: "column", width: "50%", paddingLeft: 48, marginRight: 48 },
        right1Third: { display: "flex", flexDirection: "column", width: "40%", paddingRight: 48 },
        table: { display: "table", width: "auto" },
        tableCol40: { width: "25%", borderStyle: "solid", fontWeight: "bold" },
        tableCol60: { width: "75%", borderStyle: "solid" },
        tableRow: { margin: "auto", flexDirection: "row" },
        tableCell: { marginTop: 2, fontSize: 6, padding: 1, fontFamily: "Poppins", color: "#333333" },
        topPinkSection: { display: "flex", flexDirection: "row", backgroundColor: "#d81747", height: 50 },
        keyFiguresWrapper: { display: "flex", flexDirection: "column", flexGrow: 1 }
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
                                <Text style={{ fontSize: 21, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                    VA
                                </Text>
                                <Text style={{ fontSize: 21, color: "#d81747", fontFamily: "Poppins", fontWeight: 'bold' }}>
                                    .
                                </Text>
                            </View>

                            <Text style={{ fontSize: 12, fontFamily: "Poppins" }}>
                                Round Planner
                            </Text>
                        </View>


                        <View style={styles.topSection}>

                            <View style={styles.thirdsRow}>
                                <View style={styles.left2Thirds}>

                                    {roundDetails.companyLogoBase64String ?
                                        <Image
                                            src={roundDetails.companyLogoBase64String}
                                            style={{ height: 80, width: 80 }}
                                        /> :
                                        <Image
                                            src={VaLogoGrey}
                                            style={{ height: 80, width: 80 }}
                                        />

                                    }

                                    {roundDetails.companyName &&
                                        <Text style={{ fontSize: 14, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                            {roundDetails.companyName}
                                        </Text>
                                    }

                                    <Text style={{ fontSize: 9, fontFamily: "Poppins", color: "#333333", marginBottom: 16 }}>
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

                                        {/* <Text style={{ fontSize: 10, fontFamily: "Poppins", color: "#333333", marginBottom: 6 }}>
                                            Amount Raising:
                                        </Text>
                                        <Text style={{ fontSize: 10, fontFamily: "Poppins", color: "#333333", marginBottom: 6 }}>
                                            Cash in Bank:
                                        </Text>
                                        <Text style={{ fontSize: 10, fontFamily: "Poppins", color: "#333333" }}>
                                            Monthly Burn Rate:
                                        </Text> */}
                                    </View>



                                </View>
                                <View style={styles.right1Third}>
                                    <Image src={roundDetails.radarBase64String} style={{ width: "100%" }} />


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



                            <View style={styles.topPinkSection}>

                            </View>

                        </View>

                        {/* </View> */}

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