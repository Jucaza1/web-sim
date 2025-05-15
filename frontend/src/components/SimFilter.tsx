import { useState } from 'react';



const SimFilter = () => {

  const [selectedCategory, setSelectedCategory] = useState("");

    // Lista de simuladores
  const simulators = [
      { name: "Informática Ciberseguridad", category: "Tecnología" },
      { name: "Localización averías eléctricas", category: "Tecnología" },
      { name: "Aire acondicionado", category: "Climatización" },
      { name: "Presostato", category: "Climatización" },
      { name: "Calderas", category: "Climatización" },
      { name: "Salón de actos", category: "Educación" },
      { name: "Instituto virtual Medac", category: "Educación" },
      { name: "Clínica dental", category: "Salud" },
      { name: "Agricultura", category: "Agrario" },
      { name: "Veterinaria", category: "Salud" },
      { name: "Salón de ferias", category: "Educación" },
      { name: "Estética", category: "Salud" },
      { name: "Visitas virtuales", category: "Educación" },
      { name: "Ascensores", category: "Tecnología" },

    ]

    const filteredSimulators = selectedCategory
      ? simulators.filter(sim => sim.category === selectedCategory)
      : simulators;

    

    return (
      <div>
        <h1 className="text-5xl font-bold flex justify-center">Simuladores</h1>
        <div className="flex items-center mt-4 ">
          <button className="back-button px-4 py-2 rounded-full" onClick={() => window.history.back()}> Volver </button>
          <div className="flex justify-end gap-4 flex-grow md:flex">
            <button 
              className="bg-white text-navy dark:bg-navy dark:text-white px-4 py-2 rounded-full"
              onClick={() => setSelectedCategory("")}>Ver Todos</button>
            <button 
              className="bg-white text-navy dark:bg-navy dark:text-white px-4 py-2 rounded-full"
              onClick={() => setSelectedCategory("Tecnología")}>Tecnología</button>
            <button 
              className="bg-white text-navy dark:bg-navy dark:text-white px-4 py-2 rounded-full"
              onClick={() => setSelectedCategory("Climatización")}>Climatización</button>
            <button 
              className="bg-white text-navy dark:bg-navy dark:text-white px-4 py-2 rounded-full"
              onClick={() => setSelectedCategory("Salud")}>Salud</button>
            <button 
              className="bg-white text-navy dark:bg-navy dark:text-white px-4 py-2 rounded-full"
              onClick={() => setSelectedCategory("Agrario")}>Agrario</button>
            <button 
              className="bg-white text-navy dark:bg-navy dark:text-white px-4 py-2 rounded-full"
              onClick={() => setSelectedCategory("Educación")}>Educación</button>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 mg:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filteredSimulators.map((sim, index) => (
              <div 
                key={index} 
                className="card px-4 py-2 rounded mb-4 shadow-md justify-center items-center flex flex-col hover:scale-105 transition-transform duration-300"
              >
                {/*Logo modo claro*/}
                <img 
                  src={`/sim_logos/${sim.name.normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '_')
                    .toLowerCase()}_light.png`} 
                  alt={`${sim.name} logo`}
                  className="w-1/2 h-32 object-cover rounded-t logo-light"
                />

                {/*Logo modo oscuro*/}
                <img 
                  src={`/sim_logos/${sim.name.normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '_')
                    .toLowerCase()}_dark.png`} 
                  alt={`${sim.name} logo`}
                  className="w-1/2 h-32 object-cover rounded-t hidden logo-dark"
                />
                <p><strong>{sim.name}</strong></p>  
              </div>
            ))}
        </div>
      </div>
    )
}

export default SimFilter;