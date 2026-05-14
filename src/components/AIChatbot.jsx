import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am the VLSI AI Co-Pilot. Ask me anything about RTL design, Verilog, or physical design workflows!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'VLSI Nexus'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-8b-instruct:free',
          messages: [
            { 
              role: 'system', 
              content: 'You are an expert VLSI design assistant. You help engineers with Verilog, SystemVerilog, UVM, Physical Design, and ASIC workflows. Provide concise, highly technical, and accurate answers. Format code in markdown.'
            },
            ...messages,
            { role: 'user', content: userMessage }
          ],
          temperature: 0.5,
          max_tokens: 1024
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${data.error?.message || 'Failed to generate response'}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-110 transition-transform z-40 group"
      >
        <Bot className="w-7 h-7" />
        <span className="absolute right-16 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none border border-cyan text-cyan">
          AI Co-Pilot
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed right-6 z-50 flex flex-col bg-charcoal border border-gray-800 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ${isMinimized ? 'bottom-24 w-80 h-16' : 'bottom-6 w-96 h-[600px] max-h-[80vh]'}`}>
      
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-900/50 flex items-center justify-center text-cyan">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              VLSI Co-Pilot <span className="w-2 h-2 rounded-full bg-silicon animate-pulse"></span>
            </h3>
            <p className="text-xs text-gray-400">Powered by Groq Llama 3</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="hover:text-white transition-colors">
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); setIsMinimized(false); }} className="hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-cyan text-black rounded-br-sm' : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-sm'}`}>
                  {msg.role === 'assistant' ? (
                    <div className="whitespace-pre-wrap font-mono leading-relaxed" style={{ fontSize: '0.85rem' }}>{msg.content}</div>
                  ) : (
                    <div>{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 p-3 rounded-2xl rounded-bl-sm flex items-center gap-2 text-cyan">
                  <Loader2 className="w-4 h-4 animate-spin" /> <span className="text-xs font-mono">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-gray-900 border-t border-gray-800">
            <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-cyan rounded-full flex items-center justify-center text-black disabled:opacity-50 hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
