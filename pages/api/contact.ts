// Basic imports
import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

// Types
import type { NextApiRequest, NextApiResponse } from "next"

const ContactHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const trasporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST!,
    port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL!,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD!
    },
    secure: true
  } as SMTPTransport.Options)

  const mailData = {
    from: process.env.NEXT_PUBLIC_EMAIL,
    to: "kitanoyoru@protonmail.com",
    subject: req.body.subject,
    text: req.body.content + "| Sent from: " + req.body.email,
    html: `<div>${req.body.content}</div><p>Sent from: ${req.body.email}</p>`
  }

  trasporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ type: "Error" })
    } else {
      console.log(info)
      return res.status(200).send({ type: "Success" })
    }
  })
}

export default ContactHandler
