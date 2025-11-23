import React, { useState } from 'react';
import { Cita } from '../core/models/Cita';
import { X } from 'lucide-react';

interface CitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  cita: Cita | null;
  onEstadoCambiado: (cita: Cita) => void;
}

export const CitaModal: React.FC<CitaModalProps> = ({ 
  isOpen, 
  onClose, 
  cita, 
  onEstadoCambiado 
}) => {
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0); // Para forzar re-render

  const handleAction = (action: string) => {
    if (!cita) return;

    try {
      // Crear una NUEVA instancia de Cita para forzar la actualización
      const nuevaCita = new Cita(
        cita.id,
        cita.cliente,
        cita.servicio,
        cita.fecha,
        cita.hora,
        cita.barbero,
        cita.precio
      );

      // Copiar el estado actual manualmente
      (nuevaCita as any).estado = (cita as any).estado;

      switch (action) {
        case 'confirmar':
          nuevaCita.confirmar();
          break;
        case 'cancelar':
          nuevaCita.cancelar();
          setMostrarConfirmacion(false);
          break;
        case 'iniciar':
          nuevaCita.iniciar();
          break;
        case 'finalizar':
          nuevaCita.finalizar();
          break;
      }
      
      onEstadoCambiado(nuevaCita);
      setForceUpdate(prev => prev + 1); // Forzar re-render
      
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const getEstadoColor = (estado: string) => {
    const colors: { [key: string]: string } = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Confirmada': 'bg-green-100 text-green-800',
      'En Proceso': 'bg-blue-100 text-blue-800',
      'Finalizada': 'bg-gray-100 text-gray-800',
      'Cancelada': 'bg-red-100 text-red-800'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  // Forzar re-render cuando cambie el estado
  React.useEffect(() => {
    if (isOpen && cita) {
      setForceUpdate(prev => prev + 1);
    }
  }, [isOpen, cita]);

  if (!isOpen || !cita) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Gestión de Cita</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(cita.getNombreEstado())}`}>
              {cita.getNombreEstado()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Cliente</p>
              <p className="font-medium">{cita.cliente}</p>
            </div>
            <div>
              <p className="text-gray-600">Barbero</p>
              <p className="font-medium">{cita.barbero}</p>
            </div>
            <div>
              <p className="text-gray-600">Fecha</p>
              <p className="font-medium">{cita.fecha}</p>
            </div>
            <div>
              <p className="text-gray-600">Hora</p>
              <p className="font-medium">{cita.hora}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600">Servicio</p>
              <p className="font-medium">{cita.servicio}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600">Precio</p>
              <p className="font-medium text-amber-600 text-lg">${cita.precio.toLocaleString()}</p>
            </div>
          </div>

          {mostrarConfirmacion ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium mb-3">¿Estás seguro de cancelar esta cita?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setMostrarConfirmacion(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  No, mantener
                </button>
                <button
                  onClick={() => handleAction('cancelar')}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Sí, cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {cita.getAccionesPermitidas().map((action) => (
                <button
                  key={action}
                  onClick={() => action === 'cancelar' ? setMostrarConfirmacion(true) : handleAction(action)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    action === 'cancelar' 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {action === 'confirmar' && 'Confirmar Cita'}
                  {action === 'cancelar' && 'Cancelar Cita'}
                  {action === 'iniciar' && 'Iniciar Servicio'}
                  {action === 'finalizar' && 'Finalizar Servicio'}
                </button>
              ))}
            </div>
          )}

          {/* Debug info - puedes quitar esto después */}
          <div className="text-xs text-gray-400 mt-4">
            Estado actual: {cita.getNombreEstado()} | Acciones: {cita.getAccionesPermitidas().join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};