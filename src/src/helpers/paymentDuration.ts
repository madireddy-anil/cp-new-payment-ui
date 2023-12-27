const commonCurrencies = ['EUR', 'USD', 'CAD', 'CHF', 'CZK', 'DKK', 'HUF', 'NOK', 'PLN', 'RON', 'SEK']

const settlementCurrencies02 = ['USDT', 'USDC', 'ETH', 'BTC', 'BCH', 'LTC']
const settlementCurrencies01 = ['GBP']

export const paymentBankChargeText = (selectedCurrency: string, selectedBeneCurrency: string) => {
  return commonCurrencies.includes(selectedCurrency || selectedBeneCurrency)
    ? "The beneficiary's bank may charge a fee and reduce the total received by the beneficiary"
    : ''
}

export const paymentSettlementChargeText = (selectedCurrency: string, selectedBeneCurrency: string) => {
  if (commonCurrencies.includes(selectedCurrency || selectedBeneCurrency)) {
    return 'Normally, the payment should take up to two working days to complete.'
  } else if (settlementCurrencies02.includes(selectedCurrency || selectedBeneCurrency)) {
    return 'Normally, the payment should take up to one hour to complete.'
  } else if (settlementCurrencies01.includes(selectedCurrency || selectedBeneCurrency)) {
    return 'Normally, the payment should take up to two hours to complete.'
  } else {
    return ''
  }
}
