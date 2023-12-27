import React from 'react'
import { Colors, Text } from '@payconstruct/design-system'

interface SearchTermNotFoundProps {
  searchTerm: string
}
const SearchTermNotFound: React.FC<SearchTermNotFoundProps> = ({ searchTerm }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Text size="small" color={Colors.grey.neutral300}>
        Search term not found:
        <Text size="small" weight="bold" color={Colors.grey.neutral500}>
          <i>{` "${searchTerm}"`}</i>
        </Text>
      </Text>
    </div>
  )
}

export { SearchTermNotFound }
