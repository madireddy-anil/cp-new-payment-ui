import { Account, Beneficiary, MutationQuotePriceReceivedArgs } from '__generated__/graphql'

export interface PaymentStateProps {
  returnUrl: string
  selectedAccount?: Account
  selectedBeneficiary?: Beneficiary
  accountSearchTerm: string
  beneficiarySearchTerm: string
  amount?: string
  quote: Partial<MutationQuotePriceReceivedArgs>
  quoteErrMessage: string | undefined
  quoteLoading: boolean
  step: number
  totalSteps: number
  stepStatus?: 'error' | 'finish'
  description: string
  isFullBalanceChecked: boolean
}

export const PaymentState: PaymentStateProps = {
  returnUrl: '/',
  selectedAccount: undefined,
  selectedBeneficiary: undefined,
  amount: undefined,
  stepStatus: undefined,
  totalSteps: 0,
  step: 0,
  accountSearchTerm: '',
  beneficiarySearchTerm: '',
  description: '',
  isFullBalanceChecked: false,
  quoteLoading: false,
  quote: {
    fee: '',
    sourceAmount: '',
    destinationAmount: '',
  },
  quoteErrMessage: undefined,
}
