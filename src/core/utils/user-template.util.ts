export const formFields = [
    { name: 'nombres', label: 'Nombre(s)', type: 'text' as 'text', placeholder: 'Ingrese los nombre(s)', required: true },
    { name: 'apellidos', label: 'Apellido(s)', type: 'text' as 'text', placeholder: 'Ingrese los apellido(s)', required: true },
    {
      name: 'tipoIdentificacion', label: 'Tipo de Identificación', type: 'select' as 'select', options: [
        { label: 'Cédula de Ciudadanía', value: 'Cédula de Ciudadanía' },
        { label: 'Cédula de Extranjería', value: 'Cédula de Extranjería' },
        { label: 'Pasaporte', value: 'Pasaporte' }
      ], required: true
    },
    { name: 'identificacion', label: 'Identificación', type: 'text' as 'text', placeholder: 'Ingrese la identificación', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel' as 'tel', placeholder: 'Ingrese el teléfono', required: true },
    { name: 'telefonoCorporativo', label: 'Teléfono Corporativo', type: 'tel' as 'tel', placeholder: 'Ingrese el teléfono corporativo', required: false },
    { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date' as 'date', placeholder: 'Ingrese la fecha de nacimiento (YYYY-MM-DD)', required: true },
    { name: 'direccion', label: 'Dirección', type: 'text' as 'text', placeholder: 'Ingrese la dirección', required: true },
    { name: 'municipio', label: 'Municipio', type: 'text' as 'text', placeholder: 'Ingrese el municipio', required: true },
    {
      name: 'eps', label: 'EPS', type: 'select' as 'select', options: [
        { label: 'Sanitas', value: 'Sanitas' },
        { label: 'Compensar', value: 'Compensar' }
      ], required: true
    },
    {
      name: 'riesgosLaborales', label: 'Riesgos Laborales', type: 'select' as 'select', options: [
        { label: 'Aseguradora de riesgos laborales en Popayán', value: 'Aseguradora de riesgos laborales en Popayán' },
        { label: 'Positiva', value: 'Positiva' }
      ], required: true
    },
    {
      name: 'fondoPensiones', label: 'Fondo de Pensiones', type: 'select' as 'select', options: [
        { label: 'Colpensiones', value: 'Colpensiones' },
        { label: 'Porvenir', value: 'Porvenir' },
        { label: 'Colfondos', value: 'Colfondos' },
        { label: 'Protección', value: 'Protección' }
      ], required: true
    },
    {
      name: 'area', label: 'Área', type: 'select' as 'select', options: [
        { label: 'Administración', value: 'Administración' },
        { label: 'Ruta', value: 'Ruta' },
        { label: 'Planta', value: 'Planta' },
        { label: 'Aprovechamiento', value: 'Aprovechamiento' }
      ], required: true
    },
    {
      name: 'cargo', label: 'Cargo', type: 'select' as 'select', options: [
        { label: 'Super Administrador', value: 'Super Administrador' },
        { label: 'Contador', value: 'Contador' },
        { label: 'Ayudante de obra', value: 'Ayudante de obra' },
        { label: 'Contratista operario soldador armador', value: 'Contratista operario soldador armador' },
        { label: 'Directora administrativa y financiera', value: 'Directora administrativa y financiera' },
        { label: 'Profesional de gestión ambiental y capacitación', value: 'Profesional de gestión ambiental y capacitación' },
        { label: 'Coordinador de gestión del talento humano', value: 'Coordinador de gestión del talento humano' },
        { label: 'Coordinador operativo', value: 'Coordinador operativo' },
        { label: 'Coordinador SGSST', value: 'Coordinador SGSST' },
        { label: 'Aprendiz SENA', value: 'Aprendiz SENA' },
        { label: 'Coordinador de producción', value: 'Coordinador de producción' },
        { label: 'Auxiliar de mantenimiento', value: 'Auxiliar de mantenimiento' },
        { label: 'Contratista profesional SGSST', value: 'Contratista profesional SGSST' },
        { label: 'Operario de aprovechamiento', value: 'Operario de aprovechamiento' },
        { label: 'Coordinador del sistema de gestión integrado', value: 'Coordinador del sistema de gestión integrado' },
        { label: 'Operario de planta', value: 'Operario de planta' },
        { label: 'Asistente de facturación y cartera', value: 'Asistente de facturación y cartera' },
        { label: 'Conductor', value: 'Conductor' },
        { label: 'Asistente comercial', value: 'Asistente comercial' },
        { label: 'Auxiliar de ruta', value: 'Auxiliar de ruta' },
        { label: 'Consultor Ambiental', value: 'Consultor Ambiental' }
      ], required: true
    },
    {
      name: 'perfil', label: 'Perfil', type: 'select' as 'select', options: [
        { label: 'Administrador', value: 'Administrador' },
        { label: 'Gestión Comercial', value: 'Gestión Comercial' },
        { label: 'Talento Humano', value: 'Talento Humano' }
      ], required: true
    },
    { name: 'fechaIngreso', label: 'Fecha de Ingreso', type: 'date' as 'date', placeholder: 'Ingrese la fecha de ingreso (YYYY-MM-DD)', required: true },
    {
      name: 'estado', label: 'Estado', type: 'select' as 'select', options: [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
      ], required: true
    },
    { name: 'correo', label: 'Correo Electrónico', type: 'email' as 'email', placeholder: 'Ingrese el correo electrónico', required: true },
    { name: 'password', label: 'Contraseña', type: 'password' as 'password', placeholder: 'Ingrese la contraseña', required: true }
  ];	