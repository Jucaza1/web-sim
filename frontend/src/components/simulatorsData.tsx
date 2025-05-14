// Mostrar en la lista de simuladores (nombre, descripción, etc.)
export type Sim = {
    id: number;
    name: string;
    thumbnail: string;
    description: string;
  };
  
  // Configuración del simulador WebGL
  export type SimWgl = {
    id: number;
    loader: string;
    wasm: string;
    data: string;
    framework: string;
    
  };
  
  // Lista de simuladores disponibles
  export const simulators: Sim[] = [
    {
      id: 1,
      name: "Electricidad",
      thumbnail: "/Electricidad/electricidad.png",
      description: "Simulador para pruebas Eléctricas"
    },
    {
      id: 2,
      name: "Ascensores",
      thumbnail: "/Ascensores/ascensor.png",
      description: "Simulador de mantenimiento de ascensores"
    },
    {
        id: 3,
        name: "Veterinaria",
        thumbnail: "/Veterinaria/veterinaria.png",
        description: "Simulador de Veterinaria"
      }
  ];
  
  // Configuraciones técnicas para cargar Unity WebGL
  export const simulatorConfigs = new Map<number, SimWgl>([
    [
      1,
      {
        id: 1,
        loader: "/Electricidad/Build/WebGL.loader.js",
        wasm: "/Electricidad/Build/build.wasm",
        data: "/Electricidad/Build/webgl.data",
        framework: "/Electricidad/Build/build.framework.js",
        
      }
    ],
    [
      2,
      {
        id: 2,
        loader: "/Ascensores/Build/WebGL.loader.js",
        wasm: "/Ascensores/Build/build.wasm",
        data: "/Ascensores/Build/webgl.data",
        framework: "/Ascensores/Build/build.framework.js",
        
      }
    ],
    [
      3,
      {
        id: 3,
        loader: "/Veterinaria/Build/Build_webgl.loader.js",
        wasm: "/Veterinaria/Build/build.wasm",
        data: "/Veterinaria/Build/webgl.data",
        framework: "/Veterinaria/Build/build.framework.js",
        
      }
    ]
  ]);