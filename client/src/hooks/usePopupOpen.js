import { useState, useEffect } from "react";

const usePopupOpen = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    useEffect(()=>{
        console.log(isPopupOpen);
    },[isPopupOpen])

    return [isPopupOpen, setIsPopupOpen];
}
export default usePopupOpen