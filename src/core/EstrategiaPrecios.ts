// Interface para todas las estrategias de precio
export interface EstrategiaPrecio {
  calcularPrecio(precioBase: number): number;
  getDescripcion(): string;
}

// Estrategia: Precio Normal (sin cambios)
export class PrecioNormal implements EstrategiaPrecio {
  calcularPrecio(precioBase: number): number {
    return precioBase;
  }

  getDescripcion(): string {
    return "Precio estándar";
  }
}

// Estrategia: Descuento Miércoles (-10%)
export class PrecioMiercoles implements EstrategiaPrecio {
  calcularPrecio(precioBase: number): number {
    return precioBase * 0.9; // 10% de descuento
  }

  getDescripcion(): string {
    return "Descuento miércoles (-10%)";
  }
}

// Estrategia: Barbero Experto (+20%)
export class PrecioBarberoExperto implements EstrategiaPrecio {
  calcularPrecio(precioBase: number): number {
    return precioBase * 1.2; // 20% adicional
  }

  getDescripcion(): string {
    return "Barbero experto (+20%)";
  }
}

// Estrategia: Cliente Frecuente (-15%)
export class PrecioClienteFrecuente implements EstrategiaPrecio {
  calcularPrecio(precioBase: number): number {
    return precioBase * 0.85; // 15% de descuento
  }

  getDescripcion(): string {
    return "Cliente frecuente (-15%)";
  }
}

// Estrategia: Primera Venta (-5%)
export class PrecioPrimeraVez implements EstrategiaPrecio {
  calcularPrecio(precioBase: number): number {
    return precioBase * 0.95; // 5% de descuento
  }

  getDescripcion(): string {
    return "Primera visita (-5%)";
  }
}

// Contexto que usa las estrategias
export class CalculadoraPrecio {
  private estrategia: EstrategiaPrecio;

  constructor(estrategia: EstrategiaPrecio) {
    this.estrategia = estrategia;
  }

  setEstrategia(estrategia: EstrategiaPrecio): void {
    this.estrategia = estrategia;
  }

  calcularPrecioFinal(precioBase: number): number {
    return this.estrategia.calcularPrecio(precioBase);
  }

  getDescripcionEstrategia(): string {
    return this.estrategia.getDescripcion();
  }
}

// Factory para crear estrategias según el contexto
export class EstrategiaPrecioFactory {
  static crearEstrategia(tipo: string, contexto: any = {}): EstrategiaPrecio {
    const hoy = new Date().getDay(); // 0 = domingo, 1 = lunes, ..., 3 = miércoles
    
    // Verificar si es miércoles (día 3)
    if (hoy === 3) {
      return new PrecioMiercoles();
    }

    // Verificar si es barbero experto
    if (contexto.barbero === 'Carlos Rodríguez') {
      return new PrecioBarberoExperto();
    }

    // Verificar si es cliente frecuente (simulado)
    if (contexto.clienteFrecuente) {
      return new PrecioClienteFrecuente();
    }

    // Verificar si es primera vez (simulado)
    if (contexto.primeravez) {
      return new PrecioPrimeraVez();
    }

    // Estrategia por defecto
    return new PrecioNormal();
  }
}