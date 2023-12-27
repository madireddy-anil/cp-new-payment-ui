import React, { useContext, useState } from 'react'
import { Button, Colors, Spacer, Text } from '@payconstruct/design-system'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import { nextStep, previousStep, setStepStatus } from 'pages/Payment/PaymentContext/PaymentActions'
import { ConfirmationProgressLine } from '../ConfirmationProgressLine/ProgressLine'
import { SelectedAccount } from '../Summary/SelectedAccount'
import { SelectedBeneficiary } from '../Summary/SelectedBeneficiary'
import { SuccessTransaction } from './PaymentStatusPage/Success'
import { ErrorTransaction } from './PaymentStatusPage/Error'
import { useNewPaymentMutation } from 'helpers/customHooks/useNewPayment'
import { paymentBankChargeText, paymentSettlementChargeText } from 'helpers/paymentDuration'
import { Helpers } from '@payconstruct/fe-utils'

const { cleanCurrencyFormat } = Helpers

const ConfirmationStep: React.FC = () => {
  const {
    dispatch,
    state: { description, selectedAccount, selectedBeneficiary, quote },
  } = useContext(PaymentContext)

  const [confirm, setConfirm] = useState<'success' | 'fail'>()
  const [createNewPayment, { data: paymentResponse, loading }] = useNewPaymentMutation()

  const createPayment = async () => {
    createNewPayment({
      accountId: selectedAccount?.id ?? '',
      beneficiaryId: selectedBeneficiary?.id ?? '',
      creditCurrency: selectedBeneficiary?.currency ?? '',
      debitCurrency: selectedAccount?.currency ?? '',
      debitAmount: cleanCurrencyFormat(quote?.sourceAmount ?? ''),
      creditAmount: cleanCurrencyFormat(quote?.destinationAmount ?? ''),
      remittanceInformation: description,
      requestSource: 'clientPortal',
    })
      .then(response => {
        // Fetch doesn't send (404 error) to catch, So added below code.
        if (response.statusCode >= 400) {
          throw new Error('Server responds with error!')
        }
        dispatch(nextStep())
        dispatch(setStepStatus('finish'))
        setConfirm('success')
      })
      .catch(() => {
        dispatch(nextStep())
        dispatch(setStepStatus('error'))
        setConfirm('fail')
      })
  }

  const ConfirmationPageWrapper: React.FC = ({ children }) => {
    return (
      <>
        <div
          style={{
            backgroundColor: Colors.grey.neutral800,
            width: 'calc(100% + 184px)',
            height: 'calc(100% + 80px)',
            position: 'absolute',
            zIndex: '0',
            top: '-40px',
            left: '-50px',
          }}
        ></div>
        <section
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '580px',
            minHeight: 'calc(100vh - 56px)',
          }}
        >
          {confirm === 'fail' && <ErrorTransaction paymentId={paymentResponse?.transactionReference ?? ''} />}
          {confirm === 'success' && <SuccessTransaction paymentId={paymentResponse?.transactionReference ?? ''} />}

          {confirm == null && children}
        </section>
      </>
    )
  }

  return (
    <ConfirmationPageWrapper>
      <Text size="xlarge" mode="dark" weight="bold">
        <span id="Confirmation">Confirmation</span>
      </Text>
      <Spacer size={40} />
      <Text size="small" mode="dark">
        Please check the details of your payment thoroughly before confirming the transaction.
      </Text>
      <Spacer size={25} />
      <SelectedAccount />
      <Spacer size={10} />
      <ConfirmationProgressLine />
      <Spacer size={15} />
      {paymentBankChargeText(selectedAccount?.currency ?? '', selectedBeneficiary?.currency ?? '') && (
        <Text size="small" mode="dark">
          The beneficiary bank may charge a fee and{' '}
          <Text size="small" mode="dark" weight="bold">
            reduce the total received by the beneficiary.
          </Text>
        </Text>
      )}
      <Spacer size={15} />
      <SelectedBeneficiary />
      <Spacer size={25} />

      <Text size="small" mode="dark" color={Colors.grey.neutral500}>
        Description:{' '}
        <Text size="small" mode="dark" weight="regular" color={Colors.white.primary}>
          {description}
        </Text>
      </Text>
      <Spacer size={15} />
      <div>
        <Text size="small" mode="dark" weight="regular">
          {paymentSettlementChargeText(selectedAccount?.currency ?? '', selectedBeneficiary?.currency ?? '')}
        </Text>
        <Spacer size={50} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          mode="dark"
          type="secondary"
          label={'Back'}
          onClick={() => dispatch(previousStep())}
          disabled={loading}
          icon={{ name: 'leftArrow', position: 'left' }}
        />
        <Button
          loading={loading}
          disabled={loading}
          mode="dark"
          type="primary"
          label={'Confirm'}
          onClick={createPayment}
        />
      </div>
    </ConfirmationPageWrapper>
  )
}

export { ConfirmationStep }
