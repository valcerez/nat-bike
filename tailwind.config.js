/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Nouvelle palette "Warm Neutrals & Earthy Tones"
                bg: {
                    main: '#F5F5F0',    // Isabelline - Blanc cassé chaud
                    card: '#FFFFFF',    // Blanc pur pour les cartes
                    panel: '#FAFAFA',   // Très léger gris pour sous-blocs
                },
                text: {
                    main: '#2D2D2A',    // Gris anthracite
                    muted: '#8D8D8D',   // Gris moyen
                },
                accent: {
                    primary: '#D4A373',  // Beige/Sable (Focus Vélo/Actif)
                    secondary: '#607D8B', // Bleu Gris (Focus Natation)
                    success: '#4CAF50',
                },
                // Mappings spécifiques pour l'activité (pour garder la logique code mais avec nouvelles couleurs)
                velo: '#D4A373',
                natation: '#607D8B',
                both: '#90A4AE', // Bleu gris clair pour mix
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            borderRadius: {
                'xl': '0.75rem',
                '3xl': '1.5rem', // iOS-style rounded corners for Bento UI
            },
            spacing: {
                'safe': 'env(safe-area-inset-bottom)', // iOS safe area for Home Indicator
                'safe-top': 'env(safe-area-inset-top)', // iOS safe area for notch
                'safe-bottom': 'env(safe-area-inset-bottom)', // iOS safe area for home indicator
            },
            backgroundColor: {
                'accent-velo': '#D4A373', // Shortcut pour bg-accent-velo
                'accent-natation': '#607D8B', // Shortcut pour bg-accent-natation
            }
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.pb-safe': {
                    paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                },
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            })
        }
    ],
}
