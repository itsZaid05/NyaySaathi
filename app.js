// NyaySaathi - AI-Powered Legal Companion Application
// Main JavaScript file for handling all interactions and functionality

// Application State Management (In-memory storage)
const AppState = {
  currentUser: null,
  currentPage: 'dashboard',
  chatMessages: [],
  intakeProgress: {
    step: 0,
    ageRange: null,
    category: null,
    description: null,
    completion: 0
  },
  caseData: {
    id: 'NS-2025-001',
    risk_level: 'Medium',
    urgency: 'High',
    domain: 'Workplace Harassment',
    status: 'Triage Complete',
    completion: 75,
    created: '2025-10-20'
  },
  sidebarCollapsed: false,
  fabExpanded: false,
  aiAssistantOpen: false,
  widgets: {
    'case-status': { visible: true, position: 1 },
    'next-steps': { visible: true, position: 2 },
    'documents': { visible: true, position: 3 },
    'lawyer-response': { visible: true, position: 4 },
    'risk-assessment': { visible: true, position: 5 },
    'topic-heatmap': { visible: true, position: 6 }
  }
};

// Demo Data
const DemoData = {
  cases: [
    {
      id: "NS-2025-001",
      risk_level: "Medium",
      urgency: "High",
      domain: "Workplace Harassment",
      status: "Triage Complete",
      completion: 75,
      created: "2025-10-20"
    },
    {
      id: "NS-2025-002",
      risk_level: "Low",
      urgency: "Medium",
      domain: "Consumer Dispute",
      status: "With Lawyer",
      completion: 100,
      created: "2025-10-18"
    }
  ],
  lawyers: [
    {
      name: "Advocate Priya Sharma",
      specialization: ["Family Law", "Domestic Violence", "Divorce"],
      location: "Mumbai, Maharashtra",
      rating: 4.8,
      cases_won: 156,
      response_time: "2 hours",
      fee_structure: "₹2000/consultation",
      availability: true,
      languages: ["English", "Hindi", "Marathi"]
    },
    {
      name: "Advocate Rajesh Kumar",
      specialization: ["Criminal Law", "IPC", "CrPC"],
      location: "Delhi NCR",
      rating: 4.9,
      cases_won: 203,
      response_time: "1 hour",
      fee_structure: "₹3000/consultation",
      availability: true,
      languages: ["English", "Hindi"]
    },
    {
      name: "Advocate Meena Patel",
      specialization: ["Consumer Rights", "Property Law", "Civil Matters"],
      location: "Ahmedabad, Gujarat",
      rating: 4.7,
      cases_won: 128,
      response_time: "3 hours",
      fee_structure: "₹1500/consultation",
      availability: false,
      languages: ["English", "Hindi", "Gujarati"]
    }
  ],
  documents: [
    {
      name: "Employment_Contract.pdf",
      type: "Contract",
      upload_date: "2025-10-22",
      size: "2.4 MB",
      status: "Ready"
    },
    {
      name: "Email_Evidence.pdf",
      type: "Evidence",
      upload_date: "2025-10-21",
      size: "1.1 MB",
      status: "Redacted"
    },
    {
      name: "Witness_Statement.docx",
      type: "Statement",
      upload_date: "2025-10-20",
      size: "856 KB",
      status: "Processing"
    }
  ],
  analytics: {
    total_cases: 1247,
    completed_cases: 892,
    avg_triage_time: "45 minutes",
    lawyer_response_rate: "94%",
    monthly_trends: [
      { month: "Jul", cases: 95 },
      { month: "Aug", cases: 112 },
      { month: "Sep", cases: 128 },
      { month: "Oct", cases: 145 }
    ],
    topic_distribution: [
      { category: "Family Law", percentage: 32 },
      { category: "Consumer", percentage: 24 },
      { category: "Workplace", percentage: 18 },
      { category: "Property", percentage: 15 },
      { category: "Criminal", percentage: 11 }
    ]
  }
};

// Utility Functions
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function showToast(type, title, message) {
  const toastContainer = $('#toast-container');
  const toast = createElement('div', `toast ${type}`);
  
  const iconMap = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };
  
  toast.innerHTML = `
    <i class="fas ${iconMap[type]} toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 3000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Urgency Button Handlers
function setupUrgencyButtons() {
  $$('.urgency-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.urgency-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const urgency = btn.dataset.urgency;
      showToast('info', 'Urgency Updated', `Case urgency set to ${urgency}.`);
    });
  });
}

// Video Tutorial Handlers
function playVideoTutorial(videoId) {
  showToast('info', 'Loading Video', 'Video tutorial will open in a new window.');
  
  // In a real app, this would open a video player or modal
  setTimeout(() => {
    showToast('success', 'Video Ready', 'Tutorial video is now playing.');
  }, 1000);
}

function showNotifications() {
  const notifications = [
    { type: 'success', title: 'Lawyer Response', message: 'Advocate Priya Sharma has reviewed your case', time: '5 min ago' },
    { type: 'info', title: 'Document Processed', message: 'Employment_Contract.pdf has been analyzed', time: '1 hour ago' },
    { type: 'warning', title: 'Action Required', message: 'Please upload witness statements', time: '2 hours ago' }
  ];
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.style.display = 'flex';
  
  const content = document.createElement('div');
  content.className = 'modal glass-card';
  content.style.maxWidth = '500px';
  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title">Notifications</h3>
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="modal-body">
      ${notifications.map(n => `
        <div class="notification-item" style="padding: var(--space-md); border-bottom: 1px solid rgba(0,0,0,0.1); cursor: pointer;" onclick="this.closest('.modal-overlay').remove(); showToast('${n.type}', '${n.title}', '${n.message}');">
          <div style="display: flex; align-items: start; gap: var(--space-md);">
            <i class="fas fa-${n.type === 'success' ? 'check-circle' : n.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}" style="color: var(--${n.type === 'success' ? 'accent' : n.type === 'warning' ? 'coral' : 'primary'}-color); font-size: 1.25rem; margin-top: 2px;"></i>
            <div style="flex: 1;">
              <strong style="color: var(--dark-slate);">${n.title}</strong>
              <p style="margin: var(--space-xs) 0; color: var(--color-gray-400); font-size: 0.875rem;">${n.message}</p>
              <small style="color: var(--color-gray-400);">${n.time}</small>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  modal.appendChild(content);
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Enhanced initialization to include all new handlers
function initializeAllHandlers() {
  setupUrgencyButtons();
  
  // Add click handlers for video cards
  $$('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      playVideoTutorial(card.dataset.videoId || 'default');
    });
  });
  
  // Add handlers for other interactive elements
  $$('.automation-card').forEach(card => {
    const button = card.querySelector('.btn');
    if (button) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const automationType = button.getAttribute('onclick').match(/runAutomation\('(.+)'\)/)?.[1];
        if (automationType) {
          runAutomation(automationType);
        }
      });
    }
  });
}

// Update the main initialization to include new handlers
const originalInitializeApp = initializeApp;
initializeApp = function() {
  originalInitializeApp();
  initializeAllHandlers();
};

// Additional helper functions
function showLoadingState(element, text = 'Loading...') {
  const originalContent = element.innerHTML;
  element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
  element.disabled = true;
  
  return () => {
    element.innerHTML = originalContent;
    element.disabled = false;
  };
}

function validateForm(formElement) {
  const requiredFields = formElement.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--coral-color)';
      isValid = false;
    } else {
      field.style.borderColor = '';
    }
  });
  
  return isValid;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

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

// Enhanced error handling for async operations
function handleAsyncOperation(operation, loadingText = 'Processing...') {
  return new Promise((resolve, reject) => {
    showToast('info', 'Operation Started', loadingText);
    
    operation
      .then(result => {
        showToast('success', 'Operation Complete', 'Action completed successfully.');
        resolve(result);
      })
      .catch(error => {
        console.error('Operation failed:', error);
        showToast('error', 'Operation Failed', 'An error occurred. Please try again.');
        reject(error);
      });
  });
}

function simulateApiDelay(callback, delay = 500) {
  setTimeout(callback, delay);
}

// Navigation Functions
function navigateTo(pageName) {
  // Hide all pages
  $$('.page-content').forEach(page => page.classList.add('hidden'));
  
  // Show target page
  const targetPage = $(`#${pageName}-page`);
  if (targetPage) {
    targetPage.classList.remove('hidden');
  }
  
  // Update nav active state
  $$('.nav-item').forEach(item => item.classList.remove('active'));
  const navItem = $(`.nav-item[data-page="${pageName}"]`);
  if (navItem) {
    navItem.classList.add('active');
  }
  
  AppState.currentPage = pageName;
  
  // Page-specific initialization
  switch (pageName) {
    case 'dashboard':
      initializeDashboard();
      break;
    case 'intake':
      initializeIntakePage();
      break;
    case 'story-mode':
      initializeStoryMode();
      break;
    case 'case-summary':
      initializeCaseSummary();
      break;
    case 'marketplace':
      initializeMarketplace();
      break;
    case 'documents':
      initializeDocuments();
      break;
    case 'analytics':
      initializeAnalytics();
      break;
    case 'ai-insights':
      initializeAIInsights();
      break;
    case 'policies':
      initializePolicies();
      break;
    case 'settings':
      initializeSettings();
      break;
    case 'help':
      initializeHelp();
      break;
  }
}

// Login/Welcome Page Functions
function startDemo() {
  // Simulate role selection
  AppState.currentUser = { role: 'user', name: 'Demo User' };
  
  // Hide loading screen after delay
  const loadingScreen = $('#loading-screen');
  loadingScreen.style.display = 'flex';
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    $('#login-page').classList.remove('active');
    $('#main-app').classList.remove('hidden');
    initializeDashboard();
    showToast('success', 'Welcome!', 'You\'re now using NyaySaathi demo mode.');
  }, 2000);
}

function selectRole(role) {
  AppState.currentUser = { role: role, name: role === 'user' ? 'User' : 'Lawyer' };
  startDemo();
}

// Sidebar Functions
function toggleSidebar() {
  const sidebar = $('#sidebar');
  sidebar.classList.toggle('collapsed');
  AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
}

// Dashboard Functions
function initializeDashboard() {
  initializeCharts();
  initializeProgressRings();
  initializeGauges();
  updateHeatmap();
}

function initializeCharts() {
  // Response Time Chart
  const ctx = $('#responseTimeChart');
  if (ctx && !ctx.chart) {
    ctx.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
          label: 'Average Response Time (hours)',
          data: [3.2, 2.8, 2.5, 2.1, 1.9, 2.3, 2.0, 1.8, 2.2, 1.6],
          borderColor: '#5A31F4',
          backgroundColor: 'rgba(90, 49, 244, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

function initializeProgressRings() {
  const progressRings = $$('.progress-ring');
  progressRings.forEach(ring => {
    const progress = parseInt(ring.dataset.progress);
    const circle = ring.querySelector('.progress-circle-fill');
    const circumference = 2 * Math.PI * 50; // radius = 50
    const offset = circumference - (progress / 100) * circumference;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  });
  
  // Small progress rings
  const smallRings = $$('.progress-ring-small');
  smallRings.forEach(ring => {
    const progress = parseInt(ring.dataset.progress);
    const circle = ring.querySelector('.progress-circle-fill');
    const circumference = 2 * Math.PI * 16; // radius = 16
    const offset = circumference - (progress / 100) * circumference;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
  });
}

function initializeGauges() {
  const gauges = $$('.gauge-meter');
  gauges.forEach(gauge => {
    const value = parseInt(gauge.dataset.value);
    const needle = gauge.querySelector('.gauge-needle');
    // Convert 0-100 value to -90 to +90 degrees
    const angle = (value - 50) * 1.8; // Scale to gauge range
    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
  });
}

function updateHeatmap() {
  // Heatmap is already styled with CSS data attributes
  // This function can be used to update data dynamically
}

// Widget Functions
function toggleWidgetMenu(widgetId) {
  const dropdown = $(`.widget[data-widget="${widgetId}"] .widget-menu-dropdown`);
  dropdown.classList.toggle('hidden');
  
  // Close other dropdowns
  $$('.widget-menu-dropdown').forEach(menu => {
    if (menu !== dropdown) {
      menu.classList.add('hidden');
    }
  });
}

function exportWidget(widgetId, format) {
  showToast('info', 'Export Started', `Exporting ${widgetId} as ${format.toUpperCase()}...`);
  
  // Generate mock data export
  setTimeout(() => {
    const data = generateWidgetExportData(widgetId);
    const blob = new Blob([format === 'csv' ? data.csv : data.text], { type: format === 'csv' ? 'text/csv' : 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${widgetId}_${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Export Complete', `${widgetId} exported successfully.`);
  }, 1500);
  
  // Close dropdown
  $(`.widget[data-widget="${widgetId}"] .widget-menu-dropdown`).classList.add('hidden');
}

function generateWidgetExportData(widgetId) {
  const timestamp = new Date().toISOString();
  return {
    csv: `Widget,${widgetId}\nExported,${timestamp}\nStatus,Active\n`,
    text: `Widget Export - ${widgetId}\nExported: ${timestamp}\nStatus: Active`
  };
}

// FAB Functions
function toggleFAB() {
  const fabActions = $('.fab-actions');
  const fabMain = $('.fab-main');
  
  fabActions.classList.toggle('hidden');
  AppState.fabExpanded = !AppState.fabExpanded;
  
  if (AppState.fabExpanded) {
    fabMain.innerHTML = '<i class="fas fa-times"></i>';
    fabMain.style.transform = 'rotate(90deg)';
  } else {
    fabMain.innerHTML = '<i class="fas fa-plus"></i>';
    fabMain.style.transform = 'rotate(0deg)';
  }
}

// Intake Functions
function initializeIntakePage() {
  // Reset intake interface to initial state
  const intakeInterface = $('#intake-interface');
  intakeInterface.classList.add('hidden');
  
  // Reset intake progress
  AppState.intakeProgress = {
    step: 0,
    ageRange: null,
    category: null,
    description: null,
    completion: 0
  };
}

function startIntake() {
  const intakeInterface = $('#intake-interface');
  intakeInterface.classList.remove('hidden');
  
  // Initialize first question
  addAIMessage("To provide you with the most relevant guidance, I'd like to know your age range. This helps me understand the legal context better.");
  
  // Add age range buttons after a delay
  setTimeout(() => {
    addAgeRangeButtons();
  }, 1000);
}

function addAIMessage(text) {
  const chatMessages = $('#chat-messages');
  const message = createElement('div', 'message ai-message');
  
  message.innerHTML = `
    <div class="message-content">
      <p>${text}</p>
    </div>
    <div class="message-time">Just now</div>
  `;
  
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMessage(text) {
  const chatMessages = $('#chat-messages');
  const message = createElement('div', 'message user-message');
  
  message.innerHTML = `
    <div class="message-content">
      <p>${text}</p>
    </div>
    <div class="message-time">Just now</div>
  `;
  
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAgeRangeButtons() {
  const chatMessages = $('#chat-messages');
  const ageRanges = ['18-25', '26-40', '41-60', '60+'];
  
  const buttonContainer = createElement('div', 'message ai-message');
  const buttonsHTML = ageRanges.map(range => 
    `<button class="btn btn-secondary" onclick="selectAgeRange('${range}')" style="margin: 4px;">${range}</button>`
  ).join('');
  
  buttonContainer.innerHTML = `
    <div class="message-content">
      <p>Please select your age range:</p>
      <div style="margin-top: 12px;">
        ${buttonsHTML}
      </div>
    </div>
    <div class="message-time">Just now</div>
  `;
  
  chatMessages.appendChild(buttonContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function selectAgeRange(range) {
  AppState.intakeProgress.ageRange = range;
  AppState.intakeProgress.step = 1;
  AppState.intakeProgress.completion = 33;
  
  addUserMessage(`I am ${range} years old`);
  
  // Update progress ring
  updateIntakeProgress();
  
  setTimeout(() => {
    addAIMessage("Thank you. Now, which category best describes your situation?");
    setTimeout(() => {
      addCategoryButtons();
    }, 1000);
  }, 500);
}

function addCategoryButtons() {
  const chatMessages = $('#chat-messages');
  const categories = ['Family', 'Workplace', 'Property', 'Criminal', 'Consumer', 'Other'];
  
  const buttonContainer = createElement('div', 'message ai-message');
  const buttonsHTML = categories.map(category => 
    `<button class="btn btn-secondary" onclick="selectCategory('${category}')" style="margin: 4px;">${category}</button>`
  ).join('');
  
  buttonContainer.innerHTML = `
    <div class="message-content">
      <p>Please select the relevant category:</p>
      <div style="margin-top: 12px;">
        ${buttonsHTML}
      </div>
    </div>
    <div class="message-time">Just now</div>
  `;
  
  chatMessages.appendChild(buttonContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function selectCategory(category) {
  AppState.intakeProgress.category = category;
  AppState.intakeProgress.step = 2;
  AppState.intakeProgress.completion = 66;
  
  addUserMessage(`My situation is related to ${category}`);
  
  // Update progress ring
  updateIntakeProgress();
  
  setTimeout(() => {
    addAIMessage("Perfect. Please describe your situation in detail. Take your time and include any relevant information you think might be important.");
    setTimeout(() => {
      enableTextInput();
    }, 1000);
  }, 500);
}

function enableTextInput() {
  const chatInput = $('#chat-input');
  chatInput.placeholder = "Describe your situation in detail...";
  chatInput.focus();
}

function handleChatInput(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const chatInput = $('#chat-input');
  const message = chatInput.value.trim();
  
  if (message) {
    if (AppState.intakeProgress.step === 2) {
      AppState.intakeProgress.description = message;
      AppState.intakeProgress.step = 3;
      AppState.intakeProgress.completion = 100;
      
      addUserMessage(message);
      chatInput.value = '';
      
      // Update progress ring
      updateIntakeProgress();
      
      setTimeout(() => {
        addAIMessage("Thank you for sharing this information. I'll analyze your situation and provide relevant guidance. This may take a moment...");
        
        setTimeout(() => {
          completeIntake();
        }, 2000);
      }, 500);
    } else {
      addUserMessage(message);
      chatInput.value = '';
      
      setTimeout(() => {
        addAIMessage("I understand. Is there anything else you'd like to add about your situation?");
      }, 1000);
    }
  }
}

function updateIntakeProgress() {
  const progressRing = $('.progress-ring-small');
  if (progressRing) {
    progressRing.dataset.progress = AppState.intakeProgress.completion;
    const progressText = progressRing.querySelector('.progress-text-small');
    progressText.textContent = `${AppState.intakeProgress.completion}%`;
    
    const circle = progressRing.querySelector('.progress-circle-fill');
    const circumference = 2 * Math.PI * 16;
    const offset = circumference - (AppState.intakeProgress.completion / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
}

function completeIntake() {
  addAIMessage("Your intake is complete! Based on the information provided, I've identified this as a workplace harassment case with medium risk level. Let me show you some similar cases and legal guidance.");
  
  setTimeout(() => {
    const continueButton = createElement('div', 'message ai-message');
    continueButton.innerHTML = `
      <div class="message-content">
        <p>Click below to view detailed story-mode guidance:</p>
        <button class="btn btn-primary" onclick="navigateTo('story-mode')" style="margin-top: 12px;">
          View Similar Cases & Legal Guidance
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="message-time">Just now</div>
    `;
    
    $('#chat-messages').appendChild(continueButton);
    $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
  }, 1500);
}

function toggleVoiceInput() {
  showToast('info', 'Voice Input', 'Voice input feature will be available soon.');
}

// Story Mode Functions
let currentOutcome = 0;
const outcomes = [
  {
    type: 'success',
    title: 'Favorable',
    description: 'Compensation awarded, disciplinary action taken',
    timeline: '6 months'
  },
  {
    type: 'warning', 
    title: 'Mixed',
    description: 'Partial resolution, workplace changes implemented',
    timeline: '4-8 months'
  },
  {
    type: 'error',
    title: 'Challenging',
    description: 'Insufficient evidence, case dismissed',
    timeline: '2-4 months'
  }
];

function initializeStoryMode() {
  // Initialize outcome carousel
  currentOutcome = 0;
  updateOutcomeDisplay();
}

function nextOutcome() {
  currentOutcome = (currentOutcome + 1) % outcomes.length;
  updateOutcomeDisplay();
}

function previousOutcome() {
  currentOutcome = (currentOutcome - 1 + outcomes.length) % outcomes.length;
  updateOutcomeDisplay();
}

function updateOutcomeDisplay() {
  $$('.outcome-card').forEach((card, index) => {
    if (index === currentOutcome) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function toggleSection(sectionId) {
  const section = $(`#${sectionId}`);
  const header = section.previousElementSibling;
  
  if (section.classList.contains('expanded')) {
    section.classList.remove('expanded');
    header.classList.remove('expanded');
  } else {
    section.classList.add('expanded');
    header.classList.add('expanded');
  }
}

// Case Summary Functions
function initializeCaseSummary() {
  // Initialize with active tab
  switchCaseTab('overview');
  
  // Populate case summary with intake data
  if (AppState.intakeProgress.completion === 100) {
    populateCaseSummary();
  }
}

function populateCaseSummary() {
  // This would populate the case summary page with the collected data
  // For now, we'll use the demo data structure
}

function switchCaseTab(tabName) {
  // Hide all tab panels
  $$('.tab-panel').forEach(panel => panel.classList.remove('active'));
  
  // Show target panel
  const targetPanel = $(`#${tabName}-panel`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }
  
  // Update tab button states
  $$('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function editCase() {
  showToast('info', 'Edit Mode', 'Redirecting to case editor...');
  setTimeout(() => {
    navigateTo('intake');
  }, 1000);
}

// Marketplace Functions
function initializeMarketplace() {
  renderLawyerCards();
  setupMarketplaceFilters();
}

function renderLawyerCards() {
  // This would render lawyer cards based on DemoData.lawyers
  // For now, the static HTML handles this
}

function setupMarketplaceFilters() {
  // Search functionality
  const searchInput = $('.marketplace-search .search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterLawyers({ query });
    });
  }
  
  // Filter selects
  $$('.filter-select').forEach(select => {
    select.addEventListener('change', () => {
      applyMarketplaceFilters();
    });
  });
  
  // Fee range slider
  const feeSlider = $('.fee-slider');
  if (feeSlider) {
    feeSlider.addEventListener('input', (e) => {
      const value = e.target.value;
      const label = feeSlider.parentElement.querySelector('label');
      label.textContent = `Fee Range: ₹1000 - ₹${value}`;
      applyMarketplaceFilters();
    });
  }
}

function filterLawyers(filters) {
  // Simulate filtering lawyers
  const lawyerCards = $$('.lawyer-card');
  lawyerCards.forEach(card => {
    const lawyerName = card.querySelector('h3').textContent.toLowerCase();
    const specializations = Array.from(card.querySelectorAll('.spec-tag')).map(tag => tag.textContent.toLowerCase());
    
    const matchesQuery = !filters.query || 
      lawyerName.includes(filters.query) || 
      specializations.some(spec => spec.includes(filters.query));
    
    if (matchesQuery) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function applyMarketplaceFilters() {
  // Collect all filter values and apply them
  showToast('info', 'Filters Applied', 'Search results updated based on your criteria.');
}

function viewLawyerProfile(lawyerId) {
  showToast('info', 'Lawyer Profile', `Loading detailed profile for ${lawyerId}...`);
  
  // Simulate opening lawyer profile modal
  setTimeout(() => {
    showToast('success', 'Profile Loaded', 'Lawyer profile details are now available.');
  }, 1500);
}

function connectWithLawyer(lawyerId) {
  showToast('info', 'Connecting', `Initiating connection with ${lawyerId}...`);
  
  // Simulate handoff confirmation
  setTimeout(() => {
    const confirmed = confirm('Share your case summary with this lawyer?');
    if (confirmed) {
      showToast('success', 'Connected!', 'Your case has been shared with the lawyer. They will contact you soon.');
    }
  }, 1000);
}

// Documents Functions
function initializeDocuments() {
  // Initialize document management interface
  setupDocumentUpload();
  setupDocumentActions();
}

function setupDocumentUpload() {
  const uploadArea = $('#upload-area');
  const fileInput = $('#file-input');
  
  if (uploadArea && fileInput) {
    // Click to upload
    uploadArea.addEventListener('click', () => {
      fileInput.click();
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = 'var(--primary-color)';
      uploadArea.style.background = 'rgba(90, 49, 244, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.style.borderColor = 'rgba(90, 49, 244, 0.3)';
      uploadArea.style.background = 'rgba(90, 49, 244, 0.05)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      handleFileUpload(files);
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
      const files = e.target.files;
      handleFileUpload(files);
    });
  }
}

function handleFileUpload(files) {
  Array.from(files).forEach(file => {
    showToast('info', 'Upload Started', `Uploading ${file.name}...`);
    
    // Simulate upload progress
    simulateDocumentUpload(file).then(result => {
      if (result.success) {
        showToast('success', 'Upload Complete', `${file.name} uploaded successfully.`);
        // Add to document list
        addDocumentToList(result);
      } else {
        showToast('error', 'Upload Failed', `Failed to upload ${file.name}.`);
      }
    });
  });
}

function addDocumentToList(document) {
  // Add new document row to the table
  const tableBody = $('.documents-table');
  const newRow = createElement('div', 'table-row');
  
  newRow.innerHTML = `
    <div class="col-name">
      <i class="fas fa-file-pdf"></i>
      <span>${document.name}</span>
    </div>
    <div class="col-type">
      <span class="doc-type evidence">New</span>
    </div>
    <div class="col-date">${new Date().toISOString().split('T')[0]}</div>
    <div class="col-size">${(document.size / 1024 / 1024).toFixed(1)} MB</div>
    <div class="col-status">
      <span class="status-badge processing">Processing</span>
    </div>
    <div class="col-actions">
      <button class="action-btn disabled"><i class="fas fa-eye"></i></button>
      <button class="action-btn disabled"><i class="fas fa-download"></i></button>
      <button class="action-btn disabled"><i class="fas fa-share"></i></button>
      <button class="action-btn danger" onclick="deleteDocument('${document.fileId}')"><i class="fas fa-trash"></i></button>
    </div>
  `;
  
  tableBody.appendChild(newRow);
}

function setupDocumentActions() {
  // Document action handlers are set up via onclick attributes in HTML
}

function viewDocument(docId) {
  showToast('info', 'Opening Document', 'Loading document preview...');
  
  // Show document preview
  const preview = $('#document-preview');
  if (preview) {
    preview.classList.remove('hidden');
    
    // Simulate OCR text loading
    setTimeout(() => {
      const textContent = preview.querySelector('.text-content');
      textContent.innerHTML = '<p>Sample extracted text from the document. This demonstrates the OCR functionality that would extract readable content for better searchability and analysis.</p>';
    }, 1000);
  }
}

function downloadDocument(docId) {
  showToast('info', 'Download Started', 'Preparing document for download...');
  
  setTimeout(() => {
    showToast('success', 'Download Ready', 'Document download completed.');
  }, 1500);
}

function shareDocument(docId) {
  showToast('info', 'Sharing Document', 'Generating secure share link...');
  
  setTimeout(() => {
    showToast('success', 'Share Link Ready', 'Secure sharing link has been generated.');
  }, 1000);
}

function deleteDocument(docId) {
  const confirmed = confirm('Are you sure you want to delete this document? This action cannot be undone.');
  
  if (confirmed) {
    showToast('success', 'Document Deleted', 'Document has been permanently removed.');
    // Remove from UI
    // In a real app, this would remove the table row
  }
}

function closeDocumentPreview() {
  const preview = $('#document-preview');
  if (preview) {
    preview.classList.add('hidden');
  }
}

function togglePIIRedaction() {
  showToast('info', 'PII Redaction', 'Toggling personal information redaction mode...');
  
  setTimeout(() => {
    showToast('success', 'Redaction Updated', 'Personal information visibility has been toggled.');
  }, 1000);
}

// Analytics Functions
function initializeAnalytics() {
  renderAnalyticsCharts();
  updateKPICards();
}

function renderAnalyticsCharts() {
  // Monthly Trends Chart
  const monthlyCtx = $('#monthlyTrendsChart');
  if (monthlyCtx && !monthlyCtx.chart) {
    monthlyCtx.chart = new Chart(monthlyCtx, {
      type: 'line',
      data: {
        labels: DemoData.analytics.monthly_trends.map(item => item.month),
        datasets: [{
          label: 'Cases',
          data: DemoData.analytics.monthly_trends.map(item => item.cases),
          borderColor: '#5A31F4',
          backgroundColor: 'rgba(90, 49, 244, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  // Topic Distribution Chart
  const topicCtx = $('#topicDistributionChart');
  if (topicCtx && !topicCtx.chart) {
    topicCtx.chart = new Chart(topicCtx, {
      type: 'doughnut',
      data: {
        labels: DemoData.analytics.topic_distribution.map(item => item.category),
        datasets: [{
          data: DemoData.analytics.topic_distribution.map(item => item.percentage),
          backgroundColor: [
            '#5A31F4',
            '#00D1C1', 
            '#FF6B6B',
            '#FFD700',
            '#9C27B0'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  // Readiness Score Chart
  const readinessCtx = $('#readinessScoreChart');
  if (readinessCtx && !readinessCtx.chart) {
    const readinessData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Case Readiness Score',
        data: [25, 45, 60, 70, 75, 85],
        borderColor: '#00D1C1',
        backgroundColor: 'rgba(0, 209, 193, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    };
    
    readinessCtx.chart = new Chart(readinessCtx, {
      type: 'line',
      data: readinessData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}

function updateKPICards() {
  // Update KPI values with animation
  const kpiValues = $$('.kpi-value');
  kpiValues.forEach((element, index) => {
    const targetValue = element.textContent;
    animateValue(element, 0, parseInt(targetValue.replace(/[^0-9]/g, '')), 1500, targetValue.includes('m') ? 'm' : '');
  });
}

function animateValue(element, start, end, duration, suffix = '') {
  const startTimestamp = performance.now();
  
  function step(timestamp) {
    const elapsed = timestamp - startTimestamp;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    
    element.textContent = current.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

// AI Insights Functions
function initializeAIInsights() {
  setupAIControls();
  updateRAGStatus();
}

function setupAIControls() {
  // Mode toggle buttons
  $$('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const mode = btn.dataset.mode;
      showToast('info', 'AI Mode Changed', `Switched to ${mode} mode.`);
    });
  });
  
  // Sensitivity slider
  const sensitivitySlider = $('.sensitivity-slider');
  if (sensitivitySlider) {
    sensitivitySlider.addEventListener('input', (e) => {
      const value = e.target.value;
      showToast('info', 'Sensitivity Updated', `AI sensitivity level set to ${value}.`);
    });
  }
}

function updateRAGStatus() {
  // Animate connection indicators
  $$('.connection-indicator').forEach((indicator, index) => {
    setTimeout(() => {
      indicator.style.animation = 'pulse 2s infinite';
    }, index * 500);
  });
}

function generateDocument() {
  const templateSelector = $('.template-selector');
  const selectedTemplate = templateSelector.value;
  
  if (!selectedTemplate || selectedTemplate === 'Select Template') {
    showToast('error', 'No Template Selected', 'Please select a document template first.');
    return;
  }
  
  showToast('info', 'Generating Document', `Creating ${selectedTemplate} using AI...`);
  
  // Show preview area
  const previewArea = $('#ai-document-preview');
  previewArea.classList.remove('hidden');
  
  // Simulate document generation
  setTimeout(() => {
    const generatedContent = $('#generated-content');
    
    // Sample generated content based on template
    const templates = {
      'case-summary': `<h3>Case Summary - Workplace Harassment</h3><p><strong>Case ID:</strong> NS-2025-001</p><p><strong>Summary:</strong> This case involves workplace harassment allegations against a supervisor, with documented incidents over a 3-month period.</p><p><strong>Legal Framework:</strong> POSH Act 2013, IPC Section 354A</p><p><strong>Recommended Actions:</strong> File formal complaint with Internal Committee, gather additional witness statements, document all interactions.</p>`,
      'fir-draft': `<h3>First Information Report (Draft)</h3><p><strong>To:</strong> Station House Officer</p><p><strong>Subject:</strong> Complaint regarding workplace harassment</p><p>I, [Name], hereby lodge this complaint regarding incidents of harassment at my workplace...</p>`,
      'notice': `<h3>Legal Notice</h3><p><strong>To:</strong> [Recipient Name]</p><p><strong>Subject:</strong> Notice regarding workplace harassment</p><p>Take notice that you have been engaging in conduct that constitutes harassment...</p>`,
      'bail-grounds': `<h3>Bail Application Grounds</h3><p><strong>Honorable Court,</strong></p><p>The applicant submits the following grounds for bail:</p><p>1. The applicant is innocent and falsely implicated...</p>`
    };
    
    generatedContent.innerHTML = templates[selectedTemplate] || '<p>Document content generated successfully.</p>';
    
    showToast('success', 'Document Generated', 'AI-generated document is ready for review.');
  }, 2000);
}

function editDocument() {
  showToast('info', 'Edit Mode', 'Opening document editor...');
}

function downloadGenerated() {
  showToast('info', 'Preparing Download', 'Generating PDF version...');
  
  setTimeout(() => {
    showToast('success', 'Download Ready', 'AI-generated document downloaded successfully.');
  }, 1500);
}

function initiateHandoff() {
  const includeTranscript = $('input[type="checkbox"]').checked;
  const urgency = $('.urgency-btn.active').dataset.urgency;
  
  showToast('info', 'Initiating Handoff', `Preparing case bundle (${urgency} priority)...`);
  
  setTimeout(() => {
    showToast('success', 'Handoff Complete', 'Case has been successfully sent to selected lawyer.');
  }, 2000);
}

function runAutomation(type) {
  const automations = {
    checklist: 'Generated document checklist based on case type.',
    timeline: 'Predicted case timeline: 4-6 months for resolution.',
    status: 'Case status update email composed and ready to send.'
  };
  
  showToast('info', 'Running Automation', `Executing ${type} automation...`);
  
  setTimeout(() => {
    showToast('success', 'Automation Complete', automations[type]);
  }, 1500);
}

// Policies Functions
function initializePolicies() {
  setupPolicySections();
}

function setupPolicySections() {
  // All policy section handlers are in the HTML onclick attributes
}

function togglePolicySection(sectionId) {
  const section = $(`#${sectionId}`);
  const header = section.previousElementSibling;
  
  if (section.classList.contains('expanded')) {
    section.classList.remove('expanded');
    header.classList.remove('expanded');
  } else {
    section.classList.add('expanded');
    header.classList.add('expanded');
  }
}

function downloadPolicy(policyType) {
  showToast('info', 'Generating PDF', `Preparing ${policyType} policy document...`);
  
  setTimeout(() => {
    showToast('success', 'Download Ready', `${policyType} policy PDF downloaded successfully.`);
    
    // Simulate PDF download
    const blob = new Blob([`${policyType} Policy Content`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nyaysaathi-${policyType}-policy.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, 1500);
}

// Settings Functions
function initializeSettings() {
  setupSettingsControls();
}

function setupSettingsControls() {
  // Theme buttons
  $$('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });
  
  // Font size slider
  const fontSlider = $('.font-size-slider');
  if (fontSlider) {
    const display = fontSlider.parentElement.querySelector('.slider-display');
    
    fontSlider.addEventListener('input', (e) => {
      const size = e.target.value;
      display.textContent = `${size}px`;
      document.documentElement.style.fontSize = `${size}px`;
    });
  }
  
  // Toggle switches
  $$('.setting-toggle').forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const setting = e.target.parentElement.textContent.trim();
      showToast('info', 'Setting Updated', `${setting} has been ${e.target.checked ? 'enabled' : 'disabled'}.`);
    });
  });
}

function applyTheme(theme) {
  showToast('info', 'Theme Changed', `Switching to ${theme} theme...`);
  
  // Apply theme class to document
  document.documentElement.className = '';
  if (theme !== 'auto') {
    document.documentElement.classList.add(`theme-${theme}`);
  }
}

function exportUserData() {
  showToast('info', 'Preparing Export', 'Collecting your data for export...');
  
  setTimeout(() => {
    const userData = {
      profile: AppState.currentUser,
      cases: DemoData.cases,
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true
      },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nyaysaathi-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('success', 'Data Exported', 'Your data has been exported successfully.');
  }, 2000);
}

function deleteAccount() {
  const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.');
  
  if (confirmed) {
    const doubleConfirm = confirm('This will permanently delete all your cases, documents, and account information. Type "DELETE" to confirm.');
    
    if (doubleConfirm) {
      showToast('error', 'Account Deletion', 'Account deletion initiated. You will receive a confirmation email.');
    }
  }
}

// Help Functions
function initializeHelp() {
  setupHelpSearch();
  setupFAQHandlers();
}

function setupHelpSearch() {
  const searchInput = $('.help-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      searchHelpContent(query);
    });
  }
}

function searchHelpContent(query) {
  const faqItems = $$('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question span').textContent.toLowerCase();
    const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
    
    if (question.includes(query) || answer.includes(query) || !query) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function setupFAQHandlers() {
  // FAQ handlers are set up via HTML onclick attributes
}

function toggleFAQ(faqId) {
  const answer = $(`#${faqId}`);
  const question = answer.previousElementSibling;
  
  if (answer.classList.contains('expanded')) {
    answer.classList.remove('expanded');
    question.classList.remove('expanded');
  } else {
    answer.classList.add('expanded');
    question.classList.add('expanded');
  }
}

function submitSupportRequest() {
  const subject = $('.form-select').value;
  const message = $('.form-textarea').value;
  const includeCase = $('.form-checkbox input').checked;
  
  if (!subject || subject === 'Select a topic') {
    showToast('error', 'Missing Subject', 'Please select a subject for your support request.');
    return;
  }
  
  if (!message.trim()) {
    showToast('error', 'Missing Message', 'Please describe your issue or question.');
    return;
  }
  
  showToast('info', 'Submitting Request', 'Sending your support request...');
  
  // Simulate API call
  setTimeout(() => {
    showToast('success', 'Request Submitted', 'Your support request has been submitted. We\'ll respond within 24 hours.');
    
    // Clear form
    $('.form-select').selectedIndex = 0;
    $('.form-textarea').value = '';
    $('.form-checkbox input').checked = false;
  }, 1500);
}

// AI Assistant Functions
function toggleAIAssistant() {
  const panel = $('#ai-chat-panel');
  panel.classList.toggle('hidden');
  AppState.aiAssistantOpen = !AppState.aiAssistantOpen;
}

// Modal Functions
function showModal(modalId) {
  const overlay = $('#modal-overlay');
  overlay.classList.remove('hidden');
  
  // Create modal content based on modalId
  // This is a placeholder for modal functionality
}

function closeModal() {
  const overlay = $('#modal-overlay');
  overlay.classList.add('hidden');
}

// Language Functions
function switchLanguage(lang) {
  // Update active language button
  $$('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  showToast('info', 'Language Changed', `Language switched to ${lang === 'en' ? 'English' : 'हिंदी'}`);
}



// Event Listeners
function attachEventListeners() {
  // Navigation
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (page) {
        navigateTo(page);
      }
    });
  });
  
  // Role cards
  $$('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.dataset.role;
      if (role) {
        selectRole(role);
      }
    });
  });
  
  // Language toggle
  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      switchLanguage(lang);
    });
  });
  
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.widget-menu')) {
      $$('.widget-menu-dropdown').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    }
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape key closes modals and dropdowns
    if (e.key === 'Escape') {
      closeModal();
      $$('.widget-menu-dropdown').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });
    }
  });
}

// Responsive Functions
function handleResize() {
  // Handle responsive behavior
  const width = window.innerWidth;
  
  if (width <= 1024) {
    AppState.sidebarCollapsed = true;
    $('#sidebar').classList.add('collapsed');
  }
}

// Initialization
function initializeApp() {
  console.log('NyaySaathi Application Initializing...');
  
  // Hide loading screen after initial load
  setTimeout(() => {
    $('#loading-screen').style.display = 'none';
  }, 1000);
  
  // Attach event listeners
  attachEventListeners();
  
  // Handle responsive design
  window.addEventListener('resize', handleResize);
  handleResize();
  
  // Initialize dashboard if in main app
  if (!$('#main-app').classList.contains('hidden')) {
    initializeDashboard();
  }
  
  console.log('NyaySaathi Application Ready!');
}

// Advanced Features (Placeholder implementations)

// Document Upload Simulation
function simulateDocumentUpload(file) {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      // Update progress UI here
      
      if (progress >= 100) {
        clearInterval(interval);
        resolve({
          success: true,
          fileId: `doc_${Date.now()}`,
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    }, 100);
  });
}

// AI Response Generation Simulation
function generateAIResponse(userInput) {
  const responses = [
    "I understand your situation. Let me provide some guidance based on similar cases.",
    "Based on the information provided, here are the relevant legal sections that apply.",
    "This appears to be a case that requires documentation. Let me explain what evidence you'll need.",
    "I can see this is concerning for you. Let me walk you through the typical process and timeline."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Risk Assessment Calculation
function calculateRiskAssessment(caseData) {
  // Simulate risk calculation based on various factors
  const factors = {
    oppositionStrength: Math.random() * 100,
    evidenceQuality: Math.random() * 100,
    timelineUrgency: Math.random() * 100,
    legalComplexity: Math.random() * 100
  };
  
  const averageRisk = Object.values(factors).reduce((a, b) => a + b, 0) / 4;
  
  return {
    overall: averageRisk,
    factors: factors,
    level: averageRisk < 33 ? 'Low' : averageRisk < 66 ? 'Medium' : 'High'
  };
}

// Lawyer Matching Algorithm
function matchLawyers(caseData, preferences = {}) {
  return DemoData.lawyers
    .filter(lawyer => {
      // Filter by availability if required
      if (preferences.availableOnly && !lawyer.availability) {
        return false;
      }
      
      // Filter by location if specified
      if (preferences.location && !lawyer.location.includes(preferences.location)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by rating and response time
      return (b.rating - a.rating) || (parseInt(a.response_time) - parseInt(b.response_time));
    });
}

// Case Progress Tracking
function updateCaseProgress(caseId, newStatus, completion) {
  const caseIndex = DemoData.cases.findIndex(c => c.id === caseId);
  if (caseIndex !== -1) {
    DemoData.cases[caseIndex].status = newStatus;
    DemoData.cases[caseIndex].completion = completion;
    
    // Update UI elements
    updateDashboardWidgets();
    
    showToast('success', 'Case Updated', `Case ${caseId} status updated to: ${newStatus}`);
  }
}

function updateDashboardWidgets() {
  // Re-initialize dashboard widgets with updated data
  if (AppState.currentPage === 'dashboard') {
    initializeDashboard();
  }
}

// Search and Filter Functions
function searchLawyers(query, filters = {}) {
  return DemoData.lawyers.filter(lawyer => {
    // Text search
    const matchesQuery = !query || 
      lawyer.name.toLowerCase().includes(query.toLowerCase()) ||
      lawyer.specialization.some(spec => spec.toLowerCase().includes(query.toLowerCase())) ||
      lawyer.location.toLowerCase().includes(query.toLowerCase());
    
    // Filter by specialization
    const matchesSpecialization = !filters.specialization ||
      lawyer.specialization.includes(filters.specialization);
    
    // Filter by rating
    const matchesRating = !filters.minRating ||
      lawyer.rating >= filters.minRating;
    
    // Filter by fee range
    const matchesFee = !filters.maxFee ||
      parseInt(lawyer.fee_structure.replace(/[^0-9]/g, '')) <= filters.maxFee;
    
    return matchesQuery && matchesSpecialization && matchesRating && matchesFee;
  });
}

// Export Functions
function exportCaseSummary(format = 'pdf') {
  showToast('info', 'Generating Export', `Preparing case summary in ${format.toUpperCase()} format...`);
  
  // Simulate export generation
  setTimeout(() => {
    showToast('success', 'Export Ready', `Case summary exported successfully as ${format.toUpperCase()}.`);
    
    // In a real implementation, this would trigger a download
    const blob = new Blob(['Case Summary Content'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case_summary_${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }, 2000);
}

// Accessibility Functions
function initializeAccessibility() {
  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  // Mouse click removes keyboard navigation styles
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Screen reader announcements
  function announceToScreenReader(message) {
    const announcement = createElement('div', 'sr-only');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
}

// Performance Monitoring
function initializePerformanceMonitoring() {
  // Monitor page load times
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  });
  
  // Monitor navigation times
  const originalNavigateTo = navigateTo;
  navigateTo = function(pageName) {
    const startTime = performance.now();
    originalNavigateTo(pageName);
    const endTime = performance.now();
    console.log(`Navigation to ${pageName} took ${(endTime - startTime).toFixed(2)}ms`);
  };
}

// Error Handling
function setupErrorHandling() {
  window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
    showToast('error', 'System Error', 'An unexpected error occurred. Please try again.');
  });
  
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    showToast('error', 'Connection Error', 'Failed to connect to service. Please check your connection.');
  });
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeAccessibility();
    initializePerformanceMonitoring();
    setupErrorHandling();
  });
} else {
  initializeApp();
  initializeAccessibility();
  initializePerformanceMonitoring();
  setupErrorHandling();
}

// Global functions for HTML onclick handlers
window.startDemo = startDemo;
window.selectRole = selectRole;
window.toggleSidebar = toggleSidebar;
window.navigateTo = navigateTo;
window.toggleWidgetMenu = toggleWidgetMenu;
window.exportWidget = exportWidget;
window.toggleFAB = toggleFAB;
window.startIntake = startIntake;
window.selectAgeRange = selectAgeRange;
window.selectCategory = selectCategory;
window.handleChatInput = handleChatInput;
window.sendMessage = sendMessage;
window.toggleVoiceInput = toggleVoiceInput;
window.nextOutcome = nextOutcome;
window.previousOutcome = previousOutcome;
window.toggleSection = toggleSection;
window.toggleAIAssistant = toggleAIAssistant;
window.closeModal = closeModal;
window.switchLanguage = switchLanguage;

// Case Summary functions
window.switchCaseTab = switchCaseTab;
window.editCase = editCase;
window.exportCaseSummary = exportCaseSummary;

// Marketplace functions
window.viewLawyerProfile = viewLawyerProfile;
window.connectWithLawyer = connectWithLawyer;

// Document functions
window.viewDocument = viewDocument;
window.downloadDocument = downloadDocument;
window.shareDocument = shareDocument;
window.deleteDocument = deleteDocument;
window.closeDocumentPreview = closeDocumentPreview;
window.togglePIIRedaction = togglePIIRedaction;

// AI Insights functions
window.generateDocument = generateDocument;
window.editDocument = editDocument;
window.downloadGenerated = downloadGenerated;
window.initiateHandoff = initiateHandoff;
window.runAutomation = runAutomation;

// Policies functions
window.togglePolicySection = togglePolicySection;
window.downloadPolicy = downloadPolicy;

// Settings functions
window.exportUserData = exportUserData;
window.deleteAccount = deleteAccount;

// Help functions
window.toggleFAQ = toggleFAQ;
window.submitSupportRequest = submitSupportRequest;

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AppState,
    DemoData,
    navigateTo,
    showToast,
    calculateRiskAssessment,
    matchLawyers,
    searchLawyers
  };
}