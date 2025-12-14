import { useState } from 'react'

export default function ExerciseBentoCard({ exercise, lastPerf, onValueChange }) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
        onValueChange(exercise.id, e.target.value)
    }

    // Déterminer le style selon l'activité
    const getActivityStyle = () => {
        const act = exercise.activity.toLowerCase()
        if (act.includes('deux')) {
            return {
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-700',
                badge: 'bg-purple-100 text-purple-700',
                icon: '🚴🏊'
            }
        }
        if (act.includes('vélo')) {
            return {
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                text: 'text-orange-700',
                badge: 'bg-orange-100 text-orange-700',
                icon: '🚴'
            }
        }
        if (act.includes('natation')) {
            return {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-700',
                badge: 'bg-blue-100 text-blue-700',
                icon: '🏊'
            }
        }
        return {
            bg: 'bg-gray-50',
            border: 'border-gray-200',
            text: 'text-gray-700',
            badge: 'bg-gray-100 text-gray-700',
            icon: '⚡'
        }
    }

    const style = getActivityStyle()

    const getActivityLabel = () => {
        const act = exercise.activity.toLowerCase()
        if (act.includes('deux')) return 'Vélo & Natation'
        if (act.includes('vélo')) return 'Vélo'
        if (act.includes('natation')) return 'Natation'
        return exercise.activity
    }

    return (
        <div className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">

            {/* Header avec activité */}
            <div className={`${style.bg} ${style.border} border-b-2 px-4 py-3`}>
                <div className="flex items-center justify-between gap-2">
                    <span className="text-2xl">{style.icon}</span>
                    <span className={`${style.badge} text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}>
                        {getActivityLabel()}
                    </span>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="p-4 flex-grow flex flex-col justify-between">

                {/* Nom de l'exercice */}
                <div className="mb-3">
                    <h3 className="font-bold text-base text-gray-900 leading-tight line-clamp-2 mb-1">
                        {exercise.name}
                    </h3>

                    {/* Nombre de reps/target */}
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Objectif:</span>
                        <span className={`${style.text} text-sm font-bold`}>
                            {exercise.target}
                        </span>
                    </div>
                </div>

                {/* Encadré de saisie */}
                <div className="space-y-2">
                    {/* Dernière performance */}
                    {lastPerf && (
                        <div className="bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">
                                    Dernière perf
                                </span>
                                <span className="text-sm font-bold text-gray-700">
                                    {lastPerf.value} {exercise.unit}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Input encadré */}
                    <div className={`${style.bg} ${style.border} border-2 rounded-xl p-3`}>
                        <label className="text-[10px] text-gray-600 uppercase font-semibold tracking-wide block mb-2">
                            Votre performance
                        </label>
                        <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg border-2 border-gray-200 focus-within:border-gray-900 focus-within:shadow-sm transition-all">
                            <input
                                type="text"
                                value={value}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full bg-transparent text-right font-bold text-gray-900 focus:outline-none text-lg"
                            />
                            <span className="text-xs text-gray-500 font-semibold min-w-[40px]">
                                {exercise.unit}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
