export default async function outBidEmail(email, userName, pieceName, amount) {
   const emailerUrl = `http://localhost:3000/api/emailer`

   const emailData = {
      // Define the email data here, for example:
      to: email,
      subject: `You were outbid for ${pieceName}`,
      html: `<p>Greetings ${userName}, </p> 
            <p>Your last bid for ${pieceName} 
            has been beat.  The current price is now $${amount}.
            If you can beat the price log in and bid now.</p>
            <a href='http://localhost:3000'>Macrame By Jacob</>`,
   }

   try {
      const response = await fetch(emailerUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(emailData),
      })

      if (response.ok) {
         console.log('Email sent successfully')
         // Handle success response here
      } else {
         console.error('Failed to send email')
         // Handle error response here
      }
   } catch (error) {
      console.error('Failed to send email:', error)
      // Handle error here
   }
}
