import { useTheme } from '@/contexts/ThemeContext'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import {
  AddressRow,
  AddressText,
  BackButton,
  BackLabel,
  BestTimeHour,
  BestTimeRow,
  BestTimeSublabel,
  ChartAxisLabel,
  ChartAxisRow,
  ChartBar,
  ChartBarsRow,
  ChartSection,
  ChartTitle,
  ContentWrapper,
  CurrentHourDot,
  DayLabel,
  DayPill,
  DaySelectorRow,
  FavoriteButton,
  Footer,
  FooterText,
  GymName,
  Header,
  InfoCard,
  InfoCardTitle,
  InfoCardsRow,
  NotifyButton,
  NotifyButtonText,
  OccupancyBadge,
  OccupancyBadgeText,
  OccupancyPercent,
  SafeWrapper,
  ScrollContainer,
} from '@/presentation/screens/GymDetailScreen/GymDetailScreen.styles'
import { useGymDetailViewModel } from '@/presentation/viewModels/GymDetailViewModel'
import { tk, useTranslation } from '@/shared/i18n'

const X_AXIS_HOURS = [0, 3, 6, 9, 12, 15, 18, 21]

export function GymDetailScreen() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const vm = useGymDetailViewModel()

  const occupancyCardBg = `${vm.occupancyStatusColor}20`

  return (
    <SafeWrapper bg={theme.background} testID="gym-detail-safe-wrapper">
      <ScrollContainer bg={theme.background} showsVerticalScrollIndicator={false}>
        <ContentWrapper>
          {/* Header */}
          <Header>
            <BackButton
              onPress={vm.onBack}
              accessibilityRole="button"
              accessibilityLabel={t(tk.gymDetail.backToMap)}
              testID="gym-detail-back-button"
            >
              <AppIcons.navBack size={16} color={theme.brand.primary} />
              <BackLabel color={theme.brand.primary}>{t(tk.gymDetail.backToMap)}</BackLabel>
            </BackButton>

            <FavoriteButton
              onPress={vm.onToggleFavorite}
              accessibilityRole="button"
              accessibilityLabel="Favoritar academia"
              testID="gym-detail-favorite-button"
            >
              <AppIcons.favorite
                size={24}
                color={theme.brand.primary}
                weight={vm.isFavorite ? 'fill' : 'regular'}
              />
            </FavoriteButton>
          </Header>

          {/* Gym name + address */}
          <GymName color={theme.foreground} testID="gym-detail-name">
            {vm.name}
          </GymName>
          <AddressRow>
            <AppIcons.location size={13} color={theme.mutedForeground} />
            <AddressText color={theme.mutedForeground} testID="gym-detail-address">
              {vm.address}
            </AddressText>
          </AddressRow>

          {/* Info cards */}
          <InfoCardsRow>
            {/* Card: Lotação atual */}
            <InfoCard bg={occupancyCardBg} testID="gym-detail-occupancy-card">
              <InfoCardTitle color={vm.occupancyStatusColor}>
                {t(tk.gymDetail.currentOccupancy)}
              </InfoCardTitle>
              <OccupancyPercent
                color={vm.occupancyStatusColor}
                testID="gym-detail-occupancy-percent"
              >
                {vm.occupancyPercent}
              </OccupancyPercent>
              <OccupancyBadge bg={`${vm.occupancyStatusColor}30`}>
                <OccupancyBadgeText
                  color={vm.occupancyStatusColor}
                  testID="gym-detail-occupancy-label"
                >
                  {vm.occupancyLabel}
                </OccupancyBadgeText>
              </OccupancyBadge>
            </InfoCard>

            {/* Card: Melhor horário */}
            <InfoCard bg={theme.card} testID="gym-detail-best-time-card">
              <InfoCardTitle color={theme.mutedForeground}>
                {t(tk.gymDetail.bestTime)}
              </InfoCardTitle>
              <BestTimeHour color={theme.foreground} testID="gym-detail-best-time-label">
                {vm.bestTimeLabel}
              </BestTimeHour>
              <BestTimeRow>
                <AppIcons.bestTime size={12} color={theme.mutedForeground} />
                <BestTimeSublabel color={theme.mutedForeground}>
                  {vm.bestTimeOccupancy}
                </BestTimeSublabel>
              </BestTimeRow>
            </InfoCard>
          </InfoCardsRow>

          {/* Day selector */}
          <DaySelectorRow testID="gym-detail-day-selector">
            {vm.days.map((day) => {
              const isSelected = day.dayIndex === vm.selectedDayIndex
              return (
                <DayPill
                  key={day.dayIndex}
                  bg={isSelected ? theme.brand.primary : theme.secondary}
                  onPress={() => vm.onSelectDay(day.dayIndex)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  testID={`gym-detail-day-${day.dayIndex}`}
                >
                  <DayLabel
                    color={isSelected ? theme.brand.primaryForeground : theme.mutedForeground}
                  >
                    {day.label}
                  </DayLabel>
                </DayPill>
              )
            })}
          </DaySelectorRow>

          {/* Flow chart */}
          <ChartSection testID="gym-detail-chart-section">
            <ChartTitle color={theme.foreground}>{vm.flowChartTitle}</ChartTitle>

            <ChartBarsRow>
              {vm.hourlyBars.map((bar) => (
                <ChartBar
                  key={bar.hour}
                  color={bar.barColor}
                  heightPercent={bar.occupancyPercent}
                  opacity={bar.isFuture ? 0.4 : 1}
                  testID={`gym-detail-bar-${bar.hour}`}
                />
              ))}
            </ChartBarsRow>

            <ChartAxisRow>
              {vm.hourlyBars.map((bar) => {
                const showLabel = X_AXIS_HOURS.includes(bar.hour)
                return (
                  <ChartAxisLabel
                    key={bar.hour}
                    color={bar.isCurrentHour ? theme.brand.primary : theme.mutedForeground}
                    isCurrent={bar.isCurrentHour}
                  >
                    {showLabel ? String(bar.hour).padStart(2, '0') : ''}
                    {bar.isCurrentHour ? <CurrentHourDot color={theme.brand.primary} /> : null}
                  </ChartAxisLabel>
                )
              })}
            </ChartAxisRow>
          </ChartSection>

          {/* Notify button */}
          <NotifyButton
            bg={theme.brand.primary}
            onPress={vm.onNotify}
            accessibilityRole="button"
            testID="gym-detail-notify-button"
          >
            <AppIcons.notifications size={18} color={theme.brand.primaryForeground} />
            <NotifyButtonText color={theme.brand.primaryForeground}>
              {vm.notifyButtonLabel}
            </NotifyButtonText>
          </NotifyButton>

          {/* Footer */}
          <Footer>
            <AppIcons.lastUpdate size={12} color={theme.mutedForeground} />
            <FooterText color={theme.mutedForeground} testID="gym-detail-updated-at">
              {vm.updatedAtLabel}
            </FooterText>
          </Footer>
        </ContentWrapper>
      </ScrollContainer>
    </SafeWrapper>
  )
}
