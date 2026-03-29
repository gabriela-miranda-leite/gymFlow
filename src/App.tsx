import { QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { IconContext } from 'phosphor-react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { queryClient } from '@/data/services/queryClient'
import { useAppFonts } from '@/hooks/useFonts'
import { ErrorBoundary } from '@/presentation/components'
import { RootNavigator } from '@/shared/navigation/RootNavigator'
import '@/shared/i18n'

function AppContent() {
  const { fontsLoaded, error } = useAppFonts()
  const { isDark, theme } = useTheme()

  if (!fontsLoaded && !error) return null

  return (
    <IconContext.Provider value={{ color: theme.foreground, size: 24, weight: 'regular' }}>
      <RootNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </IconContext.Provider>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  )
}
