
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowLeft, BookOpen } from 'lucide-react';
import { subjects, generateAIResponse } from '@/data/subjects';
import { toast } from 'sonner';
import { searchTenorGifs, getRemainingTenorUsage, incrementTenorUsage } from '@/services/tenorService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  source?: {
    book: string;
    chapter: string;
  };
  gifs?: string[];
}

const Chat = () => {
  const { subject: subjectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subject = subjects.find(s => s.id === subjectId);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!subject) {
      navigate('/dashboard');
      return;
    }

    // Mensagem de boas-vindas
    const welcomeMessage: Message = {
      id: '1',
      content: `Olá! Eu sou o professor especializado em ${subject.name}. Tenho acesso a ${subject.booksCount} livros acadêmicos da área e posso te ajudar com:\n\n${subject.specialties.map(s => `• ${s}`).join('\n')}\n\nFaça sua primeira pergunta e vamos começar a estudar juntos! 📚`,
      sender: 'ai',
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
  }, [user, subject, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Usar a API do Gemini
      const aiResponse = await generateAIResponse(inputMessage, subjectId || 'default');
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date(),
        source: aiResponse.source,
      };

      // Se o aluno pedir um modelo visual, buscar GIFs no Tenor (limite 3 por aluno/dia)
      const isVisualRequest = /\b(gif|imagem|visual|modelo visual|me mostre|me mostra|mostra|exemplo visual)\b/i.test(inputMessage);
      if (isVisualRequest && user) {
        const remaining = getRemainingTenorUsage(user.id, 3);
        if (remaining <= 0) {
          toast.info('Limite diário de 3 GIFs atingido.');
        } else {
          try {
            const maxToFetch = Math.min(3, remaining);
            const query = `${subject.name} ${inputMessage}`;
            const gifs = await searchTenorGifs(query, maxToFetch);
            if (gifs.length > 0) {
              aiMessage.gifs = gifs;
              incrementTenorUsage(user.id, gifs.length);
            }
          } catch (err) {
            console.error('Erro ao buscar GIFs no Tenor:', err);
          }
        }
      }

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      toast.error('Erro ao processar sua pergunta. Tente novamente.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, houve um erro ao processar sua pergunta. Por favor, tente novamente.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user || !subject) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                {subject.icon}
              </div>
              <div>
                <h1 className="text-xl font-bold font-display text-slate-800">{subject.name}</h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                    {subject.booksCount} livros
                  </Badge>
                  <span>•</span>
                  <span>{subject.averageResponseTime} resposta</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {subject.studentsCount} alunos conectados
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto p-4 max-w-4xl">
        <div className="space-y-6 pb-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <span className="text-sm text-gray-500">Professor está pensando...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Textarea
                placeholder={`Faça uma pergunta sobre ${subject.name}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="min-h-[44px] resize-none border-gray-300 focus:border-slate-500 focus:ring-slate-500"
                rows={1}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-slate-600 hover:bg-slate-700 text-white px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>
              Pressione Enter para enviar, Shift + Enter para nova linha
            </span>
            <span>
              Powered by Gemini AI • {subject.booksCount} livros acadêmicos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
