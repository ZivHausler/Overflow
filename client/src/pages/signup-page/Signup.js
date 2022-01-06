import { LockClosedIcon } from '@heroicons/react/solid'
import Input from '../../general-components/Input'
import H2 from '../../general-components/H2'
// import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <>
            <div dir='rtl' className="min-h-full flex items-center justify-center py-4 px-2 sm:px-4 lg:px-4">
                <div className="max-w-md w-full dark:bg-gray-900 shadow rounded-lg p-10 space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <H2 text={'צור משתמש חדש'} />
                        <p className="mt-2 text-center text-sm text-gray-600"></p>
                    </div>
                    <form className="mt-8 space-y-3" action="#" method="POST">
                        <div className="flex">
                            <Input text={'שם פרטי'} id={'first-name'} type={'text'} />
                            <Input text={'שם משפחה'} id={'last-name'} type={'text'} />
                        </div>
                        <Input text={'כתובת אימייל'} id={'email-address'} type={'text'} />
                        <Input text={'סיסמא'} id={'password'} type={'text'} />
                        <Input text={'אימות סיסמא'} id={'confirm-password'} type={'text'} />
                        {/* <Input text={'שם פרטי'} id={'first-name'} type={'text'} />
                        <Input text={'שם פרטי'} id={'first-name'} type={'text'} /> */}
                        <div className="text-sm">
                            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> כבר רשום למערכת? </a>
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            התחבר
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
