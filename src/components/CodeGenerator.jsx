import React, { useState } from 'react';
import { Terminal, Code2, Play, Copy, Loader2, Check } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('// Your generated Verilog code will appear here...');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setCode('// Generating code... please wait.');

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "System Instruction: You are an expert Verilog/SystemVerilog engineer. The user will ask you to generate a hardware module. Return ONLY the raw Verilog code block. Do not include markdown formatting like ```verilog or explanations, just the code itself.\n\nUser Request: " + prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024
          }
        })
      });

      const data = await response.json();
      
      if (response.ok && data.candidates && data.candidates.length > 0) {
        let generatedText = data.candidates[0].content.parts[0].text;
        // Clean up markdown ticks if the model returns them anyway
        generatedText = generatedText.replace(/```verilog/gi, '').replace(/```v/gi, '').replace(/```/g, '').trim();
        setCode(generatedText);
      } else {
        setCode(`// Error: ${data.error?.message || 'Failed to generate code'}`);
      }
    } catch (error) {
      setCode('// Network error. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4">
            <Terminal className="w-10 h-10 text-silicon" />
            AI Verilog <span className="text-silicon glow-text-green">Generator</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">Describe your hardware logic in natural language and our Llama 3 model will instantly generate synthesis-ready Verilog code.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Input Side */}
          <div className="glass-card p-6 rounded-2xl flex flex-col h-full">
            <label className="text-sm font-mono text-gray-400 mb-3 block">NATURAL LANGUAGE PROMPT</label>
            <textarea
              className="w-full bg-gray-900 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-silicon focus:ring-1 focus:ring-silicon resize-none flex-1 min-h-[200px]"
              placeholder="e.g. Create a parameterized N-bit synchronous up counter with an active-low reset and enable signal..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="mt-6 w-full border border-silicon text-silicon hover:bg-[rgba(57,255,20,0.1)] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50 disabled:hover:shadow-none py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all"
            >
              {isGenerating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Compiling Prompt...</>
              ) : (
                <><Play className="w-5 h-5 fill-current" /> Generate RTL Code</>
              )}
            </button>
          </div>

          {/* Output Side */}
          <div className="bg-[#050505] border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-full shadow-2xl relative">
            <div className="bg-gray-900 border-b border-gray-800 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
                <Code2 className="w-4 h-4 text-cyan" /> output.v
              </div>
              <button 
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono bg-gray-800 px-3 py-1 rounded"
              >
                {isCopied ? <><Check className="w-3 h-3 text-silicon" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Code</>}
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto max-h-[400px]">
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                <code className="language-verilog">{code}</code>
              </pre>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CodeGenerator;
