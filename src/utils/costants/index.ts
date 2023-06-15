export const ROUTES = {
  login: '/login',
  recuperoPassword: '/recupero-password',

  // tutte le pagine dopo il login
  home: '/',
  quickInsert: '/quick-insert',
  jobs: '/jobs',
  orders: '/orders',
  activities: '/activities',
  customers: '/customers',
  suppliers: '/suppliers',
  resources: '/resources',
  resourceSkills: '/resource-skills',
  purchaseInvoice: '/purchase-invoice',
  purchaseInvoiceActivity: '/purchase-invoice-activity',
  salesInvoices: '/sales-invoices',
  scheduledPayments: '/scheduled-payments',
  scheduledValues: '/scheduled-values',
  skills: '/skills',
  typeOfPayments: '/type-of-payments',
  users: '/users',
  timesheet: '/timesheet',
  report: '/report',
}

export const SIDEBAR =
[
  // Unici 2 bottoni che non hanno delle sottosezioni
  { name: 'Home', href: ROUTES.home, current: true },
  { name: 'Inserimento veloce', href: ROUTES.quickInsert, current: false },

  // Commesse
  { name: 'Commesse', href: '', current: false },
  { name: 'Commesse', href: ROUTES.jobs, current: false },
  { name: 'Ordini', href: ROUTES.orders, current: false },
  { name: 'Attività', href: ROUTES.activities, current: false },

  // Anagrafiche
  { name: 'Anagrafiche', href: '', current: false },
  { name: 'Clienti', href: ROUTES.customers, current: false },
  { name: 'Fornitori', href: ROUTES.suppliers, current: false },
  { name: 'Risorse', href: ROUTES.resources, current: false },
  { name: 'Skills delle Risorse', href: ROUTES.resourceSkills, current: false },
  
  // Acquisti
  { name: 'Acquisti', href: '', current: false },
  { name: 'Fattura di acquisto', href: ROUTES.purchaseInvoice, current: false },
  { name: 'Fattura di acquisto attività', href: ROUTES.purchaseInvoiceActivity, current: false },
  
  // Vendite
  { name: 'Vendite', href: '', current: false },
  { name: 'Fatture di vendita', href: ROUTES.salesInvoices, current: false },
  
  // Scadenziario
  { name: 'Scadenziario', href: '', current: false },
  { name: 'Scadenze', href: ROUTES.scheduledPayments, current: false },
  { name: 'Pianificazione', href: ROUTES.scheduledValues, current: false },
  
  // Settings
  { name: 'Settings', href: '', current: false },
  { name: 'Skills', href: ROUTES.skills, current: false },
  { name: 'Tipi di pagamento', href: ROUTES.typeOfPayments, current: false },
  { name: 'Utenti', href: ROUTES.users, current: false },
  
  // Timesheet
  { name: 'Timesheet', href: '', current: false },
  { name: 'Timesheet', href: ROUTES.timesheet, current: false },
  { name: 'Report', href: ROUTES.report, current: false },
];