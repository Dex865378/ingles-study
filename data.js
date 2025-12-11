const gameData = {
    // Shared structure: items have a 'level' property (1=Beginner, 2=Advanced, 3=Expert)

    // Game 1: Sentence Builder
    sentences: [
        // --- Level 1: Beginner ---
        { id: 1, level: 1, category: "Present Simple", words: [{ text: "I", trans: "Yo" }, { text: "eat", trans: "como" }, { text: "an", trans: "una" }, { text: "apple", trans: "manzana" }], correctOrder: ["I", "eat", "an", "apple"], translation: "Yo como una manzana." },
        { id: 2, level: 1, category: "Present Simple", words: [{ text: "She", trans: "Ella" }, { text: "is", trans: "es" }, { text: "my", trans: "mi" }, { text: "friend", trans: "amiga" }], correctOrder: ["She", "is", "my", "friend"], translation: "Ella es mi amiga." },
        { id: 3, level: 1, category: "Past Simple", words: [{ text: "They", trans: "Ellos" }, { text: "played", trans: "jugaron" }, { text: "soccer", trans: "fútbol" }], correctOrder: ["They", "played", "soccer"], translation: "Jugaron fútbol." },
        { id: 4, level: 1, category: "Future Simple", words: [{ text: "We", trans: "Nosotros" }, { text: "will", trans: "vamos a" }, { text: "dance", trans: "bailar" }], correctOrder: ["We", "will", "dance"], translation: "Bailaremos." },
        { id: 5, level: 1, category: "Present Simple", words: [{ text: "The", trans: "El" }, { text: "dog", trans: "perro" }, { text: "runs", trans: "corre" }, { text: "fast", trans: "rápido" }], correctOrder: ["The", "dog", "runs", "fast"], translation: "El perro corre rápido." },

        // --- Level 2: Advanced ---
        { id: 10, level: 2, category: "Mixed Tenses", words: [{ text: "Although", trans: "Aunque" }, { text: "it", trans: "eso" }, { text: "rained", trans: "llovió" }, { text: "we", trans: "nosotros" }, { text: "went", trans: "fuimos" }, { text: "out", trans: "fuera" }], correctOrder: ["Although", "it", "rained", "we", "went", "out"], translation: "Aunque llovió, salimos." },
        { id: 11, level: 2, category: "Conditional", words: [{ text: "If", trans: "Si" }, { text: "you", trans: "tú" }, { text: "study", trans: "estudias" }, { text: "you", trans: "tú" }, { text: "will", trans: "vas a" }, { text: "pass", trans: "aprobar" }], correctOrder: ["If", "you", "study", "you", "will", "pass"], translation: "Si estudias, aprobarás." },
        { id: 12, level: 2, category: "Passive Voice", words: [{ text: "The", trans: "El" }, { text: "book", trans: "libro" }, { text: "was", trans: "fue" }, { text: "written", trans: "escrito" }, { text: "by", trans: "por" }, { text: "him", trans: "él" }], correctOrder: ["The", "book", "was", "written", "by", "him"], translation: "El libro fue escrito por él." },

        // --- Level 3: Expert ---
        { id: 20, level: 3, category: "Complex", words: [{ text: "Had", trans: "Si hubiera" }, { text: "I", trans: "yo" }, { text: "known", trans: "sabido" }, { text: "I", trans: "yo" }, { text: "would", trans: "habría" }, { text: "have", trans: "auxiliar" }, { text: "come", trans: "venido" }], correctOrder: ["Had", "I", "known", "I", "would", "have", "come"], translation: "Si lo hubiera sabido, habría venido." },
        { id: 21, level: 3, category: "Formal", words: [{ text: "Therefore", trans: "Por lo tanto" }, { text: "we", trans: "nosotros" }, { text: "must", trans: "debemos" }, { text: "consider", trans: "considerar" }, { text: "the", trans: "las" }, { text: "alternatives", trans: "alternativas" }], correctOrder: ["Therefore", "we", "must", "consider", "the", "alternatives"], translation: "Por lo tanto debemos considerar las alternativas." }
    ],

    // Game 2: Vocabulary Translator (Categorized & Leveled)
    // IMPORTANT: 'level' added to each item
    vocabCategories: {
        personal: [
            { level: 1, eng: "I", esp: ["yo"], hint: "1ra Persona" },
            { level: 1, eng: "You", esp: ["tu", "tú"], hint: "2da Persona" },
            { level: 1, eng: "We", esp: ["nosotros"], hint: "Plural" },
            { level: 2, eng: "One", esp: ["uno", "se"], hint: "Pronombre impersonal (Se dice...)" },
            { level: 3, eng: "Thou", esp: ["tú", "vos"], hint: "Arcaico/Bíblico" }
        ],
        adjectives: [
            // Level 1
            { level: 1, eng: "Happy", esp: ["feliz"], hint: ":)" },
            { level: 1, eng: "Sad", esp: ["triste"], hint: ":(" },
            { level: 1, eng: "Big", esp: ["grande"], hint: "Tamaño" },
            { level: 1, eng: "Red", esp: ["rojo"], hint: "Color" },
            { level: 1, eng: "Blue", esp: ["azul"], hint: "Color" },
            { level: 1, eng: "Good", esp: ["bueno"], hint: "Positivo" },
            // Level 2
            { level: 2, eng: "Beautiful", esp: ["hermoso", "bello"], hint: "Muy bonito" },
            { level: 2, eng: "Expensive", esp: ["caro", "costoso"], hint: "Mucho dinero" },
            { level: 2, eng: "Dangerous", esp: ["peligroso"], hint: "Cuidado" },
            { level: 2, eng: "Anxious", esp: ["ansioso"], hint: "Nervioso" },
            // Level 3
            { level: 3, eng: "Exquisite", esp: ["exquisito"], hint: "Muy refinado" },
            { level: 3, eng: "Ephemeral", esp: ["efímero"], hint: "Dura poco" },
            { level: 3, eng: "Ubiquitous", esp: ["ubicuo", "omnipresente"], hint: "En todas partes" }
        ],
        verbs_present: [
            // Level 1
            { level: 1, eng: "Walk", esp: ["caminar"], hint: "Mover las piernas" },
            { level: 1, eng: "Run", esp: ["correr"], hint: "Más rápido que caminar" },
            { level: 1, eng: "Eat", esp: ["comer"], hint: "Comida" },
            { level: 1, eng: "Drink", esp: ["beber", "tomar"], hint: "Agua" },
            // Level 2
            { level: 2, eng: "Understand", esp: ["entender", "comprender"], hint: "Saber qué significa" },
            { level: 2, eng: "Remember", esp: ["recordar"], hint: "No olvidar" },
            { level: 2, eng: "Believe", esp: ["creer"], hint: "Fe" },
            // Level 3
            { level: 3, eng: "Acknowledge", esp: ["reconocer", "admitir"], hint: "Aceptar verdad" },
            { level: 3, eng: "Hypothesize", esp: ["hipotetizar"], hint: "Suposición científica" }
        ],
        objects: [
            { level: 1, eng: "Table", esp: ["mesa"], hint: "Mueble" },
            { level: 1, eng: "Chair", esp: ["silla"], hint: "Para sentarse" },
            { level: 1, eng: "Pen", esp: ["boligrafo", "pluma", "lapicero"], hint: "Escribir" },
            { level: 2, eng: "Keyboard", esp: ["teclado"], hint: "Computadora" },
            { level: 2, eng: "Screen", esp: ["pantalla"], hint: "Monitor" },
            { level: 3, eng: "Chandelier", esp: ["candelabro", "araña"], hint: "Luz de techo elegante" },
            { level: 3, eng: "Typewriter", esp: ["maquina de escribir"], hint: "Antiguo para escribir" }
        ]
    },

    // Reference Section (Static, simpler to leave as is but implies coverage)
    reference: {
        present: { title: "Presente", words: [{ word: "Am", trans: "Soy", type: "Verb To Be" }], sentences: [{ eng: "I am here", esp: "Estoy aquí" }] },
        past: { title: "Pasado", words: [{ word: "Was", trans: "Fui", type: "Verb To Be" }], sentences: [{ eng: "I was there", esp: "Estuve ahí" }] },
        future: { title: "Futuro", words: [{ word: "Will", trans: "Futuro", type: "Aux" }], sentences: [{ eng: "I will go", esp: "Iré" }] }
    },

    // Fill Blank
    fillBlank: [
        { level: 1, sent: "I ___ happy.", options: ["am", "is", "are"], correct: "am", hint: "To Be (Yo)" },
        { level: 1, sent: "She ___ pizza.", options: ["eat", "eats", "eating"], correct: "eats", hint: "3ra persona 's'" },
        { level: 2, sent: "I have ___ the movie.", options: ["see", "saw", "seen"], correct: "seen", hint: "Participio (Have)" },
        { level: 3, sent: "Barely had I arrived ___ it started raining.", options: ["when", "than", "then"], correct: "when", hint: "Inversion structure" }
    ],

    // Emoji Match
    emojiMatch: [
        { level: 1, emoji: "🍎", options: ["Apple", "Banana", "Car"], correct: "Apple" },
        { level: 1, emoji: "🐶", options: ["Cat", "Dog", "Bird"], correct: "Dog" },
        { level: 1, emoji: "🏠", options: ["House", "School", "Park"], correct: "House" },
        { level: 2, emoji: "⚖️", options: ["Justice", "Scale", "Balance"], correct: "Scale" },
        { level: 2, emoji: "🧬", options: ["DNA", "Biology", "Science"], correct: "DNA" },
        { level: 3, emoji: "🤔", options: ["Ponder", "Think", "Wonder"], correct: "Ponder" }
    ],

    // True False
    trueFalse: [
        { level: 1, q: "'Blue' es Rojo.", correct: false, explain: "Blue es Azul." },
        { level: 1, q: "'Cat' es Gato.", correct: true, explain: "Sí." },
        { level: 2, q: "El Pasado Participio de 'Go' es 'Went'.", correct: false, explain: "Es 'Gone'." },
        { level: 3, q: "El 'Third Conditional' habla de futuro.", correct: false, explain: "Habla de un pasado hipotético." }
    ],

    // Memory Cards (Simple list)
    memoryCards: [
        { level: 1, id: 1, content: "Red", type: "text" }, { level: 1, id: 1, content: "🔴", type: "emoji" },
        { level: 1, id: 2, content: "Water", type: "text" }, { level: 1, id: 2, content: "💧", type: "emoji" },
        { level: 2, id: 3, content: "Idea", type: "text" }, { level: 2, id: 3, content: "💡", type: "emoji" },
        { level: 3, id: 4, content: "Time", type: "text" }, { level: 3, id: 4, content: "⏳", type: "emoji" }
    ],

    // Time Detective
    timeDetective: [
        { level: 1, text: "I play.", tense: "Present", hint: "Simple" },
        { level: 1, text: "I played.", tense: "Past", hint: "-ed" },
        { level: 2, text: "I have played.", tense: "Present", hint: "Present Perfect connects to present" }, // Simplification for game logic, usually mapped to broader categories or we keep simple
        { level: 3, text: "I will have been playing.", tense: "Future", hint: "Future Perfect Continuous" }
    ],

    // Conjugation
    conjugation: [
        { level: 1, base: "Go", correct: "Went", options: ["Go", "Went", "Gone"] },
        { level: 1, base: "Play", correct: "Played", options: ["Play", "Played", "Plaid"] },
        { level: 2, base: "Buy", correct: "Bought", options: ["Buyed", "Bought", "Brought"] },
        { level: 2, base: "Think", correct: "Thought", options: ["Thinked", "Thought", "Thaught"] },
        { level: 3, base: "Seek", correct: "Sought", options: ["Seeked", "Sought", "Saught"] }
    ]
};
