import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Simulator } from "../types/response";

const HOST = import.meta.env.VITE_DOMAIN_HOST?? "http://localhost:3000";
const API_URL = `${HOST}/api/v1`;

const SimPage: React.FC = () => {
  const [simulators, setSimulators] = useState<Simulator[]>([]);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Detectar modo oscuro
  // useEffect(() => {
  //   const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   setIsDarkMode(darkModeMediaQuery.matches);
  //
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     setIsDarkMode(e.matches);
  //   };
  //
  //   darkModeMediaQuery.addEventListener('change', handleChange);
  //   return () => {
  //     darkModeMediaQuery.removeEventListener('change', handleChange);
  //   };
  // }, []);
    // useEffect(() => {
    //     const currentTheme = localStorage.getItem("theme");
    //     const prefersDark = currentTheme === 'dark';
    //     setIsDarkMode(prefersDark);
    //     document.documentElement.classList.toggle("dark", prefersDark);
    // }, []);

  // Obtener simuladores desde una API
  useEffect(() => {
    const fetchSimulators = async () => {
      try {
        const response = await fetch(`${API_URL}/simulators`,{
          method:'GET',
          credentials: 'include',
        });
         if (response.status !== 200 && response.status !== 401) {
          throw new Error('Error al obtener los simuladores');
        }
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        const data: Simulator[] = await response.json();

        const sorted = data.sort((a, b) =>
          a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
        );

        setSimulators(sorted);
      } catch (error) {
        console.error('Error al obtener simuladores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimulators();
  }, [navigate]);

  if (loading) {
    return <div className="p-8 text-center">Cargando simuladores...</div>;
  }
  if (simulators.length === 0) {
    return <div className="p-8 text-center">No hay simuladores disponibles.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Selecciona un Simulador</h1>

      <div className="max-w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {simulators.map((sim) => (
          <div
            key={sim.id}
            className="relative rounded-lg box-bordered border-2 dark:border-white dark:bg-navy bg-white border-navy shadow-md p-6 flex flex-col items-center justify-between"
          >
            <h2 className="text-xl font-semibold mb-2">{sim.name}</h2>

            <div
              onClick={() => { if (sim.ready) {navigate(`/simulator?id=${sim.id}`)}/*else {navigate("/simulatorspage")}*/}}
              className="cursor-pointer active:animate-bounce transition-transform duration-200 hover:scale-105"
            >
              <img
                src={`${sim.thumbnail
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/\s+/g, '_')
                  .replace('_dark.png', '')
                  .replace('_light.png', '')
                  .toLowerCase()}_dark.png`}
                alt={sim.name}

                className="h-60 w-60 object-contain mb-4 logo-light"

              />
              <img
                src={`${sim.thumbnail
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/\s+/g, '_')
                  .replace('_dark.png', '')
                  .replace('_light.png', '')
                  .toLowerCase()}_light.png`}
                alt={sim.name}

                className="h-60 w-60 object-contain mb-4 logo-dark"

              />
            </div>
            {!sim.ready && (
            <div className="flex gap-2 items-center absolute bottom-1/12">
              <img src="/svg/proximamente_light.svg" alt="Próximamente" className="h-4 w-4 logo-light object-contain" />
              <img src="/svg/proximamente_dark.svg" alt="Próximamente" className="h-4 w-4 logo-dark object-contain" />
              <p className="text-sm">Próximamente</p>
            </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimPage;
