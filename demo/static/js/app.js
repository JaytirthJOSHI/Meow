/**
 * MeowLang Website JavaScript
 * Main application script with utility functions and global handlers
 */

// Global application state
const MeowLangApp = {
    // Configuration
    config: {
        apiBase: '/api',
        defaultCode: `🐾 Hello World in MeowLang
meow meow meow meow meow meow meow meow meow meow 🐾 Set cell 0 to 10
yowl 🐾 Start loop
    purr 🐾 Output current cell
    hiss 🐾 Decrement cell
paw 🐾 End loop when cell reaches 0`
    },

    // Initialize the application
    init() {
        this.setupGlobalEventListeners();
        this.setupThemeDetection();
        this.setupAccessibility();
        console.log('🐱 MeowLang website initialized');
    },

    // Setup global event listeners
    setupGlobalEventListeners() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search (if implemented)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Could implement search functionality here
            }
        });

        // Handle navigation active states
        this.updateActiveNavigation();
        window.addEventListener('popstate', () => this.updateActiveNavigation());
    },

    // Update active navigation based on current page
    updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('text-white', 'bg-gray-700');
            link.classList.add('text-gray-300');
            
            if (link.getAttribute('href') === currentPath) {
                link.classList.remove('text-gray-300');
                link.classList.add('text-white', 'bg-gray-700');
            }
        });
    },

    // Setup theme detection
    setupThemeDetection() {
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('meowlang-theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    },

    // Setup accessibility features
    setupAccessibility() {
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content id
        const main = document.querySelector('main');
        if (main) {
            main.id = 'main-content';
        }
    },

    // Utility functions
    utils: {
        // Debounce function for performance
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for performance
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Copy text to clipboard
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            }
        },

        // Show notification
        showNotification(message, type = 'info', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
            
            const colors = {
                info: 'bg-blue-600 text-white',
                success: 'bg-green-600 text-white',
                error: 'bg-red-600 text-white',
                warning: 'bg-yellow-600 text-black'
            };
            
            notification.className += ` ${colors[type]}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.remove('translate-x-full');
            }, 100);
            
            // Remove after duration
            setTimeout(() => {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, duration);
        },

        // Format code for display
        formatCode(code, language = 'meow') {
            // Basic syntax highlighting for MeowLang
            return code
                .replace(/\b(meow|hiss|purr|nap|scratch|lick|stretch|zoomies|left|right|groom|yowl|paw|sleep|chase|mew|pounce|knead|scratchout|pounceon|hairball|pawprint|catnip|hissfit|puffup|shrinktail|scaredycat)\b/g, '<span class="text-purple-400 font-bold">$1</span>')
                .replace(/🐾.*$/gm, '<span class="text-gray-500 italic">$&</span>');
        },

        // Validate MeowLang code
        validateCode(code) {
            const errors = [];
            
            if (!code.trim()) {
                errors.push('Code cannot be empty');
            }
            
            // Check for unmatched loops
            const yowlCount = (code.match(/yowl/g) || []).length;
            const pawCount = (code.match(/paw/g) || []).length;
            
            if (yowlCount !== pawCount) {
                errors.push(`Unmatched loops: ${yowlCount} yowl(s) and ${pawCount} paw(s)`);
            }
            
            return errors;
        }
    },

    // API wrapper functions
    api: {
        async request(endpoint, options = {}) {
            const url = `${MeowLangApp.config.apiBase}${endpoint}`;
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            try {
                const response = await fetch(url, { ...defaultOptions, ...options });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API request failed:', error);
                throw error;
            }
        },

        async executeCode(code) {
            return this.request('/execute', {
                method: 'POST',
                body: JSON.stringify({ code })
            });
        },

        async getExamples() {
            return this.request('/examples');
        },

        async healthCheck() {
            return this.request('/health');
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MeowLangApp.init());
} else {
    MeowLangApp.init();
}

// Export for use in other scripts
window.MeowLangApp = MeowLangApp; 