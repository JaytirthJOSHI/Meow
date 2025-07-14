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

// Playground functionality for GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    const codeEditor = document.getElementById('codeEditor');
    const output = document.getElementById('output');
    const memoryVisualizer = document.getElementById('memoryVisualizer');
    const pointerPos = document.getElementById('pointerPos');
    const memorySize = document.getElementById('memorySize');
    const status = document.getElementById('status');
    const lineCount = document.getElementById('lineCount');
    const runBtn = document.getElementById('runBtn');
    const clearBtn = document.getElementById('clearBtn');
    const examplesBtn = document.getElementById('examplesBtn');
    const clearOutputBtn = document.getElementById('clearOutputBtn');
    const examplesModal = document.getElementById('examplesModal');
    const closeExamplesBtn = document.getElementById('closeExamplesBtn');
    const examplesList = document.getElementById('examplesList');

    // Examples data
    const examples = [
        {
            name: "Hello World",
            description: "Simple countdown that prints numbers",
            code: `🐾 Hello World - Countdown from 5
meow meow meow meow meow 🐾 Set to 5
yowl 🐾 Start loop
    purr 🐾 Output current number
    hiss 🐾 Decrement
paw 🐾 End loop when reaches 0`
        },
        {
            name: "Fibonacci Sequence",
            description: "Generate first 10 Fibonacci numbers",
            code: `🐾 Fibonacci Sequence
meow meow meow meow meow meow meow meow meow meow 🐾 Set cell 0 to 10 (counter)
right 🐾 Move to cell 1
meow 🐾 Set cell 1 to 1 (first Fibonacci number)
right 🐾 Move to cell 2
meow 🐾 Set cell 2 to 1 (second Fibonacci number)
left left 🐾 Back to cell 0
yowl 🐾 Start loop
    right right 🐾 Move to cell 2
    knead 🐾 Add cells 1 and 2, store in cell 2
    left 🐾 Move to cell 1
    knead 🐾 Add cells 0 and 1, store in cell 1
    left 🐾 Move to cell 0
    hiss 🐾 Decrement counter
paw 🐾 End loop
right right 🐾 Move to cell 2
purr 🐾 Output final Fibonacci number`
        },
        {
            name: "Simple Calculator",
            description: "Add two numbers (5 + 3)",
            code: `🐾 Simple Calculator - Add 5 + 3
meow meow meow meow meow 🐾 Set first number to 5
right 🐾 Move to next cell
meow meow meow 🐾 Set second number to 3
left 🐾 Back to first cell
knead 🐾 Add the two numbers
right 🐾 Move to result cell
purr 🐾 Output result (should be 8)`
        },
        {
            name: "Random Number Generator",
            description: "Generate a random number between 0-9",
            code: `🐾 Random Number Generator
chase 🐾 Generate random number 0-9
purr 🐾 Output the random number`
        },
        {
            name: "Memory Operations",
            description: "Demonstrate various memory operations",
            code: `🐾 Memory Operations Demo
meow meow meow meow meow 🐾 Set to 5
lick 🐾 Multiply by 2 (now 10)
purr 🐾 Output 10
hiss hiss hiss 🐾 Subtract 3 (now 7)
purr 🐾 Output 7
stretch 🐾 Absolute value (still 7)
purr 🐾 Output 7
hiss hiss hiss hiss hiss hiss hiss hiss 🐾 Subtract 8 (now -1)
stretch 🐾 Absolute value (now 1)
purr 🐾 Output 1`
        }
    ];

    // Update line count
    function updateLineCount() {
        const lines = codeEditor.value.split('\n').length;
        lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
    }

    // Update memory visualization
    function updateMemoryVisualization(memoryState) {
        memoryVisualizer.innerHTML = '';
        pointerPos.textContent = memoryState.pointer;
        
        // Show first 20 cells or all non-zero cells
        const cellsToShow = Math.max(20, memoryState.nonZeroCells.length + 5);
        
        for (let i = 0; i < cellsToShow; i++) {
            const cell = document.createElement('div');
            cell.className = 'memory-cell';
            
            if (i === memoryState.pointer) {
                cell.classList.add('current');
            }
            
            if (memoryState.memory[i] !== 0) {
                cell.classList.add('non-zero');
            } else {
                cell.classList.add('zero');
            }
            
            cell.textContent = memoryState.memory[i];
            memoryVisualizer.appendChild(cell);
        }
        
        memorySize.textContent = cellsToShow;
    }

    // Run code
    function runCode() {
        const code = codeEditor.value.trim();
        if (!code) {
            status.textContent = 'No code to run';
            status.className = 'text-sm text-gray-600';
            return;
        }

        status.textContent = 'Running...';
        status.className = 'text-sm text-gray-600';
        runBtn.disabled = true;

        // Use setTimeout to allow UI to update
        setTimeout(() => {
            try {
                const result = window.meowInterpreter.execute(code);
                
                if (result.success) {
                    output.textContent = result.output || '(no output)';
                    updateMemoryVisualization(result);
                    status.textContent = 'Execution completed successfully';
                    status.className = 'text-sm status-success';
                } else {
                    output.textContent = `Error: ${result.error}`;
                    updateMemoryVisualization(result);
                    status.textContent = 'Execution failed';
                    status.className = 'text-sm status-error';
                }
            } catch (error) {
                output.textContent = `Error: ${error.message}`;
                status.textContent = 'Execution failed';
                status.className = 'text-sm status-error';
            }
            
            runBtn.disabled = false;
        }, 10);
    }

    // Clear code editor
    function clearCode() {
        codeEditor.value = '';
        updateLineCount();
        status.textContent = 'Ready to run code';
        status.className = 'text-sm text-gray-600';
    }

    // Clear output
    function clearOutput() {
        output.textContent = '';
        status.textContent = 'Ready to run code';
        status.className = 'text-sm text-gray-600';
    }

    // Load example
    function loadExample(code) {
        codeEditor.value = code;
        updateLineCount();
        status.textContent = 'Example loaded';
        status.className = 'text-sm status-info';
    }

    // Show examples modal
    function showExamples() {
        examplesList.innerHTML = '';
        
        examples.forEach((example, index) => {
            const card = document.createElement('div');
            card.className = 'example-card';
            card.innerHTML = `
                <h3>${example.name}</h3>
                <p class="text-sm text-gray-600 mb-3">${example.description}</p>
                <pre><code>${example.code}</code></pre>
                <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm mt-3 transition-colors" onclick="loadExample(\`${example.code.replace(/`/g, '\\`')}\`)">
                    Load Example
                </button>
            `;
            examplesList.appendChild(card);
        });
        
        examplesModal.classList.remove('hidden');
    }

    // Hide examples modal
    function hideExamples() {
        examplesModal.classList.add('hidden');
    }

    // Event listeners
    codeEditor.addEventListener('input', updateLineCount);
    codeEditor.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });

    runBtn.addEventListener('click', runCode);
    clearBtn.addEventListener('click', clearCode);
    clearOutputBtn.addEventListener('click', clearOutput);
    examplesBtn.addEventListener('click', showExamples);
    closeExamplesBtn.addEventListener('click', hideExamples);

    // Close modal when clicking outside
    examplesModal.addEventListener('click', function(e) {
        if (e.target === examplesModal) {
            hideExamples();
        }
    });

    // Initialize
    updateLineCount();
    
    // Load a default example
    loadExample(examples[0].code);
}); 