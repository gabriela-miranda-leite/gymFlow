import {
  ArrowLeft,
  Bell,
  Camera,
  CaretDown,
  CaretRight,
  ChartBar,
  Check,
  Clock,
  Envelope,
  Eye,
  EyeSlash,
  Heart,
  Lock,
  MapPin,
  MapTrifold,
  Moon,
  Radio,
  SignOut,
  Spinner,
  Sun,
  TrendDown,
  User,
  WarningCircle,
} from 'phosphor-react-native'

export type { IconProps } from 'phosphor-react-native'

// Navigation
export const AppIcons = {
  navBack: ArrowLeft,
  navChevron: CaretRight,
  navChevronDown: CaretDown,

  // Tabs
  tabMap: MapTrifold,
  tabCheckIn: Radio,
  tabProfile: User,

  // Location & time
  location: MapPin,
  lastUpdate: Clock,
  bestTime: TrendDown,

  // Actions
  favorite: Heart,
  notifications: Bell,
  logout: SignOut,
  editAvatar: Camera,

  // Form fields
  validationError: WarningCircle,
  showPassword: Eye,
  hidePassword: EyeSlash,
  emailField: Envelope,
  passwordField: Lock,

  // Theme
  lightTheme: Sun,
  darkTheme: Moon,

  // Feedback
  success: Check,
  loading: Spinner,

  // Reports
  reports: ChartBar,
} as const

export type AppIconName = keyof typeof AppIcons
