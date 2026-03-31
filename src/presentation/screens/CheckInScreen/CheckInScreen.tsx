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
    isCoolingDown,
    isButtonGroupDisabled,
    cooldownMessage,
    onSelectOccupancy,
  } = useCheckInViewModel()

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
            bg={theme.brand.subtle}
            testID="checkin-cooldown-banner"
            accessibilityRole="alert"
            accessibilityLabel={cooldownMessage ?? undefined}
          >
            <CooldownText color={theme.brand.primary}>{cooldownMessage}</CooldownText>
          </CooldownBanner>
        )}

        <ButtonGroup
          options={occupancyOptions}
          onSelect={(value) => onSelectOccupancy(value as OccupancyLevel)}
          disabled={isButtonGroupDisabled}
        />
      </Container>
    </SafeAreaWrapper>
  )
}
