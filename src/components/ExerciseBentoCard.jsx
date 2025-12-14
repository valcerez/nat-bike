import { useState } from 'react'

export default function ExerciseBentoCard({ exercise, lastPerf, onValueChange }) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
        onValueChange(exercise.id, e.target.value)
    }

    // Déterminer le style selon l'activité (iOS Health style)
    const getActivityStyle = () => {
        const act = exercise.activity.toLowerCase()
        if (act.includes('deux')) {
            return {
                color: 'text-purple-500',
                icon: '🔥',
                bgIcon: 'bg-purple-50'
            }
        }
        if (act.includes('vélo')) {
            return {
                color: 'text-orange-500',
                icon: '🚴',
                bgIcon: 'bg-orange-50'
            }
        }
        if (act.includes('natation')) {
            return {
                color: 'text-blue-500',
                icon: '🏊',
                bgIcon: 'bg-blue-50'
            }
        }
        return {
            color: 'text-gray-500',
            icon: '⚡',
            bgIcon: 'bg-gray-50'
        }
    }

    const style = getActivityStyle()

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100/50">

            {/* Layout horizontal iOS-style */}
            <div className="p-4">

                {/* Header avec icône et titre */}
                <div className="flex items-center gap-3 mb-3">
                    <div className={`${style.bgIcon} w-10 h-10 rounded-xl flex items-center justify-center text-xl`}>
                        {style.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className={`${style.color} font-semibold text-sm leading-tight truncate`}>
                            {exercise.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">
                            {exercise.target}
                        </p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Grande valeur numérique iOS-style */}
                <div className="flex items-end justify-between gap-4">
                    {/* Input zone */}
                    <div className="flex-1">
                        <div className="flex items-baseline gap-1">
                            <input
                                type="text"
                                value={value}
                                onChange={handleChange}
                                placeholder={lastPerf?.value || "—"}
                                className="text-3xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 w-24 p-0"
                            />
                            <span className="text-sm font-medium text-gray-400">
                                {exercise.unit}
                            </span>
                        </div>
                        {lastPerf && (
                            <p className="text-xs text-gray-400 mt-1">
                                Dernier: {lastPerf.value} {exercise.unit}
                            </p>
                        )}
                    </div>

                    {/* Mini graphique de progression (placeholder visuel) */}
                    <div className="flex items-end gap-0.5 h-12">
                        {[30, 50, 40, 60, 45, 70, 55].map((height, i) => (
                            <div
                                key={i}
                                className={`w-1.5 rounded-sm transition-all ${i === 6 ? style.color.replace('text-', 'bg-') : 'bg-gray-200'
                                    }`}
                                style={{ height: `${height}%` }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
