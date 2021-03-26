import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, InputLabel, ListItem, Select, TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import './faasEnquiryDialog.scss'
import useFaasEnquiryValidation from './useFaasEnquiryValidation'
import useFetch from '../../hooks/useFetch';

interface InputProps {
    isDialogOpen: boolean,
    handleClose: () => void,
}

const FaasEnquiryDialog = (props: InputProps) => {
    const [enquiryDetails, setEnquiryDetails] = useState<any>({ name: "", companyName: "", website: "", email: "", package: "", message: "" })
    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(false)
    const faasEnquiryValidation = useFaasEnquiryValidation()
    const faasApi = useFetch("faas")

    const submitEnquiry = () => {
        if (faasEnquiryValidation.validateInputs(enquiryDetails, isAgreedTerms)) {
            faasApi.post("create", enquiryDetails)
                .then((result) => {
                    // console.log(result)
                    props.handleClose()
                }).catch((err: Error) => {
                    console.log(err)
                })

        } else {
            console.log("not valid")
        }

    }

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="faas-enquiry-dialog"
        >
            <DialogTitle id="form-dialog-title">Founder as a Service Enquiry.</DialogTitle>
            <DialogContent>
                <div className="intro-text">
                    In order to enquire about Founder as a Service, please enter some basic details below and we will get back to you within 48 hours (usually quicker!).
                </div>
                <div className="inputs-wrapper">
                    <div className="field-wrapper">
                        <TextField
                            id="name"
                            name="name"
                            className=""
                            label="Your Name"
                            variant="outlined"
                            value={enquiryDetails.name}
                            onChange={(event) => setEnquiryDetails({ ...enquiryDetails, name: event.target.value })}
                            required
                            fullWidth
                            error={!faasEnquiryValidation.getValidation("name").isValid}
                            helperText={!faasEnquiryValidation.getValidation("name").isValid && faasEnquiryValidation.getValidation("name").validationMessage}
                        />
                    </div>
                    <div className="field-wrapper">
                        <TextField
                            id="companyName"
                            name="companyName"
                            className=""
                            label="Your Company's Name"
                            variant="outlined"
                            value={enquiryDetails.companyName}
                            onChange={(event) => setEnquiryDetails({ ...enquiryDetails, companyName: event.target.value })}
                            required
                            fullWidth
                            error={!faasEnquiryValidation.getValidation("companyName").isValid}
                            helperText={!faasEnquiryValidation.getValidation("companyName").isValid && faasEnquiryValidation.getValidation("companyName").validationMessage}
                        />
                    </div>
                    <div className="field-wrapper">
                        <TextField
                            id="email"
                            name="email"
                            className=""
                            label="Your Email Address"
                            variant="outlined"
                            value={enquiryDetails.email}
                            onChange={(event) => setEnquiryDetails({ ...enquiryDetails, email: event.target.value })}
                            required
                            fullWidth
                            error={!faasEnquiryValidation.getValidation("email").isValid}
                            helperText={!faasEnquiryValidation.getValidation("email").isValid && faasEnquiryValidation.getValidation("email").validationMessage}
                        />
                    </div>
                    {/* <div className="field-wrapper">
                        <TextField
                            id="website"
                            name="website"
                            className=""
                            label="Your Company's Website (if applicable)"
                            variant="outlined"
                            value={enquiryDetails.website}
                            onChange={(event) => setEnquiryDetails({ ...enquiryDetails, website: event.target.value })}
                            fullWidth
                        />
                    </div> */}
                    <div className="field-wrapper">
                        <FormControl variant="outlined"
                         required
                         error={!faasEnquiryValidation.getValidation("package").isValid}
                         >
                            <InputLabel id="package-label">Which Package Are You Interested In?</InputLabel>
                            <Select
                                labelId="package-label"
                                id="package"
                                name="package"
                                value={enquiryDetails.package}
                                onChange={(event) => setEnquiryDetails({ ...enquiryDetails, package: event.target.value })}
                                label="Which Package Are You Interested In? *"
                            >
                                <ListItem value="">Please Select</ListItem>
                                <ListItem value="One Off">One Off (£200)</ListItem>
                                <ListItem value="Occasional">Occasional (£300 / month)</ListItem>
                                <ListItem value="Fortnightly">Fortnightly (£500 / month)</ListItem>
                                <ListItem value="Dedicated">Dedicated (£1,000 / month)</ListItem>
                                <ListItem value="Not Sure">Not sure yet</ListItem>
                            </Select>
                            {!faasEnquiryValidation.getValidation("package").isValid && <FormHelperText>{faasEnquiryValidation.getValidation("package").validationMessage} </FormHelperText>}
                        </FormControl>
                    </div>

                    <TextField
                        id="message"
                        name="message"
                        className=""
                        label="Brief description of what you are looking to get out of the service"
                        variant="outlined"
                        value={enquiryDetails.message}
                        onChange={(event) => setEnquiryDetails({ ...enquiryDetails, message: event.target.value })}
                        fullWidth
                        multiline
                        rows={5}
                        rowsMax={5}
                        required
                    error={!faasEnquiryValidation.getValidation("message").isValid}
                    helperText={!faasEnquiryValidation.getValidation("message").isValid && faasEnquiryValidation.getValidation("message").validationMessage}
                    />
                </div>


                <div className="ts-and-cs-wrapper">
                    {!faasEnquiryValidation.getValidation("isTermsAgreed").isValid &&
                        <FormHelperText className="ts-and-cs-error">{faasEnquiryValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText>
                    }
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Checkbox
                                checked={isAgreedTerms}
                                onChange={(event) => setIsAgreedTerms(event.target.checked)}
                                name="isAgreedTerms"
                            />
                        }
                        label="I agree to Venture Assembly's Privacy Policy"
                        className="tech-checkbox"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                {!faasEnquiryValidation.isValidationPassed && <span className="validation-text">Errors highlighted in form - please resolve.</span>}
                <div className="button-wrapper">
                    <Button className="va-button cancel" onClick={() => props.handleClose()} >
                        Cancel
                        </Button>
                    <Button id="submit" className="va-button confirm" onClick={submitEnquiry}>
                        Submit
                        </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default FaasEnquiryDialog