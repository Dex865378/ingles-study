const gameData = {
    // Game 1: Sentence Builder
    sentences: [
        // Present Simple
        {
            id: 1,
            category: "Present Simple",
            words: [
                { text: "I", trans: "Yo (Pronombre)" },
                { text: "wash", trans: "lavo (Verbo)" },
                { text: "my", trans: "mi (Posesivo)" },
                { text: "hands", trans: "manos (Objeto)" },
                { text: "myself", trans: "yo mismo (Reflexivo)" }
            ],
            correctOrder: ["I", "wash", "my", "hands", "myself"],
            translation: "Yo lavo mis manos yo mismo."
        },
        {
            id: 2,
            category: "Present Simple",
            words: [
                { text: "She", trans: "Ella" },
                { text: "loves", trans: "ama" },
                { text: "her", trans: "su (de ella)" },
                { text: "cat", trans: "gato" }
            ],
            correctOrder: ["She", "loves", "her", "cat"],
            translation: "Ella ama a su gato."
        },
        {
            id: 3,
            category: "Present Simple",
            words: [
                { text: "They", trans: "Ellos" },
                { text: "do", trans: "hacen" },
                { text: "it", trans: "eso" },
                { text: "themselves", trans: "ellos mismos (Reflexivo)" }
            ],
            correctOrder: ["They", "do", "it", "themselves"],
            translation: "Ellos lo hacen ellos mismos."
        },
        // Past Simple
        {
            id: 4,
            category: "Past Simple",
            words: [
                { text: "He", trans: "Él" },
                { text: "hurt", trans: "lastimó" },
                { text: "himself", trans: "se (a sí mismo)" },
                { text: "yesterday", trans: "ayer" }
            ],
            correctOrder: ["He", "hurt", "himself", "yesterday"],
            translation: "Él se lastimó ayer."
        },
        {
            id: 5,
            category: "Past Simple",
            words: [
                { text: "We", trans: "Nosotros" },
                { text: "cleaned", trans: "limpiamos" },
                { text: "our", trans: "nuestra" },
                { text: "house", trans: "casa" }
            ],
            correctOrder: ["We", "cleaned", "our", "house"],
            translation: "Nosotros limpiamos nuestra casa."
        },
        // Future Simple
        {
            id: 6,
            category: "Future Simple",
            words: [
                { text: "You", trans: "Tú" },
                { text: "will", trans: "auxiliar futuro" },
                { text: "see", trans: "verás" },
                { text: "it", trans: "eso" },
                { text: "yourself", trans: "tú mismo" }
            ],
            correctOrder: ["You", "will", "see", "it", "yourself"],
            translation: "Tú lo verás tú mismo."
        },
        {
            id: 7,
            category: "Future Simple",
            words: [
                { text: "I", trans: "Yo" },
                { text: "will", trans: "auxiliar futuro" },
                { text: "call", trans: "llamaré" },
                { text: "you", trans: "te (a ti)" },
                { text: "tomorrow", trans: "mañana" }
            ],
            correctOrder: ["I", "will", "call", "you", "tomorrow"],
            translation: "Te llamaré mañana."
        }
    ],

    // Game 2: Vocabulary Translator
    vocabulary: [
        // Personal Pronouns
        { eng: "I", esp: ["yo"], hint: "Pronombre Personal (1ra persona)" },
        { eng: "You", esp: ["tu", "tú", "usted"], hint: "Pronombre Personal (2da persona)" },
        { eng: "He", esp: ["el", "él"], hint: "Pronombre Personal (Hombre)" },
        { eng: "She", esp: ["ella"], hint: "Pronombre Personal (Mujer)" },
        { eng: "We", esp: ["nosotros", "nosotras"], hint: "Pronombre Personal (Grupo)" },
        { eng: "They", esp: ["ellos", "ellas"], hint: "Pronombre Personal (Plural)" },

        // Verbs
        { eng: "Eat", esp: ["comer"], hint: "Verbo (Alimentarse)" },
        { eng: "Play", esp: ["jugar", "tocar"], hint: "Verbo (Divertirse o instrumento)" },
        { eng: "Run", esp: ["correr"], hint: "Verbo (Moverse rápido)" },
        { eng: "Sleep", esp: ["dormir"], hint: "Verbo (Descansar)" },
        { eng: "Study", esp: ["estudiar"], hint: "Verbo (Aprender)" },

        // Possessives
        { eng: "My", esp: ["mi", "mis"], hint: "Adjetivo Posesivo (Mío)" },
        { eng: "Your", esp: ["tu", "tus", "su"], hint: "Adjetivo Posesivo (Tuyo)" },
        { eng: "His", esp: ["su", "sus"], hint: "Adjetivo Posesivo (De él)" },
        { eng: "Her", esp: ["su", "sus"], hint: "Adjetivo Posesivo (De ella)" },

        // Reflexives
        { eng: "Myself", esp: ["yo mismo", "mi mismo", "me"], hint: "Reflexivo (A mi mismo)" },
        { eng: "Himself", esp: ["el mismo", "él mismo", "se"], hint: "Reflexivo (A él mismo)" },
        { eng: "Herself", esp: ["ella misma", "se"], hint: "Reflexivo (A ella misma)" }
    ],

    // Game 3: Time Detective (New)
    timeDetective: [
        { text: "I walked to the park.", tense: "Past", hint: "Termina en -ed (regular)" },
        { text: "She will cook dinner.", tense: "Future", hint: "Tiene 'will'" },
        { text: "They play soccer.", tense: "Present", hint: "Verbo normal, sin ed ni will" },
        { text: "He is happy.", tense: "Present", hint: "Verbo 'is' (ahora)" },
        { text: "We ate pizza.", tense: "Past", hint: "Ate es el pasado de Eat" },
        { text: "It will rain tomorrow.", tense: "Future", hint: "Tomorrow = Mañana" },
        { text: "I study English.", tense: "Present", hint: "Hábito actual" },
        { text: "You saw the movie.", tense: "Past", hint: "Saw es pasado de See" }
    ],

    // Game 4: Conjugation Challenge (New)
    conjugation: [
        {
            base: "Go (Ir)",
            correct: "Went",
            options: ["Go", "Went", "Goned"],
            type: "Past"
        },
        {
            base: "Play (Jugar)",
            correct: "Played",
            options: ["Play", "Played", "Playid"],
            type: "Past"
        },
        {
            base: "Eat (Comer)",
            correct: "Ate",
            options: ["Eated", "Eat", "Ate"],
            type: "Past"
        },
        {
            base: "See (Ver)",
            correct: "Saw",
            options: ["See", "Saw", "Seed"],
            type: "Past"
        },
        {
            base: "Have (Tener)",
            correct: "Had",
            options: ["Haved", "Has", "Had"],
            type: "Past"
        },
        {
            base: "Do (Hacer)",
            correct: "Did",
            options: ["Doed", "Did", "Done"],
            type: "Past"
        }
    ],

    // Reference Section Data
    reference: {
        present: {
            title: "Presente Simple",
            words: [
                { word: "Am / Is / Are", trans: "Ser o Estar", type: "Verb To Be" },
                { word: "Do / Does", trans: "Hacer (o Auxiliar)", type: "Verb/Aux" },
                { word: "Work", trans: "Trabajar", type: "Verb" },
                { word: "Study", trans: "Estudiar", type: "Verb" },
                { word: "Live", trans: "Vivir", type: "Verb" },
                { word: "Like", trans: "Gustar", type: "Verb" },
                { word: "Want", trans: "Querer", type: "Verb" },
                { word: "Need", trans: "Necesitar", type: "Verb" },
                { word: "Today", trans: "Hoy", type: "Time Word" },
                { word: "Always", trans: "Siempre", type: "Frequency" },
                { word: "Every day", trans: "Todos los días", type: "Time Word" }
            ],
            sentences: [
                { eng: "I am a student.", esp: "Yo soy un estudiante." },
                { eng: "She works in an office.", esp: "Ella trabaja en una oficina." },
                { eng: "They live in Mexico.", esp: "Ellos viven en México." },
                { eng: "We study English every day.", esp: "Nosotros estudiamos inglés todos los días." },
                { eng: "He likes pizza.", esp: "A él le gusta la pizza." },
                { eng: "Do you need help?", esp: "¿Necesitas ayuda?" },
                { eng: "I do not understand.", esp: "No entiendo." }
            ]
        },
        past: {
            title: "Pasado Simple",
            words: [
                { word: "Was / Were", trans: "Fui/Era o Estuve/Estaba", type: "Verb To Be" },
                { word: "Did", trans: "Hice (o Auxiliar Pasado)", type: "Verb/Aux" },
                { word: "Went", trans: "Fui (de ir)", type: "Verb (Go)" },
                { word: "Ate", trans: "Comí", type: "Verb (Eat)" },
                { word: "Played", trans: "Jugué", type: "Verb (Play)" },
                { word: "Worked", trans: "Trabajé", type: "Verb (Work)" },
                { word: "Saw", trans: "Vi", type: "Verb (See)" },
                { word: "Yesterday", trans: "Ayer", type: "Time Word" },
                { word: "Last night", trans: "Anoche", type: "Time Word" },
                { word: "Last week", trans: "La semana pasada", type: "Time Word" }
            ],
            sentences: [
                { eng: "I was happy yesterday.", esp: "Yo estaba feliz ayer." },
                { eng: "She went to the park.", esp: "Ella fue al parque." },
                { eng: "We played soccer.", esp: "Nosotros jugamos fútbol." },
                { eng: "He didn't work last week.", esp: "Él no trabajó la semana pasada." },
                { eng: "Did you see the movie?", esp: "¿Viste la película?" },
                { eng: "They ate tacos last night.", esp: "Ellos comieron tacos anoche." }
            ]
        },
        future: {
            title: "Futuro Simple",
            words: [
                { word: "Will", trans: "Auxiliar de Futuro", type: "Auxiliary" },
                { word: "Won't", trans: "No (Futuro Negativo)", type: "Auxiliary" },
                { word: "Gonna", trans: "Voy a (Informal)", type: "Expression" },
                { word: "Tomorrow", trans: "Mañana", type: "Time Word" },
                { word: "Next week", trans: "La próxima semana", type: "Time Word" },
                { word: "Next year", trans: "El próximo año", type: "Time Word" },
                { word: "Soon", trans: "Pronto", type: "Time Word" },
                { word: "Later", trans: "Más tarde", type: "Time Word" }
            ],
            sentences: [
                { eng: "I will call you tomorrow.", esp: "Te llamaré mañana." },
                { eng: "She will be a doctor.", esp: "Ella será doctora." },
                { eng: "We will go to the beach.", esp: "Iremos a la playa." },
                { eng: "He won't come later.", esp: "Él no vendrá más tarde." },
                { eng: "Will they help us?", esp: "¿Ellos nos ayudarán?" },
                { eng: "It will rain soon.", esp: "Lloverá pronto." }
            ]
        }
    }
};
