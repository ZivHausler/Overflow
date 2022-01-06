import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'


const LogoutButton = () => {
    const { logout } = useAuth0();
    const { loginWithRedirect } = useAuth0();

    const LogoutFromAccount = () => {
        logout();
        loginWithRedirect();
    }

    return (
        <div className='ml-5'>
            <button
                onClick={() => LogoutFromAccount()}
                className="w-full flex  items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">התנתק</button>
        </div>
    )
}

export default LogoutButton
