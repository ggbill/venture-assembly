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
    }

    interface FinancialDetails {
        year: number,
        revenue: number,
        ebitda: number
    }
}