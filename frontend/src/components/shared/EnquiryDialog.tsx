import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, ListItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './enquiryDialog.scss'
import useEnquiryValidation from './useEnquiryValidation'

interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
}

const EnquiryDialog = (props: InputProps) => {
    const [enquiry, setEnquiry] = useState<App.Enquiry>({ name: "", email: "", category: "", message: "" })
    const enquiryValidation = useEnquiryValidation()

    const sendEnquiry = () => {
        if (enquiryValidation.validateInputs(enquiry)) {
            console.log("valid")
        } else {
            console.log("not valid")
        }
    }


    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="enquiry-dialog"
        >
            <DialogTitle id="form-dialog-title">What Would You Like to Talk to Us About?</DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    name="name"
                    className=""
                    label="Your Name"
                    variant="outlined"
                    value={enquiry.name}
                    onChange={(event) => setEnquiry({ ...enquiry, name: event.target.value })}
                    required
                    fullWidth
                    error={!enquiryValidation.getValidation("name").isValid}
                    helperText={!enquiryValidation.getValidation("name").isValid && enquiryValidation.getValidation("name").validationMessage}
                />
                <TextField
                    id="email"
                    name="email"
                    className=""
                    label="Your Email Address"
                    variant="outlined"
                    value={enquiry.email}
                    onChange={(event) => setEnquiry({ ...enquiry, email: event.target.value })}
                    required
                    fullWidth
                    error={!enquiryValidation.getValidation("email").isValid}
                    helperText={!enquiryValidation.getValidation("email").isValid && enquiryValidation.getValidation("email").validationMessage}
                />
                <FormControl
                    variant="outlined"
                    className="margin-right"
                    required
                    fullWidth
                    error={!enquiryValidation.getValidation("category").isValid}
                >
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        name="category"
                        onChange={(event) => setEnquiry({ ...enquiry, category: String(event.target.value) })}
                        value={enquiry.category}
                        label="Category"
                    >
                        <ListItem value={"B2B"}>B2B</ListItem>
                        <ListItem value={"B2C"}>B2C</ListItem>
                        <ListItem value={"Both"}>Both</ListItem>
                    </Select>
                    {!enquiryValidation.getValidation("category").isValid && <FormHelperText>{enquiryValidation.getValidation("category").validationMessage}</FormHelperText>}
                </FormControl>
                <TextField
                    id="message"
                    name="message"
                    className=""
                    label="Message"
                    variant="outlined"
                    value={enquiry.message}
                    onChange={(event) => setEnquiry({ ...enquiry, message: event.target.value })}
                    required
                    fullWidth
                    multiline
                    rows={5}
                    rowsMax={5}
                    error={!enquiryValidation.getValidation("message").isValid}
                    helperText={!enquiryValidation.getValidation("message").isValid && enquiryValidation.getValidation("message").validationMessage}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleClose(false)} >
                    Cancel
                    </Button>
                <Button onClick={() => sendEnquiry()} className="va-button">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EnquiryDialog