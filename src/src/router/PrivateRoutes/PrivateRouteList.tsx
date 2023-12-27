import React from 'react'
import { PageNotFound } from 'pages/4xx/404'
import { getRouteUrlWithNamespace } from 'router/routeHelpers'
import { ROUTES } from 'router/RoutesEnum'
import { Payment } from 'pages/Payment'

interface RouteProps {
  path: string
  parent?: string
  title: string
  isMenuEnabled?: boolean
  exact?: boolean
  element: () => JSX.Element
}

type RoutesProps = RouteProps[]

const listOfPrivateRoutes = [
  {
    path: `${getRouteUrlWithNamespace(ROUTES.ALL)}`,
    exact: false,
    title: 'Not Found',
    element: () => <PageNotFound />,
  },
  {
    path: `${getRouteUrlWithNamespace(ROUTES.NEW_PAYMENT)}`,
    exact: true,
    title: 'Payment',
    parent: 'unknown',
    isMenuEnabled: false,
    element: () => <Payment />,
  },
] as RoutesProps

export { listOfPrivateRoutes }
