export const fieldFilter = [
    {
        name: "search",
        label: "Buscar",
        type: "text" as "text",
        placeholder: "Buscar por nombre, apellido o identificación",
    },
    {
        name: "cargo",
        label: "Cargo",
        type: "select" as "select",
        options: [
            { label: "Super Administrador", value: "Super Administrador" },
            { label: "Conductor", value: "Conductor" },
            { label: "Ayudante de obra", value: "Ayudante de obra" },
        ],
    },
    {
        name: "estado",
        label: "Estado",
        type: "select" as "select",
        options: [
            { label: "Activo", value: "Activo" },
            { label: "Inactivo", value: "Inactivo" },
        ],
    },
];