import SessionCard from '../components/SessionCard'
import { workoutProgram } from '../data/workoutData'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-dark-bg">
            {/* Header */}
            <header className="bg-gradient-to-br from-accent-velo to-accent-natation text-white py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">
                        Programme Prépa Vélo & Natation
                    </h1>
                    <p className="text-white/80 text-sm">
                        Sélectionne ta séance pour commencer 💪
                    </p>
                </div>
            </header>

            {/* Sessions List */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="space-y-4">
                    {workoutProgram.map(session => (
                        <SessionCard key={session.id} session={session} />
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-dark-muted text-sm">
                <p>Prépa Vélo & Natation - {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}
