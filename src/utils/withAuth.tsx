import { ElementType, useEffect } from "react"
import { useRouter } from 'next/router';

export function withAuth(WrappedComponent: ElementType) {

    const Wrapper = (props: unknown) => {

        const router = useRouter();

        useEffect(() => {
            const token = sessionStorage.getItem('@token');
            if(!token){
                router.replace('/login');
            }
        }, []); 
        
        return <WrappedComponent {...props} />
    }

    return Wrapper;
}