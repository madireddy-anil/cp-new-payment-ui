import React from 'react'
import { Button, Spacer, Text } from '@payconstruct/design-system'

interface HeaderProps {
  title: string
  subTitle: string
  onClickAddBene?: () => void
}
const Header: React.FC<HeaderProps> = ({ title, subTitle, onClickAddBene }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Spacer size={30} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text size="small">{subTitle}</Text>
        {title === 'Beneficiary' && (
          <Button
            type="tertiary"
            label={'New beneficiary'}
            icon={{ name: 'add', position: 'left' }}
            onClick={onClickAddBene}
          />
        )}
      </div>
      <Spacer size={24} />
    </div>
  )
}

export { Header }
