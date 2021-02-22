import { useState } from "react";

const usePdfPurchaseValidation = () => {
    const [validationObject, setValidationObject] = useState<App.ValidationObject[]>([
        { name: "name", isValid: true, validationMessage: "" },
        { name: "email", isValid: true, validationMessage: "" },
        { name: "phone", isValid: true, validationMessage: "" },
        { name: "companyName", isValid: true, validationMessage: "" },
        { name: "isTermsAgreed", isValid: true, validationMessage: "" },
    ])
    const [isValidationPassed, setIsValidationPassed] = useState<boolean>(false)

    const generateInitialValidationObject = (): void => {

        let tempValidationObject: App.ValidationObject[] = [
            { name: "name", isValid: true, validationMessage: "" },
            { name: "email", isValid: true, validationMessage: "" },
            { name: "phone", isValid: true, validationMessage: "" },
            { name: "companyName", isValid: true, validationMessage: "" },
            { name: "isTermsAgreed", isValid: true, validationMessage: "" },
        ]

        setValidationObject(tempValidationObject)

    }

    const validateInputs = (roundDetails: App.RoundDetails, isTermsAgreed: boolean): boolean => {

        let tempValidationObject: App.ValidationObject[] = [
            { name: "name", isValid: true, validationMessage: "" },
            { name: "email", isValid: true, validationMessage: "" },
            { name: "phone", isValid: true, validationMessage: "" },
            { name: "companyName", isValid: true, validationMessage: "" },
            { name: "isTermsAgreed", isValid: true, validationMessage: "" },
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

        if (roundDetails.name === "" || typeof (roundDetails.name) === "undefined") {
            setFailedValidation("name", "Please enter your name.")
        }

        if (!isTermsAgreed) {
            setFailedValidation("isTermsAgreed", "You must agree to continue.")
        }

        if (roundDetails.email === "" || typeof (roundDetails.email) === "undefined") {
            setFailedValidation("email", "Please enter your email address.")
        } else {
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(roundDetails.email)) {
            } else {
                setFailedValidation("email", "Invalid email address.")
            }
        }

        if (roundDetails.phone === "" || typeof (roundDetails.phone) === "undefined") {
            setFailedValidation("phone", "Please enter your phone number.")
        } else {

            let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
            let number;

            try {
                if (roundDetails.phone.substring(0, 3) === "+44") {
                    number = phoneUtil.parseAndKeepRawInput(roundDetails.phone);
                } else if (roundDetails.phone.substring(0, 4) === "0044") {
                    var updatedNumber = `+44 ${roundDetails.phone.substring(4, roundDetails.phone.length)}`
                    number = phoneUtil.parseAndKeepRawInput(updatedNumber);
                } else {
                    number = phoneUtil.parseAndKeepRawInput(`+44 ${roundDetails.phone}`);
                }

                if (!phoneUtil.isValidNumber(number)) {
                    setFailedValidation("phone", "Invalid UK phone number")
                }

            }
            catch (err) {
                setFailedValidation("phone", "Invalid UK phone number")
            }
        }

        if (roundDetails.companyName === "" || typeof (roundDetails.companyName) === "undefined") {
            setFailedValidation("companyName", "Please enter a company name.")
        }
        
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

export default usePdfPurchaseValidation