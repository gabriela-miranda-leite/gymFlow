import { useTheme } from '@/contexts/ThemeContext'
import { ButtonGroup } from '@/presentation/components/ButtonGroup/ButtonGroup'
import { Select } from '@/presentation/components/Select/Select'
import {
  Container,
  CooldownBanner,
  CooldownText,
  SafeAreaWrapper,
  SelectWrapper,
  Title,
} from '@/presentation/screens/CheckInScreen/CheckInScreen.styles'
import { useCheckInViewModel } from '@/presentation/viewModels/CheckInViewModel'
import type { OccupancyLevel } from '@/tokens'

export function CheckInScreen() {
  const { theme } = useTheme()
  const {
    title,
    selectPlaceholder,
    gymOptions,
    selectedGymId,
    onSelectGym,
    occupancyOptions,
    isLoading,
    isCoolingDown,
    cooldownMessage,
    onSelectOccupancy,
  } = useCheckInViewModel()

  const isDisabled = isLoading || !selectedGymId || isCoolingDown

  return (
    <SafeAreaWrapper bg={theme.background}>
      <Container bg={theme.background}>
        <Title color={theme.foreground} accessibilityRole="header" testID="checkin-title">
          {title}
        </Title>

        <SelectWrapper>
          <Select
            options={gymOptions}
            value={selectedGymId}
            onChange={onSelectGym}
            placeholder={selectPlaceholder}
            accessibilityLabel={selectPlaceholder}
          />
        </SelectWrapper>

        {isCoolingDown && cooldownMessage && (
          <CooldownBanner
            bg={theme.secondary}
            testID="checkin-cooldown-banner"
            accessibilityRole="alert"
            accessibilityLabel={cooldownMessage ?? undefined}
          >
            <CooldownText color={theme.secondaryForeground}>{cooldownMessage}</CooldownText>
          </CooldownBanner>
        )}

        <ButtonGroup
          options={occupancyOptions}
          onSelect={(value) => onSelectOccupancy(value as OccupancyLevel)}
          disabled={isDisabled}
        />
      </Container>
    </SafeAreaWrapper>
  )
}
