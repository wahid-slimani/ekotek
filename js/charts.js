// Charts and Visualizations

// Store chart instances for updates
const charts = {};

/**
 * Initialize all dashboard charts
 */
function initializeCharts() {
    createWasteTrendChart();
    createTopDishesChart();
    createWasteSourceChart();
    createCompositionChart();
    createPredictionChart();
    createLocationHeatmap();
}

/**
 * Create 30-Day Waste Trend Line Chart
 */
function createWasteTrendChart() {
    const ctx = document.getElementById('wasteTrendChart');
    if (!ctx) return;
    
    const data = dashboardData.wasteOverTime;
    
    charts.wasteTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }),
            datasets: [
                {
                    label: 'Total Waste',
                    data: data.map(d => d.total),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Food Waste',
                    data: data.map(d => d.food),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'Recyclables',
                    data: data.map(d => d.recyclables),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5
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
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    bodySpacing: 6,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${context.parsed.y} kg`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' },
                    ticks: {
                        callback: (value) => `${value} kg`,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

/**
 * Create Top 10 Wasted Dishes Horizontal Bar Chart
 */
function createTopDishesChart() {
    const ctx = document.getElementById('topDishesChart');
    if (!ctx) return;
    
    const data = dashboardData.topWastedDishes;
    
    charts.topDishes = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.name),
            datasets: [{
                label: 'Waste (kg)',
                data: data.map(d => d.waste_kg),
                backgroundColor: data.map(d => {
                    if (d.severity === 'high') return '#ef4444';
                    if (d.severity === 'medium') return '#f59e0b';
                    return '#10b981';
                }),
                borderRadius: 6,
                barThickness: 24
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => {
                            const item = data[context.dataIndex];
                            return [
                                `Waste: ${item.waste_kg} kg`,
                                `Cost: $${item.cost}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' },
                    ticks: {
                        callback: (value) => `${value} kg`,
                        font: { size: 11 }
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
    
    // Add sort toggle functionality
    const sortButtons = document.querySelector('#topDishesChart')?.closest('.chart-card')
        ?.querySelectorAll('.toggle-btn');
    
    sortButtons?.forEach(btn => {
        btn.addEventListener('click', () => {
            sortButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const sortBy = btn.dataset.sort;
            updateTopDishesSort(sortBy);
        });
    });
}

/**
 * Update top dishes chart sorting
 * @param {string} sortBy - Sort criteria ('volume' or 'cost')
 */
function updateTopDishesSort(sortBy) {
    const data = [...dashboardData.topWastedDishes];
    
    if (sortBy === 'cost') {
        data.sort((a, b) => b.cost - a.cost);
    } else {
        data.sort((a, b) => b.waste_kg - a.waste_kg);
    }
    
    charts.topDishes.data.labels = data.map(d => d.name);
    charts.topDishes.data.datasets[0].data = data.map(d => d.waste_kg);
    charts.topDishes.data.datasets[0].backgroundColor = data.map(d => {
        if (d.severity === 'high') return '#ef4444';
        if (d.severity === 'medium') return '#f59e0b';
        return '#10b981';
    });
    
    charts.topDishes.update();
}

/**
 * Create Waste by Source Donut Chart
 */
function createWasteSourceChart() {
    const ctx = document.getElementById('wasteSourceChart');
    if (!ctx) return;
    
    const data = dashboardData.wasteBySource;
    
    charts.wasteSource = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.source),
            datasets: [{
                data: data.map(d => d.percentage),
                backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => {
                            const item = data[context.dataIndex];
                            return [
                                `${item.source}: ${item.percentage}%`,
                                `Amount: ${item.kg} kg`
                            ];
                        }
                    }
                }
            }
        },
        plugins: [{
            id: 'centerText',
            beforeDraw: (chart) => {
                const { ctx, chartArea: { width, height } } = chart;
                ctx.save();
                
                const totalKg = data.reduce((sum, item) => sum + item.kg, 0);
                
                ctx.font = 'bold 28px Inter';
                ctx.fillStyle = '#111827';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(totalKg, width / 2, height / 2 - 10);
                
                ctx.font = '12px Inter';
                ctx.fillStyle = '#6b7280';
                ctx.fillText('Total kg', width / 2, height / 2 + 15);
                
                ctx.restore();
            }
        }]
    });
}

/**
 * Create Waste Composition Stacked Bar Chart
 */
function createCompositionChart() {
    const ctx = document.getElementById('compositionChart');
    if (!ctx) return;
    
    const data = dashboardData.wasteComposition;
    
    charts.composition = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.week),
            datasets: [
                {
                    label: 'Organic',
                    data: data.map(d => d.organic),
                    backgroundColor: '#10b981',
                    borderRadius: { topLeft: 6, topRight: 6 }
                },
                {
                    label: 'Plastic',
                    data: data.map(d => d.plastic),
                    backgroundColor: '#3b82f6'
                },
                {
                    label: 'Paper',
                    data: data.map(d => d.paper),
                    backgroundColor: '#f59e0b'
                },
                {
                    label: 'Glass',
                    data: data.map(d => d.glass),
                    backgroundColor: '#8b5cf6'
                },
                {
                    label: 'Metal',
                    data: data.map(d => d.metal),
                    backgroundColor: '#6b7280',
                    borderRadius: { bottomLeft: 6, bottomRight: 6 }
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 12,
                        font: { size: 11, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => {
                            const total = context.chart.data.datasets.reduce((sum, dataset) => {
                                return sum + dataset.data[context.dataIndex];
                            }, 0);
                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                            return `${context.dataset.label}: ${context.parsed.y} kg (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' },
                    ticks: {
                        callback: (value) => `${value} kg`,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

/**
 * Create AI Prediction Area Chart
 */
function createPredictionChart() {
    const ctx = document.getElementById('predictionChart');
    if (!ctx) return;
    
    const data = dashboardData.predictions;
    
    charts.prediction = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => {
                const date = new Date(d.date);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }),
            datasets: [
                {
                    label: 'Historical',
                    data: data.map(d => d.actual),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4
                },
                {
                    label: 'Predicted',
                    data: data.map(d => d.predicted),
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderWidth: 3,
                    borderDash: [8, 4],
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4
                },
                {
                    label: 'Confidence High',
                    data: data.map(d => d.confidence_high),
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    fill: '+1',
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Confidence Low',
                    data: data.map(d => d.confidence_low),
                    borderColor: 'transparent',
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
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
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 12, family: 'Inter' },
                        filter: (item) => !item.text.includes('Confidence')
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y;
                            if (value === null) return null;
                            return `${context.dataset.label}: ${value.toFixed(0)} kg`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: { size: 11 }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#f3f4f6' },
                    ticks: {
                        callback: (value) => `${value} kg`,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
    
    // Add confidence bands toggle
    const toggle = document.getElementById('confidenceBandsToggle');
    if (toggle) {
        toggle.addEventListener('change', (e) => {
            const show = e.target.checked;
            charts.prediction.data.datasets[2].hidden = !show;
            charts.prediction.data.datasets[3].hidden = !show;
            charts.prediction.update();
        });
    }
}

/**
 * Create Location Performance Heatmap Table
 */
function createLocationHeatmap() {
    const container = document.getElementById('locationHeatmap');
    if (!container) return;
    
    const data = dashboardData.locationPerformance;
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Total Waste</th>
                    <th>Food Waste</th>
                    <th>Recycling</th>
                    <th>Cost</th>
                    <th>Trend</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(location => {
        const statusClass = location.status;
        const wasteClass = location.totalWaste > 500 ? 'bad' : 
                          location.totalWaste > 400 ? 'moderate' : 'good';
        const recyclingClass = location.recyclingRate > 70 ? 'good' : 
                              location.recyclingRate > 60 ? 'moderate' : 'bad';
        
        html += `
            <tr>
                <td><strong>${location.name}</strong></td>
                <td><span class="heatmap-cell ${wasteClass}">${location.totalWaste} kg</span></td>
                <td><span class="heatmap-cell ${wasteClass}">${location.foodWaste} kg</span></td>
                <td><span class="heatmap-cell ${recyclingClass}">${location.recyclingRate}%</span></td>
                <td>$${location.cost.toLocaleString()}</td>
                <td>
                    <canvas class="sparkline-mini" id="sparkline-${location.name.replace(/\s+/g, '-')}"></canvas>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
    
    // Create mini sparklines for each location
    data.forEach(location => {
        const canvasId = `sparkline-${location.name.replace(/\s+/g, '-')}`;
        const canvas = document.getElementById(canvasId);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: location.trend.map((_, i) => i),
                    datasets: [{
                        data: location.trend,
                        borderColor: location.status === 'good' ? '#10b981' : 
                                   location.status === 'moderate' ? '#f59e0b' : '#ef4444',
                        borderWidth: 1.5,
                        pointRadius: 0,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: { x: { display: false }, y: { display: false } }
                }
            });
        }
    });
}

/**
 * Update charts with filtered data
 * @param {Object} filteredData - Filtered dashboard data
 */
function updateCharts(filteredData) {
    // Update waste trend chart
    if (charts.wasteTrend) {
        const data = filteredData.wasteOverTime;
        charts.wasteTrend.data.labels = data.map(d => {
            const date = new Date(d.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        charts.wasteTrend.data.datasets[0].data = data.map(d => d.total);
        charts.wasteTrend.data.datasets[1].data = data.map(d => d.food);
        charts.wasteTrend.data.datasets[2].data = data.map(d => d.recyclables);
        charts.wasteTrend.update('none');
    }
    
    // Update other charts similarly...
    if (charts.wasteSource) {
        const data = filteredData.wasteBySource;
        charts.wasteSource.data.datasets[0].data = data.map(d => d.percentage);
        charts.wasteSource.update('none');
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.ChartsModule = {
        initializeCharts,
        updateCharts,
        charts
    };
}
