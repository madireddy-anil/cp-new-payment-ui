import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, ErrorHandler } from 'pages/Error/ErrorHandler'
import { AsyncIntlProvider } from './intl/IntlProvider'
import { ApolloProvider } from 'state/contextProviders/apollo/ApolloProvider'

const ProviderWrapper: React.FC = ({ children }) => {
  return (
    <ApolloProvider>
      <AsyncIntlProvider>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={ErrorHandler}
          // onReset={() => {}}
        >
          {children}
        </ErrorBoundary>
      </AsyncIntlProvider>
    </ApolloProvider>
  )
}

export { ProviderWrapper }
