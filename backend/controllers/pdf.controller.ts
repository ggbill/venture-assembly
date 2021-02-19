const PDFDocument = require('pdfkit');
var fs = require('fs');


export namespace PDFController {
    export function CreateRoundPlannerPdf(payload: any): any {
        console.log("CreateRoundPlannerPdf")
        const doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('C:/tmp/file.pdf'));
        
        doc.text('Hello world!')

        doc.image(payload.image, 0, 15, {width: 300})


        doc.end();
        
    }
}