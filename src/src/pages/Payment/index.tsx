import React, { useContext } from 'react'
import { AuthContext, PortalEnum } from '@payconstruct/orbital-auth-provider'
import { Spin } from '@payconstruct/design-system'
import { PaymentAdmin } from './Admin/AdminComponent'
import { PaymentClient } from './Client/ClientComponent'
import { useQuery } from 'helpers/useQuery'

interface PaymentProps {
  onNewBeneficiaryButtonClick?: () => void
}
/**
 * index is responsible for rendering the component based on the portal type.
 *
 * Skip the first step by sending the accountId in the URL parameters `?accountId=YOUR_ID_HERE`
 * @returns `<ClientComponent />` or `<AdminComponent />`.
 * @argument onNewBeneficiaryButtonClick - if you pass this property a callback button is shown on the UI,
 * so you can trigger Beneficiary creation
 */
const Payment: React.FC<PaymentProps> = ({ onNewBeneficiaryButtonClick }) => {
  const { portal, isFetching } = useContext(AuthContext)

  const accountId = useQuery().get('accountId')
  const returnUrl = useQuery().get('returnUrl')

  return (
    <Spin loading={isFetching}>
      {portal === PortalEnum.CMS && (
        <PaymentClient
          accountId={accountId}
          returnUrl={returnUrl}
          onNewBeneficiaryButtonClick={onNewBeneficiaryButtonClick}
        />
      )}
      {portal === PortalEnum.BMS && <PaymentAdmin />}
    </Spin>
  )
}

export { Payment }
