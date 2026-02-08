// Main Application Initialization

/**
 * Initialize the entire dashboard application
 */
function initializeApp() {
    console.log('🌱 Initializing EKOTEK Dashboard...');
    
    // Show loading screen
    showLoadingScreen();
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startApplication);
    } else {
        startApplication();
    }
}

/**
 * Start the application after DOM is ready
 */
function startApplication() {
    // Initialize all modules in sequence
    setTimeout(() => {
        try {
            // 1. Initialize UI components
            initializeSidebar();
            initializeTopNav();
            
            // 2. Initialize KPI cards
            if (window.KPIModule) {
                window.KPIModule.initializeKPICards();
                window.KPIModule.initializeKPICardInteractions();
            }
            
            // 3. Initialize charts
            if (window.ChartsModule) {
                window.ChartsModule.initializeCharts();
            }
            
            // 4. Initialize filters
            if (window.FiltersModule) {
                window.FiltersModule.initializeFilters();
            }
            
            // 5. Initialize data table
            if (window.TableModule) {
                window.TableModule.initializeTable();
            }
            
            // 6. Initialize responsive features
            initializeResponsive();
            
            // 7. Initialize accessibility features
            initializeAccessibility();
            
            console.log('✅ EKOTEK Dashboard initialized successfully');
            
            // Hide loading screen with animation
            setTimeout(() => {
                hideLoadingScreen();
            }, 500);
            
        } catch (error) {
            console.error('❌ Error initializing dashboard:', error);
            hideLoadingScreen();
            showErrorMessage('Failed to initialize dashboard. Please refresh the page.');
        }
    }, 300);
}

/**
 * Show loading screen
 */
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

/**
 * Hide loading screen
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}

/**
 * Initialize sidebar functionality
 */
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            
            // Add overlay for mobile
            if (window.innerWidth <= 768) {
                toggleOverlay();
            }
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                removeOverlay();
            }
        }
    });
}

/**
 * Initialize top navigation functionality
 */
function initializeTopNav() {
    // Notifications button
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            console.log('Notifications clicked');
            // In a real app, this would show a notifications dropdown
        });
    }
    
    // Help button
    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            console.log('Help clicked');
            // In a real app, this would show help documentation
        });
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            console.log('Settings clicked');
            // In a real app, this would open settings panel
        });
    }
    
    // User menu
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', () => {
            console.log('User menu clicked');
            // In a real app, this would show user dropdown menu
        });
    }
}

/**
 * Initialize responsive features
 */
function initializeResponsive() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Redraw charts on resize to maintain responsiveness
            if (window.ChartsModule && window.ChartsModule.charts) {
                Object.values(window.ChartsModule.charts).forEach(chart => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                    }
                });
            }
        }, 250);
    });
    
    // Handle orientation change on mobile devices
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (window.ChartsModule && window.ChartsModule.charts) {
                Object.values(window.ChartsModule.charts).forEach(chart => {
                    if (chart && typeof chart.resize === 'function') {
                        chart.resize();
                    }
                });
            }
        }, 300);
    });
}

/**
 * Initialize accessibility features
 */
function initializeAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary);
        color: white;
        padding: 8px;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page updates to screen readers
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // Store reference for announcements
    window.announceToScreenReader = (message) => {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

/**
 * Toggle overlay for mobile sidebar
 */
function toggleOverlay() {
    let overlay = document.getElementById('sidebar-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1019;
            transition: opacity 0.3s ease;
        `;
        overlay.addEventListener('click', () => {
            document.getElementById('sidebar')?.classList.remove('open');
            removeOverlay();
        });
        document.body.appendChild(overlay);
    }
}

/**
 * Remove overlay
 */
function removeOverlay() {
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        max-width: 400px;
        z-index: 1000;
        animation: slideInUp 0.3s ease;
    `;
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

/**
 * Performance monitoring
 */
function monitorPerformance() {
    // Log performance metrics
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const timing = performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
                const firstPaint = performance.getEntriesByType('paint')[0]?.startTime || 0;
                
                console.log('📊 Performance Metrics:');
                console.log(`  - Page Load Time: ${loadTime}ms`);
                console.log(`  - DOM Ready Time: ${domReadyTime}ms`);
                console.log(`  - First Paint: ${firstPaint.toFixed(0)}ms`);
                
                // Warn if performance is slow
                if (loadTime > 3000) {
                    console.warn('⚠️ Slow page load detected. Consider optimization.');
                }
            }, 0);
        });
    }
}

/**
 * Handle keyboard shortcuts
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('tableSearch')?.focus();
        }
        
        // Ctrl/Cmd + /: Show keyboard shortcuts help (placeholder)
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            console.log('Keyboard shortcuts help');
            // In a real app, this would show a modal with shortcuts
        }
        
        // Escape: Close sidebar on mobile
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            if (sidebar?.classList.contains('open')) {
                sidebar.classList.remove('open');
                removeOverlay();
            }
        }
    });
}

/**
 * Initialize browser compatibility checks
 */
function checkBrowserCompatibility() {
    // Check for required features
    const requiredFeatures = [
        'fetch',
        'Promise',
        'requestAnimationFrame',
        'localStorage'
    ];
    
    const missingFeatures = requiredFeatures.filter(feature => !(feature in window));
    
    if (missingFeatures.length > 0) {
        console.warn('⚠️ Missing browser features:', missingFeatures);
        showErrorMessage('Your browser may not support all features. Please update to a modern browser.');
    }
}

// Initialize everything when script loads
checkBrowserCompatibility();
monitorPerformance();
initializeKeyboardShortcuts();
initializeApp();

// Expose utility functions globally
window.EkotekDashboard = {
    initializeApp,
    showErrorMessage,
    announceToScreenReader: () => {} // Will be replaced after initialization
};

// Handle page visibility changes (pause animations when hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Dashboard hidden - pausing updates');
    } else {
        console.log('Dashboard visible - resuming updates');
    }
});

// Log application readiness
console.log('🚀 EKOTEK Dashboard v1.0.0 - Ready');
