import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SimulatorWebgl } from "../types/response";
import SimulatorUnity from "../components/SimulatorUnity";
interface SimulatorWebgl {
    loader: string
    data: string
    framework: string
    wasm: string
}

// const HOST = import.meta.env.VITE_DOMAIN_HOST?? "http://localhost:3000";
const HOST = "http://localhost:3000/";
const API_URL = `${HOST}api/v1`;

const SimulatorApp: React.FC = () => {
  const [webgl, setWebgl] = useState<SimulatorWebgl>();
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));


  useEffect(() => {
    if (!id) {
      console.error("Simulador no encontrado");
      return;
    }
      const fetchwebgl = async () => {
      try {
        const response = await fetch(`${API_URL}/simulators/${id}/webgl/`,{method:'GET'}); // cambiar la url del back no olvidar
        if (response.status !== 200) {
          throw new Error('Error al obtener los simuladores');
        }
        const data: SimulatorWebgl = await response.json();
        setWebgl(data);

      } catch (error) {
        console.error('Error al obtener simuladores:', error);
      } finally {
        //setLoading(false);
      }
    };

    fetchwebgl();

  },[id]);

  return(
  webgl && webgl.loader && webgl.data && webgl.framework && webgl.wasm ?
    <div className="w-full h-screen">
      <SimulatorUnity {...webgl}/>
    </div> :
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Cargando simulador...</h1>
    </div>

  )
};

export default SimulatorApp;
