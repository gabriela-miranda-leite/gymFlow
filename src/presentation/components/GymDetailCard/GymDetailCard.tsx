import BottomSheet from '@gorhom/bottom-sheet'
import { forwardRef, useState } from 'react'

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

    // Mantém o último gym conhecido para o conteúdo estar sempre montado,
    // evitando remontagem e remeasure do enableDynamicSizing ao abrir o sheet.
    // Padrão React de derivar estado durante o render (sem useEffect).
    const [prevGym, setPrevGym] = useState(gym)
    const [visibleGym, setVisibleGym] = useState(gym)
    if (prevGym !== gym) {
      setPrevGym(gym)
      if (gym) setVisibleGym(gym)
    }

    const statusColor = visibleGym ? theme.status[visibleGym.occupancy] : theme.status.empty
    const occupancyCardBg = `${statusColor}20`

    return (
      <AppBottomSheet ref={ref} onDismiss={onDismiss}>
        {visibleGym && (
          <Content bg={theme.card}>
            <HeaderRow>
              <GymName color={theme.foreground}>{visibleGym.name}</GymName>
              <RatingContainer>
                <AppIcons.favorite color={theme.brand.primary} size={14} weight="fill" />
                <RatingText color={theme.foreground}>{visibleGym.ratingLabel}</RatingText>
                <ReviewCount color={theme.mutedForeground}>{visibleGym.reviewCount}</ReviewCount>
                <AppIcons.navChevron color={theme.mutedForeground} size={14} />
              </RatingContainer>
            </HeaderRow>

            <AddressRow>
              <AppIcons.location color={theme.mutedForeground} size={14} />
              <AddressText color={theme.mutedForeground}>{visibleGym.address}</AddressText>
            </AddressRow>

            <TagsRow>
              {visibleGym.tags.map((tag) => (
                <Tag key={tag} bg={theme.muted}>
                  <TagText color={theme.mutedForeground}>{tag}</TagText>
                </Tag>
              ))}
            </TagsRow>

            <InfoCardsRow>
              <InfoCard bg={theme.muted}>
                <AppIcons.location color={theme.mutedForeground} size={16} />
                <InfoCardValue color={theme.foreground}>{visibleGym.distanceLabel}</InfoCardValue>
                <InfoCardLabel color={theme.mutedForeground}>{t(tk.map.distance)}</InfoCardLabel>
              </InfoCard>

              <InfoCard bg={theme.muted}>
                <AppIcons.lastUpdate color={theme.mutedForeground} size={16} />
                <InfoCardValue color={theme.foreground}>{visibleGym.openingHours}</InfoCardValue>
                <InfoCardLabel color={theme.mutedForeground}>{t(tk.map.hours)}</InfoCardLabel>
              </InfoCard>

              <InfoCard bg={occupancyCardBg}>
                <OccupancyPercent color={statusColor}>
                  {visibleGym.occupancyPercent}
                </OccupancyPercent>
                <OccupancyLabel color={statusColor}>{visibleGym.occupancyLabel}</OccupancyLabel>
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
