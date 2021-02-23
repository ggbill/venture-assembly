import './sectorSection.scss'
import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, InputLabel, ListItem, MenuItem, OutlinedInput, Paper, Select, Slider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from '@material-ui/core'
import FinancialsLineChart from './FinancialsLineChart'
import { ReactComponent as QuestionMark } from '../../../images/question-mark.svg'

interface InputProps {
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (any: any) => void
}

const SectorSection = (props: InputProps) => {

    const setFinancials = (index, property, value) => {
        let tempFinancials = [...props.roundDetails.financials]
        tempFinancials[index][property] = Number(value);
        props.setRoundDetails({ ...props.roundDetails, financials: tempFinancials })
    }

    return (
        <div className="sector-section">
            <div className="content">
                <span className="page-subtitle">Sector.</span>
                <div className="inputs-wrapper">
                    <div className="field-wrapper">
                        <FormControl variant="outlined" required>
                            <InputLabel id="sector-label">Sector</InputLabel>
                            <Select
                                labelId="sector-label"
                                id="sector"
                                value={props.roundDetails.sector}
                                onChange={(event) => props.setRoundDetails({ ...props.roundDetails, sector: String(event.target.value) })}
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
                                    checked={props.roundDetails.isUsesTech}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, isUsesTech: event.target.checked })}
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
                                value={props.roundDetails.stage}
                                onChange={(event) => props.setRoundDetails({ ...props.roundDetails, stage: String(event.target.value) })}
                                label="Stage"
                            >
                                <ListItem value="Pre-Startup/MVP">Pre-Startup/MVP</ListItem>
                                <ListItem value="Finished Product">Finished Product</ListItem>
                                <ListItem value="Achieving Sales">Achieving Sales</ListItem>
                                <ListItem value="Breaking Even">Breaking Even</ListItem>
                                <ListItem value="Profitable">Profitable</ListItem>
                            </Select>
                            <FormHelperText>Please select what stage your business is at.</FormHelperText>
                        </FormControl>
                    </div>

                    <div className="field-wrapper">
                        <NumberFormat
                            value={props.roundDetails.monthlyRevenue}
                            name="monthlyRevenue"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Monthly Revenue"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => props.setRoundDetails({ ...props.roundDetails, monthlyRevenue: Number(values.value) })}
                            helperText="How much revenue does your company generate per month?"
                            required
                        />
                    </div>
                    <div className="field-wrapper">
                        <NumberFormat
                            value={props.roundDetails.month12Revenue}
                            name="month12Revenue"
                            allowLeadingZeros={false}
                            allowNegative={false}
                            customInput={TextField}
                            prefix={'£'}
                            type="tel"
                            label="Projected Monthly Revenue in Month 12"
                            variant="outlined"
                            thousandSeparator
                            onValueChange={(values) => props.setRoundDetails({ ...props.roundDetails, month12Revenue: Number(values.value) })}
                            helperText="What is the predicted monthly revenue in 12 months' time?"
                            required
                        />
                    </div>
                </div>
                <div className="financials-wrapper">
                    {/* {JSON.stringify(props.roundDetails.financials)} */}
                    <div className="financials-table-wrapper">
                        <Paper className="financials-table" >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                        </TableCell>
                                        <TableCell>
                                            <span>Year 1</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>Year 2</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>Year 3</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            Revenue
                                    </TableCell>
                                        {props.roundDetails.financials.map((element: App.FinancialDetails, index: number) => (
                                            <TableCell>
                                                <NumberFormat
                                                    value={props.roundDetails.financials[index].revenue}
                                                    name="monthlyRevenue"
                                                    allowLeadingZeros={false}
                                                    allowNegative={false}
                                                    customInput={TextField}
                                                    prefix={'£'}
                                                    type="tel"
                                                    variant="outlined"
                                                    thousandSeparator
                                                    onValueChange={(values) => setFinancials(index, "revenue", values.value)}
                                                    required
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            EBITDA
                                    </TableCell>
                                        {props.roundDetails.financials.map((element: App.FinancialDetails, index: number) => (
                                            <TableCell>
                                                <NumberFormat
                                                    value={props.roundDetails.financials[index].ebitda}
                                                    name="monthlyRevenue"
                                                    allowLeadingZeros={false}
                                                    customInput={TextField}
                                                    prefix={'£'}
                                                    type="tel"
                                                    variant="outlined"
                                                    thousandSeparator
                                                    onValueChange={(values) => setFinancials(index, "ebitda", values.value)}
                                                    required
                                                    InputProps={{ inputProps: { min: 0, max: props.roundDetails.financials[index].revenue } }}
                                                    isAllowed={(values) => {
                                                        const { formattedValue, floatValue } = values;
                                                        return formattedValue === "" || Number(floatValue) <= props.roundDetails.financials[index].revenue;
                                                    }}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Costs
                                    </TableCell>
                                        {props.roundDetails.financials.map((element: App.FinancialDetails, index: number) => (
                                            <TableCell>
                                                <div className={(props.roundDetails.financials[index].revenue - props.roundDetails.financials[index].ebitda) < 0 ? "cost red" : "cost"}>
                                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.financials[index].revenue - props.roundDetails.financials[index].ebitda)}
                                                </div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <FormHelperText>Remember - EBITDA must be lower than revenue.</FormHelperText>
                        </Paper>
                    </div>

                    <div className="financials-line-chart-wrapper">
                        <FinancialsLineChart roundDetails={props.roundDetails} setRoundDetails={props.setRoundDetails} />
                    </div>
                </div>
            </div>
            <div className="results-wrapper">
                <div className="results content">
                    <div className="figures-wrapper">
                        <div className="result">
                            <div className="emoji">
                                {(
                                    props.roundDetails.preMoneyValuation === 0 ||
                                    typeof (props.roundDetails.preMoneyValuation) === "undefined" ||
                                    props.roundDetails.financials[0].revenue === 0 ||
                                    typeof (props.roundDetails.financials[0].revenue) === "undefined"
                                ) ?
                                    <span>🧐</span> :
                                    <span>🏦</span>
                                }

                            </div>
                            <div className="figures">
                                <span className="label">
                                    Valuation / Rev
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "🏦 Valuation to Revenue Multiple",
                                            message: "Your valuation as a multiple of your current revenue."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>
                                </span>
                                {(
                                    props.roundDetails.preMoneyValuation === 0 ||
                                    typeof (props.roundDetails.preMoneyValuation) === "undefined" ||
                                    props.roundDetails.financials[0].revenue === 0 ||
                                    typeof (props.roundDetails.financials[0].revenue) === "undefined"
                                ) ?
                                    <span className="value error">Please complete company valuation and year 1 revenue.</span> :
                                    <span className="value">{`${(props.roundDetails.preMoneyValuation / props.roundDetails.financials[0].revenue).toFixed(0)}x`}</span>
                                }
                            </div>

                        </div>
                        <div className="result">
                            <div className="emoji">
                                🚀
                            </div>
                            <div className="figures">
                                <span className="label">
                                    Growth Rate
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "🚀 Growth Rate",
                                            message: "Your revenue after 12 months as a multiple of the current month's revenue."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>
                                    </span>
                                {(
                                    props.roundDetails.month12Revenue === 0 ||
                                    typeof (props.roundDetails.month12Revenue) === "undefined" ||
                                    props.roundDetails.monthlyRevenue === 0 ||
                                    typeof (props.roundDetails.monthlyRevenue) === "undefined"
                                ) ?
                                    <span className="value error">Please complete monthly revenue and month 12 revenue.</span> :
                                    <span className="value">{`${(props.roundDetails.month12Revenue / props.roundDetails.monthlyRevenue).toFixed(1)}x`}</span>
                                }
                            </div>

                        </div>
                        <div className="result">
                            <div className="emoji">
                                📈
                        </div>
                            <div className="figures">
                                <span className="label">
                                    Monthly Growth Rate
                                    <div className="question-mark-wrapper" onClick={() => {
                                        props.setNotificationDialogProperties({
                                            isOpen: true,
                                            type: "NOTIFICATION",
                                            title: "📈 Monthly Compound Growth Rate",
                                            message: "Your valuation as a multiple of your current revenue."
                                        })
                                    }}>
                                        <QuestionMark />
                                    </div>
                                    </span>
                                {(
                                    props.roundDetails.month12Revenue === 0 ||
                                    typeof (props.roundDetails.month12Revenue) === "undefined" ||
                                    props.roundDetails.monthlyRevenue === 0 ||
                                    typeof (props.roundDetails.monthlyRevenue) === "undefined"
                                ) ?
                                    <span className="value error">Please complete monthly revenue and month 12 revenue.</span> :
                                    <span className="value">{`${((Math.pow(props.roundDetails.month12Revenue / props.roundDetails.monthlyRevenue, (1 / 11)) - 1) * 100).toFixed(0)}%`}</span>
                                }
                            </div>

                        </div>

                    </div>
                    <div className="tooltip-wrapper">
                        <span dangerouslySetInnerHTML={{ __html: `<span style="font-size: 2em">💡☝️</span> Not all growth stories are aligned with revenue multiples. Be aware and make a mental note at which point you might be priced in accordance with them. This will help you avoid a down round.` }} />
                        {/* <span dangerouslySetInnerHTML={{ __html: `<span style="font-size: 2em">💡☝️</span> As a rule of thumb the money raised now should give a 2x uplift in valuation by the next round. According to the values above <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.amountRaising)}</b> will get you to a <b>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(props.roundDetails.preMoneyValuation * 2)}</b> valuation.` }} /> */}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SectorSection