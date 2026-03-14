import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { queryClient } from '@/data/services/queryClient';
import { useAppFonts } from '@/hooks/useFonts';
import { ErrorBoundary } from '@/presentation/components';
import { RootNavigator } from '@/shared/navigation/RootNavigator';
import '@/shared/i18n';

function AppContent() {
  const { fontsLoaded, error } = useAppFonts();
  const { isDark } = useTheme();

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <RootNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
