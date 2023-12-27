import React from 'react'
import { Icon, Spacer, Text } from '@payconstruct/design-system'
import { PaymentStatusFooter } from './Footer/PaymentStatusPageFooter'
import style from './PaymentStatus.module.sass'

interface ErrorTransactionProps {
  paymentId: string
}
const ErrorTransaction: React.FC<ErrorTransactionProps> = () => {
  return (
    <>
      <div className={style['PaymentStatus']}>
        <Icon name="exclamationCircleOutline" />
        <Text mode={'dark'} size="xlarge" weight="bold">
          Error in submitting your payment
        </Text>
      </div>
      <Spacer size={32} />

      <Text mode={'dark'}>
        We apologise for the inconvenience. Please get in touch with your customer service representative.
      </Text>
      <Spacer size={20} />

      <PaymentStatusFooter />
    </>
  )
}

export { ErrorTransaction }
