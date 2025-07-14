// MeowLang Interpreter and Website Functionality
class MeowLangInterpreter {
    constructor() {
        this.memory = new Array(30000).fill(0);
        this.pointer = 0;
        this.loopStack = [];
        this.output = '';
        this.isRunning = false;
        this.executionSteps = 0;
        this.currentCommand = '';
        this.status = 'Ready';
    }

    // Reset interpreter state
    reset() {
        this.memory = new Array(30000).fill(0);
        this.pointer = 0;
        this.loopStack = [];
        this.output = '';
        this.isRunning = false;
        this.executionSteps = 0;
        this.currentCommand = '';
        this.status = 'Ready';
        this.updateUI();
    }

    // Parse and execute MeowLang code
    execute(code) {
        if (this.isRunning) return;
        
        this.reset();
        this.isRunning = true;
        this.status = 'Running';
        this.updateUI();

        const commands = this.parseCode(code);
        let i = 0;

        const executeStep = () => {
            if (i >= commands.length || !this.isRunning) {
                this.isRunning = false;
                this.status = 'Completed';
                this.updateUI();
                return;
            }

            const command = commands[i];
            this.currentCommand = command;
            this.executionSteps++;
            this.updateUI();

            try {
                this.executeCommand(command);
            } catch (error) {
                this.status = 'Error: ' + error.message;
                this.isRunning = false;
                this.updateUI();
                return;
            }

            i++;
            setTimeout(executeStep, 50); // Add delay for visualization
        };

        executeStep();
    }

    // Execute a single command
    executeCommand(command) {
        switch (command) {
            case 'meow':
                this.memory[this.pointer]++;
                break;
            case 'hiss':
                this.memory[this.pointer]--;
                break;
            case 'purr':
                this.output += String.fromCharCode(this.memory[this.pointer]);
                break;
            case 'left':
                this.pointer = (this.pointer - 1 + this.memory.length) % this.memory.length;
                break;
            case 'right':
                this.pointer = (this.pointer + 1) % this.memory.length;
                break;
            case 'yowl':
                if (this.memory[this.pointer] !== 0) {
                    this.loopStack.push(this.executionSteps);
                } else {
                    // Skip to matching paw
                    let depth = 1;
                    let i = this.executionSteps;
                    while (depth > 0 && i < this.commands.length) {
                        if (this.commands[i] === 'yowl') depth++;
                        if (this.commands[i] === 'paw') depth--;
                        i++;
                    }
                    this.executionSteps = i;
                }
                break;
            case 'paw':
                if (this.loopStack.length > 0) {
                    this.executionSteps = this.loopStack.pop() - 1;
                }
                break;
            case 'knead':
                const nextPointer = (this.pointer + 1) % this.memory.length;
                this.memory[nextPointer] += this.memory[this.pointer];
                break;
            case 'lick':
                this.memory[this.pointer] *= 2;
                break;
            case 'stretch':
                this.memory[this.pointer] = Math.abs(this.memory[this.pointer]);
                break;
            case 'chase':
                this.memory[this.pointer] = Math.floor(Math.random() * 10);
                break;
            default:
                // Ignore unknown commands (comments, etc.)
                break;
        }
    }

    // Parse code into commands
    parseCode(code) {
        const lines = code.split('\n');
        const commands = [];
        
        for (const line of lines) {
            // Remove comments (everything after 🐾)
            const commentIndex = line.indexOf('🐾');
            const cleanLine = commentIndex !== -1 ? line.substring(0, commentIndex) : line;
            
            // Split by whitespace and filter out empty strings
            const lineCommands = cleanLine.trim().split(/\s+/).filter(cmd => cmd.length > 0);
            commands.push(...lineCommands);
        }
        
        this.commands = commands;
        return commands;
    }

    // Update UI elements
    updateUI() {
        // Update status
        const statusElement = document.getElementById('debug-status');
        if (statusElement) {
            statusElement.textContent = this.status;
            statusElement.className = 'debug-value ' + this.getStatusClass();
        }

        // Update current command
        const commandElement = document.getElementById('debug-command');
        if (commandElement) {
            commandElement.textContent = this.currentCommand || '-';
        }

        // Update loop stack
        const loopsElement = document.getElementById('debug-loops');
        if (loopsElement) {
            loopsElement.textContent = JSON.stringify(this.loopStack);
        }

        // Update execution steps
        const stepsElement = document.getElementById('debug-steps');
        if (stepsElement) {
            stepsElement.textContent = this.executionSteps;
        }

        // Update pointer position
        const pointerElement = document.getElementById('pointer-pos');
        if (pointerElement) {
            pointerElement.textContent = this.pointer;
        }

        // Update memory size
        const sizeElement = document.getElementById('memory-size');
        if (sizeElement) {
            sizeElement.textContent = this.memory.length;
        }

        // Update memory visualization
        this.updateMemoryVisualization();

        // Update output
        this.updateOutput();
    }

    // Get status CSS class
    getStatusClass() {
        switch (this.status) {
            case 'Running': return 'status-info';
            case 'Completed': return 'status-success';
            case 'Ready': return '';
            default: return 'status-error';
        }
    }

    // Update memory visualization
    updateMemoryVisualization() {
        const memoryContainer = document.getElementById('memory-visualizer');
        if (!memoryContainer) return;

        // Clear existing cells
        memoryContainer.innerHTML = '';

        // Find the range of memory to display (around current pointer)
        const start = Math.max(0, this.pointer - 10);
        const end = Math.min(this.memory.length, this.pointer + 11);

        for (let i = start; i < end; i++) {
            const cell = document.createElement('div');
            cell.className = 'memory-cell';
            cell.setAttribute('data-index', i);
            cell.textContent = this.memory[i];

            // Add special classes
            if (i === this.pointer) {
                cell.classList.add('current');
            }
            if (this.memory[i] !== 0) {
                cell.classList.add('non-zero');
            } else {
                cell.classList.add('zero');
            }

            memoryContainer.appendChild(cell);
        }
    }

    // Update output display
    updateOutput() {
        const outputElement = document.getElementById('output-display');
        if (!outputElement) return;

        if (this.output === '') {
            outputElement.innerHTML = `
                <div class="output-placeholder">
                    <i class="fas fa-terminal"></i>
                    <p>Program output will appear here</p>
                </div>
            `;
        } else {
            outputElement.textContent = this.output;
        }
    }

    // Step execution
    step() {
        if (this.isRunning) return;
        
        const code = document.getElementById('code-editor').value;
        const commands = this.parseCode(code);
        
        if (this.executionSteps >= commands.length) {
            this.status = 'Completed';
            this.updateUI();
            return;
        }

        this.isRunning = true;
        this.status = 'Stepping';
        this.currentCommand = commands[this.executionSteps];
        this.executeCommand(this.currentCommand);
        this.executionSteps++;
        this.isRunning = false;
        this.status = 'Ready';
        this.updateUI();
    }
}

// Global variables
let interpreter = new MeowLangInterpreter();
let currentSection = 'home';
let isDarkMode = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // Initialize components
    initializeNavigation();
    initializeTheme();
    initializePlayground();
    initializeAnimations();
    initializeExamples();
    initializeStats();
    initializeKeyboardShortcuts();
    initializeEasterEggs();

    // Initialize Prism.js for syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            switchSection(section);
            
            // Close mobile menu
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Switch between sections
function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    currentSection = sectionName;

    // Special handling for playground
    if (sectionName === 'playground') {
        initializePlayground();
    }
}

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
        updateTheme();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            updateTheme();
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

function updateTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (icon) icon.className = 'fas fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (icon) icon.className = 'fas fa-moon';
    }
}

// Playground functionality
function initializePlayground() {
    const runBtn = document.getElementById('run-btn');
    const stepBtn = document.getElementById('step-btn');
    const resetBtn = document.getElementById('reset-btn');
    const clearBtn = document.getElementById('clear-btn');
    const clearOutputBtn = document.getElementById('clear-output-btn');
    const codeEditor = document.getElementById('code-editor');

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const code = codeEditor.value;
            if (code.trim()) {
                interpreter.execute(code);
            }
        });
    }

    if (stepBtn) {
        stepBtn.addEventListener('click', () => {
            interpreter.step();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            interpreter.reset();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            codeEditor.value = '';
            updateEditorInfo();
        });
    }

    if (clearOutputBtn) {
        clearOutputBtn.addEventListener('click', () => {
            interpreter.output = '';
            interpreter.updateOutput();
        });
    }

    if (codeEditor) {
        codeEditor.addEventListener('input', updateEditorInfo);
        codeEditor.addEventListener('keydown', handleEditorKeydown);
    }

    // Initialize editor info
    updateEditorInfo();
}

// Update editor information
function updateEditorInfo() {
    const codeEditor = document.getElementById('code-editor');
    const lineCount = document.getElementById('line-count');
    const charCount = document.getElementById('char-count');
    
    if (!codeEditor) return;

    const text = codeEditor.value;
    const lines = text.split('\n').length;
    const chars = text.length;

    if (lineCount) lineCount.textContent = `${lines} lines`;
    if (charCount) charCount.textContent = `${chars} characters`;
}

// Handle editor keyboard shortcuts
function handleEditorKeydown(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                interpreter.execute(document.getElementById('code-editor').value);
                break;
            case 's':
                e.preventDefault();
                saveCode();
                break;
            case 'l':
                e.preventDefault();
                loadCode();
                break;
        }
    }
}

// Save code to localStorage
function saveCode() {
    const code = document.getElementById('code-editor').value;
    localStorage.setItem('meowlang_code', code);
    showNotification('Code saved!', 'success');
}

// Load code from localStorage
function loadCode() {
    const savedCode = localStorage.getItem('meowlang_code');
    if (savedCode) {
        document.getElementById('code-editor').value = savedCode;
        updateEditorInfo();
        showNotification('Code loaded!', 'success');
    }
}

// Examples functionality
function initializeExamples() {
    const exampleButtons = document.querySelectorAll('.example-btn');
    
    exampleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const example = btn.getAttribute('data-example');
            loadExample(example);
        });
    });
}

// Load example code
function loadExample(exampleName) {
    const examples = {
        hello: `🐾 Hello World - Countdown from 5
meow meow meow meow meow 🐾 Set to 5
yowl 🐾 Start loop
    purr 🐾 Output current number
    hiss 🐾 Decrement
paw 🐾 End loop when reaches 0`,

        fibonacci: `🐾 Fibonacci Sequence
meow meow meow meow meow meow meow meow meow meow 🐾 Set to 10
right
meow
right
meow
left left
yowl
    right right
    knead
    left
    knead
    left
    hiss
paw
right right
purr`,

        calculator: `🐾 Calculator - Add 5 + 3
meow meow meow meow meow 🐾 Set first number to 5
right
meow meow meow 🐾 Set second number to 3
left
knead 🐾 Add them together
right
purr 🐾 Output result`,

        pattern: `🐾 Print a pattern
meow meow meow meow meow meow meow meow meow meow 🐾 Set to 10
yowl
    purr 🐾 Output current number
    meow meow meow meow meow meow meow meow meow meow 🐾 Add 10
    purr 🐾 Output new number
    hiss hiss hiss hiss hiss hiss hiss hiss hiss hiss 🐾 Subtract 10
    hiss 🐾 Decrement counter
paw`,

        random: `🐾 Generate random numbers
chase 🐾 Generate random number
purr 🐾 Output it
meow meow meow meow meow meow meow meow meow meow 🐾 Set to 10
yowl
    chase 🐾 Generate new random
    purr 🐾 Output it
    hiss 🐾 Decrement counter
paw`,

        advanced: `🐾 Advanced example with multiple operations
meow meow meow meow meow meow meow meow meow meow 🐾 Set to 10
right
meow meow meow meow meow 🐾 Set second cell to 5
left
knead 🐾 Add to next cell
right
lick 🐾 Multiply by 2
purr 🐾 Output result
left
stretch 🐾 Absolute value
purr 🐾 Output again`
    };

    const codeEditor = document.getElementById('code-editor');
    if (codeEditor && examples[exampleName]) {
        codeEditor.value = examples[exampleName];
        updateEditorInfo();
        showNotification(`Loaded ${exampleName} example!`, 'success');
    }
}

// Animations
function initializeAnimations() {
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                animateNumber(target, 0, finalValue, 2000);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-visual');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch (e.key) {
            case '1':
                switchSection('home');
                break;
            case '2':
                switchSection('playground');
                break;
            case '3':
                switchSection('docs');
                break;
            case '4':
                switchSection('examples');
                break;
            case '5':
                switchSection('about');
                break;
            case 't':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    document.getElementById('theme-toggle').click();
                }
                break;
        }
    });
}

// Easter eggs
function initializeEasterEggs() {
    let meowCount = 0;
    let lastMeowTime = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            const now = Date.now();
            if (now - lastMeowTime < 1000) {
                meowCount++;
                if (meowCount === 5) {
                    showNotification('🐱 Meow! You found the secret!', 'info');
                    meowCount = 0;
                }
            } else {
                meowCount = 1;
            }
            lastMeowTime = now;
        }
    });

    // Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showNotification('🎮 Konami code activated!', 'info');
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform var(--transition-normal);
        border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'}-color);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Auto-save functionality
setInterval(() => {
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor && codeEditor.value.trim()) {
        localStorage.setItem('meowlang_autosave', codeEditor.value);
    }
}, 30000); // Auto-save every 30 seconds

// Load auto-saved code on page load
window.addEventListener('load', () => {
    const savedCode = localStorage.getItem('meowlang_autosave');
    const codeEditor = document.getElementById('code-editor');
    if (savedCode && codeEditor && !codeEditor.value.trim()) {
        codeEditor.value = savedCode;
        updateEditorInfo();
    }
});

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .notification {
        font-weight: 500;
    }
    
    .notification-success {
        border-left-color: var(--success-color) !important;
    }
    
    .notification-error {
        border-left-color: var(--error-color) !important;
    }
    
    .notification-info {
        border-left-color: var(--info-color) !important;
    }
    
    .notification-warning {
        border-left-color: var(--warning-color) !important;
    }
`;
document.head.appendChild(style);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Service Worker for offline functionality (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 