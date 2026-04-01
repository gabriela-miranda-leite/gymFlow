import { useTheme } from '@/contexts/ThemeContext'
import {
  AvatarImage,
  BadgeWrapper,
  Circle,
  Container,
  InitialText,
  getAvatarSize,
} from '@/presentation/components/Avatar/Avatar.styles'
import type { AvatarSize } from '@/presentation/components/Avatar/Avatar.styles'
import { AppIcons } from '@/presentation/components/icons/AppIcons'

export type { AvatarSize }

export type AvatarProps = {
  name: string
  imageUri?: string
  size?: AvatarSize
  showCameraBadge?: boolean
  onCameraPress?: () => void
  testID?: string
}

export function Avatar({
  name,
  imageUri,
  size = 'md',
  showCameraBadge = false,
  onCameraPress,
  testID,
}: AvatarProps) {
  const { theme } = useTheme()

  const px = getAvatarSize(size)
  const initial = name.trim().charAt(0).toUpperCase()
  const CameraIcon = AppIcons.editAvatar

  return (
    <Container testID={testID}>
      <Circle
        size={px}
        bg={theme.brand.primary}
        accessibilityRole="image"
        accessibilityLabel={name}
      >
        {imageUri ? (
          <AvatarImage
            source={{ uri: imageUri }}
            size={px}
            testID={testID ? `${testID}-image` : undefined}
          />
        ) : (
          <InitialText
            size={px}
            color={theme.brand.primaryForeground}
            testID={testID ? `${testID}-initial` : undefined}
          >
            {initial}
          </InitialText>
        )}
      </Circle>

      {showCameraBadge && (
        <BadgeWrapper
          bg={theme.card}
          onPress={onCameraPress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Trocar foto"
          testID={testID ? `${testID}-camera-badge` : undefined}
        >
          <CameraIcon size={14} color={theme.mutedForeground} />
        </BadgeWrapper>
      )}
    </Container>
  )
}
