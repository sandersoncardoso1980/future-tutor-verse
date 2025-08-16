-- First create the subjects table for courses/subjects
CREATE TABLE public.subjects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  icon text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create achievements table
CREATE TABLE public.achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'general',
  points integer NOT NULL DEFAULT 0,
  earned_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  subject_id uuid,
  message text NOT NULL,
  response text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create exercises table
CREATE TABLE public.exercises (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id uuid,
  title text NOT NULL,
  description text,
  question text NOT NULL,
  correct_answer text NOT NULL,
  difficulty_level text NOT NULL DEFAULT 'easy',
  points integer NOT NULL DEFAULT 10,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user_exercise_attempts table
CREATE TABLE public.user_exercise_attempts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  exercise_id uuid NOT NULL,
  user_answer text NOT NULL,
  is_correct boolean NOT NULL DEFAULT false,
  points_earned integer NOT NULL DEFAULT 0,
  completed_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create ebooks table
CREATE TABLE public.ebooks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  author text,
  subject_id uuid,
  description text,
  file_url text,
  cover_image_url text,
  pages integer,
  published_date date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('student', 'admin', 'teacher');

-- Update profiles table to include role
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'student';

-- Enable Row Level Security on all tables
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_exercise_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subjects
CREATE POLICY "Anyone can view subjects" ON public.subjects
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage subjects" ON public.subjects
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Create RLS policies for achievements
CREATE POLICY "Users can view their own achievements" ON public.achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create achievements" ON public.achievements
  FOR INSERT WITH CHECK (true);

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view their own messages" ON public.chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages" ON public.chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" ON public.chat_messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for exercises
CREATE POLICY "Anyone can view exercises" ON public.exercises
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage exercises" ON public.exercises
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Create RLS policies for user_exercise_attempts
CREATE POLICY "Users can view their own attempts" ON public.user_exercise_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts" ON public.user_exercise_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts" ON public.user_exercise_attempts
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Create RLS policies for ebooks
CREATE POLICY "Anyone can view ebooks" ON public.ebooks
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage ebooks" ON public.ebooks
  FOR ALL USING (
    auth.uid() IN (
      SELECT user_id FROM public.profiles WHERE role = 'admin'
    )
  );

-- Insert sample subjects
INSERT INTO public.subjects (name, description, icon) VALUES
  ('Matemática', 'Aprenda matemática de forma divertida e interativa', '🔢'),
  ('Português', 'Melhore suas habilidades de leitura e escrita', '📚'),
  ('Ciências', 'Explore o mundo da ciência e descobertas', '🔬'),
  ('História', 'Descubra eventos históricos fascinantes', '🏛️'),
  ('Geografia', 'Conheça o mundo e suas culturas', '🌍'),
  ('Inglês', 'Aprenda inglês de forma prática', '🗣️');

-- Insert sample exercises
INSERT INTO public.exercises (subject_id, title, description, question, correct_answer, difficulty_level, points) VALUES
  ((SELECT id FROM public.subjects WHERE name = 'Matemática' LIMIT 1), 'Adição Básica', 'Exercício simples de adição', 'Quanto é 2 + 2?', '4', 'easy', 10),
  ((SELECT id FROM public.subjects WHERE name = 'Matemática' LIMIT 1), 'Multiplicação', 'Exercício de multiplicação', 'Quanto é 7 x 8?', '56', 'medium', 20),
  ((SELECT id FROM public.subjects WHERE name = 'Português' LIMIT 1), 'Ortografia', 'Exercício de ortografia', 'Como se escreve corretamente: "exceção" ou "excessão"?', 'exceção', 'easy', 10),
  ((SELECT id FROM public.subjects WHERE name = 'Ciências' LIMIT 1), 'Sistema Solar', 'Conhecimento sobre planetas', 'Qual é o maior planeta do sistema solar?', 'Júpiter', 'medium', 15);

-- Insert sample ebooks
INSERT INTO public.ebooks (title, author, subject_id, description, pages) VALUES
  ('Matemática Divertida', 'Prof. João Silva', (SELECT id FROM public.subjects WHERE name = 'Matemática' LIMIT 1), 'Um guia completo para aprender matemática de forma divertida', 120),
  ('Português para Todos', 'Profa. Maria Santos', (SELECT id FROM public.subjects WHERE name = 'Português' LIMIT 1), 'Gramática e literatura de forma simples', 200),
  ('Descobrindo as Ciências', 'Dr. Pedro Oliveira', (SELECT id FROM public.subjects WHERE name = 'Ciências' LIMIT 1), 'Experimentos e descobertas científicas', 180);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_subjects_updated_at
  BEFORE UPDATE ON public.subjects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ebooks_updated_at
  BEFORE UPDATE ON public.ebooks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();