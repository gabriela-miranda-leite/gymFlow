import BottomSheet from '@gorhom/bottom-sheet'
import { forwardRef } from 'react'

import { useTheme } from '@/contexts/ThemeContext'
import { AppBottomSheet } from '@/presentation/components/AppBottomSheet'
import {
  AddressRow,
  AddressText,
  CheckInButton,
  CheckInText,
  Content,
  GymName,
  HeaderRow,
  InfoCard,
  InfoCardLabel,
  InfoCardValue,
  InfoCardsRow,
  OccupancyLabel,
  OccupancyPercent,
  RatingContainer,
  RatingText,
  ReviewCount,
  Tag,
  TagsRow,
  TagText,
} from '@/presentation/components/GymDetailCard/GymDetailCard.styles'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import type { GymUiModel } from '@/presentation/uiModels/MapUiModel'
import { tk, useTranslation } from '@/shared/i18n'

interface Props {
  gym: GymUiModel | null
  onDismiss: () => void
  onCheckIn: () => void
}

export const GymDetailCard = forwardRef<BottomSheet, Props>(
  ({ gym, onDismiss, onCheckIn }, ref) => {
    const { theme } = useTheme()
    const { t } = useTranslation()

    const statusColor = gym ? theme.status[gym.occupancy] : theme.status.empty
    const occupancyCardBg = `${statusColor}20`

    return (
      <AppBottomSheet ref={ref} onDismiss={onDismiss}>
        {gym && (
          <Content bg={theme.card}>
            <HeaderRow>
              <GymName color={theme.foreground}>{gym.name}</GymName>
              <RatingContainer>
                <AppIcons.favorite color={theme.brand.primary} size={14} weight="fill" />
                <RatingText color={theme.foreground}>{gym.ratingLabel}</RatingText>
                <ReviewCount color={theme.mutedForeground}>{gym.reviewCount}</ReviewCount>
                <AppIcons.navChevron color={theme.mutedForeground} size={14} />
              </RatingContainer>
            </HeaderRow>

            <AddressRow>
              <AppIcons.location color={theme.mutedForeground} size={14} />
              <AddressText color={theme.mutedForeground}>{gym.address}</AddressText>
            </AddressRow>

            <TagsRow>
              {gym.tags.map((tag) => (
                <Tag key={tag} bg={theme.muted}>
                  <TagText color={theme.mutedForeground}>{tag}</TagText>
                </Tag>
              ))}
            </TagsRow>

            <InfoCardsRow>
              <InfoCard bg={theme.muted}>
                <AppIcons.location color={theme.mutedForeground} size={16} />
                <InfoCardValue color={theme.foreground}>{gym.distanceLabel}</InfoCardValue>
                <InfoCardLabel color={theme.mutedForeground}>{t(tk.map.distance)}</InfoCardLabel>
              </InfoCard>

              <InfoCard bg={theme.muted}>
                <AppIcons.lastUpdate color={theme.mutedForeground} size={16} />
                <InfoCardValue color={theme.foreground}>{gym.openingHours}</InfoCardValue>
                <InfoCardLabel color={theme.mutedForeground}>{t(tk.map.hours)}</InfoCardLabel>
              </InfoCard>

              <InfoCard bg={occupancyCardBg}>
                <OccupancyPercent color={statusColor}>{gym.occupancyPercent}</OccupancyPercent>
                <OccupancyLabel color={statusColor}>{gym.occupancyLabel}</OccupancyLabel>
              </InfoCard>
            </InfoCardsRow>

            <CheckInButton bg={theme.brand.primary} onPress={onCheckIn}>
              <CheckInText color={theme.brand.primaryForeground}>{t(tk.map.checkIn)}</CheckInText>
            </CheckInButton>
          </Content>
        )}
      </AppBottomSheet>
    )
  },
)

GymDetailCard.displayName = 'GymDetailCard'
