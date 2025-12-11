const gameData = {
    // --- Game 1: Sentence Builder ---
    sentences: [
        // Level 1: Beginner (Muchos más ejemplos básicos)
        { id: 1, level: 1, category: "Present Simple", words: [{ text: "I", trans: "Yo" }, { text: "drink", trans: "bebo" }, { text: "water", trans: "agua" }], correctOrder: ["I", "drink", "water"], translation: "Yo bebo agua." },
        { id: 2, level: 1, category: "Present Simple", words: [{ text: "She", trans: "Ella" }, { text: "likes", trans: "le gusta" }, { text: "pizza", trans: "pizza" }], correctOrder: ["She", "likes", "pizza"], translation: "A ella le gusta la pizza." },
        { id: 3, level: 1, category: "Present Simple", words: [{ text: "He", trans: "Él" }, { text: "is", trans: "está" }, { text: "happy", trans: "feliz" }], correctOrder: ["He", "is", "happy"], translation: "Él está feliz." },
        { id: 4, level: 1, category: "Past Simple", words: [{ text: "We", trans: "Nosotros" }, { text: "played", trans: "jugamos" }, { text: "yesterday", trans: "ayer" }], correctOrder: ["We", "played", "yesterday"], translation: "Jugamos ayer." },
        { id: 5, level: 1, category: "Future Simple", words: [{ text: "I", trans: "Yo" }, { text: "will", trans: "voy a" }, { text: "go", trans: "ir" }], correctOrder: ["I", "will", "go"], translation: "Iré." },
        { id: 6, level: 1, category: "Formal", words: [{ text: "My", trans: "Mi" }, { text: "name", trans: "nombre" }, { text: "is", trans: "es" }, { text: "Juan", trans: "Juan" }], correctOrder: ["My", "name", "is", "Juan"], translation: "Mi nombre es Juan." },
        { id: 7, level: 1, category: "Object", words: [{ text: "Open", trans: "Abre" }, { text: "the", trans: "la" }, { text: "door", trans: "puerta" }], correctOrder: ["Open", "the", "door"], translation: "Abre la puerta." },
        { id: 8, level: 1, category: "Present Continuous", words: [{ text: "They", trans: "Ellos" }, { text: "are", trans: "están" }, { text: "cooking", trans: "cocinando" }], correctOrder: ["They", "are", "cooking"], translation: "Ellos están cocinando." },

        // Level 2: Advanced
        { id: 20, level: 2, category: "Conditional", words: [{ text: "If", trans: "Si" }, { text: "it", trans: "eso" }, { text: "rains", trans: "llueve" }, { text: "I", trans: "yo" }, { text: "stay", trans: "quedo" }], correctOrder: ["If", "it", "rains", "I", "stay"], translation: "Si llueve, me quedo." },
        { id: 21, level: 2, category: "Perfect Tense", words: [{ text: "I", trans: "Yo" }, { text: "have", trans: "he" }, { text: "seen", trans: "visto" }, { text: "that", trans: "eso" }], correctOrder: ["I", "have", "seen", "that"], translation: "He visto eso." },

        // Level 3: Expert
        { id: 30, level: 3, category: "Passive", words: [{ text: "The", trans: "El" }, { text: "song", trans: "canción" }, { text: "was", trans: "fue" }, { text: "sung", trans: "cantada" }, { text: "by", trans: "por" }, { text: "her", trans: "ella" }], correctOrder: ["The", "song", "was", "sung", "by", "her"], translation: "La canción fue cantada por ella." }
    ],

    // --- Game 2: Translator Categories (Expanded Level 1) ---
    vocabCategories: {
        personal: [
            { level: 1, eng: "I", esp: ["yo"], hint: "1ra Persona" },
            { level: 1, eng: "You", esp: ["tu", "tú", "usted"], hint: "2da Persona" },
            { level: 1, eng: "He", esp: ["el", "él"], hint: "Hombre" },
            { level: 1, eng: "She", esp: ["ella"], hint: "Mujer" },
            { level: 1, eng: "It", esp: ["eso"], hint: "Cosa/Animal" },
            { level: 1, eng: "We", esp: ["nosotros"], hint: "Grupo" },
            { level: 1, eng: "They", esp: ["ellos", "ellas"], hint: "Plural" },
            { level: 2, eng: "Mine", esp: ["mio"], hint: "Posesivo Pronombre" },
            { level: 3, eng: "Ourselves", esp: ["nosotros mismos"], hint: "Reflexivo Plural" }
        ],
        adjectives: [
            { level: 1, eng: "Good", esp: ["bueno", "bien"], hint: "Positivo" },
            { level: 1, eng: "Bad", esp: ["malo"], hint: "Negativo" },
            { level: 1, eng: "Happy", esp: ["feliz"], hint: "Alegría" },
            { level: 1, eng: "Sad", esp: ["triste"], hint: "Pena" },
            { level: 1, eng: "Big", esp: ["grande"], hint: "Tamaño" },
            { level: 1, eng: "Small", esp: ["pequeño", "chico"], hint: "Tamaño" },
            { level: 1, eng: "Hot", esp: ["caliente", "caluroso"], hint: "Temperatura" },
            { level: 1, eng: "Cold", esp: ["frio", "frío"], hint: "Temperatura" },
            { level: 2, eng: "Angry", esp: ["enojado"], hint: "Emoción" },
            { level: 2, eng: "Tired", esp: ["cansado"], hint: "Estado físico" },
            { level: 3, eng: "Overwhelmed", esp: ["abrumado"], hint: "Mucho estrés" }
        ],
        objects: [
            { level: 1, eng: "House", esp: ["casa"], hint: "Hogar" },
            { level: 1, eng: "Car", esp: ["carro", "auto", "coche"], hint: "Vehículo" },
            { level: 1, eng: "Cat", esp: ["gato"], hint: "Animal" },
            { level: 1, eng: "Dog", esp: ["perro"], hint: "Animal" },
            { level: 1, eng: "Book", esp: ["libro"], hint: "Leer" },
            { level: 1, eng: "Phone", esp: ["telefono", "celular"], hint: "Llamar" },
            { level: 1, eng: "Bed", esp: ["cama"], hint: "Dormir" },
            { level: 2, eng: "Laptop", esp: ["portatil", "computadora"], hint: "Trabajo" },
            { level: 3, eng: "Stapler", esp: ["grapadora"], hint: "Oficina" }
        ],
        verbs_present: [
            { level: 1, eng: "Go", esp: ["ir"], hint: "Moverse" },
            { level: 1, eng: "Come", esp: ["venir"], hint: "Llegar aquí" },
            { level: 1, eng: "Eat", esp: ["comer"], hint: "Alimento" },
            { level: 1, eng: "Sleep", esp: ["dormir"], hint: "Descanso" },
            { level: 1, eng: "Play", esp: ["jugar"], hint: "Diversión" },
            { level: 1, eng: "Work", esp: ["trabajar"], hint: "Laboral" },
            { level: 1, eng: "Study", esp: ["estudiar"], hint: "Aprender" },
            { level: 2, eng: "Think", esp: ["pensar"], hint: "Mente" },
            { level: 3, eng: "Development", esp: ["desarrollo"], hint: "Proceso" } // Actually a noun, fixed mostly verbs
        ]
    },

    // --- REFERENCE BANK (RESTORED & EXPANDED) ---
    reference: {
        present: {
            title: "Presente Simple",
            words: [
                { word: "Am / Is / Are", trans: "Ser o Estar (Verbo To Be)", type: "Esencial" },
                { word: "Do / Does", trans: "Auxiliar para Preguntas/Negativo", type: "Auxiliar" },
                { word: "Have / Has", trans: "Tener", type: "Verbo" },
                { word: "Want", trans: "Querer", type: "Verbo" },
                { word: "Like", trans: "Gustar", type: "Verbo" },
                { word: "Need", trans: "Necesitar", type: "Verbo" },
                { word: "Know", trans: "Saber/Conocer", type: "Verbo" },
                { word: "Think", trans: "Pensar", type: "Verbo" },
                { word: "Always", trans: "Siempre", type: "Frecuencia" },
                { word: "Never", trans: "Nunca", type: "Frecuencia" },
                { word: "Every day", trans: "Todos los días", type: "Tiempo" }
            ],
            sentences: [
                { eng: "I am a student.", esp: "Yo soy estudiante." },
                { eng: "She is my friend.", esp: "Ella es mi amiga." },
                { eng: "We are happy.", esp: "Estamos felices." },
                { eng: "I do not know.", esp: "No lo sé." },
                { eng: "Do you like pizza?", esp: "¿Te gusta la pizza?" },
                { eng: "He has a car.", esp: "Él tiene un carro." },
                { eng: "They play soccer.", esp: "Ellos juegan fútbol." },
                { eng: "She works here.", esp: "Ella trabaja aquí." },
                { eng: "It rains a lot.", esp: "Llueve mucho." },
                { eng: "We live in a house.", esp: "Vivimos en una casa." }
            ]
        },
        past: {
            title: "Pasado Simple",
            words: [
                { word: "Was / Were", trans: "Era/Estaba o Fueron/Estuvieron", type: "To Be Pasado" },
                { word: "Did", trans: "Auxiliar Pasado (Pregunta/Negativo)", type: "Auxiliar" },
                { word: "Went", trans: "Fui/Fue (Pasado de Go)", type: "Verbo Irreg." },
                { word: "Had", trans: "Tuve/Tenía (Pasado de Have)", type: "Verbo Irreg." },
                { word: "Saw", trans: "Vi/Vio (Pasado de See)", type: "Verbo Irreg." },
                { word: "Ate", trans: "Comí (Pasado de Eat)", type: "Verbo Irreg." },
                { word: "Played", trans: "Jugué (Regular +ed)", type: "Verbo Reg." },
                { word: "Worked", trans: "Trabajé (Regular +ed)", type: "Verbo Reg." },
                { word: "Yesterday", trans: "Ayer", type: "Tiempo" },
                { word: "Last Night", trans: "Anoche", type: "Tiempo" }
            ],
            sentences: [
                { eng: "I was tired yesterday.", esp: "Yo estaba cansado ayer." },
                { eng: "They were at home.", esp: "Ellos estaban en casa." },
                { eng: "I did not (didn't) go.", esp: "No fui." },
                { eng: "Did you eat?", esp: "¿Comiste?" },
                { eng: "She went to the park.", esp: "Ella fue al parque." },
                { eng: "We played video games.", esp: "Jugamos videojuegos." },
                { eng: "He bought a car.", esp: "Él compró un carro." },
                { eng: "I saw a movie.", esp: "Vi una película." }
            ]
        },
        future: {
            title: "Futuro Simple",
            words: [
                { word: "Will", trans: "Auxiliar Futuro (Voluntad)", type: "Auxiliar" },
                { word: "Going to", trans: "Voy a (Plan)", type: "Estructura" },
                { word: "Tomorrow", trans: "Mañana", type: "Tiempo" },
                { word: "Soon", trans: "Pronto", type: "Tiempo" },
                { word: "Next Week", trans: "Próxima Semana", type: "Tiempo" },
                { word: "Maybe", trans: "Tal vez", type: "Probabilidad" },
                { word: "Believe", trans: "Creer (Yo creo que...)", type: "Verbo" },
                { word: "Hope", trans: "Esperar/Desear", type: "Verbo" }
            ],
            sentences: [
                { eng: "I will help you.", esp: "Te ayudaré." },
                { eng: "She will arrive soon.", esp: "Ella llegará pronto." },
                { eng: "We will not (won't) go.", esp: "No iremos." },
                { eng: "Will they come?", esp: "¿Vendrán ellos?" },
                { eng: "I am going to eat.", esp: "Voy a comer." },
                { eng: "It is going to rain.", esp: "Va a llover." },
                { eng: "Maybe I will visit.", esp: "Tal vez visite." }
            ]
        }
    },

    // --- Other Games (Level 1 Expanded) ---
    fillBlank: [
        { level: 1, sent: "I ___ happy.", options: ["am", "is", "are"], correct: "am", hint: "To Be (Yo)" },
        { level: 1, sent: "You ___ nice.", options: ["am", "is", "are"], correct: "are", hint: "To Be (Tú)" },
        { level: 1, sent: "She ___ tall.", options: ["am", "is", "are"], correct: "is", hint: "To Be (Ella)" },
        { level: 1, sent: "___ you play?", options: ["Do", "Does"], correct: "Do", hint: "Pregunta (Tú)" },
        { level: 2, sent: "___ she dance?", options: ["Do", "Does"], correct: "Does", hint: "Pregunta (Ella)" },
        { level: 3, sent: "Had I ___ her.", options: ["see", "saw", "seen"], correct: "seen", hint: "Past Perfect" }
    ],

    trueFalse: [
        { level: 1, q: "Red = Rojo", correct: true, explain: "Correcto!" },
        { level: 1, q: "Blue = Verde", correct: false, explain: "Blue es Azul." },
        { level: 1, q: "Dog = Gato", correct: false, explain: "Dog es Perro." },
        { level: 1, q: "Sun = Sol", correct: true, explain: "Correcto!" },
        { level: 2, q: "Past of Go is Went", correct: true, explain: "Correcto." }
    ],

    emojiMatch: [
        { level: 1, emoji: "🍎", options: ["Apple", "Pear", "Grape"], correct: "Apple" },
        { level: 1, emoji: "🍌", options: ["Banana", "Apple", "Orange"], correct: "Banana" },
        { level: 1, emoji: "🚗", options: ["Car", "Bike", "Bus"], correct: "Car" },
        { level: 1, emoji: "🏠", options: ["House", "School", "Park"], correct: "House" },
        { level: 1, emoji: "🌧️", options: ["Rain", "Sun", "Snow"], correct: "Rain" },
        { level: 2, emoji: "✈️", options: ["Plane", "Train", "Car"], correct: "Plane" }
    ],

    memoryCards: [
        { level: 1, id: 1, content: "Red", type: "text" }, { level: 1, id: 1, content: "🔴", type: "emoji" },
        { level: 1, id: 2, content: "Blue", type: "text" }, { level: 1, id: 2, content: "🔵", type: "emoji" },
        { level: 1, id: 3, content: "Dog", type: "text" }, { level: 1, id: 3, content: "🐶", type: "emoji" },
        { level: 1, id: 4, content: "Cat", type: "text" }, { level: 1, id: 4, content: "🐱", type: "emoji" },
        { level: 1, id: 5, content: "Happy", type: "text" }, { level: 1, id: 5, content: "😄", type: "emoji" },
        { level: 1, id: 6, content: "Sad", type: "text" }, { level: 1, id: 6, content: "😢", type: "emoji" }
    ],

    timeDetective: [
        { level: 1, text: "I like pizza.", tense: "Present", hint: "Simple" },
        { level: 1, text: "She runs.", tense: "Present", hint: "Simple" },
        { level: 1, text: "We played.", tense: "Past", hint: "-ed ending" },
        { level: 1, text: "I will go.", tense: "Future", hint: "Will" },
        { level: 2, text: "I swam.", tense: "Past", hint: "Past of Swim" }
    ],

    conjugation: [
        { level: 1, base: "Walk", correct: "Walked", options: ["Walked", "Walking", "Walk"] },
        { level: 1, base: "Play", correct: "Played", options: ["Playd", "Played", "Playing"] },
        { level: 2, base: "Eat", correct: "Ate", options: ["Eated", "Ate", "Eaten"] },
        { level: 2, base: "Do", correct: "Did", options: ["Doed", "Did", "Done"] }
    ]
};
