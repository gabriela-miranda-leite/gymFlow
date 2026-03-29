import { useState } from 'react'

import { useTheme } from '@/contexts/ThemeContext'

import {
  Chevron,
  ColorDot,
  Container,
  ItemWrapper,
  Label,
  Sublabel,
  TextContainer,
} from './ButtonGroup.styles'

export interface ButtonGroupOption {
  label: string
  sublabel: string
  value: string
  color: string
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[]
  onSelect: (value: string) => void
  disabled?: boolean
}

export function ButtonGroup({ options, onSelect, disabled = false }: ButtonGroupProps) {
  const { theme } = useTheme()
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  function handlePress(value: string) {
    if (disabled) return
    setSelectedValue(value)
    onSelect(value)
  }

  return (
    <Container>
      {options.map((option, index) => (
        <ItemWrapper
          key={option.value}
          bg={theme.card}
          isLast={index === options.length - 1}
          disabled={disabled}
          onPress={() => handlePress(option.value)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`${option.label}, ${option.sublabel}`}
          accessibilityState={{
            selected: selectedValue === option.value,
            disabled: !!disabled,
          }}
        >
          <ColorDot color={option.color} />
          <TextContainer>
            <Label color={theme.foreground}>{option.label}</Label>
            <Sublabel color={theme.mutedForeground}>{option.sublabel}</Sublabel>
          </TextContainer>
          <Chevron color={theme.mutedForeground}>›</Chevron>
        </ItemWrapper>
      ))}
    </Container>
  )
}
