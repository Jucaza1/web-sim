import { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
interface SimulatorWebgl {
    loader: string
    data: string
    framework: string
    wasm: string
}
const SimulatorUnity  = (sim:SimulatorWebgl) => {

  const { unityProvider, unload } = useUnityContext({
    loaderUrl: sim.loader,
    dataUrl: sim.data,
    frameworkUrl: sim.framework,
    codeUrl: sim.wasm,
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
  }, [unload,sim]);

  return (
    <div className="w-full h-screen">
      <Unity className="w-full h-full" unityProvider={unityProvider} />
    </div>
  );
}

export default SimulatorUnity;

