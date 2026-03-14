import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { useAppFonts } from '@/hooks/useFonts';

function AppContent() {
  const { fontsLoaded, error } = useAppFonts();
  const { theme, isDark } = useTheme();

  if (!fontsLoaded && !error) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <Text style={{ color: theme.text.primary }}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
