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
        tableCol40: { width: "25%", borderStyle: "solid", fontWeight: "bold" },
        tableCol60: { width: "75%", borderStyle: "solid" },
        tableRow: { margin: "auto", flexDirection: "row" },
        tableCell: { marginTop: 2, fontSize: 6, padding: 1, fontFamily: "Poppins", color: "#333333" },
        pinkSection: { display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: "#d81747", paddingHorizontal: 48, paddingVertical: 12, marginVertical: 12 },
        keyFiguresWrapper: { display: "flex", flexDirection: "column", flexGrow: 1 },
        middleSection: { display: "flex", flexDirection: "column", },
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
                                <View style={{ width: "45%", marginLeft: 48, flexBasis: 0, flexGrow: 1 }}>
                                    <View style={styles.table}>
                                        <View style={[styles.tableRow, { fontWeight: "bold" }]}>
                                            <View style={{ width: "25%" }}>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>Year 1</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>Year 2</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>Year 3</Text>
                                            </View>
                                        </View>

                                        <View style={styles.tableRow}>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9, fontWeight: "bold" }]}>Revenue</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[0].revenue)}</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[1].revenue)}</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 6 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[2].revenue)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9, fontWeight: "bold" }]}>EBITDA</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[0].ebitda)}</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[1].ebitda)}</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[2].ebitda)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9, fontWeight: "bold" }]}>Costs</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[0].revenue - roundDetails.financials[0].ebitda)}</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[1].revenue - roundDetails.financials[1].ebitda)}</Text>
                                            </View>
                                            <View style={{ width: "25%" }}>
                                                <Text style={[styles.tableCell, { fontSize: 10, paddingVertical: 9 }]}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.financials[2].revenue - roundDetails.financials[2].ebitda)}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={{ width: "45%", marginRight: 48, flexBasis: 0, flexGrow: 1 }}>
                                    <Image
                                        src={roundDetails.financialsBase64String}
                                    // style={{  width: 80 }}
                                    />
                                </View>


                            </View>

                            <View style={styles.pinkSection}>

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

                        </View>
                    </View>

                    <View style={[styles.header, { marginBottom: 0 }]}>
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

                </Page>
            </Document >


        )
    }
    return {
        generateRoundPlannerPdf
    }

}

export default usePdfGenerator