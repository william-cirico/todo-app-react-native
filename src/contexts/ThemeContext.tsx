import { createContext, ReactNode, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "../themes";

type ThemeContextType = {
    theme: any;
    toggleTheme: VoidFunction;
};

const ThemeContext = createContext<ThemeContextType>(null!);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState(lightTheme);

    function toggleTheme() {
        setTheme(theme => theme === lightTheme ? darkTheme : lightTheme);
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PaperProvider theme={theme}>
            {children}
        </PaperProvider>
    </ThemeContext.Provider>;
}