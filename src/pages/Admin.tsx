
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Upload, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { subjects } from '@/data/subjects';
import { toast } from 'sonner';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [bookDescription, setBookDescription] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/dashboard');
      toast.error('Acesso negado. Apenas administradores podem acessar esta página.');
      return;
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const handleUploadBook = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubject || !bookTitle || !bookAuthor) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simular upload do livro
    toast.success(`Livro "${bookTitle}" adicionado com sucesso à disciplina ${subjects.find(s => s.id === selectedSubject)?.name}!`);
    
    // Reset form
    setBookTitle('');
    setBookAuthor('');
    setBookDescription('');
    setSelectedSubject('');
  };

  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      label: 'Total de Usuários',
      value: '4.247',
      change: '+12% este mês',
      color: 'text-blue-600'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      label: 'Conversas Hoje',
      value: '1.834',
      change: '+8% vs ontem',
      color: 'text-green-600'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: 'Livros Cadastrados',
      value: '47',
      change: '+3 esta semana',
      color: 'text-purple-600'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: 'Satisfação',
      value: '94%',
      change: '+2% este mês',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">
            Painel Administrativo
          </h1>
          <p className="text-gray-600">
            Gerencie a plataforma EduAI e monitore métricas importantes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
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
          {/* Upload de Livros */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Adicionar Novo Livro</span>
                </CardTitle>
                <CardDescription>
                  Faça upload de um novo livro PDF para enriquecer a base de conhecimento dos professores IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadBook} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Disciplina *</Label>
                      <select
                        id="subject"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-education-500 focus:border-transparent"
                        required
                      >
                        <option value="">Selecione uma disciplina</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bookTitle">Título do Livro *</Label>
                      <Input
                        id="bookTitle"
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        placeholder="Ex: Cálculo Diferencial e Integral"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookAuthor">Autor(es) *</Label>
                    <Input
                      id="bookAuthor"
                      value={bookAuthor}
                      onChange={(e) => setBookAuthor(e.target.value)}
                      placeholder="Ex: Silva, João; Santos, Maria"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bookDescription">Descrição (Opcional)</Label>
                    <Textarea
                      id="bookDescription"
                      value={bookDescription}
                      onChange={(e) => setBookDescription(e.target.value)}
                      placeholder="Descreva brevemente o conteúdo do livro..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Arquivo PDF</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-education-500 transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Arraste e solte o arquivo PDF aqui ou clique para selecionar
                      </p>
                      <Button type="button" variant="outline" size="sm">
                        Selecionar Arquivo
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">
                        Máximo 50MB • Apenas arquivos PDF
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full education-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Livro
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Disciplinas Gerenciadas */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Disciplinas</span>
                </CardTitle>
                <CardDescription>
                  Gerencie as disciplinas disponíveis na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjects.slice(0, 4).map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-education-50 text-education-600">
                        {subject.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{subject.name}</p>
                        <p className="text-xs text-gray-500">{subject.booksCount} livros</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Disciplina
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md education-gradient text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">💡 Dicas de Administração</h3>
                <ul className="text-sm text-blue-100 space-y-2">
                  <li>• Mantenha os livros sempre atualizados</li>
                  <li>• Monitore a satisfação dos usuários</li>
                  <li>• Adicione novas disciplinas conforme demanda</li>
                  <li>• Verifique métricas de engagement regularmente</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
