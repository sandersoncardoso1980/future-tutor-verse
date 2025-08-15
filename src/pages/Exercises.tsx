import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, Trophy } from 'lucide-react';

const Exercises = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const exercises = [
    {
      id: 1,
      title: 'Equações do Segundo Grau',
      subject: 'Matemática',
      difficulty: 'Intermediário',
      duration: '15 min',
      questions: 10,
      completed: false
    },
    {
      id: 2,
      title: 'Leis de Newton',
      subject: 'Física',
      difficulty: 'Iniciante',
      duration: '20 min',
      questions: 8,
      completed: true
    },
    {
      id: 3,
      title: 'Nomenclatura de Compostos',
      subject: 'Química',
      difficulty: 'Avançado',
      duration: '25 min',
      questions: 12,
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2 text-foreground">
            Exercícios 📚
          </h1>
          <p className="text-muted-foreground">
            Pratique seus conhecimentos com exercícios personalizados
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">24</span>
              </div>
              <p className="text-sm text-muted-foreground">Exercícios Disponíveis</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <p className="text-sm text-muted-foreground">Concluídos</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">87%</span>
              </div>
              <p className="text-sm text-muted-foreground">Taxa de Acerto</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">4h</span>
              </div>
              <p className="text-sm text-muted-foreground">Tempo Estudado</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="outline">{exercise.subject}</Badge>
                  {exercise.completed && (
                    <Badge variant="default" className="bg-green-500">
                      <Trophy className="h-3 w-3 mr-1" />
                      Concluído
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{exercise.title}</CardTitle>
                <CardDescription>
                  {exercise.difficulty} • {exercise.duration} • {exercise.questions} questões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant={exercise.completed ? "secondary" : "default"}
                >
                  {exercise.completed ? "Revisar" : "Iniciar Exercício"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Exercises;