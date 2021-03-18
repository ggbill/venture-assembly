var mongoose = require('mongoose');

import FaasEnquiry, { IFaasEnquiry } from '../models/faasEnquiry.model';
import { EmailController } from './email.controller';

export namespace FaasController {
    export async function CreateFaasEnquiry(faasEnquiry: any): Promise<IFaasEnquiry> {
        return new Promise((resolve: (result) => void, reject: (error: Error) => void) => {
            FaasEnquiry.create({
                name: faasEnquiry.name,
                email: faasEnquiry.email,
                companyName: faasEnquiry.companyName,
                message: faasEnquiry.message,
                package: faasEnquiry.package,
                date: new Date()
            }, function (err, result) {      
                if (err) {
                    console.error("Error: " + err);
                    reject(err)
                }

                EmailController.SendFaasEnquiryNotificationEmail(faasEnquiry).then(res => {
                    resolve(res);
                }).catch(err => {
                    console.log(`ERROR ${err}`)
                });;



                // resolve(result);

            })
        });
    }
}