import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, Clock, Star, Users, Zap } from 'lucide-react';

const ChatBot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const chatOptions = [
    {
      subject: 'matematica',
      name: 'Prof. Newton',
      specialty: 'Matemática',
      description: 'Especialista em álgebra, geometria e cálculo',
      avatar: '🧮',
      students: 1250,
      responseTime: '< 1min'
    },
    {
      subject: 'fisica',
      name: 'Prof. Einstein',
      specialty: 'Física',
      description: 'Mecânica, termodinâmica e física moderna',
      avatar: '⚛️',
      students: 890,
      responseTime: '< 1min'
    },
    {
      subject: 'quimica',
      name: 'Prof. Curie',
      specialty: 'Química',
      description: 'Química orgânica, inorgânica e físico-química',
      avatar: '🧪',
      students: 720,
      responseTime: '< 1min'
    },
    {
      subject: 'biologia',
      name: 'Prof. Darwin',
      specialty: 'Biologia',
      description: 'Genética, evolução e biologia molecular',
      avatar: '🔬',
      students: 650,
      responseTime: '< 1min'
    },
    {
      subject: 'historia',
      name: 'Prof. Heródoto',
      specialty: 'História',
      description: 'História mundial, do Brasil e contemporânea',
      avatar: '📜',
      students: 580,
      responseTime: '< 1min'
    },
    {
      subject: 'portugues',
      name: 'Prof. Camões',
      specialty: 'Português',
      description: 'Gramática, literatura e redação',
      avatar: '📚',
      students: 950,
      responseTime: '< 1min'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2 text-foreground">
            ChatBot Educacional 🤖
          </h1>
          <p className="text-muted-foreground">
            Converse com nossos professores virtuais especializados
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">6</span>
              </div>
              <p className="text-sm text-muted-foreground">Professores IA</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">1.2k</span>
              </div>
              <p className="text-sm text-muted-foreground">Conversas Hoje</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">&lt; 1min</span>
              </div>
              <p className="text-sm text-muted-foreground">Tempo de Resposta</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatOptions.map((professor) => (
            <Card key={professor.subject} className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{professor.avatar}</div>
                <CardTitle className="text-xl">{professor.name}</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary">
                  {professor.specialty}
                </CardDescription>
                <CardDescription>
                  {professor.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{professor.students} estudantes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">{professor.responseTime}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/chat/${professor.subject}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Iniciar Conversa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;