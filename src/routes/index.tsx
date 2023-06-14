import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../utils/costants'
import { Login, RecuperoPassword } from '../ui'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.login} element={<Login />} />
        <Route path={ROUTES.recuperoPassword} element={<RecuperoPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
