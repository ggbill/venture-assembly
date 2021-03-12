import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './callBookingDialog.scss'
import useCallBookingValidation from './useCallBookingValidation';
import Calendly from '../shared/Calendly';
import useFetch from '../../hooks/useFetch';

interface InputProps {
    isDialogOpen: boolean,
    handleClose: () => void,
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
}

const CallBookingDialog = (props: InputProps) => {

    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(false)
    const [stepNumber, setStepNumber] = useState<number>(1)
    const [isBookingSuccess, setIsBookingSuccess] = useState<boolean>(false)
    // const [calendlyEventDetails, setCalendlyEventDetails] = useState<any>({})

    const roundPlannerApi = useFetch("roundPlanner")
    const callBookingValidation = useCallBookingValidation()

    const closeSuccessDialog = () => {
        setStepNumber(1)
        setIsBookingSuccess(false)
        props.handleClose()
    }

    const persistRoundToDB = (eventUri, inviteeUri) => {
        setIsBookingSuccess(true)
        console.log(props.roundDetails)

        roundPlannerApi.post("create", {
            ...props.roundDetails,
            financialsBase64String: "",
            radarBase64String: "",
            calendlyEventUri: eventUri,
            calendlyInviteeUri: inviteeUri
        }).then((result) => {
            // console.log(result)
        }).catch((err: Error) => {
            console.log(err)
        })
    }

    const goToNextStep = () => {
        if (callBookingValidation.validateInputs(props.roundDetails, isAgreedTerms)) {
            setStepNumber(stepNumber + 1)
        }
    }

    // const updateCalendlyEventDetails = (eventUri, inviteeUri) => {
    //     setCalendlyEventDetails({ eventUri: eventUri, inviteeUri: inviteeUri })
    // }


    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="call-booking-dialog"
        >
            <DialogTitle id="form-dialog-title">15 Minute "What Next?" Call</DialogTitle>

            <DialogContent>
                <div className="step">
                    Step {stepNumber} of 2
                </div>

                {stepNumber === 1 ?
                    <>
                        <div className="intro-text">
                            To book your call, first enter some basic information about you and your company.
                        </div>

                        <div className="inputs-wrapper">
                            <div className="field-wrapper">
                                <TextField
                                    id="name"
                                    name="name"
                                    className=""
                                    label="Your Name"
                                    variant="outlined"
                                    value={props.roundDetails.name}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, name: event.target.value })}
                                    required
                                    fullWidth
                                    error={!callBookingValidation.getValidation("name").isValid}
                                    helperText={!callBookingValidation.getValidation("name").isValid && callBookingValidation.getValidation("name").validationMessage}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    id="email"
                                    name="email"
                                    className=""
                                    label="Your Email Address"
                                    variant="outlined"
                                    value={props.roundDetails.email}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, email: event.target.value })}
                                    required
                                    fullWidth
                                    error={!callBookingValidation.getValidation("email").isValid}
                                    helperText={!callBookingValidation.getValidation("email").isValid && callBookingValidation.getValidation("email").validationMessage}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    id="companyName"
                                    name="companyName"
                                    className=""
                                    label={`Your Company's Name`}
                                    variant="outlined"
                                    value={props.roundDetails.companyName}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, companyName: event.target.value })}
                                    required
                                    fullWidth
                                    error={!callBookingValidation.getValidation("companyName").isValid}
                                    helperText={!callBookingValidation.getValidation("companyName").isValid && callBookingValidation.getValidation("companyName").validationMessage}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    id="companyWebsite"
                                    name="companyWebsite"
                                    className=""
                                    label="Your Company's Website"
                                    variant="outlined"
                                    value={props.roundDetails.companyWebsite}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, companyWebsite: event.target.value })}
                                    fullWidth
                                />
                            </div>
                        </div>

                        <div className="ts-and-cs-wrapper">
                            {!callBookingValidation.getValidation("isTermsAgreed").isValid &&
                                <FormHelperText className="ts-and-cs-error">{callBookingValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText>
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

                    </>
                    :
                    <>
                        <div className="intro-text">
                            Next, please select an available slot in which to book the call. We will add a Google Hangouts link to the meeting in advance of the call.
                        </div>

                        <Calendly
                            name={props.roundDetails.name}
                            companyName={props.roundDetails.companyName}
                            email={props.roundDetails.email}
                            eventType="15 Min What's Next"
                            calendlySrc={`${process.env.REACT_APP_CALENDLY_15MIN_URL}?embed_domain=https://www.ventureassembly.co&embed_type=Inline&name=${encodeURI(props.roundDetails.name)}&email=${encodeURI(props.roundDetails.email)}`}
                            // setCalendlyEventDetails={updateCalendlyEventDetails}
                            onBookingSuccess={persistRoundToDB}
                        />
                    </>

                }
            </DialogContent>
            {stepNumber === 1 ?
                <DialogActions>
                    {!callBookingValidation.isValidationPassed && <span className="validation-text">Errors highlighted in form - please resolve.</span>}
                    <div className="button-wrapper">
                        <Button className="va-button cancel" onClick={() => props.handleClose()} >
                            Cancel
                        </Button>
                        <Button id="submit" className="va-button confirm" onClick={goToNextStep}>
                            Next
                        </Button>
                    </div>
                </DialogActions>
                :
                <DialogActions>
                    {isBookingSuccess ?
                        <div className="button-wrapper">
                            <Button className="va-button confirm" onClick={closeSuccessDialog} >
                                Done
                         </Button>
                        </div>

                        :
                        <div className="button-wrapper">
                            <Button className="va-button cancel" onClick={() => setStepNumber(stepNumber - 1)} >
                                Back
                         </Button>
                        </div>

                    }

                </DialogActions>
            }

        </Dialog>
    )
}

export default CallBookingDialog