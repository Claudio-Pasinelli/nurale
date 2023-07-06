import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  QuickInsertPage,
  JobsPage,
  OrdersPage,
  ActivitiesPage,
  CustomersPage,
  SuppliersPage,
  ResourcesPage,
  ResourceSkillsPage,
  PurchaseInvoicePage,
  PurchaseInvoiceActivityPage,
  SalesInvoicesPage,
  ScheduledPaymentsPage,
  ScheduledValuesPage,
  SkillsPage,
  TypeOfPaymentsPage,
  UsersPage,
  TimesheetPage,
  ReportPage,
  Layout,
  RequireAuth,
  RecuperoPasswordPage,
  HomePage,
} from 'ui';
import { ROUTES } from 'utils';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path={ROUTES.recuperoPassword} element={<RecuperoPasswordPage />} />
          <Route element={<Layout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.quickInsert} element={<QuickInsertPage />} />
            <Route path={ROUTES.jobs} element={<JobsPage />} />
            <Route path={ROUTES.orders} element={<OrdersPage />} />
            <Route path={ROUTES.activities} element={<ActivitiesPage />} />
            <Route path={ROUTES.customers} element={<CustomersPage />} />
            <Route path={ROUTES.suppliers} element={<SuppliersPage />} />
            <Route path={ROUTES.resources} element={<ResourcesPage />} />
            <Route path={ROUTES.resourceSkills} element={<ResourceSkillsPage />} />
            <Route path={ROUTES.purchaseInvoice} element={<PurchaseInvoicePage />} />
            <Route
              path={ROUTES.purchaseInvoiceActivity}
              element={<PurchaseInvoiceActivityPage />}
            />
            <Route path={ROUTES.salesInvoices} element={<SalesInvoicesPage />} />
            <Route path={ROUTES.scheduledPayments} element={<ScheduledPaymentsPage />} />
            <Route path={ROUTES.scheduledValues} element={<ScheduledValuesPage />} />
            <Route path={ROUTES.skills} element={<SkillsPage />} />
            <Route path={ROUTES.typeOfPayments} element={<TypeOfPaymentsPage />} />
            <Route path={ROUTES.users} element={<UsersPage />} />
            <Route path={ROUTES.timesheet} element={<TimesheetPage />} />
            <Route path={ROUTES.report} element={<ReportPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
