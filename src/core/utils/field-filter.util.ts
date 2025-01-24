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

export const fieldsFilterManagementProposals = [
    { name: 'search', label: 'Buscar', type: 'text', placeholder: 'Buscar por razón social o nombre solicitante' },
    { name: 'fechaPropuestaDesde', label: 'Fecha Propuesta Desde', type: 'date' },
    { name: 'fechaPropuestaHasta', label: 'Fecha Propuesta Hasta', type: 'date' },
    {
        name: 'estadoRevision', label: 'Estado Revisión', type: 'select', options: [
            { label: 'Pendiente', value: 'Pendiente' },
            { label: 'Aprobado', value: 'Aprobado' },
            { label: 'Rechazado', value: 'Rechazado' },
        ]
    },
    {
        name: 'estadoPropuesta', label: 'Estado Propuesta', type: 'select', options: [
            { label: 'En Proceso', value: 'En Proceso' },
            { label: 'Finalizado', value: 'Finalizado' },
        ]
    },
];

export const filterFieldsCharges = [
    { name: 'cargo', label: 'Buscar por Cargo', type: 'text' as 'text', placeholder: 'Ejemplo: Gerente' },
];

export const filterFieldsContractManagement = [
    { name: 'contratante', label: 'Contratante', type: 'text', placeholder: 'Buscar por contratante' },
    { name: 'fechaInicioDesde', label: 'Fecha de Contrato Desde', type: 'date' },
    { name: 'fechaInicioHasta', label: 'Fecha de Contrato Hasta', type: 'date' },
    {
        name: 'estadoContrato', label: 'Estado del Contrato', type: 'select', options: [
            { value: 'en revision', label: 'En Revisión' },
            { value: 'vigente', label: 'Vigente' },
            { value: 'cancelado devido a falta de fondos', label: 'Cancelado debido a falta de fondos' },
            { value: 'cancelado por fecha de vencimiento', label: 'Cancelado por fecha de vencimiento' },
            { value: 'cancelado por el cliente', label: 'Cancelado por el cliente' },
            { value: 'expirado', label: 'Expirado' },
        ]
    },
];

export const filterFieldsProfilePage = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar por nombre' },
  ];

  export   const filterFieldsWasteManagement = [
    { name: 'Residuo', label: 'Residuo', type: 'text', placeholder: 'Buscar por residuo' },
  ];