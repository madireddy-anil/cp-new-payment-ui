import { gql } from '__generated__/gql'

export const getClientAccounts = gql(/* GraphQL */ `
  query GetClientAccounts($limit: Int, $nextToken: String, $productIds: [String]) {
    GetClientAccounts(limit: $limit, nextToken: $nextToken, productIds: $productIds) {
      accounts {
        accountIdentification {
          accountNumber
        }
        accountName
        availableBalance
        currency
        mainCurrency
        currencyType
        id
      }
      nextToken
    }
  }
`)

export const getAccountById = gql(/* GraphQL */ `
  query GetAccountById($id: ID!) {
    GetAccountById(id: $id) {
      accountIdentification {
        accountNumber
      }
      accountName
      availableBalance
      currency
      mainCurrency
      id
    }
  }
`)

export const getAccountsSearch = gql(`
  query AccountsFullTextSearch($text: String!, $productIds: [String]) {
    AccountsFullTextSearch(text: $text, productIds: $productIds) {
      accountIdentification {
        accountNumber
      }
      accountName
      availableBalance
      currency
      currencyType
      mainCurrency
      id
    }
  }
`)
