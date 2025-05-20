import { Unity, useUnityContext } from "react-unity-webgl";
import { SimulatorWebgl } from "../types/response";
import { useEffect } from "react";

export default function SimulatorUnity(props:SimulatorWebgl) {

   const { unityProvider, unload } = useUnityContext({
    loaderUrl: props.loader,
    dataUrl: props.data,
    frameworkUrl: props.framework,
    codeUrl: props.wasm,
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
  }, [unload, props]);
  
  return (
    <div className="w-full h-screen">
      <Unity className="w-full h-full" unityProvider={unityProvider} />
    </div>
  ); 
}