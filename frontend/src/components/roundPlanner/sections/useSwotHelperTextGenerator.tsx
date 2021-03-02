import { useState } from "react";

const useSwotHelperTextGenerator = () => {
    const [helperObject, setHelperObject] = useState<any[]>([
        {
            category: "team",
            helperTextList: [
                "Insufficient expertise within the team to run the company successfully.",
                "Strong educational background and some industry experience.",
                "Relevant industry background.",
                "Strong industry experience and some startup experience.",
                "Expert team, serial entrepreneurs or industry experts.",
            ]
        },
        {
            category: "technology",
            helperTextList: [
                "No technology.",
                "Light use of tech for website etc.",
                "Software platform.",
                "Extensive use of data, software and automation.",
                "Deep Tech, extensive IP and Advantage.",
            ]
        },
        {
            category: "advisors",
            helperTextList: [
                "No advisors.",
                "Unofficial contacts to reach out to.",
                "Advisory board in place of varying experience levels.",
                "High quality experience board.",
                "World class advisory board, leaders in field.",
            ]
        },
        {
            category: "traction",
            helperTextList: [
                "Pre-indicators and KPIs of growth.",
                "Early trials and customer engagement.",
                "Small but growing group of customers and clients.",
                "Solid positive growth inline with forecasts.",
                "Rapid acceleration in customer growth.",
            ]
        },
        {
            category: "market",
            helperTextList: [
                "Niche local market.",
                "Mid-size national market.",
                "Large national market with international potential.",
                "Large established international market.",
                "Growing multi-billion pound market.",
            ]
        },
        {
            category: "uniqueness",
            helperTextList: [
                "market helper text 1.",
                "market helper text 2.",
                "market helper text 3.",
                "market helper text 4.",
                "Entirely original and unique proposition.",
            ]
        }
    ])

    const getHelperText = (category: string, value: number): string => {
        let helperText = ""

        helperObject.forEach(element => {
            if (category === element.category){
                helperText = element.helperTextList[value -1]
            }
        });

        return helperText

    }

    return {
        getHelperText
    }
}

export default useSwotHelperTextGenerator