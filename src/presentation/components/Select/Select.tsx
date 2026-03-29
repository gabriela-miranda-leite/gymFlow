import { useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { AppIcons } from '@/presentation/components/icons/AppIcons'

import {
  ListContainer,
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

const LIST_MAX_HEIGHT = 280
const ANIMATION_DURATION = 220

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
  const [animatedHeight] = useState(() => new Animated.Value(0))

  const selectedOption = options.find((opt) => opt.value === value)

  const PinIcon = AppIcons.location
  const ChevronIcon = AppIcons.navChevronDown

  const chevronRotation = animatedHeight.interpolate({
    inputRange: [0, LIST_MAX_HEIGHT],
    outputRange: ['0deg', '180deg'],
  })

  function openList() {
    setIsOpen(true)
    Animated.timing(animatedHeight, {
      toValue: LIST_MAX_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start()
  }

  function closeList() {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: false,
    }).start(() => setIsOpen(false))
  }

  function handleTriggerPress() {
    if (disabled) return
    if (isOpen) closeList()
    else openList()
  }

  function handleOptionPress(optionValue: string) {
    onChange(optionValue)
    closeList()
  }

  return (
    <View>
      <TriggerWrapper
        bg={theme.card}
        borderColor={theme.brand.primary}
        defaultBorderColor={theme.border}
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
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </TriggerLabel>
        <Animated.View style={{ transform: [{ rotate: chevronRotation }] }}>
          <ChevronIcon size={18} color={theme.mutedForeground} />
        </Animated.View>
      </TriggerWrapper>

      {isOpen && (
        <Animated.View style={{ height: animatedHeight, overflow: 'hidden', marginTop: 4 }}>
          <ListContainer bg={theme.card} accessibilityRole="radiogroup">
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
        </Animated.View>
      )}
    </View>
  )
}
