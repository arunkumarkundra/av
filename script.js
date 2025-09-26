// Global variables
let messages = [];
let usedMessages = [];
let messageTemplates = [];

// DOM elements
const focusState = document.getElementById('focusState');
const messageState = document.getElementById('messageState');
const askButton = document.getElementById('askButton');
const askAgainButton = document.getElementById('askAgainButton');
const messageText = document.getElementById('messageText');
const focusTimer = document.getElementById('focusTimer');
const timerFill = focusTimer.querySelector('.timer-fill');

// Message template system for dynamic generation
const templateParts = {
    celestialBodies: ['moon', 'stars', 'sun', 'cosmos', 'universe', 'celestial winds', 'ancient light'],
    timeFrames: ['soon', 'in the coming days', 'when you least expect it', 'before the month ends', 'in divine timing'],
    actions: ['trust', 'embrace', 'release', 'honor', 'follow', 'welcome', 'surrender to'],
    emotions: ['intuition', 'heart', 'inner wisdom', 'deepest knowing', 'soul\'s calling', 'authentic self'],
    lifeAreas: ['path', 'journey', 'relationships', 'career', 'growth', 'healing', 'purpose'],
    guidanceVerbs: ['listen to', 'pay attention to', 'notice', 'be aware of', 'watch for'],
    symbolicObjects: ['butterfly', 'feather', 'rainbow', 'unexpected message', 'synchronicity', 'open door'],
    mysticalPhrases: [
        'The {celestialBodies} whisper: {actions} your {emotions} about {lifeAreas}',
        'In {timeFrames}, {guidanceVerbs} the {symbolicObjects} that appears',
        'Your soul knows the answer - {actions} what feels true',
        'The path you seek is already beneath your feet',
        'What you resist holds the key to what you seek',
        '{timeFrames}, a shift in {lifeAreas} brings clarity',
        'The {celestialBodies} align to support your {emotions}',
        'Trust the process, even when you cannot see the destination'
    ]
};

// Premium hand-crafted messages (300 examples - showing first 50 here)
const premiumMessages = [
    "Your next chapter begins with a single brave choice.",
    "The answer you seek is hidden in what you already know.",
    "Trust the timing of your life, even when it feels uncertain.",
    "Your intuition is speaking louder than your fears today.",
    "The universe is conspiring in your favor, be patient.",
    "What feels like an ending is actually a beautiful beginning.",
    "Your heart knows the way, even when your mind is confused.",
    "The person you're becoming is worth the struggle you're enduring.",
    "Release what no longer serves you to make room for what will.",
    "Your sensitivity is your superpower, not your weakness.",
    "The path of least resistance isn't always the path of growth.",
    "You're exactly where you need to be for your next breakthrough.",
    "Your past doesn't define you, your choices from this moment do.",
    "The universe speaks through your joy - follow what lights you up.",
    "Trust that you have everything within you to handle what comes.",
    "Your dreams are calling you forward, don't let fear hold you back.",
    "Sometimes the most profound growth happens in the quietest moments.",
    "The right people will find you when you're being authentically you.",
    "Your wounds can become your wisdom if you let them.",
    "The detour you didn't plan might be the miracle you needed.",
    "You're being prepared for something you've been preparing for.",
    "Your current struggles are developing your future strengths.",
    "The universe has perfect timing, even when yours feels off.",
    "What you think is your weakness might be your greatest gift.",
    "You don't need to have it all figured out to take the next step.",
    "Your soul chose this journey for the growth it would bring.",
    "The love you seek is seeking you with equal intensity.",
    "Trust the magic of new beginnings, even when they're disguised as endings.",
    "Your unique perspective is exactly what the world needs right now.",
    "The doors that close are making way for the ones meant to open.",
    "You're not behind in life, you're exactly on your soul's schedule.",
    "Your compassion for others starts with compassion for yourself.",
    "The universe is teaching you to trust your own inner compass.",
    "What challenges you is also what's meant to strengthen you.",
    "Your authenticity is your access to everything meant for you.",
    "The relationship with yourself sets the tone for all others.",
    "Trust that what's meant for you will never pass you by.",
    "Your sensitivity allows you to experience life's full spectrum.",
    "The courage you need is already within you, waiting to be activated.",
    "You're not meant to dim your light to make others comfortable.",
    "The universe rewards those who honor their true nature.",
    "Your story isn't over, you're just turning to a new page.",
    "What feels impossible today might be your reality tomorrow.",
    "Your inner wisdom is more reliable than external opinions.",
    "The love you give to yourself sets the standard for how others treat you.",
    "Trust that challenges are just opportunities wearing work clothes.",
    "Your presence alone can be the healing someone else needs.",
    "The universe is always supporting your highest good, even in difficult times.",
    "You're not meant to figure it all out, just trust the next step.",
    "Your vulnerability is not a flaw, it's your connection to others."
];

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    await loadMessages();
    initializeApp();
});

// Load messages from JSON file
async function loadMessages() {
    try {
        const response = await fetch('messages.json');
        const data = await response.json();
        messages = [...premiumMessages, ...data.messages];
        console.log(`Loaded ${messages.length} premium messages`);
    } catch (error) {
        console.log('Using premium messages only');
        messages = [...premiumMessages];
    }
    
    // Load used messages from localStorage
    const stored = localStorage.getItem('usedMessages');
    if (stored) {
        usedMessages = JSON.parse(stored);
        // Reset if we've used too many messages
        if (usedMessages.length > messages.length * 0.8) {
            usedMessages = [];
            localStorage.removeItem('usedMessages');
        }
    }
}

// Initialize app functionality
function initializeApp() {
    askButton.addEventListener('click', handleAskUniverse);
    askAgainButton.addEventListener('click', resetToFocus);
    
    // Start focus sequence when page loads
    startFocusSequence();
}

// Start the focus sequence
function startFocusSequence() {
    askButton.disabled = true;
    timerFill.classList.remove('active');
    
    // Small delay for visual effect
    setTimeout(() => {
        timerFill.classList.add('active');
        
        // Enable button after focus time
        setTimeout(() => {
            askButton.disabled = false;
            askButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                askButton.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }, 500);
}

// Handle ask universe button click
async function handleAskUniverse() {
    if (askButton.disabled) return;
    
    // Button click effect
    askButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        askButton.style.transform = 'scale(1)';
    }, 150);
    
    // Get and display message
    const message = await getRandomMessage();
    displayMessage(message);
}

// Get a random message (premium or generated)
async function getRandomMessage() {
    // 70% chance for premium messages, 30% for generated
    const useGeneratedMessage = Math.random() < 0.3 || getAvailablePremiumMessages().length === 0;
    
    if (useGeneratedMessage) {
        return generateDynamicMessage();
    } else {
        return getAvailablePremiumMessage();
    }
}

// Get available premium messages (not recently used)
function getAvailablePremiumMessages() {
    return messages.filter(msg => !usedMessages.includes(msg));
}

// Get a premium message that hasn't been used recently
function getAvailablePremiumMessage() {
    const availableMessages = getAvailablePremiumMessages();
    
    if (availableMessages.length === 0) {
        // Reset used messages if we've used them all
        usedMessages = [];
        localStorage.removeItem('usedMessages');
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    const selectedMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    
    // Mark as used
    usedMessages.push(selectedMessage);
    localStorage.setItem('usedMessages', JSON.stringify(usedMessages));
    
    return selectedMessage;
}

// Generate dynamic message using templates
function generateDynamicMessage() {
    const templates = templateParts.mysticalPhrases;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Replace placeholders with random parts
    let message = template;
    
    // Replace each placeholder
    Object.keys(templateParts).forEach(category => {
        if (category !== 'mysticalPhrases') {
            const placeholder = `{${category}}`;
            if (message.includes(placeholder)) {
                const parts = templateParts[category];
                const randomPart = parts[Math.floor(Math.random() * parts.length)];
                message = message.replace(placeholder, randomPart);
            }
        }
    });
    
    return message;
}

// Display the message with animation
function displayMessage(message) {
    messageText.textContent = message;
    
    // Transition to message state
    focusState.classList.add('hidden');
    messageState.classList.remove('hidden');
    
    // Trigger entrance animation
    setTimeout(() => {
        messageState.classList.add('show');
    }, 50);
    
    // Add some cosmic sparkles effect
    createSparkles();
}

// Create sparkle effect when message appears
function createSparkles() {
    const container = messageState;
    const sparkleCount = 12;
    
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

// Add sparkle animation to CSS dynamically
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

// Reset to focus state
function resetToFocus() {
    // Hide message state
    messageState.classList.remove('show');
    
    setTimeout(() => {
        messageState.classList.add('hidden');
        focusState.classList.remove('hidden');
        
        // Restart focus sequence
        startFocusSequence();
    }, 300);
}

// Add some ambient cosmic sounds effect (optional - commented out)
/*
function playCosmicSound() {
    // Create a subtle cosmic tone
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
}
*/

// Debug function to check message variety
function checkMessageStats() {
    console.log(`Total messages: ${messages.length}`);
    console.log(`Used messages: ${usedMessages.length}`);
    console.log(`Available premium: ${getAvailablePremiumMessages().length}`);
    console.log('Sample generated message:', generateDynamicMessage());
}
