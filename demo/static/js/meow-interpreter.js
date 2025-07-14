// Pure JavaScript MeowLang Interpreter for GitHub Pages
class MeowLangInterpreter {
    constructor() {
        this.memory = new Array(30000).fill(0);
        this.pointer = 0;
        this.output = '';
        this.input = '';
        this.inputIndex = 0;
        this.loopStack = [];
        this.commands = {
            'meow': () => this.memory[this.pointer]++,
            'hiss': () => this.memory[this.pointer]--,
            'purr': () => this.output += String.fromCharCode(this.memory[this.pointer]),
            'mew': () => {
                if (this.inputIndex < this.input.length) {
                    this.memory[this.pointer] = this.input.charCodeAt(this.inputIndex++);
                }
            },
            'left': () => this.pointer = (this.pointer - 1 + this.memory.length) % this.memory.length,
            'right': () => this.pointer = (this.pointer + 1) % this.memory.length,
            'yowl': () => {
                if (this.memory[this.pointer] !== 0) {
                    this.loopStack.push(this.currentIndex);
                } else {
                    // Skip to matching paw
                    let depth = 1;
                    while (depth > 0 && this.currentIndex < this.tokens.length) {
                        this.currentIndex++;
                        if (this.tokens[this.currentIndex] === 'yowl') depth++;
                        if (this.tokens[this.currentIndex] === 'paw') depth--;
                    }
                }
            },
            'paw': () => {
                if (this.loopStack.length > 0) {
                    this.currentIndex = this.loopStack.pop() - 1;
                }
            },
            'scratch': () => this.memory[this.pointer] = 0,
            'lick': () => this.memory[this.pointer] *= 2,
            'stretch': () => this.memory[this.pointer] = Math.abs(this.memory[this.pointer]),
            'zoomies': () => this.memory[this.pointer] = this.memory[this.pointer] * this.memory[this.pointer],
            'groom': () => {
                // Simple bubble sort for memory cells
                for (let i = 0; i < this.memory.length - 1; i++) {
                    for (let j = 0; j < this.memory.length - i - 1; j++) {
                        if (this.memory[j] > this.memory[j + 1]) {
                            [this.memory[j], this.memory[j + 1]] = [this.memory[j + 1], this.memory[j]];
                        }
                    }
                }
            },
            'sleep': () => {
                // Simulate sleep by doing nothing for a bit
                const start = Date.now();
                while (Date.now() - start < this.memory[this.pointer] * 10) {
                    // Busy wait
                }
            },
            'chase': () => this.memory[this.pointer] = Math.floor(Math.random() * 10),
            'knead': () => {
                const nextPointer = (this.pointer + 1) % this.memory.length;
                this.memory[this.pointer] += this.memory[nextPointer];
            }
        };
    }

    parse(code) {
        // Remove comments and split into tokens
        const lines = code.split('\n');
        const tokens = [];
        
        for (const line of lines) {
            const commentIndex = line.indexOf('🐾');
            const codePart = commentIndex >= 0 ? line.substring(0, commentIndex) : line;
            const words = codePart.trim().split(/\s+/);
            tokens.push(...words.filter(word => word.length > 0));
        }
        
        return tokens;
    }

    execute(code, input = '') {
        this.memory = new Array(30000).fill(0);
        this.pointer = 0;
        this.output = '';
        this.input = input;
        this.inputIndex = 0;
        this.loopStack = [];
        this.tokens = this.parse(code);
        this.currentIndex = 0;

        const startTime = Date.now();
        const maxExecutionTime = 5000; // 5 seconds max

        try {
            while (this.currentIndex < this.tokens.length) {
                if (Date.now() - startTime > maxExecutionTime) {
                    throw new Error('Execution timeout - possible infinite loop');
                }

                const token = this.tokens[this.currentIndex];
                
                if (this.commands[token]) {
                    this.commands[token]();
                }
                // Ignore unknown tokens (treat as comments)
                
                this.currentIndex++;
            }
            
            return {
                output: this.output,
                memory: [...this.memory],
                pointer: this.pointer,
                success: true
            };
        } catch (error) {
            return {
                output: this.output,
                memory: [...this.memory],
                pointer: this.pointer,
                error: error.message,
                success: false
            };
        }
    }

    getMemoryState() {
        const nonZeroCells = [];
        for (let i = 0; i < this.memory.length; i++) {
            if (this.memory[i] !== 0) {
                nonZeroCells.push({ index: i, value: this.memory[i] });
            }
        }
        return {
            pointer: this.pointer,
            memory: this.memory,
            nonZeroCells: nonZeroCells
        };
    }
}

// Global instance
window.meowInterpreter = new MeowLangInterpreter(); 