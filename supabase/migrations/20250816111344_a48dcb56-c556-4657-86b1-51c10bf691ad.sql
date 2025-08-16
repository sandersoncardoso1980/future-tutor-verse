-- Drop existing trigger if it exists to avoid conflicts
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;

-- Create the trigger again
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create security definer function to get user role to avoid RLS recursion
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