import { gql } from '__generated__/gql'

export const getBeneficiaries = gql(`
  query GetBeneficiaries($currency: [String], $mainCurrency: String, $status: [String]) {
    GetBeneficiaries(currency: $currency, mainCurrency: $mainCurrency, status: $status) {
      beneficiaries {
        accountDetails {
          iban
          accountNumber
          nameOnAccount
        }
        currency
        mainCurrency
        id
        status
      }
    }
  }
`)

export const getBeneficiariesSearch = gql(`
  query BeneficiaryFullTextSearch($text: String!, $currency: [String], $mainCurrency: String, $status: [String]) {
    BeneficiaryFullTextSearch(text: $text, currency: $currency, mainCurrency: $mainCurrency, status: $status) {
      id
      status
      currency
      mainCurrency
      accountDetails {
        iban
        nameOnAccount
        accountNumber
      }
    }
  }
`)
