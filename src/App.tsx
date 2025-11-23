import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Barbers from './components/Barbers';
import Appointment from './components/Appointment';
import Footer from './components/Footer';
import { ConfigModal } from './components/ConfigModal';
import { CitaModal } from './components/CitaModal';
import { Cita } from './core/models/Cita';
import { ServicioBarberia, CorteBasico } from './core/ServicioBarberia';

function App() {
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [citaModalOpen, setCitaModalOpen] = useState(false);
  const [citaActual, setCitaActual] = useState<Cita | null>(null);
  const [servicioPersonalizado, setServicioPersonalizado] = useState<ServicioBarberia | null>(null);

  // Recibir servicio personalizado desde Services
  const handleServicioPersonalizado = (servicio: ServicioBarberia) => {
    setServicioPersonalizado(servicio);
  };

  // Recibir cita creada desde Appointment
  const handleCitaCreada = (cita: Cita) => {
    setCitaActual(cita);
    setCitaModalOpen(true);
    console.log('🔄 Nueva cita creada y lista para gestionar:', cita);
  };

  // Crear cita de ejemplo (para el demo de estados)
  const crearCitaDesdeServicio = (servicio: ServicioBarberia) => {
    const nuevaCita = new Cita(
      Date.now().toString(),
      'Cliente Demo',
      servicio.getDescripcion(),
      '2025-11-25',
      '10:00',
      'Carlos Rodríguez',
      servicio.getPrecio()
    );
    setCitaActual(nuevaCita);
    setCitaModalOpen(true);
  };

  // Función corregida - sin await problemático
  const probarEstadosCita = () => {
    const servicioDemo = new CorteBasico();
    crearCitaDesdeServicio(servicioDemo);
  };

  const handleEstadoCambiado = (cita: Cita) => {
    setCitaActual(cita);
  };

  // Función para ver todas las citas guardadas (para testing)
  const verTodasLasCitas = () => {
    // Esta función accedería al array de citas guardadas
    console.log('📋 Función para ver todas las citas - en desarrollo');
    alert('La funcionalidad de ver todas las citas está en desarrollo. Revisa la consola para ver las citas guardadas.');
  };

  return (
    <div className="App">
      <Navbar />
      <Hero />
      
      {/* Botón de configuración admin */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setConfigModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Configuración"
        >
          ⚙️
        </button>
      </div>

      {/* Botón para ver citas (solo desarrollo) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={verTodasLasCitas}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors text-sm"
          title="Ver Citas (Debug)"
        >
          📋
        </button>
      </div>

      {/* Services con personalización */}
      <Services onServicioPersonalizado={handleServicioPersonalizado} />
      
      <Barbers />
      
      {/* Appointment recibe el servicio personalizado y puede crear citas */}
      <Appointment 
        servicioPersonalizado={servicioPersonalizado}
        onCitaCreada={handleCitaCreada}
      />

      {/* Demo interactivo de estados */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Demo - Gestión de Estados
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Prueba el flujo completo de estados de una cita
            </p>
            
            <div className="mt-6 flex gap-4 justify-center flex-wrap">
              <button
                onClick={probarEstadosCita}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Probar Estados de Cita
              </button>
              
              <button
                onClick={() => setConfigModalOpen(true)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Configuración Global
              </button>
            </div>
          </div>

          {citaActual && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cita Activa - Gestiona los Estados
                </h3>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${citaActual.getColorEstado()}`}>
                  {citaActual.getNombreEstado()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Servicio</p>
                  <p className="font-medium">{citaActual.servicio}</p>
                </div>
                <div>
                  <p className="text-gray-600">Barbero</p>
                  <p className="font-medium">{citaActual.barbero}</p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha y Hora</p>
                  <p className="font-medium">{citaActual.fecha} a las {citaActual.hora}</p>
                </div>
                <div>
                  <p className="text-gray-600">Precio</p>
                  <p className="font-medium text-amber-600">${citaActual.precio.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Instrucciones:</strong> Haz clic en el botón de configuración ⚙️ para modificar horarios 
                  y políticas. Luego intenta crear una cita fuera del horario permitido para ver las validaciones en acción.
                </p>
              </div>
            </div>
          )}

          {!citaActual && (
            <div className="text-center py-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
                <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="font-semibold text-yellow-800 mb-2">No hay cita activa</h4>
                <p className="text-yellow-700 text-sm">
                  Haz clic en "Probar Estados de Cita" para crear una cita de demostración 
                  o ve a la sección de servicios para hacer una reserva real.
                </p>
              </div>
            </div>
          )}

          {/* Información de los patrones implementados */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-green-600 font-bold">S</span>
              </div>
              <h4 className="font-semibold text-gray-900">Singleton</h4>
              <p className="text-sm text-gray-600">Configuración global única</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-blue-600 font-bold">ST</span>
              </div>
              <h4 className="font-semibold text-gray-900">State</h4>
              <p className="text-sm text-gray-600">Estados de cita</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-purple-600 font-bold">D</span>
              </div>
              <h4 className="font-semibold text-gray-900">Decorator</h4>
              <p className="text-sm text-gray-600">Servicios personalizados</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-amber-600 font-bold">✓</span>
              </div>
              <h4 className="font-semibold text-gray-900">SOLID</h4>
              <p className="text-sm text-gray-600">Principios aplicados</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Módulos / Modales */}
      <ConfigModal 
        isOpen={configModalOpen} 
        onClose={() => setConfigModalOpen(false)} 
      />
      
      <CitaModal 
        isOpen={citaModalOpen}
        onClose={() => setCitaModalOpen(false)}
        cita={citaActual}
        onEstadoCambiado={handleEstadoCambiado}
      />
    </div>
  );
}

export default App;