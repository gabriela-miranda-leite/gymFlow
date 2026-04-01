import { useNavigation, useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import type { CheckInFeedbackUiModel } from '@/presentation/uiModels/CheckInFeedbackUiModel'
import { tk } from '@/shared/i18n'
import type { RootStackParamList } from '@/shared/navigation/types'

type CheckInFeedbackRouteProp = RouteProp<RootStackParamList, 'CheckInFeedback'>

export const useCheckInFeedbackViewModel = (): CheckInFeedbackUiModel => {
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<CheckInFeedbackRouteProp>()

  const { gymName, occupancyLabel, occupancyColor } = route.params

  const onBack = () => {
    navigation.goBack()
  }

  return {
    title: t(tk.checkInFeedback.title),
    subtitle: t(tk.checkInFeedback.subtitle),
    successIconLabel: t(tk.checkInFeedback.successIconLabel),
    gymName,
    occupancyLabel,
    occupancyColor,
    buttonLabel: t(tk.checkInFeedback.button),
    onBack,
  }
}
