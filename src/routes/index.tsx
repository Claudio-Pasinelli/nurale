import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils/costants';
import {
  Activities,
  Customers,
  Home,
  Jobs,
  Layout,
  Login,
  Orders,
  PurchaseInvoice,
  PurchaseInvoiceActivity,
  QuickInsert,
  RecuperoPassword,
  ResourceSkills,
  Resources,
  SalesInvoices,
  ScheduledPayments,
  ScheduledValues,
  Skills,
  Suppliers,
  Timesheet,
  TypeOfPayments,
  Users,
  Report,
  RequireAuth,
} from '../ui';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path={ROUTES.recuperoPassword} element={<RecuperoPassword />} />
          <Route element={<Layout />}>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.quickInsert} element={<QuickInsert />} />
            <Route path={ROUTES.jobs} element={<Jobs name='Commesse' />} />
            <Route path={ROUTES.orders} element={<Orders name='Ordini' />} />
            <Route path={ROUTES.activities} element={<Activities name='Attività' />} />
            <Route path={ROUTES.customers} element={<Customers name='Clienti' />} />
            <Route path={ROUTES.suppliers} element={<Suppliers name='Fornitori' />} />
            <Route path={ROUTES.resources} element={<Resources name='Risorse' />} />
            <Route
              path={ROUTES.resourceSkills}
              element={<ResourceSkills name='Skills delle Risorse' />}
            />
            <Route
              path={ROUTES.purchaseInvoice}
              element={<PurchaseInvoice name='Fattura di acquisto' />}
            />
            <Route
              path={ROUTES.purchaseInvoiceActivity}
              element={<PurchaseInvoiceActivity name='Fattura di acquisto attività' />}
            />
            <Route
              path={ROUTES.salesInvoices}
              element={<SalesInvoices name='Fatture di vendita' />}
            />
            <Route
              path={ROUTES.scheduledPayments}
              element={<ScheduledPayments name='Scadenze' />}
            />
            <Route
              path={ROUTES.scheduledValues}
              element={<ScheduledValues name='Pianificazione' />}
            />
            <Route path={ROUTES.skills} element={<Skills name='Skills' />} />
            <Route
              path={ROUTES.typeOfPayments}
              element={<TypeOfPayments name='Tipi di pagamento' />}
            />
            <Route path={ROUTES.users} element={<Users name='Utenti' />} />
            <Route path={ROUTES.timesheet} element={<Timesheet name='Timesheet' />} />
            <Route path={ROUTES.report} element={<Report name='Report' />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
