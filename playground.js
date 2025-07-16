// MeowLang Interpreter for Playground
console.log('Loading MeowLang Interpreter...');

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
        if (!code || typeof code !== 'string') {
            return [];
        }
        
        const lines = code.split('\n');
        const tokens = [];
        
        for (const line of lines) {
            if (typeof line !== 'string') continue;
            const commentIndex = line.indexOf('🐾');
            const codePart = commentIndex >= 0 ? line.substring(0, commentIndex) : line;
            const words = codePart.trim().split(/\s+/);
            tokens.push(...words.filter(word => word && word.length > 0));
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
        
        // Parse code and validate tokens
        this.tokens = this.parse(code);
        if (!this.tokens || !Array.isArray(this.tokens)) {
            return {
                success: false,
                output: '',
                error: 'Failed to parse code',
                executionTime: 0
            };
        }
        
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
                success: true,
                executionTime: Date.now() - startTime
            };
        } catch (error) {
            return {
                output: this.output,
                memory: [...this.memory],
                pointer: this.pointer,
                error: error.message,
                success: false,
                executionTime: Date.now() - startTime
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

// Playground functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting playground initialization...');
    
    // Get DOM elements with null checks
    const codeEditor = document.getElementById('codeEditor');
    const output = document.getElementById('output');
    const memoryVisualizer = document.getElementById('memoryVisualizer');
    const pointerPos = document.getElementById('pointerPos');
    const memorySize = document.getElementById('memorySize');
    const status = document.getElementById('status');
    const executionTime = document.getElementById('executionTime');
    const lineCount = document.getElementById('lineCount');
    const charCount = document.getElementById('charCount');
    const runBtn = document.getElementById('runBtn');
    const clearBtn = document.getElementById('clearBtn');
    const examplesBtn = document.getElementById('examplesBtn');
    const clearOutputBtn = document.getElementById('clearOutputBtn');
    const examplesModal = document.getElementById('examplesModal');
    const closeExamplesBtn = document.getElementById('closeExamplesBtn');
    const examplesList = document.getElementById('examplesList');

    // Check if we're on the playground page
    if (!codeEditor || !output) {
        console.log('Not on playground page, skipping playground initialization');
        console.log('codeEditor:', codeEditor, 'output:', output);
        return;
    }
    
    console.log('Playground page detected, continuing initialization...');

    // Global interpreter instance
    window.meowInterpreter = new MeowLangInterpreter();

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
        },
        {
            name: "Pattern Printer",
            description: "Print a simple pattern using loops",
            code: `🐾 Pattern Printer
meow meow meow meow meow 🐾 Set to 5
yowl 🐾 Start outer loop
    meow meow meow meow meow 🐾 Set inner counter to 5
    yowl 🐾 Start inner loop
        purr 🐾 Output character
        hiss 🐾 Decrement inner counter
    paw 🐾 End inner loop
    purr 🐾 Output newline
    hiss 🐾 Decrement outer counter
paw 🐾 End outer loop`
        }
    ];

    // Update line and character count
    function updateCounts() {
        if (!codeEditor || !lineCount || !charCount) return;
        
        const text = codeEditor.value || '';
        const lines = text.split('\n').length;
        const chars = text.length;
        
        lineCount.textContent = `${lines} line${lines !== 1 ? 's' : ''}`;
        charCount.textContent = `${chars} character${chars !== 1 ? 's' : ''}`;
    }

    // Update memory visualization
    function updateMemoryVisualization(memoryState) {
        if (!memoryVisualizer || !pointerPos || !memorySize) return;
        
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
        console.log('runCode called');
        if (!codeEditor) {
            console.log('No codeEditor found');
            return;
        }
        
        const code = codeEditor.value.trim();
        console.log('Code to run:', code);
        if (!code) {
            updateStatus('No code to run', 'error');
            return;
        }

        // Ensure interpreter exists
        if (!window.meowInterpreter) {
            console.log('Creating new interpreter...');
            window.meowInterpreter = new MeowLangInterpreter();
        }

        updateStatus('Running...', 'info');
        if (runBtn) {
            runBtn.disabled = true;
            runBtn.classList.add('loading');
        }

        // Use setTimeout to allow UI to update
        setTimeout(() => {
            try {
                const result = window.meowInterpreter.execute(code);
                
                if (result.success) {
                    if (output) {
                        output.innerHTML = result.output || '<div class="output-placeholder"><span>🐱</span><p>No output generated</p></div>';
                    }
                    updateMemoryVisualization(result);
                    updateStatus('Execution completed successfully', 'success');
                    if (executionTime) {
                        executionTime.textContent = `Execution time: ${result.executionTime}ms`;
                    }
                } else {
                    if (output) {
                        output.innerHTML = `<div style="color: #ef4444;">Error: ${result.error}</div>`;
                    }
                    updateMemoryVisualization(result);
                    updateStatus('Execution failed', 'error');
                    if (executionTime) {
                        executionTime.textContent = `Execution time: ${result.executionTime}ms`;
                    }
                }
            } catch (error) {
                if (output) {
                    output.innerHTML = `<div style="color: #ef4444;">Error: ${error.message}</div>`;
                }
                updateStatus('Execution failed', 'error');
                if (executionTime) {
                    executionTime.textContent = '';
                }
            }
            
            if (runBtn) {
                runBtn.disabled = false;
                runBtn.classList.remove('loading');
            }
        }, 10);
    }

    // Update status
    function updateStatus(message, type = 'info') {
        if (!status) return;
        
        const statusContent = status.querySelector('span:last-child');
        const statusIcon = status.querySelector('.status-icon');
        
        if (statusContent) {
            statusContent.textContent = message;
        }
        status.className = `status-content status-${type}`;
        
        if (statusIcon) {
            switch (type) {
                case 'success':
                    statusIcon.textContent = '✅';
                    break;
                case 'error':
                    statusIcon.textContent = '❌';
                    break;
                case 'info':
                    statusIcon.textContent = 'ℹ️';
                    break;
            }
        }
    }

    // Clear code editor
    function clearCode() {
        if (!codeEditor) return;
        
        codeEditor.value = '';
        updateCounts();
        updateStatus('Ready to run code', 'info');
        if (executionTime) {
            executionTime.textContent = '';
        }
    }

    // Clear output
    function clearOutput() {
        if (!output) return;
        
        output.innerHTML = '<div class="output-placeholder"><span>🐱</span><p>Program output will appear here</p></div>';
        updateStatus('Ready to run code', 'info');
        if (executionTime) {
            executionTime.textContent = '';
        }
    }

    // Load example
    function loadExample(code) {
        if (!codeEditor) return;
        
        codeEditor.value = code;
        updateCounts();
        updateStatus('Example loaded', 'info');
        if (executionTime) {
            executionTime.textContent = '';
        }
    }

    // Show examples modal
    function showExamples() {
        if (!examplesList || !examplesModal) return;
        
        examplesList.innerHTML = '';
        
        examples.forEach((example, index) => {
            const card = document.createElement('div');
            card.className = 'example-card';
            card.innerHTML = `
                <h3>${example.name}</h3>
                <p>${example.description}</p>
                <pre><code>${example.code}</code></pre>
                <button onclick="loadExample(\`${example.code.replace(/`/g, '\\`')}\`)">
                    Load Example
                </button>
            `;
            examplesList.appendChild(card);
        });
        
        examplesModal.classList.add('active');
    }

    // Hide examples modal
    function hideExamples() {
        if (!examplesModal) return;
        
        examplesModal.classList.remove('active');
    }

    // Event listeners with null checks
    if (codeEditor) {
        codeEditor.addEventListener('input', updateCounts);
        codeEditor.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                runCode();
            }
        });
    }

    if (runBtn) {
        runBtn.addEventListener('click', runCode);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCode);
    }
    
    if (clearOutputBtn) {
        clearOutputBtn.addEventListener('click', clearOutput);
    }
    
    if (examplesBtn) {
        examplesBtn.addEventListener('click', showExamples);
    }
    
    if (closeExamplesBtn) {
        closeExamplesBtn.addEventListener('click', hideExamples);
    }

    // Close modal when clicking outside
    if (examplesModal) {
        examplesModal.addEventListener('click', function(e) {
            if (e.target === examplesModal) {
                hideExamples();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && examplesModal && examplesModal.classList.contains('active')) {
            hideExamples();
        }
    });

    // Initialize
    updateCounts();
    
    // Load a default example
    if (examples.length > 0) {
        loadExample(examples[0].code);
    }

    // Add syntax highlighting (simple)
    function highlightSyntax() {
        if (!codeEditor) return;
        
        const text = codeEditor.value;
        const highlighted = text
            .replace(/\b(meow|hiss|purr|left|right|yowl|paw)\b/g, '<span style="color: #6366f1;">$1</span>')
            .replace(/(🐾.*)/g, '<span style="color: #64748b;">$1</span>');
        
        // This is a simple implementation - in a real app you'd use a proper syntax highlighter
        console.log('Syntax highlighting would be applied here');
    }

    // Auto-save to localStorage
    function autoSave() {
        if (!codeEditor) return;
        
        localStorage.setItem('meowlang-code', codeEditor.value);
    }

    function autoLoad() {
        if (!codeEditor) return;
        
        const savedCode = localStorage.getItem('meowlang-code');
        if (savedCode) {
            codeEditor.value = savedCode;
            updateCounts();
        }
    }

    // Auto-save every 5 seconds
    setInterval(autoSave, 5000);
    
    // Load saved code on page load
    autoLoad();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    runCode();
                    break;
                case 's':
                    e.preventDefault();
                    autoSave();
                    updateStatus('Code saved', 'success');
                    break;
                case 'l':
                    e.preventDefault();
                    clearCode();
                    break;
            }
        }
    });

    // Add welcome message
    console.log('%c🐱 Welcome to MeowLang Playground! 🐱', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cKeyboard shortcuts:', 'color: #64748b; font-size: 14px;');
    console.log('%cCtrl+Enter: Run code', 'color: #64748b; font-size: 12px;');
    console.log('%cCtrl+S: Save code', 'color: #64748b; font-size: 12px;');
    console.log('%cCtrl+L: Clear code', 'color: #64748b; font-size: 12px;');
});