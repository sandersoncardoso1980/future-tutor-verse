
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SubjectCard from '@/components/SubjectCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MessageCircle, Clock, Trophy, Book } from 'lucide-react';
import { subjects } from '@/data/subjects';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const stats = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: 'Conversas',
      value: '24',
      change: '+12% esta semana'
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'Horas Estudadas',
      value: '18h',
      change: '+3h esta semana'
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Disciplinas',
      value: '6',
      change: 'Todas disponíveis'
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      label: 'Nível',
      value: 'Intermediário',
      change: 'Continue praticando!'
    }
  ];

  const recentChats = [
    {
      subject: 'Matemática',
      question: 'Como resolver equações do segundo grau?',
      time: '2 horas atrás'
    },
    {
      subject: 'Física',
      question: 'Explique o conceito de energia cinética',
      time: '1 dia atrás'
    },
    {
      subject: 'Química',
      question: 'Qual a diferença entre ácidos e bases?',
      time: '2 dias atrás'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/5">
      <Header />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-display mb-2 text-foreground">
            Olá, {user.name || user.email}! 👋
          </h1>
          <p className="text-foreground/70 font-medium">
            Bem-vindo de volta! Vamos continuar seus estudos?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary w-fit mb-2 sm:mb-0 shadow-lg">
                    {stat.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium w-fit">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-xs sm:text-sm text-foreground/70 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:scale-105"
            onClick={() => navigate('/chatbot')}
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="p-3 sm:p-4 rounded-full bg-primary/10 text-primary w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">ChatBot</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Converse com professores IA especializados
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md"
            onClick={() => navigate('/exercises')}
          >
            <CardContent className="p-6 text-center">
              <div className="p-4 rounded-full bg-secondary/10 text-secondary w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Exercícios</h3>
              <p className="text-sm text-muted-foreground">
                Pratique com exercícios personalizados
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md"
            onClick={() => navigate('/ebooks')}
          >
            <CardContent className="p-6 text-center">
            <div className="p-4 rounded-full bg-accent/10 text-accent w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Book className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">E-Books</h3>
              <p className="text-sm text-muted-foreground">
                Acesse nossa biblioteca digital
              </p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md"
            onClick={() => navigate('/achievements')}
          >
            <CardContent className="p-6 text-center">
              <div className="p-4 rounded-full bg-primary/10 text-primary w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold mb-2">Minhas Conquistas</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe seu progresso e conquistas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Available Subjects */}
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold font-display mb-4 sm:mb-6 text-foreground">
              🎓 Professores Disponíveis
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md bg-white">
              <CardHeader>
                <CardTitle className="font-display text-slate-800">Conversas Recentes</CardTitle>
                <CardDescription className="text-gray-600">
                  Suas últimas interações com os professores IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentChats.map((chat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                        {chat.subject}
                      </Badge>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {chat.question}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-slate-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">🚀 Dica de Hoje</h3>
                <p className="text-sm text-slate-200 mb-4">
                  Tente fazer pelo menos 3 perguntas por dia para diferentes disciplinas. 
                  Isso ajuda a manter o aprendizado ativo!
                </p>
                <Badge variant="secondary" className="bg-white text-slate-600">
                  Meta: 3/3 ✓
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
