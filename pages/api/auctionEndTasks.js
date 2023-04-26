import nodemailer from 'nodemailer'
import cron from 'node-cron'
import { getPiecesCollection } from '../../utils/firebase.utils'

// Define cron job to run every minute
cron.schedule('* * * * *', async () => {
   try {
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

      const pieces = await getPiecesCollection() // Fetch the pieces collection from Firebase

      // Loop through the pieces collection and schedule email sending for each piece
      for (const piece of pieces) {
         const { auctionEnd, highestBidder, highestBidderEmail, highestBid } =
            piece

         // Convert auctionEnd date to a JavaScript Date object
         const auctionEndTime = new Date(auctionEnd.seconds * 1000)

         // Check if auctionEnd date is reached
         if (auctionEndTime <= new Date()) {
            // Send email to the highest bidder using Nodemailer
            const mailOptions = {
               from: process.env.EMAIL_ADDRESS,
               to: highestBidderEmail,
               subject: `Auction for ${piece.name} Ended`,
               text: `Congratulations ${piece.highestBidder}! You won the auction the macrame piece '${piece.name}' 
                      with the highest bid of $${highestBid}.`,
            }
            console.log(piece)
            await transporter.sendMail(mailOptions)
         }
      }

      console.log('Cron task executed successfully')
   } catch (error) {
      console.error('Error sending emails:', error)
   }
})

// Start the cron job
cron.start()
