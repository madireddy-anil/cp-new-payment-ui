import React, { useContext } from 'react'
import { Button } from '@payconstruct/design-system'
import { AuthContext } from '@payconstruct/orbital-auth-provider'
import { logoutUrl } from 'config/variables'
import { Route, Link, Outlet } from 'react-router-dom'
import { getRouteUrlWithNamespace } from 'router/routeHelpers'
import { ROUTES } from 'router/RoutesEnum'

/**
 * Public route component that render children components
 * @returns
 */
export const PublicRoute = () => {
  return (
    <Route path="/" element={<Navigation />}>
      <Outlet />;
    </Route>
  )
}

/**
 * Route with a navigation component together, you can have a menu and the main page rendered
 * @returns
 */
export const Navigation: React.FC = () => {
  const { logout, isAuthenticated } = useContext(AuthContext)

  return (
    <div>
      <Link to="/">Home MFE</Link>
      <br />
      <Link to="/about">Your Public Route</Link>
      <br />
      <Link to={getRouteUrlWithNamespace(ROUTES.NEW_PAYMENT)}>PRIVATE: New Payment</Link>
      <br />

      <Link to={`${getRouteUrlWithNamespace(ROUTES.NEW_PAYMENT)}?accountId=02d15fcd-2f57-4783-b8db-5a96b47e9b20`}>
        PRIVATE: New Payment with AccountId
      </Link>
      <br />

      <Outlet />
      <br />
      {isAuthenticated && <Button label="Logout Me" type="primary" onClick={() => logout({ returnTo: logoutUrl })} />}
    </div>
  )
}
