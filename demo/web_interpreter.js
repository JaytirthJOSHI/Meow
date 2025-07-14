// MeowLang Web Interpreter
// Pure JavaScript implementation that runs entirely in the browser

class MeowLangWebInterpreter {
    constructor() {
        this.reset();
    }

    reset() {
        this.memory = [0];
        this.pointer = 0;
        this.output = [];
        this.loopStack = [];
        this.programCounter = 0;
        this.commands = [];
    }

    parseProgram(sourceCode) {
        const lines = sourceCode.trim().split('\n');
        const commands = [];
        
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            
            // Remove everything after 🐾 (inline or full-line comment)
            if (line.includes('🐾')) {
                line = line.split('🐾', 1)[0].trim();
            }
            if (line) {
                // Split the line into individual commands
                const lineCommands = line.split(/\s+/).filter(cmd => cmd.length > 0);
                commands.push(...lineCommands);
            }
        }
        
        return commands;
    }

    executeCommand(command) {
        switch (command) {
            case 'meow':
                this.memory[this.pointer]++;
                break;
                
            case 'hiss':
                this.memory[this.pointer]--;
                break;
                
            case 'purr':
                this.output.push(this.memory[this.pointer].toString());
                break;
                
            case 'nap':
                // No-op
                break;
                
            case 'scratch':
                this.memory[this.pointer] = 0;
                break;
                
            case 'lick':
                this.memory[this.pointer] *= 2;
                break;
                
            case 'stretch':
                this.memory[this.pointer] = Math.abs(this.memory[this.pointer]);
                break;
                
            case 'zoomies':
                this.memory[this.pointer] = this.memory[this.pointer] ** 2;
                break;
                
            case 'left':
                if (this.pointer > 0) {
                    this.pointer--;
                } else {
                    this.memory.unshift(0);
                    // pointer stays at 0
                }
                break;
                
            case 'right':
                this.pointer++;
                if (this.pointer === this.memory.length) {
                    this.memory.push(0);
                }
                break;
                
            case 'groom':
                this.memory.sort((a, b) => a - b);
                break;
                
            case 'yowl':
                this.loopStack.push(this.programCounter);
                break;
                
            case 'paw':
                if (this.loopStack.length > 0) {
                    if (this.memory[this.pointer] !== 0) {
                        // Jump back to start of loop
                        this.programCounter = this.loopStack[this.loopStack.length - 1] - 1;
                    } else {
                        // Exit loop
                        this.loopStack.pop();
                    }
                }
                break;
                
            case 'sleep':
                // Sleep for memory value milliseconds (simulated)
                const sleepTime = this.memory[this.pointer];
                if (sleepTime > 0) {
                    // Note: In a real implementation, you'd want to use setTimeout
                    // but for demo purposes, we'll just log it
                    console.log(`Sleeping for ${sleepTime}ms`);
                }
                break;
                
            case 'chase':
                // Generate random number 0-9
                this.memory[this.pointer] = Math.floor(Math.random() * 10);
                break;
                
            case 'mew':
                // For web demo, we'll use a prompt
                const userInput = prompt('mew? (enter a number)');
                const num = parseInt(userInput);
                this.memory[this.pointer] = isNaN(num) ? 0 : num;
                break;
                
            default:
                // Handle commands with arguments
                if (command.startsWith('chase ')) {
                    const parts = command.split(' ');
                    if (parts.length === 3) {
                        const min = parseInt(parts[1]);
                        const max = parseInt(parts[2]);
                        if (!isNaN(min) && !isNaN(max)) {
                            const minVal = Math.min(min, max);
                            const maxVal = Math.max(min, max);
                            this.memory[this.pointer] = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
                        }
                    }
                } else if (command.startsWith('pounce ')) {
                    const parts = command.split(' ');
                    if (parts.length === 2) {
                        const lineNum = parseInt(parts[1]);
                        if (!isNaN(lineNum) && lineNum >= 1 && lineNum <= this.commands.length) {
                            this.programCounter = lineNum - 1;
                            return; // Skip incrementing programCounter below
                        }
                    }
                } else if (command === 'knead') {
                    // Add current and next cell, store in current
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer] += this.memory[this.pointer + 1];
                    }
                } else if (command === 'scratchout') {
                    // Subtract next cell from current, store in current
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer] -= this.memory[this.pointer + 1];
                    }
                } else if (command === 'pounceon') {
                    // Multiply current and next cell, store in current
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer] *= this.memory[this.pointer + 1];
                    }
                } else if (command === 'hairball') {
                    // Integer divide current by next cell, store in current
                    if (this.pointer + 1 < this.memory.length) {
                        const divisor = this.memory[this.pointer + 1];
                        if (divisor !== 0) {
                            this.memory[this.pointer] = Math.floor(this.memory[this.pointer] / divisor);
                        } else {
                            this.memory[this.pointer] = 0;
                        }
                    } else {
                        // fallback to old behavior: halve
                        this.memory[this.pointer] = Math.floor(this.memory[this.pointer] / 2);
                    }
                } else if (command === 'pawprint') {
                    // Modulo current by next cell, store in current
                    if (this.pointer + 1 < this.memory.length) {
                        const mod = this.memory[this.pointer + 1];
                        if (mod !== 0) {
                            this.memory[this.pointer] %= mod;
                        } else {
                            this.memory[this.pointer] = 0;
                        }
                    }
                } else if (command === 'catnip') {
                    // Power: current cell to the power of next cell
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer] = this.memory[this.pointer] ** this.memory[this.pointer + 1];
                    }
                }
                break;
        }
    }

    run(sourceCode) {
        this.reset();
        this.commands = this.parseProgram(sourceCode);
        
        while (this.programCounter < this.commands.length) {
            const command = this.commands[this.programCounter];
            this.executeCommand(command);
            this.programCounter++;
        }
        
        return this.output.join('');
    }

    getMemoryState() {
        return {
            memory: [...this.memory],
            pointer: this.pointer,
            output: [...this.output]
        };
    }
}

// Make it available globally
window.MeowLangWebInterpreter = MeowLangWebInterpreter;