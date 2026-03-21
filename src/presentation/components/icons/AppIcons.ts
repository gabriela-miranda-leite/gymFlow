import {
  ArrowLeftIcon,
  BellIcon,
  CameraIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartBarIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
  LockIcon,
  MapPinIcon,
  MapTrifoldIcon,
  MoonIcon,
  RadioIcon,
  SignOutIcon,
  SpinnerIcon,
  SunIcon,
  TrendDownIcon,
  UserIcon,
  WarningCircleIcon,
} from 'phosphor-react-native'

export type { IconProps } from 'phosphor-react-native'

// Navigation
export const AppIcons = {
  navBack: ArrowLeftIcon,
  navChevron: CaretRightIcon,
  navChevronDown: CaretDownIcon,

  // Tabs
  tabMap: MapTrifoldIcon,
  tabCheckIn: RadioIcon,
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
} as const

export type AppIconName = keyof typeof AppIcons
