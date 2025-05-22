import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
interface SimulatorWebgl {
    loader: string
    data: string
    framework: string
    wasm: string
}
const SimulatorUnity  = (sim:SimulatorWebgl) => {

  const { unityProvider, unload, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: sim.loader,
    dataUrl: sim.data,
    frameworkUrl: sim.framework,
    codeUrl: sim.wasm,
    companyName: "MiEmpresa",
    productVersion: "1.0",
    productName: "Simulador",
  });
    const loadingPercentage = Math.round(loadingProgression * 100)

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

  // return (
    // <div className="w-full h-screen">
    //   <Unity className="w-full h-full" unityProvider={unityProvider} />
    // </div>
  // );
  return (
    <div className="size-full">
      {isLoaded === false && (
        // We'll conditionally render the loading overlay if the Unity
        // Application is not loaded.
        <div className="text-5xl">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity className="size-full" unityProvider={unityProvider} />
    </div>
  )
}

export default SimulatorUnity;

