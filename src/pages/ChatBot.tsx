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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/5">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-display mb-4 text-foreground">
            🤖 ChatBot Educacional
          </h1>
          <p className="text-lg text-foreground/80 font-medium">
            Converse com nossos professores virtuais especializados!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:scale-105 transition-transform hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-primary/20 shadow-lg">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">6</p>
                  <p className="text-sm text-foreground/70 font-medium">Professores IA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:scale-105 transition-transform hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary/20 shadow-lg">
                  <MessageCircle className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">1.2k</p>
                  <p className="text-sm text-foreground/70 font-medium">Conversas Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:scale-105 transition-transform hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-accent/20 shadow-lg">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">&lt; 1min</p>
                  <p className="text-sm text-foreground/70 font-medium">Tempo de Resposta</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:scale-105 transition-transform hover-glow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-primary/20 shadow-lg">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-foreground/70 font-medium">Avaliação Média</p>
                </div>
              </div>
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
                  className="w-full font-semibold text-lg py-6 hover:scale-105 transition-transform" 
                  onClick={() => {
                    console.log('Navegando para chat:', professor.subject);
                    navigate(`/chat/${professor.subject}`);
                  }}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
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