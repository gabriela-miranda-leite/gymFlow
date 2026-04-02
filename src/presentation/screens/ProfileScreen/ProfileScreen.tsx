import { useFocusEffect } from '@react-navigation/native'
import { MotiView } from 'moti'
import { useCallback, useState } from 'react'

import { useTheme } from '@/contexts/ThemeContext'
import { Avatar } from '@/presentation/components/Avatar'
import { ListItem } from '@/presentation/components/ListItem'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import {
  ActionLabel,
  ActionRow,
  Card,
  Container,
  ContentWrapper,
  HeaderSection,
  PageTitle,
  SafeAreaWrapper,
  Section,
  SectionLabel,
  Separator,
  StandaloneCard,
} from '@/presentation/screens/ProfileScreen/ProfileScreen.styles'
import { useProfileViewModel } from '@/presentation/viewModels/ProfileViewModel'
import { tk, useTranslation } from '@/shared/i18n'
import { Transition } from '@/theme/motion'

export function ProfileScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const vm = useProfileViewModel()
  const [animKey, setAnimKey] = useState(0)

  useFocusEffect(
    useCallback(() => {
      setAnimKey((k) => k + 1)
    }, []),
  )

  const ThemeIcon = vm.isDarkMode ? AppIcons.lightTheme : AppIcons.darkTheme
  const themeLabel = vm.isDarkMode ? t(tk.profile.lightMode) : t(tk.profile.darkMode)

  const LogoutIcon = AppIcons.logout

  return (
    <MotiView
      key={animKey}
      from={{ opacity: 0, translateY: 24 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={Transition.screenEnter}
      style={{ flex: 1 }}
    >
      <SafeAreaWrapper bg={theme.background}>
        <Container bg={theme.background} testID="profile-scroll-view">
          <ContentWrapper bg={theme.background}>
            <PageTitle color={theme.foreground}>{t(tk.profile.title)}</PageTitle>

            {/* Header — perfil do usuário */}
            <HeaderSection>
              <Card bg={theme.card} testID="profile-header-card">
                <ListItem
                  label={vm.userName}
                  sublabel={t(tk.profile.checkIns, { count: vm.checkInsThisMonth })}
                  leading={{
                    type: 'avatar',
                    node: (
                      <Avatar
                        name={vm.userName}
                        size="md"
                        showCameraBadge
                        onCameraPress={() => {}}
                        testID="profile-avatar"
                      />
                    ),
                  }}
                  trailing={{ type: 'chevron' }}
                  onPress={vm.onPressProfile}
                  testID="profile-user-row"
                />
              </Card>
            </HeaderSection>

            {/* Seção Conta */}
            <Section>
              <SectionLabel color={theme.mutedForeground} testID="profile-section-account-label">
                {t(tk.profile.sectionAccount)}
              </SectionLabel>
              <Card bg={theme.card} testID="profile-account-card">
                <ListItem
                  label={t(tk.profile.email)}
                  sublabel={vm.email}
                  leading={{ type: 'icon', icon: 'emailField' }}
                  trailing={{ type: 'chevron' }}
                  onPress={vm.onPressEmail}
                  testID="profile-email-row"
                />
                <Separator color={theme.border} />
                <ListItem
                  label={t(tk.profile.password)}
                  sublabel={vm.passwordPlaceholder}
                  leading={{ type: 'icon', icon: 'passwordField' }}
                  trailing={{ type: 'chevron' }}
                  onPress={vm.onPressPassword}
                  testID="profile-password-row"
                />
              </Card>
            </Section>

            {/* Seção Favoritas */}
            <Section>
              <SectionLabel color={theme.mutedForeground} testID="profile-section-favorites-label">
                {t(tk.profile.sectionFavorites)}
              </SectionLabel>
              <Card bg={theme.card} testID="profile-favorites-card">
                {vm.favoriteGyms.map((gym) => (
                  <ListItem
                    key={gym.id}
                    label={gym.name}
                    sublabel={gym.address}
                    leading={{ type: 'indicator', color: gym.indicatorColor }}
                    trailing={{ type: 'text-chevron', text: `${gym.occupancy}%` }}
                    onPress={() => vm.onPressFavoriteGym(gym.id)}
                    testID={`profile-favorite-gym-${gym.id}`}
                  />
                ))}
              </Card>
            </Section>

            {/* Seção Alertas */}
            <Section>
              <SectionLabel color={theme.mutedForeground} testID="profile-section-alerts-label">
                {t(tk.profile.sectionAlerts)}
              </SectionLabel>
              <Card bg={theme.card} testID="profile-alerts-card">
                <ListItem
                  label={t(tk.profile.idealTime)}
                  sublabel={t(tk.profile.idealTimeSublabel)}
                  trailing={{
                    type: 'toggle',
                    value: vm.idealTimeEnabled,
                    onValueChange: vm.onToggleIdealTime,
                  }}
                  testID="profile-ideal-time-toggle"
                />
                <Separator color={theme.border} />
                <ListItem
                  label={t(tk.profile.occupancyLimit)}
                  sublabel={t(tk.profile.occupancyLimitSublabel, {
                    value: Math.round(vm.occupancyLimit),
                  })}
                  trailing={{
                    type: 'slider',
                    value: vm.occupancyLimit,
                    onValueChange: vm.onChangeOccupancyLimit,
                    min: 10,
                    max: 90,
                    step: 1,
                    minLabel: '10%',
                    midLabel: '50%',
                    maxLabel: '90%',
                  }}
                  testID="profile-occupancy-slider"
                />
              </Card>
            </Section>

            {/* Botão Tema */}
            <StandaloneCard bg={theme.card} testID="profile-theme-card">
              <ActionRow
                onPress={vm.onToggleTheme}
                activeOpacity={0.6}
                accessibilityRole="button"
                accessibilityLabel={themeLabel}
                testID="profile-theme-button"
              >
                <ThemeIcon size={20} color={theme.foreground} />
                <ActionLabel color={theme.foreground}>{themeLabel}</ActionLabel>
              </ActionRow>
            </StandaloneCard>

            {/* Botão Sair */}
            <StandaloneCard bg={theme.card} testID="profile-logout-card">
              <ActionRow
                onPress={vm.onPressLogout}
                activeOpacity={0.6}
                accessibilityRole="button"
                accessibilityLabel={t(tk.profile.logout)}
                testID="profile-logout-button"
              >
                <LogoutIcon size={20} color={theme.destructive} />
                <ActionLabel color={theme.destructive}>{t(tk.profile.logout)}</ActionLabel>
              </ActionRow>
            </StandaloneCard>
          </ContentWrapper>
        </Container>
      </SafeAreaWrapper>
    </MotiView>
  )
}
