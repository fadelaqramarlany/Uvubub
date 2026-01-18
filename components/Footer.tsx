import React from 'react';
import { Instagram, Phone, MapPin, Lock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mabac-darkgray border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">MA-BAC <span className="text-mabac-red">BBQ</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Menghadirkan cita rasa otentik Korea di jantung kota Medan. 
              Bahan berkualitas, suasana nyaman, dan harga bersahabat.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Hubungi Kami</h4>
            <div className="flex items-start space-x-3 text-gray-400">
              <MapPin className="w-5 h-5 text-mabac-red mt-1 shrink-0" />
              <span className="text-sm">{CONTACT_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <Phone className="w-5 h-5 text-mabac-red shrink-0" />
              <span className="text-sm">{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <Instagram className="w-5 h-5 text-mabac-red shrink-0" />
              <span className="text-sm">{CONTACT_INFO.instagram}</span>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Jam Operasional</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Senin - Jumat</span>
                <span>11:00 - 22:00</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Sabtu - Minggu</span>
                <span>11:00 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ma-Bac Korean BBQ. All rights reserved.</p>
          <Link to="/admin" className="flex items-center space-x-1 mt-4 md:mt-0 hover:text-mabac-red transition">
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;