import type React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useTheme } from '@/contexts/ThemeContext'
import {
  Container,
  Content,
} from '@/presentation/components/ScreenContainer/ScreenContainer.styles'

type ScreenContainerProps = {
  children: React.ReactNode
  scrollable?: boolean
}

export function ScreenContainer({ children, scrollable = true }: ScreenContainerProps) {
  const { theme } = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Container bgColor={theme.background} scrollEnabled={scrollable}>
          <Content>{children}</Content>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
