import React from 'react';
import { Star, Clock, Award, Users } from 'lucide-react';

const barbers = [
  {
    name: 'Camilos palacios.',
    role: 'Master Barber',
    image: 'https://i.pinimg.com/564x/f3/4f/a2/f34fa26368b8e24559c76dadc12b706d.jpg',
    experience: '10 años de experiencia',
    specialties: ['Cortes Clásicos', 'Diseños Personalizados', 'Barbas'],
    rating: 4.9,
    clients: '2000+'
  },
  {
    name: 'Miguel Quintero',
    role: 'Estilista Senior',
    image: 'https://i.pinimg.com/564x/b6/f4/9c/b6f49cbc4242b5f4a6adf2fc449e48dc.jpg',
    experience: '8 años de experiencia',
    specialties: ['Coloración', 'Degradados', 'Peinados'],
    rating: 4.8,
    clients: '1500+'
  },
  {
    name: 'David López',
    role: 'Barbero Especialista',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    experience: '5 años de experiencia',
    specialties: ['Diseños Modernos', 'Afeitado Clásico', 'Tratamientos'],
    rating: 4.7,
    clients: '1000+'
  }
];

export default function Barbers() {
  return (
    <section id="barberos" className="py-20 bg-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nuestros Barberos
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Profesionales apasionados por su trabajo
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber, index) => (
            <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <img
                  className="w-full h-80 object-cover"
                  src={barber.image}
                  alt={barber.name}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-bold text-white">{barber.name}</h3>
                  <p className="text-amber-500 font-semibold">{barber.role}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-gray-600">{barber.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 mr-1" />
                    <span className="text-gray-600">{barber.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Especialidades:</h4>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-gray-600">{barber.clients} clientes</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-amber-500 mr-2" />
                    <span className="text-gray-600">Certificado</span>
                  </div>
                </div>

                <button className="mt-6 w-full py-2 px-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300">
                  Reservar con {barber.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}