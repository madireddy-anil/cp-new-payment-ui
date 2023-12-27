import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import {
  Button,
  CurrencyTag,
  Form,
  InputAmount,
  ProgressLine,
  Spacer,
  Checkbox,
  Text,
  Input,
} from '@payconstruct/design-system'
import { PaymentContext } from 'pages/Payment/PaymentContext/PaymentProvider'
import {
  SetErrorMsg,
  SetQuoteLoading,
  nextStep,
  previousStep,
  removeSelectedBeneficiary,
  setFullBalanceCheck,
  setQuote,
  updateDescription,
} from 'pages/Payment/PaymentContext/PaymentActions'
import { onMouseEvent } from '@payconstruct/design-system/dist/components/atoms/FormComponent/InputInterface'
import { isNonEmptyArray } from '@apollo/client/utilities'
import { useQuoteProps } from './useQuote'
import classNames from 'classnames'
import styles from './Steps.module.sass'
import { useMutation } from '@apollo/client'
import { requestQuote } from 'state/contextProviders/apollo/mutations/RequestQuote'
import { PaymentState } from 'pages/Payment/PaymentContext/PaymentState'
import { RegexSpecialCharacter, specialCharactersCheck } from 'helpers/stringCheck'
import { Helpers, Hooks } from '@payconstruct/fe-utils'
import { Header } from '../Header/Header'

const { useDebounce } = Hooks
const { formatCurrency, currencyName, cleanCurrencyFormat } = Helpers
interface AmountStepProps {
  quoteData?: useQuoteProps
}

const AmountStep: React.FC<AmountStepProps> = () => {
  const {
    dispatch,
    state: { quote: stateQuote, selectedAccount, description, quoteErrMessage, quoteLoading, isFullBalanceChecked },
  } = useContext(PaymentContext)

  const [form] = Form.useForm()
  const [disableNext, setDisableNext] = useState(true)
  const [inputNumber, setInputNumber] = useState(stateQuote?.destinationAmount ?? '')
  const [formIsValid, setFormAsValid] = useState(false)
  const [errorNotEnoughFunds] = useState("You don't have enough funds in your account to complete this payment.")
  // const [unknownError] = useState(
  //   "There was an error in pricing your payment. Please contact customer support."
  // );
  const [initialValues] = useState({
    description: description ?? '',
    number: stateQuote?.destinationAmount ?? undefined,
    full_balance: isFullBalanceChecked,
  })

  const [requestQuoteMutation] = useMutation(requestQuote)

  // const previousQuote = usePrevious(quoteData);

  // const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // useEffect(() => {
  //   if (requestQuoteLoading) setIsLoadingQuote(true);
  // }, [requestQuoteLoading]);

  // useEffect(() => {
  //   if (previousQuote !== quoteData) setIsLoadingQuote(false);
  // }, [quoteData]);

  // const handleQuoteErrorMessage = useMemo(() => {
  //   if (!quoteErrMessage) return "";
  //   switch (quoteErrMessage) {
  //     case "InsufficientFundException":
  //       return errorNotEnoughFunds;
  //     default:
  //       return unknownError;
  //   }
  // }, [quoteErrMessage]);

  useEffect(() => {
    form.setFields([
      {
        name: 'number',
        errors: quoteErrMessage ? [quoteErrMessage] : undefined,
      },
    ])
  }, [quoteErrMessage])

  // useEffect(() => {
  //   if (isFullBalanceChecked)
  //     setInputNumber(stateQuote?.destinationAmount ?? "");

  //   if (isFullBalanceChecked && !quoteErrMessage)
  //     form.setFieldsValue({
  //       number: formatCurrency(stateQuote?.destinationAmount ?? "")
  //     });
  // }, [stateQuote, isFullBalanceChecked]);

  useEffect(() => {
    const disableNextInitialCheck = quoteLoading || quoteErrMessage || !stateQuote.destinationAmount || !formIsValid
    const disableNextComeBackCheck =
      !quoteLoading &&
      stateQuote.destinationAmount &&
      (inputNumber || stateQuote.destinationAmount) &&
      specialCharactersCheck(description)
    if (disableNextInitialCheck) {
      setDisableNext(disableNextComeBackCheck ? false : true)
      return
    }
    return setDisableNext(false)
  }, [quoteLoading, stateQuote, quoteErrMessage, formIsValid, description])

  const formatQuoteText = (value?: string) => {
    if (!value) return ''
    return `${value} ${selectedAccount?.currency ?? ''}`
  }

  useDebounce(
    () => {
      if (Number(inputNumber) >= 0 && Number(inputNumber) !== Number(stateQuote?.destinationAmount) && !quoteErrMessage)
        dispatch(SetQuoteLoading(true))
      requestQuoteMutation({
        variables: {
          quote: {
            accountId: selectedAccount?.id ?? '',
            destinationAmount: inputNumber,
            destinationCurrency: selectedAccount?.currency ?? '',
            sourceCurrency: selectedAccount?.currency ?? '',
          },
        },
      })
    },
    500,
    [inputNumber]
  )

  const onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      ? formatCurrency(event.target.value, selectedAccount?.currencyType === 'fiat' ? 2 : 6)
      : ''
    const cleanValue = cleanCurrencyFormat(inputValue)
    setInputNumber(cleanValue)
  }

  const onMouseLeave = (event: onMouseEvent) => {
    const { value } = event.target as HTMLInputElement
    const [{ errors }] = form.getFieldsError().filter(item => {
      return String(item.name) === 'number'
    })
    form.setFields([
      {
        name: 'number',
        value: formatCurrency(value, selectedAccount?.currencyType === 'fiat' ? 2 : 6),
        errors,
      },
    ])
  }

  // const showCalculatingText = useMemo(() => {
  //   if (quoteLoading && inputNumber) return true;
  //   if (quoteLoading && isFullBalanceChecked) return true;

  //   return false;
  // }, [quoteLoading, inputNumber, isFullBalanceChecked]);

  return (
    <div className={styles['StepContent']}>
      <div className={styles['StepContent-item']}>
        <Header title="Amount" subTitle="Select the amount you want the beneficiary to receive." />
        <Text size="xxsmall">
          You send: {quoteLoading ? 'Calculating...' : formatQuoteText(stateQuote.sourceAmount ?? '')}
        </Text>
        <Spacer size={10} />
        <ProgressLine
          label={`Fee: `}
          mode="light"
          value={quoteLoading ? 'Calculating...' : formatQuoteText(stateQuote.fee ?? '')}
        />
        <Spacer size={15} />
        <Form
          id="new-payment-form"
          form={form}
          initialValues={initialValues}
          onFieldsChange={(_fields, allFields) => {
            const isDescriptionTouched = form.isFieldsTouched(['description'])
            const isNumberTouched = form.isFieldsTouched(['number'])

            const listOfErrors = allFields.filter(item => {
              if (item.errors && item.errors.length < 1) return false
              return true
            })

            if (!isDescriptionTouched || !isNumberTouched || isNonEmptyArray(listOfErrors)) {
              setFormAsValid(false)
              return
            }

            setFormAsValid(true)
          }}
        >
          <InputAmount
            floatingLabel
            label="Beneficiary will receive"
            name="number"
            onChange={onNumberChange}
            onMouseLeave={onMouseLeave}
            disabled={isFullBalanceChecked}
            validateStatus={quoteErrMessage ? 'error' : undefined}
            rules={[
              // { required: true, message: "Cannot be empty" },
              {
                validator: async (_rule: string, value: string) => {
                  if (Number(cleanCurrencyFormat(value)) > Number(selectedAccount?.availableBalance)) {
                    dispatch(SetErrorMsg(errorNotEnoughFunds))
                    return Promise.reject(new Error(errorNotEnoughFunds))
                  } else dispatch(SetErrorMsg(undefined))
                },
              },
            ]}
            placeholder="0.00"
            size="xlarge"
            suffix={
              <>
                <span style={{ marginRight: '6px' }}>{selectedAccount?.currency ?? ''}</span>
                <CurrencyTag currency="" prefix={currencyName(selectedAccount?.currency)} />
              </>
            }
            type="text"
          />
          <Form.Item name="full_balance" valuePropName="checked" noStyle>
            <Checkbox
              label={'Send full account balance'}
              onChange={e => {
                dispatch(setFullBalanceCheck(e.target.checked))

                const availableBalance = formatCurrency(selectedAccount?.availableBalance ?? '')

                const hasDifferentDestinationAmount = availableBalance !== stateQuote.sourceAmount

                const isFirstRequest = stateQuote.destinationAmount === ''
                if ((e.target.checked && hasDifferentDestinationAmount) || isFirstRequest) {
                  form.setFields([
                    {
                      name: 'number',
                      value: selectedAccount?.availableBalance,
                    },
                  ])
                  dispatch(SetQuoteLoading(true))

                  requestQuoteMutation({
                    variables: {
                      quote: {
                        accountId: selectedAccount?.id ?? '',
                        sourceAmount: selectedAccount?.availableBalance,
                        destinationCurrency: selectedAccount?.currency ?? '',
                        sourceCurrency: selectedAccount?.currency ?? '',
                      },
                    },
                  })
                }
              }}
            />
          </Form.Item>
          <Spacer size={40} />
          <Input
            type="textarea"
            rules={[
              {
                required: true,
                message: 'You must fill in the description field to continue.',
              },
              {
                pattern: new RegExp(RegexSpecialCharacter),
                message: 'Payment description does not allow for special characters.',
              },
            ]}
            name={'description'}
            label={'Description'}
            placeholder={'Add you description'}
            style={{ height: '80px' }}
            onChange={e => dispatch(updateDescription(e?.target?.value))}
            required
          />
        </Form>
      </div>
      <div className={classNames(styles['StepContent-footer'], styles['StepContent-footer--buttons'])}>
        <Button
          type="secondary"
          label={'Back'}
          onClick={() => {
            dispatch(previousStep())
            dispatch(setQuote(PaymentState.quote))
            dispatch(SetErrorMsg(undefined))
            dispatch(updateDescription(''))
            dispatch(setFullBalanceCheck(false))
            dispatch(removeSelectedBeneficiary())
          }}
          icon={{ name: 'leftArrow', position: 'left' }}
        />
        <div
          style={{
            display: 'flex',
          }}
        >
          {/* <Form.Item name="executable_date" noStyle>
            <DatePicker
              name="executable_date"
              disabledDate={disabledDate}
              picker="date"
              subTitle="Select the date that the payment will be executed."
              title="Execution date"
              tooltipText="Only future dates can be selected as execution dates."
              viewType="modal"
              showToday={false}
              onSelect={(value) => {
                setDate(value.format("DD/MM/YYYY").toString());
              }}
            />
          </Form.Item> */}
          <Button
            type="primary"
            formType="submit"
            label={'Next'}
            disabled={disableNext}
            onClick={() => dispatch(nextStep())}
            style={{ marginLeft: '10px' }}
            formId={'new-payment-form'}
            icon={{ name: 'rightArrow', position: 'right' }}
          />
        </div>
      </div>
    </div>
  )
}
export { AmountStep }
