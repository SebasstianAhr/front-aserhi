export interface EmployeeInterface {
    nombres: string;
    apellidos: string;
    tipoIdentificacion: 'Cédula de Ciudadanía' | 'Cédula de Extranjería' | 'Pasaporte';
    identificacion: string;
    telefono: string;
    telefonoCorporativo: string;
    fechaNacimiento: string;
    direccion: string;
    municipio: string;
    eps: 'Sanitas' | 'Compensar';
    riesgosLaborales: 'Aseguradora de riesgos laborales en Popayán' | 'Positiva';
    fondoPensiones: 'Colpensiones' | 'Porvenir' | 'Colfondos' | 'Protección';
    area: 'Administración' | 'Ruta' | 'Planta' | 'Aprovechamiento';
    cargo:
      | 'Super Administrador'
      | 'Contador'
      | 'Ayudante de obra'
      | 'Contratista operario soldador armador'
      | 'Directora administrativa y financiera'
      | 'Profesional de gestión ambiental y capacitación'
      | 'Coordinador de gestión del talento humano'
      | 'Coordinador operativo'
      | 'Coordinador SGSST'
      | 'Aprendiz SENA'
      | 'Coordinador de producción'
      | 'Auxiliar de mantenimiento'
      | 'Contratista profesional SGSST'
      | 'Operario de aprovechamiento'
      | 'Coordinador del sistema de gestión integrado'
      | 'Operario de planta'
      | 'Asistente de facturación y cartera'
      | 'Conductor'
      | 'Asistente comercial'
      | 'Auxiliar de ruta'
      | 'Consultor Ambiental';
    perfil: 'Administrador' | 'Gestión Comercial' | 'Talento Humano';
    fechaIngreso: string;
    estado: 'Activo' | 'Inactivo';
    correo: string;
    password: string;
  }