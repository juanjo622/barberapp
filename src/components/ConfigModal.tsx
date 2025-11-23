import React, { useState } from 'react';
import { GlobalConfig } from '../core/GlobalConfig';
import { X } from 'lucide-react';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const config = GlobalConfig.getInstance();
  
  const [horarioApertura, setHorarioApertura] = useState(config.horarioApertura);
  const [horarioCierre, setHorarioCierre] = useState(config.horarioCierre);
  const [politicaCancelacion, setPoliticaCancelacion] = useState(config.politicaCancelacion);
  const [descuentoMiercoles, setDescuentoMiercoles] = useState(config.descuentoMiercoles * 100);

  const guardarConfiguracion = () => {
    config.setHorarioApertura(horarioApertura);
    config.setHorarioCierre(horarioCierre);
    config.setPoliticaCancelacion(politicaCancelacion);
    config.setDescuentoMiercoles(descuentoMiercoles / 100);
    
    alert("Configuración guardada. Se aplicará en toda la aplicación.");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Configuración</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horario de Apertura
            </label>
            <input
              type="time"
              value={horarioApertura}
              onChange={(e) => setHorarioApertura(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horario de Cierre
            </label>
            <input
              type="time"
              value={horarioCierre}
              onChange={(e) => setHorarioCierre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Política de Cancelación
            </label>
            <select
              value={politicaCancelacion}
              onChange={(e) => setPoliticaCancelacion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="2 horas antes">2 horas antes</option>
              <option value="24 horas antes">24 horas antes</option>
              <option value="1 hora antes">1 hora antes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descuento Miércoles (%)
            </label>
            <input
              type="number"
              min="0"
              max="50"
              value={descuentoMiercoles}
              onChange={(e) => setDescuentoMiercoles(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={guardarConfiguracion}
            className="flex-1 py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};