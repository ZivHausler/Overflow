import { useState } from "react";

const useUserLogged = () => {
    const [isLogged, setIsLogged] = useState(true);
    return [isLogged, setIsLogged];
}
export default useUserLogged