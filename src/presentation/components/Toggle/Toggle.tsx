import { Switch } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { Label, LabelGroup, Row, Sublabel } from '@/presentation/components/Toggle/Toggle.styles'

export type ToggleProps = {
  label: string
  sublabel?: string
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  testID?: string
}

export function Toggle({
  label,
  sublabel,
  value,
  onValueChange,
  disabled = false,
  testID,
}: ToggleProps) {
  const { theme } = useTheme()

  return (
    <Row testID={testID}>
      <LabelGroup>
        <Label color={theme.foreground}>{label}</Label>
        {sublabel && <Sublabel color={theme.mutedForeground}>{sublabel}</Sublabel>}
      </LabelGroup>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: theme.secondary, true: theme.brand.primary }}
        thumbColor={theme.foreground}
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityState={{ checked: value, disabled }}
        testID={testID ? `${testID}-switch` : undefined}
      />
    </Row>
  )
}
