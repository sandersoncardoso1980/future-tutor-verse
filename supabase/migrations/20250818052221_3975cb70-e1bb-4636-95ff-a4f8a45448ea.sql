-- Create user role enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('student', 'admin', 'teacher');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'student';

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role::text FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update RLS policies to use the security definer function
DROP POLICY IF EXISTS "Only admins can manage subjects" ON public.subjects;
CREATE POLICY "Only admins can manage subjects" ON public.subjects
  FOR ALL USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Only admins can manage exercises" ON public.exercises;
CREATE POLICY "Only admins can manage exercises" ON public.exercises
  FOR ALL USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Admins can view all attempts" ON public.user_exercise_attempts;
CREATE POLICY "Admins can view all attempts" ON public.user_exercise_attempts
  FOR SELECT USING (public.get_current_user_role() = 'admin');

DROP POLICY IF EXISTS "Only admins can manage ebooks" ON public.ebooks;
CREATE POLICY "Only admins can manage ebooks" ON public.ebooks
  FOR ALL USING (public.get_current_user_role() = 'admin');