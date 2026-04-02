import { useFocusEffect } from '@react-navigation/native'
import { MotiView } from 'moti'
import { useCallback, useState } from 'react'

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

const slideUp = (delay: number) =>
  ({
    from: { opacity: 0, translateY: 16 },
    animate: { opacity: 1, translateY: 0 },
    transition: { type: 'timing', duration: 350, delay },
  }) as const

export function CheckInScreen() {
  const { theme } = useTheme()
  const [animKey, setAnimKey] = useState(0)

  useFocusEffect(
    useCallback(() => {
      setAnimKey((k) => k + 1)
    }, []),
  )

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
        <MotiView key={animKey} {...slideUp(0)}>
          <Title color={theme.foreground} accessibilityRole="header" testID="checkin-title">
            {title}
          </Title>
        </MotiView>

        <MotiView key={`${animKey}-select`} {...slideUp(80)}>
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
        </MotiView>

        <MotiView key={`${animKey}-buttons`} {...slideUp(160)}>
          <ButtonGroup
            options={occupancyOptions}
            onSelect={(value) => onSelectOccupancy(value as OccupancyLevel)}
            disabled={isButtonGroupDisabled}
          />
        </MotiView>
      </Container>
    </SafeAreaWrapper>
  )
}
