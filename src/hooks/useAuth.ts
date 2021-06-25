import  { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { IUser } from './useUser';
import { useRouter } from 'next/router';

export interface ICredentialsSingIn {
    email: string;
    password: string;
}

export interface ICredentialsSingUp {
    name: string;
    email: string;
    password: string;
    default_currency :string;
}

const useAuth = () => {

    const router = useRouter();

    const [user, setUser] = useState<IUser>({} as IUser);
    const [token, setToken] = useState<string>('');
    const [isLoadResponse, setIsLoadResponse] = useState<boolean>(false);
    const [isLoadPage, setIsLoadPage] = useState<boolean>(true);
    const [loginErr, setLoginErr] = useState<string>('');
    const [registerErr, setRegisterErr] = useState<string>('');

    const isSinged = useMemo<boolean>(() =>
        !!(user.id && user.name && user.email && token)
        , [user, token]);

    useEffect(() => {
        const userData = sessionStorage.getItem('@user');
        const tokenData = sessionStorage.getItem('@token');
        if (!!userData && !!tokenData) {
            try {
                const userParsed = JSON.parse(userData) as IUser;
                setUser(userParsed);
                setToken(tokenData);
            }
            catch (err) {
                console.error('erro ao setar usuário');
            }
        }
        setIsLoadPage(false);
    }, []);

    const singIn = useCallback(async (credentials: ICredentialsSingIn) => {
        setIsLoadResponse(true);
        setLoginErr('');
        try {
            const response = await api.post('/auth/signIn', credentials);
            const { user: userResponse, token } = response.data;
            setUser(userResponse);
            setToken(token);
            sessionStorage.setItem('@token', token);
            sessionStorage.setItem('@user', JSON.stringify(userResponse));
        }
        catch (err) {
            // console.log(Object.getOwnPropertyDescriptors(err));
            if (err?.response?.status === 400) {
                setLoginErr('Ops, Credenciais inválidas, tente novamente!😅');
            }
            else if (err?.response?.status === 500) {
                setLoginErr('Falha ao fazer login, por favor, tente novamente mais tarde');
            }
            else {
                setLoginErr('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }
        }
        setIsLoadResponse(false);
    }, []);

    const singUp = useCallback(async (credentials: ICredentialsSingUp) => {
        setIsLoadResponse(true);
        setRegisterErr('');
        try {
            const response = await api.post('/auth/signUp', credentials);
            const { user: userResponse, token } = response.data;
            setUser(userResponse);
            setToken(token);
            sessionStorage.setItem('@token', token);
            sessionStorage.setItem('@user', JSON.stringify(userResponse));
        }
        catch (err) {
            // console.log(Object.getOwnPropertyDescriptors(err));
            if (err?.response?.status === 500) {
                setRegisterErr('Falha ao fazer login, por favor, tente novamente mais tarde');
            }
            else {
                setRegisterErr('Falha na conexão com o servidor, por favor, tente novamente mais tarde');
            }

        }
        setIsLoadResponse(false);
    }, []);

    const singOut = useCallback(async () => {
        setUser({} as IUser);
        sessionStorage.clear();
        router.replace('/login');
    }, []);

    const updateDefaultcurrentUser = useCallback((defaultCurrent: string)=>{
        const tmpUser = {...user};
        tmpUser.default_currency = defaultCurrent;
        setUser(tmpUser);
        sessionStorage.setItem('@user', JSON.stringify(tmpUser));
    },[user]);

    return {
        user,
        isSinged,
        isLoadResponse,
        loginErr,
        registerErr,
        isLoadPage,
        singIn,
        singUp,
        singOut,
        updateDefaultcurrentUser
    };
}
export default useAuth;