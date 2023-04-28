import nodemailer from 'nodemailer'
import cron from 'node-cron'
import {
   getPiecesCollection,
   addNotification,
   pieceAuctionEnd,
   signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase.utils'
import firebaseAdmin from '../../utils/firbase.admin'

const firebaseAdminUser = process.env.FIREBASE_ADMIN_USER
const firebaseAdminPassword = process.env.FIREBASE_ADMIN_PASSWORD
let authToken = {}

// Define cron job to run every minute
const cronJob = cron.schedule('* * * * *', async () => {
   let transporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
         user: process.env.EMAIL_ADDRESS,
         pass: process.env.PASSWORD,
      },
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
   })

   try {
      //login to get auth for Admin
      const adminCredentials = await signInAuthUserWithEmailAndPassword(
         process.env.FIREBASE_ADMIN_USER,
         process.env.FIREBASE_ADMIN_PASSWORD
      )

      authToken = {
         Authorization: `Bearer ${adminCredentials.idtoken}`,
      }
   } catch (error) {
      console.error('error getting token', error)
   }

   const pieces = await getPiecesCollection() // Fetch the pieces collection from Firebase

   // Loop through the pieces collection and schedule email sending for each piece
   for (const piece of pieces) {
      const {
         id,
         auctionEnd,
         highestBidderUid,
         highestBidder,
         highestBidderEmail,
         highestBid,
         name,
      } = piece

      // Convert auctionEnd date to a JavaScript Date object
      const auctionEndTime = new Date(auctionEnd.seconds * 1000)

      // Check if auctionEnd date is reached
      if (auctionEndTime <= new Date() && !piece.notified) {
         console.log(
            `executing auctionFinishedTasks for piece ${name} id: ${id}`
         )
         // Add Notification in highestBidders
         const notification = {
            title: 'Your Bid Won!',
            text: `Congratulation! You have one the bid for piece ${name}.`,
            url: `urltopaymentportal`,
         }
         try {
            pieceAuctionEnd(piece.id, authToken)
         } catch (error) {
            console.log('error changing notified to true', error)
         }
         try {
            await addNotification(notification, highestBidderUid)
         } catch (error) {
            console.log('error adding winning notification', error)
         }

         //Send email to the highest bidder using Nodemailer
         const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: highestBidderEmail,
            subject: `Auction for ${name} Ended`,
            text: `Congratulations ${highestBidder}! You won the auction the macrame piece '${name}' with the highest bid of $${highestBid}.`,
         }
         console.log(`this will email ${highestBidderEmail}`)
         await transporter.sendMail(mailOptions)
      }
   }

   console.log('Cron task executed successfully')
})
cronJob.stop()
cronJob.start()
