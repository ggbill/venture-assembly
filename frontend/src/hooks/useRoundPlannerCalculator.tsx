const useRoundPlannerCalculator = () => {
    
    const calculateEquity = (preMoneyValuation: number, amountRaising: number) => {
        if (preMoneyValuation) {
            return (
                ((amountRaising / (preMoneyValuation + amountRaising)) * 100).toFixed(1)
            )
        } else {
            return 0
        }

    }

    const calculatePostMoney = (preMoneyValuation: number, amountRaising: number) => {
        if (preMoneyValuation) {
            return (
                preMoneyValuation + amountRaising
            )
        } else {
            return 0
        }
    }

    const calculateBurn = (monthlyBurnRate: number, cashInBank: number) => {
        if (!monthlyBurnRate) {
            return "∞"
        } else if (!cashInBank) {
            return 0
        } else {
            let burn = cashInBank / monthlyBurnRate

            return (
                (Math.round(burn * 4) / 4) * 1 // * 1 gets rid of .00
            )
        }
    }

    

    return {
        calculateEquity,
        calculatePostMoney,
        calculateBurn
    };
};
export default useRoundPlannerCalculator;