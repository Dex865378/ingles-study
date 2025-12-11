const app = {
    state: {
        score: 0,
        currentQueue: [], // For queue-based games like Translator/Listening
        currentIndex: 0,
        memoryFlipped: [],
        memoryMatched: []
    },

    init: () => {
        console.log("English Master v5 - Neon Edition Initialized");
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

    // --- 1. Sentence Builder (Fixed Tooltips) ---
    renderSentenceBuilder: (index) => {
        if (index >= gameData.sentences.length) return app.finishGame();
        const data = gameData.sentences[index];
        const words = [...data.words].sort(() => Math.random() - 0.5);

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center;">
                <span class="highlight" style="font-size:1rem; text-transform:uppercase; letter-spacing:2px; display:block; margin-bottom:1rem;">${data.category}</span>
                <p style="font-size:1.2rem; margin-bottom:2rem; color:var(--text-muted);">Ordena: <strong style="color:var(--text-main); font-size:1.4rem;">"${data.translation}"</strong></p>
                <div id="target" class="sentence-slot"></div>
                <div id="source" class="word-pool">
                    ${words.map((w, i) => `<div class="word-chip" id="w${i}" data-trans="${w.trans}" onclick="app.me(this)">${w.text}</div>`).join('')}
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
            <div style="text-align:center;">
                <h3 style="margin-bottom:2rem; color:var(--text-muted);">Selecciona una Categoría</h3>
                <div class="category-grid">
                    ${cats.map(c => `<div class="category-btn" onclick="app.startTranslator('${c}')">${labels[c] || c}</div>`).join('')}
                </div>
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
                <span class="highlight" style="font-size:1rem; text-transform:uppercase; letter-spacing:2px; display:block; margin-bottom:1rem;">Traduce</span>
                <h2 style="font-size:3rem; margin-bottom:0.5rem;">${item.eng}</h2>
                <p style="color:var(--text-muted); margin-bottom:2rem;">${item.hint}</p>
                <div style="max-width:400px; margin:0 auto;">
                    <input type="text" id="inp" class="translator-input" style="width:100%; margin-bottom:1rem;" placeholder="Tu respuesta..." autocomplete="off">
                    <button class="btn-primary" style="width:100%" onclick="app.checkTrans(${index})">Comprobar</button>
                </div>
                <div id="feedback"></div>
            </div>
        `;
        // Auto-check on Enter
        setTimeout(() => {
            const input = document.getElementById('inp');
            if (input) {
                input.focus();
                input.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') app.checkTrans(index);
                });
            }
        }, 50);
    },
    checkTrans: (index) => {
        const val = document.getElementById('inp').value.toLowerCase().trim();
        const item = app.state.currentQueue[index];
        if (item.esp.includes(val)) {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg correct">¡Excelente!</div>`;
            setTimeout(() => app.renderTranslator(index + 1), 800);
        } else {
            document.getElementById('feedback').innerHTML = `<div class="feedback-msg error">Solución: ${item.esp[0]}</div>`;
        }
    },

    // --- 3. Fill Blank ---
    renderFillBlank: (index) => {
        if (index >= gameData.fillBlank.length) return app.finishGame();
        const item = gameData.fillBlank[index];
        const parts = item.sent.split('___');

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center; margin-top:2rem;">
                 <h3 style="margin-bottom:2rem; font-size:1.8rem; line-height:2;">
                    ${parts[0]} 
                    <input id="blank-inp" class="blank-input" autocomplete="off"> 
                    ${parts[1]}
                </h3>
                <p style="color:var(--text-muted); margin-bottom:2rem;">Pista: ${item.hint}</p>
                <div class="options-grid">
                    ${item.options.map(o => `<button class="game-option-btn" onclick="app.fillAndCheck(${index}, '${o}')">${o}</button>`).join('')}
                </div>
                <div id="feedback"></div>
            </div>
        `;
        // Auto-check on Enter
        setTimeout(() => {
            const input = document.getElementById('blank-inp');
            if (input) {
                input.focus();
                input.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') app.checkBlank(index, input.value);
                });
            }
        }, 50);
    },
    fillAndCheck: (index, val) => {
        document.getElementById('blank-inp').value = val;
        app.checkBlank(index, val);
    },
    checkBlank: (index, val) => {
        const item = gameData.fillBlank[index];
        const feedback = document.getElementById('feedback');
        if (val.toLowerCase() === item.correct.toLowerCase()) {
            feedback.innerHTML = `<div class="feedback-msg correct">¡Perfecto!</div>`;
            document.getElementById('blank-inp').style.borderColor = "#4ade80";
            document.getElementById('blank-inp').style.color = "#4ade80";
            setTimeout(() => app.renderFillBlank(index + 1), 1000);
        } else {
            feedback.innerHTML = `<div class="feedback-msg error">Intenta de nuevo</div>`;
            document.getElementById('blank-inp').style.borderColor = "#fb7185";
        }
    },

    // --- 4. Memory ---
    renderMemory: () => {
        // Flat list pairs manually to ensure correct IDs
        const deck = [...gameData.memoryCards, ...gameData.memoryCards].slice(0, 12); // Limit to 12 cards for now (6 pairs)
        // Actually, previous implementation just duplicated the array.
        // Let's make sure we have pairs. logic in data.js was: IDs 1-6.
        // We need 12 cards total.
        const cards = [...gameData.memoryCards]; // 12 items
        const shuffled = cards.sort(() => Math.random() - 0.5);

        document.getElementById('game-container').innerHTML = `
            <div class="memory-grid">
                ${shuffled.map((c, i) => `
                    <div class="memory-card" id="mem-${i}" onclick="app.flipCard(${i}, '${c.id}', '${c.content}')">
                        <div class="front">?</div>
                    </div>
                `).join('')}
            </div>
        `;
        app.state.memoryFlipped = [];
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
            <div style="text-align:center; margin-top:2rem;">
                <h2 style="font-size:2rem; margin-bottom:3rem;">${item.q}</h2>
                <div class="options-grid">
                    <button class="game-option-btn" onclick="app.checkTF(${index}, true)">Verdadero</button>
                    <button class="game-option-btn" onclick="app.checkTF(${index}, false)">Falso</button>
                </div>
                <div id="feedback"></div>
            </div>
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
            <div style="text-align:center;">
                <div style="font-size:8rem; text-align:center; margin-bottom:1rem; filter:drop-shadow(0 0 20px var(--primary-glow));">${item.emoji}</div>
                <div class="options-grid">
                    ${item.options.map(o => `<button class="game-option-btn" onclick="app.checkEmoji(${index}, '${o}')">${o}</button>`).join('')}
                </div>
                <div id="feedback"></div>
            </div>
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
        if (!app.state.listeningQueue) {
            let all = [];
            Object.values(gameData.vocabCategories).forEach(arr => all.push(...arr));
            app.state.listeningQueue = all.sort(() => Math.random() - 0.5).slice(0, 5);
        }

        if (index >= app.state.listeningQueue.length) return app.finishGame();
        const item = app.state.listeningQueue[index];

        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center; margin-top:2rem;">
                <div style="font-size:5rem; margin-bottom:1rem; cursor:pointer;" onclick="app.speak('${item.eng}')">🔊</div>
                <p style="color:var(--text-muted);">Haz clic en el icono para escuchar</p>
                
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
                <h2 style="color:var(--accent); font-size:3rem; margin:1.5rem 0; text-shadow:0 0 15px var(--primary-glow);">${item.esp[0].toUpperCase()}</h2>
                <input type="text" id="spell-inp" class="translator-input" style="font-size:1.5rem; text-align:center; width: 60%; margin:0 auto;" autocomplete="off">
                <br>
                <button class="btn-primary" style="margin-top:2rem;" onclick="app.checkSpelling(${index})">Verificar</button>
                <div id="feedback"></div>
            </div>
        `;
        // Auto-check on Enter
        setTimeout(() => {
            const input = document.getElementById('spell-inp');
            if (input) {
                input.focus();
                input.addEventListener('keyup', (e) => {
                    if (e.key === 'Enter') app.checkSpelling(index);
                });
            }
        }, 50);
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
                <div style="font-size: 5rem; margin-bottom: 1rem;">🏆</div>
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color:var(--text-main);">¡Juego Terminado!</h2>
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
        // Find button for tense map (simple logic)
        const tenseMap = { 'present': 0, 'past': 1, 'future': 2 };
        document.querySelectorAll('.tab-btn')[tenseMap[t]].classList.add('active');

        // Render content
        const data = gameData.reference[t];
        document.getElementById('reference-content').innerHTML = `
            <h2 style="text-align:center; margin-bottom:2rem;">${data.title}</h2>
            <div style="display:grid; gap:1rem; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
            ${data.words.map(w => `
                <div style='background:rgba(255,255,255,0.05); padding:1rem; border-radius:12px; border:1px solid var(--glass-border);'>
                    <div style="color:var(--primary); font-size:0.9rem;">${w.type}</div>
                    <div style="font-size:1.2rem; font-weight:bold;">${w.word}</div>
                    <div style="color:var(--text-muted);">${w.trans}</div>
                </div>
            `).join('')}
            </div>
            <h3 style="margin-top:2rem;">Ejemplos:</h3>
             ${data.sentences.map(s => `
                <div style='background:rgba(0,0,0,0.2); padding:1rem; margin-top:0.5rem; border-radius:12px; border-left:4px solid var(--secondary);'>
                    <div>${s.eng}</div>
                    <div style="color:var(--text-muted); font-style:italic;">${s.esp}</div>
                </div>
            `).join('')}
        `;
    },

    // --- Existing Mini Games (Time Detective / Conjugator) ---
    renderTimeDetective: (index) => {
        if (index >= gameData.timeDetective.length) return app.finishGame();
        const data = gameData.timeDetective[index];
        document.getElementById('game-container').innerHTML = `
            <div style="text-align:center">
            <span class="highlight" style="font-size:1rem; text-transform:uppercase; letter-spacing:2px; display:block; margin-bottom:1rem;">DETECTIVE</span>
            <h2 style="font-size:2.5rem; margin-bottom:2rem;">"${data.text}"</h2>
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
            <div style="text-align:center">
            <span class="highlight" style="font-size:1rem; text-transform:uppercase; letter-spacing:2px; display:block; margin-bottom:1rem;">CONJUGACIÓN</span>
            <h2 style="margin-bottom:0.5rem">Pasado de:</h2>
            <h1 style="font-size:4rem; color:var(--primary); text-shadow:0 0 20px var(--primary-glow); margin-bottom:2rem;">${data.base}</h1>
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
