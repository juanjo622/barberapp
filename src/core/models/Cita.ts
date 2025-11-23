import { 
  EstadoCita, 
  EstadoPendiente, 
  EstadoConfirmada, 
  EstadoEnProceso, 
  EstadoFinalizada, 
  EstadoCancelada 
} from '../EstadoCita';

export class Cita {
  public estado: EstadoCita; // Hacer público para debugging

  constructor(
    public readonly id: string,
    public readonly cliente: string,
    public readonly servicio: string,
    public readonly fecha: string,
    public readonly hora: string,
    public readonly barbero: string,
    public readonly precio: number
  ) {
    this.estado = new EstadoPendiente();
  }

  // Métodos SIMPLIFICADOS - sin llamadas redundantes
  public confirmar(): void {
    this.estado = new EstadoConfirmada();
  }

  public cancelar(): void {
    this.estado = new EstadoCancelada();
  }

  public iniciar(): void {
    this.estado = new EstadoEnProceso();
  }

  public finalizar(): void {
    this.estado = new EstadoFinalizada();
  }

  // Getters para el estado actual
  public getEstado(): EstadoCita {
    return this.estado;
  }

  public getNombreEstado(): string {
    return this.estado.getNombre();
  }

  public getColorEstado(): string {
    return this.estado.getColor();
  }

  public getAccionesPermitidas(): string[] {
    return this.estado.getAccionesPermitidas();
  }
}