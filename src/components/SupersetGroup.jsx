export default function SupersetGroup({ superset, children }) {
    return (
        <div className="mb-8">
            <div className="bg-gradient-to-r from-accent-velo/20 to-accent-natation/20 border-l-4 border-accent-velo rounded-lg p-4 mb-4">
                <h3 className="text-lg font-bold text-dark-text uppercase tracking-wide">
                    {superset.name}
                </h3>
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    )
}
