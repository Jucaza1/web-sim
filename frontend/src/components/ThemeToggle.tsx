import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");
        const prefersDark = currentTheme === 'dark';
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle("dark", prefersDark);
    }, []);

    const toggleTheme = () => {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);
        document.documentElement.classList.toggle("dark", nextMode);
        localStorage.setItem("theme", nextMode ? "dark" : "light");
    };

    return (
        <button 
            onClick={toggleTheme} 
            className="
                px-4 py-2 rounded-full font-bold text-lg
                shadow hover:scale-105
            "
            aria-label="Cambiar tema"
        >
            {isDarkMode ? "🌙" : "☀️"}
        </button>
    );
}


export default ThemeToggle;