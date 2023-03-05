import { Fragment, useContext } from 'react'
import Link from 'next/link'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'

import { signOutUser } from '../../utils/firebase.utils'
import { UserContext } from '../../contexts/userContext'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function signOutHandler () {
  signOutUser()
}



export default function UserMenu() {
  const {currentUser} = useContext(UserContext)
  const { displayName } = currentUser

  return (
      <Menu as="div" className="relative ml-3">
        <div>
          
          <Menu.Button className="flex rounded-full 
                              bg-gray-800 p-1 text-gray-400 
                              hover:text-white focus:outline-none 
                                focus:ring-2 focus:ring-white 
                                focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="sr-only">Open user menu</span>
            <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items 
            className="absolute right-0 z-10 
                       mt-2 w-48 origin-top-right 
                       rounded-md bg-white py-1 
                       shadow-lg ring-1 ring-black 
                       ring-opacity-5 focus:outline-none">
            <span className="block px-4 py-2 text-sm text-black">{displayName}</span>
            <hr className="mx-2"/>
            <Menu.Item>
            {({ active }) => (
                <Link
                href="/authentication/profile"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                Your Profile
                </Link>
            )}
            </Menu.Item>
            <Menu.Item>
            {({ active }) => (
                <Link
                href="/authentication/bids"
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                My Bids
                </Link>
            )}
            </Menu.Item>
            <Menu.Item>
            {({ active }) => (
                <button
                onClick={signOutHandler}
                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                >
                Sign out
                </button>
            )}
            </Menu.Item>
        </Menu.Items>
        </Transition>
    </Menu>

  )
}
