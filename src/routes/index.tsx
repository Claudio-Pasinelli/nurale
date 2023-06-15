import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/costants'
import { Home, Layout, Login, RecuperoPassword } from '../ui'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.recuperoPassword} element={<RecuperoPassword />} />
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
