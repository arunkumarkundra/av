// Global variables
let messages = [];


// DOM elements
const focusState = document.getElementById('focusState');
const messageState = document.getElementById('messageState');
const askButton = document.getElementById('askButton');
const askAgainButton = document.getElementById('askAgainButton');
const messageText = document.getElementById('messageText');
const focusTimer = document.getElementById('focusTimer');
const timerFill = focusTimer.querySelector('.timer-fill');
const shareButton = document.getElementById('shareButton');
const shareCanvas = document.getElementById('shareCanvas');

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
        messages = data.messages;
        console.log(`Loaded ${messages.length} messages`);
    } catch (error) {
        console.error('Error loading messages:', error);
        messages = ["Trust that everything is unfolding as it should."]; // fallback
    }
}

// Initialize app functionality
function initializeApp() {
    askButton.addEventListener('click', handleAskUniverse);
    askAgainButton.addEventListener('click', resetToFocus);
    shareButton.addEventListener('click', generateAndDownloadImage);
    
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
    
    // Show share button after a delay
    setTimeout(() => {
        const shareButton = document.getElementById('shareButton');
        shareButton.classList.remove('hidden');
        setTimeout(() => {
            shareButton.classList.add('show');
        }, 100);
    }, 2000);
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
    // Hide message state and share button
    messageState.classList.remove('show');
    shareButton.classList.remove('show');
    
    setTimeout(() => {
        messageState.classList.add('hidden');
        shareButton.classList.add('hidden');
        focusState.classList.remove('hidden');
        
        // Restart focus sequence
        startFocusSequence();
    }, 300);
}

// Share functionality

function generateAndDownloadImage() {
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
        generateRestOfImage();
    };
    img.src = 'images/aakashwaani_logo.png';
}

function generateRestOfImage() {
    const canvas = shareCanvas;
    const ctx = canvas.getContext('2d');
    
    // Message text
    ctx.fillStyle = '#f0f0f0';
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    
    const message = messageText.textContent;
    const words = message.split(' ');
    const maxWidth = 900;
    let line = '';
    let y = 400;
    
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
    ctx.fillText('🌟 Get your message: ' + window.location.host, 540, 1020);
    
    // Download with timestamp filename
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Generate timestamp filename
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
        a.download = `aakashwaani_${timestamp}.png`;
        
        a.click();
        URL.revokeObjectURL(url);
        
        showSuccessMessage('Cosmic image downloaded! ✨');
    });
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
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
}
