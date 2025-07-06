
const GEMINI_API_KEY = 'AIzaSyCzfAqfPO2VWE-1X3LY1A2Xa2kBinZBizk';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface GeminiResponse {
  content: string;
  source?: {
    book: string;
    chapter: string;
  };
}

export const generateGeminiResponse = async (
  question: string, 
  subjectId: string, 
  subjectName: string,
  specialties: string[]
): Promise<GeminiResponse> => {
  try {
    const systemPrompt = `Você é um professor especializado em ${subjectName}. Suas especialidades incluem: ${specialties.join(', ')}.

IMPORTANTE: Você deve responder como um professor brasileiro experiente, usando linguagem clara e didática.

Responda à pergunta do aluno de forma educativa e completa, seguindo estas diretrizes:
1. Explique o conceito de forma clara e didática
2. Use exemplos práticos quando possível
3. Organize a resposta em tópicos quando necessário
4. Seja paciente e encorajador
5. Cite uma fonte fictícia realista no final (livro acadêmico da área)

Pergunta do aluno: ${question}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API do Gemini: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.candidates[0]?.content?.parts[0]?.text || 'Desculpe, não consegui processar sua pergunta no momento.';

    // Gerar fonte fictícia baseada na disciplina
    const sources = {
      mathematics: { book: 'Fundamentos da Matemática Moderna', chapter: 'Capítulo 5 - Álgebra Aplicada' },
      physics: { book: 'Física Conceitual e Aplicada', chapter: 'Capítulo 3 - Mecânica Clássica' },
      chemistry: { book: 'Química Geral e Inorgânica', chapter: 'Capítulo 7 - Ligações Químicas' },
      biology: { book: 'Biologia Celular e Molecular', chapter: 'Capítulo 4 - Genética' },
      history: { book: 'História Contemporânea do Brasil', chapter: 'Capítulo 8 - República' },
      arts: { book: 'História da Arte Brasileira', chapter: 'Capítulo 2 - Arte Moderna' }
    };

    const source = sources[subjectId as keyof typeof sources] || 
                  { book: 'Manual de Referência Acadêmica', chapter: 'Capítulo 1 - Fundamentos' };

    return {
      content: aiText,
      source
    };

  } catch (error) {
    console.error('Erro ao chamar API do Gemini:', error);
    
    // Fallback para resposta offline
    return {
      content: `Desculpe, estou com dificuldades técnicas no momento. Mas posso te ajudar offline! 

Sobre sua pergunta de ${subjectName}: Este é um tópico muito importante e interessante. Recomendo que você:

1. **Revise os conceitos básicos** da disciplina
2. **Pratique com exercícios** para fixar o aprendizado  
3. **Busque exemplos práticos** do dia a dia
4. **Tire suas dúvidas** sempre que necessário

Tente fazer sua pergunta novamente em alguns instantes, por favor! 📚`,
      source: { book: 'Material de Apoio Pedagógico', chapter: 'Capítulo 1 - Orientações Gerais' }
    };
  }
};
