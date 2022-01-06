import { useState, useEffect } from "react";

const useDiscussions = () => {
    const [isDiscussionOpen, setIsDiscussionOpen] = useState(true);
    useEffect(() => {
        console.log(isDiscussionOpen);
    }, [isDiscussionOpen])

    return [isDiscussionOpen, setIsDiscussionOpen];
}
export default useDiscussions