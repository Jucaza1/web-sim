import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSearchParams } from "react-router-dom";
import { simulatorConfigs } from "../components/simulatorsData";

const SimulatorApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const config = simulatorConfigs.get(id);

  if (!config) {
    return <div>No se encontró configuración para el simulador seleccionado</div>;
  }

  const { unityProvider, unload } = useUnityContext({
    loaderUrl: config.loader,
    dataUrl: config.data,
    frameworkUrl: config.framework,
    codeUrl: config.wasm,
    companyName: "MiEmpresa",
    productVersion: "1.0",
    productName: "Simulador",
  });

useEffect(() => {
    return () => {
      unload()
        .then(() => {
          console.log("Simulador Unity descargado correctamente");
        })
        .catch((e) => {
          console.error("Error al descargar Unity:", e);
        });
    };
  }, [unload]);
  
  return (
    <div className="w-full h-screen">
      <Unity className="w-full h-full" unityProvider={unityProvider} />
    </div>
  );
};

export default SimulatorApp;