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

  const bg = isActive ? theme.brand.primary : theme.card
  const iconColor = isActive ? theme.brand.primaryForeground : theme.mutedForeground

  return (
    <MarkerContainer testID="gym-marker" bg={bg} isActive={isActive} onPress={() => onPress(gym)}>
      <AppIcons.location color={iconColor} size={18} weight="fill" />
    </MarkerContainer>
  )
}
