import {
  AppleLogoIcon,
  ArrowLeftIcon,
  BellIcon,
  BroadcastIcon,
  CameraIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartBarIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  GoogleLogoIcon,
  HeartIcon,
  LockIcon,
  MapPinIcon,
  MapTrifoldIcon,
  MoonIcon,
  SignOutIcon,
  SpinnerIcon,
  SunIcon,
  TrendDownIcon,
  UserIcon,
  WarningCircleIcon,
} from 'phosphor-react-native'

import { ChartIcon } from '@/presentation/components/icons/ChartIcon'

export type { IconProps } from 'phosphor-react-native'

// Navigation
export const AppIcons = {
  navBack: ArrowLeftIcon,
  navChevron: CaretRightIcon,
  navChevronDown: CaretDownIcon,

  // Tabs
  tabMap: MapTrifoldIcon,
  tabCheckIn: BroadcastIcon,
  tabProfile: UserIcon,

  // Location & time
  location: MapPinIcon,
  lastUpdate: ClockIcon,
  bestTime: TrendDownIcon,

  // Actions
  favorite: HeartIcon,
  notifications: BellIcon,
  logout: SignOutIcon,
  editAvatar: CameraIcon,
  'google-logo': GoogleLogoIcon,
  'apple-logo': AppleLogoIcon,

  // Form fields
  validationError: WarningCircleIcon,
  showPassword: EyeIcon,
  hidePassword: EyeSlashIcon,
  emailField: EnvelopeIcon,
  passwordField: LockIcon,

  // Theme
  lightTheme: SunIcon,
  darkTheme: MoonIcon,

  // Feedback
  success: CheckIcon,
  loading: SpinnerIcon,

  // Reports
  reports: ChartBarIcon,
  logo: ChartIcon,
} as const

export type AppIconName = keyof typeof AppIcons
