import H3 from "../../general-components/H3"

const DiscussionsList = ({ discussions, selectedDiscussion, setSelectedDiscussion }) => {

    const renderDiscussions = () => {
        return discussions.map((discussion, index) => {
            return <li key={index} style={{ 'fontWeight': selectedDiscussion?.id === discussion.id ? 'bold' : 'normal' }}
                className= "cursor-pointer break-words underline truncate px-2 py-1 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700" 
                onClick={() => setSelectedDiscussion([discussion, index+1])}>{index+1}. {discussion.title}</li>
        })
    }

    return (
        <div className="dark:bg-gray-900 w-full dark:bg-opacity-20 py-3 px-2 rounded-xl max-h-full">
            <div className="text-center my-3">
                <H3 text={discussions.length > 0 ? 'דיונים אחרונים' : 'טרם נוספו דיונים'} />
            </div>
            <div dir="rtl" className="max-h-md scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 dark:scrollbar-track-gray-100 dark:scrollbar-thumb-gray-500 pl-5 overflow-y-auto rounded-xl">
                <ol className="pr-2 list-decimal dark:text-white">
                    {renderDiscussions()}
                </ol>
            </div>
        </div>
    )
}
export default DiscussionsList