import firebaseAdmin from 'firebase-admin'

const serviceAccount = require('/Users/andrewstabeno/credentials/macrame-by-jacob-firebase-adminsdk.json')

if (!firebaseAdmin.apps.length) {
   firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASEURL,
   })
}

export default firebaseAdmin
