import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';

const ConsultationModal = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to webhook
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-charcoal border border-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {!isSubmitted ? (
          <>
            <h3 className="text-2xl font-bold mb-2">Request a <span className="text-cyan">Consultation</span></h3>
            <p className="text-gray-400 text-sm mb-6">Join the VLSI Community and get a free architecture review guide directly to your inbox.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">NAME</label>
                <input type="text" required className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">WHATSAPP NUMBER</label>
                <input type="tel" required placeholder="+1 234 567 8900" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">EMAIL ADDRESS</label>
                <input type="email" required className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan" />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1">AREA OF INTEREST</label>
                <select required className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-cyan appearance-none">
                  <option value="" disabled selected>Select an area...</option>
                  <option value="RTL">RTL Design & Synthesis</option>
                  <option value="PD">Physical Design</option>
                  <option value="Verification">Functional Verification</option>
                  <option value="AI_EDA">AI EDA Tools</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {isSubmitting ? 'Processing...' : (
                  <>Submit Request <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Request Sent!</h4>
            <p className="text-gray-400 text-sm">We'll be in touch shortly via WhatsApp and Email.</p>
            <button 
              onClick={handleClose} 
              className="mt-6 text-cyan text-sm hover:underline"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationModal;
