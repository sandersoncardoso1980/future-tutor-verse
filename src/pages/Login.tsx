
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Preencha todos os campos');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } else {
      toast.error('Email ou senha incorretos');
    }
  };

  const fillTestUser = (type: 'student' | 'admin') => {
    if (type === 'student') {
      setEmail('aluno@teste.com');
      setPassword('senha123');
    } else {
      setEmail('admin@teste.com');
      setPassword('admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-slate-700">
            <GraduationCap className="h-10 w-10 text-slate-600" />
            <span className="font-display text-slate-700">EduAI</span>
          </Link>
          <p className="text-slate-600 mt-2">Entre na sua conta</p>
        </div>

        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-display text-slate-800">Fazer Login</CardTitle>
            <CardDescription className="text-slate-600">
              Entre com suas credenciais para acessar a plataforma
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Sua senha"
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

              <Button 
                type="submit" 
                className="w-full bg-slate-700 hover:bg-slate-800 text-white transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-center text-sm text-slate-500">
                Contas de teste para demonstração:
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestUser('student')}
                  className="flex-1 text-xs border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Aluno Teste
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillTestUser('admin')}
                  className="flex-1 text-xs border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Admin Teste
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-slate-700 hover:underline font-medium">
                  Criar conta gratuita
                </Link>
              </p>
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

export default Login;
