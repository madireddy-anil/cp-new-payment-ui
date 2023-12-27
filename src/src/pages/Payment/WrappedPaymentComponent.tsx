import React from 'react'
import { ProviderWrapper } from 'state/contextProviders/ProviderWrapper'
import { Payment } from './index'

interface WrappedNewPaymentProps {
  onNewBeneficiaryButtonClick?: () => void
}

const WrappedNewPayment: React.FC<WrappedNewPaymentProps> = () => {
  return (
    <ProviderWrapper>
      {/* <Payment onNewBeneficiaryButtonClick={onNewBeneficiaryButtonClick} /> */}
      <Payment />
    </ProviderWrapper>
  )
}

export default WrappedNewPayment
