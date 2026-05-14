import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import AITools from './components/AITools';
import CodeGenerator from './components/CodeGenerator';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ConsultationModal from './components/ConsultationModal';
import AIChatbot from './components/AIChatbot';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      <main>
        <Hero />
        <Expertise />
        <CodeGenerator />
        <AITools />
      </main>

      <Footer />
      <FloatingActions onOpenModal={() => setIsModalOpen(true)} />
      
      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <AIChatbot />
    </div>
  );
}

export default App;
