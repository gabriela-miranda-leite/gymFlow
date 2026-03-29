import { useTheme } from '@/contexts/ThemeContext'
import { MarkerContainer } from '@/presentation/components/GymMarker/GymMarker.styles'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import type { GymUiModel } from '@/presentation/uiModels/MapUiModel'

interface Props {
  gym: GymUiModel
  isActive: boolean
  onPress: (gym: GymUiModel) => void
}

export function GymMarker({ gym, isActive, onPress }: Props) {
  const { theme } = useTheme()

  const bg = isActive ? theme.card : theme.brand.primary
  const iconColor = isActive ? theme.brand.primary : theme.brand.primaryForeground
  const borderColor = theme.brand.primary

  return (
    <MarkerContainer
      testID="gym-marker"
      bg={bg}
      borderColor={borderColor}
      onPress={() => onPress(gym)}
    >
      <AppIcons.location color={iconColor} size={18} weight="fill" />
    </MarkerContainer>
  )
}
