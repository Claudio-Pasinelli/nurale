import { icons } from '../../ui/atoms/Icons';

export const defaultSize = 1.75;

export const ROUTES = {
  login: '/',
  recuperoPassword: '/recupero-password',

  // tutte le pagine dopo il login
  home: '/home',
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

interface SIDEBARInterface
{
  name: string;
  href?: string;
  icon: icons;
  nameOtherIcon?: icons;
  dropdownVerification: boolean;
  path?:
    {
      name: string;
      href: string;
      icon: string;
    }[]
}

export const SIDEBAR:SIDEBARInterface[] =
[
  // Unici 2 bottoni che non hanno delle sottosezioni
  { name: 'Home', href: ROUTES.home, icon: 'home', dropdownVerification:false},
  { name: 'Inserimento veloce', href: ROUTES.quickInsert, icon: 'inserimentoVeloce', dropdownVerification:false },

  // Commesse
  { name: 'Commesse', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [ 
      { name: 'Commesse', href: ROUTES.jobs, icon: '' },
      { name: 'Ordini', href: ROUTES.orders, icon: '' },
      { name: 'Attività', href: ROUTES.activities, icon: '' },
    ]
  },

  // Anagrafiche
  { name: 'Anagrafiche', icon: 'anagrafiche', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [
      { name: 'Clienti', href: ROUTES.customers, icon: '' },
      { name: 'Fornitori', href: ROUTES.suppliers, icon: '' },
      { name: 'Risorse', href: ROUTES.resources, icon: '' },
      { name: 'Skills delle Risorse', href: ROUTES.resourceSkills, icon: '' },
    ]
  },
  
  // Acquisti
  { name: 'Acquisti', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [
      { name: 'Fattura di acquisto', href: ROUTES.purchaseInvoice, icon: '' },
      { name: 'Fattura di acquisto attività', href: ROUTES.purchaseInvoiceActivity, icon: '' },
    ]
  },
  
  // Vendite
  { name: 'Vendite', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [
      { name: 'Fatture di vendita', href: ROUTES.salesInvoices, icon: '' },
    ]
  },
  
  // Scadenziario
  { name: 'Scadenziario', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [
      { name: 'Scadenze', href: ROUTES.scheduledPayments, icon: '' },
      { name: 'Pianificazione', href: ROUTES.scheduledValues, icon: '' },
    ]
  },
  
  // Settings
  { name: 'Settings', icon: 'settings', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [
      { name: 'Skills', href: ROUTES.skills, icon: '' },
      { name: 'Tipi di pagamento', href: ROUTES.typeOfPayments, icon: '' },
      { name: 'Utenti', href: ROUTES.users, icon: '' },
    ]
  },
  
  // Timesheet
  { name: 'Timesheet', icon: 'timesheet', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
    path:
    [
      { name: 'Timesheet', href: ROUTES.timesheet, icon: '' },
      { name: 'Report', href: ROUTES.report, icon: '' },
    ]
  },
];

// export const SIDEBAR =
// [
//   // Unici 2 bottoni che non hanno delle sottosezioni
//   { name: 'Home', href: ROUTES.home, icon: 'home', nameOtherIcon:'', dropdownVerification:false, path:[] },
//   { name: 'Inserimento veloce', href: ROUTES.quickInsert, icon: 'inserimentoVeloce', nameOtherIcon:'', dropdownVerification:false, path:[] },

//   // Commesse
//   { name: 'Commesse', href: '', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [ 
//       { name: 'Commesse', href: ROUTES.jobs, icon: '' },
//       { name: 'Ordini', href: ROUTES.orders, icon: '' },
//       { name: 'Attività', href: ROUTES.activities, icon: '' },
//     ]
//   },

//   // Anagrafiche
//   { name: 'Anagrafiche', href: '', icon: 'anagrafiche', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [
//       { name: 'Clienti', href: ROUTES.customers, icon: '' },
//       { name: 'Fornitori', href: ROUTES.suppliers, icon: '' },
//       { name: 'Risorse', href: ROUTES.resources, icon: '' },
//       { name: 'Skills delle Risorse', href: ROUTES.resourceSkills, icon: '' },
//     ]
//   },
  
//   // Acquisti
//   { name: 'Acquisti', href: '', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [
//       { name: 'Fattura di acquisto', href: ROUTES.purchaseInvoice, icon: '' },
//       { name: 'Fattura di acquisto attività', href: ROUTES.purchaseInvoiceActivity, icon: '' },
//     ]
//   },
  
//   // Vendite
//   { name: 'Vendite', href: '', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [
//       { name: 'Fatture di vendita', href: ROUTES.salesInvoices, icon: '' },
//     ]
//   },
  
//   // Scadenziario
//   { name: 'Scadenziario', href: '', icon: 'acquisti', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [
//       { name: 'Scadenze', href: ROUTES.scheduledPayments, icon: '' },
//       { name: 'Pianificazione', href: ROUTES.scheduledValues, icon: '' },
//     ]
//   },
  
//   // Settings
//   { name: 'Settings', href: '', icon: 'settings', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [
//       { name: 'Skills', href: ROUTES.skills, icon: '' },
//       { name: 'Tipi di pagamento', href: ROUTES.typeOfPayments, icon: '' },
//       { name: 'Utenti', href: ROUTES.users, icon: '' },
//     ]
//   },
  
//   // Timesheet
//   { name: 'Timesheet', href: '', icon: 'timesheet', nameOtherIcon:'dropdownIconGiu', dropdownVerification:true,
//     path:
//     [
//       { name: 'Timesheet', href: ROUTES.timesheet, icon: '' },
//       { name: 'Report', href: ROUTES.report, icon: '' },
//     ]
//   },
// ];