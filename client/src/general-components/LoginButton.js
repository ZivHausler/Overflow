import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {

    const { user } = useAuth0();
    const { loginWithRedirect } = useAuth0();

    const loginUser = () => {
        loginWithRedirect();
    }

    return (
        <div>
            <button onClick={() => loginUser()} className="w-full flex  items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                התחבר
            </button>
        </div>
    )
}

export default LoginButton
