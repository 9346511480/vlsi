import React from 'react';
import { Layers, Bot } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-[radial-gradient(circle_at_top_center,#111111_0%,#050505_100%)] min-h-screen flex items-center justify-center pt-20 border-b border-gray-900 overflow-hidden">
      {/* Circuit Pattern Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 242, 254, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Decorative Nodes */}
      <div className="absolute w-1 h-1 bg-cyan rounded-full shadow-[0_0_10px_#00f2fe] top-1/4 left-1/4 animate-pulse-slow"></div>
      <div className="absolute w-1 h-1 bg-cyan rounded-full shadow-[0_0_10px_#00f2fe] top-3/4 left-1/3 animate-pulse"></div>
      <div className="absolute w-1 h-1 bg-cyan rounded-full shadow-[0_0_10px_#00f2fe] top-1/3 right-1/4 animate-pulse-slow"></div>
      <div className="absolute w-1 h-1 bg-cyan rounded-full shadow-[0_0_10px_#00f2fe] bottom-1/4 right-1/3 animate-pulse"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
        <div className="mb-6 inline-flex items-center gap-2 bg-gray-900/80 border border-gray-800 px-4 py-1.5 rounded-full text-sm font-mono">
          <span className="w-2 h-2 rounded-full bg-silicon animate-pulse"></span>
          <span className="text-gray-300">v2.0 Architecture Framework Released</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Next-Gen <span className="text-cyan glow-text-cyan">VLSI Design</span><br/>
          & AI Workflows
        </h1>
        
        <p className="mt-4 text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-3xl mx-auto">
          Accelerating silicon innovation through expert RTL coding, physical design, and cutting-edge AI EDA integrations.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <a href="#projects" className="bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] hover:-translate-y-[2px] transition-all px-8 py-4 rounded-lg text-lg flex items-center justify-center gap-3">
            <Layers className="w-5 h-5" /> Explore Projects
          </a>
          <a href="#tools" className="border border-silicon text-silicon hover:bg-[rgba(57,255,20,0.1)] hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:-translate-y-[2px] transition-all px-8 py-4 rounded-lg text-lg flex items-center justify-center gap-3 bg-gray-900/50 backdrop-blur">
            <Bot className="w-5 h-5" /> Free AI Resources
          </a>
        </div>
        
        {/* Code Snippet Decorator */}
        <div className="mt-20 mx-auto max-w-2xl bg-[#0d0d0d] rounded-xl border border-gray-800 p-4 text-left shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan to-silicon"></div>
          <div className="flex gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <pre className="font-mono text-sm text-gray-300 overflow-x-auto"><code>
<span className="text-pink-500">module</span> <span className="text-blue-400">ai_accelerator</span> (
    <span className="text-cyan">input</span>  <span className="text-yellow-300">wire</span> clk,
    <span className="text-cyan">input</span>  <span className="text-yellow-300">wire</span> rst_n,
    <span className="text-cyan">output</span> <span className="text-yellow-300">reg</span> [31:0] tensor_out
);
    <span className="text-gray-500">// AI-Generated optimized datapath</span>
    <span className="text-pink-500">always</span> @(<span className="text-pink-500">posedge</span> clk <span className="text-pink-500">or negedge</span> rst_n) <span className="text-pink-500">begin</span>
        <span className="text-pink-500">if</span> (!rst_n) tensor_out &lt;= 32'h0;
        <span className="text-pink-500">else</span>        tensor_out &lt;= process_tensor(data_in);
    <span className="text-pink-500">end</span>
<span className="text-pink-500">endmodule</span>
          </code></pre>
        </div>
      </div>
    </section>
  );
};

export default Hero;
