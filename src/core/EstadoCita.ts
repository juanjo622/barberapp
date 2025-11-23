export interface EstadoCita {
  confirmar(): void;
  cancelar(): void;
  iniciar(): void;
  finalizar(): void;
  getNombre(): string;
  getColor(): string;
  getAccionesPermitidas(): string[];
}

export class EstadoPendiente implements EstadoCita {
  confirmar() { /* Solo cambia el estado, sin lógica adicional */ }
  cancelar() { /* Solo cambia el estado, sin lógica adicional */ }
  iniciar() { throw new Error("No se puede iniciar una cita pendiente"); }
  finalizar() { throw new Error("No se puede finalizar una cita pendiente"); }
  
  getNombre() { return "Pendiente"; }
  getColor() { return "bg-yellow-500"; }
  getAccionesPermitidas() { return ["confirmar", "cancelar"]; }
}

export class EstadoConfirmada implements EstadoCita {
  confirmar() { throw new Error("La cita ya está confirmada"); }
  cancelar() { /* Solo cambia el estado, sin lógica adicional */ }
  iniciar() { /* Solo cambia el estado, sin lógica adicional */ }
  finalizar() { throw new Error("No se puede finalizar sin iniciar"); }
  
  getNombre() { return "Confirmada"; }
  getColor() { return "bg-green-500"; }
  getAccionesPermitidas() { return ["iniciar", "cancelar"]; }
}

export class EstadoEnProceso implements EstadoCita {
  confirmar() { throw new Error("La cita ya está en proceso"); }
  cancelar() { throw new Error("No se puede cancelar una cita en proceso"); }
  iniciar() { throw new Error("La cita ya está en proceso"); }
  finalizar() { /* Solo cambia el estado, sin lógica adicional */ }
  
  getNombre() { return "En Proceso"; }
  getColor() { return "bg-blue-500"; }
  getAccionesPermitidas() { return ["finalizar"]; }
}

export class EstadoFinalizada implements EstadoCita {
  confirmar() { throw new Error("La cita ya finalizó"); }
  cancelar() { throw new Error("La cita ya finalizó"); }
  iniciar() { throw new Error("La cita ya finalizó"); }
  finalizar() { throw new Error("La cita ya finalizó"); }
  
  getNombre() { return "Finalizada"; }
  getColor() { return "bg-gray-500"; }
  getAccionesPermitidas() { return []; }
}

export class EstadoCancelada implements EstadoCita {
  confirmar() { throw new Error("La cita está cancelada"); }
  cancelar() { throw new Error("La cita ya está cancelada"); }
  iniciar() { throw new Error("La cita está cancelada"); }
  finalizar() { throw new Error("La cita está cancelada"); }
  
  getNombre() { return "Cancelada"; }
  getColor() { return "bg-red-500"; }
  getAccionesPermitidas() { return []; }
}