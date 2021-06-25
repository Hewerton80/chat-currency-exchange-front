import { ReactNode } from 'react';
import { createContext } from "react";
import useAuth, { ICredentialsSingIn, ICredentialsSingUp } from '../hooks/useAuth';
import { IUser } from '../hooks/useUser';


interface IAuthContex {
    isSinged: boolean;
    user: IUser;
    isLoadResponse: boolean;
    isLoadPage: boolean;
    loginErr: string;
    registerErr: string;
    singIn(credentials: ICredentialsSingIn): Promise<void>;
    singUp(credentials: ICredentialsSingUp): Promise<void>;
    singOut: () => Promise<void>;
    updateDefaultcurrentUser: (defaultCurrent: string) => void;
}

interface AuthContexrProviderProps {
    children: ReactNode
}
const authContex = createContext({} as IAuthContex);

function AuthContexrProvider({ children }: AuthContexrProviderProps) {

    const authValues = useAuth();

    return (
        <authContex.Provider value={authValues}>
            {authValues.isLoadPage ? <></> : children}
        </authContex.Provider>
    )
}

export { authContex, AuthContexrProvider };