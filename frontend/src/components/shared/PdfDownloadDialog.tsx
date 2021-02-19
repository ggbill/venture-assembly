import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormHelperText, TextField } from '@material-ui/core'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import usePdfGenerator from '../../hooks/usePdfGenerator';
import './pdfDownloadDialog.scss'
import usePdfDownloadValidation from './usePdfDownloadValidation';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ImageCropper from '../imageCropper/ImageCropper';


interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
    roundDetails: App.RoundDetails
    radarChartBase64String: string
}

const PdfDowloadDialog = (props: InputProps) => {

    const [pdfObject, setPdfObject] = useState<App.PdfObject>({
        name: "Bill",
        email: "wohamilton@gmail.com",
        phone: "07123 123456",
        companyName: "BillCo",
        companyIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    } as App.PdfObject);
    const [isAgreedTerms, setIsAgreedTerms] = useState<boolean>(true);
    const [selectedLogoBase64String, setSelectedLogoBase64String] = useState<string>("");
    const [selectedLogo, setSelectedLogo] = useState<any>(null);
    const pdfDownloadValidation = usePdfDownloadValidation()
    const pdfGenerator = usePdfGenerator()


    const generatePdf = () => {
        pdfObject.roundDetails = props.roundDetails
        pdfObject.radarBase64String = props.radarChartBase64String

        if (pdfDownloadValidation.validateInputs(pdfObject, isAgreedTerms)) {
            pdf(pdfGenerator.generateRoundPlannerPdf(pdfObject)).toBlob().then((blob) => {
                saveAs(blob, `${pdfObject.companyName} - Round Planner.pdf`)
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
            reader.addEventListener('load', () =>
                setSelectedLogoBase64String(reader.result)
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

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
                    <div className="field-wrapper">
                        <TextField
                            id="name"
                            name="name"
                            className=""
                            label="Your Name"
                            variant="outlined"
                            value={pdfObject.name}
                            onChange={(event) => setPdfObject({ ...pdfObject, name: event.target.value })}
                            required
                            fullWidth
                            error={!pdfDownloadValidation.getValidation("name").isValid}
                            helperText={!pdfDownloadValidation.getValidation("name").isValid && pdfDownloadValidation.getValidation("name").validationMessage}
                        />
                    </div>
                    <div className="field-wrapper">
                        <TextField
                            id="email"
                            name="email"
                            className=""
                            label="Your Email Address"
                            variant="outlined"
                            value={pdfObject.email}
                            onChange={(event) => setPdfObject({ ...pdfObject, email: event.target.value })}
                            required
                            fullWidth
                            error={!pdfDownloadValidation.getValidation("email").isValid}
                            helperText={!pdfDownloadValidation.getValidation("email").isValid && pdfDownloadValidation.getValidation("email").validationMessage}
                        />
                    </div>
                    <div className="field-wrapper">
                        <TextField
                            id="phone"
                            name="phone"
                            className=""
                            label="Your Phone Number"
                            variant="outlined"
                            value={pdfObject.phone}
                            onChange={(event) => setPdfObject({ ...pdfObject, phone: event.target.value })}
                            required
                            fullWidth
                            error={!pdfDownloadValidation.getValidation("phone").isValid}
                            helperText={!pdfDownloadValidation.getValidation("phone").isValid && pdfDownloadValidation.getValidation("phone").validationMessage}
                        />
                    </div>

                    <div className="field-wrapper">
                        <TextField
                            id="companyName"
                            name="companyName"
                            className=""
                            label={`Your Company's Name (${35 - pdfObject.companyName.length} characters remaining)`}
                            variant="outlined"
                            value={pdfObject.companyName}
                            onChange={(event) => setPdfObject({ ...pdfObject, companyName: event.target.value })}
                            required
                            fullWidth
                            error={!pdfDownloadValidation.getValidation("companyName").isValid}
                            helperText={!pdfDownloadValidation.getValidation("companyName").isValid && pdfDownloadValidation.getValidation("companyName").validationMessage}
                            inputProps={{ maxLength: 35 }}
                        />
                    </div>
                    <div className="field-wrapper">
                        <TextField
                            id="companyWebsite"
                            name="companyWebsite"
                            className=""
                            label="Your Company's Website"
                            variant="outlined"
                            value={pdfObject.companyWebsite}
                            onChange={(event) => setPdfObject({ ...pdfObject, companyWebsite: event.target.value })}
                            fullWidth
                        />
                    </div>
                    {/* <div className="field-wrapper">
                        <TextField
                            id="companylogoUrl"
                            name="companyLogoUrl"
                            className=""
                            label="Your Company's Logo"
                            variant="outlined"
                            value={pdfObject.companyLogoUrl}
                            onChange={(event) => setPdfObject({ ...pdfObject, companyLogoUrl: event.target.value })}
                            fullWidth
                        />
                    </div> */}
                    <div className="field-wrapper" onClick={openFileDialog}>
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
                    <div className="field-wrapper company-intro">
                        <TextField
                            id="companyIntro"
                            name="companyIntro"
                            className=""
                            label={`Short Company Intro (${250 - pdfObject.companyIntro.length} characters remaining)`}
                            variant="outlined"
                            value={pdfObject.companyIntro}
                            onChange={(event) => setPdfObject({ ...pdfObject, companyIntro: event.target.value })}
                            fullWidth
                            multiline
                            rows={8}
                            rowsMax={8}
                            inputProps={{ maxLength: 250 }}
                        />
                    </div>
                    
                    <div className="field-wrapper image-cropper-wrapper">
                        {selectedLogoBase64String &&
                            <ImageCropper src={selectedLogoBase64String} pdfObject={pdfObject} setPdfObject={setPdfObject} />
                        }
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
                {!pdfDownloadValidation.getValidation("isTermsAgreed").isValid &&
                    <FormHelperText className="ts-and-cs-error">{pdfDownloadValidation.getValidation("isTermsAgreed").validationMessage}</FormHelperText>
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose(false)} >
                    Cancel
                </Button>
                <Button id="submit" className="va-button" onClick={generatePdf}>
                    Generate PDF
                </Button>

            </DialogActions>

        </Dialog>
    )
}

export default PdfDowloadDialog