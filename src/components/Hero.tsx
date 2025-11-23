import React from 'react';
import { Calendar, Scissors, Star, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <div id="inicio" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80"
          alt="Barbería"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:space-x-12">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              BarberStyle
              <span className="block text-amber-500">Premium Grooming</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Donde el estilo se encuentra con la tradición. Expertos en cortes clásicos y modernos.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#citas"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-black bg-amber-500 hover:bg-amber-600 transition-colors duration-300"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Reservar Cita
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-base font-medium rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                Ver Servicios
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500 rounded-full">
                  <Scissors className="h-6 w-6 text-black" />
                </div>
                <p className="mt-2 text-white">Cortes Premium</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500 rounded-full">
                  <Star className="h-6 w-6 text-black" />
                </div>
                <p className="mt-2 text-white">Servicio 5⭐</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500 rounded-full">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <p className="mt-2 text-white">Sin Esperas</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-amber-500 rounded-full">
                  <Calendar className="h-6 w-6 text-black" />
                </div>
                <p className="mt-2 text-white">Cita Online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}