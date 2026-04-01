import RNSlider from '@react-native-community/slider'

import { useTheme } from '@/contexts/ThemeContext'
import {
  Container,
  HeaderRow,
  Label,
  LabelGroup,
  Sublabel,
  TickLabel,
  TickRow,
  ValueLabel,
} from '@/presentation/components/Slider/Slider.styles'

export type SliderProps = {
  label: string
  sublabel?: string
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  minLabel?: string
  midLabel?: string
  maxLabel?: string
  disabled?: boolean
  testID?: string
}

export function Slider({
  label,
  sublabel,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  minLabel,
  midLabel,
  maxLabel,
  disabled = false,
  testID,
}: SliderProps) {
  const { theme } = useTheme()

  const hasTickRow = minLabel !== undefined || midLabel !== undefined || maxLabel !== undefined

  return (
    <Container testID={testID}>
      <HeaderRow>
        <LabelGroup>
          <Label color={theme.foreground}>{label}</Label>
          {sublabel && <Sublabel color={theme.mutedForeground}>{sublabel}</Sublabel>}
        </LabelGroup>
        <ValueLabel color={theme.foreground} testID={testID ? `${testID}-value` : undefined}>
          {`${Math.round(value)}%`}
        </ValueLabel>
      </HeaderRow>

      <RNSlider
        value={value}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        disabled={disabled}
        minimumTrackTintColor={theme.brand.primary}
        maximumTrackTintColor={theme.secondary}
        thumbTintColor={theme.brand.primary}
        accessibilityLabel={label}
        accessibilityRole="adjustable"
        accessibilityState={{ disabled }}
        accessibilityValue={{ min, max, now: value }}
        testID={testID ? `${testID}-slider` : undefined}
      />

      {hasTickRow && (
        <TickRow testID={testID ? `${testID}-ticks` : undefined}>
          <TickLabel color={theme.mutedForeground}>{minLabel ?? ''}</TickLabel>
          <TickLabel color={theme.mutedForeground}>{midLabel ?? ''}</TickLabel>
          <TickLabel color={theme.mutedForeground}>{maxLabel ?? ''}</TickLabel>
        </TickRow>
      )}
    </Container>
  )
}
