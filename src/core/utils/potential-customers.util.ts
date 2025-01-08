export const potentialCustomerFields =[
  {
    name: 'tipoPersona',
    label: 'Tipo de Persona',
    type: 'select',
    options: [
      { label: 'Jurídica', value: 'juridica' },
      { label: 'Natural', value: 'natural' },
    ],
  },
  {
    name: 'tamanoClientePotencial',
    label: 'Tamaño Cliente Potencial',
    type: 'select',
    options: [
      { label: 'Grande', value: 'grande' },
      { label: 'Mediano', value: 'mediano' },
      { label: 'Pequeño', value: 'pequeno' },
    ],
  },
  {
    name: 'razonSocial',
    label: 'Razón Social',
    type: 'text',
  },
  {
    name: 'nitEmpresa',
    label: 'NIT Empresa',
    type: 'text',
  },
  {
    name: 'digitoVerificacion',
    label: 'Dígito de Verificación',
    type: 'text',
  },
  {
    name: 'tipoIdentificacionRepresentante',
    label: 'Tipo Identificación Representante',
    type: 'select',
    options: [
      { label: 'Cédula de Ciudadanía', value: 'cedulaCiudadania' },
      { label: 'Cédula de Extranjería', value: 'cedulaExtranjeria' },
      { label: 'Pasaporte', value: 'pasaporte' },
    ],
  },
  {
    name: 'identificacionRepresentante',
    label: 'Identificación Representante',
    type: 'text',
  },
  {
    name: 'nombresRepresentanteLegal',
    label: 'Nombre(s) Representante Legal',
    type: 'text',
  },
  {
    name: 'apellidosRepresentanteLegal',
    label: 'Apellido(s) Representante Legal',
    type: 'text',
  },
  {
    name: 'telefonoContacto',
    label: 'Teléfono Contacto',
    type: 'text',
  },
  {
    name: 'correoElectronicoContacto',
    label: 'Correo Electrónico Contacto',
    type: 'email',
  },
  {
    name: 'actividadEconomicaEmpresa',
    label: 'Actividad Económica Empresa',
    type: 'select',
    options: [
      { label: 'Manufactura de Productos Químicos', value: 'manufacturaProductosQuimicos' },
      { label: 'Tratamiento y Eliminación de Residuos Peligrosos', value: 'tratamientoResiduosPeligrosos' },
      { label: 'Servicios de Consultoría Ambiental', value: 'consultoriaAmbiental' },
      { label: 'Reciclaje de Metales y Plásticos', value: 'reciclajeMetalesPlasticos' },
    ],
  },
];
