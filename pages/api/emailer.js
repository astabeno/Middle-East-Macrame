import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
   service: 'yahoo',
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
   },
   host: 'smtp.mail.yahoo.com',
   port: 465,
   secure: true,
})

export default async (req, res) => {
   const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      ...req.body,
   }
   console.log(req.body)
   transporter.verify(function (error, success) {
      if (error) {
         console.log(error)
      } else {
         console.log('Server is ready to take our messages')
      }
   })

   try {
      // Send the email
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Email sent successfully' })
   } catch (error) {
      res.status(500).json({ error: 'Failed to send email' })
   }
}
