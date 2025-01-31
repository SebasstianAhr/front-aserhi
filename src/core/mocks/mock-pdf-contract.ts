type ContractData = {
    contractNumber: string;
    contractType: string;
    contractor: {
      name: string;
      nit: string;
      legalRepresentative: string;
      address: string;
      phone: string;
      email: string;
    };
    contracted: {
      name: string;
      nit: string;
      legalRepresentative: string;
       idNumber:string;
      address: string;
      municipality: string;
      department: string;
      phone: string;
      email: string;
    };
    startDate: string;
    endDate: string;
    clauses: {
      first: {
        title: string;
        description: string;
      };
      second: {
        title: string;
        obligations: string[];
      };
       third: {
        title: string;
        obligations: string[];
      };
      fourth: {
        title: string;
        duration: string;
      };
      fifth: {
        title: string;
        terminationEvents: string[];
      };
      sixth: {
        title: string;
        penalties: string;
      };
      seventh?: {
          title: string;
          rates: {
              [sede: string]: {
                  municipality: string;
                  residues: string;
                  treatment: string;
                  price: string;
              }[];
          };
           additionalInfo?: string[];
      };
      eighth: {
        title: string;
        paymentTerms: string;
          additionalInfo?:string[];
      };
       ninth?: {
        title: string;
        dataHandlingAuthorization: string;
       };
      tenth?: {
        title:string;
        disputeResolution:string;
      };
      eleventh?: {
          title: string;
          contractorIndependence:string;
      }
      twelfth?: {
          title: string;
          confidentiality: string;
      }
      thirteenth?:{
          title:string;
          applicableLaw:string;
      }
    };
      contractorSignature: {
          name: string;
          legalRepresentative: string;
           idNumber:string;
          companyName: string;
    };
     contractedSignature: {
          name: string;
          legalRepresentative: string;
           idNumber:string;
          companyName: string;
    };
  };
  
  
 export const combinedContractDataMock: ContractData = {
    contractNumber: "R-GCL005 No. 4",
    contractType: "CONTRATO DE SERVICIO DE GESTION EXTERNA DE RESIDUOS PELIGROSOS",
    contractor: {
      name: "ASERHI S.A.S. E.S.P.",
      nit: "830.502.145-5",
      legalRepresentative: "YHON ELKIN GIRALDO ARISTIZABAL",
      address: "CALLE 16N No.7-69 BARRIO EL RECUERDO, POPAYÁN",
      phone: "3148908132",
      email: "comercial.aserhi@hotmail.com",
    },
    contracted: {
      name: "Medicina Domiciliaria DE Colombia SAS",
      nit: "1002953456",
      legalRepresentative: "Juan Angulo",
      idNumber: "123.456.789",
      address: "Carrera 9 # 5-23 - Barrio lomas de Granada",
      municipality: "Popayán",
      department: "Cauca",
      phone: "3173394856",
      email: "medina@gmail.com",
    },
    startDate: "13 septiembre de 2024",
    endDate: "21 septiembre de 2024",
    clauses: {
      first: {
        title: "PRIMERA : OBJETO",
        description:
          "El presente contrato tiene como finalidad la prestación del Servicio Especial de Aseo en el componente de la Gestión Externa, que comprende recolección, transporte, tratamiento y disposición final de residuos peligrosos industriales sólidos y/o líquidos.",
      },
      second: {
        title: "SEGUNDA: OBLIGACIONES DEL CONTRATISTA",
        obligations: [
          "Recolectar, transportar, incinerar y disponer finalmente de manera segura, los residuos peligrosos industriales y/o similares de conformidad a las frecuencias pactadas entre las partes de: 4 veces por mes para la sede ubicada en la dirección Carrera 9 # 5-23 - Barrio lomas de Granada del Municipio de Popayán Departamento del Cauca, 1 vez por mes para la sede ubicada en la dirección Principal Bio del Municipio de Popayán Departamento del Cauca",
          "Entregar registros de control de pesaje, los cuales serán manejados conjuntamente con la persona responsable de las entregas de los residuos.",
          "Facturar el servicio prestado en forma detallada de acuerdo a los registros de recolección y la información suministrada por EL CONTRATANTE.",
          "Suministrar a solicitud del contratante los registros y licencias sanitarias y ambientales a que está obligado el contratista como empresa de servicios",
          "Asesorar al personal en el manejo de residuos mediante capacitación y/o acompañamiento presencial, virtual o telefónico, siempre y cuando el contratante realice dicha solicitud vía e-mail, correo físico o telefónicamente y se encuentre a paz y salvo en cartera, el CONTRATISTA certificando individualmente la participación.",
          "Garantizar la seguridad en el transporte, conforme a lo dispuesto por los Ministerios de Salud y Transporte o la entidad competente, estableciendo rutas y horarios para tal fin.",
          "Garantizar la correcta disposición final de las cenizas producto del proceso de incineración de los residuos, en sitio aprobado para tal fin, por las autoridades competentes.",
          "Brindar oportuno mantenimiento de los vehículos y equipos auxiliares destinados al servicio, para garantizar permanencia en las frecuencias e intensidad y coberturas de emergencia que se pudieran presentar.",
          "Otorgar un certificado de prestación de servicios que sustentara ante las autoridades que corresponda, el correcto manejo y disposición final de los residuos previa solicitud del cliente.",
          "Otorgar al contratante un acta de destrucción o recuperación de los residuos.",
          "Mantener una relación humana de óptima calidad con los dependientes de cada uno de los puntos de generación del contratante.",
           "Presentar la factura de venta dentro del mes siguiente a la prestación del servicio o de acuerdo con lo establecido en la propuesta, detallando la cantidad de residuos recogidos en kilogramos, la fecha, el sitio, el municipio o población de recolección en concordancia con la planilla de control que para tal efecto suministra el contratista.",
        ],
      },
      third: {
        title: "TERCERA: OBLIGACIONES DEL CONTRATANTE",
        obligations: [
          "Clasificar y almacenar temporalmente, conforme a lo dispuesto en la legislación sanitaria, los residuos en bolsas de colores, calibres y densidades determinadas para tal fin, facilitando así el proceso de recolección, almacenamiento, transporte y disposición final de los desechos, garantizando la seguridad del personal de recolección",
          "Actualizar mediante documento escrito o correo electrónico cada vez que sea necesario cambio de representante legal, dirección, teléfono, cierre de sucursales o sedes, suspensión del contrato, modificación de la frecuencia de recolección y demás información que conlleve a la modificación del presente contrato.",
          "Acatar las sugerencias presentadas por EL CONTRATISTA sobre el manejo de residuos especiales.",
          "No depositar sustancias en bolsas diferentes a las señaladas para cada uno de los residuos.",
           "Especificar si hay producto explosivo, radioactivo o con alto contenido de plomo o metales pesados dentro de ellas pues de no hacerlo, todo riesgo y consecuencias correrán por cuenta y responsabilidad del contratante, de conformidad con lo establecido en la Ley 430 de 1998 así como en aquellas normas que la adicionen o modifiquen.",
          "Pagar dentro del periodo estipulado las facturas; el no pago de tres facturas consecutivas por parte del contratante merecerá el retiro de certificado de vinculación y suspensión del servicio y anunciado a la unidad ejecutora de salud respectiva y/o a la autoridad competente del caso.",
          "Seleccionar el funcionario de la institución para la entrega de los residuos, quién deberá firmar el registro de control y peso de residuos en el momento de la entrega.",
        ],
      },
      fourth: {
        title: "CUARTA: DURACIÓN",
        duration: "8 días , contados a partir de la fecha de suscripción de este documento.",
      },
      fifth: {
        title: "QUINTA.- TERMINACIÓN DEL CONTRATO",
        terminationEvents: [
          "Por mutuo acuerdo.",
          "Por incumplimiento de las obligaciones contraídas en el presente contrato.",
          "Cuando el usuario no presente los residuos en la forma pactada.",
        ],
      },
      sixth: {
        title: "SEXTA.- MULTAS",
        penalties:
          "En caso de que alguna de las partes, incumpliera alguna de las obligaciones asumidas, pagará a la parte cumplida o que se haya allanado a cumplir, a título de pena, una suma equivalente al valor de lo que restare de vigencia del contrato calculado con el cargo básico establecido en la cláusula SEPTIMA. La exigencia y pago de la pena establecida en el inciso anterior no extinguirá las obligaciones principales derivadas del presente contrato; en consecuencia, el pago de la pena no excluirá la facultad que tienen las partes, para hacer exigible las obligaciones a cargo de la otra. Así mismo, el pago de la pena no excluirá la reclamación por la indemnización de los perjuicios a que hubiere lugar, según lo establecido en el artículo 1.600 del Código Civil o en aquellas normas que lo sustituyan o modifiquen. Cuando el CONTRATISTA incurra en el manejo inadecuado de los residuos o no lo realice deberá cancelar una multa equivalente a la estimada al contratante.",
      },
        seventh: {
          title: "SEPTIMA: TARIFAS",
          rates: {
            "Sede Principal Popayán": [
              {
                municipality: "Popayán",
                residues: "Aceite de Cocina, liquido Ficajador, Llantas",
                treatment: "Aprovechamiento",
                price: "$ 6.000 por kg",
              },
              {
                municipality: "Popayán",
                residues: "Peroxido",
                treatment: "Dilución/Incineración",
                price: "$ 3.200 por kg",
              },
               {
                municipality: "Popayán",
                residues: "Aceite Usado de Motores de Caja, Anatomopatologico",
                treatment: "Incineración",
                price: "$ 6.000 por cargo básico para una generación entre 0 y 10 kg y $ 45.000 por kg adicional",
              },
            ],
              "Sede de Los patos Popayán": [
              {
                   municipality: "Popayán",
                residues: "Carton, Lodos, Tierra, Arena, Aserrin, Contaminada con Hidrocarburos, Papel",
                treatment: "Aprovechamiento",
                price: "$ 4.500 por kg",
              },
               ],
  
          },
            additionalInfo: [
               "Este valor será sostenido sin variación por la duración del contrato.",
               "Este valor podrá incrementarse con excepciones de fuerza mayor ocasionadas por incrementos repentinos de los combustibles o nuevas determinaciones legales que afecten radicalmente los costos operativos."
            ]
        },
      eighth: {
        title: "OCTAVA: FORMA DE PAGO",
        paymentTerms:
          "El Contratante deberá cancelar el valor de la factura en los treinta (30) días siguientes a la fecha de presentación de las misma, mediante consignación o transferencia electrónica que podrá efectuarse en la cuenta de ahorros Nº 251291944 del Banco de AV Villas a nombre de ASERHI S.A.S E.S.P. y enviar fotocopia del soporte a los siguientes correos electrónicos aserhiesp@hotmail.com y cartera.aserhi@hotmail.com o pagos en efectivo al personal autorizado por la empresa.",
        additionalInfo:[
          "En caso de mora en el pago, EL CONTRATANTE reconocerá un interés moratorio mensual conforme a lo establecido en derecho comercial."
        ]
      },
         ninth:{
            title: "PARAGRAFO SEGUNDO: AUTORIZACIÓN DE MANEJO, CONSULTA Y REPORTE DE DATOS",
            dataHandlingAuthorization: "En cumplimiento de la Ley 1581 de 2012 y su decreto reglamentario 1377 de 2013, le informamos que usted tiene derecho de conocer, actualizar, rectificar y solicitar la suspensión de sus datos personales en cualquier momento y Autoriza a ASERHI S.A.S E.S.P.; para el tratamiento y manejo de sus datos personales el cual consiste en recolectar, almacenar, depurar, usar, analizar, circular, actualizar y cruzar información propia, con el fin de facilitar la compra y venta de productos, bienes y / o prestación de servicios, ejercer las gestiones de cobro cuando corresponda. ASERHI S.A.S E.S.P. tomara las medidas necesarias para asegurar la confidencialidad y seguridad de los datos personales. Además de sus nombres, apellidos y documento de identidad, los datos personales que se someten a tratamiento son: Razón Social, NIT, Dirección, Teléfono Fijo, Celular, E-mail, Cargo, Ciudad, PARÁGRAFO 1. Declaro que soy responsable de la veracidad de los datos suministrados. Así mismo autorizo a ASERHI S.A.S E.S.P.; efectuar sus procedimientos de notificación y comunicación a la dirección de correspondencia y/o correo electrónico antes mencionados. Declaro que he sido informado de los derechos que me asisten como titular y de la identificación, dirección y teléfono del responsable del tratamiento de mis datos de conformidad con la Ley 1581 de 2012. PARÁGRAFO 2. Autorizo a ASERHI S.A.S. E.S.P, para consultar y reportar, en cualquier tiempo, en centrales de información de riesgo, toda la información relevante para conocer mi desempeño como deudor, mi capacidad de pago o para valorar el riesgo futuro para concederme un crédito o servicio."
         },
      tenth:{
           title: "NOVENA SOLUCIÓN DE DIFERENCIAS",
           disputeResolution:"Toda controversia o diferencia relativa a este convenio, incluidas las que se refieren a la etapa pre-contractual y a su terminación, se resolverán por un Tribunal de Arbitramento, que se sujetará al reglamento institucional del Centro de Arbitraje de la Cámara de Comercio de Popayán."
         },
      eleventh:{
            title: "DECIMA INDEPENDENCIA DEL CONTRATANTE",
            contractorIndependence:"EL CONTRATISTA actuará por su propia cuenta, con absoluta autonomía e independencia, no estará sometido a subordinación laboral con EL CONTRATANTE. Los derechos de EL CONTRATANTE se limitarán, de acuerdo con la naturaleza del contrato, a exigir el cumplimiento de las obligaciones. Queda claramente entendido que no existirá relación laboral alguna entre EL CONTRATANTE y EL CONTRATISTA, no existe entre las PARTES poder, autoridad o derecho alguno para asumir o crear obligaciones diferentes a las establecida en este contrato. EL CONTRATISTA en desarrollo del presente contrato utilizará su propio personal certificado, seleccionado, contratado y remunerado con autonomía e independencia de EL CONTRATANTE; personal calificado como garantía del servicio. PARÁGRAFO: Las PARTES convienen de manera expresa, que las obligaciones que asuma EL CONTRATISTA con terceras personas subcontratadas o profesionales en áreas compatibles con las obligaciones de EL CONTRATISTA para atender asuntos relacionados directa o indirectamente con el objeto de este contrato, serán de su exclusivo cargo, riesgo y responsabilidad, en el aspecto laboral, pagos de honorarios, responsabilidad por contratación, prestaciones y parafiscales en general, sin que el cumplimiento de las mismas puedan demandarse de EL CONTRATANTE, siendo contratistas independientes y ejerciendo labores extrañas y ajenas a las de EL CONTRATANTE conforme al artículo 34 del Código Sustantivo de Trabajo, por lo tanto no existe ningún tipo de solidaridad"
         },
      twelfth:{
        title: "DECIMA PRIMERA: CONFIDENCIALIDAD",
        confidentiality:"las partes mantendrán la confidencialidad de los datos e información intercambiados entre ellas, incluyendo información objeto de derechos de autor, patentes, técnicas, modelos, invenciones, know-how, procesos, algoritmos, programas, ejecutables, investigaciones, detalles de diseño, dibujos, planos, cálculos, manuales de procesos, información financiera, lista de clientes, inversionistas, empleados, relaciones de negocios y contractuales, pronósticos de negocios, planes de mercadeo e cualquier información revelada sobre terceras personas y cualquiera otra información relativa e inherente a las labores ejecutadas por causa del desarrollo y ejecución del presente contrato"
      },
      thirteenth: {
        title: "DECIMA SEGUNDA: REGIMEN APLICABLE",
        applicableLaw: "EL CONTRATISTA obra bajo autonomía en la recolección, transporte, Incineración o tratamiento de alta eficiencia y disposición final de los residuos. Igualmente este contrato se regirá por las normas, ambientales, civiles y comerciales de la legislación colombiana aplicable a la materia."
      }
    },
      contractorSignature: {
          name: "YHON ELKIN GIRALDO ARISTIZABAL",
          legalRepresentative: "Representante Legal",
           idNumber:"9.858.979",
          companyName: "ASERHI S.A.S E.S.P",
    },
     contractedSignature: {
          name: "Juan Angulo",
          legalRepresentative: "Representante Legal",
           idNumber:"123.456.789",
          companyName: "Medicina Domiciliaria DE Colombia SAS",
    },
  };
  
  
export  const combinedContractDataHospitalarioMock: ContractData = {
    contractNumber: "R-GCL005 No. 3",
    contractType:
      "CONTRATO DE SERVICIO DE GESTIÓN EXTERNA DE RESIDUOS PELIGROSOS HOSPITALARIOS Y SIMILARES",
    contractor: {
      name: "ASERHI S.A.S. E.S.P.",
      nit: "830.502.145-5",
      legalRepresentative: "YHON ELKIN GIRALDO ARISTIZABAL",
      address: "CALLE 16N No.7-69 BARRIO EL RECUERDO, POPAYÁN",
      phone: "3148908132",
      email: "comercial.aserhi@hotmail.com",
    },
    contracted: {
      name: "Compañía de Inversión y Desarrollo del Sector Rural y de Servicios",
      nit: "1002953841",
      legalRepresentative: "Aldair torres",
        idNumber: "1.058.964.787",
      address: "carrera 9",
      municipality: "Popayán",
      department: "Cauca",
      phone: "3173394856",
      email: "aldair@aldair.com",
    },
    startDate: "14 septiembre de 2024",
    endDate: "21 septiembre de 2024",
    clauses: {
      first: {
        title: "PRIMERA : OBJETO",
        description:
          "El presente contrato tiene como finalidad la prestación del Servicio Especial de Aseo en el componente de la Gestión Externa, que comprende recolección, transporte, almacenamiento, tratamiento y disposición final de residuos peligrosos (hospitalarios y similares).",
      },
      second: {
        title: "SEGUNDA. - OBLIGACIONES DEL CONTRATISTA",
        obligations: [
          "Recoger los residuos hospitalarios y similares de conformidad a las frecuencias pactadas entre las partes; en la sede(s) ubicada(s) en: 1 vez por mes para la sede ubicada en la dirección carrera 9 del Municipio de Popayán Departamento del Cauca, y demás municipios del Departamento del Cauca, incluidos dentro de la cobertura del CONTRATISTA; de acuerdo con el listado actualizado y al reporte de novedades enviada por EL CONTRATANTE.",
          "recoger los residuos generados por paciente según las frecuencias establecidas en la Cláusula Séptima de este contrato dependiendo los itinerarios establecidos internamente por el CONTRATISTA para cada municipio, según sea el caso.",
          "Transportar, almacenar, hacer tratamiento térmico (incineración) y disponer finalmente de manera segura, los residuos hospitalarios y similares de conformidad a la legislación ambiental y sanitaria vigentes.",
          "Entregar los registros de control y peso al personal responsable de la entrega de los residuos en la sede y en el domicilio de cada paciente.",
          "Facturar el servicio prestado en forma detallada de acuerdo con los registros de control y peso y la información suministrada por EL CONTRATANTE.",
          "Suministrar a solicitud del CONTRATANTE los registros y licencias sanitarias y ambientales a que está obligado EL CONTRATISTA como empresa de servicios.",
          "Asesorar al personal en el manejo de residuos mediante capacitación y/o acompañamiento presencial, virtual o telefónico, siempre y cuando EL CONTRATANTE realice dicha solicitud vía e-mail, correo físico o telefónicamente y se encuentre a paz y salvo en cartera, EL CONTRATISTA certificara individualmente la participación.",
           "Garantizar la seguridad en el transporte, conforme a lo dispuesto por los Ministerios de Salud y Transporte o la entidad competente, estableciendo las rutas para tal fin.",
          "Garantizar la correcta disposición final de las cenizas producto del proceso de incineración de los residuos, en sitio aprobado para tal fin, por las autoridades competentes.",
          "Brindar oportuno mantenimiento de los vehículos y equipos auxiliares destinados al servicio, para garantizar permanencia en las frecuencias e intensidad y coberturas de emergencia que se pudieran presentar.",
           "Otorgar al CONTRATANTE un certificado de tratamiento de los residuos.",
          "Mantener una relación humana de óptima calidad con los dependientes de cada uno de los puntos de generación de CONTRATANTE.",
            "Presentar la factura de venta dentro del mes siguiente a la prestación del servicio detallando la cantidad de residuos recogidos en kilogramos, la fecha, el sitio, el municipio o población de recolección en concordancia con la planilla de control que para tal efecto suministra EL CONTRATISTA.",
        ],
      },
      third: {
        title: "TERCERA. -OBLIGACIONES DEL CONTRATANTE",
        obligations: [
          "Clasificar los residuos generados según los establecido en la Resolución 1164 de 2002 y Decreto 351 de 2014.",
          "enviar al correo rutas.aserhi@hotmail.com el jueves de cada semana el reporte de novedades (cambio de domicilio, retiro del paciente, cambio de frecuencia, cambio de teléfono, hospitalización del paciente, reintegro del paciente, muerte del paciente, ingreso de paciente) según el formato establecido.",
          "Almacenar los residuos hospitalarios y similares en bolsas de color rojo, calibres y densidades determinadas para tal fin.",
            "Rotular las bolsas con nombre de la institución o entidad, nombre del paciente tipo de residuo y anudarlas con el fin de evitar derrames.",
           "Almacenar los residuos con características cortopunzantes como agujas, bisturí, lancetas entre otros en recipientes plásticos (guardianes), una vez cumplan su capacidad (¾ partes) sellar la tapa, colocar en bolsa de color rojo y rotular.",
          "Almacenar los residuos Líquidos en recipientes plásticos rígidos, con tapa y rotular según el tipo de residuo.",
          "Almacenar los residuos en la Unidad de Almacenamiento Temporal o Interno, conforme a lo dispuesto en la legislación sanitaria y ambiental, facilitando así el proceso de recolección, almacenamiento, transporte, tratamiento y disposición final de los residuos, garantizando la seguridad y salud del personal que los manipula.",
          "Especificar si hay producto o residuo explosivo, radioactivo o con alto contenido de plomo o metales pesados dentro de ellas pues de no hacerlo, todo riesgo y consecuencias correrán por cuenta y responsabilidad del CONTRATANTE, de conformidad con lo establecido en la Ley 430 de 1998 así como en aquellas normas que la adicionen o modifiquen.",
          "Asignar un funcionario de la institución para la entrega de los residuos, quién deberá firmar el registro de control y peso de residuos en el momento de la entrega.",
          "Acatar las sugerencias presentadas por EL CONTRATISTA sobre el manejo de residuos especiales.",
          "Actualizar mediante documento escrito o correo electrónico cada vez que sea necesario cambio de representante legal, dirección, teléfono, cierre de sucursales o sedes, suspensión del contrato, modificación de la frecuencia de recolección y demás información que conlleve a la modificación del presente contrato.",
          "Pagar dentro del periodo estipulado las facturas; el no pago de tres facturas consecutivas por parte del CONTRATANTE merecerá la suspensión del servicio.",
        ],
      },
      fourth: {
        title: "CUARTA. - DURACIÓN",
        duration: "7 días, contados a partir de la fecha de suscripción de este documento.",
      },
      fifth: {
        title: "QUINTA. - TERMINACIÓN DEL CONTRATO",
        terminationEvents: [
          "Por mutuo acuerdo.",
          "Por incumplimiento de las obligaciones contraídas en el presente contrato.",
          "Cuando el usuario no presente los residuos en la forma pactada.",
        ],
      },
      sixth: {
        title: "SEXTA. - MULTAS",
        penalties:
          "En caso de que alguna de las partes, incumpliera alguna de las obligaciones asumidas, pagará a la parte cumplida o que se haya allanado a cumplir, a título de pena, una suma equivalente al valor de lo que restare de vigencia del contrato calculado con el cargo básico establecido en la cláusula SÉPTIMA. La exigencia y pago de la pena establecida en el inciso anterior no extinguirá las obligaciones principales derivadas del presente contrato; en consecuencia, el pago de la pena no excluirá la facultad que tienen las partes, para hacer exigible las obligaciones a cargo de la otra. Así mismo, el pago de la pena no excluirá la reclamación por la indemnización de los perjuicios a que hubiere lugar, según lo establecido en el artículo 1.600 del Código Civil o en aquellas normas que lo sustituyan o modifiquen. Cuando el CONTRATISTA incurra en el manejo inadecuado de los residuos o no lo realice deberá cancelar una multa equivalente a la estimada al CONTRATANTE.",
      },
      seventh: {
        title: "SÉPTIMA. - TARIFAS Y FRECUENCIA DE RECOLECCIÓN",
        rates: {
            "Sede Principal del Bordo La Economia Popayán": [
            {
                municipality: "Popayán",
                residues: "Aceite de Cocina",
                treatment: "Aprovechamiento",
                price: "$ 4.500 por kg",
            },
              {
                  municipality: "Popayán",
                  residues: "Animales",
                  treatment: "Incineración",
                  price: "$ 5.600 por cargo básico para una generación entre 0 y 10 kg y $ 50.000 por kg adicional",
              },
             ],
        },
          additionalInfo: [
              "Este valor será sostenido sin variación por la duración del contrato.",
              "Este valor podrá incrementarse con excepciones de fuerza mayor ocasionadas por incrementos repentinos de los combustibles o nuevas determinaciones legales que afecten radicalmente los costos operativos."
          ]
      },
      eighth: {
        title: "OCTAVA.- FORMA DE PAGO",
        paymentTerms:
          "EL CONTRATANTE deberá cancelar el valor de la factura en los treinta (30) días siguientes a la fecha de presentación de las misma, mediante consignación o transferencia electrónica que podrá efectuarse en la cuenta de ahorros Nº 251291944 del Banco de AV Villas a nombre de ASERHI S.A.S E.S.P y enviar fotocopia del soporte a los siguientes correos electrónicos cartera.aserhi@hotmail.com o pagos en efectivo y/o cheque al personal autorizado por la empresa.",
           additionalInfo:[
          "En caso de mora en el pago, EL CONTRATANTE reconocerá un interés moratorio mensual conforme a lo establecido en derecho comercial"
        ]
      },
      ninth: {
        title: "NOVENA. - AUTORIZACIÓN DE MANEJO, CONSULTA Y REPORTE DE DATOS",
        dataHandlingAuthorization:
          "En cumplimiento de la Ley 1581 de 2012 y su decreto reglamentario 1377 de 2013, las partes tienen derecho de conocer, actualizar, rectificar y solicitar la suspensión de sus datos personales en cualquier momento y Autoriza EL CONTRATANTE al CONTRATISTA y EL CONTRATISTA al CONTRATANTE; para el tratamiento y manejo de sus datos personales el cual consiste en recolectar, almacenar, depurar, usar, analizar, circular, actualizar y cruzar información propia, con el fin de facilitar la compra y venta de productos, bienes y/o prestación de servicios, ejercer las gestiones de cobro cuando corresponda. Las partes tomaran las medidas necesarias para asegurar la confidencialidad y seguridad de los datos personales. Además de sus nombres, apellidos y documento de identidad, los datos personales que se someten a tratamiento son: Razón Social, NIT, Dirección, Teléfono Fijo, Celular, E-mail, Cargo, Ciudad, PARÁGRAFO PRIMERO: Tanto EL CONTRATANTE como EL CONTRATISTA declaramos que somos responsables de la veracidad de los datos suministrados. Así mismo autorizamos; efectuar los procedimientos de notificación y comunicación a la dirección de correspondencia y/o correo electrónico antes mencionados. Declaro que he sido informado de los derechos que me asisten como titular y de la identificación, dirección y teléfono del responsable del tratamiento de mis datos de conformidad con la Ley 1581 de 2012. PARÁGRAFO SEGUNDO: Las partes autorizan para consultar y reportar, en cualquier tiempo, en centrales de información de riesgo, toda la información relevante para conocer su desempeño como deudor, capacidad de pago o para valorar el riesgo futuro para concederme un crédito o servicio.",
      },
        tenth:{
            title: "DECIMA. - SOLUCIÓN DE DIFERENCIAS",
            disputeResolution:"Toda controversia o diferencia relativa a este convenio, incluidas las que se refieren a la etapa precontractual y a su terminación, se resolverán inicialmente de manera directa y en caso de no llegar a un acuerdo se acudirá a un centro de conciliación de la Ciudad de Popayán y de no resolver las diferencias con los mecanismos de solución de conflictos, se podrá acudir a las instancias judiciales."
         },
      eleventh:{
            title: "DECIMA PRIMERA. - INDEPENDENCIA DEL CONTRATANTE",
            contractorIndependence:"El CONTRATISTA actuará por su propia cuenta, con absoluta autonomía e independencia, no estará sometido a subordinación laboral con EL CONTRATANTE. Los derechos de EL CONTRATANTE se limitarán, de acuerdo con la naturaleza del contrato, a exigir el cumplimiento de las obligaciones. Queda claramente entendido que no existirá relación laboral alguna entre EL CONTRATANTE y EL CONTRATISTA, no existe entre las PARTES poder, autoridad o derecho alguno para asumir o crear obligaciones diferentes a las establecida en este contrato. EL CONTRATISTA en desarrollo del presente contrato utilizará su propio personal certificado, seleccionado, contratado y remunerado con autonomía e independencia de EL CONTRATANTE; personal calificado como garantía del servicio. PARÁGRAFO PRIMERO: Las PARTES convienen de manera expresa, que las obligaciones que asuma EL CONTRATISTA con terceras personas subcontratadas o profesionales en áreas compatibles con las obligaciones de EL CONTRATISTA para atender asuntos relacionados directa o indirectamente con el objeto de este contrato, serán de su exclusivo cargo, riesgo y responsabilidad, en el aspecto laboral, pagos de honorarios, responsabilidad por contratación, prestaciones y parafiscales en general, sin que el cumplimiento de las mismas puedan demandarse de EL CONTRATANTE, siendo contratistas independientes y ejerciendo labores extrañas y ajenas a las de EL CONTRATANTE conforme al artículo 34 del Código Sustantivo de Trabajo, por lo tanto no existe ningún tipo de solidaridad."
         },
         twelfth:{
             title: "DECIMA SEGUNDA.- CONFIDENCIALIDAD",
             confidentiality:"las PARTES mantendrán la confidencialidad de los datos e información intercambiados entre ellas, incluyendo información objeto de derechos de autor, patentes, técnicas, modelos, invenciones, know-how, procesos, algoritmos, programas, ejecutables, investigaciones, detalles de diseño, dibujos, planos, cálculos, manuales de procesos, información financiera, lista de clientes, inversionistas, empleados, relaciones de negocios y contractuales, pronósticos de negocios, planes de mercadeo e cualquier información revelada sobre terceras personas y cualquiera otra información relativa e inherente a las labores ejecutadas por causa del desarrollo y ejecución del presente contrato."
         },
         thirteenth:{
             title:"DECIMA TERCERA. - RÉGIMEN APLICABLE",
             applicableLaw:"EL CONTRATISTA obra bajo autonomía en la recolección, transporte, almacenamiento, tratamiento de alta eficiencia y disposición final de los residuos. Igualmente, este contrato se regirá por las normas, ambientales, civiles y comerciales de la legislación colombiana aplicable a la materia."
         }
    },
      contractorSignature: {
          name: "YHON ELKIN GIRALDO ARISTIZABAL",
          legalRepresentative: "Representante Legal",
           idNumber:"9.858.979",
          companyName: "ASERHI S.A.S E.S.P",
    },
     contractedSignature: {
          name: "Aldair torres",
          legalRepresentative: "Representante Legal",
           idNumber:"1.058.964.787",
          companyName: "Compañía de Inversión y Desarrollo del Sector Rural y de Servicios",
    },
  };