import * as mongoose from 'mongoose'
import { Schema, Document } from 'mongoose';

export interface IFaasEnquiry extends Document {
    name: string,
    email: string,
    companyName: string,
    message: string,
    package: string,
    date: Date
}

const FaasEnquirySchema: Schema = new Schema({
    name: { type: String },
    email: { type: String },
    companyName: { type: String },
    message: { type: String },
    package: { type: String },
    date: {type: Date}
});

export default mongoose.model<IFaasEnquiry>('FaasEnquiry', FaasEnquirySchema);