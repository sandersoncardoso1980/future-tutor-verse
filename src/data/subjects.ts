
import { Calculator, Atom, Globe, BookOpen, Palette, Music } from 'lucide-react';
import { generateGeminiResponse, type GeminiResponse } from '@/services/geminiService';

export const subjects = [
  {
    id: 'mathematics',
    name: 'Matemática',
    description: 'Álgebra, geometria, cálculo e muito mais com explicações detalhadas',
    icon: 'Calculator',
    studentsCount: 1247,
    booksCount: 8,
    averageResponseTime: '< 30s',
    specialties: ['Álgebra', 'Geometria', 'Cálculo', 'Estatística'],
    books: [
      { name: 'Fundamentos da Matemática', author: 'Silva, João', chapters: 15 },
      { name: 'Cálculo Diferencial', author: 'Santos, Maria', chapters: 12 }
    ]
  },
  {
    id: 'physics',
    name: 'Física',
    description: 'Mecânica, termodinâmica, eletromagnetismo e física moderna',
    icon: 'Atom',
    studentsCount: 892,
    booksCount: 6,
    averageResponseTime: '< 45s',
    specialties: ['Mecânica', 'Termodinâmica', 'Eletromagnetismo', 'Óptica'],
    books: [
      { name: 'Física Clássica', author: 'Oliveira, Pedro', chapters: 18 },
      { name: 'Física Moderna', author: 'Costa, Ana', chapters: 14 }
    ]
  },
  {
    id: 'chemistry',
    name: 'Química',
    description: 'Química orgânica, inorgânica, físico-química e bioquímica',
    icon: 'Globe',
    studentsCount: 756,
    booksCount: 7,
    averageResponseTime: '< 40s',
    specialties: ['Orgânica', 'Inorgânica', 'Físico-química', 'Analítica'],
    books: [
      { name: 'Química Geral', author: 'Lima, Carlos', chapters: 20 },
      { name: 'Química Orgânica', author: 'Ferreira, Lucia', chapters: 16 }
    ]
  },
  {
    id: 'biology',
    name: 'Biologia',
    description: 'Citologia, genética, ecologia e evolução explicadas de forma clara',
    icon: 'BookOpen',
    studentsCount: 634,
    booksCount: 5,
    averageResponseTime: '< 35s',
    specialties: ['Citologia', 'Genética', 'Ecologia', 'Evolução'],
    books: [
      { name: 'Biologia Celular', author: 'Rocha, Roberto', chapters: 22 },
      { name: 'Genética Moderna', author: 'Alves, Patricia', chapters: 19 }
    ]
  },
  {
    id: 'history',
    name: 'História',
    description: 'História do Brasil, mundial, antiga e contemporânea',
    icon: 'BookOpen',
    studentsCount: 543,
    booksCount: 9,
    averageResponseTime: '< 25s',
    specialties: ['Brasil', 'Mundial', 'Antiga', 'Contemporânea'],
    books: [
      { name: 'História do Brasil', author: 'Souza, Miguel', chapters: 25 },
      { name: 'História Mundial', author: 'Martins, Clara', chapters: 30 }
    ]
  },
  {
    id: 'arts',
    name: 'Artes',
    description: 'História da arte, técnicas de desenho, pintura e expressão artística',
    icon: 'Palette',
    studentsCount: 321,
    booksCount: 4,
    averageResponseTime: '< 20s',
    specialties: ['História da Arte', 'Desenho', 'Pintura', 'Escultura'],
    books: [
      { name: 'Arte Clássica', author: 'Barbosa, Helena', chapters: 12 },
      { name: 'Arte Moderna', author: 'Ramos, Diego', chapters: 15 }
    ]
  }
];

// Função para obter o ícone correto baseado no nome
export const getSubjectIcon = (iconName: string) => {
  const icons = {
    Calculator,
    Atom,
    Globe,
    BookOpen,
    Palette,
    Music
  };
  
  const IconComponent = icons[iconName as keyof typeof icons] || BookOpen;
  return IconComponent;
};

// Nova função que usa a API do Gemini
export const generateAIResponse = async (question: string, subjectId: string): Promise<GeminiResponse> => {
  const subject = subjects.find(s => s.id === subjectId);
  
  if (!subject) {
    return {
      content: 'Disciplina não encontrada. Por favor, selecione uma disciplina válida.',
      source: { book: 'Sistema EduAI', chapter: 'Erro de Sistema' }
    };
  }

  return await generateGeminiResponse(question, subjectId, subject.name, subject.specialties);
};
