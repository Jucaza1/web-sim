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
      thumbnail: "/Ascensores/Ascensores_01.webp",
      description: "Simulador de mantenimiento de ascensores"
    },
    {
        id: 3,
        name: "Veterinaria",
        thumbnail: "/Veterinaria/veterinaria.png",
        description: "Simulador de Veterinaria"
      },
      {
        id: 4,
        name: "Dentista",
        thumbnail: "/DentistaWebGL/dentista.png",
        description: "Simulador de Dentista"
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
    ],
    [
      4,
      {
        id: 4,
        loader: "/DentistaWebGL/Build/DentistaWebGL.loader.js",
        wasm: "/DentistaWebGL/Build/build.wasm",
        data: "/DentistaWebGL/Build/webgl.data",
        framework: "/DentistaWebGL/Build/build.framework.js",
        
      }
    ]
  ]);