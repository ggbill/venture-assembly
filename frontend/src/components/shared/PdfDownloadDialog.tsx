import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import usePdfGenerator from '../../hooks/usePdfGenerator';
import './pdfDownloadDialog.scss'
import usePdfDownloadValidation from './usePdfDownloadValidation';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ImageCropper from '../imageCropper/ImageCropper';
import useGoogleAnalytics from '../../hooks/useGoogleAnalytics';

interface InputProps {
    isDialogOpen: boolean,
    handleClose: () => void,
    roundDetails: App.RoundDetails
    setRoundDetails: (roundDetails: App.RoundDetails) => void
    setNotificationDialogProperties: (props: any) => void
    // radarChartBase64String: string
    // pdfObject: App.PdfObject
    // setPdfObject: (pdfObject: App.PdfObject) => void
}



const PdfDowloadDialog = (props: InputProps) => {

    // const [pdfObject, setPdfObject] = useState<App.PdfObject>({
    //     name: "Bill",
    //     email: "wohamilton@gmail.com",
    //     phone: "07123 123456",
    //     companyName: "BillCo",
    //     companyIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    // } as App.PdfObject);
    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(false);
    const [selectedLogoBase64String, setSelectedLogoBase64String] = useState<string>("");
    const [selectedLogo, setSelectedLogo] = useState<any>(null);
    const pdfDownloadValidation = usePdfDownloadValidation()
    const pdfGenerator = usePdfGenerator()

    const googleAnalytics = useGoogleAnalytics()


    const generatePdf = () => {
        // pdfObject.roundDetails = props.roundDetails
        // pdfObject.radarBase64String = props.radarChartBase64String


        if (pdfDownloadValidation.validateInputs(props.roundDetails, isAgreedTerms)) {
            googleAnalytics.trackButtonClick(`Generate PDF - ${props.roundDetails.companyName}`)

            pdf(pdfGenerator.generateRoundPlannerPdf(props.roundDetails)).toBlob().then((blob) => {
                saveAs(blob, `${props.roundDetails.companyName} - Round Planner.pdf`)
                props.handleClose()
                props.setNotificationDialogProperties({
                    isOpen: true,
                    type: "NOTIFICATION",
                    title: "🎉 Your PDF was downloaded successfully!",
                    message: `Feel free to tweak your settings and download as many times as is required.
                    If you are enjoying this tool, please use the button below to support us to keep improving our service!`,
                    isShowDonateButton: true
                })
            })
        }
    };

    const inputFile: any = useRef(null)

    const openFileDialog = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    }

    const uploadFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedLogo(e.target.files[0])
            const reader: any = new FileReader();
            reader.addEventListener('load', () => {
                props.setRoundDetails({ ...props.roundDetails, companyLogoBase64String: reader.result })
                setSelectedLogoBase64String(reader.result)
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // useEffect(() => {
    //     // console.log(props.pdfradarChartBase64String)
    //     console.log(props.roundDetails)
    //     props.setRoundDetails({ ...props.roundDetails, roundDetails: props.roundDetails })

    //     // eslint-disable-next-line react-hooks/exhaustive-deps  
    // }, []);

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="pdf-purchase-dialog"
        >
            <DialogTitle id="form-dialog-title">Download Round Planner PDF - Free!</DialogTitle>

            <DialogContent>
                <div className="intro-text">
                    To download your bespoke Round Planner PDF simply enter the information below and click 'GENERATE PDF'. This information will be use to populate
                    your pdf so feel free to tweak the data and regenerate as many times as you need.
                </div>

                <div className="inputs-wrapper">
                    <div className="field-wrapper name">
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
                            error={!pdfDownloadValidation.getValidation("name").isValid}
                            helperText={!pdfDownloadValidation.getValidation("name").isValid && pdfDownloadValidation.getValidation("name").validationMessage}
                        />
                    </div>
                    <div className="field-wrapper email">
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
                            error={!pdfDownloadValidation.getValidation("email").isValid}
                            helperText={!pdfDownloadValidation.getValidation("email").isValid && pdfDownloadValidation.getValidation("email").validationMessage}
                        />
                    </div>

                    <div className="field-wrapper companyName">
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
                            error={!pdfDownloadValidation.getValidation("companyName").isValid}
                            helperText={pdfDownloadValidation.getValidation("companyName").isValid ?
                                `${28 - props.roundDetails.companyName.length} characters remaining`
                                :
                                `${pdfDownloadValidation.getValidation("companyName").validationMessage} (${28 - props.roundDetails.companyName.length} characters remaining)`
                            }
                            inputProps={{ maxLength: 28 }}
                        />
                    </div>

                    <div className="field-wrapper phone">
                        <TextField
                            id="phone"
                            name="phone"
                            className=""
                            label="Your Phone Number"
                            variant="outlined"
                            value={props.roundDetails.phone}
                            onChange={(event) => props.setRoundDetails({ ...props.roundDetails, phone: event.target.value })}
                            // required
                            fullWidth
                            error={!pdfDownloadValidation.getValidation("phone").isValid}
                            helperText={!pdfDownloadValidation.getValidation("phone").isValid && pdfDownloadValidation.getValidation("phone").validationMessage}
                        />
                    </div>


                    <div className="field-wrapper companyWebsite">
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

                    <div className={selectedLogo ? "field-wrapper logo-upload image" : "field-wrapper logo-upload no-image"} onClick={openFileDialog}>
                        <input
                            accept="image/*"
                            // className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(event) => uploadFile(event)}
                            ref={inputFile}
                        />

                        <TextField
                            label="Your Company's Logo"
                            variant="outlined"
                            value={selectedLogo ? selectedLogo.name : "Select an image"}
                            disabled
                            fullWidth
                        />
                    </div>
                    <div className={selectedLogo ? "field-wrapper company-intro image" : "field-wrapper company-intro no-image"}>
                        <TextField
                            id="companyIntro"
                            name="companyIntro"
                            className=""
                            label={`Short Company Intro (${250 - props.roundDetails.companyIntro.length} characters remaining)`}
                            variant="outlined"
                            value={props.roundDetails.companyIntro}
                            onChange={(event) => props.setRoundDetails({ ...props.roundDetails, companyIntro: event.target.value })}
                            fullWidth
                            multiline
                            rows={8}
                            rowsMax={8}
                            inputProps={{ maxLength: 250 }}
                            helperText={`${250 - props.roundDetails.companyIntro.length} characters remaining`}
                        />
                    </div>

                    <div className="field-wrapper image-cropper-wrapper">
                        {selectedLogoBase64String ?
                            <div className="cropper-wrapper">
                                <ImageCropper src={selectedLogoBase64String} roundDetails={props.roundDetails} setRoundDetails={props.setRoundDetails} />
                                <div className="helper-text">
                                    Scroll on the image to zoom in or out
                                </div>
                            </div>
                            // <ImageCropper src={selectedLogoBase64String} pdfObject={pdfObject} setPdfObject={setPdfObject} />
                            :
                            <div className="select-image-placeholder">Please select a logo file above</div>
                        }
                    </div>
                </div>



                {!pdfDownloadValidation.getValidation("isTermsAgreed").isValid &&
                    <FormHelperText className="ts-and-cs-error">{pdfDownloadValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText>
                }
                <FormControlLabel
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


                {/* here: {JSON.stringify(props.roundDetails.radarBase64String)} */}
                {/* <img style={{width: 200, height:200}} src={props.roundDetails.radarBase64String}/> */}

            </DialogContent>
            <DialogActions>
                {!pdfDownloadValidation.isValidationPassed && <span className="validation-text">Errors highlighted in form - please resolve.</span>}
                <div className="button-wrapper">
                    <Button className="va-button cancel" onClick={() => props.handleClose()} >
                        Cancel
                    </Button>
                    <Button id="submit" className="va-button confirm" onClick={generatePdf}>
                        Generate PDF
                    </Button>
                </div>
            </DialogActions>

        </Dialog>
    )
}

export default PdfDowloadDialog