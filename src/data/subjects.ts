
import { Calculator, Atom, Globe, BookOpen, Palette, Music } from 'lucide-react';

export const subjects = [
  {
    id: 'mathematics',
    name: 'Matemática',
    description: 'Álgebra, geometria, cálculo e muito mais com explicações detalhadas',
    icon: <Calculator className="h-6 w-6" />,
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
    icon: <Atom className="h-6 w-6" />,
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
    icon: <Globe className="h-6 w-6" />,
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
    icon: <BookOpen className="h-6 w-6" />,
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
    icon: <BookOpen className="h-6 w-6" />,
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
    icon: <Palette className="h-6 w-6" />,
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

// Respostas simuladas de IA para demonstração
export const generateAIResponse = (question: string, subjectId: string): {
  content: string;
  source: { book: string; chapter: string };
} => {
  const subject = subjects.find(s => s.id === subjectId);
  const book = subject?.books[0] || { name: 'Livro de Referência', author: 'Autor' };
  
  const responses = {
    mathematics: {
      content: `Ótima pergunta sobre matemática! Com base no meu conhecimento especializado, posso explicar que ${question.toLowerCase().includes('derivada') ? 'a derivada representa a taxa de variação instantânea de uma função' : question.toLowerCase().includes('integral') ? 'a integral representa a área sob uma curva ou o processo inverso da derivação' : 'este conceito matemático tem aplicações importantes no dia a dia'}.\n\nVou detalhar o passo a passo:\n\n1. Primeiro, identificamos os elementos principais\n2. Aplicamos as fórmulas ou teoremas relevantes\n3. Resolvemos sistematicamente\n4. Verificamos o resultado\n\nGostaria que eu explique algum passo específico com mais detalhes?`,
      source: { book: book.name, chapter: 'Capítulo 3 - Fundamentos' }
    },
    physics: {
      content: `Excelente pergunta de física! Este conceito está bem explicado na literatura especializada. ${question.toLowerCase().includes('força') ? 'As forças são grandezas vetoriais que podem alterar o estado de movimento ou repouso de um corpo' : question.toLowerCase().includes('energia') ? 'A energia é a capacidade de realizar trabalho e pode ser transformada, mas nunca destruída' : 'Este princípio físico é fundamental para compreender como o universo funciona'}.\n\nOs pontos principais são:\n\n• Definição e conceitos fundamentais\n• Leis e princípios aplicáveis\n• Exemplos práticos do cotidiano\n• Aplicações tecnológicas\n\nPrecisa de mais esclarecimentos sobre algum aspecto específico?`,
      source: { book: book.name, chapter: 'Capítulo 5 - Mecânica' }
    },
    default: {
      content: `Obrigado pela sua pergunta! Como especialista nesta disciplina, posso te ajudar com uma explicação completa.\n\n${question.length > 50 ? 'Sua pergunta é bem específica e' : 'Este é um tópico importante que'} está diretamente relacionado aos conceitos fundamentais da matéria.\n\nVou organizar a resposta em tópicos:\n\n1. **Conceito principal**: A base teórica é essencial\n2. **Aplicação prática**: Como usar no dia a dia\n3. **Exemplos**: Situações reais onde isso se aplica\n4. **Dicas de estudo**: Como fixar melhor o conteúdo\n\nTem alguma parte específica que gostaria que eu aprofunde mais?`,
      source: { book: book.name, chapter: 'Capítulo 1 - Introdução' }
    }
  };

  return responses[subjectId as keyof typeof responses] || responses.default;
};
