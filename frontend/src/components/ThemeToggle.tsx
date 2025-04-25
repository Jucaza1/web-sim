import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        const prefersDark = currentTheme === 'dark';
        setIsDarkMode(prefersDark);
        document.body.classList.toggle("dark", prefersDark);
    }, [])

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);
        localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
    };

    return (
        <button 
            onClick={toggleTheme} 
            className={`
                px-4 py-2 rounded-full font-bold text-lg transition-all duration-300
                bg-white text-navy border border-navy
                dark:bg-navy dark:text-white dark:border-white
                shadow hover: scale-105
                `}
                aria-label="Cambiar tema"
        >
            {isDarkMode ? "🌙" : "☀️"}
        </button>
    );
}


export default ThemeToggle;