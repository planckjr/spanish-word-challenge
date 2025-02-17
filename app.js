const { createApp } = Vue;

createApp({
    data() {
        return {
            allWords: [],  // Loaded from words.js
            randomWords: [],
            userSentence: "",
            feedback: "",
            valid: false
        };
    },
    mounted() {
        this.allWords = window.spanishWords; // Load words from words.js
    },
    methods: {
        getRandomWords() {
            this.randomWords = [];
            while (this.randomWords.length < 5) {
                const randomWord = this.allWords[Math.floor(Math.random() * this.allWords.length)];
                if (!this.randomWords.includes(randomWord)) {
                    this.randomWords.push(randomWord);
                }
            }
            this.feedback = "";
            this.userSentence = "";
        },
        checkSentence() {
            if (!this.userSentence) {
                this.feedback = "Escribe una frase antes de verificar.";
                this.valid = false;
                return;
            }

            const lowerSentence = this.userSentence.toLowerCase();
            const missingWords = this.randomWords.filter(word => !lowerSentence.includes(word));

            if (missingWords.length === 0) {
                this.feedback = "¡Bien hecho! Usaste todas las palabras.";
                this.valid = true;
            } else {
                this.feedback = `Faltan estas palabras: ${missingWords.join(", ")}`;
                this.valid = false;
            }
        }
    }
}).mount("#app");
