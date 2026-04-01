import type { ReactNode } from 'react'

import { useTheme } from '@/contexts/ThemeContext'
import {
  ContentArea,
  Indicator,
  Label,
  LeadingSlot,
  RowPressable,
  RowView,
  Sublabel,
  TrailingSlot,
  TrailingText,
} from '@/presentation/components/ListItem/ListItem.styles'
import { Slider } from '@/presentation/components/Slider'
import { Toggle } from '@/presentation/components/Toggle'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import type { AppIconName } from '@/presentation/components/icons/AppIcons'

export type ListItemLeading =
  | { type: 'icon'; icon: AppIconName }
  | { type: 'indicator'; color: string }
  | { type: 'avatar'; node: ReactNode }
  | { type: 'none' }

export type ListItemTrailing =
  | { type: 'chevron' }
  | { type: 'text-chevron'; text: string }
  | { type: 'toggle'; value: boolean; onValueChange: (value: boolean) => void }
  | {
      type: 'slider'
      value: number
      onValueChange: (value: number) => void
      min?: number
      max?: number
      step?: number
      minLabel?: string
      midLabel?: string
      maxLabel?: string
    }
  | { type: 'none' }

export type ListItemProps = {
  label: string
  sublabel?: string
  leading?: ListItemLeading
  trailing?: ListItemTrailing
  onPress?: () => void
  labelColor?: string
  testID?: string
}

function Leading({ leading, iconColor }: { leading: ListItemLeading; iconColor: string }) {
  if (leading.type === 'none') return <LeadingSlot accessible={false} />

  if (leading.type === 'icon') {
    const Icon = AppIcons[leading.icon]
    return (
      <LeadingSlot>
        <Icon size={20} color={iconColor} />
      </LeadingSlot>
    )
  }

  if (leading.type === 'indicator') {
    return (
      <LeadingSlot>
        <Indicator color={leading.color} accessible={false} />
      </LeadingSlot>
    )
  }

  return <LeadingSlot>{leading.node}</LeadingSlot>
}

function Trailing({
  trailing,
  textColor,
  iconColor,
}: {
  trailing: ListItemTrailing
  textColor: string
  iconColor: string
}) {
  if (trailing.type === 'none') return null

  const ChevronIcon = AppIcons.navChevron

  if (trailing.type === 'chevron') {
    return (
      <TrailingSlot>
        <ChevronIcon size={18} color={iconColor} />
      </TrailingSlot>
    )
  }

  if (trailing.type === 'text-chevron') {
    return (
      <TrailingSlot>
        <TrailingText color={textColor}>{trailing.text}</TrailingText>
        <ChevronIcon size={18} color={iconColor} />
      </TrailingSlot>
    )
  }

  return null
}

export function ListItem({
  label,
  sublabel,
  leading,
  trailing,
  onPress,
  labelColor,
  testID,
}: ListItemProps) {
  const { theme } = useTheme()

  const resolvedLabelColor = labelColor ?? theme.foreground
  const effectiveLeading: ListItemLeading = leading ?? { type: 'none' }
  const effectiveTrailing: ListItemTrailing = trailing ?? { type: 'none' }

  if (effectiveTrailing.type === 'toggle') {
    return (
      <RowView testID={testID}>
        <Toggle
          label={label}
          sublabel={sublabel}
          value={effectiveTrailing.value}
          onValueChange={effectiveTrailing.onValueChange}
        />
      </RowView>
    )
  }

  if (effectiveTrailing.type === 'slider') {
    const { value, onValueChange, min, max, step, minLabel, midLabel, maxLabel } = effectiveTrailing
    return (
      <RowView testID={testID}>
        <Slider
          label={label}
          sublabel={sublabel}
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={step}
          minLabel={minLabel}
          midLabel={midLabel}
          maxLabel={maxLabel}
        />
      </RowView>
    )
  }

  return (
    <RowPressable
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.6 : 1}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={label}
      testID={testID}
    >
      <Leading leading={effectiveLeading} iconColor={theme.mutedForeground} />
      <ContentArea>
        <Label color={resolvedLabelColor}>{label}</Label>
        {sublabel && <Sublabel color={theme.mutedForeground}>{sublabel}</Sublabel>}
      </ContentArea>
      <Trailing
        trailing={effectiveTrailing}
        textColor={theme.foreground}
        iconColor={theme.mutedForeground}
      />
    </RowPressable>
  )
}
