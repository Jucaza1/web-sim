import NavBar from "../components/NavBar";
import "../styles/Home.css"; // Asegúrate de que la ruta sea correcta
import videoPresentacion from "../assets/video/DAVANTE_30sec_16x9_CAST_20250408.mp4";


const Home = () => {
    return (
        <div>
            <NavBar />
            <main className="p-6">
                <h1 className="text-3xl font-bold">Bienvenido a Davante</h1>
                <video 
                    className="w-full h-auto mt-4 rounded-lg border-navy shadow-lg" 
                    controls 
                    loop 
                    preload="auto" 
                    playsInline
                >
                    <source src={videoPresentacion} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
                {/*<SearchBar />*/}
                {/* Aqui va el grid con la lista de simuladores */} 
            </main>
        </div>
    );
};

export default Home;