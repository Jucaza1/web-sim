import videoPresentacion from "../assets/video/DAVANTE_30sec_16x9_CAST_20250408.mp4";


const Home = () => {
    return (
        <div>
            <main className="p-6">
                <h1 className="text-3xl font-bold">Bienvenido a Davante</h1>
                <div className="w-3/4 h-auto box-bordered mt-4 rounded-full overflow-hidden  border-4 border-navy dark:border-white  shadow-lg mx-auto">
                <video
                    className="w-full h-auto"
                    controls
                    loop
                    preload="auto"
                    playsInline
                >
                    <source src={videoPresentacion} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
                </div>
                {/*<SearchBar />*/}
                {/* Aqui va el grid con la lista de simuladores */}
            </main>
        </div>
    );
};

export default Home;
