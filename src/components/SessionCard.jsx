import { Link } from 'react-router-dom'

export default function SessionCard({ session }) {
    const getSessionIcon = (id) => {
        switch (id) {
            case 1: return '💪'
            case 2: return '🔥'
            case 3: return '⚡'
            default: return '🏋️'
        }
    }

    return (
        <Link to={`/session/${session.id}`}>
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6 hover:border-accent-velo transition-all duration-300 cursor-pointer group">
                <div className="flex items-start gap-4">
                    <div className="text-5xl">{getSessionIcon(session.id)}</div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-dark-text mb-2 group-hover:text-accent-velo transition-colors">
                            {session.name}
                        </h3>
                        <p className="text-sm text-dark-muted mb-3">
                            📅 {session.day}
                        </p>
                        <p className="text-sm text-dark-text/80 italic">
                            {session.objective}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-accent-velo font-medium">
                            <span>Voir la séance</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
