import { AuthContext, PortalEnum } from '@payconstruct/orbital-auth-provider'
import React, { useContext } from 'react'

import { AdminComponent } from './Admin/AdminComponent'
import { ClientComponent } from './Client/ClientComponent'

/**``
 * index is responsible for rendering the component based on the portal type.
 * @returns `<ClientComponent />` or `<AdminComponent />`.
 */
const Example: React.FC = () => {
  const { portal } = useContext(AuthContext)

  if (portal === PortalEnum.CMS) return <ClientComponent />
  if (portal === PortalEnum.BMS) return <AdminComponent />

  return <div>Loading components</div>
}

export { Example }
