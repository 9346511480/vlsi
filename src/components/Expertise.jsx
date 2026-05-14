import React from 'react';
import { Code, LayoutTemplate, ShieldCheck, Check } from 'lucide-react';

const ExpertiseCard = ({ title, icon: Icon, description, items, colorClass, shadowClass }) => (
  <div className="glass-card p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 hover:border-cyan hover:shadow-[0_20px_40px_-10px_rgba(0,242,254,0.15)] transition-all duration-300">
    <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 blur-xl ${colorClass}`}></div>
    <div className="w-14 h-14 bg-gray-900 border border-gray-700 rounded-xl flex items-center justify-center mb-6">
      <Icon className={`w-7 h-7 ${shadowClass}`} />
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-2 font-mono text-sm text-gray-500">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center">
          <Check className={`w-4 h-4 mr-2 ${shadowClass}`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Expertise = () => {
  return (
    <section id="expertise" className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-cyan">Expertise</span></h2>
          <div className="w-24 h-1 bg-cyan mx-auto rounded-full mb-6 glow-text-cyan"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Specialized domain knowledge spanning the entire silicon lifecycle, from architecture to tape-out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ExpertiseCard 
            title="RTL & Logic Synthesis"
            icon={Code}
            description="High-performance Verilog/SystemVerilog coding, microarchitecture design, and synthesis optimization for power, performance, and area (PPA)."
            items={["SystemVerilog", "Design Compiler", "STA Analysis"]}
            colorClass="bg-cyan"
            shadowClass="text-cyan"
          />
          <ExpertiseCard 
            title="Physical Design"
            icon={LayoutTemplate}
            description="Floorplanning, placement, clock tree synthesis (CTS), and routing. Expertise in handling advanced nodes down to 3nm processes."
            items={["Floorplanning", "Clock Tree Synthesis", "Sign-off (DRC/LVS)"]}
            colorClass="bg-purple-500"
            shadowClass="text-purple-400"
          />
          <ExpertiseCard 
            title="Functional Verification"
            icon={ShieldCheck}
            description="Robust UVM-based testbench architecture, assertion-based verification (SVA), and coverage-driven methodologies to ensure first-pass silicon success."
            items={["UVM Frameworks", "Constrained Random", "Code Coverage"]}
            colorClass="bg-silicon"
            shadowClass="text-silicon"
          />
        </div>
      </div>
    </section>
  );
};

export default Expertise;
