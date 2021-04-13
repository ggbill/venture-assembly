import './fundamentalsSection.scss'
import React from 'react'
import NumberFormat from 'react-number-format'
import { InputAdornment, TextField } from '@material-ui/core'
import CustomVASlider from '../../shared/CustomVASlider'
import { ReactComponent as QuestionMark } from '../../../images/question-mark.svg'
import useRoundPlannerCalculator from '../../../hooks/useRoundPlannerCalculator'

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const FundamentalsSection = (props: InputProps) => {

    let roundPlannerCalculator = useRoundPlannerCalculator()

    return (
        <div className="fundamentals-section">
            <div className="content">
                <span className="page-subtitle">Fundamentals.</span>
                <div className="inputs-wrapper">
                    <div className="field-wrapper with-question-mark">
                        <NumberFormat
                            value={props.roundDetails.preMoneyValuation}
                            name="preMoneyValuation"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Pre-money Valuation"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => props.setRoundDetails({ ...props.roundDetails, preMoneyValuation: Number(values.value) })}
                            helperText="Please enter how much your company is worth before this round of investment."
                            required
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "📈 Company Valuation",
                                            message: "The average funding round gives away about 15% for the amount they are raising. If you need help with valuing your company, why not book a free 15 minute session with us at the bottom of the page."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>

                                </InputAdornment>,
                            }}
                        />
                    </div>
                    <div className="field-wrapper">
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Amount Raising: `}
                                </span>
                                <span className="value">
                                    {`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.amountRaising)}`}
                                </span>
                            </div>

                            <CustomVASlider
                                value={props.roundDetails.amountRaising}
                                // defaultValue={props.roundDetails.amountRaising}
                                aria-labelledby="discrete-slider"
                                step={5000}
                                min={10000}
                                max={1000000}
                                onChange={(event, value) => props.setRoundDetails({ ...props.roundDetails, amountRaising: Number(value) })}
                                color='#DA4167'
                            />
                        </div>

                    </div>
                    <div className="field-wrapper">
                        <NumberFormat
                            value={props.roundDetails.cashInBank}
                            name="cashInBank"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Cash in Bank"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => props.setRoundDetails({ ...props.roundDetails, cashInBank: Number(values.value) })}
                            helperText="How much cash does your company currently have in the bank?"
                            required
                        />
                    </div>
                    <div className="field-wrapper">
                        <NumberFormat
                            value={props.roundDetails.monthlyBurnRate}
                            name="monthlyBurnRate"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Monthly Burn Rate"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => props.setRoundDetails({ ...props.roundDetails, monthlyBurnRate: Number(values.value) })}
                            helperText="On average how much money is the company spending each month?"
                            required
                        />
                    </div>
                </div>

            </div>
            <div className="results-wrapper">
                <div className="results content">
                    <div className="figures-wrapper">
                        <div className="result">
                            <div className="emoji">
                                🗞️
                            </div>
                            <div className="figures">
                                <div className="label">
                                    Equity to be Sold
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "🗞️ Equity to be Sold",
                                            message: "This is the amount of equity in your company you will have to give away in order to raise the required amount, according to the pre-money valuation of your company."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>
                                </div>
                                <span className="value">{`${roundPlannerCalculator.calculateEquity(props.roundDetails.preMoneyValuation, props.roundDetails.amountRaising)}%`}</span>
                            </div>

                        </div>
                        <div className="result">
                            <div className="emoji">
                                🏷️
                            </div>
                            <div className="figures">
                                <span className="label">
                                    Post Money Valuation
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "🏷️ Post Money Valuation",
                                            message: "How much your company will be worth immediately after the successful fundraise."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>
                                </span>
                                <span className="value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundPlannerCalculator.calculatePostMoney(props.roundDetails.preMoneyValuation, props.roundDetails.amountRaising))}</span>
                            </div>
                        </div>
                        <div className="result">
                            <div className="emoji">
                                {roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank) <= 1 && <span>🥵</span>}
                                {roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank) > 1 && roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank) <= 3 && <span>😮</span>}
                                {roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank) > 3 && roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank) <= 6 && <span>🤔</span>}
                                {roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank) > 6 && <span>😎</span>}
                            </div>
                            <div className="figures">
                                <span className="label">
                                    Runway (months)
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "🛬 Runway",
                                            message: "This is the amount of time you can afford to keep the company running based on the amount of cash you currently have in the bank versus the amount you are spending (burn) each month."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>
                                </span>
                                <span className="value">{`${roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank)}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tooltip-wrapper">
                        <span dangerouslySetInnerHTML={{ __html: `<span style="font-size: 2em">💡☝️</span> As a rule of thumb the money raised in your current fundraising round should lead to a 2x uplift in your company's valuation by the next round. So, according to the values entered, an investment of <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.amountRaising)}</b> should enable you to create a company valued at <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 2)}</b> by your next round.` }} />
                        {/* <span dangerouslySetInnerHTML={{ __html: `<span style="font-size: 2em">💡☝️</span> As a rule of thumb the money raised now should give a 2x uplift in valuation by the next round. According to the values above <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.amountRaising)}</b> will get you to a <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 2)}</b> valuation.` }} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundamentalsSection