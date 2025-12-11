import { useState } from 'react'

export default function ExerciseBentoCard({ exercise, lastPerf, onValueChange }) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
        onValueChange(exercise.id, e.target.value)
    }

    // Déterminer le style selon l'activité
    let accentColor = 'text-gray-400';
    let bgColor = 'bg-white';
    let typeIcon = '⚡';

    if (exercise.activity.toLowerCase().includes('vélo')) {
        accentColor = 'text-accent-primary'; // Beige
        typeIcon = '🚴';
    } else if (exercise.activity.toLowerCase().includes('natation')) {
        accentColor = 'text-accent-secondary'; // Bleu Gris
        typeIcon = '🏊';
    }

    const getInputPlaceholder = () => {
        switch (exercise.inputType) {
            case 'weight': return '0';
            case 'reps': return '0';
            case 'time': return '00:00';
            default: return '';
        }
    }

    const getInputUnit = () => {
        switch (exercise.inputType) {
            case 'weight': return 'kg';
            case 'reps': return 'reps';
            case 'time': return exercise.unit === 'min:sec' ? 'min' : 'sec';
            default: return '';
        }
    }

    return (
        <div className="relative group overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">

            {/* Header Card */}
            <div className="p-5 pb-0 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-2xl p-2 rounded-xl bg-gray-50 bg-opacity-50 ${accentColor}`}>
                        {typeIcon}
                    </span>
                    <div className="text-right">
                        <span className="inline-block bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                            {exercise.target}
                        </span>
                    </div>
                </div>

                <h3 className="font-bold text-lg text-text-main leading-tight mb-1">
                    {exercise.name}
                </h3>
                <p className="text-xs text-text-muted line-clamp-2 min-h-[2.5em]">
                    {exercise.muscles}
                </p>
            </div>

            {/* Input Zone - Bento Style Bottom */}
            <div className="mt-4 p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">

                {/* Last Perf Mini Widget */}
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Dernier</span>
                    <span className="text-sm font-bold text-gray-600">
                        {lastPerf ? `${lastPerf.value} ${exercise.unit}` : '-'}
                    </span>
                </div>

                {/* Big Input Field */}
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 focus-within:border-accent-primary focus-within:ring-1 focus-within:ring-accent-primary transition-all shadow-sm w-32">
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder={getInputPlaceholder()}
                        className="w-full bg-transparent text-right font-bold text-text-main focus:outline-none text-lg"
                    />
                    <span className="text-xs text-gray-400 font-medium">
                        {getInputUnit()}
                    </span>
                </div>

            </div>

            {/* Background Decor to make it interactive */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-${exercise.activity.includes('Vélo') ? 'orange' : 'blue'}-50 rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
        </div>
    )
}
