import React from 'react';
import { simulators } from '../components/simulatorsData';
import { useNavigate } from 'react-router-dom';
//import SimFilter from "../components/SimFilter";

const SimPage: React.FC = () => {

  const allSimulators = simulators;

  const navigate = useNavigate();

  return (
    <div>
      {/*<SimFilter />*/}

    <div className="p-8 min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-center">Selecciona un Simulador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {allSimulators.map((sim) => (

          <div

            key={sim.id}
            className="rounded-lg border-2 border-white bg-gray-800 shadow-md p-6 flex flex-col items-center justify-between">

            <h2 className="text-xl font-semibold mb-2">{sim.name}</h2>

            <div
              onClick={() => navigate(`/simulator?id=${sim.id}`)}
              className="cursor-pointer active:animate-bounce transition-transform duration-200 hover:scale-105"
            >
              <img
                src={sim.thumbnail}
                alt={sim.name}
                className="h-32 w-32 object-contain mb-4"
              />

            </div>

            <p className="text-white text-sm mb-4 text-center">{sim.description}</p>


          </div>

        ))}

      </div>

    </div>
    </div>

  );

};

export default SimPage;
