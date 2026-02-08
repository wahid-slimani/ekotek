// Food Waste Analytics Page JavaScript
const FoodWasteAnalytics = {
    charts: {},

    // Initialize the page
    init() {
        console.log('Initializing Food Waste Analytics...');
        this.initializeSidebar();
        this.createCharts();
        this.populateTables();
        this.hideLoadingScreen();
    },

    // Sidebar toggle
    initializeSidebar() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
    },

    // Create all charts
    createCharts() {
        this.createIngredientWasteChart();
        this.createPreConsumerChart();
        this.createMealPeriodChart();
        this.createDayOfWeekChart();
    },

    // Top Ingredient Waste Chart
    createIngredientWasteChart() {
        const ctx = document.getElementById('ingredientWasteChart');
        if (!ctx) return;

        const data = dashboardData.foodWasteAnalytics.ingredientWaste.slice(0, 8);

        this.charts.ingredientWaste = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.ingredient),
                datasets: [
                    {
                        label: 'Waste (kg)',
                        data: data.map(item => item.waste_kg),
                        backgroundColor: 'rgba(239, 68, 68, 0.7)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Cost ($)',
                        data: data.map(item => item.cost),
                        backgroundColor: 'rgba(251, 146, 60, 0.7)',
                        borderColor: 'rgba(251, 146, 60, 1)',
                        borderWidth: 1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    if (context.datasetIndex === 0) {
                                        label += context.parsed.y.toFixed(1) + ' kg';
                                    } else {
                                        label += '$' + context.parsed.y.toFixed(0);
                                    }
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Weight (kg)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Cost ($)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    },

    // Pre-Consumer Waste Chart
    createPreConsumerChart() {
        const ctx = document.getElementById('preConsumerChart');
        if (!ctx) return;

        const data = dashboardData.foodWasteAnalytics.preConsumerWaste;

        this.charts.preConsumer = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(item => item.stage),
                datasets: [{
                    data: data.map(item => item.percentage),
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(16, 185, 129, 0.8)'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const item = data[context.dataIndex];
                                return [
                                    context.label + ': ' + item.percentage + '%',
                                    item.kg + ' kg',
                                    item.description
                                ];
                            }
                        }
                    }
                }
            }
        });
    },

    // Meal Period Chart
    createMealPeriodChart() {
        const ctx = document.getElementById('mealPeriodChart');
        if (!ctx) return;

        const data = dashboardData.foodWasteAnalytics.wasteByMealPeriod;

        this.charts.mealPeriod = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.period),
                datasets: [{
                    label: 'Waste (kg)',
                    data: data.map(item => item.waste_kg),
                    backgroundColor: [
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(239, 68, 68, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: [
                        'rgba(251, 191, 36, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(139, 92, 246, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const item = data[context.dataIndex];
                                return [
                                    'Cost: $' + item.cost.toLocaleString(),
                                    'Orders: ' + item.orders.toLocaleString(),
                                    'Per Order: ' + item.wastePerOrder.toFixed(3) + ' kg'
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Waste (kg)'
                        }
                    }
                }
            }
        });
    },

    // Day of Week Chart
    createDayOfWeekChart() {
        const ctx = document.getElementById('dayOfWeekChart');
        if (!ctx) return;

        const data = dashboardData.foodWasteAnalytics.wasteByDayOfWeek;

        this.charts.dayOfWeek = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.day),
                datasets: [{
                    label: 'Waste (kg)',
                    data: data.map(item => item.waste_kg),
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            afterLabel: function(context) {
                                const item = data[context.dataIndex];
                                return [
                                    'Cost: $' + item.cost.toLocaleString(),
                                    'Waste Rate: ' + item.avgWasteRate + '%'
                                ];
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Waste (kg)'
                        }
                    }
                }
            }
        });
    },

    // Populate tables
    populateTables() {
        this.populatePortionTable();
        this.populateMenuEngineeringTable();
        this.populatePlateWasteTable();
    },

    // Portion Optimization Table
    populatePortionTable() {
        const tbody = document.getElementById('portionTableBody');
        if (!tbody) return;

        const data = dashboardData.foodWasteAnalytics.portionOptimization;
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.dish}</strong></td>
                <td>${item.currentPortion}g</td>
                <td>${item.recommendedPortion}g</td>
                <td>
                    <span class="status-badge badge-success">
                        <i class="fas fa-arrow-down"></i> ${item.reduction}%
                    </span>
                </td>
                <td><strong style="color: var(--success);">$${item.monthlySavings.toLocaleString()}</strong></td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${item.confidence}%; height: 100%; background: var(--primary);"></div>
                        </div>
                        <span style="font-size: 0.875rem;">${item.confidence}%</span>
                    </div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-star" style="color: var(--warning);"></i>
                        <span>${item.customerSatisfaction}</span>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    // Menu Engineering Table
    populateMenuEngineeringTable() {
        const tbody = document.getElementById('menuEngineeringTableBody');
        if (!tbody) return;

        const data = dashboardData.foodWasteAnalytics.menuEngineering;
        
        const badgeColors = {
            high: 'badge-success',
            medium: 'badge-warning',
            low: 'badge-normal',
            critical: 'badge-critical'
        };

        const categoryColors = {
            'Star': 'badge-success',
            'Puzzle': 'badge-warning',
            'Plow Horse': 'badge-normal',
            'Dog': 'badge-critical'
        };

        const priorityColors = {
            critical: 'badge-critical',
            high: 'badge-alert',
            medium: 'badge-warning',
            low: 'badge-normal'
        };

        tbody.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.dish}</strong></td>
                <td><span class="status-badge ${badgeColors[item.profitability]}">${item.profitability}</span></td>
                <td><span class="status-badge ${badgeColors[item.popularity]}">${item.popularity}</span></td>
                <td><span class="status-badge ${categoryColors[item.category]}">${item.category}</span></td>
                <td><span class="status-badge ${badgeColors[item.wasteImpact]}">${item.wasteImpact}</span></td>
                <td>${item.action}</td>
                <td><span class="status-badge ${priorityColors[item.priority]}">${item.priority}</span></td>
            </tr>
        `).join('');
    },

    // Plate Waste Table
    populatePlateWasteTable() {
        const tbody = document.getElementById('plateWasteTableBody');
        if (!tbody) return;

        const data = dashboardData.foodWasteAnalytics.plateWasteAnalysis;
        
        tbody.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.dish}</strong></td>
                <td>${item.avgWaste}g</td>
                <td>${item.totalOrders.toLocaleString()}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="flex: 1; height: 6px; background: var(--bg-tertiary); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${item.wasteRate}%; height: 100%; background: ${item.wasteRate > 30 ? 'var(--danger)' : item.wasteRate > 20 ? 'var(--warning)' : 'var(--success)'};"></div>
                        </div>
                        <span style="font-size: 0.875rem;">${item.wasteRate}%</span>
                    </div>
                </td>
                <td>${item.reason}</td>
                <td><strong style="color: var(--success);">$${item.savings.toLocaleString()}</strong></td>
            </tr>
        `).join('');
    },

    // Hide loading screen
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }
        }, 500);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => FoodWasteAnalytics.init());
} else {
    FoodWasteAnalytics.init();
}
