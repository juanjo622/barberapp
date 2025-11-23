import React, { useState, useEffect } from 'react';
import { X, Plus, Clock, ArrowRight, Tag } from 'lucide-react';
import { ServicioBarberia, ServicioFactory, ServicioConPrecio } from '../core/ServicioBarberia';

interface ServiceCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  servicioBase: {
    tipo: string;
    nombre: string;
    precioBase: number;
  };
  onServicioPersonalizado: (servicio: ServicioBarberia) => void;
}

export const ServiceCustomizer: React.FC<ServiceCustomizerProps> = ({
  isOpen,
  onClose,
  servicioBase,
  onServicioPersonalizado
}) => {
  const [servicioActual, setServicioActual] = useState<ServicioBarberia | null>(null);
  const [extrasSeleccionados, setExtrasSeleccionados] = useState<string[]>([]);

  // Opciones de extras disponibles
  const extrasDisponibles = [
    { id: 'barba', nombre: 'Arreglo de Barba', precio: 10000, duracion: 20 },
    { id: 'mascarilla', nombre: 'Mascarilla Facial', precio: 15000, duracion: 15 },
    { id: 'lavado', nombre: 'Lavado Premium', precio: 8000, duracion: 10 },
    { id: 'masaje', nombre: 'Masaje Capilar', precio: 12000, duracion: 15 }
  ];

  // Inicializar servicio base
  useEffect(() => {
    if (isOpen && servicioBase) {
      const servicioBaseObj = ServicioFactory.crearServicioBase(servicioBase.tipo);
      
      // Crear servicio con estrategia de precio (Strategy Pattern)
      const servicioConPrecio = new ServicioConPrecio(servicioBaseObj, {
        barbero: 'Carlos Rodríguez', // Esto podría venir de un contexto real
        primeravez: true // Simulado para demo
      });
      
      setServicioActual(servicioConPrecio);
      setExtrasSeleccionados([]);
    }
  }, [isOpen, servicioBase]);

  // Manejar selección de extras
  const toggleExtra = (extraId: string) => {
    setExtrasSeleccionados(prev => {
      const nuevosExtras = prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId];
      
      // Actualizar servicio con los extras y estrategia de precio
      if (servicioBase) {
        let servicioTemp = ServicioFactory.crearServicioBase(servicioBase.tipo);
        nuevosExtras.forEach(extra => {
          servicioTemp = ServicioFactory.agregarExtra(servicioTemp, extra);
        });
        
        // Aplicar estrategia de precio al servicio final (Strategy Pattern)
        const servicioConPrecio = new ServicioConPrecio(servicioTemp, {
          barbero: 'Carlos Rodríguez',
          primeravez: true
        });
        
        setServicioActual(servicioConPrecio);
      }
      
      return nuevosExtras;
    });
  };

  const handleContinuar = () => {
    if (servicioActual) {
      onServicioPersonalizado(servicioActual);
      onClose();
    }
  };

  if (!isOpen || !servicioActual) return null;

  const tieneDescuento = servicioActual instanceof ServicioConPrecio && servicioActual.getAhorro() > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-900">Personaliza tu Servicio</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Servicio Base */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-amber-800">{servicioBase.nombre}</h4>
                <p className="text-amber-600">Servicio base seleccionado</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-800">${servicioBase.precioBase.toLocaleString()}</p>
                <p className="text-sm text-amber-600">Precio base</p>
              </div>
            </div>
          </div>

          {/* Extras Disponibles */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-amber-500" />
              Agregar Extras (Opcional)
            </h4>
            
            <div className="space-y-3">
              {extrasDisponibles.map((extra) => (
                <label
                  key={extra.id}
                  className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    extrasSeleccionados.includes(extra.id)
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={extrasSeleccionados.includes(extra.id)}
                      onChange={() => toggleExtra(extra.id)}
                      className="h-5 w-5 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{extra.nombre}</p>
                      <p className="text-sm text-gray-500">+{extra.duracion} min</p>
                    </div>
                  </div>
                  <span className="font-semibold text-amber-600">
                    +${extra.precio.toLocaleString()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Resumen del Servicio con Strategy Pattern */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Resumen Final</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Servicio:</span>
                <span className="font-medium text-right">{servicioActual.getDescripcion()}</span>
              </div>
              
              {/* Información de precios con Strategy Pattern */}
              {tieneDescuento && (
                <>
                  <div className="flex justify-between text-green-600">
                    <span>Precio base:</span>
                    <span className="line-through">
                      ${(servicioActual as ServicioConPrecio).getPrecioBase().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>{(servicioActual as ServicioConPrecio).getDescuentoAplicado()}:</span>
                    <span>-${(servicioActual as ServicioConPrecio).getAhorro().toLocaleString()}</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Duración estimada:</span>
                <span className="font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {servicioActual.getDuracion()} min
                </span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-amber-600 text-lg">
                    ${servicioActual.getPrecio().toLocaleString()}
                  </span>
                </div>
                
                {/* Mensaje de promoción */}
                {tieneDescuento && (
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>¡Estás ahorrando ${(servicioActual as ServicioConPrecio).getAhorro().toLocaleString()}!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Información de redirección */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-sm text-blue-700">
                Al continuar, serás dirigido al formulario de reserva con tu servicio personalizado.
              </p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleContinuar}
              className="flex-2 py-3 px-6 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium flex items-center justify-center"
            >
              Continuar al Formulario
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};