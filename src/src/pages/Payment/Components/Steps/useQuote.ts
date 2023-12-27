import { useContext, useState } from 'react'
import { SetErrorMsg, SetQuoteLoading, setQuote } from 'pages/Payment/PaymentContext/PaymentActions'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import { ApolloError, useSubscription } from '@apollo/client'
import { MutationQuotePriceReceivedArgs, OnQuotePriceReceivedSubscription } from '__generated__/graphql'
import { onQuotePriceReceived } from 'state/contextProviders/apollo/subscriptions/onQuotePriceReceived'

export type QuoteErrorCode =
  | 'PricingNotFoundException'
  | 'PayloadErrorException'
  | 'PayloadErrorException'
  | 'NotImplementedException'
  | 'InternalServerErrorException'
  | 'InsufficientFundException'
  | 'InsufficientFundException'

export type Quote = {
  fee: string
  sourceAmount: string
  destinationAmount: string
}

export type useQuoteProps = {
  error: QuoteErrorCode | undefined
  quote: Quote
}

export type SubscriptionError = {
  message: string
}
type SubscriptionErr = ApolloError & { errors: SubscriptionError[] }

export const useQuote = () => {
  const {
    dispatch,
    state: { quote: StateQuote },
  } = useContext(PaymentContext)

  const [reSubscribe, setReSubscribe] = useState(false)

  useSubscription(onQuotePriceReceived, {
    onData: ({ data }) => {
      const quoteData = data?.data
      setReSubscribe(false)
      if (quoteData) OnQuoteReceived(quoteData)
    },
    onError: (err: Partial<SubscriptionErr>) => {
      const { errors } = err
      if (errors?.length && errors[0]?.message === 'Connection Closed') {
        setReSubscribe(true)
      }
    },
    shouldResubscribe: reSubscribe,
  })

  const [error, setError] = useState<QuoteErrorCode | string>()

  const [emptyQuote] = useState({
    fee: '',
    sourceAmount: '',
    destinationAmount: '',
  })

  function OnQuoteReceivedErrorHandler(errorCode: QuoteErrorCode, errorMsg: string) {
    switch (errorCode) {
      default:
        setError(errorMsg ?? errorCode)
        dispatch(setQuote(emptyQuote))
        dispatch(SetQuoteLoading(false))
    }
  }

  const OnQuoteReceived = (data: OnQuotePriceReceivedSubscription) => {
    const quoteReceived = data?.OnQuotePriceReceived as Partial<MutationQuotePriceReceivedArgs>
    const errorCode = data?.OnQuotePriceReceived?.errorCode as QuoteErrorCode
    const errorMsg = data?.OnQuotePriceReceived?.errorMessage as string

    if (errorCode) {
      dispatch(SetErrorMsg(errorMsg ?? errorCode))
      return OnQuoteReceivedErrorHandler(errorCode, errorMsg)
    } else {
      setError(undefined)
      dispatch(setQuote(quoteReceived))
      dispatch(SetErrorMsg(undefined))
      dispatch(SetQuoteLoading(false))
    }
  }

  return {
    error,
    emptyQuote,
    quote: !StateQuote ? emptyQuote : StateQuote,
  }
}
