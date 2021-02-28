import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import usePdfGenerator from '../../hooks/usePdfGenerator';
import './callBookingDialog.scss'
import useCallBookingValidation from './useCallBookingValidation';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ImageCropper from '../imageCropper/ImageCropper';
import CallBooking from './CallBooking';
import useFetch from '../../hooks/useFetch';



interface InputProps {
    isDialogOpen: boolean,
    handleClose: () => void,
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
}

const CallBookingDialog = (props: InputProps) => {

    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(true)
    const [stepNumber, setStepNumber] = useState<number>(1)
    const [isBookingSuccess, setIsBookingSuccess] = useState<boolean>(false)

    const roundPlannerApi = useFetch("roundPlanner")

    const callBookingValidation = useCallBookingValidation()

    const closeSuccessDialog = () => {
        setStepNumber(1)
        setIsBookingSuccess(false)
        props.handleClose()
    }

    const persistRoundToDB = (calendlyEventUri: string, calendlyInviteeUri: string) => {

        console.log(props.roundDetails)

        roundPlannerApi.post("create", {
            ...props.roundDetails,
            financialsBase64String: "",
            radarBase64String: "",
            calendlyEventUri: calendlyEventUri,
            calendlyInviteeUri: calendlyInviteeUri
        }).then((result) => {
            // console.log(result)
        }).catch((err: Error) => {
            console.log(err)
        })
    }


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
                            {/* <div className="field-wrapper">
                                <TextField
                                    id="phone"
                                    name="phone"
                                    className=""
                                    label="Your Phone Number"
                                    variant="outlined"
                                    value={props.roundDetails.phone}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, phone: event.target.value })}
                                    required
                                    fullWidth
                                    error={!callBookingValidation.getValidation("phone").isValid}
                                    helperText={!callBookingValidation.getValidation("phone").isValid && callBookingValidation.getValidation("phone").validationMessage}
                                />
                            </div> */}

                            <div className="field-wrapper">
                                <TextField
                                    id="companyName"
                                    name="companyName"
                                    className=""
                                    label={`Your Company's Name (${28 - props.roundDetails.companyName.length} characters remaining)`}
                                    variant="outlined"
                                    value={props.roundDetails.companyName}
                                    onChange={(event) => props.setRoundDetails({ ...props.roundDetails, companyName: event.target.value })}
                                    required
                                    fullWidth
                                    error={!callBookingValidation.getValidation("companyName").isValid}
                                    helperText={!callBookingValidation.getValidation("companyName").isValid && callBookingValidation.getValidation("companyName").validationMessage}
                                    inputProps={{ maxLength: 28 }}
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

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isAgreedTerms}
                                    onChange={(event) => setIsAgreedTerms(event.target.checked)}
                                    name="isAgreedTerms"

                                />
                            }
                            label="I agree to Venture Assembly's Terms of Use, Privacy Policy and Cookie Policy"
                            className="tech-checkbox"


                        />
                        {!callBookingValidation.getValidation("isTermsAgreed").isValid &&
                            <FormHelperText className="ts-and-cs-error">{callBookingValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText>
                        }
                    </>
                    :
                    <>
                        <div className="intro-text">
                            Next, please select an available slot in which to book the call. We will add a Google Hangouts link to the meeting in advance of the call.
                        </div>

                        <CallBooking roundDetails={props.roundDetails} setRoundDetails={props.setRoundDetails} setIsBookingSuccess={setIsBookingSuccess} persistRoundToDb={persistRoundToDB} />
                    </>

                }





            </DialogContent>


            {stepNumber === 1 ?
                <DialogActions>
                    <Button className="va-button" onClick={() => props.handleClose()} >
                        Cancel
                 </Button>
                    <Button id="submit" className="va-button" onClick={() => setStepNumber(stepNumber + 1)} >
                        Next
                 </Button>
                </DialogActions>
                :
                <DialogActions>
                    {isBookingSuccess ?
                        <Button className="va-button" onClick={closeSuccessDialog} >
                            Done
                         </Button>
                        :
                        <Button className="va-button" onClick={() => setStepNumber(stepNumber - 1)} >
                            Back
                         </Button>
                    }

                </DialogActions>
            }

        </Dialog>
    )
}

export default CallBookingDialog