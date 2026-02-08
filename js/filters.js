// Filter Functionality

// Store active filters
let activeFilters = {
    location: 'all',
    dateRange: '30d',
    wasteTypes: ['food', 'plastic', 'paper', 'glass', 'metal'],
    wasteSource: 'all',
    timeOfDay: 'all',
    locationType: 'all'
};

/**
 * Initialize filter controls
 */
function initializeFilters() {
    // Location selector
    const locationSelector = document.getElementById('locationSelector');
    if (locationSelector) {
        locationSelector.addEventListener('change', (e) => {
            activeFilters.location = e.target.value;
            updateFilterIndicator();
        });
    }
    
    // Date range selector
    const dateRangeSelector = document.getElementById('dateRangeSelector');
    if (dateRangeSelector) {
        dateRangeSelector.addEventListener('change', (e) => {
            activeFilters.dateRange = e.target.value;
            updateFilterIndicator();
        });
    }
    
    // Waste type checkboxes
    const wasteTypeFilters = document.querySelectorAll('#wasteTypeFilters input[type="checkbox"]');
    wasteTypeFilters.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            activeFilters.wasteTypes = Array.from(wasteTypeFilters)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            updateFilterIndicator();
        });
    });
    
    // Waste source dropdown
    const wasteSourceFilter = document.getElementById('wasteSourceFilter');
    if (wasteSourceFilter) {
        wasteSourceFilter.addEventListener('change', (e) => {
            activeFilters.wasteSource = e.target.value;
            updateFilterIndicator();
        });
    }
    
    // Time of day segmented control
    const timeOfDayButtons = document.querySelectorAll('#timeOfDayFilter .segment');
    timeOfDayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            timeOfDayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilters.timeOfDay = btn.dataset.value;
            updateFilterIndicator();
        });
    });
    
    // Location type pills
    const locationTypePills = document.querySelectorAll('#locationTypeFilter .pill');
    locationTypePills.forEach(pill => {
        pill.addEventListener('click', () => {
            locationTypePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilters.locationType = pill.dataset.value;
            updateFilterIndicator();
        });
    });
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }
}

/**
 * Update filter indicator badge
 */
function updateFilterIndicator() {
    let filterCount = 0;
    
    if (activeFilters.location !== 'all') filterCount++;
    if (activeFilters.dateRange !== '30d') filterCount++;
    if (activeFilters.wasteTypes.length < 5) filterCount++;
    if (activeFilters.wasteSource !== 'all') filterCount++;
    if (activeFilters.timeOfDay !== 'all') filterCount++;
    if (activeFilters.locationType !== 'all') filterCount++;
    
    const indicator = document.getElementById('activeFiltersIndicator');
    const resetBtn = document.getElementById('resetFiltersBtn');
    const countSpan = document.getElementById('activeFiltersCount');
    
    if (filterCount > 0) {
        indicator.style.display = 'flex';
        resetBtn.style.display = 'inline-flex';
        countSpan.textContent = `Filters applied: ${filterCount}`;
    } else {
        indicator.style.display = 'none';
        resetBtn.style.display = 'none';
    }
}

/**
 * Apply filters and update dashboard
 */
function applyFilters() {
    // Show loading state
    const mainContent = document.getElementById('mainContent');
    mainContent.classList.add('filter-loading');
    
    // Simulate filtering delay
    setTimeout(() => {
        const filteredData = getFilteredData();
        
        // Update KPIs
        if (window.KPIModule) {
            window.KPIModule.updateKPICards(filteredData);
        }
        
        // Update charts
        if (window.ChartsModule) {
            window.ChartsModule.updateCharts(filteredData);
        }
        
        // Update table
        if (window.TableModule) {
            window.TableModule.updateTable(filteredData.recentEvents);
        }
        
        mainContent.classList.remove('filter-loading');
        
        // Show success message (optional)
        console.log('Filters applied successfully');
    }, 300);
}

/**
 * Get filtered data based on active filters
 * @returns {Object} Filtered dashboard data
 */
function getFilteredData() {
    // In a real application, this would make an API call
    // For now, we'll return the same data with some random variation
    const baseData = JSON.parse(JSON.stringify(dashboardData));
    
    // Apply some random variation to simulate filtering
    const variation = 0.85 + Math.random() * 0.3; // 85% to 115%
    
    baseData.kpis.totalWaste.value = Math.round(baseData.kpis.totalWaste.value * variation);
    baseData.kpis.wasteCost.value = Math.round(baseData.kpis.wasteCost.value * variation);
    baseData.kpis.recyclingRate.value = Math.min(100, baseData.kpis.recyclingRate.value * (0.95 + Math.random() * 0.1));
    baseData.kpis.wastePerCustomer.value = (baseData.kpis.wastePerCustomer.value * variation).toFixed(2);
    baseData.kpis.co2Impact.value = Math.round(baseData.kpis.co2Impact.value * variation);
    
    // Filter events by waste source if selected
    if (activeFilters.wasteSource !== 'all') {
        const sourceMap = {
            'prep': 'Prep',
            'plate': 'Plate',
            'inventory': 'Inventory'
        };
        const targetSource = sourceMap[activeFilters.wasteSource];
        baseData.recentEvents = baseData.recentEvents.filter(event => 
            event.source === targetSource
        );
    }
    
    return baseData;
}

/**
 * Reset all filters to default
 */
function resetFilters() {
    activeFilters = {
        location: 'all',
        dateRange: '30d',
        wasteTypes: ['food', 'plastic', 'paper', 'glass', 'metal'],
        wasteSource: 'all',
        timeOfDay: 'all',
        locationType: 'all'
    };
    
    // Reset UI controls
    document.getElementById('locationSelector').value = 'all';
    document.getElementById('dateRangeSelector').value = '30d';
    document.getElementById('wasteSourceFilter').value = 'all';
    
    // Reset checkboxes
    document.querySelectorAll('#wasteTypeFilters input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
    
    // Reset segmented controls
    document.querySelectorAll('#timeOfDayFilter .segment').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.value === 'all') btn.classList.add('active');
    });
    
    // Reset pills
    document.querySelectorAll('#locationTypeFilter .pill').forEach(pill => {
        pill.classList.remove('active');
        if (pill.dataset.value === 'all') pill.classList.add('active');
    });
    
    updateFilterIndicator();
    applyFilters();
}

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions
if (typeof window !== 'undefined') {
    window.FiltersModule = {
        initializeFilters,
        applyFilters,
        resetFilters,
        activeFilters,
        debounce
    };
}
