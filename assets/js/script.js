'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);
// Add this to your script.js file

// Create light effect element
const lightEffect = document.createElement('div');
lightEffect.className = 'mouse-light';
document.body.appendChild(lightEffect);

// Add necessary CSS
const style = document.createElement('style');
style.textContent = `
  .mouse-light {
    position: fixed;
    width: 300px;
    height: 300px;
    pointer-events: none;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: opacity 0.3s;
  }

  .tilt-element {
    transition: transform 0.3s ease;
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .tilt-element:hover {
    z-index: 1;
  }
`;
document.head.appendChild(style);

// Elements to apply 3D effect
const tiltElements = [
  '.course-card',
  '.category-card',
  '.blog-card',
  '.stats-card',
  '.about-banner',
  '.hero-banner',
  '.video-card'
].join(',');

// Initialize elements for 3D effect
document.querySelectorAll(tiltElements).forEach(element => {
  element.classList.add('tilt-element');
});

// Mouse light effect
let lastScrollY = window.scrollY;
let lightOpacity = 1;

function updateLightPosition(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY + window.scrollY;
  
  lightEffect.style.left = `${mouseX}px`;
  lightEffect.style.top = `${mouseY}px`;
}

// Scroll effect for light
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  const scrollDiff = Math.abs(currentScroll - lastScrollY);
  
  // Adjust light opacity based on scroll speed
  lightOpacity = Math.min(1, scrollDiff / 50);
  lightEffect.style.opacity = lightOpacity;
  
  lastScrollY = currentScroll;
  
  // Reset opacity after scroll
  setTimeout(() => {
    lightEffect.style.opacity = '0.5';
  }, 150);
});

// 3D tilt effect
document.querySelectorAll('.tilt-element').forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  });
  
  // Reset transform on mouse leave
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
  
  // Touch support
  element.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = element.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  });
  
  element.addEventListener('touchend', () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// Mouse move event for light effect
document.addEventListener('mousemove', updateLightPosition);

// Handle touch movement for light effect
document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  updateLightPosition({
    clientX: touch.clientX,
    clientY: touch.clientY
  });
});

// Performance optimization
let ticking = false;

document.addEventListener('mousemove', (e) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateLightPosition(e);
      ticking = false;
    });
    ticking = true;
  }
});
const chatResponses = {
  'hello': 'Hi there! How can I help you today?',
  'hi': 'Hello! What can I assist you with?',
  'help': 'I\'m here to help! What questions do you have?',
  'bye': 'Goodbye! Have a great day!',
  'default': 'I understand your question. Let me help you with that.'
};

const chatButton = document.querySelector('.chat-button');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.querySelector('.close-chat');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');

// Toggle chat window
chatButton.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
  if (chatContainer.style.display === 'flex') {
      messageInput.focus();
  }
});

closeChat.addEventListener('click', () => {
  chatContainer.style.display = 'none';
});

// Send message function
function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  // Add user message
  addMessage(message, 'user-message');
  
  // Clear input
  messageInput.value = '';

  // Simulate bot response
  setTimeout(() => {
      const response = getBotResponse(message.toLowerCase());
      addMessage(response, 'bot-message');
  }, 500);
}

// Add message to chat
function addMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', className);
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
  // Simple response logic
  for (const [key, response] of Object.entries(chatResponses)) {
      if (message.includes(key)) {
          return response;
      }
  }
  return chatResponses.default;
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      sendMessage();
  }
});

// Initial bot message
setTimeout(() => {
  addMessage('Hello! How can I help you today?', 'bot-message');
}, 500);
