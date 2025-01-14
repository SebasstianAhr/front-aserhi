export const fieldsForm = [
    { name: 'municipio', label: 'Municipio', type: 'text', required: true },
    { name: 'cliente', label: 'Cliente', type: 'text', required: true, defaultValue: selectedCustomer?.nombre, disabled: true },
    { name: 'medioPago', label: 'Medio de Pago', type: 'select', options: [{ label: 'Transferencia Bancaria', value: 'transferencia_bancaria' }, { label: 'Tarjeta de Crédito', value: 'tarjeta_credito' }, { label: 'PayPal', value: 'paypal' }], required: true },
    { name: 'formaPago', label: 'Forma de Pago', type: 'select', options: [{ label: 'Efectivo', value: 'efectivo' }, { label: 'Cheque', value: 'cheque' }, { label: 'Transferencia Electrónica', value: 'transferencia_electronica' }, { label: 'Pago a Plazos', value: 'pago_a_plazos' }], required: true },
    { name: 'validezPropuesta', label: 'Validez de Propuesta', type: 'date', required: true },
    { name: 'tipoIdentificacionSolicitante', label: 'Tipo de Identificación Solicitante', type: 'select', options: [{ label: 'Cédula de Ciudadanía', value: 'cedula_ciudadania' }, { label: 'Cédula de Extranjería', value: 'cedula_extranjeria' }, { label: 'Pasaporte', value: 'pasaporte' }], required: true },
    { name: 'identificacionSolicitante', label: 'Identificación de Solicitante', type: 'text', required: true },
    { name: 'correoSolicitante', label: 'Correo de Solicitante', type: 'email', required: true },
    { name: 'cargoSolicitante', label: 'Cargo Solicitante', type: 'text', required: true },
    { name: 'tipoPropuesta', label: 'Tipo de Propuesta', type: 'select', options: [{ label: 'Grande', value: 'grande' }, { label: 'Pequeña/Mediana', value: 'pequena_mediana' }, { label: 'Pacientes en Casa', value: 'pacientes_en_casa' }], required: true },
]