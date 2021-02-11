import './sectorSection.scss'
import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Input, InputAdornment, InputLabel, ListItem, MenuItem, OutlinedInput, Paper, Select, Slider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from '@material-ui/core'

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
                <h1>Sector.</h1>
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
                    <Paper>
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
                    </Paper>

                </div>

            </div>
            <div className="results-wrapper">

            </div>
        </div>
    )

}

export default SectorSection