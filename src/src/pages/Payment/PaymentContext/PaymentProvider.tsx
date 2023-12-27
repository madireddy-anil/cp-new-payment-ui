import React, { useMemo, useReducer } from 'react'
import { ActionType } from './PaymentActions'
import { PaymentReducer } from './PaymentReducer'
import { PaymentState, PaymentStateProps } from './PaymentState'
// import { EncryptStorage } from 'encrypt-storage'

export const PaymentContext = React.createContext<{
  state: PaymentStateProps
  dispatch: React.Dispatch<ActionType>
}>({
  state: PaymentState,
  dispatch: () => null,
})

export interface PaymentProviderProps {
  step: number
  totalSteps: number
}

const PaymentProvider: React.FC<PaymentProviderProps> = ({ children, step, totalSteps }) => {
  // const encryptStorage = new EncryptStorage('new-payment-ui-key', {
  //   prefix: '@new-payment-ui-context',
  // })

  const [state, dispatch] = useReducer(PaymentReducer, {
    ...PaymentState,
    step,
    totalSteps,
    // ...encryptStorage.getItem('state'),
  })
  const contextValue = useMemo(() => {
    // encryptStorage.setItem('state', state)

    return { state, dispatch }
  }, [state, dispatch])

  return <PaymentContext.Provider value={contextValue}>{children}</PaymentContext.Provider>
}

export { PaymentProvider }
