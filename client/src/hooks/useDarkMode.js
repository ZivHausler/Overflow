import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        isDarkMode ? 
        document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
    }, [isDarkMode])
    return [isDarkMode, setIsDarkMode];
}
export default useDarkMode