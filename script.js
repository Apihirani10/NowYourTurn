// script.js - All JavaScript with 3D and Animations

// ========== LOADING SCREEN ==========
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);
});

// ========== PROGRESS BAR ==========
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ========== MOBILE MENU ==========
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

function openMobileMenu() {
    if (mobileMenu) mobileMenu.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.card-reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ========== STATS COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target + (el.getAttribute('data-target') === '32' ? 'B' : '');
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current) + (el.getAttribute('data-target') === '32' ? 'B' : '');
                }
            }, 30);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ========== CREATORS DATA ==========
const creators = [
    { rank: 1, name: "Cristiano Ronaldo", username: "@cristiano", followers: "620M", score: 100, category: "Instagram", country: "Portugal", avatar: "CR", color: "from-yellow-400 to-pink-500" },
    { rank: 2, name: "Virat Kohli", username: "@virat.kohli", followers: "265M", score: 99.8, category: "Cricket", country: "India", avatar: "VK", color: "from-green-500 to-yellow-500" },
    { rank: 3, name: "MrBeast", username: "@mrbeast", followers: "300M+", score: 100, category: "YouTube", country: "USA", avatar: "MB", color: "from-red-600 to-red-800" }
];

// ========== RENDER CREATORS ==========
function renderCreators() {
    const grid = document.getElementById('creatorsGrid');
    if (!grid) return;
    
    grid.innerHTML = creators.map(creator => `
        <div class="creator-card">
            <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center text-white font-bold text-lg">
                    ${creator.avatar}
                </div>
                <div>
                    <h3 class="font-bold text-lg">${creator.name}</h3>
                    <p class="text-white/50 text-xs">${creator.username}</p>
                </div>
                <div class="ml-auto text-right">
                    <span class="gradient-text-3d font-bold">${creator.score}</span>
                    <div class="text-[10px] text-white/50">Score</div>
                </div>
            </div>
            <div class="flex justify-between text-xs mb-2">
                <span><i class="fas fa-users"></i> ${creator.followers}</span>
                <span><i class="fas fa-map-marker-alt"></i> ${creator.country}</span>
            </div>
            <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r from-[#ff7cf5] to-[#00d2fd]" style="width: ${creator.score}%"></div>
            </div>
            <div class="mt-2">
                <span class="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">${creator.category}</span>
            </div>
        </div>
    `).join('');
}

renderCreators();

// ========== 3D BACKGROUND USING THREE.JS ==========
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

function init3DBackground() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i+1] = (Math.random() - 0.5) * 100;
        posArray[i+2] = (Math.random() - 0.5) * 100 - 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xff7cf5,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create a torus knot (3D shape)
    const geometry = new THREE.TorusKnotGeometry(3, 0.8, 200, 32, 3, 4);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff7cf5,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    camera.position.z = 30;
    
    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.005;
        
        particlesMesh.rotation.y = time * 0.1;
        particlesMesh.rotation.x = time * 0.05;
        
        torusKnot.rotation.x = time * 0.2;
        torusKnot.rotation.y = time * 0.3;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Wait for page load to initialize 3D
window.addEventListener('load', () => {
    setTimeout(init3DBackground, 100);
});

// ========== CREATE FLOATING PARTICLES ==========
function createFloatingParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: radial-gradient(circle, ${Math.random() > 0.5 ? '#ff7cf5' : '#00d2fd'}, transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 8 + 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        container.appendChild(particle);
    }
}

// Add particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

window.addEventListener('load', createFloatingParticles);

// ========== SCROLL TO CATEGORIES ==========
window.scrollToCategories = function() {
    const categoriesSection = document.getElementById('categoriesSection');
    if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// ========== SCROLL TOP BUTTON ==========
const scrollTopBtn = document.createElement('div');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up text-white"></i>';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ========== CATEGORY CARD CLICK ==========
const categoryCards = document.querySelectorAll('.category-card');
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        if (category) {
            alert(`Showing ${category} rankings - Coming Soon!`);
        }
    });
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            closeMobileMenu();
        }
    });
});

// ========== GSAP ANIMATIONS (if GSAP loaded) ==========
setTimeout(() => {
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
        gsap.from('.hero p', { opacity: 0, y: 30, duration: 1, delay: 0.8 });
        gsap.from('.neon-btn', { opacity: 0, scale: 0.8, duration: 0.8, delay: 1.1, stagger: 0.2 });
        gsap.from('.stat-card', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: '.stats-container', start: 'top 80%' } });
        gsap.from('.category-card', { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '#categoriesSection', start: 'top 80%' } });
    }
}, 100);
