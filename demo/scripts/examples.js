// Examples Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the examples page
    console.log('MeowLang Examples page loaded! 🐱');
});

// Copy code to clipboard
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const codeElement = codeBlock.querySelector('pre code');
    const textToCopy = codeElement.textContent;
    
    // Use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(function() {
            showCopySuccess(button);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            fallbackCopyTextToClipboard(textToCopy, button);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(textToCopy, button);
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            console.error('Fallback copy command failed');
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success animation
function showCopySuccess(button) {
    const originalText = button.textContent;
    const originalBackground = button.style.background;
    
    button.textContent = '✅ Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
    }, 2000);
}

// Toggle solution visibility
function toggleSolution(button) {
    const solution = button.nextElementSibling;
    const isVisible = solution.style.display !== 'none';
    
    if (isVisible) {
        solution.style.display = 'none';
        button.textContent = '🐾 Show Solution';
    } else {
        solution.style.display = 'block';
        button.textContent = '🐾 Hide Solution';
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + C to copy focused code block
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.closest('.code-block')) {
            e.preventDefault();
            const copyBtn = activeElement.closest('.code-block').querySelector('.copy-btn');
            if (copyBtn) {
                copyCode(copyBtn);
            }
        }
    }
});

// Add hover effects for code blocks
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
});

// Add smooth scrolling for anchor links
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

// Add tooltips for difficulty badges
document.addEventListener('DOMContentLoaded', function() {
    const difficultyBadges = document.querySelectorAll('.difficulty');
    
    difficultyBadges.forEach(badge => {
        const difficulty = badge.textContent.toLowerCase();
        let tooltipText = '';
        
        switch(difficulty) {
            case 'beginner':
                tooltipText = 'Perfect for newcomers to MeowLang!';
                break;
            case 'intermediate':
                tooltipText = 'Some programming experience recommended.';
                break;
            case 'advanced':
                tooltipText = 'For experienced programmers and language enthusiasts.';
                break;
        }
        
        badge.title = tooltipText;
    });
});

// Add example counter
document.addEventListener('DOMContentLoaded', function() {
    const exampleItems = document.querySelectorAll('.example-item');
    const challengeItems = document.querySelectorAll('.challenge-item');
    
    console.log(`📝 Loaded ${exampleItems.length} examples and ${challengeItems.length} challenges!`);
    
    // Add example numbers
    exampleItems.forEach((item, index) => {
        const header = item.querySelector('.example-header h3');
        if (header) {
            header.textContent = `${index + 1}. ${header.textContent}`;
        }
    });
});

// Add keyboard navigation for examples
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const examples = document.querySelectorAll('.example-item');
        const currentIndex = Array.from(examples).findIndex(example => 
            example.getBoundingClientRect().top >= 0
        );
        
        if (currentIndex !== -1) {
            let targetIndex;
            if (e.key === 'ArrowDown') {
                targetIndex = Math.min(currentIndex + 1, examples.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }
            
            examples[targetIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
});