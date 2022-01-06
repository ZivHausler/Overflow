import { DocumentTextIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { useState } from 'react';

const UploadFile = ({ handleFileInput, setSelectedFile, selectedFile, uploadTitle, uploadFileLimit, uploadType }) => {

    const [typeOfFile, setTypeOfFile] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const clickHandle = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        // check if the file is over the limit
        reader.readAsDataURL(file);

        reader.onload = e => {
            setPreviewUrl(e.target.result);
            handleFileInput(file);
            setTypeOfFile(file.name.split('.').slice(-1)[0]);
        };

    }

    return (
        <div className="m-2 mb-5 max-h-md max-w-md">
            <div className="relative mt-1 flex justify-center  px-10 py-2 border-2 border-gray-400 border-dashed rounded-md dark:bg-gray-800">
                {!selectedFile && <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex justify-center text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer dark:bg-gray-800 px-2 py-1 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>{uploadTitle}</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => clickHandle(e)} />
                        </label>
                    </div>
                    <p dir="rtl" className="text-xs text-gray-500">{uploadType} עד {uploadFileLimit / 1000000}MB </p>
                </div>}
                {selectedFile && <div className="flex flex-col py-3 justify-center items-center text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer dark:bg-gray-800 px-2 py-1 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        {uploadType === "PDF" && <DocumentTextIcon className="h-12 w-12 outline-none" />}
                        <input id="file-upload" name="file-upload" type="file" className="sr-only outline-none" onChange={(e) => clickHandle(e)} />
                    </label>
                    {uploadType === "PDF" ? <p className="text-center text-xs text-gray-500">נבחר קובץ {typeOfFile?.length ? typeOfFile.toUpperCase() : ''}</p> : <img className='max-h-md max-w-md' src={previewUrl} />}
                    <XIcon className="absolute top-0 left-0 transform dark:bg-gray-800 -translate-x-1/2 -translate-y-1/2 h-7 w-7 bg-gray-200 text-indigo-600 hover:text-indigo-500 cursor-pointer border-dashed border-2 border-gray-400 rounded-full p-1" onClick={() => setSelectedFile(false)} />
                </div>}
            </div>

        </div >
    )
}
export default UploadFile