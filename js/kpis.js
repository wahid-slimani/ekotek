// KPI Cards Functionality

/**
 * Initialize and animate KPI cards
 */
function initializeKPICards() {
    const kpis = dashboardData.kpis;
    
    // Animate count-up for each KPI
    animateKPIValue('totalWaste', kpis.totalWaste.value);
    animateKPIValue('wasteCost', kpis.wasteCost.value);
    animateKPIValue('recyclingRate', kpis.recyclingRate.value, 1);
    animateKPIValue('wastePerCustomer', kpis.wastePerCustomer.value, 2);
    animateKPIValue('co2Impact', kpis.co2Impact.value);
    animateKPIValue('goalProgress', kpis.goalProgress.value);
    
    // Animate progress bars
    animateProgressBar();
    animateCircularProgress();
    
    // Initialize sparklines
    initializeSparklines();
}

/**
 * Animate KPI number count-up effect
 * @param {string} kpiName - Name of the KPI
 * @param {number} targetValue - Target value to count up to
 * @param {number} decimals - Number of decimal places
 */
function animateKPIValue(kpiName, targetValue, decimals = 0) {
    const element = document.querySelector(`[data-kpi="${kpiName}"] .kpi-number`);
    if (!element) return;
    
    const duration = 1500; // Animation duration in ms
    const startTime = performance.now();
    const startValue = 0;
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (targetValue - startValue) * easeOut;
        
        element.textContent = currentValue.toFixed(decimals);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = targetValue.toFixed(decimals);
        }
    }
    
    requestAnimationFrame(updateValue);
}

/**
 * Animate progress bar
 */
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    const targetWidth = parseFloat(progressFill.dataset.target);
    
    setTimeout(() => {
        progressFill.style.width = `${targetWidth}%`;
    }, 300);
}

/**
 * Animate circular progress indicator
 */
function animateCircularProgress() {
    const circleProgress = document.querySelector('.circle-progress');
    if (!circleProgress) return;
    
    const targetValue = parseFloat(circleProgress.dataset.target);
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = targetValue / 100;
    const dashArray = circumference * progress;
    const dashOffset = circumference - dashArray;
    
    setTimeout(() => {
        circleProgress.setAttribute('stroke-dasharray', `${dashArray}, ${circumference}`);
    }, 300);
}

/**
 * Initialize sparkline charts for KPI cards
 */
function initializeSparklines() {
    const kpis = dashboardData.kpis;
    
    // Total Waste sparkline
    createSparkline('sparkline-totalWaste', kpis.totalWaste.trend, '#10b981');
    
    // Waste Cost sparkline
    createSparkline('sparkline-wasteCost', kpis.wasteCost.trend, '#f59e0b');
    
    // Waste per Customer sparkline
    createSparkline('sparkline-wastePerCustomer', kpis.wastePerCustomer.trend, '#3b82f6');
    
    // CO2 Impact sparkline
    createSparkline('sparkline-co2Impact', kpis.co2Impact.trend, '#6366f1');
}

/**
 * Create a sparkline chart
 * @param {string} canvasId - Canvas element ID
 * @param {Array} data - Data points for the sparkline
 * @param {string} color - Line color
 */
function createSparkline(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => i),
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: `${color}20`,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            interaction: {
                mode: 'nearest',
                intersect: false
            }
        }
    });
}

/**
 * Update KPI cards with filtered data
 * @param {Object} filteredData - Filtered dashboard data
 */
function updateKPICards(filteredData) {
    const kpis = filteredData.kpis;
    
    // Update each KPI value with animation
    Object.keys(kpis).forEach(kpiName => {
        const kpiData = kpis[kpiName];
        const element = document.querySelector(`[data-kpi="${kpiName}"] .kpi-number`);
        
        if (element) {
            const currentValue = parseFloat(element.textContent);
            const targetValue = kpiData.value;
            const decimals = kpiName === 'wastePerCustomer' ? 2 : 
                           kpiName === 'recyclingRate' || kpiName === 'goalProgress' ? 1 : 0;
            
            animateValueTransition(element, currentValue, targetValue, decimals);
        }
    });
    
    // Update progress bars
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${kpis.recyclingRate.value}%`;
    }
    
    const circleProgress = document.querySelector('.circle-progress');
    if (circleProgress) {
        const radius = 45;
        const circumference = 2 * Math.PI * radius;
        const progress = kpis.goalProgress.value / 100;
        const dashArray = circumference * progress;
        circleProgress.setAttribute('stroke-dasharray', `${dashArray}, ${circumference}`);
    }
}

/**
 * Animate transition between two values
 * @param {HTMLElement} element - Element to update
 * @param {number} startValue - Starting value
 * @param {number} endValue - Ending value
 * @param {number} decimals - Number of decimal places
 */
function animateValueTransition(element, startValue, endValue, decimals = 0) {
    const duration = 800;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut;
        
        element.textContent = currentValue.toFixed(decimals);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

/**
 * Add click handlers to KPI cards for drill-down
 */
function initializeKPICardInteractions() {
    const kpiCards = document.querySelectorAll('.kpi-card');
    
    kpiCards.forEach(card => {
        card.addEventListener('click', () => {
            const kpiType = card.dataset.kpi;
            console.log(`Clicked on KPI: ${kpiType}`);
            // In a real application, this would open a modal or navigate to a detailed view
            showKPIDetails(kpiType);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

/**
 * Show detailed information for a KPI (placeholder)
 * @param {string} kpiType - Type of KPI to show details for
 */
function showKPIDetails(kpiType) {
    // Placeholder for modal or detailed view
    console.log(`Showing details for ${kpiType}`);
    // In a real app, this would open a modal with more detailed charts and data
}

// Export functions for use in other modules
if (typeof window !== 'undefined') {
    window.KPIModule = {
        initializeKPICards,
        updateKPICards,
        initializeKPICardInteractions
    };
}
