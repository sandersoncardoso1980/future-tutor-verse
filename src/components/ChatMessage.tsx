
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Bot, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    source?: {
      book: string;
      chapter: string;
    };
  };
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 max-w-4xl",
      message.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
    )}>
      <Avatar className="h-8 w-8 mt-1">
        <AvatarFallback className={cn(
          message.sender === 'user' 
            ? 'bg-education-500 text-white' 
            : 'bg-gray-100 text-gray-700'
        )}>
          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "flex flex-col max-w-[80%]",
        message.sender === 'user' ? 'items-end' : 'items-start'
      )}>
        <Card className={cn(
          "p-4 border-0 shadow-sm",
          message.sender === 'user' 
            ? 'bg-education-500 text-white' 
            : 'bg-gray-50 text-gray-900'
        )}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </Card>

        {message.source && (
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="outline" className="text-xs flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>{message.source.book} - {message.source.chapter}</span>
            </Badge>
          </div>
        )}

        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
