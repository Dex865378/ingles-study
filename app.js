const app = {
    state: {
        score: 0,
        currentQueue: [], // For queue-based games like Translator/Listening
        currentIndex: 0,
        memoryFlipped: [],
        memoryMatched: []
    },

    init: () => {
        console.log("English Master v4 Initialized");
    },

    loadGame: (type) => {
        const menu = document.getElementById('menu-view');
        const ref = document.getElementById('reference-view');
        const game = document.getElementById('game-view');
        const container = document.getElementById('game-container');

        // Reset state
        app.state.score = 0;
        app.state.currentIndex = 0;

        // Hide Menu
        menu.classList.remove('active');
        menu.classList.add('hidden');
        setTimeout(() => { menu.style.display = 'none'; }, 500);

        if (type === 'study-reference') {
            ref.style.display = 'block';
            setTimeout(() => { ref.classList.remove('hidden'); ref.classList.add('active'); app.switchTab('present'); }, 50);
            return;
        }

        // Show Game View
        game.style.display = 'block';
        setTimeout(() => { game.classList.remove('hidden'); game.classList.add('active'); }, 50);
        container.innerHTML = '';

        // Route to Game Logic
        switch (type) {
            case 'sentence-builder': app.renderSentenceBuilder(0); break;
            case 'translator-hub': app.renderTranslatorHub(); break;
            case 'fill-blank': app.renderFillBlank(0); break;
            case 'listening': app.renderListening(0); break;
            case 'memory': app.renderMemory(); break;
            case 'true-false': app.renderTrueFalse(0); break;
            case 'emoji-match': app.renderEmojiMatch(0); break;
            case 'spelling': app.renderSpelling(0); break;
            case 'time-detective': app.renderTimeDetective(0); break;
            case 'verb-conjugator': app.renderVerbConjugator(0); break;
        }
    },

    showMenu: () => {
        const menu = document.getElementById('menu-view');
        const game = document.getElementById('game-view');
        const ref = document.getElementById('reference-view');

        game.classList.remove('active');
        ref.classList.remove('active');
        game.classList.add('hidden');
        ref.classList.add('hidden');

        setTimeout(() => {
            game.style.display = 'none';
            ref.style.display = 'none';
            menu.style.display = 'block';
            setTimeout(() => { menu.classList.remove('hidden'); menu.classList.add('active'); }, 50);
        }, 500);
    },

    // --- 1. Sentence Builder ---
    renderSentenceBuilder: (index) => {
        if (index >= gameData.sentences.length) return app.finishGame();
        const data = gameData.sentences[index];
        const words = [...data.words].sort(() => Math.random() - 0.5);

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center;">
                <h3>${data.category}</h3>
                <p>Ordena: "${data.translation}"</p>
                <div id="target" class="sentence-slot"></div>
                <div id="source" class="word-pool">
                    ${words.map((w, i) => `<div class="word-chip" id="w${i}" onclick="app.me(this)">${w.text}</div>`).join('')}
                </div>
                <button class="btn-primary" onclick="app.checkSent(${index})">Verificar</button>
                <div id="feedback"></div>
            </div>
        `;
    },
    me: (el) => { // Move Element
        const target = document.getElementById('target');
        const source = document.getElementById('source');
        if (el.parentNode === source) target.appendChild(el);
        else source.appendChild(el);
    },
    checkSent: (index) => {
        const correct = gameData.sentences[index].correctOrder;
        const current = Array.from(document.getElementById('target').children).map(el => el.innerText);
        if (JSON.stringify(correct) === JSON.stringify(current)) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">¡Correcto!</div>`;
            setTimeout(() => app.renderSentenceBuilder(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Intenta de nuevo</div>`;
        }
    },

    // --- 2. Translator Hub ---
    renderTranslatorHub: () => {
        const cats = Object.keys(gameData.vocabCategories);
        const labels = {
            personal: "Pronombres Personales", adjectives: "Adjetivos", possessives: "Posesivos",
            reflexives: "Reflexivos", objects: "Objetos", verbs_present: "Verbos (Presente)",
            verbs_past: "Verbos (Pasado)", time_words: "Palabras de Tiempo"
        };

        document.getElementById('game-container').innerHTML = `
            <h3 style="text-align:center; margin-bottom:2rem;">Selecciona una Categoría</h3>
            <div class="category-grid">
                ${cats.map(c => `<div class="category-btn" onclick="app.startTranslator('${c}')">${labels[c] || c}</div>`).join('')}
            </div>
        `;
    },
    startTranslator: (cat) => {
        app.state.currentQueue = gameData.vocabCategories[cat];
        app.renderTranslator(0);
    },
    renderTranslator: (index) => {
        if (index >= app.state.currentQueue.length) return app.finishGame();
        const item = app.state.currentQueue[index];
        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center">
                <h2>${item.eng}</h2>
                <p>${item.hint}</p>
                <input type="text" id="inp" style="padding:1rem; border-radius:8px; width:100%; margin:1rem 0; font-size:1.2rem;" placeholder="En español...">
                <button class="btn-primary" onclick="app.checkTrans(${index})">Comprobar</button>
                <div id="feedback"></div>
            </div>
        `;
    },
    checkTrans: (index) => {
        const val = document.getElementById('inp').value.toLowerCase().trim();
        const item = app.state.currentQueue[index];
        if (item.esp.includes(val)) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">¡Bien!</div>`;
            setTimeout(() => app.renderTranslator(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Era: ${item.esp[0]}</div>`;
        }
    },

    // --- 3. Fill Blank ---
    renderFillBlank: (index) => {
        if (index >= gameData.fillBlank.length) return app.finishGame();
        const item = gameData.fillBlank[index];
        // Split sentence by '___'
        const parts = item.sent.split('___');

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center; font-size:1.5rem; margin-bottom:2rem;">
                ${parts[0]} <input id="blank-inp" class="blank-input"> ${parts[1]}
            </div>
            <div class="options-grid">
                ${item.options.map(o => `<button class="game-option-btn" onclick="document.getElementById('blank-inp').value='${o}'; app.checkBlank(${index}, '${o}')">${o}</button>`).join('')}
            </div>
            <div id="feedback"></div>
        `;
    },
    checkBlank: (index, val) => {
        const item = gameData.fillBlank[index];
        if (val === item.correct) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">Correcto!</div>`;
            setTimeout(() => app.renderFillBlank(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Incorrecto</div>`;
        }
    },

    // --- 4. Memory ---
    renderMemory: () => {
        const cards = [...gameData.memoryCards, ...gameData.memoryCards]; // Duplicate ? No, stored as pairs.
        // Actually pairs are stored as separate items in memoryCards array in data.js.
        // Shuffle
        const deck = [...gameData.memoryCards].sort(() => Math.random() - 0.5);

        document.getElementById('game-container').innerHTML = `
            <div class="memory-grid">
                ${deck.map((c, i) => `
                    <div class="memory-card" id="mem-${i}" onclick="app.flipCard(${i}, '${c.id}', '${c.content}')">
                        <div class="front">?</div>
                    </div>
                `).join('')}
            </div>
        `;
        app.state.memoryFlipped = [];
        app.state.memoryMatched = [];
    },
    flipCard: (index, id, content) => {
        if (app.state.memoryFlipped.length >= 2) return;
        const card = document.getElementById(`mem-${index}`);
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

        card.innerHTML = content;
        card.classList.add('flipped');
        app.state.memoryFlipped.push({ index, id });

        if (app.state.memoryFlipped.length === 2) {
            const [c1, c2] = app.state.memoryFlipped;
            if (c1.id === c2.id) {
                // Match
                document.getElementById(`mem-${c1.index}`).classList.add('matched');
                document.getElementById(`mem-${c2.index}`).classList.add('matched');
                app.state.memoryFlipped = [];
            } else {
                // No match
                setTimeout(() => {
                    document.getElementById(`mem-${c1.index}`).innerHTML = '?';
                    document.getElementById(`mem-${c1.index}`).classList.remove('flipped');
                    document.getElementById(`mem-${c2.index}`).innerHTML = '?';
                    document.getElementById(`mem-${c2.index}`).classList.remove('flipped');
                    app.state.memoryFlipped = [];
                }, 1000);
            }
        }
    },

    // --- 5. True/False ---
    renderTrueFalse: (index) => {
        if (index >= gameData.trueFalse.length) return app.finishGame();
        const item = gameData.trueFalse[index];
        document.getElementById('game-container').innerHTML = `
            <h2 style="text-align:center; margin-bottom:2rem;">${item.q}</h2>
            <div class="options-grid">
                <button class="game-option-btn" onclick="app.checkTF(${index}, true)">Verdadero</button>
                <button class="game-option-btn" onclick="app.checkTF(${index}, false)">Falso</button>
            </div>
            <div id="feedback"></div>
        `;
    },
    checkTF: (index, val) => {
        const item = gameData.trueFalse[index];
        if (val === item.correct) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">Correcto! ${item.explain}</div>`;
            setTimeout(() => app.renderTrueFalse(index + 1), 1500);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Incorrecto. ${item.explain}</div>`;
        }
    },

    // --- 6. Emoji Match ---
    renderEmojiMatch: (index) => {
        if (index >= gameData.emojiMatch.length) return app.finishGame();
        const item = gameData.emojiMatch[index];
        document.getElementById('game-container').innerHTML = `
            <div style="font-size:5rem; text-align:center; margin-bottom:1rem;">${item.emoji}</div>
            <div class="options-grid">
                ${item.options.map(o => `<button class="game-option-btn" onclick="app.checkEmoji(${index}, '${o}')">${o}</button>`).join('')}
            </div>
            <div id="feedback"></div>
        `;
    },
    checkEmoji: (index, val) => {
        if (val === gameData.emojiMatch[index].correct) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">¡Sí!</div>`;
            setTimeout(() => app.renderEmojiMatch(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Nop</div>`;
        }
    },

    // --- 7. Listening ---
    renderListening: (index) => {
        // Collect all vocab for this game
        if (!app.state.listeningQueue) {
            // Flatten categories
            let all = [];
            Object.values(gameData.vocabCategories).forEach(arr => all.push(...arr));
            app.state.listeningQueue = all.sort(() => Math.random() - 0.5).slice(0, 5); // Take 5 random
        }

        if (index >= app.state.listeningQueue.length) return app.finishGame();
        const item = app.state.listeningQueue[index];

        // Generate wrong options
        const allVocab = app.state.listeningQueue; // simplistic pool

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center; margin-top:2rem;">
                <div style="font-size:4rem; margin-bottom:1rem; cursor:pointer;" onclick="app.speak('${item.eng}')">🔊</div>
                <p>Haz clic en el icono para escuchar</p>
                
                <h3 style="margin-top:2rem;">¿Qué escuchaste?</h3>
                <div class="options-grid">
                    <button class="game-option-btn" onclick="app.checkListen(${index}, '${item.eng}')">${item.eng}</button>
                    <button class="game-option-btn" onclick="app.checkListen(${index}, 'WRONG')">Algo diferente</button>
                </div>
                 <div id="feedback"></div>
            </div>
        `;
    },
    speak: (text) => {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        speechSynthesis.speak(u);
    },
    checkListen: (index, val) => {
        const item = app.state.listeningQueue[index];
        if (val === item.eng) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">Good job!</div>`;
            setTimeout(() => app.renderListening(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">It was "${item.eng}"</div>`;
        }
    },

    // --- 8. Spelling (Lluvia de Palabras) ---
    renderSpelling: (index) => {
        // Uses Flattened vocab
        if (!app.state.listeningQueue) {
            let all = [];
            Object.values(gameData.vocabCategories).forEach(arr => all.push(...arr));
            app.state.listeningQueue = all.sort(() => Math.random() - 0.5).slice(0, 5);
        }
        if (index >= app.state.listeningQueue.length) return app.finishGame();
        const item = app.state.listeningQueue[index];

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center;">
                <h3>Escribe en Inglés:</h3>
                <h2 style="color:var(--secondary); font-size:2.5rem; margin:1rem 0;">"${item.esp[0].toUpperCase()}"</h2>
                <input type="text" id="spell-inp" style="padding:1rem; font-size:1.5rem; text-align:center; border-radius:12px; border:none;" autocomplete="off">
                <button class="btn-primary" onclick="app.checkSpelling(${index})">Verificar</button>
                <div id="feedback"></div>
            </div>
        `;
    },
    checkSpelling: (index) => {
        const val = document.getElementById('spell-inp').value.toLowerCase().trim();
        const item = app.state.listeningQueue[index];
        if (val === item.eng.toLowerCase()) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">Correct!</div>`;
            setTimeout(() => app.renderSpelling(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Correct: ${item.eng}</div>`;
        }
    },

    // --- Helpers ---
    finishGame: () => {
        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center; padding:3rem;">
                <h1>🏆</h1>
                <h2>¡Juego Terminado!</h2>
                <button class="btn-primary" onclick="app.showMenu()">Volver al Menú</button>
            </div>
        `;
    },
    toggleGrammarHelp: () => {
        const m = document.getElementById('grammar-modal');
        m.classList.contains('hidden') ? (m.classList.remove('hidden'), setTimeout(() => m.classList.add('active'), 10)) : (m.classList.remove('active'), setTimeout(() => m.classList.add('hidden'), 300));
    },
    switchTab: (t) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        // Find rough match text
        // Simplification for brevity in this massive update
        document.getElementById('reference-content').innerHTML = `<h2>${gameData.reference[t].title}</h2>` +
            gameData.reference[t].words.map(w => `<div style='background:rgba(255,255,255,0.05); padding:1rem; margin:0.5rem; border-radius:8px;'><b>${w.word}</b> = ${w.trans}</div>`).join('');
    },

    // --- Existing Mini Games (Time Detective / Conjugator) ---
    renderTimeDetective: (index) => {
        if (index >= gameData.timeDetective.length) return app.finishGame();
        const data = gameData.timeDetective[index];
        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center"><h2>"${data.text}"</h2>
            <div class="options-grid">
                <button class="game-option-btn" onclick="app.checkTime(${index}, 'Present')">Present</button>
                <button class="game-option-btn" onclick="app.checkTime(${index}, 'Past')">Past</button>
                <button class="game-option-btn" onclick="app.checkTime(${index}, 'Future')">Future</button>
            </div>
            <div id="feedback"></div></div>
         `;
    },
    checkTime: (index, val) => {
        if (val === gameData.timeDetective[index].tense) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">Correct!</div>`;
            setTimeout(() => app.renderTimeDetective(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Wrong</div>`;
        }
    },

    renderVerbConjugator: (index) => {
        if (index >= gameData.conjugation.length) return app.finishGame();
        const data = gameData.conjugation[index];
        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center"><h2>Pasado de: ${data.base}</h2>
            <div class="options-grid">
                ${data.options.map(o => `<button class="game-option-btn" onclick="app.checkConj(${index}, '${o}')">${o}</button>`).join('')}
            </div><div id="feedback"></div></div>
        `;
    },
    checkConj: (index, val) => {
        if (val === gameData.conjugation[index].correct) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">Yes!</div>`;
            setTimeout(() => app.renderVerbConjugator(index + 1), 1000);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">No, it's ${gameData.conjugation[index].correct}</div>`;
        }
    }
};

document.addEventListener('DOMContentLoaded', app.init);
