/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClientAccounts = /* GraphQL */ `
  query GetClientAccounts($nextToken: String, $limit: Int) {
    GetClientAccounts(nextToken: $nextToken, limit: $limit) {
      accounts {
        id
        currency
        balance
        accountIdentification {
          accountNumber
          accountRegion
          bankCode
          IBAN
          BIC
        }
        accountName
        accountStatus
      }
      nextToken
    }
  }
`
export const getBeneficiaries = /* GraphQL */ `
  query GetBeneficiaries(
    $currency: String
    $accountNumber: String
    $nameOnAccount: String
    $country: String
    $status: String
    $nextToken: String
    $limit: Int
  ) {
    GetBeneficiaries(
      currency: $currency
      accountNumber: $accountNumber
      nameOnAccount: $nameOnAccount
      country: $country
      status: $status
      nextToken: $nextToken
      limit: $limit
    ) {
      beneficiaries {
        id
        currency
        accountDetails {
          bic
          iban
          accountNumber
          nameOnAccount
        }
        beneficiaryDetails {
          nameOnAccount
          type
        }
        status
      }
      nextToken
    }
  }
`
