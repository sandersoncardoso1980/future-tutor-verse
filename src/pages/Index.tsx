
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground">
            🚀 Revolução na Educação com IA
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Professores Particulares
            <br />
            <span className="text-4xl md:text-6xl">com Inteligência Artificial</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Aprenda qualquer disciplina com professores virtuais especializados. 
            Cada agente de IA é treinado com livros acadêmicos para dar respostas precisas e citadas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/register" className="flex items-center space-x-2">
                <span>Começar Gratuitamente</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/login">Já tenho conta</Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>4.000+ alunos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 fill-primary text-primary" />
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
            <h2 className="text-4xl font-bold font-display mb-4 text-foreground">
              Por que escolher a EduAI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta aliada à educação de qualidade para acelerar seu aprendizado
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4 text-foreground">
              Como funciona?
            </h2>
            <p className="text-xl text-muted-foreground">
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
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Adicionando botão para experimentar */}
          <div className="text-center mt-12">
            <Button size="lg" asChild className="text-lg px-8 py-6 animate-pulse-glow">
              <Link to="/register" className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Experimentar Agora</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de sucesso acadêmico
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Pronto para revolucionar seus estudos?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de estudantes que já descobriram uma nova forma de aprender
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
                <Link to="/register" className="flex items-center space-x-2">
                  <span>Criar Conta Gratuita</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <p className="text-sm opacity-75 mt-6">
              ✓ Sem cartão de crédito • ✓ Acesso imediato • ✓ Suporte 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 text-2xl font-bold mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="font-display">EduAI</span>
              </div>
              <p className="text-muted-foreground">
                Revolucionando a educação com inteligência artificial.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">Disciplinas</Link></li>
                <li><Link to="/" className="hover:text-foreground">Professores IA</Link></li>
                <li><Link to="/" className="hover:text-foreground">Recursos</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">Sobre</Link></li>
                <li><Link to="/" className="hover:text-foreground">Blog</Link></li>
                <li><Link to="/" className="hover:text-foreground">Carreiras</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">Ajuda</Link></li>
                <li><Link to="/" className="hover:text-foreground">Contato</Link></li>
                <li><Link to="/" className="hover:text-foreground">Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EduAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
