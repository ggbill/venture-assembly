import './roundPlanner.scss'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NumberFormat from 'react-number-format'
import { Slider, TextField, Tooltip } from '@material-ui/core'

const RoundPlanner = () => {

    const [roundDetails, setRoundDetails] = useState<App.RoundDetails>({
        preMoneyValuation: 1500000,
        amountRaising: 150000,
        cashInBank: 25000,
        monthlyBurnRate: 5000
    } as App.RoundDetails)

    const calculateEquity = () => {
        if (roundDetails.preMoneyValuation){
          return (
            ((roundDetails.amountRaising / (roundDetails.preMoneyValuation + roundDetails.amountRaising)) * 100).toFixed(1)
        )  
        }else{
            return 0
        }
        
    }

    const calculatePostMoney = () => {
        if (roundDetails.preMoneyValuation){
            return (
                roundDetails.preMoneyValuation + roundDetails.amountRaising
            ) 
          }else{
              return 0
          }
    }

    const calculateBurn = () => {
        if (roundDetails.cashInBank && roundDetails.monthlyBurnRate) {

            let burn = roundDetails.cashInBank / roundDetails.monthlyBurnRate
            
            return (
                (Math.round(burn * 4) / 4) * 1 // * 1 gets rid of .00
            )
        } else {
            return 0
        }

    }

    return (
        <div className="round-planner-page">
            <MenuBar />
            <div className="content">
                <h1>Round Planner.</h1>
                <div className="inputs-wrapper">
                    <div className="field-wrapper">
                        <NumberFormat
                            value={roundDetails.preMoneyValuation}
                            name="preMoneyValuation"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Pre-money Valuation"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => setRoundDetails({ ...roundDetails, preMoneyValuation: Number(values.value) })}
                            // error={!props.bidValidation.isValid}
                            helperText="Please enter how much your company is worth before this round of investment."
                            required
                        />
                    </div>
                    <div className="field-wrapper">
                        <div className="slider-wrapper">
                            <div className="selected-figure">
                                <span className="label">
                                    {`Amount Raising: `}
                                </span>
                                <span className="value">
                                    {`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.amountRaising)}`}
                                </span>
                            </div>

                            <Slider
                                defaultValue={roundDetails.amountRaising}
                                aria-labelledby="discrete-slider"
                                step={5000}
                                min={10000}
                                max={1000000}
                                onChange={(event, value) => setRoundDetails({ ...roundDetails, amountRaising: Number(value) })}
                            />
                        </div>

                    </div>
                    <div className="field-wrapper">
                        <NumberFormat
                            value={roundDetails.cashInBank}
                            name="cashInBank"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Cash in Bank"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => setRoundDetails({ ...roundDetails, cashInBank: Number(values.value) })}
                            // error={!props.bidValidation.isValid}
                            helperText="How much cash does your company currently have in the bank?"
                            required
                        />
                    </div>
                    <div className="field-wrapper">
                        <NumberFormat
                            value={roundDetails.monthlyBurnRate}
                            name="monthlyBurnRate"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Monthly Burn Rate"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => setRoundDetails({ ...roundDetails, monthlyBurnRate: Number(values.value) })}
                            // error={!props.bidValidation.isValid}
                            helperText="On average how much money is the company spending each month?"
                            required
                        />
                    </div>
                </div>

            </div>
            <div className="results-wrapper">
                <div className="results content">
                    <div className="result">
                        <span className="label">Equity to be Sold</span>
                        <span className="value">{`${calculateEquity()}%`}</span>
                    </div>
                    <div className="result">
                        <span className="label">Post Money Valuation</span>
                        <span className="value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(calculatePostMoney())}</span>
                    </div>
                    <div className="result">
                        <span className="label">Runway</span>
                        <span className="value">{`${calculateBurn()} months`}</span>
                    </div>

                </div>

            </div>

        </div>
    )

}

export default RoundPlanner