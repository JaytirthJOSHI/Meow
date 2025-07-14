/**
 * MeowLang Playground - Pure JavaScript Implementation
 * Runs entirely in the browser without requiring a backend
 */

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
                } else if (command === 'hissfit') {
                    // Negate the current cell
                    this.memory[this.pointer] = -this.memory[this.pointer];
                } else if (command === 'puffup') {
                    // Increment the next cell
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer + 1] += 1;
                    } else {
                        this.memory.push(1);
                    }
                } else if (command === 'shrinktail') {
                    // Decrement the next cell
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer + 1] -= 1;
                    } else {
                        this.memory.push(-1);
                    }
                } else if (command === 'scaredycat') {
                    // Set the next cell to 0
                    if (this.pointer + 1 < this.memory.length) {
                        this.memory[this.pointer + 1] = 0;
                    } else {
                        this.memory.push(0);
                    }
                }
                break;
        }
        
        this.programCounter++;
    }

    run(sourceCode) {
        this.reset();
        this.commands = this.parseProgram(sourceCode);
        
        while (this.programCounter < this.commands.length) {
            const command = this.commands[this.programCounter];
            this.executeCommand(command);
        }
        
        return this.output.join('\n');
    }

    getMemoryState() {
        return {
            memory: this.memory,
            pointer: this.pointer,
            memorySize: this.memory.length
        };
    }
}

// Playground functionality
class MeowLangPlayground {
    constructor() {
        this.interpreter = new MeowLangWebInterpreter();
        this.editor = document.getElementById('codeEditor');
        this.output = document.getElementById('output');
        this.status = document.getElementById('status');
        this.memoryVisualizer = document.getElementById('memoryVisualizer');
        this.pointerPos = document.getElementById('pointerPos');
        this.memorySize = document.getElementById('memorySize');
        this.lineCount = document.getElementById('lineCount');
        
        this.setupEventListeners();
        this.updateLineCount();
    }

    setupEventListeners() {
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearEditor());
        document.getElementById('clearOutputBtn').addEventListener('click', () => this.clearOutput());
        
        this.editor.addEventListener('input', () => this.updateLineCount());
        this.editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
        });

        // Setup example loading
        document.querySelectorAll('.load-example').forEach(button => {
            button.addEventListener('click', () => {
                const code = button.getAttribute('data-code');
                this.editor.value = code;
                this.updateLineCount();
                this.setStatus('Example loaded', 'success');
            });
        });
    }

    updateLineCount() {
        const lines = this.editor.value.split('\n').length;
        this.lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
    }

    runCode() {
        const code = this.editor.value.trim();
        if (!code) {
            this.setStatus('No code to run', 'error');
            return;
        }

        this.setStatus('Running code...', 'info');
        this.clearOutput();

        try {
            const result = this.interpreter.run(code);
            const memoryState = this.interpreter.getMemoryState();
            
            this.displayOutput(result);
            this.updateMemoryVisualization(memoryState.memory, memoryState.pointer);
            this.setStatus('Code executed successfully', 'success');
        } catch (error) {
            this.setStatus(`Error: ${error.message}`, 'error');
        }
    }

    displayOutput(output) {
        this.output.textContent = output || '(no output)';
    }

    updateMemoryVisualization(memory, pointer) {
        this.memoryVisualizer.innerHTML = '';
        this.pointerPos.textContent = pointer;
        this.memorySize.textContent = memory.length;

        memory.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = `memory-cell ${index === pointer ? 'current' : ''} ${value !== 0 ? 'non-zero' : ''}`;
            cell.textContent = value;
            this.memoryVisualizer.appendChild(cell);
        });
    }

    setStatus(message, type = 'info') {
        const colors = {
            info: 'text-blue-400',
            success: 'text-green-400',
            error: 'text-red-400'
        };
        this.status.className = `text-sm ${colors[type]}`;
        this.status.textContent = message;
    }

    clearEditor() {
        this.editor.value = '';
        this.updateLineCount();
        this.setStatus('Editor cleared', 'info');
    }

    clearOutput() {
        this.output.textContent = '';
        this.memoryVisualizer.innerHTML = '<div class="memory-cell current non-zero">0</div>';
        this.pointerPos.textContent = '0';
        this.memorySize.textContent = '1';
        this.setStatus('Output cleared', 'info');
    }
}

// Initialize playground when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MeowLangPlayground();
}); 