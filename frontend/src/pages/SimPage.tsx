import React, { useState, useEffect } from 'react';
import { simulators } from '../components/simulatorsData';
import { useNavigate } from 'react-router-dom';

const SimPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Clonar y ordenar simuladores por nombre
  const sortedSimulators = [...simulators].sort((a, b) =>
    a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
  );

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Selecciona un Simulador</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedSimulators.map((sim) => (
          <div
            key={sim.id}
            className="rounded-lg border-2 border-white bg-gray-800 shadow-md p-6 flex flex-col items-center justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{sim.name}</h2>

            <div
              onClick={() => navigate(`/simulator?id=${sim.id}`)}
              className="cursor-pointer active:animate-bounce transition-transform duration-200 hover:scale-105"
            >
              <img
                src={`/sim_logos/${sim.name
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/\s+/g, '_')
                  .toLowerCase()}_${isDarkMode ? 'dark' : 'light'}.png`}
                alt={sim.name}
                className="h-60 w-60 object-contain mb-4"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimPage;
