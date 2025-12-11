import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { workoutProgram } from '../data/workoutData'
import { supabase, CURRENT_USER_ID } from '../config/supabase'
import SupersetGroup from '../components/SupersetGroup'
import ExerciseCard from '../components/ExerciseCard'

export default function SessionPage() {
    const { sessionId } = useParams()
    const navigate = useNavigate()
    const session = workoutProgram.find(s => s.id === parseInt(sessionId))

    const [exerciseValues, setExerciseValues] = useState({})
    const [lastPerformances, setLastPerformances] = useState({})
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    useEffect(() => {
        if (session) {
            fetchLastPerformances()
        }
    }, [session])

    const fetchLastPerformances = async () => {
        try {
            // Récupère tous les IDs d'exercices de cette séance
            const exerciseIds = session.supersets.flatMap(superset =>
                superset.exercises.map(ex => ex.id)
            )

            // Récupère la dernière perf pour chaque exercice
            const performances = {}
            for (const exId of exerciseIds) {
                const { data, error } = await supabase
                    .from('workout_logs')
                    .select('*')
                    .eq('user_id', CURRENT_USER_ID)
                    .eq('exercise_name', exId)
                    .order('created_at', { ascending: false })
                    .limit(1)

                if (data && data.length > 0) {
                    performances[exId] = data[0]
                }
            }

            setLastPerformances(performances)
        } catch (error) {
            console.error('Erreur lors de la récupération des performances:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleValueChange = (exerciseId, value) => {
        setExerciseValues(prev => ({
            ...prev,
            [exerciseId]: value
        }))
    }

    const handleSaveSession = async () => {
        setSaving(true)
        setSaveSuccess(false)

        try {
            // Prépare les données à sauvegarder
            const records = Object.entries(exerciseValues)
                .filter(([_, value]) => value && value.trim() !== '')
                .map(([exerciseId, value]) => ({
                    user_id: CURRENT_USER_ID,
                    exercise_name: exerciseId,
                    value: value,
                    created_at: new Date().toISOString()
                }))

            if (records.length === 0) {
                alert('Aucune valeur à sauvegarder !')
                setSaving(false)
                return
            }

            // Sauvegarde dans Supabase
            const { error } = await supabase
                .from('workout_logs')
                .insert(records)

            if (error) throw error

            setSaveSuccess(true)
            setExerciseValues({})

            // Recharge les performances après 1 seconde
            setTimeout(() => {
                fetchLastPerformances()
                setSaveSuccess(false)
            }, 1500)

        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error)
            alert('Erreur lors de la sauvegarde. Vérifie ta configuration Supabase.')
        } finally {
            setSaving(false)
        }
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center">
                <p className="text-dark-text">Séance non trouvée</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark-bg pb-24">
            {/* Header */}
            <header className="bg-gradient-to-br from-accent-velo to-accent-natation text-white py-6 px-6 sticky top-0 z-10 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="text-white/80 hover:text-white mb-3 flex items-center gap-2 text-sm"
                    >
                        <span>←</span>
                        <span>Retour</span>
                    </button>
                    <h1 className="text-2xl font-bold mb-1">
                        {session.name}
                    </h1>
                    <p className="text-white/80 text-sm">
                        {session.objective}
                    </p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="text-center text-dark-muted py-12">
                        <p>Chargement des performances...</p>
                    </div>
                ) : (
                    <>
                        {session.supersets.map(superset => (
                            <SupersetGroup key={superset.id} superset={superset}>
                                {superset.exercises.map(exercise => (
                                    <ExerciseCard
                                        key={exercise.id}
                                        exercise={exercise}
                                        lastPerf={lastPerformances[exercise.id]}
                                        onValueChange={handleValueChange}
                                    />
                                ))}
                            </SupersetGroup>
                        ))}
                    </>
                )}
            </main>

            {/* Save Button - Fixed at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border p-4 shadow-2xl">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={handleSaveSession}
                        disabled={saving || Object.keys(exerciseValues).length === 0}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${saving || Object.keys(exerciseValues).length === 0
                                ? 'bg-dark-border text-dark-muted cursor-not-allowed'
                                : saveSuccess
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gradient-to-r from-accent-velo to-accent-natation text-white hover:shadow-lg'
                            }`}
                    >
                        {saving ? 'Sauvegarde en cours...' : saveSuccess ? '✓ Séance sauvegardée !' : 'Sauvegarder la séance'}
                    </button>
                </div>
            </div>
        </div>
    )
}
