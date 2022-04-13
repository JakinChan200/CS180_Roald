import React from "react";

interface ThemeContextProps{
    
}

export const defaultTheme = {
    lightblue: "#00ABFB",
    lightgrey: "#ECEFF4",
};

export const ThemeContext = React.createContext<ThemeContextProps>(defaultTheme);

export const ThemeContextProvider: React.FC = (props) => {
    const [theme, setTheme] = React.useState({defaultTheme});
    return <ThemeContext.Provider value={theme}>
        {props.children}
    </ThemeContext.Provider>
}