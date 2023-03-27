import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { UserContext } from '../contexts/userContext'

const router = useRouter()
const currentUser = useContext(userContext)

useEffect(() => {
   if (currentUser) {
   }
})
