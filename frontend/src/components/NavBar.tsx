import logo from '../assets/logo/Davante_logotipo_white.png';
import logoNavy from "../assets/logo/Davante_simbolo_navy.svg";
import logoWhite from "../assets/logo/Davante_simbolo_white.svg";
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='bg-navy text-white px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                {/* Logo oscuro por defecto */}
                <img src={logoNavy} alt="Logo Davante" className='h-10 dark:hidden' />
                {/* Logo claro para el modo oscuro */}
                <img src={logoWhite} alt="Logo Davante" className='h-10 hidden dark:block' />
            
                <div className='text-2xl font-bold'>Davante</div>
            </div>

            {/* Menú PC */}
            <div className='hidden md:block'>
                <a href='#' className='hover:underline'>Inicio</a>
                <a href='#' className='hover:underline'>Simuladores</a>
                <a href='#' className='hover:underline'>Perfil</a>
                <a href='#' className='hover:underline'>Contacto</a>
                <a href='#' className='hover:underline'>Ayuda</a>
                <a href='#' className='hover:underline'>Sobre nosotros</a>
                <ThemeToggle/>
            </div>

            {/* Menú móvil */}
            <div className='md:hidden flex items-center'>
                <button onClick={() => setMenuOpen(!menuOpen)} className='text-2xl'>
                    {menuOpen ? '✖' : '☰'}
                </button>
            </div>

            {menuOpen && (
                <div className='absolute top-16 left-0 w-full bg-navy flex flex-col items-start px-6 py-4 md:hidden'>
                    <a href='#' className='block hover:underline'>Inicio</a>
                    <a href='#' className='block hover:underline'>Simuladores</a>
                    <a href='#' className='block hover:underline'>Perfil</a>
                    <a href='#' className='block hover:underline'>Contacto</a>
                    <a href='#' className='block hover:underline'>Ayuda</a>
                    <a href='#' className='block hover:underline'>Sobre nosotros</a>
                    <div className='py2 w-full'>
                        <ThemeToggle/>
                    </div>
                </div>
            )}
        </nav>
    );
};


export default NavBar;