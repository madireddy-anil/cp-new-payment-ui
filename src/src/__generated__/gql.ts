/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation RequestQuote($quote: QuoteRequestInput) {\n    RequestQuote(quote: $quote) {\n      EventId\n    }\n  }\n": types.RequestQuoteDocument,
    "\n  query GetClientAccounts($limit: Int, $nextToken: String, $productIds: [String]) {\n    GetClientAccounts(limit: $limit, nextToken: $nextToken, productIds: $productIds) {\n      accounts {\n        accountIdentification {\n          accountNumber\n        }\n        accountName\n        availableBalance\n        currency\n        mainCurrency\n        currencyType\n        id\n      }\n      nextToken\n    }\n  }\n": types.GetClientAccountsDocument,
    "\n  query GetAccountById($id: ID!) {\n    GetAccountById(id: $id) {\n      accountIdentification {\n        accountNumber\n      }\n      accountName\n      availableBalance\n      currency\n      mainCurrency\n      id\n    }\n  }\n": types.GetAccountByIdDocument,
    "\n  query AccountsFullTextSearch($text: String!, $productIds: [String]) {\n    AccountsFullTextSearch(text: $text, productIds: $productIds) {\n      accountIdentification {\n        accountNumber\n      }\n      accountName\n      availableBalance\n      currency\n      currencyType\n      mainCurrency\n      id\n    }\n  }\n": types.AccountsFullTextSearchDocument,
    "\n  query GetBeneficiaries($currency: [String], $mainCurrency: String, $status: [String]) {\n    GetBeneficiaries(currency: $currency, mainCurrency: $mainCurrency, status: $status) {\n      beneficiaries {\n        accountDetails {\n          iban\n          accountNumber\n          nameOnAccount\n        }\n        currency\n        mainCurrency\n        id\n        status\n      }\n    }\n  }\n": types.GetBeneficiariesDocument,
    "\n  query BeneficiaryFullTextSearch($text: String!, $currency: [String], $mainCurrency: String, $status: [String]) {\n    BeneficiaryFullTextSearch(text: $text, currency: $currency, mainCurrency: $mainCurrency, status: $status) {\n      id\n      status\n      currency\n      mainCurrency\n      accountDetails {\n        iban\n        nameOnAccount\n        accountNumber\n      }\n    }\n  }\n": types.BeneficiaryFullTextSearchDocument,
    "\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      fee\n      sourceAmount\n      destinationAmount\n      errorCode\n      errorMessage\n    }\n  }\n": types.OnQuotePriceReceivedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestQuote($quote: QuoteRequestInput) {\n    RequestQuote(quote: $quote) {\n      EventId\n    }\n  }\n"): (typeof documents)["\n  mutation RequestQuote($quote: QuoteRequestInput) {\n    RequestQuote(quote: $quote) {\n      EventId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetClientAccounts($limit: Int, $nextToken: String, $productIds: [String]) {\n    GetClientAccounts(limit: $limit, nextToken: $nextToken, productIds: $productIds) {\n      accounts {\n        accountIdentification {\n          accountNumber\n        }\n        accountName\n        availableBalance\n        currency\n        mainCurrency\n        currencyType\n        id\n      }\n      nextToken\n    }\n  }\n"): (typeof documents)["\n  query GetClientAccounts($limit: Int, $nextToken: String, $productIds: [String]) {\n    GetClientAccounts(limit: $limit, nextToken: $nextToken, productIds: $productIds) {\n      accounts {\n        accountIdentification {\n          accountNumber\n        }\n        accountName\n        availableBalance\n        currency\n        mainCurrency\n        currencyType\n        id\n      }\n      nextToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAccountById($id: ID!) {\n    GetAccountById(id: $id) {\n      accountIdentification {\n        accountNumber\n      }\n      accountName\n      availableBalance\n      currency\n      mainCurrency\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetAccountById($id: ID!) {\n    GetAccountById(id: $id) {\n      accountIdentification {\n        accountNumber\n      }\n      accountName\n      availableBalance\n      currency\n      mainCurrency\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AccountsFullTextSearch($text: String!, $productIds: [String]) {\n    AccountsFullTextSearch(text: $text, productIds: $productIds) {\n      accountIdentification {\n        accountNumber\n      }\n      accountName\n      availableBalance\n      currency\n      currencyType\n      mainCurrency\n      id\n    }\n  }\n"): (typeof documents)["\n  query AccountsFullTextSearch($text: String!, $productIds: [String]) {\n    AccountsFullTextSearch(text: $text, productIds: $productIds) {\n      accountIdentification {\n        accountNumber\n      }\n      accountName\n      availableBalance\n      currency\n      currencyType\n      mainCurrency\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBeneficiaries($currency: [String], $mainCurrency: String, $status: [String]) {\n    GetBeneficiaries(currency: $currency, mainCurrency: $mainCurrency, status: $status) {\n      beneficiaries {\n        accountDetails {\n          iban\n          accountNumber\n          nameOnAccount\n        }\n        currency\n        mainCurrency\n        id\n        status\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBeneficiaries($currency: [String], $mainCurrency: String, $status: [String]) {\n    GetBeneficiaries(currency: $currency, mainCurrency: $mainCurrency, status: $status) {\n      beneficiaries {\n        accountDetails {\n          iban\n          accountNumber\n          nameOnAccount\n        }\n        currency\n        mainCurrency\n        id\n        status\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BeneficiaryFullTextSearch($text: String!, $currency: [String], $mainCurrency: String, $status: [String]) {\n    BeneficiaryFullTextSearch(text: $text, currency: $currency, mainCurrency: $mainCurrency, status: $status) {\n      id\n      status\n      currency\n      mainCurrency\n      accountDetails {\n        iban\n        nameOnAccount\n        accountNumber\n      }\n    }\n  }\n"): (typeof documents)["\n  query BeneficiaryFullTextSearch($text: String!, $currency: [String], $mainCurrency: String, $status: [String]) {\n    BeneficiaryFullTextSearch(text: $text, currency: $currency, mainCurrency: $mainCurrency, status: $status) {\n      id\n      status\n      currency\n      mainCurrency\n      accountDetails {\n        iban\n        nameOnAccount\n        accountNumber\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      fee\n      sourceAmount\n      destinationAmount\n      errorCode\n      errorMessage\n    }\n  }\n"): (typeof documents)["\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      fee\n      sourceAmount\n      destinationAmount\n      errorCode\n      errorMessage\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;