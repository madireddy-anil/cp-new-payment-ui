import React, { useContext, useEffect, useState } from 'react'
import { Button, Cards, Search, Spacer, Spin } from '@payconstruct/design-system'
import { useQuery } from '@apollo/client'

import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import {
  nextStep,
  previousStep,
  removeSelectedAccount,
  setBeneficiary,
  setBeneficiarySearchTerm,
} from 'pages/Payment/PaymentContext/PaymentActions'
import { getBeneficiaries, getBeneficiariesSearch } from 'state/contextProviders/apollo/queries/Beneficiary'
import { SearchTermNotFound } from '../SearchNotFound/SearchTermNotFound'
import { useHostStore } from 'hostStore/hostStore'
import { Header } from '../Header/Header'
import { Helpers, Hooks } from '@payconstruct/fe-utils'
import styles from './Steps.module.sass'

const { useDebounce } = Hooks
const { truncateAccountNumber } = Helpers

interface BeneficiaryStepProps {
  onNewBeneficiaryButtonClick?: () => void
}

const BeneficiaryStep: React.FC<BeneficiaryStepProps> = () => {
  const { TileCard } = Cards
  const {
    dispatch,
    state: { selectedAccount, beneficiarySearchTerm },
  } = useContext(PaymentContext)
  const { hasNewBeneCreated, showAddNewBeneModal } = useHostStore()

  const [showSearchTermNotFound, setShowSearchTermNotFound] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  //bene status: new,pending,approved,rejected
  const [beneStatusList] = useState(['new', 'approved'])

  const {
    refetch: getBenes,
    data: BeneResponse,
    loading,
  } = useQuery(getBeneficiaries, {
    variables: {
      currency: [selectedAccount?.currency ?? ''],
      mainCurrency: selectedAccount?.mainCurrency,
      status: beneStatusList,
    },
  })

  const AllBenes = BeneResponse?.GetBeneficiaries?.beneficiaries ?? []

  const { loading: searchBeneLoading, data: searchBeneData } = useQuery(getBeneficiariesSearch, {
    variables: {
      text: beneficiarySearchTerm,
      currency: [selectedAccount?.currency ?? ''],
      mainCurrency: selectedAccount?.mainCurrency,
      status: beneStatusList,
    },
    onCompleted: ({ BeneficiaryFullTextSearch }) => {
      const searchedAccounts = BeneficiaryFullTextSearch ?? []
      setShowSearchTermNotFound(!!beneficiarySearchTerm && searchedAccounts.length < 1)
    },
  })

  const allSearchBeneAccounts = searchBeneData?.BeneficiaryFullTextSearch ?? []
  const filteredByCurrencySearch = allSearchBeneAccounts

  useEffect(() => {
    hasNewBeneCreated &&
      getBenes({
        currency: [selectedAccount?.currency ?? ''],
        mainCurrency: selectedAccount?.mainCurrency,
      })
  }, [hasNewBeneCreated])

  useDebounce(() => dispatch(setBeneficiarySearchTerm(searchValue)), 350, [searchValue])

  const filter = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value.toUpperCase())
  }

  const AllBeneficiaryCards = () => {
    if (showSearchTermNotFound) return <SearchTermNotFound searchTerm={beneficiarySearchTerm} />

    const beneficiaries = filteredByCurrencySearch.length < 1 ? [...AllBenes] : [...filteredByCurrencySearch]

    return beneficiaries
      .sort((a, b) => {
        const a_name = a?.accountDetails?.nameOnAccount ?? ''
        const b_name = b?.accountDetails?.nameOnAccount ?? ''

        if (a_name < b_name) return -1
        return 1
      })
      .map((bene, i) => {
        const beneAccountNumber = bene?.accountDetails?.accountNumber ?? bene?.accountDetails?.iban ?? ''

        return (
          <React.Fragment key={`bene-${i}`}>
            <TileCard
              key={`bene-${i}`}
              id={`${i}-${beneAccountNumber}`}
              style={{ marginBottom: '16px' }}
              onClick={() => {
                dispatch(nextStep())
                if (bene)
                  dispatch(
                    setBeneficiary({
                      ...bene,
                      __typename: 'Beneficiary',
                      accountDetails: {
                        __typename: 'AccountDetails',
                        accountNumber: bene.accountDetails?.accountNumber ?? '',
                        nameOnAccount: bene.accountDetails?.nameOnAccount ?? '',
                        iban: bene.accountDetails?.iban ?? '',
                      },
                    })
                  )
              }}
              title={bene?.accountDetails?.nameOnAccount}
              description={bene?.currency}
              extraDescription={truncateAccountNumber(beneAccountNumber)}
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
        <Header
          title="Beneficiary"
          subTitle="Select the beneficiary you want to pay."
          onClickAddBene={() => showAddNewBeneModal()}
        />
        <Search
          name="bene_search"
          placeholder="Search by beneficiary name or account"
          value={beneficiarySearchTerm}
          onChange={filter}
          disabled={loading}
          onClear={() => {
            dispatch(setBeneficiarySearchTerm(''))
          }}
        />
        <Spacer size={16} />
      </div>

      <div className={styles['StepWrapper']}>
        <Spin loading={loading || searchBeneLoading}>
          <div id="Beneficiaries-list" className={styles['card-list']}>
            {AllBeneficiaryCards()}
          </div>
        </Spin>
      </div>

      <div className={styles['StepContent-footer']}>
        <Spacer size={25} />
        <Button
          type="secondary"
          label={'Back'}
          onClick={() => {
            // const selectedAccount = {};
            // dispatch(updateSelectedAccount(selectedAccount));
            dispatch(previousStep())
            dispatch(removeSelectedAccount())
            dispatch(setBeneficiarySearchTerm(''))
          }}
          icon={{ name: 'leftArrow', position: 'left' }}
        />
      </div>
    </div>
  )
}

export { BeneficiaryStep }
