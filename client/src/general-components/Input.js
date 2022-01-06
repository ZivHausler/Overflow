const Input = ({ text, type, setInputValue, isChecked, value, courseSelection }) => {

    const preventMinus = (e) => {
        switch (type) {
            case "number":
                e > 100 ? setInputValue(0) : setInputValue(parseInt(e.toString().replace('-', '')));
                break;
            case "checkbox":
                setInputValue(e);
                break;
            case "text":
                setInputValue(e);
                break;
            default:
                return;
        }
    }
    
    return (
        <>
            {courseSelection ?
                <div dir="rtl" className="mx-2 mb-5 col-span-6 sm:col-span-3 flex items-center">
                    <input min={0} onChange={(e) => setInputValue(e)}
                        type={type}
                        value={value || ""}
                        checked={isChecked}
                        className="dark:text-white focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 dark:bg-gray-600 dark:border-gray-600 rounded-md" />
                    <label className="mx-3 block dark:text-white text-sm font-medium text-gray-700">{text}</label>
                </div>
                :
                <div dir="rtl" className="mx-2 mb-5 mt-1 col-span-6 sm:col-span-3 ">
                    <label className="block dark:text-white text-sm font-medium text-gray-700">{text}</label>
                    <input min={0} onChange={(e) => preventMinus(e.target.value.trim())}
                        value={value}
                        min={1}
                        type={type}
                        className="dark:text-white w-full focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 dark:bg-gray-600 dark:border-gray-600 rounded-md" />
                </div>
            }

        </>
    )
}
export default Input