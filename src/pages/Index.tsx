
import { ArrowRight, BookOpen, Bot, Zap, CheckCircle, Star, Users, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'Professores IA Especializados',
      description: 'Cada disciplina tem seu próprio agente inteligente treinado com livros acadêmicos específicos.'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Base de Conhecimento Sólida',
      description: 'Respostas fundamentadas em literatura acadêmica com citações precisas de livros e capítulos.'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Respostas Instantâneas',
      description: 'Tire suas dúvidas a qualquer hora com respostas em tempo real e explicações detalhadas.'
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Aprendizado Personalizado',
      description: 'Adaptamos as explicações ao seu nível de conhecimento para máximo aproveitamento.'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Estudante de Medicina',
      content: 'A EduAI revolucionou meus estudos! As explicações são claras e sempre com referências bibliográficas.',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Estudante de Engenharia',
      content: 'Incrível como a IA consegue explicar conceitos complexos de forma simples. Recomendo!',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Professora',
      content: 'Uma ferramenta fantástica para complementar as aulas. Meus alunos adoraram!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-gray-600 text-white">
            🚀 Revolução na Educação com IA
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
            Professores Particulares
            <br />
            <span className="text-4xl md:text-6xl">com Inteligência Artificial</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Aprenda qualquer disciplina com professores virtuais especializados. 
            Cada agente de IA é treinado com livros acadêmicos para dar respostas precisas e citadas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6 bg-gray-600 hover:bg-gray-700 text-white">
              <Link to="/register" className="flex items-center space-x-2">
                <span>Começar Gratuitamente</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/login">Já tenho conta</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>4.000+ alunos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 fill-gray-400 text-gray-400" />
              <span>4.9/5 avaliação</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>50+ livros acadêmicos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4 text-gray-800">
              Por que escolher a EduAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia de ponta aliada à educação de qualidade para acelerar seu aprendizado
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full bg-gray-100 text-gray-600 group-hover:bg-gray-200 transition-colors w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-display text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4 text-gray-800">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Simples, rápido e eficiente
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Escolha a Disciplina',
                  description: 'Selecione a matéria que você quer estudar entre mais de 6 opções disponíveis.'
                },
                {
                  step: '2',
                  title: 'Faça sua Pergunta',
                  description: 'Digite sua dúvida no chat. Pode ser desde conceitos básicos até questões complexas.'
                },
                {
                  step: '3',
                  title: 'Receba a Resposta',
                  description: 'O professor IA responde instantaneamente com explicação detalhada e referências bibliográficas.'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4 text-gray-800">
              O que nossos alunos dizem
            </h2>
            <p className="text-xl text-gray-600">
              Histórias reais de sucesso acadêmico
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gray-400 text-gray-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Pronto para revolucionar seus estudos?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Junte-se a milhares de estudantes que já descobriram uma nova forma de aprender
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 bg-white text-gray-600 hover:bg-gray-100">
                <Link to="/register" className="flex items-center space-x-2">
                  <span>Criar Conta Gratuita</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-gray-300 mt-6">
              ✓ Sem cartão de crédito • ✓ Acesso imediato • ✓ Suporte 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 text-2xl font-bold mb-4">
                <BookOpen className="h-8 w-8" />
                <span className="font-display">EduAI</span>
              </div>
              <p className="text-gray-400">
                Revolucionando a educação com inteligência artificial.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Disciplinas</Link></li>
                <li><Link to="/" className="hover:text-white">Professores IA</Link></li>
                <li><Link to="/" className="hover:text-white">Recursos</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Sobre</Link></li>
                <li><Link to="/" className="hover:text-white">Blog</Link></li>
                <li><Link to="/" className="hover:text-white">Carreiras</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Ajuda</Link></li>
                <li><Link to="/" className="hover:text-white">Contato</Link></li>
                <li><Link to="/" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
