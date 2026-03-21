import { useTheme } from '@/contexts/ThemeContext'
import { Line, Row } from '@/presentation/components/Divider/Divider.styles'
import { Text } from '@/presentation/components/Text/Text'

type DividerProps = {
  label?: string
}

export function Divider({ label }: DividerProps) {
  const { theme } = useTheme()

  return (
    <Row aria-hidden importantForAccessibility="no-hide-descendants">
      <Line color={theme.border} />
      {label && (
        <>
          <Text variant="caption" color={(t) => t.mutedForeground}>
            {label}
          </Text>
          <Line color={theme.border} />
        </>
      )}
    </Row>
  )
}
