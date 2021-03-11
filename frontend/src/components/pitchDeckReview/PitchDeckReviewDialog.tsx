import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, ListItem, Select, TextField } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import './pitchDeckReviewDialog.scss'
import usePitchDeckReviewValidation from './usePitchDeckReviewValidation'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY || "");

interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
}

const PitchDeckReviewDialog = (props: InputProps) => {
    const [reviewDetails, setReviewDetails] = useState<any>({ name: "", companyName: "", email: "", message: "", pitchDeckFile: {} as File })
    const pitchDeckReviewValidation = usePitchDeckReviewValidation()
    const inputFile: any = useRef(null)

    const submit = () => {
        if (pitchDeckReviewValidation.validateInputs(reviewDetails)) {
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
                    console.log(`success: ${JSON.stringify(json)}`)
                    stripeCheckout()
                }).catch(err => {
                    console.log("fail")
                    throw new Error(err);
                });

        } else {
            console.log("not valid")
        }
    }

    const stripeCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch("/stripe/create-checkout-session", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewDetails),
        });
        const session = await response.json();
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe!.redirectToCheckout({
            sessionId: session.id,
        });
        if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        }
    }

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="pitch-deck-review-dialog"
        >
            <DialogTitle id="form-dialog-title">Pitch Deck Review</DialogTitle>
            <DialogContent>
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
                    {/* <input
                        type="file"
                        onChange={(event) => {
                            if (!event.target.files) return
                            setReviewDetails({ ...reviewDetails, pitchDeckFile: event.target.files[0] })
                        }}
                        accept=".pdf"
                    /> */}

                    {/* <div className={reviewDetails.pitchDeckFile ? "field-wrapper logo-upload image" : "field-wrapper logo-upload no-image"} onClick={() => inputFile.current.click()}> */}
                    <input
                        accept=".pdf"
                        // className={classes.input}
                        style={{ display: 'none' }}
                        // id="raised-button-file"
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
                        // aria-readonly
                        required
                        fullWidth
                        error={!pitchDeckReviewValidation.getValidation("pitchDeckFile").isValid}
                        helperText={!pitchDeckReviewValidation.getValidation("pitchDeckFile").isValid && pitchDeckReviewValidation.getValidation("pitchDeckFile").validationMessage}
                    />
                    {/* </div> */}



                </div>

                <TextField
                    id="message"
                    name="message"
                    className=""
                    label="Message"
                    variant="outlined"
                    value={reviewDetails.message}
                    onChange={(event) => setReviewDetails({ ...reviewDetails, message: event.target.value })}
                    // required
                    fullWidth
                    multiline
                    rows={5}
                    rowsMax={5}
                // error={!pitchDeckReviewValidation.getValidation("message").isValid}
                // helperText={!pitchDeckReviewValidation.getValidation("message").isValid && pitchDeckReviewValidation.getValidation("message").validationMessage}
                />





            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose(false)} >
                    Cancel
                </Button>
                <Button onClick={() => submit()} className="va-button">
                    Proceed to Secure Payment
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PitchDeckReviewDialog