// Data Table Functionality

let tableData = [];
let currentPage = 1;
let itemsPerPage = 20;
let sortColumn = 'datetime';
let sortDirection = 'desc';
let searchQuery = '';

/**
 * Initialize data table
 */
function initializeTable() {
    tableData = [...dashboardData.recentEvents];
    renderTable();
    initializeTableControls();
}

/**
 * Render table with current data
 */
function renderTable() {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    
    // Apply search filter
    let filteredData = tableData;
    if (searchQuery) {
        filteredData = tableData.filter(event => {
            return Object.values(event).some(value => 
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }
    
    // Apply sorting
    filteredData.sort((a, b) => {
        let aVal = a[sortColumn];
        let bVal = b[sortColumn];
        
        // Convert to numbers if numeric columns
        if (sortColumn === 'amount' || sortColumn === 'cost') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Render rows
    tbody.innerHTML = pageData.map(event => `
        <tr>
            <td>${event.datetime}</td>
            <td>${event.location}</td>
            <td>${event.wasteType}</td>
            <td>${event.source}</td>
            <td>${event.item}</td>
            <td>${event.amount}</td>
            <td>$${event.cost.toFixed(2)}</td>
            <td>
                <span class="status-badge ${event.status}">
                    ${event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" aria-label="View details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" aria-label="Flag issue">
                        <i class="fas fa-flag"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Update pagination info
    updatePaginationInfo(filteredData.length);
    renderPagination(filteredData.length);
}

/**
 * Initialize table controls (search, sort, pagination)
 */
function initializeTableControls() {
    // Search functionality with debounce
    const searchInput = document.getElementById('tableSearch');
    if (searchInput) {
        const debouncedSearch = window.FiltersModule.debounce((e) => {
            searchQuery = e.target.value;
            currentPage = 1;
            renderTable();
        }, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    // Column sorting
    const sortableHeaders = document.querySelectorAll('.data-table th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            
            // Toggle sort direction if same column, otherwise default to desc
            if (column === sortColumn) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'desc';
            }
            
            // Update header icons
            sortableHeaders.forEach(h => {
                h.classList.remove('sorted');
                h.querySelector('i').className = 'fas fa-sort';
            });
            
            header.classList.add('sorted');
            header.querySelector('i').className = sortDirection === 'asc' ? 
                'fas fa-sort-up' : 'fas fa-sort-down';
            
            renderTable();
        });
    });
    
    // Pagination controls
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(tableData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
    }
    
    // Export CSV functionality
    const exportBtn = document.getElementById('exportTableBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToCSV);
    }
}

/**
 * Update pagination information display
 * @param {number} totalItems - Total number of items
 */
function updatePaginationInfo(totalItems) {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
    
    document.getElementById('showingStart').textContent = startIndex;
    document.getElementById('showingEnd').textContent = endIndex;
    document.getElementById('totalRecords').textContent = totalItems;
}

/**
 * Render pagination controls
 * @param {number} totalItems - Total number of items
 */
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationNumbers = document.getElementById('paginationNumbers');
    
    if (!paginationNumbers) return;
    
    let html = '';
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Show first page if not in range
    if (startPage > 1) {
        html += `<button class="page-number" data-page="1">1</button>`;
        if (startPage > 2) {
            html += `<span style="padding: 0 8px;">...</span>`;
        }
    }
    
    // Show page numbers
    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    // Show last page if not in range
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span style="padding: 0 8px;">...</span>`;
        }
        html += `<button class="page-number" data-page="${totalPages}">${totalPages}</button>`;
    }
    
    paginationNumbers.innerHTML = html;
    
    // Add click handlers to page numbers
    paginationNumbers.querySelectorAll('.page-number').forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.dataset.page);
            renderTable();
        });
    });
    
    // Update prev/next button states
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

/**
 * Export table data to CSV
 */
function exportToCSV() {
    // Filter data if search is active
    let dataToExport = tableData;
    if (searchQuery) {
        dataToExport = tableData.filter(event => {
            return Object.values(event).some(value => 
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }
    
    // Create CSV content
    const headers = ['Date/Time', 'Location', 'Waste Type', 'Source', 'Item/Ingredient', 'Amount (kg)', 'Cost ($)', 'Status'];
    const csvRows = [headers.join(',')];
    
    dataToExport.forEach(event => {
        const row = [
            event.datetime,
            event.location,
            event.wasteType,
            event.source,
            event.item,
            event.amount,
            event.cost,
            event.status
        ];
        csvRows.push(row.map(field => `"${field}"`).join(','));
    });
    
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `ekotek-waste-events-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('CSV exported successfully');
}

/**
 * Update table with new data
 * @param {Array} newData - New table data
 */
function updateTable(newData) {
    tableData = [...newData];
    currentPage = 1;
    renderTable();
}

/**
 * Add row hover effects and interactions
 */
function initializeRowInteractions() {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    
    tbody.addEventListener('click', (e) => {
        // Handle action button clicks
        const actionBtn = e.target.closest('.action-btn');
        if (actionBtn) {
            const row = actionBtn.closest('tr');
            const rowIndex = Array.from(tbody.children).indexOf(row);
            const event = tableData[rowIndex];
            
            if (actionBtn.querySelector('.fa-eye')) {
                console.log('View details for:', event);
                // In a real app, this would open a modal with more details
            } else if (actionBtn.querySelector('.fa-flag')) {
                console.log('Flag event:', event);
                // In a real app, this would flag the event for review
            }
        }
        
        // Handle row click for expansion (optional future feature)
        const row = e.target.closest('tr');
        if (row && !actionBtn) {
            // Could implement expandable rows here
        }
    });
}

// Export functions
if (typeof window !== 'undefined') {
    window.TableModule = {
        initializeTable,
        updateTable,
        renderTable,
        exportToCSV
    };
}
