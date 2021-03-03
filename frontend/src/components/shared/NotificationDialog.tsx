import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import './notificationDialog.scss'

interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
    type: string,
    title: string,
    message: string
    isShowDonateButton: boolean
}

const NotificationDialog = (props: InputProps) => {

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            className="notification-dialog"
        >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <span>{props.message}</span>
                {props.isShowDonateButton &&
                    <a href="https://www.buymeacoffee.com/ventureassembly" target="_blank" rel="noreferrer"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{ height: 46, width: 158 }} /></a>
                }
            </DialogContent>
            <DialogActions>
                {props.type === "AREYOUSURE" && <Button onClick={() => props.handleClose(false)} >
                    Cancel
                    </Button>}
                <Button onClick={() => props.handleClose(true)} className="va-button">
                    Ok
                    </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NotificationDialog