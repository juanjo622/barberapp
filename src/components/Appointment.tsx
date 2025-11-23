import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { GlobalConfig } from '../core/GlobalConfig';
import { ServicioBarberia } from '../core/ServicioBarberia';
import { Cita } from '../core/models/Cita';

interface AppointmentProps {
  servicioPersonalizado?: ServicioBarberia | null;
  onCitaCreada?: (cita: Cita) => void;
}

// Array para guardar todas las citas creadas
let citasGuardadas: Cita[] = [];

export default function Appointment({ servicioPersonalizado, onCitaCreada }: AppointmentProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    barber: '',
    precio: 0
  });

  const [errores, setErrores] = useState<string[]>([]);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [reservaCompletada, setReservaCompletada] = useState(false);
  const [citaCreada, setCitaCreada] = useState<Cita | null>(null);

  // Cuando llega un servicio personalizado, actualizar el formulario
  useEffect(() => {
    if (servicioPersonalizado) {
      setFormData(prev => ({
        ...prev,
        service: servicioPersonalizado.getDescripcion(),
        precio: servicioPersonalizado.getPrecio()
      }));
    }
  }, [servicioPersonalizado]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = GlobalConfig.getInstance();
    
    // Validar campos requeridos
    const camposRequeridos = [];
    if (!formData.name) camposRequeridos.push('Nombre');
    if (!formData.email) camposRequeridos.push('Email');
    if (!formData.phone) camposRequeridos.push('Teléfono');
    if (!formData.date) camposRequeridos.push('Fecha');
    if (!formData.time) camposRequeridos.push('Hora');
    if (!formData.service) camposRequeridos.push('Servicio');
    if (!formData.barber) camposRequeridos.push('Barbero');

    if (camposRequeridos.length > 0) {
      setErrores([`Por favor completa: ${camposRequeridos.join(', ')}`]);
      return;
    }

    // Validar con Singleton - horarios y políticas
    const validacion = config.validarCita(formData.date, formData.time);
    
    if (!validacion.valido) {
      setErrores([validacion.error!]);
      return;
    }

    // Si pasa todas las validaciones, mostrar confirmación
    setMostrarConfirmacion(true);
    setErrores([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar errores cuando el usuario empiece a escribir
    if (errores.length > 0) {
      setErrores([]);
    }
  };

  const confirmarReserva = () => {
    // Crear la cita con State Pattern
    const nuevaCita = new Cita(
      Date.now().toString(),
      formData.name,
      formData.service,
      formData.date,
      formData.time,
      formData.barber,
      formData.precio
    );

    // Guardar la cita en el array
    citasGuardadas.push(nuevaCita);
    setCitaCreada(nuevaCita);

    // Notificar al componente padre (App.tsx)
    if (onCitaCreada) {
      onCitaCreada(nuevaCita);
    }

    console.log('📅 Cita guardada:', nuevaCita);
    console.log('📊 Total de citas:', citasGuardadas.length);
    console.log('💾 Todas las citas:', citasGuardadas);

    setReservaCompletada(true);
    setMostrarConfirmacion(false);
  };

  const hacerOtraReserva = () => {
    // Resetear formulario para nueva reserva
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: getFechaQueNoEsDomingo(),
      time: '10:00',
      service: servicioPersonalizado ? servicioPersonalizado.getDescripcion() : '',
      barber: '',
      precio: servicioPersonalizado ? servicioPersonalizado.getPrecio() : 0
    });
    setReservaCompletada(false);
    setCitaCreada(null);
  };

  // Función para obtener una fecha que NUNCA sea domingo
  const getFechaQueNoEsDomingo = () => {
    const hoy = new Date();
    let fecha = new Date(hoy);
    
    // Si hoy es domingo, usar el lunes
    if (fecha.getDay() === 0) {
      fecha.setDate(fecha.getDate() + 1);
    }
    
    return fecha.toISOString().split('T')[0];
  };

  // Función para obtener fecha mínima (hoy)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Función para obtener fecha máxima (1 mes desde hoy)
  const getMaxDate = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth.toISOString().split('T')[0];
  };

  // Cargar fecha que NO sea domingo al montar el componente
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: getFechaQueNoEsDomingo(),
      time: '10:00'
    }));
  }, []);

  // Función para cargar ejemplo de prueba
  const cargarEjemplo = () => {
    setFormData(prev => ({
      ...prev,
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      phone: '+57 123 456 7890',
      date: getFechaQueNoEsDomingo(),
      time: '14:00',
      service: servicioPersonalizado ? servicioPersonalizado.getDescripcion() : 'Corte de Cabello',
      barber: 'Carlos Rodríguez',
      precio: servicioPersonalizado ? servicioPersonalizado.getPrecio() : 22000
    }));
    setErrores([]);
  };

  if (reservaCompletada && citaCreada) {
    return (
      <section id="citas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¡Reserva Confirmada!
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Tu cita ha sido agendada exitosamente
            </p>
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Detalles de tu Cita</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Cliente</p>
                  <p className="font-medium">{citaCreada.cliente}</p>
                </div>
                <div>
                  <p className="text-gray-600">Estado</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${citaCreada.getColorEstado()} text-white`}>
                    {citaCreada.getNombreEstado()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Servicio</p>
                  <p className="font-medium">{citaCreada.servicio}</p>
                </div>
                <div>
                  <p className="text-gray-600">Barbero</p>
                  <p className="font-medium">{citaCreada.barbero}</p>
                </div>
                <div>
                  <p className="text-gray-600">Fecha</p>
                  <p className="font-medium">{citaCreada.fecha}</p>
                </div>
                <div>
                  <p className="text-gray-600">Hora</p>
                  <p className="font-medium">{citaCreada.hora}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600">Precio Total</p>
                  <p className="font-medium text-amber-600 text-lg">${citaCreada.precio.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700 text-sm">
                <strong>Próximo paso:</strong> Puedes gestionar el estado de tu cita en la sección de demostración abajo.
                Recibirás un correo de confirmación con todos los detalles.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={hacerOtraReserva}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Hacer Otra Reserva
              </button>
              <button
                onClick={() => {
                  // Aquí podrías redirigir a un dashboard de citas
                  alert('Funcionalidad de ver todas las citas en desarrollo');
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver Todas mis Citas
              </button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>📊 Total de reservas realizadas en esta sesión: {citasGuardadas.length}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="citas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Completa tu Reserva
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Confirma tus datos y agenda tu cita
          </p>
        </div>

        <div className="mt-16 max-w-lg mx-auto">
          {/* Botón para cargar ejemplo */}
          <div className="mb-6">
            <button
              onClick={cargarEjemplo}
              className="w-full py-3 px-4 border border-blue-300 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
            >
              <User className="mr-2 h-5 w-5" />
              Cargar Datos de Ejemplo
            </button>
          </div>

          {/* Mostrar servicio personalizado si existe */}
          {servicioPersonalizado && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-green-800">Servicio Personalizado</h4>
                  <p className="text-green-700">{servicioPersonalizado.getDescripcion()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-800 text-lg">
                    ${servicioPersonalizado.getPrecio().toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    {servicioPersonalizado.getDuracion()} min
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mostrar errores de validación */}
          {errores.length > 0 && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  {errores.map((error, idx) => (
                    <p key={idx} className="font-medium">{error}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal de Confirmación */}
          {mostrarConfirmacion && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Confirmar Reserva</h3>
                  <p className="text-gray-600 mb-4">¿Estás seguro de agendar esta cita?</p>
                  
                  <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                    <p><strong>Cliente:</strong> {formData.name}</p>
                    <p><strong>Servicio:</strong> {formData.service}</p>
                    <p><strong>Barbero:</strong> {formData.barber}</p>
                    <p><strong>Fecha:</strong> {formData.date}</p>
                    <p><strong>Hora:</strong> {formData.time}</p>
                    <p><strong>Precio:</strong> ${formData.precio.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setMostrarConfirmacion(false)}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={confirmarReserva}
                      className="flex-1 py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      Confirmar Reserva
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-amber-500" />
                Información Personal
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="tu@email.com"
                    />
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="+57 123 456 7890"
                    />
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Detalles de la Cita */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-amber-500" />
                Detalles de la Cita
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                    Servicio *
                  </label>
                  {servicioPersonalizado ? (
                    <input
                      type="text"
                      name="service"
                      id="service"
                      readOnly
                      value={formData.service}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm bg-gray-50 text-gray-700"
                    />
                  ) : (
                    <select
                      name="service"
                      id="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="Corte de Cabello">Corte de Cabello - $22.000</option>
                      <option value="Arreglo de Barba">Arreglo de Barba - $10.000</option>
                      <option value="Tratamiento Capilar">Tratamiento Capilar - $25.000</option>
                      <option value="Experiencia Premium">Experiencia Premium - $30.000</option>
                      <option value="Pack Novio">Pack Novio - $90.000</option>
                      <option value="Coloración">Coloración - $40.000</option>
                    </select>
                  )}
                </div>

                <div>
                  <label htmlFor="barber" className="block text-sm font-medium text-gray-700">
                    Barbero *
                  </label>
                  <select
                    name="barber"
                    id="barber"
                    required
                    value={formData.barber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  >
                    <option value="">Selecciona un barbero</option>
                    <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                    <option value="Miguel Ángel">Miguel Ángel</option>
                    <option value="David López">David López</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Fecha *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                    Hora *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="time"
                      name="time"
                      id="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      min="09:00"
                      max="20:00"
                      className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Precio */}
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-amber-800">Total a pagar:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    ${formData.precio.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-blue-800">
                    <strong>Horario de atención:</strong> Lunes a Sábado de 9:00 am a 8:00 pm
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Recuerda que puedes cancelar hasta 2 horas antes de tu cita.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
            >
              <Calendar className="mr-2 h-6 w-6" />
              Confirmar y Reservar Cita
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}