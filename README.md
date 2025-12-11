# Prépa Vélo & Natation - PWA

Application Progressive Web App pour suivre le programme d'entraînement "Prépa Vélo & Natation".

## 🚀 Installation

1. Clone le repo
2. Installe les dépendances :
```bash
npm install
```

3. Configure Supabase :
   - Copie `.env.example` en `.env`
   - Remplis tes credentials Supabase dans `.env`

## 📊 Configuration Supabase

### 1. Crée une table `workout_logs`

Exécute ce SQL dans ton projet Supabase :

```sql
CREATE TABLE workout_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour des requêtes plus rapides
CREATE INDEX idx_workout_logs_exercise ON workout_logs(exercise_name, created_at DESC);
CREATE INDEX idx_workout_logs_user ON workout_logs(user_id, created_at DESC);
```

### 2. Configure les Row Level Security (RLS) - Optionnel

Pour un MVP simple, tu peux désactiver RLS sur cette table ou créer une policy publique.

## 🏃 Lancer l'app

### Mode développement
```bash
npm run dev
```

### Build production
```bash
npm run build
npm run preview
```

## 📱 PWA - Installation sur mobile

1. Ouvre l'app dans Safari (iOS) ou Chrome (Android)
2. Clique sur "Partager" > "Ajouter à l'écran d'accueil"
3. L'app s'installera comme une vraie application native !

## 🎯 Fonctionnalités

- ✅ 3 séances complètes extraites des images fournies
- ✅ Input intelligent selon le type d'exercice (Poids/Reps/Temps)
- ✅ Affichage de la dernière performance pour chaque exercice
- ✅ Sauvegarde dans Supabase
- ✅ Dark Mode (optimisé pour la salle)
- ✅ Mobile First - Police large et lisible
- ✅ PWA - Fonctionne hors ligne

## 🏋️ Structure du programme

- **Séance 1** : Force & Structure (Lundi)
- **Séance 2** : Volume & Endurance (Mercredi)
- **Séance 3** : Cardio Hybride (Vendredi)

Chaque séance contient plusieurs supersets avec des exercices ciblés Vélo et/ou Natation.

## 🛠️ Stack technique

- **Frontend** : Vite + React + TailwindCSS
- **Backend** : Supabase
- **Routing** : React Router
- **PWA** : vite-plugin-pwa
