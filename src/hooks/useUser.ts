import { useCallback, useState } from "react";
import { api } from "../services/api";

export interface IUser {
    id: string;
    name: string;
    email: string;
    default_currency?: string;
}

const useUser = () => {

    const [isLoad, setIsload] = useState(false);
    const [userFound, setUserFound] = useState({} as IUser);

    const findUser = useCallback(async (phone: string) => {
        setIsload(true);
        try {
            const response = await api.get('/user/phone', {
                params: {
                    phone
                }
            })
            console.log('user: ', response?.data?.user);
            response?.data?.user && setUserFound(response?.data?.user);
        }
        catch (err) {
            console.error(err);
        }
        setIsload(false);
    }, []);

    const clearUser = useCallback(() => {
        setUserFound({} as IUser);
    }, [])

    return { userFound, isLoad, findUser, clearUser };

}
export default useUser;