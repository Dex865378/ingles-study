const app = {
    state: {
        currentGame: null,
        currentLevel: 0,
        score: 0,
        shuffledWords: []
    },

    init: () => {
        console.log("App Initialized");
    },

    loadGame: (gameType) => {
        const menuView = document.getElementById('menu-view');
        const gameView = document.getElementById('game-view');
        const referenceView = document.getElementById('reference-view');
        const gameContainer = document.getElementById('game-container');

        menuView.classList.remove('active');
        menuView.classList.add('hidden');

        setTimeout(() => {
            menuView.style.display = 'none';

            if (gameType === 'study-reference') {
                referenceView.style.display = 'block';
                setTimeout(() => {
                    referenceView.classList.remove('hidden');
                    referenceView.classList.add('active');
                    app.switchTab('present'); // Default tab
                }, 50);
            } else {
                gameView.style.display = 'block';
                setTimeout(() => {
                    gameView.classList.remove('hidden');
                    gameView.classList.add('active');
                }, 50);

                app.state.currentGame = gameType;
                app.state.currentLevel = 0;
                app.state.score = 0;
                gameContainer.innerHTML = '';

                if (gameType === 'sentence-builder') {
                    app.renderSentenceBuilder(0);
                } else if (gameType === 'word-translator') {
                    app.renderTranslator(0);
                } else if (gameType === 'time-detective') {
                    app.renderTimeDetective(0);
                } else if (gameType === 'verb-conjugator') {
                    app.renderVerbConjugator(0);
                }
            }
        }, 500);
    },

    showMenu: () => {
        const menuView = document.getElementById('menu-view');
        const gameView = document.getElementById('game-view');
        const referenceView = document.getElementById('reference-view');

        gameView.classList.remove('active');
        gameView.classList.add('hidden');
        if (referenceView) {
            referenceView.classList.remove('active');
            referenceView.classList.add('hidden');
        }

        setTimeout(() => {
            gameView.style.display = 'none';
            if (referenceView) referenceView.style.display = 'none';
            menuView.style.display = 'block';
            setTimeout(() => {
                menuView.classList.remove('hidden');
                menuView.classList.add('active');
            }, 50);
        }, 500);
    },

    // --- REFERENCE SECTION LOGIC ---
    switchTab: (tense) => {
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(b => b.classList.remove('active'));

        const tenseMap = { 'present': 0, 'past': 1, 'future': 2 };
        if (buttons[tenseMap[tense]]) buttons[tenseMap[tense]].classList.add('active');

        const container = document.getElementById('reference-content');
        const data = gameData.reference[tense];

        let html = `
            <h2 style="text-align:center; font-size: 2rem; margin-bottom: 2rem; color: var(--text-main);">${data.title}</h2>
            
            <h3 class="reference-section-title">📝 Palabras Clave (Vocabulario)</h3>
            <div class="word-list-grid">
                ${data.words.map(w => `
                    <div class="ref-card">
                        <div class="ref-eng">${w.word}</div>
                        <div class="ref-esp">${w.trans}</div>
                        <div style="font-size: 0.8rem; color: var(--primary); margin-top: 0.5rem;">${w.type}</div>
                    </div>
                `).join('')}
            </div>

            <h3 class="reference-section-title">🗣️ Oraciones de Ejemplo</h3>
            <div class="ref-sentences-list">
                ${data.sentences.map(s => `
                    <div class="sentence-row">
                        <div class="sent-eng">${s.eng}</div>
                        <div class="sent-esp">${s.esp}</div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;
        container.style.opacity = '0';
        setTimeout(() => container.style.opacity = '1', 50);
        container.style.transition = 'opacity 0.3s';
    },

    // --- GAME 1: SENTENCE BUILDER ---

    renderSentenceBuilder: (index) => {
        if (index >= gameData.sentences.length) {
            app.showCompletionMessage("¡Juego Completado!", "Has armado todas las oraciones correctamente.");
            return;
        }

        const data = gameData.sentences[index];
        const container = document.getElementById('game-container');

        // Shuffle words shallow copy
        let words = [...data.words];
        words.sort(() => Math.random() - 0.5);
        app.state.shuffledWords = words;

        let html = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; font-size: 0.9rem;">
                    ${data.category}
                </span>
                <h3 style="margin-top: 1rem; font-size: 1.5rem;">Arma la oración</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Arrastra las palabras o haz clic en orden.</p>
            </div>

            <div id="target-slot" class="sentence-slot"></div>
            
            <div id="source-pool" class="word-pool">
                ${words.map((word, i) => `
                    <div class="word-chip" draggable="true" id="word-${i}" onclick="app.moveWord('word-${i}')">
                        ${word.text}
                        <div class="translation-tooltip">${word.trans}</div>
                    </div>
                `).join('')}
            </div>

            <div style="display: flex; gap: 1rem; justify-content: center;">
                 <button class="btn-primary" onclick="app.checkSentence(${index})">Verificar Oración</button>
                 <button class="btn-primary" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);" onclick="app.renderSentenceBuilder(${index})">Reiniciar</button>
            </div>
            
            <div id="feedback-area"></div>
        `;

        container.innerHTML = html;
    },

    moveWord: (id) => {
        const el = document.getElementById(id);
        const target = document.getElementById('target-slot');
        const source = document.getElementById('source-pool');

        if (el.parentElement === source) {
            target.appendChild(el);
        } else {
            source.appendChild(el);
        }
    },

    checkSentence: (index) => {
        const data = gameData.sentences[index];
        const target = document.getElementById('target-slot');
        const currentOrder = Array.from(target.children).map(el => el.innerText.split('\n')[0].trim()); // Clean text from tooltip

        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(data.correctOrder);
        const feedback = document.getElementById('feedback-area');

        if (isCorrect) {
            feedback.innerHTML = `<div class="feedback-msg correct">¡Correcto! <br> "${data.translation}"</div>`;
            setTimeout(() => {
                app.renderSentenceBuilder(index + 1);
            }, 2000);
        } else {
            feedback.innerHTML = `<div class="feedback-msg error">Incorrecto. Intenta de nuevo. <br> Estructura esperada: ${data.correctOrder.join(' ')}</div>`;
        }
    },

    // --- GAME 2: TRANSLATOR ---

    renderTranslator: (index) => {
        if (index >= gameData.vocabulary.length) {
            app.showCompletionMessage("¡Vocabulario Completado!", "Has traducido todas las palabras.");
            return;
        }

        const data = gameData.vocabulary[index];
        const container = document.getElementById('game-container');

        let html = `
             <div style="text-align: center; margin-bottom: 2rem;">
                <span style="background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 20px; font-size: 0.9rem;">
                    Traducción
                </span>
                <h3 style="margin-top: 1rem; font-size: 2rem;">${data.eng}</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">${data.hint}</p>
            </div>

            <div class="translator-cards">
                <div class="input-group">
                    <label>Escribe la traducción en Español:</label>
                    <input type="text" id="trans-input" class="translator-input" placeholder="Tu respuesta..." autocomplete="off">
                </div>
                <button class="check-btn" onclick="app.checkTranslation(${index})">Comprobar</button>
            </div>

            <div id="feedback-area"></div>
        `;

        container.innerHTML = html;

        // Add Enter key support
        setTimeout(() => {
            const input = document.getElementById('trans-input');
            input.focus();
            input.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    app.checkTranslation(index);
                }
            });
        }, 100);
    },

    checkTranslation: (index) => {
        const data = gameData.vocabulary[index];
        const input = document.getElementById('trans-input');
        const val = input.value.toLowerCase().trim();
        const feedback = document.getElementById('feedback-area');

        // Check if value is in allowed answers
        if (data.esp.includes(val)) {
            feedback.innerHTML = `<div class="feedback-msg correct">¡Excelente!</div>`;
            setTimeout(() => {
                app.renderTranslator(index + 1);
            }, 1000);
        } else {
            feedback.innerHTML = `
                <div class="feedback-msg error">
                    Ups, eso no es correcto. <br>
                    Respuestas posibles: ${data.esp.join(', ')}
                </div>
            `;
        }
    },

    // --- GAME 3: TIME DETECTIVE ---
    renderTimeDetective: (index) => {
        if (index >= gameData.timeDetective.length) {
            app.showCompletionMessage("¡Detective Experto!", "Has identificado todos los tiempos correctamente.");
            return;
        }

        const data = gameData.timeDetective[index];
        const container = document.getElementById('game-container');

        let html = `
             <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem">🕵️</div>
                <p style="color: var(--text-muted); margin-bottom: 0.5rem">¿Pasado, Presente o Futuro?</p>
                <h3 style="font-size: 2rem; margin-bottom: 2rem; color: var(--secondary)">"${data.text}"</h3>
            </div>

            <div class="quiz-options">
                <button class="quiz-btn" onclick="app.checkTimeDetective(${index}, 'Present')">Present</button>
                <button class="quiz-btn" onclick="app.checkTimeDetective(${index}, 'Past')">Past</button>
                <button class="quiz-btn" onclick="app.checkTimeDetective(${index}, 'Future')">Future</button>
            </div>

            <div id="feedback-area"></div>
        `;
        container.innerHTML = html;
    },

    checkTimeDetective: (index, answer) => {
        const data = gameData.timeDetective[index];
        const feedback = document.getElementById('feedback-area');
        const buttons = document.querySelectorAll('.quiz-btn');

        if (data.tense === answer) {
            feedback.innerHTML = `<div class="feedback-msg correct">¡Correcto! ${data.hint}</div>`;
            buttons.forEach(btn => {
                if (btn.innerText === answer) btn.classList.add('correct');
            });
            setTimeout(() => app.renderTimeDetective(index + 1), 1500);
        } else {
            feedback.innerHTML = `<div class="feedback-msg error">Incorrecto. Pista: ${data.hint}</div>`;
            buttons.forEach(btn => {
                if (btn.innerText === answer) btn.classList.add('wrong');
            });
        }
    },

    // --- GAME 4: VERB CONJUGATOR ---
    renderVerbConjugator: (index) => {
        if (index >= gameData.conjugation.length) {
            app.showCompletionMessage("¡Maestro de Verbos!", "Dominas los verbos en pasado.");
            return;
        }

        const data = gameData.conjugation[index];
        const container = document.getElementById('game-container');

        let html = `
             <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem">⚡</div>
                <p style="color: var(--text-muted); margin-bottom: 0.5rem">Elige el Pasado Correcto de:</p>
                <h3 style="font-size: 2.5rem; margin-bottom: 2rem; color: var(--primary)">${data.base}</h3>
            </div>

            <div class="quiz-options">
                ${data.options.map(opt => `
                    <button class="quiz-btn" onclick="app.checkConjugation(${index}, '${opt}')">${opt}</button>
                `).join('')}
            </div>

            <div id="feedback-area"></div>
        `;
        container.innerHTML = html;
    },

    checkConjugation: (index, answer) => {
        const data = gameData.conjugation[index];
        const feedback = document.getElementById('feedback-area');
        const buttons = document.querySelectorAll('.quiz-btn');

        if (data.correct === answer) {
            feedback.innerHTML = `<div class="feedback-msg correct">¡Súper!</div>`;
            buttons.forEach(btn => {
                if (btn.innerText === answer) btn.classList.add('correct');
            });
            setTimeout(() => app.renderVerbConjugator(index + 1), 1000);
        } else {
            feedback.innerHTML = `<div class="feedback-msg error">No exactamente. La respuesta es: ${data.correct}</div>`;
            buttons.forEach(btn => {
                if (btn.innerText === answer) btn.classList.add('wrong');
                if (btn.innerText === data.correct) btn.classList.add('correct');
            });
            setTimeout(() => app.renderVerbConjugator(index + 1), 2000);
        }
    },

    toggleGrammarHelp: () => {
        const modal = document.getElementById('grammar-modal');
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            // Small delay to allow display:flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        } else {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); // Wait for transition
        }
    },

    showCompletionMessage: (title, subtitle) => {
        const container = document.getElementById('game-container');
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">${title}</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">${subtitle}</p>
                <button class="btn-primary" onclick="app.showMenu()">Volver al Menú</button>
            </div>
        `;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', app.init);
