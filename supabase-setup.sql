-- Script SQL pour créer la table workout_logs dans Supabase
-- Exécute ce script dans l'éditeur SQL de ton projet Supabase

-- 1. Créer la table
CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_workout_logs_exercise 
ON workout_logs(exercise_name, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_workout_logs_user 
ON workout_logs(user_id, created_at DESC);

-- 3. Activer Row Level Security (RLS)
ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;

-- 4. Créer une policy publique pour le MVP (À MODIFIER PLUS TARD)
-- Pour un MVP simple, on autorise tout le monde à lire et écrire
-- ATTENTION : En production, tu dois créer des policies plus strictes avec authentification

-- Policy pour SELECT (lecture)
CREATE POLICY "Public can read workout_logs" 
ON workout_logs FOR SELECT 
USING (true);

-- Policy pour INSERT (écriture)
CREATE POLICY "Public can insert workout_logs" 
ON workout_logs FOR INSERT 
WITH CHECK (true);

-- OPTIONNEL : Si tu veux ajouter l'authentification Supabase plus tard
-- Remplace ces policies par :
-- CREATE POLICY "Users can read own workout_logs" 
-- ON workout_logs FOR SELECT 
-- USING (auth.uid()::text = user_id);
--
-- CREATE POLICY "Users can insert own workout_logs" 
-- ON workout_logs FOR INSERT 
-- WITH CHECK (auth.uid()::text = user_id);
