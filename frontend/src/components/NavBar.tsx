import logoNavy from "../assets/logo/Davante_simbolo_navy.svg";
import logoWhite from "../assets/logo/Davante_simbolo_white.svg";
import ThemeToggle from './ThemeToggle';
import defaultProfileDark from  "../assets/logo/user_icon_16_dark.png" 
import defaultProfileLight from  "../assets/logo/user_icon_16_light.png" 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

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
                <Link to='/home' className='hover:text-orange-500'>Inicio</Link>
                <Link to='/simulatorspage' className='hover:text-orange-500'>Simuladores</Link>
                <Link to='/profile' className='hover:text-orange-500'>Perfil</Link>
                <Link to='#' className='hover:text-orange-500'>Contacto</Link>
                <Link to='#' className='hover:text-orange-500'>Ayuda</Link>
                <Link to='#' className='hover:text-orange-500'>Sobre nosotros</Link>
                {/* Icono de usuario */}
                { isAuthenticated() ? (
                    <div>
                        <img src={defaultProfileDark} alt="Perfil" className='h-8 w-8 rounded-full logo-dark' onClick={() => navigate("/profile")}/>
                        <img src={defaultProfileLight} alt="Perfil" className='h-8 w-8 rounded-full logo-light' onClick={() => navigate("/profile")}/>
                        <div className="cursor-pointer text-sm text-gray-700 dark:text-white hover:underline" onClick={() => navigate("/profile")} >
                            {user?.name} <span className="text-gray-500">({user?.role})</span>
                        </div>
                    </div>
                ) : (
                    <Link to='/login' className='hover:text-orange-500'>
                        <div className=" text-white dark:text-navy hover:underline">
                            Iniciar sesión
                        </div>
                    </Link>  
                )}
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
                    <Link to='/home' className='hover:text-orange-500'>Inicio</Link>
                    <Link to='/simulatorspage' className='hover:text-orange-500'>Simuladores</Link>
                    <Link to='/profile' className='hover:text-orange-500'>Perfil</Link>
                    <Link to='#' className='hover:text-orange-500'>Contacto</Link>
                    <Link to='#' className='hover:text-orange-500'>Ayuda</Link>
                    <Link to='#' className='hover:text-orange-500'>Sobre nosotros</Link>
                    <div className='py2 w-full'>
                        <ThemeToggle/>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
