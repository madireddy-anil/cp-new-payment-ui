import React, { useContext, useState } from 'react'
import { Spacer, Search, Cards, Spin } from '@payconstruct/design-system'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import { nextStep, setAccount, setAccountSearchTerm } from 'pages/Payment/PaymentContext/PaymentActions'
import { useQuery } from '@apollo/client'
import { getAccountsSearch, getClientAccounts } from 'state/contextProviders/apollo/queries/Accounts'
import { SearchTermNotFound } from '../SearchNotFound/SearchTermNotFound'
import { Header } from '../Header/Header'
import { Hooks, Helpers } from '@payconstruct/fe-utils'
import styles from './Steps.module.sass'

const { truncateAccountNumber, fractionFormat } = Helpers
const { useDebounce } = Hooks
const { TileCard } = Cards

const AccountStep: React.FC = () => {
  const {
    dispatch,
    state: { accountSearchTerm },
  } = useContext(PaymentContext)

  const [listOfProducts] = useState(['fee1b2fb-4f1d-46e2-9ca3-7ec67f4727c9', '767627f3-b72f-4e6e-a28b-192c1d1014fa'])

  const { data: clientAccounts, loading } = useQuery(getClientAccounts, {
    variables: {
      //* Filter accounts by productIds
      productIds: listOfProducts,
    },
  })

  const allClientAccounts = clientAccounts?.GetClientAccounts?.accounts ?? []

  const [searchTerm, setLocalSearchTerm] = useState('')
  const [showSearchTermNotFound, setShowSearchTermNotFound] = useState(false)

  const { loading: loadingSearchAccounts, data: searchAccountsData } = useQuery(getAccountsSearch, {
    variables: {
      text: accountSearchTerm,
      productIds: listOfProducts,
    },
    onCompleted: ({ AccountsFullTextSearch = [] }) => {
      const allSearchedAccounts = AccountsFullTextSearch ?? []
      setShowSearchTermNotFound(!!accountSearchTerm && allSearchedAccounts.length < 1)
    },
  })

  const allSearchedAccounts = searchAccountsData?.AccountsFullTextSearch ?? []

  useDebounce(() => dispatch(setAccountSearchTerm(searchTerm)), 350, [searchTerm])

  const filter = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setShowSearchTermNotFound(false)
    setLocalSearchTerm(value.toUpperCase())
  }

  const AllAccounts = () => {
    if (showSearchTermNotFound) return <SearchTermNotFound searchTerm={accountSearchTerm} />

    const accounts = allSearchedAccounts.length < 1 ? [...allClientAccounts] : [...allSearchedAccounts]

    return accounts
      ?.sort((a, b) => Number(b?.availableBalance) - Number(a?.availableBalance))
      .map((account, i) => {
        return (
          <React.Fragment key={`clientAccount-${i}`}>
            <TileCard
              id={`${i}-${account?.accountIdentification?.accountNumber}`}
              currencyTag={{
                prefix: account?.currency,
                currency: account?.currency ?? '',
              }}
              onClick={() => {
                if (account) dispatch(setAccount(account))
                dispatch(nextStep())
              }}
              title={fractionFormat(Number(account?.availableBalance))}
              description={account?.accountName}
              extraDescription={truncateAccountNumber(account?.accountIdentification?.accountNumber ?? '')}
              disabled={account?.availableBalance && parseFloat(account?.availableBalance) <= 0 ? true : false}
              toolTipText={
                account?.availableBalance && parseFloat(account?.availableBalance) <= 0
                  ? "This account doesn't have sufficient funds."
                  : ''
              }
              extraTitle="Account"
              mode="light"
              size="default"
            />
            <Spacer size={16} />
          </React.Fragment>
        )
      })
  }

  return (
    <div className={styles['StepContent']}>
      <div className={styles['StepContent-item']}>
        <Header title="Account" subTitle="Select an account to make a payment from." />
        <Search
          name="account_search"
          placeholder="Search by account name, number or currency"
          value={accountSearchTerm}
          onChange={filter}
          disabled={loading}
          onClear={() => {
            dispatch(setAccountSearchTerm(''))
          }}
        />
        <Spacer size={16} />
      </div>

      <div className={styles['StepWrapper']}>
        <Spin loading={loading || loadingSearchAccounts}>
          <div id="accounts-list" className={styles['card-list']}>
            {AllAccounts()}
          </div>
        </Spin>
      </div>
    </div>
  )
}

export { AccountStep }
