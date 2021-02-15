import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, ListItem, Select, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import './pitchDeckBookingDialog.scss'
import useBookingValidation from './useBookingValidation'

interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
}

const PitchDeckBookingDialog = (props: InputProps) => {
    const [booking, setBooking] = useState<App.Booking>({ name: "", email: "", message: "", pdfBlob: null })
    const bookingValidation = useBookingValidation()

    const sendEnquiry = () => {
        if (bookingValidation.validateInputs(booking)) {
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
                    value={booking.name}
                    onChange={(event) => setBooking({ ...booking, name: event.target.value })}
                    required
                    fullWidth
                    error={!bookingValidation.getValidation("name").isValid}
                    helperText={!bookingValidation.getValidation("name").isValid && bookingValidation.getValidation("name").validationMessage}
                />
                <TextField
                    id="email"
                    name="email"
                    className=""
                    label="Your Email Address"
                    variant="outlined"
                    value={booking.email}
                    onChange={(event) => setBooking({ ...booking, email: event.target.value })}
                    required
                    fullWidth
                    error={!bookingValidation.getValidation("email").isValid}
                    helperText={!bookingValidation.getValidation("email").isValid && bookingValidation.getValidation("email").validationMessage}
                />
                <TextField
                    id="message"
                    name="message"
                    className=""
                    label="Message"
                    variant="outlined"
                    value={booking.message}
                    onChange={(event) => setBooking({ ...booking, message: event.target.value })}
                    required
                    fullWidth
                    multiline
                    rows={5}
                    rowsMax={5}
                    error={!bookingValidation.getValidation("message").isValid}
                    helperText={!bookingValidation.getValidation("message").isValid && bookingValidation.getValidation("message").validationMessage}
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

export default PitchDeckBookingDialog