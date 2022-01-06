import { useEffect, useState } from "react";


const useUploadFilePopup = () => {
    
    
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    
    useEffect(() =>{
        console.log(isPopupOpen)
    },[isPopupOpen])
    return [isPopupOpen, setIsPopupOpen];
}
export default useUploadFilePopup