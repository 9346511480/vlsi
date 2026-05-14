import React, { useState } from 'react';
import { Menu, X, Cpu } from 'lucide-react';

const Navbar = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-gray-900 border border-cyan flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              <Cpu className="text-cyan w-6 h-6" />
            </div>
            <span className="font-bold text-2xl tracking-wider">
              VLSI<span className="text-cyan glow-text-cyan">NEXUS</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-cyan px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="#expertise" className="text-gray-300 hover:text-cyan px-3 py-2 text-sm font-medium transition-colors">Core Expertise</a>
              <a href="#tools" className="text-gray-300 hover:text-cyan px-3 py-2 text-sm font-medium transition-colors">AI Tools</a>
              <a href="#projects" className="text-gray-300 hover:text-cyan px-3 py-2 text-sm font-medium transition-colors">Projects</a>
              <button 
                onClick={onOpenModal}
                className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:-translate-y-[2px] transition-all px-6 py-2 rounded-md text-sm"
              >
                Consultation
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-charcoal border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-cyan block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-cyan block px-3 py-2 rounded-md text-base font-medium">Core Expertise</a>
            <a href="#tools" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-cyan block px-3 py-2 rounded-md text-base font-medium">AI Tools</a>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenModal();
              }} 
              className="mt-4 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-semibold w-full px-5 py-3 rounded-md text-base text-center"
            >
              Request Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
