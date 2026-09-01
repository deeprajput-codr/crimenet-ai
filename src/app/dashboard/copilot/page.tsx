// ============================================================
// CrimeNet AI — AI Copilot Page
// ============================================================
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Plus, Sparkles, FileText, User, Bot, Lightbulb } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn, delay } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: { title: string; id: string }[];
}

const suggestedQueries = [
  'Who are the key players in the Rohini drug syndicate?',
  'Show connections between CASE001 and CASE007',
  'What evidence links Vikram Rathore to arms dealing?',
  'Summarize the Mumbai hawala network investigation',
  'Which suspects have the highest risk scores?',
  'Generate a brief for the Lucknow fraud case',
  'Find common associates between P001 and P004',
  'What patterns exist in the Bihar arms smuggling?',
];

const mockResponses: Record<string, { content: string; citations?: { title: string; id: string }[] }> = {
  default: {
    content: `Based on my analysis of the intelligence database, here's what I found:\n\n**Key Findings:**\n1. The query matches multiple entities across the criminal network\n2. Cross-referencing CDR data, surveillance reports, and financial records reveals several patterns\n3. Recommend expanding the investigation scope to include linked organizations\n\n**Risk Assessment:** The associated entities show elevated risk scores, suggesting active criminal operations.\n\n**Recommended Actions:**\n- Deploy additional surveillance on primary suspects\n- Request CDR analysis for newly identified phone numbers\n- Coordinate with neighboring state police for cross-border operations`,
    citations: [
      { title: 'CDR Analysis Report - Vikram Rathore', id: 'E001' },
      { title: 'Rohini Drug Syndicate Case File', id: 'CASE001' },
    ],
  },
};

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello, I\'m your AI Investigation Copilot. I can help you analyze criminal networks, find connections between entities, summarize cases, and generate investigation briefs. How can I assist you today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    await delay(1500 + Math.random() * 1500);

    const response = mockResponses.default;
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date().toISOString(),
      citations: response.citations,
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-160px)]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass-card-static rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyber-blue/20 to-purple-accent/20">
            <Sparkles size={18} className="text-cyber-blue" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">AI Investigation Copilot</h2>
            <p className="text-[10px] text-slate-500">Powered by CrimeNet Intelligence Engine</p>
          </div>
          <Badge variant="success" dot pulse size="sm" className="ml-auto">Online</Badge>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : '')}
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-cyber-blue to-blue-600'
                  : 'bg-gradient-to-br from-purple-accent/30 to-pink-accent/30 border border-white/10'
              )}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-purple-accent" />}
              </div>

              <div className={cn(
                'max-w-[75%] rounded-xl px-4 py-3',
                msg.role === 'user'
                  ? 'bg-cyber-blue/15 border border-cyber-blue/20'
                  : 'bg-white/5 border border-white/5'
              )}>
                <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {msg.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line.startsWith('**') && line.endsWith('**')
                        ? <strong className="text-white">{line.replace(/\*\*/g, '')}</strong>
                        : line.startsWith('- ')
                        ? <span className="block ml-2">• {line.slice(2)}</span>
                        : line.startsWith('#')
                        ? <span className="block text-white font-semibold mt-2">{line.replace(/^#+\s*/, '')}</span>
                        : line}
                      {'\n'}
                    </React.Fragment>
                  ))}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Sources</p>
                    {msg.citations.map((cite, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-cyber-blue hover:text-cyber-blue/80 cursor-pointer">
                        <FileText size={12} />
                        {cite.title}
                        <Badge variant="outline" size="sm">{cite.id}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-accent/30 to-pink-accent/30 border border-white/10 flex items-center justify-center">
                <Bot size={14} className="text-purple-accent" />
              </div>
              <div className="flex gap-1 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask about cases, suspects, evidence, or patterns..."
              className="flex-1 glass-input rounded-lg px-4 py-2.5 text-sm"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2.5 rounded-lg bg-gradient-to-r from-cyber-blue-dim to-blue-600 text-white hover:shadow-lg hover:shadow-cyber-blue/25 transition-all disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Suggested Queries */}
      <div className="w-72 shrink-0 hidden xl:block space-y-4">
        <Card hover={false} padding="md">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Lightbulb size={14} className="text-amber-400" /> Suggested Queries
          </h3>
          <div className="space-y-2">
            {suggestedQueries.map((query, i) => (
              <button
                key={i}
                onClick={() => handleSend(query)}
                className="w-full text-left p-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors leading-relaxed"
              >
                {query}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
