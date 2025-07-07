
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
            {subject.icon}
          </div>
          <Badge variant="secondary" className="text-xs">
            {subject.booksCount} livros
          </Badge>
        </div>
        <CardTitle className="text-xl font-display text-slate-800">{subject.name}</CardTitle>
        <CardDescription className="text-gray-600">
          {subject.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
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

        <Button asChild className="w-full bg-slate-600 hover:bg-slate-700 text-white">
          <Link to={`/chat/${subject.id}`} className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Iniciar Conversa</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
