export interface PotentialCustomer {
    id: string;
    tipoPersona: string;
    tamanoClientePotencial: string;
    razonSocial: string;
    nitEmpresa: string;
    digitoVerificacion: string;
    tipoIdentificacionRepresentante: string;
    identificacionRepresentante: string;
    nombresRepresentanteLegal: string;
    apellidosRepresentanteLegal: string
    telefonoContacto: string
    correoElectronicoContacto: string
    actividadEconomicaEmpresa: string
}

export interface PotentialCustomerFormInputs {
    id: string;
    tipoPersona: string;
    nombresRepresentanteLegal: string;
    razonSocial: string;
    telefonoContacto: string;
    correoElectronicoContacto: string;
    tamanoClientePotencial: string;
}