import React, { useContext, useEffect, useMemo } from 'react'
import { StepTracker, Colors } from '@payconstruct/design-system'
import { AccountStep } from '../Components/Steps/AccountStep'
import { BeneficiaryStep } from '../Components/Steps/BeneficiaryStep'
import { AmountStep } from '../Components/Steps/AmountStep'
import { ConfirmationStep } from '../Components/Steps/ConfirmationStep'
import { PaymentSummary } from '../Components/Summary/PaymentSummary'
import { PaymentContext, PaymentProvider } from '../PaymentContext/PaymentProvider'
import { nextStep, setAccount, setReturnUrl } from '../PaymentContext/PaymentActions'
import styles from './Client.module.sass'
import { useLazyQuery } from '@apollo/client'
import { getAccountById } from 'state/contextProviders/apollo/queries/Accounts'
import { useQuote } from '../Components/Steps/useQuote'

interface PaymentClientProps {
  onNewBeneficiaryButtonClick?: () => void
  accountId: string | null
  returnUrl: string | null
}
//* Each Step
const stepsTrackerData = [
  {
    key: 0,
    title: 'Account',
    content: <AccountStep />,
  },
  {
    key: 1,
    title: 'Beneficiary',
    content: <BeneficiaryStep />,
  },
  {
    key: 2,
    title: 'Amount',
    content: (
      <AmountStep
        quoteData={{
          quote: {
            fee: '',
            sourceAmount: '',
            destinationAmount: '',
          },
          error: undefined,
        }}
      />
    ),
  },
  {
    key: 3,
    title: 'Confirmation',
    content: <ConfirmationStep />,
  },
]

//* Steps Wrapper to use context provider
const Steps: React.FC<PaymentClientProps> = ({ accountId, returnUrl, onNewBeneficiaryButtonClick }) => {
  const {
    dispatch,
    state: { step, stepStatus },
  } = useContext(PaymentContext)
  useQuote()

  const [getAccounts] = useLazyQuery(getAccountById, {
    onCompleted({ GetAccountById }) {
      const selectedAccount = GetAccountById
      if (selectedAccount) {
        dispatch(setAccount(selectedAccount))
        dispatch(nextStep())
      }
      if (!selectedAccount) {
        console.log('Account not found')
      }
    },
  })

  useEffect(() => {
    if (accountId) {
      getAccounts({ variables: { id: accountId } })
    }
  }, [accountId])

  const modifiedStepsTrackerData = useMemo(() => {
    return stepsTrackerData.map(step => {
      if (step.title === 'Beneficiary')
        return {
          ...step,
          content: <BeneficiaryStep onNewBeneficiaryButtonClick={onNewBeneficiaryButtonClick} />,
        }
      if (step.title === 'Amount')
        return {
          ...step,
          content: <AmountStep />,
        }

      return step
    })
  }, [onNewBeneficiaryButtonClick])

  useEffect(() => {
    if (returnUrl) dispatch(setReturnUrl(returnUrl))
  }, [returnUrl])

  return (
    <div className={styles['PaymentClient']}>
      <div
        className={styles['PaymentClient__bg']}
        style={{
          backgroundColor: Colors.grey.neutral50,
        }}
      >
        <StepTracker current={step} stepData={modifiedStepsTrackerData} status={stepStatus} />
      </div>
      {/* Hide after on confirmation */}
      {step < 3 && <PaymentSummary />}
    </div>
  )
}

const PaymentClient: React.FC<PaymentClientProps> = ({ onNewBeneficiaryButtonClick, accountId, returnUrl }) => {
  return (
    <PaymentProvider step={0} totalSteps={stepsTrackerData.length}>
      <Steps accountId={accountId} returnUrl={returnUrl} onNewBeneficiaryButtonClick={onNewBeneficiaryButtonClick} />
    </PaymentProvider>
  )
}

export { PaymentClient }
