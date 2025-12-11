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
        <div className="min-h-screen flex flex-col bg-bg-main text-text-main pb-24">

            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                            Prépa Physique <span className="text-accent-primary">Vélo & Natation</span>
                        </h1>
                        <p className="text-sm text-text-muted hidden md:block">3 Séances/Semaine • Full Body • 55 Minutes</p>
                    </div>
                    {/* Tabs Navigation (Moved to Header for better Space Usage) */}
                    <div className="flex space-x-1">
                        {[1, 2, 3].map(id => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`py-2 px-3 md:px-4 rounded-lg text-sm font-bold transition-all ${activeTab === id
                                        ? 'bg-text-main text-white shadow-md'
                                        : 'bg-transparent text-text-muted hover:bg-gray-100'
                                    }`}
                            >
                                S{id}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COL: Content */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Session Header / Context */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{sessionData?.name}</h2>
                                <p className="text-accent-primary font-medium">{sessionData?.objective}</p>
                            </div>
                            {/* Filters */}
                            <div className="flex bg-gray-100 p-1 rounded-xl self-start md:self-center">
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
                            <div className="text-xs md:text-sm text-orange-800">
                                <span className="font-bold uppercase">Échauffement :</span> Rameur souple + Rotations articulaires + Squats pdc.
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Content - Bento Grid */}
                    <div className="space-y-8">
                        {sessionData?.supersets.map((superset, index) => (
                            <div key={superset.id}>
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                                        <span className="w-2 h-8 bg-text-main rounded-full"></span>
                                        {superset.name}
                                    </h3>
                                </div>

                                {/* Grid Layout for BENTO Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <div className="flex items-center justify-center my-6 opacity-50">
                                        <div className="h-px w-full bg-gray-300"></div>
                                        <span className="px-4 text-xs font-medium text-gray-500 whitespace-nowrap">Repos 90s</span>
                                        <div className="h-px w-full bg-gray-300"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT COL: Analytics */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Charts Container - Desktop Sticky */}
                    <div className="sticky top-24 space-y-6">

                        {/* Intensity Chart */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Profil d'Intensité</h3>
                            <div className="h-40">
                                <IntensityChart
                                    data={getIntensityData(activeTab)}
                                    isHighIntensity={activeTab === 3}
                                />
                            </div>
                        </div>

                        {/* Muscle Chart */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Focus Musculaire</h3>
                            <div className="h-48">
                                <MuscleChart data={getChartData(activeTab)} />
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSaveSession}
                            disabled={saving}
                            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transform transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 ${saveSuccess
                                    ? 'bg-green-500'
                                    : 'bg-text-main hover:bg-black'
                                }`}
                        >
                            {saving ? 'Enregistrement...' : saveSuccess ? '✓ Séance Sauvegardée !' : (
                                <>
                                    <span>💾</span> Enregistrer la séance
                                </>
                            )}
                        </button>

                    </div>

                </div>

            </main>

            {/* Mobile Save Floating Button */}
            <div className="lg:hidden fixed bottom-6 left-6 right-6 z-40">
                <button
                    onClick={handleSaveSession}
                    disabled={saving}
                    className={`w-full py-4 rounded-2xl font-bold text-white shadow-2xl backdrop-blur-sm flex items-center justify-center gap-2 ${saveSuccess ? 'bg-green-500' : 'bg-gray-900/90'
                        }`}
                >
                    {saving ? '...' : saveSuccess ? '✓' : '💾 Sauvegarder'}
                </button>
            </div>

        </div>
    )
}
