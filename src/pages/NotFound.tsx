
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-3xl font-bold text-slate-700">
            <GraduationCap className="h-10 w-10" />
            <span className="font-display">EduAI</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
          <h2 className="text-2xl font-bold font-display text-slate-700 mb-2">
            Página não encontrada
          </h2>
          <p className="text-slate-600 mb-6">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-slate-600 hover:bg-slate-700 text-white">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Voltar ao Início</span>
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()} className="border-slate-300 text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Página Anterior
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
