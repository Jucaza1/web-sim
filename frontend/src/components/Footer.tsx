import DavanteLogoDark from "../assets/logo/Davante_logotipo_white.svg"
import DavanteLogoLight from "../assets/logo/Davante_logotipo_navy.svg"

function Footer() {
    return (
        <footer className="footer py-2 px-4">
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center flex-shrink-0">
                <img src={DavanteLogoDark} alt="Logo Davante" className="h-10 logo-dark" />
                <img src={DavanteLogoLight} alt="Logo Davante" className="h-10 logo-light" />
            </div>
            <div className="flex-1 text-center">
                <p>&copy; Davante {new Date().getFullYear()}. Todos los derechos reservados.</p>
            </div>
            <div className="flex flex-col items-end text-right">
                <p>Síguenos en nuestras redes:</p>
                <div className="flex space-x-3">
                    <a href="#" className="hover:underline">Facebook</a>
                    <a href="#" className="hover:underline">Twitter</a>
                    <a href="#" className="hover:underline">Instagram</a>
                </div>
            </div>
        </div>
        </footer>
    )
}

export default Footer
