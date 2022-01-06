import { LockClosedIcon } from '@heroicons/react/solid'
import Input from '../../general-components/Input'
import H2 from '../../general-components/H2'
// import { Link } from "react-router-dom"


export default function Login() {
  return (
      <>
      <div dir='rtl' className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full shadow dark:bg-gray-900 rounded-lg p-10 space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <H2 text={'התחבר למשתמש שלך'}/>
            <p className="mt-2 text-center text-sm text-gray-600"></p>
          </div>
          <form className="mt-8 space-y-3" action="#" method="POST">
            <div className="">
              <div className="space-y-3">
                <Input text={'כתובת אימייל'} id={'email-address'} type={'text'} />
                <Input text={'סיסמא'} id={'password'} type={'text'} />
              </div>
              <div dir='rtl' className="flex items-center justify-between my-3">
                <div className="flex">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 ml-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm dark:text-white text-gray-900">זכור אותי</label>
                </div>
                <div className="text-sm">
                  <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">לא רשום למערכת?</a>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                התחבר
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    
  )
}
