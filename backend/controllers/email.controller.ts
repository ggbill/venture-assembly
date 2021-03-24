const sgMail = require('@sendgrid/mail')
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export namespace EmailController {

    
    export async function SendFaasEnquiryNotificationEmail(enquiry: any): Promise<any> {

        // console.log(JSON.stringify(enquiry))
        let html = `
        <table style="width: 500px">
            <tr> 
             <td style="width: 50%, font-weight: bold"> Name </td>
                <td style="width: 50%"> ${enquiry.name} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Company Name </td>
                <td style="width: 50%"> ${enquiry.companyName} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Email </td>
                <td style="width: 50%"> ${enquiry.email} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Package </td>
                <td style="width: 50%"> ${enquiry.package} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Comment </td>
                <td style="width: 50%"> ${enquiry.message} </td>
            </tr>
        </table>`
        
        return new Promise((resolve: (result) => void, reject: (error: Error) => void) => {
            let msg = {
                to: ["bill@ventureassembly.co", "ed@ventureassembly.co"],
                from: process.env.SENDGRID_VERIFIED_EMAIL,
                subject: "Founder as a Service Enquiry Submitted",
                text: `Founder as a service enquiry submitted.`,
                html: html
            }

            sgMail.send(msg).then(() => {
                resolve(`email sent.`)
            }).catch((error) => {
                reject(error)
            })
        });
    }

    export async function SendPitchDeckReviewConfirmationEmail(reviewDetails: any): Promise<any> {

        // console.log(JSON.stringify(enquiry))
        let html = `
        <table style="width: 500px">
            <tr> 
             <td style="width: 50%, font-weight: bold"> Name </td>
                <td style="width: 50%"> ${reviewDetails.name} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Company Name </td>
                <td style="width: 50%"> ${reviewDetails.companyName} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Email </td>
                <td style="width: 50%"> ${reviewDetails.email} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Pitch Deck Url </td>
                <td style="width: 50%"> ${reviewDetails.pitchDeckUrl} </td>
            </tr>
            <tr> 
                <td style="width: 50%, font-weight: bold"> Message </td>
                <td style="width: 50%"> ${reviewDetails.message} </td>
            </tr>
        </table>`
        
        return new Promise((resolve: (result) => void, reject: (error: Error) => void) => {
            let msg = {
                to: ["bill@ventureassembly.co", "ed@ventureassembly.co"],
                from: process.env.SENDGRID_VERIFIED_EMAIL,
                subject: "Pitch Deck Review Requested",
                text: `Pitch Deck Review Requested.`,
                html: html
            }

            sgMail.send(msg).then(() => {
                resolve(`email sent.`)
            }).catch((error) => {
                reject(error)
            })
        });
    }
}