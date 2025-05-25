// Mostrar en la lista de simuladores (nombre, descripción, etc.)
export type Sim = {
    id: number;
    name: string;
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
    { id: 1, name: "Informática Ciberseguridad" },
    { id: 2, name: "Localización Averías Eléctricas" },
    { id: 3, name: "Aire acondicionado" },
    { id: 4, name: "Presostato" },
    { id: 5, name: "Calderas" },
    { id: 6, name: "Salón de actos" },
    { id: 7, name: "Instituto virtual Medac" },
    { id: 8, name: "Clínica Dental" },
    { id: 9, name: "Agricultura" },
    { id: 10, name: "Veterinaria" },
    { id: 11, name: "Salón de ferias" },
    { id: 12, name: "Estética" },
    { id: 13, name: "Visitas virtuales" },
    { id: 14, name: "Ascensores" }
];

// Configuraciones técnicas para cargar Unity WebGL
export const simulatorConfigs = new Map<number, SimWgl>([
    [
        1,
        {
            id: 1,
            loader: "/Informática_Ciberseguridad/Build/WebGL.loader.js",
            wasm: "/Informática_Ciberseguridad/Build/build.wasm",
            data: "/Informática_Ciberseguridad/Build/webgl.data",
            framework: "/Informática_Ciberseguridad/Build/build.framework.js",
        }
    ],
    [
        2,
        {
            id: 2,
            loader: "/localizacion_averias/Build/WebGL.loader.js",
            wasm: "/localizacion_averias/Build/build.wasm",
            data: "/localizacion_averias/Build/webgl.data",
            framework: "/localizacion_averias/Build/build.framework.js",
        }
    ],
    [
        3,
        {
            id: 3,
            loader: "/Aire_Acondicionado/Build/WebGL.loader.js",
            wasm: "/Aire_Acondicionado/Build/build.wasm",
            data: "/Aire_Acondicionado/Build/webgl.data",
            framework: "/Aire_Acondicionado/Build/build.framework.js",
        }
    ],
    [
        4,
        {
            id: 4,
            loader: "/Presostato/Build/WebGL.loader.js",
            wasm: "/Presostato/Build/build.wasm",
            data: "/Presostato/Build/webgl.data",
            framework: "/Presostato/Build/build.framework.js",
        }
    ],
    [
        5,
        {
            id: 5,
            loader: "/Calderas/Build/WebGL.loader.js",
            wasm: "/Calderas/Build/build.wasm",
            data: "/Calderas/Build/webgl.data",
            framework: "/Calderas/Build/build.framework.js",
        }
    ],
    [
        6,
        {
            id: 6,
            loader: "/Salon_de_Actos/Build/WebGL.loader.js",
            wasm: "/Salon_de_Actos/Build/build.wasm",
            data: "/Salon_de_Actos/Build/webgl.data",
            framework: "/Salon_de_Actos/Build/build.framework.js",
        }
    ],
    [
        7,
        {
            id: 7,
            loader: "/Instituto_Medac/Build/WebGL.loader.js",
            wasm: "/Instituto_Medac/Build/build.wasm",
            data: "/Instituto_Medac/Build/webgl.data",
            framework: "/Instituto_Medac/Build/build.framework.js",
        }
    ],
    [
        8,
        {
            id: 8,
            loader: "/dentista/Build/WebGL.loader.js",
            wasm: "/dentista/Build/build.wasm",
            data: "/dentista/Build/webgl.data",
            framework: "/dentista/Build/build.framework.js",
        }
    ],
    [
        9,
        {
            id: 9,
            loader: "/Agricultura/Build/WebGL.loader.js",
            wasm: "/Agricultura/Build/build.wasm",
            data: "/Agricultura/Build/webgl.data",
            framework: "/Agricultura/Build/build.framework.js",
        }
    ],
    [
        10,
        {
            id: 10,
            loader: "/Veterinaria/Build/Build_webgl.loader.js",
            wasm: "/Veterinaria/Build/build.wasm",
            data: "/Veterinaria/Build/webgl.data",
            framework: "/Veterinaria/Build/build.framework.js",
        }
    ],
    [
        11,
        {
            id: 11,
            loader: "/Salon_de_Ferias/Build/WebGL.loader.js",
            wasm: "/Salon_de_Ferias/Build/build.wasm",
            data: "/Salon_de_Ferias/Build/webgl.data",
            framework: "/Salon_de_Ferias/Build/build.framework.js",
        }
    ],
    [
        12,
        {
            id: 12,
            loader: "/Estetica/Build/WebGL.loader.js",
            wasm: "/Estetica/Build/build.wasm",
            data: "/Estetica/Build/webgl.data",
            framework: "/Estetica/Build/build.framework.js",
        }
    ],
    [
        13,
        {
            id: 13,
            loader: "/Visitas_Virtuales/Build/WebGL.loader.js",
            wasm: "/Visitas_Virtuales/Build/build.wasm",
            data: "/Visitas_Virtuales/Build/webgl.data",
            framework: "/Visitas_Virtuales/Build/build.framework.js",
        }
    ],
    [
        14,
        {
            id: 14,
            loader: "/ascensores/Build/WebGL.loader.js",
            wasm: "/ascensores/Build/build.wasm",
            data: "/ascensores/Build/webgl.data",
            framework: "/ascensores/Build/build.framework.js",
        }
    ]
]);