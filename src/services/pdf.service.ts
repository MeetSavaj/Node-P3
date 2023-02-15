var pdf = require('html-pdf');
import fs from 'fs'

export class PdfService {

    getPdf(req: any, res: any) {

        let options = { format: 'A4' };

        let html = fs.readFileSync('D:/Vrutti Tech/Practice Projects/Node-P3/src/files/index.html', 'utf8');

        pdf.create(html, options).toStream(function(err: any, stream: any){;
            stream.pipe(res)
          });

        //   pdf.create(html, options).toFile('x.pdf', function(err:any, res:any){
        //     console.log(res.filename);
        //   });

        res.status(200);
    }

}

