const pdf = require('html-pdf');
import fs from 'fs'

export class PdfService {

    getPdf(req: any, res: any) {

        let options = { format: 'A4' };

        let html = fs.readFileSync('D:/Vrutti Tech/Practice Projects/Node-P3/src/files/index.html', 'utf8');

        pdf.create(html, options).toStream(function (err: any, stream: any) {

            stream.pipe(res);

            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

        });

        res.status(200);
    }

}

