// MeowLang Playground JavaScript
// Multi-page version

// Global variables
let interpreter = new MeowLangWebInterpreter();
let examples = {};

// Initialize the playground
document.addEventListener('DOMContentLoaded', function() {
    loadExamples();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    // Example dropdown change
    document.getElementById('examples').addEventListener('change', function(e) {
        if (e.target.value) {
            loadExample(e.target.value);
        }
    });

    // Keyboard shortcuts
    document.getElementById('code').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
}

// Load available examples
function loadExamples() {
    examples = {
        'hello_world': `meow meow meow  🐾 Add 3 to current cell
purr            🐾 Output current cell value
hiss            🐾 Subtract 1 from current cell
purr            🐾 Output current cell value
scratch         🐾 Set current cell to 0
purr            🐾 Output current cell value`,

        'simple_loop': `meow meow meow meow meow  🐾 Set initial value to 5
yowl            🐾 Start loop (while current cell != 0)
  purr          🐾 Output current value
  hiss          🐾 Decrement by 1
paw             🐾 End loop`,

        'memory_manipulation': `meow meow meow    🐾 Set first cell to 3
right            🐾 Move to second cell
meow meow        🐾 Set second cell to 2
left             🐾 Move back to first cell
purr             🐾 Output first cell (3)
right            🐾 Move to second cell
purr             🐾 Output second cell (2)`,

        'fibonacci': `meow meow meow meow meow  🐾 Set first number to 5
right            🐾 Move to second cell
meow meow meow meow meow meow meow meow  🐾 Set second number to 8
left             🐾 Move back to first cell
yowl            🐾 Start loop
  purr          🐾 Output first number
  knead         🐾 Add second cell to first
  right         🐾 Move to second cell
  purr          🐾 Output second number
  scratchout    🐾 Subtract first from second
  left          🐾 Move back to first cell
paw             🐾 End loop`,

        'countdown': `meow meow meow meow meow meow meow meow meow meow  🐾 Set to 10
yowl            🐾 Start countdown loop
  purr          🐾 Output current number
  hiss          🐾 Decrement by 1
paw             🐾 End loop when reaches 0`
    };
    
    console.log('Loaded examples:', Object.keys(examples));
}

// Load a specific example into the editor
function loadExample(name) {
    if (examples[name]) {
        document.getElementById('code').value = examples[name];
        document.getElementById('output').textContent = 'Example loaded! Click "Run Code" to execute. 🐾';
    } else {
        console.error('Example not found:', name);
    }
}

// Run the MeowLang code
function runCode() {
    const code = document.getElementById('code').value;
    const outputDiv = document.getElementById('output');
    const loadingDiv = document.getElementById('loading');
    const memoryDiv = document.getElementById('memory');
    const runButton = document.querySelector('.run-button');

    if (!code.trim()) {
        outputDiv.textContent = 'Please enter some MeowLang code! 🐾';
        return;
    }

    // Show loading state
    loadingDiv.style.display = 'block';
    outputDiv.textContent = '🐾 Processing...';
    memoryDiv.textContent = 'Memory: [0] | Pointer: 0';

    try {
        // Use the web-based interpreter
        const result = interpreter.run(code);
        const memoryState = interpreter.getMemoryState();

        // Display output
        if (result) {
            outputDiv.textContent = result;
        } else {
            outputDiv.textContent = '(No output)';
        }

        // Display memory state
        const memoryStr = memoryState.memory.join(', ');
        const pointer = memoryState.pointer;
        memoryDiv.textContent = `Memory: [${memoryStr}] | Pointer: ${pointer}`;

        // Add success animation
        runButton.classList.add('success');
        setTimeout(() => {
            runButton.classList.remove('success');
        }, 300);

    } catch (error) {
        console.error('Error executing code:', error);
        outputDiv.textContent = `Error: ${error.message}`;
        memoryDiv.textContent = 'Memory: [0] | Pointer: 0';
    } finally {
        // Hide loading state
        loadingDiv.style.display = 'none';
    }
}

// Add some helpful tips
function showTips() {
    const tips = [
        "💡 Use Ctrl+Enter to run your code quickly!",
        "💡 Comments start with 🐾 and are ignored by the interpreter",
        "💡 The memory is an infinite tape that grows as needed",
        "💡 Use 'yowl' and 'paw' for loops (while current cell != 0)",
        "💡 Try the examples from the dropdown to see different programs!",
        "💡 This playground runs entirely in your browser - no server needed!"
    ];
    
    console.log('MeowLang Playground Tips:');
    tips.forEach(tip => console.log(tip));
}

// Show tips on page load
showTips(); 