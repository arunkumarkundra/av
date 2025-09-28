// 🌟 COSMIC ACCESSIBILITY ENHANCED JAVASCRIPT
// Maintaining mystical vibes while being inclusive

// Global variables
let messages = [];
let currentFocusElement = null;
let cosmicAnnouncementTimer = null;

// DOM elements
const focusState = document.getElementById('focusState');
const messageState = document.getElementById('messageState');
const askButton = document.getElementById('askButton');
const askAgainButton = document.getElementById('askAgainButton');
const messageText = document.getElementById('cosmic-message-text');
const focusTimer = document.getElementById('focusTimer');
const timerFill = focusTimer.querySelector('.timer-fill');
const shareButton = document.getElementById('shareButton');
const shareCanvas = document.getElementById('shareCanvas');
const cosmicAnnouncements = document.getElementById('cosmic-announcements');
const timerStatus = document.getElementById('cosmic-timer-status');

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    await loadMessages();
    initializeCosmicAccessibility();
    initializeApp();
});

// 🔮 COSMIC ACCESSIBILITY INITIALIZATION
function initializeCosmicAccessibility() {
    // Add keyboard event listeners
    document.addEventListener('keydown', handleCosmicKeyNavigation);
    
    // Enhance focus management
    setupCosmicFocusManagement();
    
    // Add reduced motion detection
    respectCosmicMotionPreferences();
    
    // Setup cosmic announcements
    setupCosmicAnnouncements();
    
    // Initialize cosmic preferences
    detectCosmicPreferences();
    
    console.log('🌟 Cosmic accessibility initialized');
}

// ⌨️ COSMIC KEYBOARD NAVIGATION
function handleCosmicKeyNavigation(event) {
    switch (event.key) {
        case 'Enter':
        case ' ': // Spacebar
            if (event.target === askButton && !askButton.disabled) {
                event.preventDefault();
                handleAskUniverse();
                announceToUniverse('🌟 Connecting to cosmic energies...');
            } else if (event.target === askAgainButton) {
                event.preventDefault();
                resetToFocus();
                announceToUniverse('🔮 Preparing for new cosmic guidance...');
            } else if (event.target === shareButton) {
                event.preventDefault();
                generateAndDownloadImage();
            }
            break;
            
        case 'Escape':
            // Cosmic escape - return to focus state
            if (!messageState.classList.contains('hidden')) {
                resetToFocus();
                announceToUniverse('🌙 Returning to cosmic meditation...');
            }
            break;
    }
}

// 🌟 COSMIC FOCUS MANAGEMENT
function setupCosmicFocusManagement() {
    // Enhance focus indicators with cosmic energy
    const focusableElements = document.querySelectorAll(
        'button, a, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            currentFocusElement = this;
            this.classList.add('cosmic-focus-active');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('cosmic-focus-active');
        });
    });
}

// 🌙 RESPECT MOTION PREFERENCES
function respectCosmicMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleMotionPreference(e) {
        if (e.matches) {
            document.body.classList.add('cosmic-reduced-motion');
            announceToUniverse('🌙 Cosmic energies flowing gently for your comfort');
        } else {
            document.body.classList.remove('cosmic-reduced-motion');
        }
    }
    
    prefersReducedMotion.addListener(handleMotionPreference);
    handleMotionPreference(prefersReducedMotion);
}

// 🔊 COSMIC ANNOUNCEMENTS SYSTEM
function setupCosmicAnnouncements() {
    // Create a queue for cosmic announcements
    window.cosmicAnnouncementQueue = [];
    window.isAnnouncing = false;
}

function announceToUniverse(message, priority = 'polite') {
    // Add cosmic flair to announcements
    const cosmicMessage = message;
    
    // Update the live region
    if (cosmicAnnouncements) {
        cosmicAnnouncements.setAttribute('aria-live', priority);
        cosmicAnnouncements.textContent = cosmicMessage;
        
        // Brief visual indication for sighted users
        cosmicAnnouncements.classList.add('cosmic-announce');
        setTimeout(() => {
            cosmicAnnouncements.classList.remove('cosmic-announce');
        }, 500);
    }
    
    console.log('🌟 Cosmic announcement:', cosmicMessage);
}

// 🎨 COSMIC THEME DETECTION
function detectCosmicPreferences() {
    // High contrast mode
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    function handleContrastChange(e) {
        if (e.matches) {
            document.body.classList.add('cosmic-high-contrast');
            announceToUniverse('🌟 High contrast cosmic theme activated');
        } else {
            document.body.classList.remove('cosmic-high-contrast');
        }
    }
    prefersHighContrast.addListener(handleContrastChange);
    handleContrastChange(prefersHighContrast);
    
    // Dark mode preference (though our app is already cosmic dark)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('🌙 User prefers cosmic darkness:', prefersDark.matches);
}

// Load messages from JSON file
async function loadMessages() {
    try {
        const response = await fetch('messages.json');
        const data = await response.json();
        messages = data.messages;
        announceToUniverse(`🌟 ${messages.length} cosmic messages loaded and ready`);
        console.log(`Loaded ${messages.length} messages`);
    } catch (error) {
        console.error('Error loading messages:', error);
        messages = ["Trust that everything is unfolding as it should."]; // fallback
        announceToUniverse('🌙 Backup cosmic wisdom available');
    }
}

// Initialize app functionality
function initializeApp() {
    askButton.addEventListener('click', handleAskUniverse);
    askAgainButton.addEventListener('click', resetToFocus);
    shareButton.addEventListener('click', generateAndDownloadImage);
    
    // Start focus sequence when page loads
    startFocusSequence();
    
    // Announce app ready state
    setTimeout(() => {
        announceToUniverse('🌟 Aakashwaani cosmic guidance portal is ready. Focus your mind and ask your question.');
    }, 1000);
}

// 🌟 ENHANCED FOCUS SEQUENCE
function startFocusSequence() {
    askButton.disabled = true;
    askButton.setAttribute('aria-busy', 'true');
    askButton.setAttribute('aria-label', 'Ask the Universe for cosmic guidance - Preparing cosmic connection');
    
    timerFill.classList.remove('active');
    timerStatus.textContent = 'Preparing cosmic connection...';
    focusTimer.setAttribute('aria-valuenow', '0');
    
    announceToUniverse('🔮 Cosmic preparation beginning... Focus your mind on your question');
    
    // Small delay for visual effect
    setTimeout(() => {
        timerFill.classList.add('active');
        
        // Update timer progress for screen readers
        let progress = 0;
        const timerInterval = setInterval(() => {
            progress += 3.33; // Update every 100ms for 3 seconds
            focusTimer.setAttribute('aria-valuenow', Math.min(progress, 100));
            
            if (progress >= 50 && timerStatus.textContent !== 'Cosmic energies aligning...') {
                timerStatus.textContent = 'Cosmic energies aligning...';
            }
            
            if (progress >= 100) {
                clearInterval(timerInterval);
                timerStatus.textContent = 'Cosmic connection established!';
            }
        }, 100);
        
        // Enable button after focus time
        setTimeout(() => {
            askButton.disabled = false;
            askButton.removeAttribute('aria-busy');
            askButton.setAttribute('aria-label', 'Ask the Universe for cosmic guidance - Ready to receive your message');
            
            // Cosmic ready effect
            askButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                askButton.style.transform = 'scale(1)';
            }, 200);
            
            // Focus the button for keyboard users
            askButton.focus();
            
            announceToUniverse('✨ Cosmic portal is ready! Click or press Enter to receive your message');
        }, 3000);
    }, 500);
}

// 🌟 ENHANCED ASK UNIVERSE HANDLER
async function handleAskUniverse() {
    if (askButton.disabled) return;
    
    // Track cosmic interaction
    trackCosmicInteraction('ask_universe', 'cosmic_button');
    
    // Cosmic button click effect
    askButton.style.transform = 'scale(0.95)';
    askButton.setAttribute('aria-busy', 'true');
    askButton.setAttribute('aria-label', 'Receiving cosmic message...');
    
    announceToUniverse('🌌 Channeling cosmic wisdom...', 'assertive');
    
    setTimeout(() => {
        askButton.style.transform = 'scale(1)';
    }, 150);
    
    // Get and display message
    const message = await getRandomMessage();
    displayMessage(message);
}

async function getRandomMessage() {
    // Use crypto.getRandomValues for better randomness if available
    if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        const randomIndex = array[0] % messages.length;
        return messages[randomIndex];
    } else {
        // Fallback to Math.random
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
}

// ✨ ENHANCED MESSAGE DISPLAY
function displayMessage(message) {
    messageText.textContent = message;
    
    // Transition to message state
    focusState.classList.add('hidden');
    messageState.classList.remove('hidden');
    
    // Focus management - move to message container
    const messageContainer = messageState.querySelector('.message-container');
    messageContainer.focus();
    
    // Trigger entrance animation
    setTimeout(() => {
        messageState.classList.add('show');
        
        // Announce the message with cosmic flair
        announceToUniverse(`✨ The Universe speaks: ${message}`, 'assertive');
    }, 50);
    
    // Add some cosmic sparkles effect
    createSparkles();
    
    // Show share button after a delay
    setTimeout(() => {
        shareButton.classList.remove('hidden');
        setTimeout(() => {
            shareButton.classList.add('show');
            announceToUniverse('🌟 Cosmic image download now available');
        }, 100);
    }, 2000);
}

// ✨ ENHANCED SPARKLES WITH ACCESSIBILITY
function createSparkles() {
    const container = messageState;
    const sparkleCount = 12;
    
    // Announce sparkle effect for screen readers
    announceToUniverse('✨ Cosmic sparkles dancing around your message');
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.opacity = '0';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkle 2s ease-out forwards';
            sparkle.setAttribute('aria-hidden', 'true'); // Hide from screen readers
            
            container.appendChild(sparkle);
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 150);
    }
}

// 🔄 ENHANCED RESET TO FOCUS
function resetToFocus() {
    // Track cosmic interaction
    trackCosmicInteraction('ask_again', 'repeat_button');
    
    // Hide message state and share button
    messageState.classList.remove('show');
    shareButton.classList.remove('show');
    
    announceToUniverse('🌙 Returning to cosmic meditation space...');
    
    setTimeout(() => {
        messageState.classList.add('hidden');
        shareButton.classList.add('hidden');
        focusState.classList.remove('hidden');
        
        // Focus management
        askButton.focus();
        
        // Restart focus sequence
        startFocusSequence();
    }, 300);
}

// 📱 ENHANCED SHARE FUNCTIONALITY
function generateAndDownloadImage() {
    // Track cosmic interaction
    trackCosmicInteraction('share_cosmic', 'download_button');
    
    announceToUniverse('🎨 Creating your cosmic image...', 'assertive');
    
    const canvas = shareCanvas;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (Instagram square format)
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Create cosmic gradient background
    const gradient = ctx.createRadialGradient(540, 540, 0, 540, 540, 540);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f0f23');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);
    
    // Add stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 1080;
        const y = Math.random() * 1080;
        const radius = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // App logo
    const img = new Image();
    img.onload = function() {
        // Calculate logo size (maintain aspect ratio)
        const logoHeight = 80;
        const logoWidth = (img.width / img.height) * logoHeight;
        
        // Center the logo
        const logoX = (1080 - logoWidth) / 2;
        const logoY = 80;
        
        ctx.drawImage(img, logoX, logoY, logoWidth, logoHeight);
        
        // Continue with the rest after logo loads
        generateRestOfCosmicImage();
    };
    
    img.onerror = function() {
        // If logo fails to load, continue without it
        announceToUniverse('🌟 Creating cosmic image without logo...');
        generateRestOfCosmicImage();
    };
    
    img.src = 'images/aakashwaani_logo.png';
}

function generateRestOfCosmicImage() {
    const canvas = shareCanvas;
    const ctx = canvas.getContext('2d');
    
    try {
        // Message text
        ctx.fillStyle = '#f0f0f0';
        ctx.font = '36px serif';
        ctx.textAlign = 'center';
        
        const message = messageText.textContent;
        const words = message.split(' ');
        const maxWidth = 900;
        let line = '';
        let y = 450;
        
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, 540, y);
                line = words[i] + ' ';
                y += 60;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 540, y);
        
        // Signature
        ctx.fillStyle = '#ffd700';
        ctx.font = 'italic 32px serif';
        ctx.fillText('— The Universe', 540, y + 100);
        
        // Website URL (moved lower and greyed out)
        ctx.fillStyle = '#888888';
        ctx.font = '24px sans-serif';
        ctx.fillText('🌟 Get your message: ' + window.location.href, 540, 1020);
        
        // Download with timestamp filename
        canvas.toBlob(function(blob) {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                
                // Generate timestamp filename
                const now = new Date();
                const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
                a.download = `aakashwaani_cosmic_message_${timestamp}.png`;
                
                // Announce download
                announceToUniverse('✨ Your cosmic image has been downloaded!', 'assertive');
                
                // Trigger download
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showCosmicSuccessMessage('Cosmic image downloaded! ✨');
            } else {
                announceToUniverse('🌙 Unable to create cosmic image. Please try again.', 'assertive');
                showCosmicErrorMessage('Unable to create cosmic image');
            }
        }, 'image/png');
        
    } catch (error) {
        console.error('Error generating cosmic image:', error);
        announceToUniverse('🌙 Cosmic image creation encountered an error', 'assertive');
        showCosmicErrorMessage('Error creating cosmic image');
    }
}

// 🌟 COSMIC SUCCESS MESSAGE
function showCosmicSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message cosmic-success';
    successDiv.textContent = message;
    successDiv.setAttribute('role', 'status');
    successDiv.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(successDiv);
    
    // Focus management for screen readers
    successDiv.tabIndex = 0;
    successDiv.focus();
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 4000);
}

// 🌙 COSMIC ERROR MESSAGE
function showCosmicErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'cosmic-error';
    errorDiv.textContent = `🌙 ${message}. The cosmic energies may be misaligned. Please try again.`;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'assertive');
    
    // Insert into message area
    const messageContainer = messageState.querySelector('.message-container');
    messageContainer.appendChild(errorDiv);
    
    // Focus for accessibility
    errorDiv.tabIndex = 0;
    errorDiv.focus();
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// 🌟 COSMIC ANALYTICS (Privacy-respecting)
function trackCosmicInteraction(action, element) {
    // Only log for debugging, respect user privacy
    console.log(`🌟 Cosmic interaction: ${action} on ${element}`);
    
    // You could add privacy-respecting analytics here
    // Never track personal information or message content
}

// 🌟 COSMIC ERROR HANDLING
window.addEventListener('error', function(event) {
    console.error('Cosmic disturbance detected:', event.error);
    announceToUniverse('🌙 A cosmic disturbance occurred. The universe is realigning...', 'assertive');
});

// 🔮 COSMIC PERFORMANCE MONITORING
function monitorCosmicPerformance() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 100) { // Long tasks
                    console.log('🌟 Cosmic processing delay detected:', entry.duration + 'ms');
                }
            }
        });
        
        try {
            observer.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // Fallback if longtask is not supported
            console.log('🌙 Cosmic performance monitoring not available');
        }
    }
}

// 🌙 COSMIC CLEANUP
window.addEventListener('beforeunload', function() {
    // Clean up any cosmic timers or listeners
    if (cosmicAnnouncementTimer) {
        clearTimeout(cosmicAnnouncementTimer);
    }
    
    console.log('🌟 Cosmic connection closing gracefully...');
});

// 🔮 INITIALIZE COSMIC ENHANCEMENTS
document.addEventListener('DOMContentLoaded', function() {
    monitorCosmicPerformance();
    
    // Add cosmic interaction tracking to buttons (after DOM is ready)
    setTimeout(() => {
        if (askButton) askButton.addEventListener('click', () => trackCosmicInteraction('ask_universe', 'cosmic_button'));
        if (askAgainButton) askAgainButton.addEventListener('click', () => trackCosmicInteraction('ask_again', 'repeat_button'));
        if (shareButton) shareButton.addEventListener('click', () => trackCosmicInteraction('share_cosmic', 'download_button'));
    }, 100);
});

// 🌟 COSMIC DEBUGGING HELPERS
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Debug functions for development
    window.cosmicDebug = {
        announceTest: (msg) => announceToUniverse(`🔮 Debug: ${msg}`),
        simulateSlowConnection: () => {
            announceToUniverse('🌙 Simulating cosmic interference...');
            return new Promise(resolve => setTimeout(resolve, 2000));
        },
        testAccessibility: () => {
            console.log('🌟 Running cosmic accessibility tests...');
            const issues = [];
            
            // Check for missing alt text
            const images = document.querySelectorAll('img:not([alt])');
            if (images.length > 0) issues.push(`${images.length} images missing alt text`);
            
            // Check for missing labels
            const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
            if (buttons.length > 0) issues.push(`${buttons.length} buttons missing labels`);
            
            if (issues.length === 0) {
                console.log('✨ Cosmic accessibility check passed!');
            } else {
                console.warn('🌙 Cosmic accessibility issues:', issues);
            }
            
            return issues;
        }
    };
}

// Debug function to check message variety (enhanced)
function checkCosmicMessageStats() {
    console.log(`🌟 Total cosmic messages: ${messages.length}`);
    console.log('🔮 Sample cosmic wisdom:', messages[Math.floor(Math.random() * messages.length)]);
    announceToUniverse(`📊 ${messages.length} pieces of cosmic wisdom available`);
}

// Add sparkle animation to CSS dynamically (keeping original functionality)
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);
