import { useTheme } from '@/contexts/ThemeContext'
import { Button } from '@/presentation/components/Button'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import {
  ButtonWrapper,
  Container,
  GymName,
  IconWrapper,
  OccupancyDot,
  OccupancyLabel,
  OccupancyRow,
  SafeAreaWrapper,
  Subtitle,
  Title,
} from '@/presentation/screens/CheckInFeedbackScreen/CheckInFeedbackScreen.styles'
import { useCheckInFeedbackViewModel } from '@/presentation/viewModels/CheckInFeedbackViewModel'

export function CheckInFeedbackScreen() {
  const { theme } = useTheme()
  const {
    title,
    subtitle,
    successIconLabel,
    gymName,
    occupancyLabel,
    occupancyColor,
    buttonLabel,
    onBack,
  } = useCheckInFeedbackViewModel()

  return (
    <SafeAreaWrapper bg={theme.background}>
      <Container bg={theme.background}>
        <IconWrapper>
          <AppIcons.success
            size={64}
            color={theme.brand.primary}
            accessibilityLabel={successIconLabel}
            testID="feedback-success-icon"
          />
        </IconWrapper>

        <Title color={theme.foreground} accessibilityRole="header" testID="feedback-title">
          {title}
        </Title>

        <Subtitle color={theme.mutedForeground} testID="feedback-subtitle">
          {subtitle}
        </Subtitle>

        <OccupancyRow testID="feedback-occupancy">
          <OccupancyDot color={occupancyColor} accessible={false} />
          <OccupancyLabel color={theme.foreground}>{occupancyLabel}</OccupancyLabel>
        </OccupancyRow>

        <GymName color={theme.mutedForeground} testID="feedback-gym-name">
          {gymName}
        </GymName>

        <ButtonWrapper>
          <Button label={buttonLabel} onPress={onBack} testID="feedback-back-button" />
        </ButtonWrapper>
      </Container>
    </SafeAreaWrapper>
  )
}
