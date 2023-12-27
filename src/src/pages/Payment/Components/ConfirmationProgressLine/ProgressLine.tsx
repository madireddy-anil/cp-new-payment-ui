import React, { useContext } from 'react'
import { Divider, Icon, ProgressLine } from '@payconstruct/design-system'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'

const ConfirmationProgressLine: React.FC = () => {
  const {
    state: { quote, selectedAccount },
  } = useContext(PaymentContext)

  const formatQuoteText = (value?: string) => {
    if (!value) return ''
    return `${value} ${selectedAccount?.currency ?? ''}`
  }

  return (
    <div style={{ marginLeft: '3px' }}>
      <ProgressLine
        label={`Fee -`}
        mode="dark"
        value={`[MOCKED - VALUE]`}
        progressList={[
          {
            id: 1,
            label: 'You send ',
            value: formatQuoteText(quote?.sourceAmount ?? ''),
          },
          {
            icon: <Divider type="vertical" />,
            id: 2,
          },
          {
            icon: <Icon name="dashCircle" />,
            id: 3,
            label: 'Fee: ',
            value: formatQuoteText(quote?.fee ?? ''),
          },
          {
            icon: <Divider type="vertical" />,
            id: 4,
          },
          {
            id: 7,
            label: 'The beneficiary will receive ',
            value: formatQuoteText(quote?.destinationAmount ?? ''),
          },
        ]}
      />
    </div>
  )
}

export { ConfirmationProgressLine }
