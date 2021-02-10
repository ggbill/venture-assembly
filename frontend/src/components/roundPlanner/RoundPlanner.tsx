import './roundPlanner.scss'
import React, { useState } from 'react'
import MenuBar from '../shared/MenuBar'
import NumberFormat from 'react-number-format'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, InputLabel, ListItem, MenuItem, OutlinedInput, Select, Slider, TextField, Tooltip } from '@material-ui/core'
import CustomVASlider from '../shared/CustomVASlider'
import NotificationDialog from '../shared/NotificationDialog'
import { ReactComponent as QuestionMark } from '../../images/question-mark.svg'

const RoundPlanner = () => {

    const [notificationDialogProperties, setNotificationDialogProperties] = useState<any>({ isOpen: false, type: "", title: "", message: "" })
    const [roundDetails, setRoundDetails] = useState<App.RoundDetails>({
        preMoneyValuation: 1500000,
        amountRaising: 150000,
        cashInBank: 25000,
        monthlyBurnRate: 5000,
        sector: "",
        stage: "",
        monthlyRevenue: 0,
        month12Revenue: 0,
        isUsesTech: false
    })

    const calculateEquity = () => {
        if (roundDetails.preMoneyValuation) {
            return (
                ((roundDetails.amountRaising / (roundDetails.preMoneyValuation + roundDetails.amountRaising)) * 100).toFixed(1)
            )
        } else {
            return 0
        }

    }

    const calculatePostMoney = () => {
        if (roundDetails.preMoneyValuation) {
            return (
                roundDetails.preMoneyValuation + roundDetails.amountRaising
            )
        } else {
            return 0
        }
    }

    const calculateBurn = () => {
        if (!roundDetails.monthlyBurnRate) {
            return "∞"
        } else if (!roundDetails.cashInBank) {
            return 0
        } else {
            let burn = roundDetails.cashInBank / roundDetails.monthlyBurnRate

            return (
                (Math.round(burn * 4) / 4) * 1 // * 1 gets rid of .00
            )
        }
    }

    return (
        <div className="round-planner-page">
            <MenuBar />
            <div className="content top-page-margin">
                <h1>Round Planner.</h1>
                <div className="inputs-wrapper">
                    <div className="field-wrapper with-question-mark">
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
                            helperText="Please enter how much your company is worth before this round of investment."
                            required
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <div className="question-mark-wrapper" onClick={() => {
                                        setNotificationDialogProperties({
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
                        {/* <div className="question-mark-wrapper" onClick={() => {
                            setNotificationDialogProperties({
                                isOpen: true,
                                type: "NOTIFICATION",
                                title: "Company Valuation",
                                message: "If you are unsure, enter a value. The average funding round gives away about 15% for the amount they are raising."
                            })
                        }}>
                            <QuestionMark style={{fill: "#da4167"}} />
                        </div> */}

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

                            <CustomVASlider
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
                                <span className="value">{`${calculateEquity()}%`}</span>
                            </div>

                        </div>
                        <div className="result">
                            <div className="emoji">
                                🏷️
                            </div>
                            <div className="figures">
                                <span className="label">Post Money Valuation</span>
                                <span className="value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(calculatePostMoney())}</span>
                            </div>
                        </div>
                        <div className="result">
                            <div className="emoji">
                                {calculateBurn() <= 1 && <span>🥵</span>}
                                {calculateBurn() > 1 && calculateBurn() <= 3 && <span>😮</span>}
                                {calculateBurn() > 3 && calculateBurn() <= 6 && <span>🤔</span>}
                                {calculateBurn() > 6 && <span>😎</span>}
                            </div>
                            <div className="figures">
                                <span className="label">Runway (months)</span>
                                <span className="value">{`${calculateBurn()}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="tooltip-wrapper">
                        <span dangerouslySetInnerHTML={{ __html: `<span style="font-size: 2em">💡☝️</span> As a rule of thumb the money raised now should give a 2x uplift in valuation by the next round. According to the values above <b><u>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.amountRaising)}</u></b> will get you to a <b><u>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(roundDetails.preMoneyValuation * 2)}</u></b> valuation.` }}>
                        </span>
                    </div>



                </div>

            </div>

            {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <div className="content">
                <h1>Sector.</h1>
                <div className="inputs-wrapper">
                    <div className="field-wrapper">
                        <FormControl variant="outlined" required>
                            <InputLabel id="sector-label">Sector</InputLabel>
                            <Select
                                labelId="sector-label"
                                id="sector"
                                value={roundDetails.sector}
                                onChange={(event) => setRoundDetails({ ...roundDetails, sector: String(event.target.value) })}
                                label="Sector *"
                            >
                                <ListItem value="Agriculture">Agriculture</ListItem>
                                <ListItem value="Business">Business Services</ListItem>
                                <ListItem value="Education">Education &amp; Training</ListItem>
                                <ListItem value="Energy">Energy &amp; Natural Resources</ListItem>
                                <ListItem value="Entertainment ">Entertainment &amp; Leisure</ListItem>
                                <ListItem value="Fashion">Fashion &amp; Beauty</ListItem>
                                <ListItem value="Finance">Finance</ListItem>
                                <ListItem value="Food">Food &amp; Beverage</ListItem>
                                <ListItem value="Hospitality">Hospitality, Restaurants &amp; Bars</ListItem>
                                <ListItem value="Manufacturing">Manufacturing &amp; Engineering</ListItem>
                                <ListItem value="Media">Media</ListItem>
                                <ListItem value="Medical">Medical &amp; Sciences</ListItem>
                                <ListItem value="Personal">Personal Services</ListItem>
                                <ListItem value="Products">Products &amp; Inventions</ListItem>
                                <ListItem value="Property">Property </ListItem>
                                <ListItem value="Retail">Retail</ListItem>
                                <ListItem value="Sales">Sales &amp; Marketing</ListItem>
                                <ListItem value="Software">Software</ListItem>
                                <ListItem value="Technology">Technology</ListItem>
                                <ListItem value="Transportation">Transportation</ListItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={roundDetails.isUsesTech}
                                    onChange={(event) => setRoundDetails({ ...roundDetails, isUsesTech: event.target.checked })}
                                    name="isUsesTech"
                                />
                            }
                            label="Does the company use technolgy as a core service?"
                            className="tech-checkbox"
                        />

                    </div>
                    <div className="field-wrapper">
                        <FormControl variant="outlined" required>
                            <InputLabel id="stage-label">Stage</InputLabel>
                            <Select
                                labelId="stage-label"
                                id="stage"
                                name="stage"
                                value={roundDetails.stage}
                                onChange={(event) => setRoundDetails({ ...roundDetails, stage: String(event.target.value) })}
                                label="Stage"
                            >
                                <ListItem value="PRE">Pre-Startup/MVP</ListItem>
                                <ListItem value="PRODUCT">Finished Product</ListItem>
                                <ListItem value="SALES">Achieving Sales</ListItem>
                                <ListItem value="BREAKEVEN">Breaking Even</ListItem>
                                <ListItem value="PROFIT">Profitable</ListItem>
                            </Select>
                            <FormHelperText>"Please select what stage your business is at."</FormHelperText>
                        </FormControl>
                    </div>

                    <div className="field-wrapper">
                        <NumberFormat
                            value={roundDetails.monthlyRevenue}
                            name="monthlyRevenue"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Monthly Revenue"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => setRoundDetails({ ...roundDetails, monthlyRevenue: Number(values.value) })}
                            helperText="How much revenue does your company generate per month?"
                            required
                        />
                    </div>
                    <div className="field-wrapper">
                        <NumberFormat
                            value={roundDetails.month12Revenue}
                            name="month12Revenue"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Projected Monthly Revenue in Month 12"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => setRoundDetails({ ...roundDetails, month12Revenue: Number(values.value) })}
                            helperText="What is the predicted monthly revenue in 12 months' time?"
                            required
                        />
                    </div>
                </div>

            </div>
            <div className="results-wrapper">

            </div>

            <NotificationDialog
                handleClose={() => setNotificationDialogProperties({ ...notificationDialogProperties, isOpen: false })}
                isDialogOpen={notificationDialogProperties.isOpen}
                message={notificationDialogProperties.message}
                title={notificationDialogProperties.title}
                type={notificationDialogProperties.type}
            />

        </div>
    )

}

export default RoundPlanner