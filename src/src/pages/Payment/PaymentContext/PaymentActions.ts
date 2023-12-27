import { Account, Beneficiary } from '__generated__/graphql'
import { PaymentStateProps } from './PaymentState'

export const Actions = {
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREVIOUS_STEP: 'PREVIOUS_STEP',
  SET_ACCOUNT: 'SET_ACCOUNT',
  REMOVE_ACCOUNT: 'REMOVE_ACCOUNT',
  SET_BENEFICIARY: 'SET_BENEFICIARY',
  REMOVE_BENEFICIARY: 'REMOVE_BENEFICIARY',
  SET_AMOUNT: 'SET_AMOUNT',
  SET_STEP_STATUS: 'SET_STEP_STATUS',
  SET_RETURN_URL: 'SET_RETURN_URL',
  SET_QUOTE: 'SET_QUOTE',
  SET_ERROR: 'SET_ERROR',
  QUOTE_LOADING: 'QUOTE_LOADING',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  SET_FULL_BALANCE: 'SET_FULL_BALANCE',
  SET_ACCOUNT_SEARCH_TERM: 'SET_ACCOUNT_SEARCH_TERM',
  SET_BENEFICIARY_SEARCH_TERM: 'SET_BENEFICIARY_SEARCH_TERM',
} as const

export type PayloadAction<T> = T

type NextStepType = { type: typeof Actions.NEXT_STEP }
export const nextStep = (): NextStepType => ({
  type: Actions.NEXT_STEP,
})

type PreviousStepType = { type: typeof Actions.PREVIOUS_STEP }
export const previousStep = (): PreviousStepType => ({
  type: Actions.PREVIOUS_STEP,
})

type SetAccount = {
  type: typeof Actions.SET_ACCOUNT
  payload: PayloadAction<Account>
}
export const setAccount = (account: Account): SetAccount => ({
  type: Actions.SET_ACCOUNT,
  payload: account,
})

type RemoveSelectedAccount = {
  type: typeof Actions.REMOVE_ACCOUNT
}
export const removeSelectedAccount = (): RemoveSelectedAccount => ({
  type: Actions.REMOVE_ACCOUNT,
})

type SetBeneficiary = {
  type: typeof Actions.SET_BENEFICIARY
  payload: PayloadAction<Beneficiary>
}
export const setBeneficiary = (beneficiary: Beneficiary): SetBeneficiary => ({
  type: Actions.SET_BENEFICIARY,
  payload: beneficiary,
})

type RemoveSelectedBeneficiary = {
  type: typeof Actions.REMOVE_BENEFICIARY
}
export const removeSelectedBeneficiary = (): RemoveSelectedBeneficiary => ({
  type: Actions.REMOVE_BENEFICIARY,
})

type SetAmount = {
  type: typeof Actions.SET_AMOUNT
  payload: PayloadAction<string>
}
export const setAmount = (amount: string): SetAmount => ({
  type: Actions.SET_AMOUNT,
  payload: amount,
})

type SetStepStatus = {
  type: typeof Actions.SET_STEP_STATUS
  payload: PayloadAction<PaymentStateProps['stepStatus']>
}
export const setStepStatus = (status: PaymentStateProps['stepStatus']): SetStepStatus => ({
  type: Actions.SET_STEP_STATUS,
  payload: status,
})

type SetReturnUrl = { type: typeof Actions.SET_RETURN_URL; payload: string }
export const setReturnUrl = (url: string): SetReturnUrl => ({
  type: Actions.SET_RETURN_URL,
  payload: url,
})

type QuoteProps = NonNullable<PaymentStateProps['quote']>
type SetQuote = {
  type: typeof Actions.SET_QUOTE
  payload: QuoteProps
}
export const setQuote = (quote: QuoteProps): SetQuote => ({
  type: Actions.SET_QUOTE,
  payload: quote,
})

type SetErrorMsg = {
  type: typeof Actions.SET_ERROR
  payload: string | undefined
}
export const SetErrorMsg = (payload: string | undefined) => {
  return {
    type: Actions.SET_ERROR,
    payload,
  }
}

type SetQuoteLoading = {
  type: typeof Actions.QUOTE_LOADING
  payload: boolean
}
export const SetQuoteLoading = (payload: boolean) => {
  return {
    type: Actions.QUOTE_LOADING,
    payload,
  }
}

type SetDescription = { type: typeof Actions.SET_DESCRIPTION; payload: string }
export const updateDescription = (description: string): SetDescription => ({
  type: Actions.SET_DESCRIPTION,
  payload: description,
})

type SetAccountSearchTerm = {
  type: typeof Actions.SET_ACCOUNT_SEARCH_TERM
  payload: string
}
export const setAccountSearchTerm = (searchTerm: string): SetAccountSearchTerm => ({
  type: Actions.SET_ACCOUNT_SEARCH_TERM,
  payload: searchTerm,
})

type SetBeneficiarySearchTerm = {
  type: typeof Actions.SET_BENEFICIARY_SEARCH_TERM
  payload: string
}
export const setBeneficiarySearchTerm = (searchTerm: string): SetBeneficiarySearchTerm => ({
  type: Actions.SET_BENEFICIARY_SEARCH_TERM,
  payload: searchTerm,
})

type SetFullBalanceCheck = {
  type: typeof Actions.SET_FULL_BALANCE
  payload: boolean
}
export const setFullBalanceCheck = (fullBalance: boolean): SetFullBalanceCheck => ({
  type: Actions.SET_FULL_BALANCE,
  payload: fullBalance,
})

//! Add All types here to see them in the ActionsType
export type ActionType =
  | NextStepType
  | PreviousStepType
  | SetAccount
  | SetBeneficiary
  | SetAmount
  | SetStepStatus
  | SetReturnUrl
  | SetQuote
  | SetErrorMsg
  | SetQuoteLoading
  | SetDescription
  | RemoveSelectedAccount
  | RemoveSelectedBeneficiary
  | SetAccountSearchTerm
  | SetBeneficiarySearchTerm
  | SetFullBalanceCheck
