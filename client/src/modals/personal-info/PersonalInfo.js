import DropDownList from "../../general-components/DropDownList";
import Input from "../../general-components/Input"
import Button from '../../general-components/Button'
import H3 from "../../general-components/H3";

const routes = ['מסלול', 'select', 'route', ['מדעי המחשב', 'רפואה', 'פסיכולוגיה', 'מעשיה וטיול', 'תורת הדשא']]

// const inputs = [
//     ['שם פרטי', 'text', 'first-name'],
//     ['שם משפחה', 'text', 'last-name'],
//     ['כתובת האימייל', 'text', 'email-address'],
//     ['מסלול', 'select', 'route', ['מדעי המחשב', 'רפואה', 'פסיכולוגיה', 'מעשיה וטיול', 'תורת הדשא']],
// ]

export default function PersonalInfo() {
    return (
        <>
            <div dir='rtl' className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form action="#" method="POST">
                            <div className="shadow overflow-hidden dark:bg-gray-900 rounded-lg">
                                <div className="text-center p-5">
                                    <H3 text={'פרופיל אישי'} />
                                </div>
                                <div className="px-4 py-5 dark:bg-gray-900 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <Input text={'שם פרטי'} type={"text"} id={"first-name"} />
                                        <Input text={'שם משפחה'} type={"text"} id={"last-name"} />
                                        <Input text={'כתובת האימייל'} type={"text"} id={"email-address"} />
                                        <DropDownList text={routes[0]} id={routes[2]} list={routes[3]} />
                                    </div>
                                </div>
                                <div>
                                    <div className="min-h-full flex items-center justify-center py-2 pb-7 px-4 sm:px-6 lg:px-8">
                                        <div className="mt-5 md:mt-0 md:col-span-2">
                                            <form action="#" method="POST">
                                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                                    <div className="px-4 py-5 dark:bg-gray-700 dark:bg-opacity-20 flex items-center">
                                                        <div className="mx-2 ">
                                                            <label className="block text-sm font-medium text-gray-700">תמונה</label>
                                                            <div className="mt-1 flex items-center">
                                                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                    </svg>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mx-2">
                                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                                <div className="space-y-1 text-center">
                                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                                        <path
                                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    <div className="flex text-sm text-gray-600">
                                                                        <label htmlFor="file-upload" className="relative cursor-pointer dark:bg-gray-900 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                            <span>העלה קובץ</span>
                                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                        </label>
                                                                        <p className="pr-1">או גרור</p>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF עד 10MB </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 text-right sm:px-6">
                                                            <Button text={'שמור תמונה'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 dark:bg-gray-900 text-right sm:px-6">
                                    <Button text={'עדכון פרטים'} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
