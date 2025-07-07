
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const success = await register(email, password, name);
    
    if (success) {
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } else {
      toast.error('Email já cadastrado');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-slate-700">
            <GraduationCap className="h-10 w-10 text-slate-600" />
            <span className="font-display text-slate-700">EduAI</span>
          </Link>
          <p className="text-slate-600 mt-2">Crie sua conta gratuita</p>
        </div>

        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display text-slate-800">Criar Conta</CardTitle>
            <CardDescription className="text-slate-600">
              Junte-se a milhares de estudantes que já revolucionaram seus estudos
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-slate-800"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-slate-400 focus:ring-slate-400 text-slate-800"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-slate-700 hover:bg-slate-800 text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta Gratuita'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-slate-700 hover:underline font-medium">
                  Fazer login
                </Link>
              </p>
            </div>

            <div className="mt-4 text-xs text-center text-slate-500">
              Ao criar uma conta, você concorda com nossos{' '}
              <Link to="/" className="text-slate-600 hover:underline">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link to="/" className="text-slate-600 hover:underline">
                Política de Privacidade
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
