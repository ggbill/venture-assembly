import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import './pdfDownloadDialog.scss'
// import usePdfPurchaseValidation from './usePdfDownloadValidation';

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_IUtytCqkv6fvF1xxCSdFkaXf");

interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
    roundDetails: App.RoundDetails
    radarChartBase64String: string
}

const PdfDowloadDialog = (props: InputProps) => {

    // const [pdfPurchaseObject, setPdfPurchaseObject] = useState<App.PDFPurchase>({} as App.PDFPurchase);
    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(false);


    // const pdfPurchaseValidation = usePdfPurchaseValidation()

    // const handleClick = async (event) => {
    //     pdfPurchaseObject.roundDetails = props.roundDetails
    //     pdfPurchaseObject.radarBase64String = props.radarChartBase64String
        
    //     if (pdfPurchaseValidation.validateInputs(pdfPurchaseObject, isAgreedTerms)) {
    //         const stripe = await stripePromise;
    //         const response = await fetch("/stripe/create-checkout-session", {
    //             method: "POST",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //               },
    //             body: JSON.stringify(pdfPurchaseObject),
    //         });
    //         const session = await response.json();
    //         // When the customer clicks on the button, redirect them to Checkout.
    //         const result = await stripe!.redirectToCheckout({
    //             sessionId: session.id,
    //         });
    //         if (result.error) {
    //             // If `redirectToCheckout` fails due to a browser or network
    //             // error, display the localized error message to your customer
    //             // using `result.error.message`.
    //         }
    //     } else {
    //         console.log("not valid")
    //     }
    // };

    useEffect(() => {

        if (props.isDialogOpen){
            // console.log(props.radarChartBase64String)
        }
        
       
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [props.isDialogOpen]);

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="pdf-purchase-dialog"
        >
            <DialogTitle id="form-dialog-title">Download Round Planner Pack - Free!</DialogTitle>

            <DialogContent>
                <div className="intro-text">
                    Thanks for your interest in purchasing a Round Planner Pack.
                    Please enter some basic information below before proceeding to the secure payment page.
                    Once the purchase is complete the pack will be sent to your email address (entered on the next page).
                </div>

                <div className="inputs-wrapper">
                    <TextField
                        id="name"
                        name="name"
                        className=""
                        label="Your Name"
                        variant="outlined"
                        // value={pdfPurchaseObject.name}
                        // onChange={(event) => setPdfPurchaseObject({ ...pdfPurchaseObject, name: event.target.value })}
                        required
                        fullWidth
                        // error={!pdfPurchaseValidation.getValidation("name").isValid}
                        // helperText={!pdfPurchaseValidation.getValidation("name").isValid && pdfPurchaseValidation.getValidation("name").validationMessage}
                    />
                    {/* <TextField
                    id="email"
                    name="email"
                    className=""
                    label="Your Email Address"
                    variant="outlined"
                    value={pdfPurchaseObject.email}
                    onChange={(event) => setPdfPurchaseObject({ ...pdfPurchaseObject, email: event.target.value })}
                    required
                    fullWidth
                error={!pdfPurchaseValidation.getValidation("name").isValid}
                helperText={!pdfPurchaseValidation.getValidation("name").isValid && pdfPurchaseValidation.getValidation("name").validationMessage}
                /> */}

                    <TextField
                        id="companyName"
                        name="companyName"
                        className=""
                        label="Your Company's Name"
                        variant="outlined"
                        // value={pdfPurchaseObject.companyName}
                        // onChange={(event) => setPdfPurchaseObject({ ...pdfPurchaseObject, companyName: event.target.value })}
                        required
                        fullWidth
                        // error={!pdfPurchaseValidation.getValidation("companyName").isValid}
                        // helperText={!pdfPurchaseValidation.getValidation("companyName").isValid && pdfPurchaseValidation.getValidation("companyName").validationMessage}
                    />
                    {/* <TextField
                        id="companyWebsite"
                        name="companyWebsite"
                        className=""
                        label="Your Company's Website"
                        variant="outlined"
                        value={pdfPurchaseObject.companyWebsite}
                        onChange={(event) => setPdfPurchaseObject({ ...pdfPurchaseObject, companyWebsite: event.target.value })}
                        fullWidth
                    /> */}
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
                {/* {!pdfPurchaseValidation.getValidation("isTermsAgreed").isValid &&
                    <FormHelperText className="ts-and-cs-error">{pdfPurchaseValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText> */}
                {/* } */}



            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose(false)} >
                    Cancel
                    </Button>
                <Button id="submit" className="va-button" >
                    Proceed to Checkout
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default PdfDowloadDialog