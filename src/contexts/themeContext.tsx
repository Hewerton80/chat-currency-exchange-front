import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

export type ThemeType = 'light' | 'dark'

interface IThemeContext {
    theme: ThemeType,
    changeTheme: (themeValue: ThemeType) => void
}

const ThemeContext = createContext({} as IThemeContext);

interface ThemeContextProviderProps {
    children: ReactNode
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {

    const [theme, setTheme] = useState<ThemeType>('light');
    
    const changeTheme = useCallback((themeValue: ThemeType) => {
        setTheme(themeValue)
    }, []);

    useEffect(() => {
        const themeStorage = localStorage.getItem('@theme');
        if (themeStorage === 'light' || themeStorage === 'dark') {
            setTheme(themeStorage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('@theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                changeTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeContextProvider };