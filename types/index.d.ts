declare module App {
    interface RoundDetails {
        preMoneyValuation: number,
        amountRaising: number,
        cashInBank: number,
        monthlyBurnRate: number,
        sector: string, 
        stage: string, 
        monthlyRevenue: number,
        month12Revenue: number,
        isUsesTech: boolean,
        financials: FinancialDetails[]
        swot: SwotObject
    }

    interface FinancialDetails {
        year: number,
        revenue: number,
        ebitda: number
    }

    interface ValidationObject {
        name: string,
        isValid: boolean,
        validationMessage: string
    }

    interface Enquiry{
        name: string
        email: string
        category: string
        message: string
    }

    interface Booking{
        name: string
        email: string
        message: string
        pdfBlob: any
    }

    interface SwotObject{
        team: number
        technology: number
        advisors: number
        traction: number
        market: number
        // uniqueness: number
    }

    interface PdfObject{
        name: string, 
        email: string, 
        phone: string, 
        companyName: string,
        companyWebsite: string,
        companyLogoBase64String: string,
        companyIntro: string,
        roundDetails: RoundDetails, 
        radarBase64String: string   
    }
}