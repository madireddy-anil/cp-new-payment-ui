import React, { useContext } from 'react'
import { Button } from '@payconstruct/design-system'
import { useNavigate } from 'react-router-dom'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'

const PaymentStatusFooter: React.FC = () => {
  const navigate = useNavigate()
  const {
    state: { returnUrl },
  } = useContext(PaymentContext)

  return (
    <div style={{ display: 'flex' }}>
      <Button
        mode="dark"
        type="primary"
        label={'Done'}
        style={{ marginRight: '15px' }}
        onClick={() => navigate(returnUrl)}
      />
      <Button
        mode="dark"
        type="secondary"
        label={'Payment Dashboard'}
        onClick={() => {
          navigate('/payments')
        }}
      />
    </div>
  )
}

export { PaymentStatusFooter }
