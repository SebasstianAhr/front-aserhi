export const fieldFilterEmployee = [
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

export const fieldFilterPotentialCustomer = [
    {
        name: "search",
        label: "Buscar",
        type: "text" as "text",
        placeholder: "Buscar por nombre, razón social o identificación",
    },
    {
        name: "tipoPersona",
        label: "Tipo de persona",
        type: "select" as "select",
        options: [
            { label: "Jurídica", value: "juridica" },
            { label: "Natural", value: "natural" },
        ],
    },
    {
        name: "tamanoClientePotencial",
        label: "Tamaño Cliente Potencial",
        type: "select" as "select",
        options: [
            { label: "Grande", value: "grande" },
            { label: "Mediano", value: "mediano" },
            { label: "Pequeño", value: "pequeno" },
        ],
    },
]