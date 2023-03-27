import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'

import FlashMessage from 'react-flash-message'

import AccountCreationMessage from './AccountCreationMessage'
import LoginRequiredMessage from './LoginRequireMessage'
import NotAuthorizedMessage from './NotAuthorizedMessage'

export default function Message(props) {
   const { text } = props

   switch (text) {
      case 'ACCOUNT_CREATION_SUCCESS':
         return (
            <FlashMessage duration={2000}>
               <AccountCreationMessage />
            </FlashMessage>
         )
      case 'LOGIN_REQUIRED':
         return (
            <FlashMessage duration={1000}>
               <LoginRequiredMessage />
            </FlashMessage>
         )
      case 'NOT_AUTHORIZED':
         return (
            <FlashMessage duration={1000}>
               <NotAuthorizedMessage />
            </FlashMessage>
         )
      default:
         return <FlashMessage duration={2000}>{text}</FlashMessage>
   }
}
