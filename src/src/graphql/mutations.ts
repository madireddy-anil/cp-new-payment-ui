/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const requestQuote = /* GraphQL */ `
  mutation RequestQuote($quote: QuoteRequestInput) {
    RequestQuote(quote: $quote) {
      EventId
    }
  }
`
export const quotePriceReceived = /* GraphQL */ `
  mutation QuotePriceReceived(
    $accountId: String!
    $sourceCurrency: String!
    $sourceAmount: String!
    $destinationCurrency: String!
    $destinationAmount: String!
    $fee: String!
    $entityId: String!
    $userId: String!
  ) {
    QuotePriceReceived(
      accountId: $accountId
      sourceCurrency: $sourceCurrency
      sourceAmount: $sourceAmount
      destinationCurrency: $destinationCurrency
      destinationAmount: $destinationAmount
      fee: $fee
      entityId: $entityId
      userId: $userId
    ) {
      accountId
      sourceCurrency
      sourceAmount
      destinationCurrency
      destinationAmount
      fee
      entityId
      userId
    }
  }
`
export const createBeneficiary = /* GraphQL */ `
  mutation CreateBeneficiary($beneficiary: BeneficiaryInput) {
    CreateBeneficiary(beneficiary: $beneficiary) {
      EventId
    }
  }
`
export const removeBeneficiary = /* GraphQL */ `
  mutation RemoveBeneficiary($beneficiary: BeneficiaryInput) {
    RemoveBeneficiary(beneficiary: $beneficiary) {
      EventId
    }
  }
`
