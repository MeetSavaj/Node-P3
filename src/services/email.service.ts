"use strict";

const nodemailer = require("nodemailer");
const ejs = require('ejs');


export class MailService {

    sendMail = async (req: any, res: any) => {

        //   let testAccount = await nodemailer.createTestAccount();

        const transporter = await nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            // host: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            // port: 587,
            auth: {
                // user: 'nicholas.olson@ethereal.email',
                // pass: 'C8ftMg5W2qaJE3T8rQ'

                user: 'savajmeet@gmail.com',
                pass: 'jmmhefjpchsasblv'
            }
        });


        // let info = await transporter.sendMail({
        //     from: '"Meet Savaj" <nicholas.olson@ethereal.email>',
        //     to: "nicholas.olson@ethereal.email", 
        //     subject: "Learning Nodemailer", 
        //     text: "Sending mail through nodemailer", 
        //     html: "<b>Sending mail through nodemailer</b>", 
        // });

        // console.log("Message sent: %s", info.messageId);

        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        const receiver = 'Strong Leader Boisss';

        const content = 'Guys, have you decided to bought cake on tomorrow.....??!!!';

        await ejs.renderFile("src/templates/welcome.ejs", { receiver: receiver, content: content }, (err: any, data: any) => {
            if (err) {
                console.log(err);
            } else {
                var mailOptions = {
                    // from: '"Meet Savaj" <nicholas.olson@ethereal.email>',
                    from: "savajmeet@gmail.com",
                    to: "savajmeet10@gmail.com",
                    subject: "Bday",
                    html: data
                };

                transporter.sendMail(mailOptions, (error: any, info: any) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);

                    res.send(info);
                });
            }
        });
    }

}




