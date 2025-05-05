import logoNavy from "../assets/logo/Davante_simbolo_navy.svg";
import logoWhite from "../assets/logo/Davante_simbolo_white.svg";
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className='px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
                
                {/* Logo oscuro por defecto */}
                <img src={logoNavy} alt="Logo Davante" className='h-10 logo-dark' />
                {/* Logo claro para el modo oscuro */}
                <img src={logoWhite} alt="Logo Davante" className='h-10 logo-light' />
                
            
                <div className='text-2xl font-bold '>Davante</div>
            </div>

            {/* Menú PC */}
            <div className='hidden md:flex gap-6 items-center'>
                <a href='/home' className='hover:text-orange-500'>Inicio</a>
                <a href='/simulator' className='hover:text-orange-500'>Simuladores</a>
                <a href='#' className='hover:text-orange-500'>Perfil</a>
                <a href='#' className='hover:text-orange-500'>Contacto</a>
                <a href='#' className='hover:text-orange-500'>Ayuda</a>
                <a href='#' className='hover:text-orange-500'>Sobre nosotros</a>
                <ThemeToggle/>
            </div>

            {/* Menú móvil */}
            <div className='md:hidden flex items-center'>
                <button onClick={() => setMenuOpen(!menuOpen)} className='text-2xl'>
                    {menuOpen ? '✖' : '☰'}
                </button>
            </div>

            {menuOpen && (
                <div className='absolute top-24 right-0 w-full flex flex-col items-end px-6 py-4 md:hidden'>
                    <a href='#' className='block hover:text-orange-500'>Inicio</a>
                    <a href='#' className='block hover:text-orange-500'>Simuladores</a>
                    <a href='#' className='block hover:text-orange-500'>Perfil</a>
                    <a href='#' className='block hover:text-orange-500'>Contacto</a>
                    <a href='#' className='block hover:text-orange-500'>Ayuda</a>
                    <a href='#' className='block hover:text-orange-500'>Sobre nosotros</a>
                    <div className='py2 w-full'>
                        <ThemeToggle/>
                    </div>
                </div>
            )}
        </nav>
    );
};


export default NavBar;