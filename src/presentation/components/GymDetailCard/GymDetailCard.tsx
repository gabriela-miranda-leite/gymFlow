import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef } from 'react'

import { useTheme } from '@/contexts/ThemeContext'
import {
  Address,
  CheckInButton,
  CheckInText,
  Content,
  GymName,
  HoursRow,
  HoursText,
  MetaItem,
  MetaRow,
  MetaText,
  StatusBadge,
  StatusText,
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

const SNAP_POINTS = ['48%']

export const GymDetailCard = forwardRef<BottomSheet, Props>(
  ({ gym, onDismiss, onCheckIn }, ref) => {
    const { theme } = useTheme()
    const { t } = useTranslation()

    const statusBg = gym?.isOpen ? theme.status.empty : theme.status.packed
    const statusTextColor = theme.brand.primaryForeground

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={SNAP_POINTS}
        enablePanDownToClose
        onClose={onDismiss}
        backgroundStyle={{ backgroundColor: theme.card }}
        handleIndicatorStyle={{ backgroundColor: theme.mutedForeground }}
      >
        <BottomSheetView>
          {gym && (
            <Content bg={theme.card}>
              <GymName color={theme.foreground}>{gym.name}</GymName>
              <Address color={theme.mutedForeground}>{gym.address}</Address>

              <MetaRow>
                <MetaItem>
                  <AppIcons.favorite color={theme.brand.primary} size={14} weight="fill" />
                  <MetaText color={theme.foreground}>{gym.ratingLabel}</MetaText>
                </MetaItem>
                <MetaItem>
                  <AppIcons.location color={theme.mutedForeground} size={14} />
                  <MetaText color={theme.mutedForeground}>{gym.distanceLabel}</MetaText>
                </MetaItem>
                <StatusBadge bg={statusBg}>
                  <StatusText color={statusTextColor}>{gym.statusLabel}</StatusText>
                </StatusBadge>
              </MetaRow>

              <HoursRow>
                <AppIcons.lastUpdate color={theme.mutedForeground} size={14} />
                <HoursText color={theme.mutedForeground}>{gym.openingHours}</HoursText>
              </HoursRow>

              <TagsRow>
                {gym.tags.map((tag) => (
                  <Tag key={tag} bg={theme.muted}>
                    <TagText color={theme.mutedForeground}>{tag}</TagText>
                  </Tag>
                ))}
              </TagsRow>

              <CheckInButton bg={theme.brand.primary} onPress={onCheckIn}>
                <CheckInText color={theme.brand.primaryForeground}>{t(tk.map.checkIn)}</CheckInText>
              </CheckInButton>
            </Content>
          )}
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

GymDetailCard.displayName = 'GymDetailCard'
