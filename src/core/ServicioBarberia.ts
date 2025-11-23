import { CalculadoraPrecio, EstrategiaPrecioFactory } from '../core/EstrategiaPrecios';

// Interface base para todos los servicios
export abstract class ServicioBarberia {
  abstract getDescripcion(): string;
  abstract getPrecio(): number;
  abstract getDuracion(): number; // duración en minutos
}

// Servicios base
export class CorteBasico extends ServicioBarberia {
  getDescripcion(): string { return "Corte de Cabello"; }
  getPrecio(): number { return 22000; }
  getDuracion(): number { return 30; }
}

export class ArregloBarba extends ServicioBarberia {
  getDescripcion(): string { return "Arreglo de Barba"; }
  getPrecio(): number { return 10000; }
  getDuracion(): number { return 20; }
}

export class TratamientoCapilar extends ServicioBarberia {
  getDescripcion(): string { return "Tratamiento Capilar"; }
  getPrecio(): number { return 25000; }
  getDuracion(): number { return 45; }
}

export class ExperienciaPremium extends ServicioBarberia {
  getDescripcion(): string { return "Experiencia Premium"; }
  getPrecio(): number { return 30000; }
  getDuracion(): number { return 60; }
}

export class PackNovio extends ServicioBarberia {
  getDescripcion(): string { return "Pack Novio"; }
  getPrecio(): number { return 90000; }
  getDuracion(): number { return 90; }
}

export class Coloracion extends ServicioBarberia {
  getDescripcion(): string { return "Coloración"; }
  getPrecio(): number { return 40000; }
  getDuracion(): number { return 75; }
}

// Decorador abstracto
abstract class ServicioDecorator extends ServicioBarberia {
  constructor(protected servicio: ServicioBarberia) {
    super();
  }

  abstract getDescripcion(): string;
  abstract getPrecio(): number;
  abstract getDuracion(): number;
}

// Decoradores concretos - Servicios extra
export class ExtraBarba extends ServicioDecorator {
  getDescripcion(): string {
    return this.servicio.getDescripcion() + " + Arreglo de Barba";
  }

  getPrecio(): number {
    return this.servicio.getPrecio() + 10000;
  }

  getDuracion(): number {
    return this.servicio.getDuracion() + 20;
  }
}

export class ExtraMascarilla extends ServicioDecorator {
  getDescripcion(): string {
    return this.servicio.getDescripcion() + " + Mascarilla Facial";
  }

  getPrecio(): number {
    return this.servicio.getPrecio() + 15000;
  }

  getDuracion(): number {
    return this.servicio.getDuracion() + 15;
  }
}

export class ExtraLavado extends ServicioDecorator {
  getDescripcion(): string {
    return this.servicio.getDescripcion() + " + Lavado Premium";
  }

  getPrecio(): number {
    return this.servicio.getPrecio() + 8000;
  }

  getDuracion(): number {
    return this.servicio.getDuracion() + 10;
  }
}

export class ExtraMasaje extends ServicioDecorator {
  getDescripcion(): string {
    return this.servicio.getDescripcion() + " + Masaje Capilar";
  }

  getPrecio(): number {
    return this.servicio.getPrecio() + 12000;
  }

  getDuracion(): number {
    return this.servicio.getDuracion() + 15;
  }
}

// Factory para crear servicios fácilmente
export class ServicioFactory {
  static crearServicioBase(tipo: string): ServicioBarberia {
    switch (tipo) {
      case 'corte':
        return new CorteBasico();
      case 'barba':
        return new ArregloBarba();
      case 'tratamiento':
        return new TratamientoCapilar();
      case 'premium':
        return new ExperienciaPremium();
      case 'novio':
        return new PackNovio();
      case 'coloracion':
        return new Coloracion();
      default:
        throw new Error('Tipo de servicio no válido');
    }
  }

  static agregarExtra(servicio: ServicioBarberia, extra: string): ServicioBarberia {
    switch (extra) {
      case 'barba':
        return new ExtraBarba(servicio);
      case 'mascarilla':
        return new ExtraMascarilla(servicio);
      case 'lavado':
        return new ExtraLavado(servicio);
      case 'masaje':
        return new ExtraMasaje(servicio);
      default:
        return servicio;
    }
  }
}

// Extender el servicio base con capacidad de cálculo de precios (Strategy Pattern)
export class ServicioConPrecio extends ServicioBarberia {
  private calculadora: CalculadoraPrecio;

  constructor(
    private servicio: ServicioBarberia,
    private contexto: any = {}
  ) {
    super();
    const estrategia = EstrategiaPrecioFactory.crearEstrategia('auto', contexto);
    this.calculadora = new CalculadoraPrecio(estrategia);
  }

  getDescripcion(): string {
    return this.servicio.getDescripcion();
  }

  getPrecio(): number {
    const precioBase = this.servicio.getPrecio();
    return this.calculadora.calcularPrecioFinal(precioBase);
  }

  getDuracion(): number {
    return this.servicio.getDuracion();
  }

  getDescuentoAplicado(): string {
    return this.calculadora.getDescripcionEstrategia();
  }

  getPrecioBase(): number {
    return this.servicio.getPrecio();
  }

  getAhorro(): number {
    return this.servicio.getPrecio() - this.getPrecio();
  }
}