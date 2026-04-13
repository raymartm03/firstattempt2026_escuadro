<script setup>
import { ref, computed } from 'vue'

// Current page state
const currentPage = ref('login')
const activeTab = ref('new')
const paymentFilter = ref('all')
const documentLogFilter = ref('all')
const userType = ref('student')

// Login data
const studentNumber = ref('')
const password = ref('')
const showPassword = ref(false)

// Inventory order selection
const selectedOrder = ref(500)
const showOrderConfirm = ref(false)

// Document log expanded item
const expandedLog = ref(null)

// Payment verify modal
const verifyingPayment = ref(null)

// Document data
const documents = ref([
  { id: 1, name: 'Transcript of Records', description: 'Official academic transcript with all courses and grades', price: 150, processingTime: '5-7 business days', icon: '📄', color: '#EEF2FF' },
  { id: 2, name: 'Certified True Copy of Diploma', description: 'Authenticated copy of your diploma', price: 200, processingTime: '3-5 business days', icon: '🎓', color: '#F3E8FF' },
  { id: 3, name: 'Certificate of Graduation', description: 'Official certificate confirming degree completion', price: 100, processingTime: '2-3 business days', icon: '🏫', color: '#ECFDF5' },
  { id: 4, name: 'Certificate of Enrollment', description: 'Proof of current or past enrollment', price: 80, processingTime: '1-2 business days', icon: '📋', color: '#FFF7ED' },
  { id: 5, name: 'Certificate of General Weighted Average', description: 'Official GWA certification', price: 80, processingTime: '2-3 business days', icon: '🏅', color: '#F3E8FF' },
  { id: 6, name: 'Honorable Dismissal', description: 'Certificate of good standing for transfer', price: 100, processingTime: '3-5 business days', icon: '🛡️', color: '#ECFDF5' },
  { id: 7, name: 'Document Authentication', description: 'Red ribbon authentication service', price: 250, processingTime: '7-10 business days', icon: '🔐', color: '#FEF2F2' },
  { id: 8, name: 'Certification, Authentication & Verification (CAV)', description: 'Complete document verification package', price: 300, processingTime: '10-14 business days', icon: '✅', color: '#EEF2FF' }
])

const selectedDocument = ref(null)

// Student document requests
const studentRequests = ref([
  { id: '#TOR-2024-0342', name: 'Official Transcript of Records', status: 'Pending Upload', progress: '2/3 requirements submitted', eta: null, rush: '+₱200' },
  { id: '#DIP-2024-0198', name: 'Certified Diploma Copy', status: 'Processing', progress: null, eta: '3-5 days', rush: '+₱300' },
  { id: '#COG-2024-0521', name: 'Certificate of Graduation', status: 'Ready', progress: null, eta: null, expires: '11 days 8 hours' }
])

// Admin profile management data
const profileRequests = ref([
  { name: 'Juan Dela Cruz', degree: 'BS Computer Science', batch: '2020', priority: 'URGENT', date: 'Feb 27, 2026', status: 'Pending' },
  { name: 'Maria Clara Santos', degree: 'AB Psychology', batch: '2018', priority: 'NORMAL', date: 'Feb 26, 2026', status: 'Processed' },
  { name: 'Roberto Gomez', degree: 'BS Architecture', batch: '2015', priority: 'LOW', date: 'Feb 25, 2026', status: 'Verified' },
  { name: 'Anna Patricia Lim', degree: 'BS Accountancy', batch: '2022', priority: 'NORMAL', date: 'Feb 25, 2026', status: 'Pending' }
])

const profileFilter = ref('ALL')

const filteredProfiles = computed(() => {
  if (profileFilter.value === 'ALL') return profileRequests.value
  return profileRequests.value.filter(r => r.priority === profileFilter.value)
})

// Document log data
const documentLogs = ref([
  { id: 'LOG-882910', document: 'Transcript of Records', priority: 'URGENT', name: 'De Los Reyes, Juan A.', studentId: '19-4502', course: 'BS CS', date: 'Today, 10:45 AM', code: 'BC-990-TR', status: 'urgent' },
  { id: 'LOG-882908', document: 'Diploma', priority: 'LOGGED', name: 'Santos, Maria Clara', studentId: '20-1192', course: 'AB POS', date: 'Today, 09:12 AM', code: 'BC-412-DP', status: 'logged' },
  { id: 'LOG-882901', document: 'Certificate of Enrollment', priority: 'RELEASED', name: 'Aguinaldo, Emilio Q.', studentId: '21-0083', course: 'BS MGT', date: 'Yesterday, 04:30 PM', code: 'BC-182-CE', status: 'released' }
])

const filteredLogs = computed(() => {
  if (documentLogFilter.value === 'all') return documentLogs.value
  if (documentLogFilter.value === 'pending') return documentLogs.value.filter(l => l.status === 'urgent' || l.status === 'logged')
  if (documentLogFilter.value === 'released') return documentLogs.value.filter(l => l.status === 'released')
  return documentLogs.value
})

// Payment data
const payments = ref([
  { name: 'Santos, Maria Clara', type: 'TUITION FEE', date: 'Feb 28, 11:02 AM', method: 'GCash', code: 'ATN-112-M202', amount: '₱45,200.50', rawAmount: 45200.50, status: 'pending' },
  { name: 'Reyes, John Mark', type: 'TRANSCRIPT REQUEST', date: 'Feb 28, 09:30 AM', method: 'Bank Transfer', code: 'ATN-113-M203', amount: '₱150.00', rawAmount: 150, status: 'pending' },
  { name: 'Gomez, Roberto', type: 'DIPLOMA REQUEST', date: 'Feb 27, 02:15 PM', method: 'Credit Card', code: 'ATN-114-M204', amount: '₱200.00', rawAmount: 200, status: 'verified' }
])

const filteredPayments = computed(() => {
  if (paymentFilter.value === 'all') return payments.value
  if (paymentFilter.value === 'pending') return payments.value.filter(p => p.status === 'pending')
  if (paymentFilter.value === 'flagged') return payments.value.filter(p => p.flagged)
  return payments.value
})

const inventoryItem = ref({
  name: 'Diploma Paper',
  description: 'Official Parchment - A4 120gsm',
  sheetsLeft: 150,
  reorderPoint: 500,
  minRequired: 500,
  dailyUsage: 35,
  daysLeft: 4,
  lastOrder: 'Jan 12'
})

// Navigation
const handleLogin = () => {
  if (userType.value === 'admin') currentPage.value = 'adminDashboard'
  else currentPage.value = 'studentDashboard'
}

const goToStudentDashboard = () => { currentPage.value = 'studentDashboard' }
const goToRequestDocuments = () => { currentPage.value = 'requestDocuments'; activeTab.value = 'new' }
const goToProcessDocuments = () => { currentPage.value = 'processDocuments' }
const goToStudentPassport = () => { currentPage.value = 'studentPassport' }
const goToAdminDashboard = () => { currentPage.value = 'adminDashboard' }
const goToProfileManagement = () => { currentPage.value = 'profileManagement' }
const goToDocumentLog = () => { currentPage.value = 'documentLog' }
const goToInventoryAlerts = () => { currentPage.value = 'inventoryAlerts' }
const goToPaymentVerification = () => { currentPage.value = 'paymentVerification' }
const goToAdminPassport = () => { currentPage.value = 'adminPassport' }
const logout = () => { currentPage.value = 'login'; studentNumber.value = ''; password.value = '' }

const goToRequestDocument = (doc) => {
  selectedDocument.value = doc
  currentPage.value = 'confirmRequest'
}

const confirmRequest = () => {
  alert('Redirecting to payment gateway...')
  currentPage.value = 'studentDashboard'
}

const cancelRequest = () => {
  currentPage.value = 'requestDocuments'
}

const toggleLog = (id) => {
  expandedLog.value = expandedLog.value === id ? null : id
}

const openVerifyPayment = (payment) => {
  verifyingPayment.value = payment
}

const confirmVerifyPayment = () => {
  if (verifyingPayment.value) {
    verifyingPayment.value.status = 'verified'
    verifyingPayment.value = null
  }
}

const confirmOrder = () => {
  showOrderConfirm.value = false
  alert(`Order placed for ${selectedOrder.value} sheets of Diploma Paper`)
}

const getStatusColor = (status) => {
  if (status === 'urgent') return '#FF3B30'
  if (status === 'logged') return '#FF9500'
  if (status === 'released') return '#34C759'
  return '#999'
}

const getLogBorderColor = (status) => {
  if (status === 'urgent') return '#FF3B30'
  if (status === 'logged') return '#FF9500'
  if (status === 'released') return '#34C759'
  return '#e0e0e0'
}
</script>

<template>
  <!-- ===================== LOGIN PAGE ===================== -->
  <div v-if="currentPage === 'login'" class="login-bg">
    <div class="login-card">
      <div class="login-logo">
        <div class="logo-crest">🏛️</div>
        <h1 class="login-title">Welcome, <span class="gold">Blue Knight</span></h1>
        <p class="login-sub">Alumni Knights' Hub</p>
        <div class="login-divider"></div>
      </div>

      <div class="user-toggle">
        <button :class="['toggle-btn', { active: userType === 'student' }]" @click="userType = 'student'">Student</button>
        <button :class="['toggle-btn', { active: userType === 'admin' }]" @click="userType = 'admin'">Admin/Staff</button>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="field-group">
          <label class="field-label">{{ userType === 'admin' ? 'EMPLOYEE NUMBER' : 'STUDENT NUMBER' }}</label>
          <div class="field-wrap">
            <span class="field-ico">👤</span>
            <input v-model="studentNumber" type="text" :placeholder="userType === 'admin' ? 'e.g. 30276752' : 'e.g. 20210001'" required class="field-input" />
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">PASSWORD</label>
          <div class="field-wrap">
            <span class="field-ico">🔒</span>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" required class="field-input" />
            <span class="field-eye" @click="showPassword = !showPassword">{{ showPassword ? '🙈' : '👁️' }}</span>
          </div>
        </div>
        <div class="forgot-row">
          <a href="#" @click.prevent class="forgot-link">Forgot password?</a>
        </div>
        <button type="submit" class="btn-signin">Sign In</button>
        <div class="or-row"><span>OR</span></div>
        <button type="button" class="btn-google" @click="() => {}">
          <span class="g-icon">G</span> Sign in using university email
        </button>
        <p class="register-row">Don't have an account? <a href="#" @click.prevent class="register-link">Register</a></p>
      </form>
    </div>
  </div>

  <!-- ===================== STUDENT LAYOUT ===================== -->
  <div v-if="['studentDashboard','requestDocuments','processDocuments','studentPassport'].includes(currentPage)" class="app-layout">
    <aside class="sidebar">
      <div class="sb-logo">
        <span class="sb-crest">🏛️</span>
        <span class="sb-title">Alumni Hub</span>
      </div>
      <nav class="sb-nav">
        <a :class="['sb-item', { active: currentPage === 'studentDashboard' }]" @click.prevent="goToStudentDashboard">
          <span class="sb-icon">🏠</span><span class="sb-label">Dashboard</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'requestDocuments' }]" @click.prevent="goToRequestDocuments">
          <span class="sb-icon">📄</span><span class="sb-label">Request Documents</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'processDocuments' }]" @click.prevent="goToProcessDocuments">
          <span class="sb-icon">⚙️</span><span class="sb-label">Process Documents</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'studentPassport' }]" @click.prevent="goToStudentPassport">
          <span class="sb-icon">🪪</span><span class="sb-label">My Passport</span>
        </a>
      </nav>
      <button class="sb-logout" @click="logout">
        <span>🚪</span> Logout
      </button>
    </aside>

    <div class="main-wrap">
      <header class="topbar">
        <div class="topbar-search">
          <span class="search-ico">🔍</span>
          <input type="text" placeholder="Search..." class="search-input" />
        </div>
        <div class="topbar-user">
          <div class="topbar-avatar">BK</div>
          <span class="topbar-name">Blue Knight</span>
        </div>
      </header>

      <!-- STUDENT DASHBOARD -->
      <main v-if="currentPage === 'studentDashboard'" class="page-content">
        <div class="page-header">
          <div class="uni-badge">
            <span class="uni-crest">🏛️</span>
          </div>
          <div>
            <h1 class="page-title">Welcome, <span class="navy">Blue</span> <span class="gold">Knight</span></h1>
            <p class="page-sub">Your verified academic records</p>
          </div>
        </div>

        <section class="section">
          <h2 class="section-title">Quick Actions</h2>
          <div class="quick-card">
            <div class="quick-item" @click="goToStudentPassport">
              <div class="quick-icon-wrap" style="background:#EEF2FF">
                <span>👤</span>
              </div>
              <div class="quick-text">
                <p class="quick-name">View Profile</p>
                <p class="quick-desc">Access verified academic records</p>
              </div>
              <span class="quick-arrow">→</span>
            </div>
            <div class="quick-divider"></div>
            <div class="quick-item" @click="goToRequestDocuments">
              <div class="quick-icon-wrap" style="background:#ECFDF5">
                <span>📄</span>
              </div>
              <div class="quick-text">
                <p class="quick-name">Request Document</p>
                <p class="quick-desc">Order transcripts & certifications</p>
              </div>
              <span class="quick-arrow">→</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">What You Can Do</h2>
          <div class="cando-grid">
            <div class="cando-card" @click="goToRequestDocuments">
              <div class="cando-icon" style="background:#EEF2FF">📄</div>
              <p class="cando-name">Request Documents</p>
              <p class="cando-sub">Order transcripts</p>
            </div>
            <div class="cando-card" @click="goToProcessDocuments">
              <div class="cando-icon" style="background:#ECFDF5">⬇️</div>
              <p class="cando-name">Process Documents</p>
              <p class="cando-sub">Pending</p>
            </div>
          </div>
        </section>

        <div class="help-banner" @click="() => {}">
          <div class="help-left">
            <span class="help-ico">🎧</span>
            <div>
              <p class="help-title">Need Help?</p>
              <p class="help-sub">Chat with our support team</p>
            </div>
          </div>
          <span class="help-arrow">→</span>
        </div>

        <section class="section">
          <h2 class="section-title">Latest Notifications</h2>
          <div class="notif-card">
            <div class="notif-icon">✅</div>
            <div class="notif-text">
              <p class="notif-title">Transcript Request Approved</p>
              <p class="notif-sub">Your Official Transcript of Records is ready</p>
            </div>
          </div>
        </section>

        <p class="footer-secure">🔒 All credentials are cryptographically secured and verified by the AdDU Registrar's Office</p>
      </main>

      <!-- REQUEST DOCUMENTS -->
      <main v-if="currentPage === 'requestDocuments'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <h1 class="page-title navy">Request Documents</h1>
        </div>

        <div class="tab-row">
          <button :class="['tab-btn', { active: activeTab === 'new' }]" @click="activeTab = 'new'">New Request</button>
          <button :class="['tab-btn', { active: activeTab === 'history' }]" @click="activeTab = 'history'">Request History</button>
        </div>

        <div v-if="activeTab === 'new'">
          <p class="select-hint">Select a document type to request</p>
          <div class="doc-list">
            <div v-for="doc in documents" :key="doc.id" class="doc-row" @click="goToRequestDocument(doc)">
              <div class="doc-ico-wrap" :style="{ background: doc.color }">
                <span>{{ doc.icon }}</span>
              </div>
              <div class="doc-info">
                <p class="doc-name">{{ doc.name }}</p>
                <p class="doc-desc">{{ doc.description }}</p>
                <div class="doc-meta">
                  <span class="doc-price">₱{{ doc.price }}</span>
                  <span class="doc-dot">•</span>
                  <span class="doc-time">🕐 {{ doc.processingTime }}</span>
                </div>
              </div>
              <span class="doc-arrow">→</span>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'history'" class="history-list">
          <div v-for="r in studentRequests" :key="r.id" class="history-row">
            <div>
              <p class="history-name">{{ r.name }}</p>
              <p class="history-id">{{ r.id }}</p>
            </div>
            <span :class="['history-status', r.status === 'Ready' ? 'h-ready' : r.status === 'Processing' ? 'h-proc' : 'h-pend']">{{ r.status }}</span>
          </div>
        </div>
      </main>

      <!-- PROCESS DOCUMENTS -->
      <main v-if="currentPage === 'processDocuments'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <div>
            <h1 class="page-title navy">Process Documents</h1>
            <p class="page-sub">Track your document requests</p>
          </div>
        </div>

        <div class="proc-stats">
          <div class="proc-stat">
            <span class="proc-num">3</span>
            <span class="proc-label">PENDING</span>
            <span class="proc-sub">Documents in process</span>
          </div>
          <div class="proc-stat warn">
            <span class="proc-num" style="color:#FF9500">2</span>
            <span class="proc-label">ATTENTION</span>
            <span class="proc-sub">Require uploads</span>
          </div>
        </div>

        <div class="requests-stack">
          <div v-for="req in studentRequests" :key="req.id" class="req-card">
            <div class="req-top">
              <div>
                <p class="req-name">{{ req.name }}</p>
                <p class="req-id">{{ req.id }}</p>
              </div>
              <span :class="['req-badge', req.status === 'Ready' ? 'rb-ready' : req.status === 'Processing' ? 'rb-proc' : 'rb-pend']">{{ req.status }}</span>
            </div>
            <div class="req-body">
              <p v-if="req.progress" class="req-progress">{{ req.progress }}</p>
              <p v-if="req.eta" class="req-eta">ETA: {{ req.eta }}</p>
              <p v-if="req.expires" class="req-expires">Expires in {{ req.expires }}</p>
            </div>
            <div class="req-foot">
              <button v-if="req.rush" class="btn-rush">Rush {{ req.rush }}</button>
              <button v-if="req.status === 'Ready'" class="btn-download">📥 Download Document</button>
            </div>
          </div>
        </div>
      </main>

      <!-- STUDENT PASSPORT -->
      <main v-if="currentPage === 'studentPassport'" class="page-content passport-page">
        <div class="passport-wrap">
          <div class="uni-badge centered"><span class="uni-crest">🏛️</span></div>
          <h1 class="passport-title">My <span class="gold">Student Passport</span></h1>
          <p class="passport-sub">Verified Digital Credential</p>

          <div class="passport-profile">
            <div class="pp-avatar">👤</div>
            <div class="pp-info">
              <p class="pp-name">Blue Knight</p>
              <p class="pp-id">Student No. 20210001</p>
              <span class="pp-verified">✅ Verified by Registrar</span>
            </div>
          </div>

          <div class="passport-fields">
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#EEF2FF">🎓</div>
              <div>
                <p class="pf-label">DEGREE</p>
                <p class="pf-val">Bachelor of Science in Computer Science</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#FFF3E0">📅</div>
              <div>
                <p class="pf-label">SINCE</p>
                <p class="pf-val">August 2021</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#FFF8E1">🏅</div>
              <div>
                <p class="pf-label">STATUS</p>
                <p class="pf-val">Active — Enrolled</p>
              </div>
            </div>
          </div>

          <div class="passport-contact">
            <h3 class="contact-title">Contact Information</h3>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#EEF2FF">✉️</div>
              <div>
                <p class="pf-label">EMAIL</p>
                <p class="pf-val">blue.knight@addu.edu.ph</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#ECFDF5">📞</div>
              <div>
                <p class="pf-label">PHONE</p>
                <p class="pf-val">+63 912 345 6789</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#FEF2F2">📍</div>
              <div>
                <p class="pf-label">LOCATION</p>
                <p class="pf-val">Davao City, Philippines</p>
              </div>
            </div>
          </div>

          <div class="addu-footer-card">
            <span class="addu-crest">🏛️</span>
            <div>
              <p class="addu-name">Ateneo de Davao University</p>
              <p class="addu-desc">This credential is cryptographically secured and synced with the AdDU Registrar's Office. Share it instantly with the admin for verification.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- ===================== ADMIN LAYOUT ===================== -->
  <div v-if="['adminDashboard','profileManagement','documentLog','inventoryAlerts','paymentVerification','adminPassport'].includes(currentPage)" class="app-layout">
    <aside class="sidebar">
      <div class="sb-logo">
        <span class="sb-crest">🏛️</span>
        <span class="sb-title">Alumni Hub</span>
      </div>
      <nav class="sb-nav">
        <a :class="['sb-item', { active: currentPage === 'adminDashboard' }]" @click.prevent="goToAdminDashboard">
          <span class="sb-icon">🏠</span><span class="sb-label">Dashboard</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'profileManagement' }]" @click.prevent="goToProfileManagement">
          <span class="sb-icon">👥</span><span class="sb-label">Profile Management</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'documentLog' }]" @click.prevent="goToDocumentLog">
          <span class="sb-icon">📋</span><span class="sb-label">Document Log</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'inventoryAlerts' }]" @click.prevent="goToInventoryAlerts">
          <span class="sb-icon">⚠️</span><span class="sb-label">Inventory Alerts</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'paymentVerification' }]" @click.prevent="goToPaymentVerification">
          <span class="sb-icon">💳</span><span class="sb-label">Payment Verification</span>
        </a>
        <a :class="['sb-item', { active: currentPage === 'adminPassport' }]" @click.prevent="goToAdminPassport">
          <span class="sb-icon">🪪</span><span class="sb-label">My Passport</span>
        </a>
      </nav>
      <button class="sb-logout" @click="logout">
        <span>🚪</span> Logout
      </button>
    </aside>

    <div class="main-wrap">
      <header class="topbar">
        <div class="topbar-search">
          <span class="search-ico">🔍</span>
          <input type="text" placeholder="Search..." class="search-input" />
        </div>
        <div class="topbar-user">
          <div class="topbar-avatar">JD</div>
          <span class="topbar-name">Juan Dela Cruz</span>
        </div>
      </header>

      <!-- ADMIN DASHBOARD -->
      <main v-if="currentPage === 'adminDashboard'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <div>
            <h1 class="page-title">Welcome, <span class="navy">Blue</span> <span class="gold">Knight</span></h1>
            <p class="page-sub">Ateneo's Unified academic records</p>
          </div>
        </div>

        <section class="section">
          <h2 class="section-title">Quick Actions</h2>
          <div class="quick-card">
            <div class="quick-item" @click="goToAdminPassport">
              <div class="quick-icon-wrap" style="background:#EEF2FF"><span>👤</span></div>
              <div class="quick-text">
                <p class="quick-name">View Profile</p>
                <p class="quick-desc">Employee's Information</p>
              </div>
              <span class="quick-arrow">→</span>
            </div>
            <div class="quick-divider"></div>
            <div class="quick-item" @click="goToProfileManagement">
              <div class="quick-icon-wrap" style="background:#ECFDF5"><span>✅</span></div>
              <div class="quick-text">
                <p class="quick-name">Verify Request</p>
                <p class="quick-desc">Validate pending student requests</p>
              </div>
              <span class="quick-arrow">→</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">What You Can Do</h2>
          <div class="cando-grid four">
            <div class="cando-card" @click="goToProfileManagement">
              <div class="cando-icon" style="background:#EEF2FF">👥</div>
              <p class="cando-name">Profile Management</p>
              <p class="cando-sub">Validate Request</p>
            </div>
            <div class="cando-card" @click="goToDocumentLog">
              <div class="cando-icon" style="background:#F0FDF4">📋</div>
              <p class="cando-name">Document Log</p>
              <p class="cando-sub">System activity history</p>
            </div>
            <div class="cando-card" @click="goToInventoryAlerts">
              <div class="cando-icon" style="background:#FFF7ED">⚠️</div>
              <p class="cando-name">Inventory Alerts</p>
              <p class="cando-sub">Stock level status</p>
            </div>
            <div class="cando-card" @click="goToPaymentVerification">
              <div class="cando-icon" style="background:#EEF2FF">💳</div>
              <p class="cando-name">Payment Verification</p>
              <p class="cando-sub">Audit finance records</p>
            </div>
          </div>
        </section>

        <div class="help-banner" @click="() => {}">
          <div class="help-left">
            <span class="help-ico">🎧</span>
            <div>
              <p class="help-title">Need Help?</p>
              <p class="help-sub">Chat with our support team</p>
            </div>
          </div>
          <span class="help-arrow">→</span>
        </div>

        <p class="footer-secure">🔒 All credentials are cryptographically secured and verified by the AdDU Registrar's Office</p>
      </main>

      <!-- PROFILE MANAGEMENT -->
      <main v-if="currentPage === 'profileManagement'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <h1 class="page-title navy">Profile Management</h1>
        </div>

        <div class="search-bar-full">
          <span>🔍</span>
          <input type="text" placeholder="Search by name, degree, or Request ID..." />
        </div>

        <div class="priority-pills">
          <button :class="['pill urgent-pill', { active: profileFilter === 'URGENT' }]" @click="profileFilter = profileFilter === 'URGENT' ? 'ALL' : 'URGENT'">❗ Urgent</button>
          <button :class="['pill normal-pill', { active: profileFilter === 'NORMAL' }]" @click="profileFilter = profileFilter === 'NORMAL' ? 'ALL' : 'NORMAL'">🕐 Normal</button>
          <button :class="['pill low-pill', { active: profileFilter === 'LOW' }]" @click="profileFilter = profileFilter === 'LOW' ? 'ALL' : 'LOW'">⬇ Low</button>
        </div>

        <div class="profile-list">
          <div v-for="r in filteredProfiles" :key="r.name" class="profile-row">
            <div class="pr-left">
              <p class="pr-name">{{ r.name }}</p>
              <p class="pr-meta">{{ r.degree }} • Batch {{ r.batch }}</p>
              <span :class="['pr-status', r.status.toLowerCase()]">{{ r.status }}</span>
            </div>
            <div class="pr-right">
              <span :class="['pr-priority', 'p-' + r.priority.toLowerCase()]">{{ r.priority }}</span>
              <p class="pr-date">{{ r.date }}</p>
              <button class="pr-view">View Details →</button>
            </div>
          </div>
        </div>
      </main>

      <!-- DOCUMENT LOG -->
      <main v-if="currentPage === 'documentLog'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <h1 class="page-title navy">Document Log</h1>
        </div>

        <div class="search-bar-full">
          <span>🔍</span>
          <input type="text" placeholder="Search by name, degree, or Request ID..." />
        </div>

        <div class="log-tabs">
          <button :class="['log-tab', { active: documentLogFilter === 'all' }]" @click="documentLogFilter = 'all'">All Logs</button>
          <button :class="['log-tab', { active: documentLogFilter === 'pending' }]" @click="documentLogFilter = 'pending'">Pending Release</button>
          <button :class="['log-tab', { active: documentLogFilter === 'released' }]" @click="documentLogFilter = 'released'">Released</button>
        </div>

        <p class="recent-label">Recent Activity</p>

        <div class="log-list">
          <div v-for="log in filteredLogs" :key="log.id" class="log-card" :style="{ borderLeftColor: getLogBorderColor(log.status) }" @click="toggleLog(log.id)">
            <div class="log-top">
              <span class="log-id">#{{ log.id }}</span>
              <span class="log-badge" :style="{ background: getStatusColor(log.status) }">{{ log.priority }}</span>
            </div>
            <p class="log-doc">{{ log.document }}</p>
            <div class="log-person">
              <span class="log-avatar">👤</span>
              <div>
                <p class="log-name">{{ log.name }}</p>
                <p class="log-meta">ID: {{ log.studentId }} | {{ log.course }}</p>
              </div>
            </div>
            <div class="log-foot">
              <span class="log-date">🕐 {{ log.date }}</span>
              <span class="log-code">▮▮▮ {{ log.code }}</span>
            </div>
            <!-- QR code expand -->
            <div v-if="expandedLog === log.id" class="log-qr">
              <div class="qr-placeholder">
                <div class="qr-inner">
                  <div class="qr-corner tl"></div><div class="qr-corner tr"></div>
                  <div class="qr-dots"></div>
                  <div class="qr-corner bl"></div><div class="qr-corner br"></div>
                </div>
                <p class="qr-label">QR Code — {{ log.code }}</p>
              </div>
            </div>
          </div>
        </div>
        <p class="log-end-label">End of document log for March 1, 2026</p>
      </main>

      <!-- INVENTORY ALERTS -->
      <main v-if="currentPage === 'inventoryAlerts'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <h1 class="page-title navy">Inventory Alerts</h1>
        </div>

        <div class="alert-box">
          <span class="alert-tri">⚠️</span>
          <div>
            <p class="alert-title">Critical Alert: Stock Low</p>
            <p class="alert-desc">Diploma Paper stock is below the 20% safety threshold. Immediate replenishment required.</p>
          </div>
        </div>

        <div class="inv-card">
          <div class="inv-img-wrap">
            <span class="inv-item-tag">ITEM #DP-2024</span>
            <div class="inv-img-placeholder">📄📄📄</div>
          </div>

          <div class="inv-body">
            <div class="inv-title-row">
              <div>
                <p class="inv-name">{{ inventoryItem.name }}</p>
                <p class="inv-desc">{{ inventoryItem.description }}</p>
              </div>
              <div class="inv-count-wrap">
                <p class="inv-count">{{ inventoryItem.sheetsLeft }}</p>
                <p class="inv-count-label">SHEETS LEFT</p>
              </div>
            </div>

            <div class="inv-progress-wrap">
              <div class="inv-prog-labels">
                <span>CURRENT LEVEL</span>
                <span>REORDER POINT: {{ inventoryItem.reorderPoint }}</span>
              </div>
              <div class="inv-progress-bar">
                <div class="inv-progress-fill" :style="{ width: (inventoryItem.sheetsLeft / inventoryItem.reorderPoint * 100) + '%' }"></div>
              </div>
              <p class="inv-threshold">Threshold reached 2 hours ago</p>
            </div>

            <div class="inv-orders-box">
              <p class="inv-orders-label">ORDERS</p>
              <div class="inv-order-opts">
                <button v-for="qty in [250, 500, 750, 1000]" :key="qty"
                  :class="['inv-order-btn', { selected: selectedOrder === qty }]"
                  @click="selectedOrder = qty">{{ qty }}</button>
              </div>
              <button class="btn-place-order" @click="showOrderConfirm = true">🛒 Place Order</button>
            </div>

            <div class="inv-stats">
              <div class="inv-stat">
                <p class="ist-label">MIN. REQUIRED</p>
                <p class="ist-val">⬇ {{ inventoryItem.minRequired }}</p>
              </div>
              <div class="inv-stat">
                <p class="ist-label">EST. DAYS LEFT</p>
                <p class="ist-val">📅 ~ {{ inventoryItem.daysLeft }} Days</p>
              </div>
              <div class="inv-stat">
                <p class="ist-label">DAILY USAGE</p>
                <p class="ist-val">📈 {{ inventoryItem.dailyUsage }}/avg</p>
              </div>
              <div class="inv-stat">
                <p class="ist-label">LAST ORDER</p>
                <p class="ist-val">🕐 {{ inventoryItem.lastOrder }}</p>
              </div>
            </div>
            <p class="inv-updated">⊙ Last updated 5 mins ago</p>
          </div>
        </div>
      </main>

      <!-- PAYMENT VERIFICATION -->
      <main v-if="currentPage === 'paymentVerification'" class="page-content">
        <div class="page-header">
          <div class="uni-badge"><span class="uni-crest">🏛️</span></div>
          <h1 class="page-title navy">Payment Verification</h1>
        </div>

        <div class="search-bar-full">
          <span>🔍</span>
          <input type="text" placeholder="Search Unique Payment Code (e.g. ATN-99X-2023)" />
        </div>

        <button class="btn-adv-filter">☰ Advanced Filters</button>

        <div class="pv-tabs">
          <button :class="['pv-tab', { active: paymentFilter === 'all' }]" @click="paymentFilter = 'all'">All Transactions</button>
          <button :class="['pv-tab', { active: paymentFilter === 'pending' }]" @click="paymentFilter = 'pending'">Pending</button>
          <button :class="['pv-tab', { active: paymentFilter === 'flagged' }]" @click="paymentFilter = 'flagged'">Flagged <span class="pv-badge">3</span></button>
        </div>

        <p class="section-title" style="margin-top:20px">Status</p>
        <div class="pv-stats">
          <div class="pv-stat-card">
            <p class="pv-stat-label">Pending Verification</p>
            <p class="pv-stat-num">42</p>
            <span class="pv-high">High Priority</span>
          </div>
          <div class="pv-stat-card">
            <p class="pv-stat-label">Verified Today</p>
            <p class="pv-stat-num" style="color:#34C759">128</p>
            <span class="pv-pos">+12% vs yesterday</span>
          </div>
        </div>

        <div class="payments-list">
          <div v-for="pay in filteredPayments" :key="pay.code" class="payment-card">
            <div class="pay-top">
              <div>
                <span class="pay-name">{{ pay.name }}</span>
                <span class="pay-type">{{ pay.type }}</span>
              </div>
            </div>
            <div class="pay-meta">
              <span class="pay-meta-item">📅 {{ pay.date }}</span>
              <span class="pay-meta-item">🏦 {{ pay.method }}</span>
            </div>
            <div class="pay-code-tag">{{ pay.code }}</div>
            <div class="pay-bottom">
              <span class="pay-amount">{{ pay.amount }}</span>
              <div class="pay-actions">
                <button class="pay-flag">🚩</button>
                <button v-if="pay.status === 'pending'" class="btn-verify-pay" @click="openVerifyPayment(pay)">Verify Payment</button>
                <span v-else class="pay-verified">✅ Verified</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- ADMIN PASSPORT -->
      <main v-if="currentPage === 'adminPassport'" class="page-content passport-page">
        <div class="passport-wrap">
          <div class="uni-badge centered"><span class="uni-crest">🏛️</span></div>
          <h1 class="passport-title">My <span class="gold">Admin Passport</span></h1>
          <p class="passport-sub">Verified Digital Credential</p>

          <div class="passport-profile">
            <div class="pp-avatar">👤</div>
            <div class="pp-info">
              <p class="pp-name">Juan Dela Cruz</p>
              <p class="pp-id">Employee No. 30276752</p>
              <span class="pp-verified">✅ Verified by Registrar</span>
            </div>
          </div>

          <div class="passport-fields">
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#EEF2FF">🎓</div>
              <div>
                <p class="pf-label">DEGREE</p>
                <p class="pf-val">Bachelor of Science in Accountancy</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#FFF3E0">📅</div>
              <div>
                <p class="pf-label">SINCE</p>
                <p class="pf-val">March 2019</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#FFF8E1">🏅</div>
              <div>
                <p class="pf-label">POSITION</p>
                <p class="pf-val">Cashier</p>
              </div>
            </div>
          </div>

          <div class="passport-contact">
            <h3 class="contact-title">Contact Information</h3>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#EEF2FF">✉️</div>
              <div>
                <p class="pf-label">EMAIL</p>
                <p class="pf-val">jdelacruz@addu.edu.ph</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#ECFDF5">📞</div>
              <div>
                <p class="pf-label">PHONE</p>
                <p class="pf-val">+63 912 345 6789</p>
              </div>
            </div>
            <div class="pf-row">
              <div class="pf-ico-wrap" style="background:#FEF2F2">📍</div>
              <div>
                <p class="pf-label">LOCATION</p>
                <p class="pf-val">Davao City, Philippines</p>
              </div>
            </div>
          </div>

          <div class="passport-quick-login">
            <h4 class="ql-title">Quick Login Settings</h4>
            <div class="ql-row">
              <span>🔐 Biometric Login</span>
              <button class="btn-enable">Enable</button>
            </div>
          </div>

          <button class="btn-download-pdf">📄 Download PDF</button>

          <div class="addu-footer-card">
            <span class="addu-crest">🏛️</span>
            <div>
              <p class="addu-name">Ateneo de Davao University</p>
              <p class="addu-desc">This credential is cryptographically secured and synced with the AdDU Registrar's Office. Share it instantly with the admin for verification.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- ===================== CONFIRM REQUEST MODAL ===================== -->
  <div v-if="currentPage === 'confirmRequest'" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h2>Confirm Request</h2>
      </div>
      <div class="modal-body" v-if="selectedDocument">
        <div class="modal-doc-row">
          <div class="modal-doc-ico" :style="{ background: selectedDocument.color }">{{ selectedDocument.icon }}</div>
          <div>
            <p class="modal-doc-name">{{ selectedDocument.name }}</p>
            <p class="modal-doc-desc">{{ selectedDocument.description }}</p>
          </div>
        </div>
        <div class="modal-field-row">
          <span class="modal-field-label">Processing Fee:</span>
          <span class="modal-field-val">₱{{ selectedDocument.price }}</span>
        </div>
        <div class="modal-field-row">
          <span class="modal-field-label">Processing Time:</span>
          <span class="modal-field-val">{{ selectedDocument.processingTime }}</span>
        </div>
        <div class="modal-notice">
          You will be directed to payment after confirming this request. Required documents must be uploaded within 48 hours.
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-modal-cancel" @click="cancelRequest">Cancel</button>
        <button class="btn-modal-confirm" @click="confirmRequest">Continue</button>
      </div>
    </div>
  </div>

  <!-- ===================== VERIFY PAYMENT MODAL ===================== -->
  <div v-if="verifyingPayment" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header verify-header">
        <span class="verify-shield">🛡️</span>
        <h2>Verify Payment</h2>
      </div>
      <div class="modal-body">
        <p class="verify-notice">For security purposes, please authenticate before proceeding with the student's request</p>
        <p class="verify-amount">{{ verifyingPayment.amount }}</p>
        <p class="verify-name">{{ verifyingPayment.name }}</p>
        <p class="verify-type">{{ verifyingPayment.type }}</p>
      </div>
      <div class="modal-actions">
        <button class="btn-modal-cancel" @click="verifyingPayment = null">Cancel</button>
        <button class="btn-modal-confirm" @click="confirmVerifyPayment">Verify Payment</button>
      </div>
    </div>
  </div>

  <!-- ===================== INVENTORY ORDER CONFIRM MODAL ===================== -->
  <div v-if="showOrderConfirm" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header verify-header">
        <span class="verify-shield">🛡️</span>
        <h2>Verify Order</h2>
      </div>
      <div class="modal-body">
        <p class="verify-notice">For security purposes, please authenticate before proceeding with the staff request</p>
        <p class="verify-amount">{{ selectedOrder }} Papers</p>
        <p class="verify-name">Juan Dela Cruz</p>
        <p class="verify-type">INVENTORY ORDER</p>
      </div>
      <div class="modal-actions">
        <button class="btn-modal-cancel" @click="showOrderConfirm = false">Cancel</button>
        <button class="btn-modal-confirm" @click="confirmOrder">Verify Order</button>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --navy: #1B2B6B;
  --navy-light: #2A3F8F;
  --gold: #C8960C;
  --gold-bright: #F5C518;
  --green: #2ECC71;
  --green-dark: #27AE60;
  --red: #FF3B30;
  --orange: #FF9500;
  --bg: #F4F5F9;
  --white: #FFFFFF;
  --text: #1A1A2E;
  --text-muted: #6B7280;
  --border: #E5E7EB;
  --card-shadow: 0 2px 12px rgba(27,43,107,0.08);
  --sidebar-w: 260px;
  --radius: 14px;
  --radius-sm: 8px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* ===== LOGIN ===== */
.login-bg {
  min-height: 100vh;
  background: #F4F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: var(--white);
  border-radius: 24px;
  padding: 48px 44px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 40px rgba(27,43,107,0.12);
}

.login-logo { text-align: center; margin-bottom: 28px; }
.logo-crest { font-size: 64px; display: block; margin-bottom: 16px; }
.login-title { font-size: 26px; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.login-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 20px; }
.login-divider { width: 40px; height: 2px; background: var(--border); margin: 0 auto; }
.gold { color: var(--gold); }
.navy { color: var(--navy); }

.user-toggle { display: flex; background: #F3F4F6; border-radius: 12px; padding: 4px; margin-bottom: 24px; gap: 4px; }
.toggle-btn { flex: 1; padding: 10px; border: none; border-radius: 9px; background: transparent; font-family: inherit; font-size: 14px; font-weight: 500; cursor: pointer; color: var(--text-muted); transition: all 0.2s; }
.toggle-btn.active { background: var(--white); color: var(--navy); font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }

.field-group { margin-bottom: 18px; }
.field-label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; }
.field-wrap { position: relative; display: flex; align-items: center; }
.field-ico { position: absolute; left: 14px; font-size: 16px; }
.field-input { width: 100%; padding: 13px 42px; border: 1.5px solid var(--border); border-radius: 12px; font-family: inherit; font-size: 15px; color: var(--text); background: var(--white); transition: border-color 0.2s; }
.field-input:focus { outline: none; border-color: var(--navy); }
.field-input::placeholder { color: #C0C4CC; }
.field-eye { position: absolute; right: 14px; cursor: pointer; font-size: 16px; }

.forgot-row { text-align: right; margin-bottom: 20px; }
.forgot-link { font-size: 14px; font-weight: 600; color: var(--navy); text-decoration: none; }

.btn-signin {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--navy) 0%, #4A5FBF 50%, var(--gold-bright) 100%);
  color: var(--white);
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  transition: opacity 0.2s, transform 0.1s;
}
.btn-signin:hover { opacity: 0.92; transform: translateY(-1px); }
.btn-signin:active { transform: translateY(0); }

.or-row { text-align: center; font-size: 12px; color: var(--text-muted); margin-bottom: 14px; position: relative; }
.or-row::before, .or-row::after { content: ''; position: absolute; top: 50%; width: 44%; height: 1px; background: var(--border); }
.or-row::before { left: 0; }
.or-row::after { right: 0; }

.btn-google {
  width: 100%;
  padding: 13px;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  background: var(--white);
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  transition: background 0.2s;
}
.btn-google:hover { background: #F9FAFB; }
.g-icon { font-weight: 700; color: #4285F4; font-family: Georgia, serif; }

.register-row { text-align: center; font-size: 14px; color: var(--text-muted); }
.register-link { color: var(--navy); font-weight: 600; text-decoration: none; }

/* ===== APP LAYOUT ===== */
.app-layout { display: flex; min-height: 100vh; }

.sidebar {
  width: var(--sidebar-w);
  background: var(--navy);
  display: flex;
  flex-direction: column;
  padding: 28px 16px 24px;
  position: fixed;
  height: 100vh;
  z-index: 100;
}

.sb-logo { display: flex; align-items: center; gap: 12px; padding: 0 8px 28px; border-bottom: 1px solid rgba(255,255,255,0.12); margin-bottom: 20px; }
.sb-crest { font-size: 28px; }
.sb-title { font-size: 16px; font-weight: 700; color: var(--white); }

.sb-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
.sb-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}
.sb-item:hover { background: rgba(255,255,255,0.1); color: var(--white); }
.sb-item.active { background: rgba(255,255,255,0.18); color: var(--white); font-weight: 600; }
.sb-icon { font-size: 18px; width: 24px; text-align: center; }
.sb-label { font-size: 13.5px; }

.sb-logout {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.6);
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 8px;
  transition: all 0.2s;
}
.sb-logout:hover { background: rgba(255,255,255,0.08); color: var(--white); }

.main-wrap { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }

.topbar {
  background: var(--white);
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.topbar-search { display: flex; align-items: center; gap: 10px; background: var(--bg); border-radius: 10px; padding: 9px 16px; flex: 1; max-width: 400px; }
.search-ico { font-size: 14px; color: var(--text-muted); }
.search-input { border: none; background: transparent; font-family: inherit; font-size: 14px; color: var(--text); outline: none; width: 100%; }
.search-input::placeholder { color: #B0B7C3; }

.topbar-user { display: flex; align-items: center; gap: 10px; }
.topbar-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--navy); color: var(--white); font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.topbar-name { font-size: 14px; font-weight: 600; color: var(--text); }

.page-content { padding: 36px 40px; max-width: 1100px; }

/* ===== PAGE HEADER ===== */
.page-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
.uni-badge { width: 48px; height: 48px; background: var(--bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; border: 2px solid var(--border); }
.uni-badge.centered { margin: 0 auto 16px; width: 60px; height: 60px; font-size: 30px; }
.uni-crest { line-height: 1; }
.page-title { font-size: 28px; font-weight: 700; color: var(--text); line-height: 1.2; }
.page-title.navy { color: var(--navy); }
.page-sub { font-size: 14px; color: var(--text-muted); margin-top: 4px; }

/* ===== SECTION ===== */
.section { margin-bottom: 32px; }
.section-title { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 14px; }

/* ===== QUICK ACTIONS ===== */
.quick-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--card-shadow); overflow: hidden; }
.quick-item { display: flex; align-items: center; gap: 16px; padding: 20px 22px; cursor: pointer; transition: background 0.15s; }
.quick-item:hover { background: #F9FAFB; }
.quick-icon-wrap { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.quick-text { flex: 1; }
.quick-name { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.quick-desc { font-size: 13px; color: var(--text-muted); }
.quick-arrow { color: var(--text-muted); font-size: 16px; }
.quick-divider { height: 1px; background: var(--border); margin: 0 22px; }

/* ===== WHAT YOU CAN DO ===== */
.cando-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cando-grid.four { grid-template-columns: repeat(4, 1fr); }
.cando-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 22px 18px; cursor: pointer; transition: all 0.2s; box-shadow: var(--card-shadow); }
.cando-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(27,43,107,0.12); }
.cando-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 14px; }
.cando-name { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 5px; }
.cando-sub { font-size: 12px; color: var(--text-muted); }

/* ===== HELP BANNER ===== */
.help-banner { background: var(--green); border-radius: var(--radius); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; margin-bottom: 32px; transition: opacity 0.2s; }
.help-banner:hover { opacity: 0.92; }
.help-left { display: flex; align-items: center; gap: 16px; }
.help-ico { font-size: 28px; background: rgba(255,255,255,0.2); border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; }
.help-title { font-size: 16px; font-weight: 700; color: var(--white); margin-bottom: 3px; }
.help-sub { font-size: 13px; color: rgba(255,255,255,0.85); }
.help-arrow { color: var(--white); font-size: 20px; }

/* ===== NOTIFICATIONS ===== */
.notif-card { background: var(--navy); border-radius: var(--radius); padding: 18px 20px; display: flex; align-items: center; gap: 14px; }
.notif-icon { font-size: 24px; }
.notif-title { font-size: 14px; font-weight: 600; color: var(--white); margin-bottom: 4px; }
.notif-sub { font-size: 12px; color: rgba(255,255,255,0.75); }

.footer-secure { font-size: 12px; color: var(--text-muted); text-align: center; padding: 24px 0 8px; }

/* ===== TABS ===== */
.tab-row { display: flex; background: #F3F4F6; border-radius: 10px; padding: 4px; gap: 4px; width: fit-content; margin-bottom: 28px; }
.tab-btn { padding: 9px 24px; border: none; border-radius: 8px; background: transparent; font-family: inherit; font-size: 14px; font-weight: 500; cursor: pointer; color: var(--text-muted); transition: all 0.2s; }
.tab-btn.active { background: var(--white); color: var(--navy); font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

.select-hint { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }

/* ===== DOC LIST ===== */
.doc-list { display: flex; flex-direction: column; gap: 12px; }
.doc-row { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 18px 20px; display: flex; align-items: center; gap: 16px; cursor: pointer; transition: all 0.2s; box-shadow: var(--card-shadow); }
.doc-row:hover { box-shadow: 0 6px 20px rgba(27,43,107,0.1); transform: translateY(-1px); }
.doc-ico-wrap { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.doc-info { flex: 1; }
.doc-name { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.doc-desc { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
.doc-meta { display: flex; align-items: center; gap: 8px; }
.doc-price { font-size: 13px; font-weight: 600; color: var(--navy); }
.doc-dot { color: var(--border); }
.doc-time { font-size: 12px; color: var(--text-muted); }
.doc-arrow { color: var(--text-muted); font-size: 16px; flex-shrink: 0; }

/* ===== HISTORY ===== */
.history-list { display: flex; flex-direction: column; gap: 12px; }
.history-row { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 18px 20px; display: flex; justify-content: space-between; align-items: center; }
.history-name { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.history-id { font-size: 12px; color: var(--text-muted); }
.history-status { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
.h-ready { background: #DCFCE7; color: #166534; }
.h-proc { background: #DBEAFE; color: #1E40AF; }
.h-pend { background: #FEF3C7; color: #92400E; }

/* ===== PROCESS DOCS ===== */
.proc-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
.proc-stat { background: var(--white); border-radius: var(--radius); padding: 22px; text-align: center; border: 1px solid var(--border); box-shadow: var(--card-shadow); }
.proc-stat.warn { border-left: 4px solid var(--orange); }
.proc-num { display: block; font-size: 40px; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
.proc-label { display: block; font-size: 11px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.06em; margin-bottom: 4px; }
.proc-sub { display: block; font-size: 12px; color: var(--text-muted); }

.requests-stack { display: flex; flex-direction: column; gap: 14px; }
.req-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px; box-shadow: var(--card-shadow); }
.req-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.req-name { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.req-id { font-size: 12px; color: var(--text-muted); }
.req-badge { font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
.rb-ready { background: #DCFCE7; color: #166534; }
.rb-proc { background: #DBEAFE; color: #1E40AF; }
.rb-pend { background: #FEF3C7; color: #92400E; }
.req-body { margin-bottom: 14px; }
.req-progress { font-size: 13px; color: var(--text-muted); }
.req-eta { font-size: 13px; color: var(--text-muted); }
.req-expires { font-size: 13px; color: var(--green-dark); font-weight: 500; }
.req-foot { display: flex; gap: 10px; }
.btn-rush { padding: 8px 16px; background: var(--red); color: var(--white); border: none; border-radius: 8px; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }
.btn-download { padding: 8px 16px; background: var(--green); color: var(--white); border: none; border-radius: 8px; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; }

/* ===== PASSPORT ===== */
.passport-page { max-width: 700px; }
.passport-wrap { background: var(--white); border-radius: 20px; padding: 40px; box-shadow: var(--card-shadow); border: 1px solid var(--border); }
.passport-title { font-size: 26px; font-weight: 700; color: var(--navy); text-align: center; margin-bottom: 6px; }
.passport-sub { font-size: 13px; color: var(--text-muted); text-align: center; margin-bottom: 28px; }

.passport-profile { display: flex; align-items: center; gap: 20px; background: #F8F9FF; border-radius: 14px; padding: 20px; margin-bottom: 20px; border: 1px solid var(--border); }
.pp-avatar { font-size: 60px; background: #EEF2FF; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pp-name { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.pp-id { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
.pp-verified { font-size: 12px; color: var(--green-dark); background: #DCFCE7; padding: 3px 10px; border-radius: 20px; }

.passport-fields, .passport-contact { background: #F8F9FF; border-radius: 14px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border); }
.contact-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 16px; }

.pf-row { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.pf-row:last-child { border-bottom: none; padding-bottom: 0; }
.pf-row:first-child { padding-top: 0; }
.pf-ico-wrap { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.pf-label { font-size: 10px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 3px; }
.pf-val { font-size: 14px; font-weight: 500; color: var(--text); }

.addu-footer-card { background: #F8F9FF; border-radius: 14px; padding: 18px; display: flex; gap: 14px; align-items: flex-start; border: 1px solid var(--border); margin-top: 16px; }
.addu-crest { font-size: 32px; }
.addu-name { font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
.addu-desc { font-size: 12px; color: var(--text-muted); line-height: 1.5; }

.passport-quick-login { background: #F8F9FF; border-radius: 14px; padding: 18px 20px; margin-bottom: 14px; border: 1px solid var(--border); }
.ql-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 12px; }
.ql-row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: var(--text); }
.btn-enable { padding: 7px 18px; background: var(--navy); color: var(--white); border: none; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }

.btn-download-pdf { width: 100%; padding: 13px; background: var(--white); border: 1.5px solid var(--navy); color: var(--navy); border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; margin-bottom: 14px; transition: background 0.2s; }
.btn-download-pdf:hover { background: #F0F3FF; }

/* ===== SEARCH BAR FULL ===== */
.search-bar-full { display: flex; align-items: center; gap: 12px; background: var(--white); border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 18px; margin-bottom: 16px; }
.search-bar-full input { border: none; background: transparent; font-family: inherit; font-size: 14px; color: var(--text); outline: none; flex: 1; }
.search-bar-full input::placeholder { color: #B0B7C3; }

/* ===== PRIORITY PILLS ===== */
.priority-pills { display: flex; gap: 10px; margin-bottom: 24px; }
.pill { padding: 7px 18px; border-radius: 20px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid; transition: all 0.2s; }
.urgent-pill { border-color: #FECACA; color: var(--red); background: #FFF5F5; }
.urgent-pill.active { background: var(--red); color: var(--white); border-color: var(--red); }
.normal-pill { border-color: #FDE68A; color: var(--orange); background: #FFFBEB; }
.normal-pill.active { background: var(--orange); color: var(--white); border-color: var(--orange); }
.low-pill { border-color: #BBF7D0; color: var(--green-dark); background: #F0FDF4; }
.low-pill.active { background: var(--green-dark); color: var(--white); border-color: var(--green-dark); }

/* ===== PROFILE LIST ===== */
.profile-list { display: flex; flex-direction: column; gap: 12px; }
.profile-row { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px 22px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--card-shadow); }
.profile-row:hover { background: #FAFBFF; }
.pr-name { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.pr-meta { font-size: 13px; color: var(--text-muted); margin-bottom: 10px; }
.pr-status { font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; }
.pr-status.pending { background: #FEF3C7; color: #92400E; }
.pr-status.processed { background: #DBEAFE; color: #1E40AF; }
.pr-status.verified { background: #DCFCE7; color: #166534; }
.pr-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.pr-priority { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 4px; letter-spacing: 0.04em; }
.p-urgent { background: #FEE2E2; color: var(--red); }
.p-normal { background: #FEF3C7; color: #92400E; }
.p-low { background: #DCFCE7; color: #166534; }
.pr-date { font-size: 12px; color: var(--text-muted); }
.pr-view { font-size: 13px; color: var(--navy); background: none; border: none; font-family: inherit; font-weight: 600; cursor: pointer; }

/* ===== LOG TABS ===== */
.log-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
.log-tab { padding: 8px 20px; border-radius: 20px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--border); background: var(--white); color: var(--text-muted); transition: all 0.2s; }
.log-tab.active { background: var(--navy); color: var(--white); border-color: var(--navy); }

.recent-label { font-size: 13px; color: var(--text-muted); margin-bottom: 14px; }

.log-list { display: flex; flex-direction: column; gap: 12px; }
.log-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); border-left: 4px solid; padding: 18px 20px; box-shadow: var(--card-shadow); cursor: pointer; transition: box-shadow 0.2s; }
.log-card:hover { box-shadow: 0 6px 20px rgba(27,43,107,0.1); }
.log-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.log-id { font-size: 12px; font-weight: 600; color: var(--text-muted); }
.log-badge { font-size: 11px; font-weight: 700; color: var(--white); padding: 3px 10px; border-radius: 4px; }
.log-doc { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 12px; }
.log-person { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.log-avatar { font-size: 20px; background: #F3F4F6; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.log-name { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.log-meta { font-size: 12px; color: var(--text-muted); }
.log-foot { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); padding-top: 12px; border-top: 1px solid var(--border); }

.log-qr { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
.qr-placeholder { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 24px; text-align: center; }
.qr-inner { width: 160px; height: 160px; margin: 0 auto 12px; background: repeating-linear-gradient(0deg, #000 0px, #000 4px, transparent 4px, transparent 8px), repeating-linear-gradient(90deg, #000 0px, #000 4px, transparent 4px, transparent 8px); background-size: 8px 8px; border: 8px solid #000; position: relative; }
.qr-label { font-size: 12px; color: var(--text-muted); }

.log-end-label { text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 28px; padding: 16px; font-style: italic; }

/* ===== INVENTORY ===== */
.alert-box { background: #FFF7ED; border: 1px solid #FDE68A; border-radius: var(--radius); padding: 18px 20px; display: flex; align-items: flex-start; gap: 14px; margin-bottom: 24px; }
.alert-tri { font-size: 24px; }
.alert-title { font-size: 14px; font-weight: 700; color: #92400E; margin-bottom: 4px; }
.alert-desc { font-size: 13px; color: #78350F; }

.inv-card { background: var(--white); border-radius: 20px; border: 1px solid var(--border); box-shadow: var(--card-shadow); overflow: hidden; }
.inv-img-wrap { position: relative; background: linear-gradient(135deg, #1B2B6B 0%, #2A3F8F 100%); height: 160px; display: flex; align-items: center; justify-content: center; }
.inv-item-tag { position: absolute; top: 14px; right: 14px; background: var(--navy); color: var(--white); font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 4px; }
.inv-img-placeholder { font-size: 48px; }

.inv-body { padding: 28px; }
.inv-title-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.inv-name { font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.inv-desc { font-size: 13px; color: var(--text-muted); }
.inv-count-wrap { text-align: right; }
.inv-count { font-size: 36px; font-weight: 800; color: var(--gold); line-height: 1; }
.inv-count-label { font-size: 10px; color: var(--text-muted); font-weight: 600; letter-spacing: 0.06em; }

.inv-progress-wrap { margin-bottom: 24px; }
.inv-prog-labels { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; }
.inv-progress-bar { height: 8px; background: #E5E7EB; border-radius: 8px; overflow: hidden; margin-bottom: 6px; }
.inv-progress-fill { height: 100%; background: var(--gold); border-radius: 8px; }
.inv-threshold { font-size: 12px; color: var(--text-muted); }

.inv-orders-box { background: #F8F9FF; border-radius: 14px; padding: 20px; margin-bottom: 24px; }
.inv-orders-label { font-size: 11px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.06em; margin-bottom: 14px; }
.inv-order-opts { display: flex; gap: 12px; margin-bottom: 18px; }
.inv-order-btn { flex: 1; padding: 10px; border: 2px solid var(--border); border-radius: 10px; background: var(--white); font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; color: var(--text); transition: all 0.2s; }
.inv-order-btn.selected { border-color: var(--green); color: var(--green); background: #F0FDF4; }
.btn-place-order { width: 100%; padding: 14px; background: var(--navy); color: var(--white); border: none; border-radius: 12px; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
.btn-place-order:hover { opacity: 0.9; }

.inv-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
.inv-stat { background: #F8F9FF; border-radius: 12px; padding: 16px; }
.ist-label { font-size: 10px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px; }
.ist-val { font-size: 18px; font-weight: 700; color: var(--text); }
.inv-updated { text-align: center; font-size: 12px; color: var(--text-muted); }

/* ===== PAYMENT VERIFICATION ===== */
.btn-adv-filter { width: 100%; padding: 12px; background: var(--navy); color: var(--white); border: none; border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; }

.pv-tabs { display: flex; gap: 8px; margin-bottom: 24px; }
.pv-tab { padding: 8px 20px; border-radius: 20px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--border); background: var(--white); color: var(--text-muted); transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
.pv-tab.active { background: var(--navy); color: var(--white); border-color: var(--navy); }
.pv-badge { background: var(--red); color: var(--white); border-radius: 50%; font-size: 10px; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; }

.pv-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.pv-stat-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 22px; box-shadow: var(--card-shadow); }
.pv-stat-label { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
.pv-stat-num { font-size: 36px; font-weight: 800; color: var(--navy); margin-bottom: 6px; }
.pv-high { font-size: 12px; font-weight: 600; color: var(--orange); }
.pv-pos { font-size: 12px; color: var(--green-dark); font-weight: 500; }

.payments-list { display: flex; flex-direction: column; gap: 14px; }
.payment-card { background: var(--white); border-radius: var(--radius); border: 1px solid var(--border); padding: 20px 22px; box-shadow: var(--card-shadow); }
.pay-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
.pay-name { font-size: 15px; font-weight: 700; color: var(--text); margin-right: 10px; }
.pay-type { font-size: 11px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.04em; background: #F3F4F6; padding: 3px 8px; border-radius: 4px; }
.pay-meta { display: flex; gap: 16px; margin-bottom: 12px; }
.pay-meta-item { font-size: 13px; color: var(--text-muted); }
.pay-code-tag { display: inline-block; font-size: 12px; font-weight: 600; color: var(--navy); background: #EEF2FF; padding: 4px 12px; border-radius: 6px; margin-bottom: 14px; }
.pay-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border); }
.pay-amount { font-size: 20px; font-weight: 800; color: var(--text); }
.pay-actions { display: flex; align-items: center; gap: 10px; }
.pay-flag { background: none; border: none; font-size: 16px; cursor: pointer; color: var(--text-muted); }
.btn-verify-pay { padding: 9px 20px; background: var(--navy); color: var(--white); border: none; border-radius: 10px; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
.btn-verify-pay:hover { opacity: 0.88; }
.pay-verified { font-size: 13px; color: var(--green-dark); font-weight: 600; }

/* ===== MODALS ===== */
.modal-overlay { position: fixed; inset: 0; background: rgba(10, 15, 40, 0.55); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal-card { background: var(--white); border-radius: 20px; width: 100%; max-width: 440px; overflow: hidden; box-shadow: 0 24px 64px rgba(27,43,107,0.25); }
.modal-header { background: var(--navy); padding: 22px 28px; }
.modal-header h2 { font-size: 18px; font-weight: 700; color: var(--white); }
.verify-header { display: flex; align-items: center; gap: 12px; }
.verify-shield { font-size: 22px; }
.modal-body { padding: 28px; }

.modal-doc-row { display: flex; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
.modal-doc-ico { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
.modal-doc-name { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.modal-doc-desc { font-size: 13px; color: var(--text-muted); }

.modal-field-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--border); }
.modal-field-row:last-of-type { border-bottom: none; }
.modal-field-label { font-size: 14px; color: var(--text-muted); }
.modal-field-val { font-size: 15px; font-weight: 600; color: var(--text); }

.modal-notice { background: #EEF2FF; border-radius: 10px; padding: 14px 16px; font-size: 13px; color: var(--navy); margin-top: 16px; line-height: 1.6; }

.verify-notice { font-size: 14px; color: var(--text-muted); margin-bottom: 20px; line-height: 1.6; }
.verify-amount { font-size: 36px; font-weight: 800; color: var(--navy); text-align: center; margin-bottom: 8px; }
.verify-name { font-size: 16px; font-weight: 700; color: var(--text); text-align: center; margin-bottom: 4px; }
.verify-type { font-size: 11px; font-weight: 600; color: var(--text-muted); text-align: center; letter-spacing: 0.08em; text-transform: uppercase; }

.modal-actions { display: flex; gap: 12px; padding: 20px 28px; border-top: 1px solid var(--border); }
.btn-modal-cancel { flex: 1; padding: 12px; border: 1.5px solid var(--border); border-radius: 12px; background: var(--white); font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; color: var(--text-muted); transition: background 0.2s; }
.btn-modal-cancel:hover { background: #F9FAFB; }
.btn-modal-confirm { flex: 1; padding: 12px; border: none; border-radius: 12px; background: var(--navy); font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; color: var(--white); transition: opacity 0.2s; }
.btn-modal-confirm:hover { opacity: 0.88; }

/* ===== RESPONSIVE ===== */
@media (max-width: 1200px) {
  .cando-grid.four { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 900px) {
  :root { --sidebar-w: 72px; }
  .sb-title, .sb-label { display: none; }
  .sb-logo { justify-content: center; padding: 0 0 24px; }
  .sb-item { justify-content: center; padding: 12px; }
  .sb-logout { justify-content: center; }
  .page-content { padding: 24px 20px; }
  .cando-grid { grid-template-columns: 1fr 1fr; }
  .doc-row { flex-wrap: wrap; }
}

@media (max-width: 640px) {
  .cando-grid, .cando-grid.four { grid-template-columns: 1fr; }
  .proc-stats { grid-template-columns: 1fr; }
  .pv-stats { grid-template-columns: 1fr; }
  .inv-stats { grid-template-columns: 1fr 1fr; }
  .topbar-name { display: none; }
}
</style>