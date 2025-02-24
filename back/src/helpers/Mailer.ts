import nodemailer from 'nodemailer'

export class Mailer {
    private static instance: nodemailer.Transporter

    public static getInstance(): nodemailer.Transporter {
        if (!Mailer.instance) {
            Mailer.instance = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_APP_KEY,
                },
            })
        }
        return Mailer.instance
    }
}
