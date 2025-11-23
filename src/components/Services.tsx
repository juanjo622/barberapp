import React, { useState } from 'react';
import { Scissors, User, Sparkles, Coffee, Gift, Droplet } from 'lucide-react';
import { ServiceCustomizer } from './ServiceCustomizer';
import { ServicioBarberia } from '../core/ServicioBarberia';

interface ServicesProps {
  onServicioPersonalizado: (servicio: ServicioBarberia) => void;
}

const services = [
  {
    tipo: 'corte',
    icon: <Scissors className="h-8 w-8" />,
    name: 'Corte de Cabello',
    price: 22000,
    description: 'Corte personalizado según tu estilo y preferencias.',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80'
  },
  {
    tipo: 'barba',
    icon: <User className="h-8 w-8" />,
    name: 'Arreglo de Barba',
    price: 10000,
    description: 'Perfilado y mantenimiento profesional de barba.',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80'
  },
  {
    tipo: 'tratamiento',
    icon: <Sparkles className="h-8 w-8" />,
    name: 'Tratamiento Capilar',
    price: 25000,
    description: 'Hidratación y cuidado para tu cabello.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80'
  },
  {
    tipo: 'premium',
    icon: <Coffee className="h-8 w-8" />,
    name: 'Experiencia Premium',
    price: 30000,
    description: 'Corte + bebida + masaje capilar.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80'
  },
  {
    tipo: 'novio',
    icon: <Gift className="h-8 w-8" />,
    name: 'Pack Novio',
    price: 90000,
    description: 'Preparación completa para tu día especial.',
    image: 'https://i.pinimg.com/564x/e5/5b/d0/e55bd0608619038ba863396ec2ede687.jpg'
  },
  {
    tipo: 'coloracion',
    icon: <Droplet className="h-8 w-8" />,
    name: 'Coloración',
    price: 40000,
    description: 'Tintes y mechas personalizadas.',
    image: 'https://i.pinimg.com/564x/8a/3f/c6/8a3fc6e47408b5ee76a989edf4245fc1.jpg'
  }
];

export default function Services({ onServicioPersonalizado }: ServicesProps) {
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState<any>(null);

  const handleReservarClick = (service: any) => {
    setServicioSeleccionado({
      tipo: service.tipo,
      nombre: service.name,
      precioBase: service.price
    });
    setCustomizerOpen(true);
  };

  const handleServicioPersonalizado = (servicio: ServicioBarberia) => {
    onServicioPersonalizado(servicio);
    setCustomizerOpen(false);
    
    // Redirigir automáticamente al formulario de reserva
    setTimeout(() => {
      document.getElementById('citas')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 500);
  };

  return (
    <>
      <section id="servicios" className="py-20 bg-gradient-to-b from-zinc-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Personaliza tu servicio y reserva en un solo lugar
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="absolute inset-0 h-48 w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-500 rounded-lg text-white">
                      {service.icon}
                    </div>
                    <span className="text-2xl font-bold text-amber-500">
                      ${service.price.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-gray-300">{service.description}</p>
                  <button 
                    onClick={() => handleReservarClick(service)}
                    className="mt-4 w-full py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300"
                  >
                    Personalizar y Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Información adicional */}
          <div className="mt-12 text-center">
            <p className="text-gray-300">
              ⭐ Todos los servicios incluyen asesoría profesional de estilo
            </p>
          </div>
        </div>
      </section>

      <ServiceCustomizer
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        servicioBase={servicioSeleccionado!}
        onServicioPersonalizado={handleServicioPersonalizado}
      />
    </>
  );
}