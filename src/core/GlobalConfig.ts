export class GlobalConfig {
  private static instance: GlobalConfig;

  private _horarioApertura = "09:00";
  private _horarioCierre = "20:00";
  private _politicaCancelacion = "2 horas antes";
  private _descuentoMiercoles = 0.1;

  private constructor() {}

  public static getInstance(): GlobalConfig {
    if (!GlobalConfig.instance) {
      GlobalConfig.instance = new GlobalConfig();
    }
    return GlobalConfig.instance;
  }

  // Getters
  get horarioApertura() { return this._horarioApertura; }
  get horarioCierre() { return this._horarioCierre; }
  get politicaCancelacion() { return this._politicaCancelacion; }
  get descuentoMiercoles() { return this._descuentoMiercoles; }

  // Método para obtener la política formateada
  public getPoliticaCancelacion(): string {
    return `Puedes cancelar hasta ${this._politicaCancelacion} de tu cita sin penalización`;
  }

  // Validación de cita - MÉTODO CORREGIDO
  public validarCita(fecha: string, hora: string): { valido: boolean; error?: string } {
    // Validar que la fecha no esté vacía
    if (!fecha) {
      return { valido: false, error: "❌ Por favor selecciona una fecha" };
    }

    // Validar que la hora no esté vacía
    if (!hora) {
      return { valido: false, error: "❌ Por favor selecciona una hora" };
    }

    // Validar horario
    if (!this.esHorarioValido(hora)) {
      return { 
        valido: false, 
        error: `❌ La cita debe estar entre ${this.horarioApertura} y ${this.horarioCierre}` 
      };
    }
    
    // Validar que no sea domingo - SOLO si la fecha es válida
    try {
      const fechaSeleccionada = new Date(fecha);
      if (isNaN(fechaSeleccionada.getTime())) {
        return { valido: false, error: "❌ Fecha inválida" };
      }
      
      const dia = fechaSeleccionada.getDay();
      if (dia === 0) { // 0 = domingo
        return { valido: false, error: "❌ No atendemos los domingos" };
      }
    } catch (error) {
      return { valido: false, error: "❌ Error al validar la fecha" };
    }
    
    return { valido: true };
  }

  // Setters - cuando cambias aquí, cambia en TODA la app
  setHorarioApertura(hora: string) { 
    this._horarioApertura = hora; 
    this.notificarCambios();
  }

  setHorarioCierre(hora: string) { 
    this._horarioCierre = hora; 
    this.notificarCambios();
  }

  setPoliticaCancelacion(politica: string) { 
    this._politicaCancelacion = politica; 
    this.notificarCambios();
  }

  setDescuentoMiercoles(descuento: number) { 
    this._descuentoMiercoles = descuento; 
    this.notificarCambios();
  }

  private notificarCambios() {
    // Aquí iría la lógica para notificar a otros módulos
    console.log("Configuración global actualizada");
  }

  public esHorarioValido(hora: string): boolean {
    return hora >= this._horarioApertura && hora <= this._horarioCierre;
  }
}