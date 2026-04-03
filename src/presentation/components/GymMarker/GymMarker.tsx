import { MarkerContainer } from '@/presentation/components/GymMarker/GymMarker.styles'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import type { GymUiModel } from '@/presentation/uiModels/MapUiModel'

interface Props {
  gym: GymUiModel
  isActive: boolean
  onPress: (gym: GymUiModel) => void
  primaryColor: string
  primaryForeground: string
  cardColor: string
}

export function GymMarker({
  gym,
  isActive,
  onPress,
  primaryColor,
  primaryForeground,
  cardColor,
}: Props) {
  const bg = isActive ? cardColor : primaryColor
  const iconColor = isActive ? primaryColor : primaryForeground

  return (
    <MarkerContainer
      testID="gym-marker"
      bg={bg}
      borderColor={primaryColor}
      onPress={() => onPress(gym)}
    >
      <AppIcons.location color={iconColor} size={18} weight="fill" />
    </MarkerContainer>
  )
}
