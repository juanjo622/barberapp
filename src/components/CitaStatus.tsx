import React from 'react';
import { Cita } from '../core/models/Cita';

interface CitaStatusProps {
  cita: Cita;
  onEstadoCambiado: (cita: Cita) => void;
}

export const CitaStatus: React.FC<CitaStatusProps> = ({ cita, onEstadoCambiado }) => {
  const handleAction = (action: string) => {
    try {
      switch (action) {
        case 'confirmar':
          cita.confirmar();
          break;
        case 'cancelar':
          cita.cancelar();
          break;
        case 'iniciar':
          cita.iniciar();
          break;
        case 'finalizar':
          cita.finalizar();
          break;
      }
      onEstadoCambiado(cita);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const getActionButtonText = (action: string): string => {
    const texts: { [key: string]: string } = {
      confirmar: 'Confirmar Cita',
      cancelar: 'Cancelar Cita',
      iniciar: 'Iniciar Servicio',
      finalizar: 'Finalizar Servicio'
    };
    return texts[action] || action;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Estado de tu Cita</h3>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${cita.getColorEstado()}`}>
          {cita.getNombreEstado()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Servicio</p>
          <p className="font-medium">{cita.servicio}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Barbero</p>
          <p className="font-medium">{cita.barbero}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Fecha y Hora</p>
          <p className="font-medium">{cita.fecha} a las {cita.hora}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Precio</p>
          <p className="font-medium text-amber-600">${cita.precio.toLocaleString()}</p>
        </div>
      </div>

      {cita.getAccionesPermitidas().length > 0 && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">Acciones disponibles:</p>
          <div className="flex flex-wrap gap-2">
            {cita.getAccionesPermitidas().map((action) => (
              <button
                key={action}
                onClick={() => handleAction(action)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  action === 'cancelar' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                {getActionButtonText(action)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};