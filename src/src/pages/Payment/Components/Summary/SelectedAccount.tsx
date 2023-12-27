import React, { useContext } from 'react'
import { Cards, Text, Spacer, Colors } from '@payconstruct/design-system'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import { Helpers } from '@payconstruct/fe-utils'

const { truncateAccountNumber, fractionFormat } = Helpers

const SelectedAccount: React.FC = () => {
  const { TileCard } = Cards
  const {
    state: { selectedAccount },
  } = useContext(PaymentContext)

  if (!selectedAccount) return null

  return (
    <>
      <Text size="default" weight="bold" color={Colors.white.primary}>
        From
      </Text>
      <Spacer size={11} />
      <TileCard
        currencyCode={selectedAccount.currency}
        title={fractionFormat(Number(selectedAccount?.availableBalance))}
        description={selectedAccount.accountName}
        extraDescription={truncateAccountNumber(selectedAccount.accountIdentification?.accountNumber ?? '')}
        extraTitle="Account Number"
        mode="dark"
      />
    </>
  )
}

export { SelectedAccount }
