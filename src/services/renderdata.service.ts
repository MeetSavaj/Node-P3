const nodemailer = require("nodemailer");
const ejs = require('ejs');
const pdf = require('html-pdf');
import fs from 'fs'


export class RenderData {

    renderData = async (req: any, res: any) => {

        // const receiver = 'Strong Leader Boisss';
        // const content = 'Guys, have you decided to bought cake on tomorrow.....??!!!';

        const staff = {senior: 'Mr. Shivam Singh', 
        junior: ['Node = Meet Savaj', 'React = Abhishek Kumbhani', 'React = Rashvin Kathiriya', 'Angular = Kapil Amdavadi', 'Python = Sahil Pambhar'],
        image: "https://img.freepik.com/premium-vector/office-daily-routine-business-workers-team_157667-239.jpg"};

        await ejs.renderFile("src/templates/welcome.ejs", { staff: staff }, (err: any, data: any) => {

            if (err) {
                res.send(err);
            } else {
                let options = { format: 'A4' };
        
                pdf.create(data, options).toStream(function (err: any, stream: any) {
        
                    stream.pipe(res);
              
                });

            }

        })
    }

}

