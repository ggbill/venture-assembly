import { useState } from "react";

const useSwotTooltipGenerator = () => {
    
    const getTooltip = (swotResults: App.SwotObject): string => {
        let tooltip = ""

        if (swotResults.market === 1){
            tooltip = "rule 1 - -Dont go for investment - do as lifestyle business."
        } else if (swotResults.team === 1){
            tooltip = "rule 2 - Team is weak, might be good to bring in specialist help on a contract basis."
        } else if (swotResults.traction === 1){
            if (swotResults.team === 1 && swotResults.technology===5 && swotResults.advisors ===1 && swotResults.market === 5){
                tooltip = "KAPOW - 🦇 THE BATMAN! But seriously if this is the shape of your company, there are some easy wins to be had by demonstrating some early user interest and bringing onboard some advisors. Then you actually will start looking more Batman than Robin."
            }else{
                tooltip = "rule 3 - No matter how strong you feel you are in other areas, you need to try to prove to investors that the company will be able to create traction in the future, by demonstrating some early, tangible, customer engagement. A simple way to do this is through showing users what you intend to create and then asking for pre-signups or expressions of interest."
            }
            
        }else if (swotResults.advisors === 1){
            tooltip = "rule  4 - Advisors are essential to making an investor feel confident that you are making informed business decisions based on input from a variety of well informed sources."
        }else if (swotResults.advisors === 2){
            tooltip = "rule 5"
        } else if (swotResults.traction ===2){
            tooltip = "rule 6"
        } else if (swotResults.team === 2){
            tooltip = "rule 7"
        } else if (swotResults.traction === 3){
            tooltip = "rule 8"
        } else if (swotResults.team === 5 && swotResults.technology===5 && swotResults.advisors ===5 && swotResults.market === 5 && swotResults.traction=== 5) {
            tooltip = "🦄 Looks like we have a unicorn on our hands - what are you still doing here?"
        } else {
            tooltip = "catch all"
        }

        return tooltip

    }

    return {
        getTooltip
    }
}

export default useSwotTooltipGenerator