import React, { useState } from 'react';
import { Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { getMenuRecommendation } from '../services/geminiService';

const AiChef: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');
    
    // Simulate thinking if API is fast, for UX
    const result = await getMenuRecommendation(prompt);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-white text-gray-900 rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-mabac-red p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-yellow-300 w-5 h-5" />
              <h3 className="font-bold text-white">Ma-Bac AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white text-sm">
              Tutup
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            {response ? (
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-sm leading-relaxed">
                <p className="font-semibold text-mabac-red mb-1">Rekomendasi:</p>
                {response}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm mt-10">
                <p>Bingung mau pesan apa?</p>
                <p>Ceritakan selera kamu (pedas, gurih, berkuah, dll)!</p>
              </div>
            )}
            {loading && (
              <div className="flex justify-center mt-4">
                <Loader2 className="animate-spin text-mabac-red" />
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Saya suka makanan pedas..."
              className="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-mabac-red focus:outline-none"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-mabac-red hover:bg-red-800 text-white rounded-full p-2 disabled:opacity-50 transition"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-mabac-red hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
      >
        {isOpen ? <MessageSquare className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </button>
    </div>
  );
};

export default AiChef;