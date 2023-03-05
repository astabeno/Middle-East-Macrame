import Link from 'next/link'
import {useState} from 'react'
import {useRouter} from 'next/router'

import {createAuthUserWithEmailAndPassword,
        createUserDocumentFromAuth,
} from '../utils/firebase.utils'



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',

}

export default function signUp() {
    const router = useRouter()
    const [formFields, setFormFields ] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFields = () => {
        setFormFields(defaultFormFields)
    }

    const onSubmitHandler = async(event) =>{
        event.preventDefault()
        
        if(password !== confirmPassword){
            alert("Password don't match!")
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            console.log(`${user.displayName}`)
            resetFields();
            router.push( {pathname: '/', query: { message: 'ACCOUNT_CREATION_SUCCESS'}} )

        }catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already Registered')
            }else{
                console.log('error creating user', error);
            }
        }
    }

    const changeHandler = (event) =>{
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value })
    }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center 
                        justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <form onSubmit={onSubmitHandler}>
                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="displayName"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={changeHandler}
                    required
                />
                <input 
                    type="email"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={changeHandler}
                    required
                />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={changeHandler}
                    required
                />
                <input 
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={changeHandler}
                    required
                    />
                <button
                    type="submit"
                    className="w-full text-center py-3 rounded bg-green-500 
                                text-white hover:bg-green-dark focus:outline-none my-1"
                >Create Account</button>
                </form>
            </div>

            <div className="text-grey-dark mt-6">
                Already have an account? 
                <Link className="no-underline border-b border-blue text-blue" 
                      href="../login/">
                    Log in
                </Link>.
            </div>
        </div>
    </div>
  )
}
