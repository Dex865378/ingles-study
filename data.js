const gameData = {
    // Game 1: Sentence Builder
    // Estructura pedida: Personal, Adjetivo, Possessive, Reflexive Pronouns, Object
    // Nota: La estructura estricta del usuario ("personal, adjetivo, posesivo, reflexivo, objeto") es gramaticalmente rara en una sola oración simple para principiantes.
    // Interpretación: Vamos a mezclar oraciones sencillas que usen estos elementos, enfocándonos en Tiempos Verbales.

    sentences: [
        // Present Tense
        {
            id: 1,
            category: "Present Simple",
            words: [
                { text: "I", trans: "Yo (Pronombre Personal)" },
                { text: "wash", trans: "lavo (Verbo)" },
                { text: "my", trans: "mi (Adjetivo Posesivo)" },
                { text: "hands", trans: "manos (Objeto)" },
                { text: "myself", trans: "yo mismo (Reflexivo)" }
            ],
            // "I wash my hands myself" - Fits most categories
            correctOrder: ["I", "wash", "my", "hands", "myself"],
            translation: "Yo lavo mis manos yo mismo."
        },
        {
            id: 2,
            category: "Present Simple",
            words: [
                { text: "She", trans: "Ella (Pronombre)" },
                { text: "loves", trans: "ama (Verbo)" },
                { text: "her", trans: "su (Adj. Posesivo)" },
                { text: "cat", trans: "gato (Objeto)" }
            ],
            correctOrder: ["She", "loves", "her", "cat"],
            translation: "Ella ama a su gato."
        },
        {
            id: 3,
            category: "Present Simple",
            words: [
                { text: "They", trans: "Ellos (Pronombre)" },
                { text: "do", trans: "hacen (Verbo)" },
                { text: "it", trans: "eso (Objeto)" },
                { text: "themselves", trans: "ellos mismos (Reflexivo)" }
            ],
            correctOrder: ["They", "do", "it", "themselves"],
            translation: "Ellos lo hacen ellos mismos."
        },

        // Past Tense
        {
            id: 4,
            category: "Past Simple",
            words: [
                { text: "He", trans: "Él (Pronombre)" },
                { text: "hurt", trans: "lastimó (Verbo Pasado)" },
                { text: "himself", trans: "se (a sí mismo) (Reflexivo)" },
                { text: "yesterday", trans: "ayer (Tiempo)" }
            ],
            correctOrder: ["He", "hurt", "himself", "yesterday"],
            translation: "Él se lastimó ayer."
        },
        {
            id: 5,
            category: "Past Simple",
            words: [
                { text: "We", trans: "Nosotros (Pronombre)" },
                { text: "cleaned", trans: "limpiamos (Verbo Pasado)" },
                { text: "our", trans: "nuestra (Adj. Posesivo)" },
                { text: "house", trans: "casa (Objeto)" }
            ],
            correctOrder: ["We", "cleaned", "our", "house"],
            translation: "Nosotros limpiamos nuestra casa."
        },

        // Future Tense
        {
            id: 6,
            category: "Future Simple",
            words: [
                { text: "You", trans: "Tú (Pronombre)" },
                { text: "will", trans: "auxiliar futuro" },
                { text: "see", trans: "verás (Verbo)" },
                { text: "it", trans: "eso (Objeto)" },
                { text: "yourself", trans: "tú mismo (Reflexivo)" }
            ],
            correctOrder: ["You", "will", "see", "it", "yourself"],
            translation: "Tú lo verás tú mismo."
        },
        {
            id: 7,
            category: "Future Simple",
            words: [
                { text: "I", trans: "Yo (Pronombre)" },
                { text: "will", trans: "auxiliar futuro" },
                { text: "call", trans: "llamaré (Verbo)" },
                { text: "you", trans: "te (Objeto Pronoun)" },
                { text: "tomorrow", trans: "mañana (Tiempo)" }
            ],
            correctOrder: ["I", "will", "call", "you", "tomorrow"],
            translation: "Te llamaré mañana."
        }
    ],

    // Game 2: Vocabulary Translator
    vocabulary: [
        // Personal Pronouns
        { eng: "I", esp: ["yo"], hint: "Pronombre Personal (Primera persona)" },
        { eng: "You", esp: ["tu", "tú", "usted"], hint: "Pronombre Personal (Segunda persona)" },
        { eng: "He", esp: ["el", "él"], hint: "Pronombre Personal (Él)" },
        { eng: "She", esp: ["ella"], hint: "Pronombre Personal (Ella)" },

        // Possessive Adjectives
        { eng: "My", esp: ["mi", "mis"], hint: "Adjetivo Posesivo (Mío)" },
        { eng: "Your", esp: ["tu", "tus", "su"], hint: "Adjetivo Posesivo (Tuyo/Suyo)" },
        { eng: "Our", esp: ["nuestro", "nuestra"], hint: "Adjetivo Posesivo (De nosotros)" },

        // Reflexive Pronouns
        { eng: "Myself", esp: ["yo mismo", "mi mismo", "me"], hint: "Reflexivo (A mi mismo)" },
        { eng: "Yourself", esp: ["tu mismo", "tú mismo", "te"], hint: "Reflexivo (A ti mismo)" },
        { eng: "Himself", esp: ["el mismo", "él mismo", "se"], hint: "Reflexivo (A él mismo)" },

        // Common Objects/Nouns
        { eng: "House", esp: ["casa"], hint: "Objeto (Lugar donde vives)" },
        { eng: "Car", esp: ["carro", "coche", "auto"], hint: "Objeto (Vehículo)" },
        { eng: "Book", esp: ["libro"], hint: "Objeto (Para leer)" }
    ]
};
