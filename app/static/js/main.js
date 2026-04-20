/**
 * ECG Analysis Portal - Main JavaScript
 * Handles interactivity and dynamic behavior
 */

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  setupEventListeners();
  loadDashboardData();
  setupFormHandlers();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // File upload
  const fileInput = document.getElementById('ecgFile');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileUpload);
  }

  // Form submission
  const form = document.getElementById('uploadForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
  });

  // Auto-refresh status
  setInterval(updateSystemStatus, 5000);
}

/**
 * Handle file upload
 */
function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const fileSize = (file.size / 1024 / 1024).toFixed(2);
  const fileName = file.name;
  const fileType = file.type;

  console.log(`File selected: ${fileName} (${fileSize}MB)`);

  // Show file preview info
  const preview = document.getElementById('filePreview');
  if (preview) {
    preview.innerHTML = `
      <div class="alert alert-info">
        <div class="alert-icon">📄</div>
        <div>
          <strong>File ready:</strong> ${fileName}<br>
          <small>Size: ${fileSize}MB | Type: ${fileType}</small>
        </div>
      </div>
    `;
  }
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Uploading...';

  // Submit to server
  fetch('/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showAlert('File uploaded successfully!', 'success');
        form.reset();
        // Clear preview
        const preview = document.getElementById('filePreview');
        if (preview) preview.innerHTML = '';
      } else {
        showAlert(data.message || 'Upload failed', 'danger');
      }
    })
    .catch(error => {
      console.error('Upload error:', error);
      showAlert('An error occurred during upload', 'danger');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
}

/**
 * Load dashboard data via AJAX
 */
function loadDashboardData() {
  fetch('/api/status')
    .then(response => response.json())
    .then(data => {
      updateDashboard(data);
    })
    .catch(error => console.error('Error loading data:', error));
}

/**
 * Update dashboard with data
 */
function updateDashboard(data) {
  const dashboard = document.getElementById('dashboard');
  if (!dashboard) return;

  // Update stats
  const statsContainer = document.getElementById('statsContainer');
  if (statsContainer && data.stats) {
    statsContainer.innerHTML = generateStatsHTML(data.stats);
  }

  // Update records
  const recordsContainer = document.getElementById('recordsContainer');
  if (recordsContainer && data.records) {
    recordsContainer.innerHTML = generateRecordsHTML(data.records);
  }
}

/**
 * Generate stats HTML
 */
function generateStatsHTML(stats) {
  return `
    <div class="stat-item">
      <div class="stat-label">Total Records</div>
      <div class="stat-value">${stats.total || 0}</div>
    </div>
    <div class="stat-item success">
      <div class="stat-label">Normal</div>
      <div class="stat-value">${stats.normal || 0}</div>
    </div>
    <div class="stat-item warning">
      <div class="stat-label">Anomalies</div>
      <div class="stat-value">${stats.anomalies || 0}</div>
    </div>
    <div class="stat-item danger">
      <div class="stat-label">Critical</div>
      <div class="stat-value">${stats.critical || 0}</div>
    </div>
  `;
}

/**
 * Generate records table HTML
 */
function generateRecordsHTML(records) {
  if (!records.length) {
    return '<p class="text-gray">No records found.</p>';
  }

  const rows = records.map(record => `
    <tr>
      <td>${record.date}</td>
      <td>${record.patientName}</td>
      <td>${record.bpm}</td>
      <td><span class="status-badge status-${record.status}">${record.status}</span></td>
    </tr>
  `).join('');

  return `
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Patient</th>
          <th>Heart Rate</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

/**
 * Update system status
 */
function updateSystemStatus() {
  fetch('/api/system-status')
    .then(response => response.json())
    .then(data => {
      const statusElements = {
        server: document.getElementById('serverStatus'),
        database: document.getElementById('databaseStatus'),
        sync: document.getElementById('syncStatus')
      };

      Object.entries(statusElements).forEach(([key, element]) => {
        if (element && data[key]) {
          const status = data[key];
          element.className = `status-badge status-${status.status}`;
          element.innerHTML = `
            <span class="status-dot"></span>
            ${status.label}
          `;
        }
      });
    })
    .catch(error => console.error('Error updating status:', error));
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alertContainer');
  if (!alertContainer) return;

  const alertId = `alert-${Date.now()}`;
  const alertHTML = `
    <div id="${alertId}" class="alert alert-${type}">
      <div class="alert-icon">${getAlertIcon(type)}</div>
      <div>${message}</div>
    </div>
  `;

  alertContainer.insertAdjacentHTML('beforeend', alertHTML);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    const element = document.getElementById(alertId);
    if (element) {
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.3s ease-in-out';
      setTimeout(() => element.remove(), 300);
    }
  }, 5000);
}

/**
 * Get alert icon
 */
function getAlertIcon(type) {
  const icons = {
    success: '✓',
    danger: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  return icons[type] || 'ℹ';
}

/**
 * Handle navigation
 */
function handleNavigation(e) {
  e.preventDefault();
  const link = e.currentTarget;
  
  // Update active state
  document.querySelectorAll('.nav-link').forEach(item => {
    item.classList.remove('active');
  });
  link.classList.add('active');

  // Navigate (can be enhanced with SPA routing)
  const href = link.getAttribute('href');
  if (href) {
    window.location.href = href;
  }
}

/**
 * Setup form validation and handlers
 */
function setupFormHandlers() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });
  });
}

/**
 * Validate form
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--color-danger)';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  return isValid;
}

/**
 * Utility function to format date
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

/**
 * Utility function to format time duration
 */
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

// Export functions for external use
window.ECGApp = {
  showAlert,
  loadDashboardData,
  updateSystemStatus,
  formatDate,
  formatDuration
};
