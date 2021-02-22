import './fundamentalsSection.scss'
import React from 'react'
import NumberFormat from 'react-number-format'
import { InputAdornment, TextField} from '@material-ui/core'
import CustomVASlider from '../../shared/CustomVASlider'
import { ReactComponent as QuestionMark } from '../../../images/question-mark.svg'
import useRoundPlannerCalculator from '../../../hooks/useRoundPlannerCalculator'

interface InputProps{
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const FundamentalsSection = (props: InputProps) => {

    let roundPlannerCalculator = useRoundPlannerCalculator()

    return (
        <div className="fundamentals-section">
            <div className="content">
                <h2>Fundamentals.</h2>
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
                                            title: "Company Valuation",
                                            message: "If you are unsure, enter a value. The average funding round gives away about 15% for the amount they are raising."
                                        })
                                    }}>
                                        <QuestionMark/>
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
                                defaultValue={props.roundDetails.amountRaising}
                                aria-labelledby="discrete-slider"
                                step={5000}
                                min={10000}
                                max={1000000}
                                onChange={(event, value) => props.setRoundDetails({ ...props.roundDetails, amountRaising: Number(value) })}
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
                                <span className="label">Equity to be Sold</span>
                                <span className="value">{`${roundPlannerCalculator.calculateEquity(props.roundDetails.preMoneyValuation, props.roundDetails.amountRaising)}%`}</span>
                            </div>

                        </div>
                        <div className="result">
                            <div className="emoji">
                                🏷️
                            </div>
                            <div className="figures">
                                <span className="label">Post Money Valuation</span>
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
                                <span className="label">Runway (months)</span>
                                <span className="value">{`${roundPlannerCalculator.calculateBurn(props.roundDetails.monthlyBurnRate, props.roundDetails.cashInBank)}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tooltip-wrapper">
                        <span dangerouslySetInnerHTML={{ __html: `<span style="font-size: 2em">💡☝️</span> As a rule of thumb the money raised now should give a 2x uplift in valuation by the next round. According to the values above <b><u>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.amountRaising)}</u></b> will get you to a <b><u>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 2)}</u></b> valuation.` }}>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FundamentalsSection