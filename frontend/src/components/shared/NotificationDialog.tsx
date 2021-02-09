import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core"

interface InputProps {
    isDialogOpen: boolean,
    handleClose: (boolean: boolean) => void,
    type: string,
    title: string,
    message: string
}

const NotificationDialog = (props: InputProps) => {

    return (
            <Dialog
                open={props.isDialogOpen}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <span>{props.message}</span>
                </DialogContent>
                <DialogActions>
                    {props.type==="AREYOUSURE" && <Button onClick={() => props.handleClose(false)} >
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