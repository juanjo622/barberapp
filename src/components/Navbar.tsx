import React, { useState } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Scissors className="h-8 w-8 text-amber-500" />
            <span className="ml-2 text-xl font-bold">BarberStyle</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#inicio" className="hover:text-amber-500 px-3 py-2">Inicio</a>
              <a href="#servicios" className="hover:text-amber-500 px-3 py-2">Servicios</a>
              <a href="#barberos" className="hover:text-amber-500 px-3 py-2">Barberos</a>
              <a href="#citas" className="hover:text-amber-500 px-3 py-2">Reservar Cita</a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#inicio" className="block hover:text-amber-500 px-3 py-2">Inicio</a>
            <a href="#servicios" className="block hover:text-amber-500 px-3 py-2">Servicios</a>
            <a href="#barberos" className="block hover:text-amber-500 px-3 py-2">Barberos</a>
            <a href="#citas" className="block hover:text-amber-500 px-3 py-2">Reservar Cita</a>
          </div>
        </div>
      )}
    </nav>
  );
}