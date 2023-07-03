import { icons } from '../../ui/atoms/Icons';
import { createColumnHelper } from '@tanstack/react-table';
import { z } from 'zod';
// export const defaultSize = 1.75;

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

export const schemaSearch = z.object({
    name: z.string().min(8, { message: 'Filtro troppo corto' }).max(20, { message: 'Filtro troppo lungo' }),
  });

export const COLUMNHELPER:any = createColumnHelper<any>();

export const UsersCols = [
      COLUMNHELPER.accessor('firstName', {
          cell: (props:any) => props.getValue(),
          header: 'Nome',
      }),
      COLUMNHELPER.accessor('lastName', {
          cell: (props:any) => props.getValue(),
          header: 'Cognome',
      }),
      COLUMNHELPER.accessor('email', {
          cell: (props:any) => props.getValue(),
          header: 'Email',
      })
];

export const usersList =
[
  {value: ''},
  {value: 'Gioè Tiziano'},
  {value: 'Gelmi Alessandro'},
  {value: 'Terzuolo Matteo'},
  {value: 'Cattaneo Elisa'},
  {value: 'Panteghini Luca'},
  {value: 'Moschella Andrea'},
  {value: 'Tizio Tizio'},
  {value: 'Caio Caio'},
  {value: 'Baglio Aldo'},
  {value: 'Antonio Nicola'},
  {value: 'Lini Manuel'},
  {value: 'Pasinelli Claudio'},
]

export const skillsList =
[
  {value: ''},
  {value: 'Frontend'},
  {value: 'Backend'},
  {value: 'Designer'},
  {value: 'Administrator'},
  {value: 'Other'}
]

export const SkillsCols = [
      COLUMNHELPER.accessor('name', {
          cell: (props:any) => props.getValue(),
          header: 'Nome',
      }),
      COLUMNHELPER.accessor('skillType', {
          cell: (props:any) => props.getValue(),
          header: 'Tipo di skill',
      }),
      COLUMNHELPER.accessor('note', {
          cell: (props:any) => props.getValue(),
          header: 'Note',
      })
];

export const TypeOfPaymentsCols = [
      COLUMNHELPER.accessor('name', {
          cell: (props:any) => props.getValue(),
          header: 'Nome',
      }),
      COLUMNHELPER.accessor('daysToFirstPayment', {
          cell: (props:any) => props.getValue(),
          header: 'Giorni al primo pagamento',
      }),
      COLUMNHELPER.accessor('daysBetweenPayments', {
          cell: (props:any) => props.getValue(),
          header: 'Giorni tra i pagamenti',
      }),
      COLUMNHELPER.accessor('numberOfPayments', {
          cell: (props:any) => props.getValue(),
          header: 'Numero di pagamenti',
      }),
      COLUMNHELPER.accessor('movePaymentsToTheEndOfMonth', {
          cell: (props:any) => props.getValue(),
          header: 'Spostare i pagamenti alla fine del mese',
      }),
      COLUMNHELPER.accessor('note', {
          cell: (props:any) => props.getValue(),
          header: 'Note',
      }),
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