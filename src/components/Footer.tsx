import React from 'react';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-amber-500" />
                +573238672928
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-amber-500" />
                info@barberstyle.com
              </p>
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                Carrera 22, Cali
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <div className="space-y-3">
              <p className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                Lunes a Viernes: 9:00 - 20:00
              </p>
              <p className="ml-7">Sábados: 9:00 - 18:00</p>
              <p className="ml-7">Domingos: Cerrado</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-500 hover:text-amber-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-amber-500 hover:text-amber-400">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} BarberStyle. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}