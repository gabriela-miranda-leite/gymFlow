import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useTheme } from '@/contexts/ThemeContext'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import { Duration } from '@/theme/motion'

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
const EASING = Easing.bezier(0.25, 0.1, 0.25, 1)

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
  const progress = useSharedValue(0)

  const selectedOption = options.find((opt) => opt.value === value)

  const PinIcon = AppIcons.location
  const ChevronIcon = AppIcons.navChevronDown

  const animatedListStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, LIST_MAX_HEIGHT]),
    overflow: 'hidden',
    marginTop: 4,
  }))

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }],
  }))

  function openList() {
    setIsOpen(true)
    // eslint-disable-next-line react-hooks/immutability
    progress.value = withTiming(1, { duration: Duration.normal, easing: EASING })
  }

  function closeList() {
    // eslint-disable-next-line react-hooks/immutability
    progress.value = withTiming(0, { duration: Duration.normal, easing: EASING }, (finished) => {
      if (finished) runOnJS(setIsOpen)(false)
    })
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
          textColor={selectedOption ? theme.foreground : theme.mutedForeground}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </TriggerLabel>
        <Animated.View style={animatedChevronStyle}>
          <ChevronIcon size={18} color={theme.mutedForeground} />
        </Animated.View>
      </TriggerWrapper>

      {isOpen && (
        <Animated.View style={animatedListStyle}>
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
