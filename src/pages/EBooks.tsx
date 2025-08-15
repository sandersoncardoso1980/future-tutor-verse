import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Download, Eye, Star, Clock } from 'lucide-react';

const EBooks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const ebooks = [
    {
      id: 1,
      title: 'Matemática Básica Ilustrada',
      subject: 'Matemática',
      pages: 120,
      rating: 4.8,
      downloads: 1250,
      cover: '📐',
      description: 'Conceitos fundamentais de matemática com exemplos práticos'
    },
    {
      id: 2,
      title: 'Física Moderna para Iniciantes',
      subject: 'Física',
      pages: 95,
      rating: 4.6,
      downloads: 890,
      cover: '⚛️',
      description: 'Introdução à física quântica e relatividade'
    },
    {
      id: 3,
      title: 'Química Orgânica Essencial',
      subject: 'Química',
      pages: 150,
      rating: 4.9,
      downloads: 2100,
      cover: '🧪',
      description: 'Estruturas e reações dos compostos orgânicos'
    },
    {
      id: 4,
      title: 'História do Brasil Colonial',
      subject: 'História',
      pages: 200,
      rating: 4.7,
      downloads: 750,
      cover: '📜',
      description: 'Período colonial brasileiro detalhado'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2 text-foreground">
            E-Books 📖
          </h1>
          <p className="text-muted-foreground">
            Biblioteca digital com materiais de estudo completos
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Book className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">42</span>
              </div>
              <p className="text-sm text-muted-foreground">E-Books Disponíveis</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Download className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="text-sm text-muted-foreground">Downloads</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">6</span>
              </div>
              <p className="text-sm text-muted-foreground">Lendo Atualmente</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">25h</span>
              </div>
              <p className="text-sm text-muted-foreground">Tempo de Leitura</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ebooks.map((ebook) => (
            <Card key={ebook.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{ebook.cover}</div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{ebook.subject}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{ebook.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{ebook.title}</CardTitle>
                <CardDescription className="text-sm">
                  {ebook.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{ebook.pages} páginas</span>
                  <span>{ebook.downloads} downloads</span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Ler Online
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EBooks;