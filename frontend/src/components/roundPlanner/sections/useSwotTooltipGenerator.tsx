import { useState } from "react";

const useSwotTooltipGenerator = () => {
    
    const getTooltip = (swotResults: App.SwotObject): string => {
        let tooltip = ""

        if (swotResults.market === 1){
            tooltip = "With such a small market, it is unlikely that investors will see this business idea as investable. That it is not a viable business, just unlikely to attract investment. You could run this business as a lifestyle business without investment, or look to pivot to open up a larger market segment."
        } else if (swotResults.team === 1){
            tooltip = "There is currently a shortage of skills in the team. If attracting the right full time team members is proving difficult, consider bringing in specialist help on a contract basis."
        } else if (swotResults.traction === 1){
            if (swotResults.team === 1 && swotResults.technology===5 && swotResults.advisors ===1 && swotResults.market === 5){
                tooltip = "KAPOW - 🦇 THE BATMAN! But seriously if this is the shape of your company, there are some easy wins to be had by demonstrating some early user interest and bringing onboard some advisors. Then you actually will start looking more Batman than Robin."
            }else{
                tooltip = "No matter how strong you feel you are in other areas, you need to try to prove to investors that the company will be able to create traction in the future, by demonstrating some early, tangible, customer engagement. A simple way to do this is through showing users what you intend to create and then asking for pre-signups or expressions of interest."
            }
        }else if (swotResults.advisors === 1){
            tooltip = "Advisors are essential to making an investor feel confident that you are making informed business decisions based on input from a variety of well informed sources."
        }else if (swotResults.advisors === 2){
            tooltip = "Look into creating an official advisory board. If chosen correctly they are can be huge value add."
        } else if (swotResults.traction ===2){
            tooltip = "Investors are looking to make a return on their investment. What better way to convince them that this is possible than to demonstrate a growing list of revenue generating customers."
        } else if (swotResults.team === 2){
            tooltip = "At this stage, Enhancements to the team are worth consideration to include strong, relevant industry experience to build on early traction or to help build a platform for further growth."
        } else if (swotResults.traction === 3){
            tooltip = "Look to grow you revenue generating customer base to deomstrate strong growth in line with forecasts."
        } else if (swotResults.team === 5 && swotResults.technology===5 && swotResults.advisors ===5 && swotResults.market === 5 && swotResults.traction=== 5) {
            tooltip = "🦄 Looks like we have a unicorn on our hands - what are you still doing here?"
        } else {
            tooltip = "This company is looking in good shape for investment!"
        }

        return tooltip

    }

    return {
        getTooltip
    }
}

export default useSwotTooltipGenerator