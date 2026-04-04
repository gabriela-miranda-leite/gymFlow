import { useNavigation, useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useMemo, useState } from 'react'

import { gymRepository } from '@/data/repositories/gym/GymRepository'
import type { GymModel } from '@/domain/models/GymModel'
import { getGymByIdUseCase } from '@/domain/useCases/getGymById/GetGymByIdUseCase'
import type {
  GymDetailUiModel,
  HourlyFlowBarUiModel,
} from '@/presentation/uiModels/GymDetailUiModel'
import { tk, useTranslation } from '@/shared/i18n'
import type { RootStackParamList } from '@/shared/navigation/types'
import { colors } from '@/tokens'
import type { OccupancyLevel } from '@/tokens'

type RouteProps = RouteProp<RootStackParamList, 'GymDetail'>
type NavProps = NativeStackNavigationProp<RootStackParamList, 'GymDetail'>

const DAY_KEY_MAP: (keyof typeof tk.gymDetail.days.short)[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
]

// In-memory favorite toggle state (simulates persistence until real storage is added)
const favoriteOverrides: Record<string, boolean> = {}

function barColor(percent: number): string {
  if (percent <= 30) return colors.statusEmpty
  if (percent <= 60) return '#FF9800'
  return colors.statusFull
}

function occupancyLevelFromPercent(percent: number): OccupancyLevel {
  if (percent <= 20) return 'empty'
  if (percent <= 50) return 'moderate'
  if (percent <= 80) return 'busy'
  return 'packed'
}

function getBestHourEntry(entries: { hour: number; occupancyPercent: number }[]): {
  hour: number
  occupancyPercent: number
} {
  const open = entries.filter((e) => e.hour >= 6 && e.hour <= 22)
  const pool = open.length > 0 ? open : entries
  return pool.reduce((min, e) => (e.occupancyPercent < min.occupancyPercent ? e : min), pool[0])
}

function formatUpdatedAt(isoDate: string, t: (key: string, opts?: object) => string): string {
  const minutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000)
  if (minutes < 1) return t(tk.gymDetail.updatedAtJustNow)
  return t(tk.gymDetail.updatedAt, { minutes })
}

export function useGymDetailViewModel(): GymDetailUiModel {
  const { t } = useTranslation()
  const route = useRoute<RouteProps>()
  const navigation = useNavigation<NavProps>()
  const { gymId } = route.params

  const [gym, setGym] = useState<GymModel | undefined>(undefined)
  const today = new Date().getDay()
  const currentHour = new Date().getHours()

  const [selectedDayIndex, setSelectedDayIndex] = useState(today)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false
    getGymByIdUseCase(gymId, gymRepository).then((result) => {
      if (cancelled) return
      setGym(result)
      setIsFavorite(
        gymId in favoriteOverrides ? favoriteOverrides[gymId] : (result?.isFavorite ?? false),
      )
    })
    return () => {
      cancelled = true
    }
  }, [gymId])

  const days = DAY_KEY_MAP.map((key, idx) => ({
    label: t(tk.gymDetail.days.short[key]),
    dayIndex: idx,
  }))

  const selectedDayKey = DAY_KEY_MAP[selectedDayIndex] ?? 'mon'
  const selectedDayLabel = t(tk.gymDetail.days.short[selectedDayKey])

  const hourlyEntries = useMemo(
    () => gym?.weeklyFlow[selectedDayIndex] ?? [],
    [gym, selectedDayIndex],
  )

  const hourlyBars: HourlyFlowBarUiModel[] = useMemo(
    () =>
      hourlyEntries.map((entry) => ({
        hour: entry.hour,
        occupancyPercent: entry.occupancyPercent,
        barColor: barColor(entry.occupancyPercent),
        isFuture: selectedDayIndex === today && entry.hour > currentHour,
        isCurrentHour: selectedDayIndex === today && entry.hour === currentHour,
      })),
    [hourlyEntries, selectedDayIndex, today, currentHour],
  )

  const bestEntry = useMemo(
    () =>
      hourlyEntries.length > 0 ? getBestHourEntry(hourlyEntries) : { hour: 6, occupancyPercent: 0 },
    [hourlyEntries],
  )

  const currentOccupancy = gym?.occupancyPercent ?? 0
  const currentLevel = gym?.occupancy ?? occupancyLevelFromPercent(currentOccupancy)

  const occupancyStatusColorMap: Record<OccupancyLevel, string> = {
    empty: colors.statusEmpty,
    moderate: colors.statusModerate,
    busy: colors.statusBusy,
    packed: colors.statusFull,
  }

  const occupancyLabelMap: Record<OccupancyLevel, string> = {
    empty: t(tk.gymDetail.occupancyLabel.empty),
    moderate: t(tk.gymDetail.occupancyLabel.moderate),
    busy: t(tk.gymDetail.occupancyLabel.busy),
    packed: t(tk.gymDetail.occupancyLabel.packed),
  }

  const onToggleFavorite = () => {
    const next = !isFavorite
    favoriteOverrides[gymId] = next
    setIsFavorite(next)
  }

  return {
    gymId,
    name: gym?.name ?? '',
    address: gym?.address ?? '',
    occupancyPercent: `${currentOccupancy}%`,
    occupancyLabel: occupancyLabelMap[currentLevel],
    occupancyLabelColor: occupancyStatusColorMap[currentLevel],
    occupancyStatusColor: occupancyStatusColorMap[currentLevel],
    bestTimeLabel: `${String(bestEntry.hour).padStart(2, '0')}:00`,
    bestTimeOccupancy: t(tk.gymDetail.bestTimeOccupancy, { value: bestEntry.occupancyPercent }),
    bestTimeTrendIcon: 'down',
    selectedDayIndex,
    days,
    flowChartTitle: t(tk.gymDetail.flowChartTitle, { day: selectedDayLabel }),
    hourlyBars,
    currentHour,
    isFavorite,
    notifyButtonLabel: t(tk.gymDetail.notifyButton),
    updatedAtLabel: gym?.lastUpdatedAt
      ? formatUpdatedAt(gym.lastUpdatedAt, (key, opts) => String(t(key, opts as never)))
      : t(tk.gymDetail.updatedAtJustNow),
    onSelectDay: setSelectedDayIndex,
    onToggleFavorite,
    onNotify: () => {},
    onBack: () => navigation.goBack(),
    occupancy: currentLevel,
  }
}
