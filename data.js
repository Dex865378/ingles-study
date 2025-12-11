const gameData = {
    // Game 1: Sentence Builder
    sentences: [
        {
            id: 1,
            category: "Present Simple",
            words: [{ text: "I", trans: "Yo" }, { text: "wash", trans: "lavo" }, { text: "my", trans: "mi" }, { text: "hands", trans: "manos" }, { text: "myself", trans: "yo mismo" }],
            correctOrder: ["I", "wash", "my", "hands", "myself"],
            translation: "Yo lavo mis manos yo mismo."
        },
        {
            id: 2,
            category: "Past Simple",
            words: [{ text: "She", trans: "Ella" }, { text: "cleaned", trans: "limpió" }, { text: "the", trans: "la" }, { text: "house", trans: "casa" }, { text: "yesterday", trans: "ayer" }],
            correctOrder: ["She", "cleaned", "the", "house", "yesterday"],
            translation: "Ella limpió la casa ayer."
        },
        {
            id: 3,
            category: "Future Simple",
            words: [{ text: "We", trans: "Nosotros" }, { text: "will", trans: "futuro" }, { text: "visit", trans: "visitar" }, { text: "grandmother", trans: "abuela" }, { text: "tomorrow", trans: "mañana" }],
            correctOrder: ["We", "will", "visit", "grandmother", "tomorrow"],
            translation: "Visitaremos a la abuela mañana."
        }
    ],

    // Game 2: Vocabulary & Dictionary (Categorized)
    vocabCategories: {
        personal: [
            { eng: "I", esp: ["yo"], hint: "1ra Persona" },
            { eng: "You", esp: ["tu", "tú", "usted"], hint: "2da Persona" },
            { eng: "He", esp: ["el", "él"], hint: "3ra Persona (Hombre)" },
            { eng: "She", esp: ["ella"], hint: "3ra Persona (Mujer)" },
            { eng: "It", esp: ["eso", "ello"], hint: "3ra Persona (Cosa/Animal)" },
            { eng: "We", esp: ["nosotros", "nosotras"], hint: "Plural" },
            { eng: "They", esp: ["ellos", "ellas"], hint: "Plural" }
        ],
        adjectives: [
            { eng: "Happy", esp: ["feliz", "contento"], hint: "Emoción positiva" },
            { eng: "Sad", esp: ["triste"], hint: "Emoción negativa" },
            { eng: "Big", esp: ["grande"], hint: "Tamaño" },
            { eng: "Small", esp: ["pequeño", "chico"], hint: "Tamaño" },
            { eng: "Good", esp: ["bueno", "bien"], hint: "Calidad" },
            { eng: "Bad", esp: ["malo"], hint: "Calidad" }
        ],
        possessives: [
            { eng: "My", esp: ["mi", "mis"], hint: "De mí" },
            { eng: "Your", esp: ["tu", "tus", "su"], hint: "De ti" },
            { eng: "His", esp: ["su", "sus"], hint: "De él" },
            { eng: "Her", esp: ["su", "sus"], hint: "De ella" },
            { eng: "Our", esp: ["nuestro", "nuestra"], hint: "De nosotros" },
            { eng: "Their", esp: ["su", "sus"], hint: "De ellos" }
        ],
        reflexives: [
            { eng: "Myself", esp: ["yo mismo", "mi mismo"], hint: "A mí mismo" },
            { eng: "Yourself", esp: ["tu mismo", "ti mismo"], hint: "A ti mismo" },
            { eng: "Himself", esp: ["el mismo", "sí mismo"], hint: "A él mismo" },
            { eng: "Herself", esp: ["ella misma", "sí misma"], hint: "A ella misma" }
        ],
        objects: [
            { eng: "Car", esp: ["carro", "coche", "auto"], hint: "Vehículo" },
            { eng: "House", esp: ["casa"], hint: "Lugar de vivir" },
            { eng: "Dog", esp: ["perro"], hint: "Mascota" },
            { eng: "Book", esp: ["libro"], hint: "Para leer" },
            { eng: "Phone", esp: ["telefono", "celular"], hint: "Dispositivo" },
            { eng: "Water", esp: ["agua"], hint: "Bebida" },
            { eng: "Food", esp: ["comida"], hint: "Alimento" }
        ],
        verbs_present: [
            { eng: "Run", esp: ["correr"], hint: "Moverse rápido" },
            { eng: "Eat", esp: ["comer"], hint: "Ingerir comida" },
            { eng: "Sleep", esp: ["dormir"], hint: "Descansar" },
            { eng: "Work", esp: ["trabajar"], hint: "Laborar" },
            { eng: "Study", esp: ["estudiar"], hint: "Aprender" },
            { eng: "Go", esp: ["ir"], hint: "Moverse a un lugar" }
        ],
        verbs_past: [
            { eng: "Ran", esp: ["corri", "corrió"], hint: "Pasado de Run" },
            { eng: "Ate", esp: ["comi", "comió"], hint: "Pasado de Eat" },
            { eng: "Slept", esp: ["dormi", "durmió"], hint: "Pasado de Sleep" },
            { eng: "Worked", esp: ["trabaje", "trabajó"], hint: "Pasado de Work" },
            { eng: "Went", esp: ["fui", "fue"], hint: "Pasado de Go" }
        ],
        time_words: [
            { eng: "Today", esp: ["hoy"], hint: "Presente" },
            { eng: "Yesterday", esp: ["ayer"], hint: "Pasado" },
            { eng: "Tomorrow", esp: ["mañana"], hint: "Futuro" },
            { eng: "Now", esp: ["ahora"], hint: "Presente" },
            { eng: "Later", esp: ["luego", "mas tarde", "más tarde"], hint: "Futuro" }
        ]
    },

    // Reference Section (Expanded)
    reference: {
        present: {
            title: "Presente Simple",
            words: [
                { word: "Am/Is/Are", trans: "Ser/Estar", type: "Verb To Be" },
                { word: "Do/Does", trans: "Auxiliar", type: "Helper" },
                { word: "Always", trans: "Siempre", type: "Freq" },
                { word: "Usually", trans: "Usualmente", type: "Freq" }
            ],
            sentences: [
                { eng: "I play soccer.", esp: "Yo juego fútbol." },
                { eng: "She reads books.", esp: "Ella lee libros." },
                { eng: "We live here.", esp: "Vivimos aquí." }
            ]
        },
        past: {
            title: "Pasado Simple",
            words: [
                { word: "Was/Were", trans: "Era/Estaba", type: "Verb To Be" },
                { word: "Did", trans: "Auxiliar Pasado", type: "Helper" },
                { word: "Yesterday", trans: "Ayer", type: "Time" },
                { word: "Last Year", trans: "El año pasado", type: "Time" }
            ],
            sentences: [
                { eng: "I played soccer.", esp: "Yo jugué fútbol." },
                { eng: "She read a book.", esp: "Ella leyó un libro." },
                { eng: "They went home.", esp: "Ellos fueron a casa." }
            ]
        },
        future: {
            title: "Futuro Simple",
            words: [
                { word: "Will", trans: "Auxiliar Futuro", type: "Helper" },
                { word: "Tomorrow", trans: "Mañana", type: "Time" },
                { word: "Next Week", trans: "Próxima semana", type: "Time" }
            ],
            sentences: [
                { eng: "I will play soccer.", esp: "Jugaré fútbol." },
                { eng: "It will rain.", esp: "Lloverá." },
                { eng: "We will see.", esp: "Veremos." }
            ]
        }
    },

    // New Game Data
    fillBlank: [
        { sent: "She ___ to school yesterday.", options: ["go", "went", "goes"], correct: "went", hint: "Pasado (yesterday)" },
        { sent: "I ___ happy today.", options: ["is", "am", "are"], correct: "am", hint: "Verbo To Be (Yo)" },
        { sent: "___ you like pizza?", options: ["Do", "Does", "Is"], correct: "Do", hint: "Pregunta Presente (You)" },
        { sent: "They ___ not working.", options: ["is", "am", "are"], correct: "are", hint: "Plural (They)" }
    ],

    emojiMatch: [
        { emoji: "🍎", options: ["Apple", "Banana", "Car"], correct: "Apple" },
        { emoji: "🚗", options: ["House", "Car", "Bike"], correct: "Car" },
        { emoji: "🐶", options: ["Cat", "Dog", "Bird"], correct: "Dog" },
        { emoji: "🏃", options: ["Sleep", "Run", "Eat"], correct: "Run" },
        { emoji: "🌧️", options: ["Sun", "Rain", "Snow"], correct: "Rain" }
    ],

    trueFalse: [
        { q: "'Yesterday' significa 'Mañana'.", correct: false, explain: "Yesterday es Ayer." },
        { q: "El pasado de 'Go' es 'Went'.", correct: true, explain: "Es un verbo irregular." },
        { q: "'She' usa el auxiliar 'Do'.", correct: false, explain: "She usa 'Does'." },
        { q: "'Will' se usa para el Futuro.", correct: true, explain: "Es el auxiliar del futuro." }
    ],

    // Memory Game Pairs (IDs to match)
    memoryCards: [
        { id: 1, content: "House", type: "text" }, { id: 1, content: "🏠", type: "emoji" },
        { id: 2, content: "Cat", type: "text" }, { id: 2, content: "🐱", type: "emoji" },
        { id: 3, content: "Car", type: "text" }, { id: 3, content: "🚗", type: "emoji" },
        { id: 4, content: "Book", type: "text" }, { id: 4, content: "📚", type: "emoji" },
        { id: 5, content: "Happy", type: "text" }, { id: 5, content: "😄", type: "emoji" },
        { id: 6, content: "Sun", type: "text" }, { id: 6, content: "☀️", type: "emoji" }
    ],

    timeDetective: [
        { text: "I walked to the park.", tense: "Past", hint: "Termina en -ed" },
        { text: "She will cook.", tense: "Future", hint: "Tiene 'will'" },
        { text: "They play soccer.", tense: "Present", hint: "Verbo simple" }
    ],

    conjugation: [
        { base: "Go", correct: "Went", options: ["Go", "Went", "Goned"] },
        { base: "See", correct: "Saw", options: ["See", "Saw", "Seed"] },
        { base: "Eat", correct: "Ate", options: ["Eated", "Eat", "Ate"] }
    ]
};
