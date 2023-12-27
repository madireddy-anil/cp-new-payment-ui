import { ActionType, Actions } from './PaymentActions'
import { PaymentStateProps } from './PaymentState'

export function PaymentReducer(state: PaymentStateProps, action: ActionType): PaymentStateProps {
  switch (action.type) {
    case Actions.NEXT_STEP:
      if (state.step === state.totalSteps - 1) return state
      return { ...state, step: state.step + 1 }

    case Actions.PREVIOUS_STEP:
      if (state.step === 0) return state
      return { ...state, step: state.step - 1 }

    case Actions.SET_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
      }

    case Actions.REMOVE_ACCOUNT:
      return {
        ...state,
        selectedAccount: undefined,
      }

    case Actions.SET_BENEFICIARY:
      return { ...state, selectedBeneficiary: action.payload }

    case Actions.REMOVE_BENEFICIARY:
      return { ...state, selectedBeneficiary: undefined }

    case Actions.SET_AMOUNT:
      return { ...state, amount: action.payload }

    case Actions.SET_STEP_STATUS:
      return { ...state, stepStatus: action.payload }

    case Actions.SET_RETURN_URL:
      return { ...state, returnUrl: action.payload }

    case Actions.SET_ERROR:
      return { ...state, quoteErrMessage: action.payload }

    case Actions.QUOTE_LOADING:
      return { ...state, quoteLoading: action.payload }

    case Actions.SET_QUOTE:
      return { ...state, quote: action.payload }

    case Actions.SET_DESCRIPTION:
      return { ...state, description: action.payload }

    case Actions.SET_ACCOUNT_SEARCH_TERM:
      return { ...state, accountSearchTerm: action.payload }

    case Actions.SET_BENEFICIARY_SEARCH_TERM:
      return { ...state, beneficiarySearchTerm: action.payload }

    case Actions.SET_FULL_BALANCE:
      return { ...state, isFullBalanceChecked: action.payload }

    default:
      return state
  }
}
