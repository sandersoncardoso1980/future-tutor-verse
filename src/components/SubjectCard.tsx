
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  studentsCount: number;
  booksCount: number;
  averageResponseTime: string;
  specialties: string[];
}

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shadow-lg">
            {subject.icon}
          </div>
          <Badge variant="secondary" className="text-xs font-semibold">
            {subject.booksCount} livros
          </Badge>
        </div>
        <CardTitle className="text-xl font-display text-foreground font-bold">{subject.name}</CardTitle>
        <CardDescription className="text-foreground/70 font-medium">
          {subject.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm text-foreground/60 font-medium">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{subject.studentsCount} alunos</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{subject.averageResponseTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {subject.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Button asChild className="w-full font-semibold text-base sm:text-lg py-4 sm:py-6 hover:scale-105 transition-transform">
            <Link to={`/chat/${subject.id}`} className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Iniciar Conversa</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
