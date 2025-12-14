import { useState, useEffect } from 'react'
import { workoutProgram } from '../data/workoutData'
import { supabase, CURRENT_USER_ID } from '../config/supabase'
import ExerciseBentoCard from '../components/ExerciseBentoCard'
import MuscleChart from '../components/MuscleChart'
import IntensityChart from '../components/IntensityChart'

export default function DashboardHome() {
    const [activeTab, setActiveTab] = useState(1);
    const [activeFilter, setActiveFilter] = useState('all'); // all, velo, natation
    const [sessionData, setSessionData] = useState(workoutProgram[0]);

    // State pour Supabase
    const [exerciseValues, setExerciseValues] = useState({})
    const [lastPerformances, setLastPerformances] = useState({})
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)

    useEffect(() => {
        // Mettre à jour les données quand l'onglet change
        const newSession = workoutProgram.find(s => s.id === activeTab)
        setSessionData(newSession)

        // Charger les perfs pour cette séance
        if (newSession) fetchLastPerformances(newSession)
    }, [activeTab])

    const fetchLastPerformances = async (session) => {
        setLoading(true)
        try {
            const exerciseIds = session.supersets.flatMap(superset =>
                superset.exercises.map(ex => ex.id)
            )

            const performances = {}
            for (const exId of exerciseIds) {
                const { data } = await supabase
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
            console.error('Erreur chargement perfs:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleValueChange = (exerciseId, value) => {
        setExerciseValues(prev => ({ ...prev, [exerciseId]: value }))
    }

    const handleSaveSession = async () => {
        setSaving(true)
        setSaveSuccess(false)
        try {
            const records = Object.entries(exerciseValues)
                .filter(([_, value]) => value && value.trim() !== '')
                .map(([exerciseId, value]) => ({
                    user_id: CURRENT_USER_ID,
                    exercise_name: exerciseId,
                    value: value,
                    created_at: new Date().toISOString()
                }))

            if (records.length === 0) return setSaving(false)

            const { error } = await supabase.from('workout_logs').insert(records)
            if (error) throw error

            setSaveSuccess(true)
            setExerciseValues({})
            setTimeout(() => {
                fetchLastPerformances(sessionData)
                setSaveSuccess(false)
            }, 1500)
        } catch (error) {
            console.error('Save error:', error)
            alert('Erreur sauvegarde')
        } finally {
            setSaving(false)
        }
    }

    // Helpers pour les données graphiques 
    const getChartData = (sessionId) => {
        if (sessionId === 1) return [40, 30, 20, 10]; // S1: Force jambes/dos
        if (sessionId === 2) return [45, 25, 10, 20]; // S2: Volume cuisses
        if (sessionId === 3) return [30, 20, 20, 30]; // S3: Cardio global
        return [25, 25, 25, 25];
    }

    const getIntensityData = (sessionId) => {
        // Simulation courbe intensité
        if (sessionId === 1) return [40, 60, 85, 50, 85, 50, 85, 50, 85, 40, 80, 50];
        if (sessionId === 2) return [30, 50, 75, 50, 75, 50, 75, 50, 75, 40, 70, 50];
        if (sessionId === 3) return [40, 70, 90, 85, 95, 80, 95, 85, 90, 85, 95, 80]; // Plus intense
        return [];
    }

    return (
        <div className="min-h-screen flex flex-col bg-bg-main text-text-main pb-32">

            {/* iOS-Style Sticky Header with Blur */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all border-b border-gray-100">
                <div className="px-4 py-3">
                    {/* Title */}
                    <div className="mb-3">
                        <h1 className="text-xl font-bold tracking-tight">
                            Prépa Physique <span className="text-accent-primary">Vélo & Natation</span>
                        </h1>
                    </div>

                    {/* iOS Segmented Control - S1/S2/S3 */}
                    <div className="bg-gray-100 p-1 rounded-full flex">
                        {[1, 2, 3].map(id => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === id
                                        ? 'bg-white text-text-main shadow-sm'
                                        : 'text-text-muted'
                                    }`}
                            >
                                S{id}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Single Column Mobile Layout */}
            <main className="flex-grow px-4 py-4 space-y-4">

                {/* Session Header Card */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                    <div className="flex flex-col gap-3 mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{sessionData?.name}</h2>
                            <p className="text-accent-primary font-medium">{sessionData?.objective}</p>
                        </div>

                        {/* Filter Segmented Control */}
                        <div className="flex bg-gray-100 p-1 rounded-xl self-start">
                            {['all', 'velo', 'natation'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${activeFilter === filter
                                            ? 'bg-white text-black shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {filter === 'all' ? 'Tout' : filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Warmup Mini Card */}
                    <div className="bg-orange-50 rounded-xl p-3 flex items-center gap-3 border border-orange-100">
                        <span className="text-2xl">🔥</span>
                        <div className="text-xs text-orange-800">
                            <span className="font-bold uppercase">Échauffement :</span> Rameur souple + Rotations articulaires + Squats pdc.
                        </div>
                    </div>
                </div>

                {/* Charts Section - Vertical Stack */}
                <div className="space-y-4">
                    {/* Intensity Chart */}
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Profil d'Intensité</h3>
                        <div className="h-40">
                            <IntensityChart
                                data={getIntensityData(activeTab)}
                                isHighIntensity={activeTab === 3}
                            />
                        </div>
                    </div>

                    {/* Muscle Chart */}
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Focus Musculaire</h3>
                        <div className="h-48">
                            <MuscleChart data={getChartData(activeTab)} />
                        </div>
                    </div>
                </div>

                {/* Exercise Cards - Bento Grid */}
                <div className="space-y-6">
                    {sessionData?.supersets.map((superset, index) => (
                        <div key={superset.id}>
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-text-main rounded-full"></span>
                                    {superset.name}
                                </h3>
                            </div>

                            {/* 2-Column Grid for Mobile */}
                            <div className="grid grid-cols-2 gap-3">
                                {superset.exercises
                                    .filter(ex => {
                                        if (activeFilter === 'all') return true;
                                        if (activeFilter === 'velo') return ex.activity.toLowerCase().includes('vélo') || ex.activity.toLowerCase().includes('deux');
                                        if (activeFilter === 'natation') return ex.activity.toLowerCase().includes('natation') || ex.activity.toLowerCase().includes('deux');
                                        return true;
                                    })
                                    .map(exo => (
                                        <div key={exo.id} className="h-full">
                                            <ExerciseBentoCard
                                                exercise={exo}
                                                lastPerf={lastPerformances[exo.id]}
                                                onValueChange={handleValueChange}
                                            />
                                        </div>
                                    ))}
                            </div>

                            {/* Rest Separator */}
                            {index < sessionData.supersets.length - 1 && (
                                <div className="flex items-center justify-center my-5 opacity-50">
                                    <div className="h-px w-full bg-gray-300"></div>
                                    <span className="px-4 text-xs font-medium text-gray-500 whitespace-nowrap">Repos 90s</span>
                                    <div className="h-px w-full bg-gray-300"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </main>

            {/* Fixed Bottom Save Button with Safe Area */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe">
                <div className="px-4 py-3">
                    <button
                        onClick={handleSaveSession}
                        disabled={saving}
                        className={`w-full py-4 rounded-3xl font-bold text-white shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 min-h-[44px] ${saveSuccess
                                ? 'bg-green-500'
                                : 'bg-text-main hover:bg-black'
                            }`}
                    >
                        {saving ? (
                            'Enregistrement...'
                        ) : saveSuccess ? (
                            <>
                                <span>✓</span> Séance Sauvegardée !
                            </>
                        ) : (
                            <>
                                <span>💾</span> Enregistrer la séance
                            </>
                        )}
                    </button>
                </div>
            </div>

        </div>
    )
}
