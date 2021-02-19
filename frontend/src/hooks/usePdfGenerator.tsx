import React from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import moment from 'moment'
// import font from '../fonts/Poppins-Medium.ttf'

const usePdfGenerator = () => {

    const styles = StyleSheet.create({
        header: {
            display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "6px 24px",
            backgroundColor: "black", color: "white", marginBottom: 24
        },
        body: {
            paddingLeft: 48, paddingRight: 48
        }

    });

    const generateRoundPlannerPdf = (pdfObject: App.PdfObject): any => {

        return (
            <Document>
                <Page size="A4" style={{ display: "flex", justifyContent: "space-between", fontFamily: "Poppins" }} >
                    <View>
                        <View style={styles.header}>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontSize: 28, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                    VA
                                </Text>
                                <Text style={{ fontSize: 28, color: "#d81747", fontFamily: "Poppins", fontWeight: 'bold' }}>
                                    .
                                </Text>
                            </View>

                            <Text style={{ fontSize: 14, fontFamily: "Poppins" }}>
                                Round Planner
                            </Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.titleRow}>
                                {pdfObject.companyLogoBase64String &&
                                    <Image
                                        src={pdfObject.companyLogoBase64String}
                                        style={{ width: 200, marginRight: 30 }}
                                    />
                                }

                                {pdfObject.companyName &&
                                    <Text style={{ fontSize: 24, fontFamily: "Poppins", fontWeight: 'bold' }}>
                                        {pdfObject.companyName}
                                    </Text>
                                }


                                <Text style={{ fontSize: 12, fontFamily: "Poppins" }}>
                                    {pdfObject.companyIntro}
                                </Text>
                            </View>

                            <Image src={pdfObject.radarBase64String} style={{ width: "100%", marginRight: 30 }} />
                        </View>
                    </View>




                    {/* <View>
                                <Text style={{ fontSize: 32, marginBottom: 6, fontFamily: "Helvetica-Bold" }}>
                                    {pdfObject.companyName}
                            </Text>
                                <Text style={{ fontSize: 16, marginBottom: 6 }}>jkhgjhgjhkg</Text>
                                <Text style={{ fontSize: 16 }}>{`Auction Date: ${moment().format('DD/MM/yyyy')}`}</Text>
                            </View> */}

                    {/* <Image src={logo} style={{ width: 130, height: 100, marginRight: 30 }} /> */}
                </Page>
            </Document>


        )
    }
    return {
        generateRoundPlannerPdf
    }

}

export default usePdfGenerator