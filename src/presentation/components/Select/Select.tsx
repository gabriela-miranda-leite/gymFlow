import { useState } from 'react'
import { Modal, ScrollView } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { AppIcons } from '@/presentation/components/icons/AppIcons'

import {
  ListContainer,
  Overlay,
  OptionIconWrapper,
  OptionItem,
  OptionLabel,
  OptionSublabel,
  OptionTextContainer,
  TriggerLabel,
  TriggerWrapper,
} from './Select.styles'

export interface SelectOption {
  label: string
  sublabel: string
  value: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  accessibilityLabel?: string
}

export function Select({
  options,
  value,
  onChange,
  placeholder = 'Selecionar',
  disabled = false,
  accessibilityLabel = 'Selecionar academia',
}: SelectProps) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((opt) => opt.value === value)

  const PinIcon = AppIcons.location
  const ChevronIcon = AppIcons.navChevronDown

  function handleTriggerPress() {
    if (disabled) return
    setIsOpen(true)
  }

  function handleOptionPress(optionValue: string) {
    onChange(optionValue)
    setIsOpen(false)
  }

  function handleOverlayPress() {
    setIsOpen(false)
  }

  return (
    <>
      <TriggerWrapper
        bg={theme.card}
        borderColor={theme.brand.primary}
        isOpen={isOpen}
        disabled={disabled}
        onPress={handleTriggerPress}
        activeOpacity={0.7}
        accessibilityRole="combobox"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ expanded: isOpen, disabled: !!disabled }}
      >
        <PinIcon size={18} color={theme.mutedForeground} />
        <TriggerLabel
          color={selectedOption ? theme.foreground : theme.mutedForeground}
          isPlaceholder={!selectedOption}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </TriggerLabel>
        <ChevronIcon size={18} color={theme.mutedForeground} />
      </TriggerWrapper>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleOverlayPress}>
        <Overlay onPress={handleOverlayPress} activeOpacity={1}>
          <ListContainer
            bg={theme.card}
            accessibilityRole="radiogroup"
            onStartShouldSetResponder={() => true}
          >
            <ScrollView bounces={false} keyboardShouldPersistTaps="handled">
              {options.map((option) => {
                const isSelected = option.value === value
                return (
                  <OptionItem
                    key={option.value}
                    isSelected={isSelected}
                    selectedBg={theme.brand.primary + '33'}
                    onPress={() => handleOptionPress(option.value)}
                    activeOpacity={0.7}
                    accessibilityRole="radio"
                    accessibilityLabel={`${option.label}, ${option.sublabel}`}
                    accessibilityState={{ selected: isSelected }}
                  >
                    <OptionIconWrapper>
                      <PinIcon
                        size={18}
                        color={isSelected ? theme.brand.primary : theme.mutedForeground}
                      />
                    </OptionIconWrapper>
                    <OptionTextContainer>
                      <OptionLabel color={theme.foreground}>{option.label}</OptionLabel>
                      <OptionSublabel color={theme.mutedForeground}>
                        {option.sublabel}
                      </OptionSublabel>
                    </OptionTextContainer>
                  </OptionItem>
                )
              })}
            </ScrollView>
          </ListContainer>
        </Overlay>
      </Modal>
    </>
  )
}
