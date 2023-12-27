import React, { useContext } from 'react'
import { Cards, Text, Spacer, Colors } from '@payconstruct/design-system'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import { truncatedBeneficiaryAccountNumber } from 'helpers/truncatedBeneAccount'

const SelectedBeneficiary: React.FC = () => {
  const { TileCard } = Cards
  const {
    state: { selectedBeneficiary },
  } = useContext(PaymentContext)

  if (!selectedBeneficiary) return null

  return (
    <div>
      <Text size="default" weight="bold" color={Colors.white.primary}>
        To
      </Text>
      <Spacer size={10} />
      <TileCard
        title={selectedBeneficiary.accountDetails?.nameOnAccount}
        description={<div style={{ color: Colors.orange.orange900 }}>{selectedBeneficiary.currency}</div>}
        extraDescription={truncatedBeneficiaryAccountNumber(selectedBeneficiary)}
        extraTitle="Account"
        mode="dark"
      />
    </div>
  )
}

export { SelectedBeneficiary }
