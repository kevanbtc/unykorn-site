// Enhanced metrics update with animations
function updateMetrics() {
    const metrics = {
        totalSupply: '1,250,000 XAUFTH',
        tvl: '$2,500,000',
        activeVaults: '1,247',
        bridgeVolume: '$1,750,000',
        redemptionRate: '98.5%',
        uptime: '99.9%'
    };

    Object.keys(metrics).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            animateValue(element, element.textContent, metrics[key]);
        }
    });
}

// Animate value changes with smooth transitions
function animateValue(element, fromValue, toValue) {
    element.style.opacity = '0.5';
    element.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        element.textContent = toValue;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        element.style.transition = 'all 0.3s ease';
    }, 150);
}

// Enhanced real-time updates with visual feedback
function simulateUpdates() {
    setInterval(() => {
        // Random small changes for demo purposes with visual feedback
        const elements = ['totalSupply', 'tvl', 'activeVaults'];
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        const element = document.getElementById(randomElement);
        
        if (element) {
            const current = parseFloat(element.textContent.replace(/[^0-9.]/g, ''));
            const change = (Math.random() - 0.5) * 1000;
            const newValue = Math.max(0, current + change);
            
            if (randomElement === 'totalSupply') {
                element.textContent = newValue.toLocaleString() + ' XAUFTH';
            } else if (randomElement === 'tvl') {
                element.textContent = '$' + newValue.toLocaleString();
            } else {
                element.textContent = Math.floor(newValue).toLocaleString();
            }
            
            // Add flash effect
            element.style.background = 'rgba(52, 152, 219, 0.2)';
            setTimeout(() => {
                element.style.background = '';
            }, 500);
        }
    }, 8000);
}

// Enhanced smooth scrolling for navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add highlight effect to target section
                targetSection.style.transform = 'scale(1.01)';
                targetSection.style.boxShadow = '0 8px 30px rgba(52, 152, 219, 0.3)';
                
                setTimeout(() => {
                    targetSection.style.transform = '';
                    targetSection.style.boxShadow = '';
                }, 1000);
            }
        });
    });
}

// Enhanced scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Enhanced navigation highlighting
function initNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Add active navigation styling
function addActiveNavStyles() {
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background: rgba(255, 255, 255, 0.2);
            color: #fff !important;
        }
        
        nav a.active::after {
            width: 80%;
        }
    `;
    document.head.appendChild(style);
}

// SHA-256 verification function
async function verify(fileUrl, expectedSha256) {
    try {
        const response = await fetch(fileUrl);
        const buf = await response.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buf);
        const hash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, "0")).join("");
        return hash === expectedSha256;
    } catch (error) {
        console.error("Verification failed:", error);
        return false;
    }
}

// Integrity badge function
async function updateIntegrityBadge(pdfUrl, manifestUrl) {
    try {
        const manifestResponse = await fetch(manifestUrl);
        const manifest = await manifestResponse.json();
        const isVerified = await verify(pdfUrl, manifest.sha256);
        const badge = document.getElementById("dd-badge");
        if (badge) {
            badge.textContent = isVerified ? "Verified ✓" : "Unverified";
            badge.style.color = isVerified ? "green" : "red";
            badge.style.fontWeight = "bold";
        }
    } catch (error) {
        console.error("Badge update failed:", error);
        const badge = document.getElementById("dd-badge");
        if (badge) {
            badge.textContent = "Verification Error";
            badge.style.color = "orange";
        }
    }
}

// Load KPIs from evidence pack
async function loadKPIs() {
    try {
        const response = await fetch('/downloads/evidence/evidence_pack.json');
        const ev = await response.json();
        const k = ev.kpis_7d || {};
        const el = id => document.getElementById(id);
        el('kpi-redemptions').textContent = k.redemptions_per_day ?? '—';
        el('kpi-med').textContent = (k.median_latency_hours ?? '—') + 'h';
        el('kpi-p95').textContent = (k.p95_latency_hours ?? '—') + 'h';
        el('kpi-signer').textContent = (k.signer_participation_pct ?? '—') + '%';
        el('kpi-stale').textContent = (k.stale_attestation_pct ?? '—') + '%';
        el('kpi-kdrift').textContent = (k.amm_k_drift_pct ?? '—') + '%';
        el('kpi-ratio').textContent = k.reserve_to_float_ratio ?? '—';
    } catch (error) {
        console.error("Failed to load KPIs:", error);
    }
}

// Enhanced lazy loading for images and content
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src], svg[data-src]');
        const lazyContent = document.querySelectorAll('.lazy-content');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                    element.classList.add('loaded');
                    observer.unobserve(element);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Enhanced error handling and retry logic
function enhancedFetch(url, options = {}) {
    const maxRetries = 3;
    let retries = 0;
    
    const fetchWithRetry = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
            
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response;
        } catch (error) {
            retries++;
            if (retries <= maxRetries && error.name !== 'AbortError') {
                console.log(`Retrying fetch for ${url}, attempt ${retries}`);
                await new Promise(resolve => setTimeout(resolve, 1000 * retries));
                return fetchWithRetry();
            }
            throw error;
        }
    };
    
    return fetchWithRetry();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    updateMetrics();
    simulateUpdates();
    loadKPIs();
    
    // Initialize enhanced features
    initSmoothScrolling();
    initScrollEffects();
    initNavHighlighting();
    addActiveNavStyles();
    initLazyLoading();
    
    // Initialize PWA features
    registerServiceWorker();
    checkForUpdates();
    
    // Update integrity badge for downloads
    updateIntegrityBadge(
        "/downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18.pdf",
        "/downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18_manifest.json"
    );
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Service Worker Registration
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registered successfully:', registration.scope);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    }
}

// Check for app updates
function checkForUpdates() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
}

// Show update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-content">
            <span>A new version is available!</span>
            <button onclick="updateApp()" class="update-btn">Update</button>
            <button onclick="dismissUpdate(this)" class="dismiss-btn">×</button>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Update app
function updateApp() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then(registration => {
            if (registration && registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        });
    }
}

// Dismiss update notification
function dismissUpdate(button) {
    const notification = button.closest('.update-notification');
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Add performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Track Core Web Vitals
            if ('PerformanceObserver' in window) {
                // Largest Contentful Paint
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('LCP:', lastEntry.startTime);
                });
                lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
                
                // First Input Delay
                const fidObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                });
                fidObserver.observe({entryTypes: ['first-input']});
            }
        });
    }
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        '/downloads/evidence/evidence_pack.json',
        '/downloads/audit/Unykorn_XAUFTH_uUSD_Audit_2025-09-18_manifest.json'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize all performance features
trackPerformance();
preloadResources();