
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SubjectCard from '@/components/SubjectCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MessageCircle, Clock, Trophy } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vindo de volta! Vamos continuar seus estudos?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-education-50 text-education-600">
                    {stat.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Subjects */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-display mb-6">
              Professores Disponíveis
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="font-display">Conversas Recentes</CardTitle>
                <CardDescription>
                  Suas últimas interações com os professores IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentChats.map((chat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
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

            <Card className="border-0 shadow-md education-gradient text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">🚀 Dica de Hoje</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Tente fazer pelo menos 3 perguntas por dia para diferentes disciplinas. 
                  Isso ajuda a manter o aprendizado ativo!
                </p>
                <Badge variant="secondary" className="text-education-600">
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
