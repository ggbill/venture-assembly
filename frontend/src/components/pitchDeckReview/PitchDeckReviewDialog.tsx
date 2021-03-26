import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, InputLabel, ListItem, Select, TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import './pitchDeckReviewDialog.scss'
import usePitchDeckReviewValidation from './usePitchDeckReviewValidation'
import { loadStripe } from "@stripe/stripe-js";
import Calendly from '../shared/Calendly';
import useFetch from '../../hooks/useFetch';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY || "");

interface InputProps {
    isDialogOpen: boolean,
    handleClose: () => void,
}

const PitchDeckReviewDialog = (props: InputProps) => {
    const [reviewDetails, setReviewDetails] = useState<any>({ name: "", companyName: "", email: "", message: "", pitchDeckUrl: "", pitchDeckFile: {} as File })
    const [stepNumber, setStepNumber] = useState<number>(1)
    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(false)
    const [isBookingSuccess, setIsBookingSuccess] = useState<boolean>(false)
    // const [calendlyEventDetails, setCalendlyEventDetails] = useState<any>({})
    const pitchDeckReviewValidation = usePitchDeckReviewValidation()
    const inputFile: any = useRef(null)
    const pitchDeckReviewApi = useFetch("pitchDeckReview")

    const closeSuccessDialog = () => {
        setStepNumber(1)
        setIsBookingSuccess(false)
        props.handleClose()
    }

    // const updateCalendlyEventDetails = (eventUri, inviteeUri) => {
    //     setCalendlyEventDetails({ eventUri: eventUri, inviteeUri: inviteeUri })
    // }

    const goToNextStep = () => {
        if (pitchDeckReviewValidation.validateInputs(reviewDetails, isAgreedTerms)) {
            const formData = new FormData();
            formData.append("file", reviewDetails.pitchDeckFile);
            formData.append("upload_preset", "wb88wjmq");
            formData.append("folder", "Pitch Deck Reviews");
            formData.append("tags", `${reviewDetails.name}, ${reviewDetails.email}`);

            fetch("https://api.cloudinary.com/v1_1/venture-assembly/raw/upload", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    // console.log(`success: ${JSON.stringify(json)}`)
                    // stripeCheckout()
                    setReviewDetails({...reviewDetails, pitchDeckUrl: json.url})
                    setStepNumber(stepNumber + 1)
                }).catch(err => {
                    console.log("fail")
                    throw new Error(err);
                });

        } else {
            console.log("not valid")
        }
    }

    const persistRoundToDB = (calendlyEventUri, calendlyInviteeUri) => {
        setIsBookingSuccess(true)

        pitchDeckReviewApi.post("create", {
            ...reviewDetails,
            calendlyEventUri: calendlyEventUri,
            calendlyInviteeUri: calendlyInviteeUri
        }).then((result) => {
            // console.log(result)
        }).catch((err: Error) => {
            console.log(err)
        })
    }

    // const stripeCheckout = async () => {
    //     const stripe = await stripePromise;
    //     const response = await fetch("/stripe/create-checkout-session", {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(reviewDetails),
    //     });
    //     const session = await response.json();
    //     // When the customer clicks on the button, redirect them to Checkout.
    //     const result = await stripe!.redirectToCheckout({
    //         sessionId: session.id,
    //     });
    //     if (result.error) {
    //         // If `redirectToCheckout` fails due to a browser or network
    //         // error, display the localized error message to your customer
    //         // using `result.error.message`.
    //     }
    // }

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="pitch-deck-review-dialog"
        >
            <DialogTitle id="form-dialog-title">Pitch Deck Review.</DialogTitle>
            <DialogContent>
                <div className="step">
                    Step {stepNumber} of 2
                </div>

                {stepNumber === 1 ?
                    <>
                        <div className="intro-text">
                            To book your pitch deck review session, first enter some basic information about you and your company and upload your deck.
                        </div>
                        <div className="inputs-wrapper">
                            <div className="field-wrapper">
                                <TextField
                                    id="name"
                                    name="name"
                                    className=""
                                    label="Your Name"
                                    variant="outlined"
                                    value={reviewDetails.name}
                                    onChange={(event) => setReviewDetails({ ...reviewDetails, name: event.target.value })}
                                    required
                                    fullWidth
                                    error={!pitchDeckReviewValidation.getValidation("name").isValid}
                                    helperText={!pitchDeckReviewValidation.getValidation("name").isValid && pitchDeckReviewValidation.getValidation("name").validationMessage}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    id="companyName"
                                    name="companyName"
                                    className=""
                                    label="Your Company's Name"
                                    variant="outlined"
                                    value={reviewDetails.companyName}
                                    onChange={(event) => setReviewDetails({ ...reviewDetails, companyName: event.target.value })}
                                    required
                                    fullWidth
                                    error={!pitchDeckReviewValidation.getValidation("companyName").isValid}
                                    helperText={!pitchDeckReviewValidation.getValidation("companyName").isValid && pitchDeckReviewValidation.getValidation("companyName").validationMessage}
                                />
                            </div>
                            <div className="field-wrapper">
                                <TextField
                                    id="email"
                                    name="email"
                                    className=""
                                    label="Your Email Address"
                                    variant="outlined"
                                    value={reviewDetails.email}
                                    onChange={(event) => setReviewDetails({ ...reviewDetails, email: event.target.value })}
                                    required
                                    fullWidth
                                    error={!pitchDeckReviewValidation.getValidation("email").isValid}
                                    helperText={!pitchDeckReviewValidation.getValidation("email").isValid && pitchDeckReviewValidation.getValidation("email").validationMessage}
                                />
                            </div>
                            <div className="field-wrapper" onClick={() => inputFile.current.click()}>
                                <input
                                    accept=".pdf"
                                    style={{ display: 'none' }}
                                    type="file"
                                    onChange={(event) => {
                                        if (!event.target.files) return
                                        setReviewDetails({ ...reviewDetails, pitchDeckFile: event.target.files[0] })
                                    }}
                                    ref={inputFile}
                                />

                                <TextField
                                    label="Your Pitch Deck (pdf only)"
                                    variant="outlined"
                                    defaultValue="Select a File"
                                    value={reviewDetails.pitchDeckFile ? reviewDetails.pitchDeckFile.name : "Select a File"}
                                    disabled

                                    required
                                    fullWidth
                                    error={!pitchDeckReviewValidation.getValidation("pitchDeckFile").isValid}
                                    helperText={!pitchDeckReviewValidation.getValidation("pitchDeckFile").isValid && pitchDeckReviewValidation.getValidation("pitchDeckFile").validationMessage}
                                />

                            </div>

                            <TextField
                                id="message"
                                name="message"
                                className=""
                                label="Anything you would like us to know"
                                variant="outlined"
                                value={reviewDetails.message}
                                onChange={(event) => setReviewDetails({ ...reviewDetails, message: event.target.value })}
                                fullWidth
                                multiline
                                rows={5}
                                rowsMax={5}
                            // error={!pitchDeckReviewValidation.getValidation("message").isValid}
                            // helperText={!pitchDeckReviewValidation.getValidation("message").isValid && pitchDeckReviewValidation.getValidation("message").validationMessage}
                            />
                        </div>


                        <div className="ts-and-cs-wrapper">
                            {!pitchDeckReviewValidation.getValidation("isTermsAgreed").isValid &&
                                <FormHelperText className="ts-and-cs-error">{pitchDeckReviewValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText>
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
                            name={reviewDetails.name}
                            companyName={reviewDetails.companyName}
                            email={reviewDetails.email}
                            eventType="Pitch Deck Review"
                            calendlySrc={`${process.env.REACT_APP_CALENDLY_PICTCH_DECK_REVIEW_URL}?embed_domain=https://www.ventureassembly.co&embed_type=Inline&name=${encodeURI(reviewDetails.name)}&email=${encodeURI(reviewDetails.email)}`}
                            // setCalendlyEventDetails={updateCalendlyEventDetails}
                            onBookingSuccess={persistRoundToDB}
                        />
                    </>
                }





            </DialogContent>
            {/* <DialogActions>
                <Button onClick={() => props.handleClose(false)} >
                    Cancel
                </Button>
                <Button onClick={() => submit()} className="va-button">
                    Proceed to Secure Payment
                </Button>
            </DialogActions> */}
            {stepNumber === 1 ?
                <DialogActions>
                    {!pitchDeckReviewValidation.isValidationPassed && <span className="validation-text">Errors highlighted in form - please resolve.</span>}
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

export default PitchDeckReviewDialog