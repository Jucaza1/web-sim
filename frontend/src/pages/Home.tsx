import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";



const Home = () => {
    return (
        <div>
            <NavBar />
            <main className="p-6 text-white">
                <h1 className="text-3xl font-bold">Bienvenido a Davante</h1>
                {/*<SearchBar />*/}
                {/* Aqui va el grid con la lista de simuladores */} 
            </main>
        </div>
    );
};

export default Home;