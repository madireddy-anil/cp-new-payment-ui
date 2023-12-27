import React from 'react'
import { Icon, Spacer, Text } from '@payconstruct/design-system'
import { PaymentStatusFooter } from './Footer/PaymentStatusPageFooter'
import style from './PaymentStatus.module.sass'

interface SuccessTransactionProps {
  paymentId: string
}
const SuccessTransaction: React.FC<SuccessTransactionProps> = ({ paymentId = '' }) => {
  return (
    <>
      <div className={style['PaymentStatus']}>
        <Icon name="checkCircle" />
        <Text mode={'dark'} size="xlarge" weight="bold">
          Your payment has been submitted successfully
        </Text>
      </div>

      <Spacer size={32} />

      <Text mode={'dark'}>
        Your payment has been submitted successfully and is being processed. To view the status of your payment, please
        head over to the payments dashboard.
      </Text>
      <Spacer size={20} />

      <Text mode={'dark'}>Reference number: {paymentId}</Text>
      <Spacer size={32} />

      <PaymentStatusFooter />
    </>
  )
}

export { SuccessTransaction }
