import React from 'react';
import { Cpu, Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Cpu className="text-gray-500 w-6 h-6" />
          <span className="font-bold text-xl text-gray-500">VLSI<span className="text-gray-400">NEXUS</span></span>
        </div>
        <p className="text-gray-600 text-sm">© 2026 VLSI Nexus. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Github className="w-5 h-5" /></a>
          <a href="#" className="text-gray-500 hover:text-cyan transition-colors"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
