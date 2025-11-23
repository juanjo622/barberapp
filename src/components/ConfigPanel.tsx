import React from 'react';
import { GlobalConfig } from '../core/GlobalConfig';

export const ConfigPanel: React.FC = () => {
  const config = GlobalConfig.getInstance();

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-4">Configuración Global</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-amber-500 mb-3">Horarios</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-300">Apertura</p>
              <p className="text-white font-medium">{config.horarioApertura}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Cierre</p>
              <p className="text-white font-medium">{config.horarioCierre}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-amber-500 mb-3">Políticas</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-300">Cancelación</p>
              <p className="text-white font-medium">{config.getPoliticaCancelacion()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Descuento Miércoles</p>
              <p className="text-white font-medium">{(config.descuentoMiercoles * 100)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};