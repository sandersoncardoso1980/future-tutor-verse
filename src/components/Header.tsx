
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, User, ChevronDown, LayoutDashboard, Settings, LogOut, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-primary">
          <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="font-display">EduAI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors font-semibold text-base lg:text-lg">
            🏠 Início
          </Link>
          {user && (
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-semibold text-base lg:text-lg">
              📚 Área do Aluno
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-foreground font-medium">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline font-semibold text-sm">{user.name || user.email}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-foreground font-semibold">Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center text-foreground font-medium">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Área do Aluno
                  </Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center text-foreground font-medium">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center text-destructive font-medium">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild className="font-semibold text-sm sm:text-base">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild className="font-semibold text-sm sm:text-base px-3 sm:px-6">
                <Link to="/register">Começar Grátis</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
