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
        const gameContainer = document.getElementById('game-container');

        menuView.classList.remove('active');
        menuView.classList.add('hidden');

        setTimeout(() => {
            menuView.style.display = 'none';
            gameView.style.display = 'block';
            setTimeout(() => {
                gameView.classList.remove('hidden');
                gameView.classList.add('active');
            }, 50);
        }, 500);

        app.state.currentGame = gameType;
        app.state.currentLevel = 0;
        app.state.score = 0;

        gameContainer.innerHTML = ''; // Clear previous

        if (gameType === 'sentence-builder') {
            app.renderSentenceBuilder(0);
        } else if (gameType === 'word-translator') {
            app.renderTranslator(0);
        }
    },

    showMenu: () => {
        const menuView = document.getElementById('menu-view');
        const gameView = document.getElementById('game-view');

        gameView.classList.remove('active');
        gameView.classList.add('hidden');

        setTimeout(() => {
            gameView.style.display = 'none';
            menuView.style.display = 'block';
            setTimeout(() => {
                menuView.classList.remove('hidden');
                menuView.classList.add('active');
            }, 50);
        }, 500);
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
