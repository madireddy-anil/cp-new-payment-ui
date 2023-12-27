import React, { useContext } from 'react'
import { Cards, Colors, Text, Spacer } from '@payconstruct/design-system'
import style from './PaymentSummary.module.sass'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import { SelectedAccount } from './SelectedAccount'
import { truncatedBeneficiaryAccountNumber } from 'helpers/truncatedBeneAccount'

const PaymentSummary: React.FC = () => {
  const { TileCard } = Cards
  const {
    state: { step, selectedBeneficiary },
  } = useContext(PaymentContext)

  return (
    <aside
      className={style['PaymentSummary']}
      style={{
        backgroundColor: Colors.grey.neutral800,
      }}
    >
      <div
        style={{
          opacity: step < 3 ? '1' : '0',
        }}
      >
        <Text size="large" weight="bold" color={Colors.white.primary}>
          Payment Summary
        </Text>

        <Spacer size={40} />

        <SelectedAccount />

        <Spacer size={25} />

        {selectedBeneficiary && (
          <>
            <Text size="default" weight="regular" color={Colors.white.primary}>
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
          </>
        )}
      </div>
    </aside>
  )
}

export { PaymentSummary }
