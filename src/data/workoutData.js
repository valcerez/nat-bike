// Structure complète du programme d'entraînement
export const workoutProgram = [
    {
        id: 1,
        name: "SÉANCE 1 : Force & Structure",
        day: "Lundi",
        objective: "Force max sur les jambes et le dos.",
        supersets: [
            {
                id: 1,
                name: "SUPERSET 1",
                exercises: [
                    {
                        id: "s1-ex1",
                        name: "Squat (ou Goblet Squat lourd)",
                        target: "10 reps",
                        activity: "Vélo",
                        muscles: "Quadriceps, Grands Fessiers, Adducteurs, Lombaires",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s1-ex2",
                        name: "Tractions",
                        target: "max de reps",
                        activity: "Natation",
                        muscles: "Grand Dorsal, Biceps, Trapèzes inférieurs",
                        inputType: "reps",
                        unit: "reps"
                    }
                ]
            },
            {
                id: 2,
                name: "SUPERSET 2",
                exercises: [
                    {
                        id: "s1-ex3",
                        name: "Fentes Arrières (ou Bulgare si banc dispo)",
                        target: "10 reps/jambe",
                        activity: "Vélo",
                        muscles: "Quadriceps, Grands Fessiers",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s1-ex4",
                        name: "Développé Militaire Debout (Haltères)",
                        target: "10 reps",
                        activity: "Natation",
                        muscles: "Deltoïdes (faisceau antérieur et moyen), Triceps, Gainage (debout)",
                        inputType: "weight",
                        unit: "kg"
                    }
                ]
            },
            {
                id: 3,
                name: "SUPERSET 3",
                exercises: [
                    {
                        id: "s1-ex5",
                        name: "Machine à ischio",
                        target: "12 reps",
                        activity: "Vélo",
                        muscles: "Ischios-jambiers (isolation)",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s1-ex6",
                        name: "Pompes",
                        target: "Max reps",
                        activity: "Natation",
                        muscles: "Pectoraux, Triceps, Deltoïdes antérieurs, Dentelé antérieur",
                        inputType: "reps",
                        unit: "reps"
                    }
                ]
            },
            {
                id: 4,
                name: "SUPERSET 4 (Finisher Gainage - Tapis)",
                exercises: [
                    {
                        id: "s1-ex7",
                        name: "Planche Commando (Passage coudes à mains)",
                        target: "45 sec",
                        activity: "Natation",
                        muscles: "Grand droit (abdos), Transverse, Épaules",
                        inputType: "time",
                        unit: "sec"
                    },
                    {
                        id: "s1-ex8",
                        name: "Superman (Extension lombaires)",
                        target: "45 sec",
                        activity: "Les deux",
                        muscles: "Érecteurs du rachis, Lombaires, Fessiers",
                        inputType: "time",
                        unit: "sec"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "SÉANCE 2 : Volume & Endurance",
        day: "Mercredi",
        objective: "Résistance musculaire et amplitude.",
        supersets: [
            {
                id: 1,
                name: "SUPERSET 1 (Les cuisses - Presse ou Machine)",
                exercises: [
                    {
                        id: "s2-ex1",
                        name: "Presse à cuisses",
                        target: "12 reps",
                        activity: "Vélo",
                        muscles: "Quadriceps (Vaste interne/externe)",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s2-ex2",
                        name: "Machine à mollets",
                        target: "12 reps",
                        activity: "Vélo",
                        muscles: "Triceps sural (Gastrocnémiens et Soléaire)",
                        inputType: "weight",
                        unit: "kg"
                    }
                ]
            },
            {
                id: 2,
                name: "SUPERSET 2",
                exercises: [
                    {
                        id: "s2-ex3",
                        name: "Pull-Over (haltère)",
                        target: "12 reps",
                        activity: "Natation",
                        muscles: "Grand Dorsal (étirement), Pectoraux, Longue portion du Triceps, Dentelés",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s2-ex4",
                        name: "Développé couché haltère",
                        target: "12 reps",
                        activity: "Natation",
                        muscles: "Pectoraux (Moyens), Triceps, Deltoïdes antérieurs",
                        inputType: "weight",
                        unit: "kg"
                    }
                ]
            },
            {
                id: 3,
                name: "SUPERSET 3",
                exercises: [
                    {
                        id: "s2-ex5",
                        name: "Extensions Triceps avec Haltère",
                        target: "10 reps",
                        activity: "Natation",
                        muscles: "Triceps Brachial (isolation)",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s2-ex6",
                        name: "Développé couché incliné avec haltère",
                        target: "10 reps",
                        activity: "Natation",
                        muscles: "Pectoraux (Faisceau claviculaire/Haut), Deltoïdes antérieurs",
                        inputType: "weight",
                        unit: "kg"
                    }
                ]
            },
            {
                id: 4,
                name: "SUPERSET 4",
                exercises: [
                    {
                        id: "s2-ex7",
                        name: "Gainage côté",
                        target: "45 sec / côté",
                        activity: "Natation",
                        muscles: "Obliques (internes et externes), Carré des lombes",
                        inputType: "time",
                        unit: "sec"
                    },
                    {
                        id: "s2-ex8",
                        name: "Chaise",
                        target: "1 min",
                        activity: "Vélo",
                        muscles: "Quadriceps",
                        inputType: "time",
                        unit: "sec"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "SÉANCE 3 : Cardio Hybride",
        day: "Vendredi",
        objective: "Garder l'intensité haute (cœur) et résistance lactique.",
        supersets: [
            {
                id: 1,
                name: "SUPERSET 1",
                exercises: [
                    {
                        id: "s3-ex1",
                        name: "Kettlebell Swing (ou Haltère Swing)",
                        target: "20 reps",
                        activity: "Vélo",
                        muscles: "Chaîne postérieure complète (Ischios, Fessiers, Lombaires)",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s3-ex2",
                        name: "Face Pulls (Poulie ou élastique)",
                        target: "12 reps",
                        activity: "Natation",
                        muscles: "Deltoïde postérieur, Coiffe des rotateurs (Infra-épineux), Trapèzes",
                        inputType: "weight",
                        unit: "kg"
                    }
                ]
            },
            {
                id: 2,
                name: "SUPERSET 2",
                exercises: [
                    {
                        id: "s3-ex3",
                        name: "Rameur",
                        target: "500M à fond",
                        activity: "Les deux",
                        muscles: "Cardio global + Dos + Jambes",
                        inputType: "time",
                        unit: "min:sec"
                    },
                    {
                        id: "s3-ex4",
                        name: "Squat poids du corps",
                        target: "20 reps",
                        activity: "Vélo",
                        muscles: "Quadriceps, Gainage thoracique",
                        inputType: "reps",
                        unit: "reps"
                    }
                ]
            },
            {
                id: 3,
                name: "SUPERSET 3",
                exercises: [
                    {
                        id: "s3-ex5",
                        name: "Chaise",
                        target: "1min 30 sec",
                        activity: "Vélo",
                        muscles: "Quadriceps (isométrie)",
                        inputType: "time",
                        unit: "sec"
                    },
                    {
                        id: "s3-ex6",
                        name: "Gainage Latéral",
                        target: "45 sec / côté",
                        activity: "Natation",
                        muscles: "Obliques, Carré des lombes",
                        inputType: "time",
                        unit: "sec"
                    }
                ]
            },
            {
                id: 4,
                name: "SUPERSET 4",
                exercises: [
                    {
                        id: "s3-ex7",
                        name: "Biceps Curl avec appui du torse sur banc incliné",
                        target: "12 reps",
                        activity: "Natation (début du catch) et Vélo (tirage guidon en danseuse/sprint)",
                        muscles: "Biceps brachial (chef long étiré)",
                        inputType: "weight",
                        unit: "kg"
                    },
                    {
                        id: "s3-ex8",
                        name: "Mountain Climbers",
                        target: "1 min",
                        activity: "Les deux",
                        muscles: "Cardio, Abdominaux, Psoas-iliaque",
                        inputType: "time",
                        unit: "sec"
                    }
                ]
            }
        ]
    }
]

// Helper pour obtenir la couleur selon l'activité
export const getActivityColor = (activity) => {
    if (activity.toLowerCase().includes('vélo') && activity.toLowerCase().includes('natation')) {
        return 'accent-both'
    }
    if (activity.toLowerCase().includes('vélo')) {
        return 'accent-velo'
    }
    if (activity.toLowerCase().includes('natation')) {
        return 'accent-natation'
    }
    return 'accent-both'
}
