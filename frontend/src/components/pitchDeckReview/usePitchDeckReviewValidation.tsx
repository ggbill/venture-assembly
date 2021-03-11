import { useState } from "react";

const useBookingValidation = () => {
    const [validationObject, setValidationObject] = useState<App.ValidationObject[]>([
        { name: "name", isValid: true, validationMessage: "" },
        { name: "companyName", isValid: true, validationMessage: "" },
        { name: "email", isValid: true, validationMessage: "" },
        { name: "pitchDeckFile", isValid: true, validationMessage: "" },
        // { name: "message", isValid: true, validationMessage: "" },
    ])
    const [isValidationPassed, setIsValidationPassed] = useState<boolean>(true)

    const generateInitialValidationObject = (): void => {

        let tempValidationObject: App.ValidationObject[] = [
            { name: "name", isValid: true, validationMessage: "" },
            { name: "companyName", isValid: true, validationMessage: "" },
            { name: "email", isValid: true, validationMessage: "" },
            { name: "pitchDeckFile", isValid: true, validationMessage: "" },
            // { name: "message", isValid: true, validationMessage: "" },
        ]

        setValidationObject(tempValidationObject)

    }

    const validateInputs = (reviewDetails): boolean => {

        let tempValidationObject: App.ValidationObject[] = [
            { name: "name", isValid: true, validationMessage: "" },
            { name: "companyName", isValid: true, validationMessage: "" },
            { name: "email", isValid: true, validationMessage: "" },
            { name: "pitchDeckFile", isValid: true, validationMessage: "" },
            // { name: "message", isValid: true, validationMessage: "" },
        ]

        let tempIsValidationPassed = true

        const setFailedValidation = (name, message) => {
            tempIsValidationPassed = false
            tempValidationObject.forEach(element => {
                if (element.name === name) {
                    element.isValid = false
                    element.validationMessage = message
                }
            });
        }

        if (reviewDetails.name === "" || typeof (reviewDetails.name) === "undefined") {
            setFailedValidation("name", "Please enter your name.")
        }

        if (reviewDetails.companyName === "" || typeof (reviewDetails.companyName) === "undefined") {
            setFailedValidation("companyName", "Please enter your company name.")
        }

        if (reviewDetails.email === "" || typeof (reviewDetails.email) === "undefined") {
            setFailedValidation("email", "Please enter your email address.")
        } else {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(reviewDetails.email)) {
            } else {
                setFailedValidation("email", "Invalid email address.")
            }
        }

        if (!reviewDetails.pitchDeckFile || !reviewDetails.pitchDeckFile.name){
            setFailedValidation("pitchDeckFile", "Please upload your pitch deck.")
        }else{
            if (reviewDetails.pitchDeckFile.type !== "application/pdf"){
                setFailedValidation("pitchDeckFile", "We only accept pitch decks in PDF format.")
            }
        }

        // if (reviewDetails.message === "" || typeof (reviewDetails.message) === "undefined") {
        //     setFailedValidation("message", "Please enter a message.")
        // }
        
        // console.log(tempValidationObject)
        setValidationObject(tempValidationObject)
        setIsValidationPassed(tempIsValidationPassed)
        return tempIsValidationPassed
    }

    const getValidation = (name): App.ValidationObject => {
        let returnValue: App.ValidationObject = {} as App.ValidationObject
        validationObject.forEach(element => {
            if (name === element.name) {
                returnValue = element
            }
        });
        return returnValue
    }


    return {
        validationObject,
        setValidationObject,
        isValidationPassed,
        setIsValidationPassed,
        validateInputs,
        getValidation,
        generateInitialValidationObject
    }

}

export default useBookingValidation