import React, { useState } from 'react';
import { Search, Sparkles, BookOpen, Languages, Ghost, ArrowRight } from 'lucide-react';

const ToolCard = ({ title, description, tags, icon: Icon, type, colorClass, textClass, bgClass }) => (
  <div className="glass-card rounded-xl p-6 hover:border-cyan transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className={`${bgClass} p-3 rounded-lg ${textClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-1 rounded">{type}</span>
    </div>
    <h4 className="text-xl font-bold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    <a href="#" className="text-cyan text-sm font-semibold hover:underline flex items-center gap-1">
      Access Tool <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  </div>
);

const toolsData = [
  {
    title: "Gemini Code Assist",
    description: "Google's AI assistant tailored for generating Verilog/SystemVerilog snippets and testbenches directly in VS Code.",
    tags: "google gemini code assist verilog systemverilog",
    icon: Sparkles,
    type: "IDE Plugin",
    colorClass: "blue",
    textClass: "text-blue-400",
    bgClass: "bg-blue-900/30"
  },
  {
    title: "NotebookLM",
    description: "Analyze complex IEEE research papers on VLSI architectures. Upload PDFs and query them instantly.",
    tags: "notebooklm research papers ieee analysis",
    icon: BookOpen,
    type: "Web App",
    colorClass: "purple",
    textClass: "text-purple-400",
    bgClass: "bg-purple-900/30"
  },
  {
    title: "LLM-HDL Gen",
    description: "Translate natural language descriptions directly into synthesizable RTL code using fine-tuned open-source LLMs.",
    tags: "llm hdl generator natural language rtl",
    icon: Languages,
    type: "Open Source",
    colorClass: "green",
    textClass: "text-green-400",
    bgClass: "bg-green-900/30"
  },
  {
    title: "Google Antigravity",
    description: "Advanced AI agent for full codebase management, refactoring, and automating complex VLSI scripting tasks.",
    tags: "google antigravity ai agent codebase management",
    icon: Ghost,
    type: "Agent",
    colorClass: "red",
    textClass: "text-red-400",
    bgClass: "bg-red-900/30"
  }
];

const AITools = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = toolsData.filter(tool => 
    tool.tags.includes(searchTerm.toLowerCase()) || 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="tools" className="py-24 bg-charcoal border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Free <span className="text-silicon glow-text-green">AI Tools</span> Hub</h2>
            <p className="text-gray-400 text-lg">A curated repository of modern AI agents and LLMs adapted for chip design.</p>
          </div>
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tools (e.g. RTL, Gemini)..." 
              className="w-full md:w-80 bg-gray-900 border border-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => <ToolCard key={idx} {...tool} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <Ghost className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-400">No tools found matching your search.</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AITools;
