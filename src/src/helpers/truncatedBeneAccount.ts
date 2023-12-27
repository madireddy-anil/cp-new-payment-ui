import { Beneficiary } from '__generated__/graphql'
import { Helpers } from '@payconstruct/fe-utils'

const { truncateAccountNumber } = Helpers

export const truncatedBeneficiaryAccountNumber = (selectedBeneficiary: Beneficiary) => {
  const { accountDetails } = selectedBeneficiary
  if (accountDetails) {
    const { iban, accountNumber } = accountDetails
    if (iban) return truncateAccountNumber(iban)
    if (accountNumber) return truncateAccountNumber(accountNumber)
  }
  return '...'
}
