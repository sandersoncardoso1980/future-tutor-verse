import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Zap, Book, MessageCircle, Award, Crown } from 'lucide-react';

const Achievements = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const achievements = [
    {
      id: 1,
      title: 'Primeiro Passo',
      description: 'Fez sua primeira pergunta no chat',
      icon: <MessageCircle className="h-8 w-8" />,
      unlocked: true,
      rarity: 'comum',
      points: 10
    },
    {
      id: 2,
      title: 'Estudante Dedicado',
      description: 'Estudou por 5 horas consecutivas',
      icon: <Book className="h-8 w-8" />,
      unlocked: true,
      rarity: 'raro',
      points: 50
    },
    {
      id: 3,
      title: 'Mestre da Matemática',
      description: 'Acertou 100 exercícios de matemática',
      icon: <Trophy className="h-8 w-8" />,
      unlocked: false,
      rarity: 'épico',
      points: 100,
      progress: 67
    },
    {
      id: 4,
      title: 'Velocista do Conhecimento',
      description: 'Respondeu 10 perguntas em menos de 1 minuto',
      icon: <Zap className="h-8 w-8" />,
      unlocked: true,
      rarity: 'raro',
      points: 75
    },
    {
      id: 5,
      title: 'Explorador Científico',
      description: 'Fez perguntas em todas as matérias',
      icon: <Star className="h-8 w-8" />,
      unlocked: false,
      rarity: 'lendário',
      points: 200,
      progress: 83
    },
    {
      id: 6,
      title: 'Rei do Conhecimento',
      description: 'Alcançou o nível máximo em uma disciplina',
      icon: <Crown className="h-8 w-8" />,
      unlocked: false,
      rarity: 'lendário',
      points: 500,
      progress: 15
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'comum': return 'bg-gray-500';
      case 'raro': return 'bg-blue-500';
      case 'épico': return 'bg-purple-500';
      case 'lendário': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const totalPoints = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2 text-foreground">
            Minhas Conquistas 🏆
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso e desbloqueie novas conquistas
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{unlockedCount}</span>
              </div>
              <p className="text-sm text-muted-foreground">Conquistas Desbloqueadas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{totalPoints}</span>
              </div>
              <p className="text-sm text-muted-foreground">Pontos Totais</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Completude</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">Nível 5</span>
              </div>
              <p className="text-sm text-muted-foreground">Nível Atual</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`transition-all duration-300 ${
                achievement.unlocked 
                  ? 'shadow-lg border-primary/20' 
                  : 'opacity-75 grayscale'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}`}>
                    {achievement.icon}
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={`${getRarityColor(achievement.rarity)} text-white mb-1`}
                    >
                      {achievement.rarity}
                    </Badge>
                    <div className="text-sm font-bold">+{achievement.points} pts</div>
                  </div>
                </div>
                <CardTitle className={`text-lg ${!achievement.unlocked && 'text-muted-foreground'}`}>
                  {achievement.title}
                  {achievement.unlocked && <span className="ml-2">✨</span>}
                </CardTitle>
                <CardDescription>
                  {achievement.description}
                </CardDescription>
              </CardHeader>
              {!achievement.unlocked && achievement.progress && (
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;