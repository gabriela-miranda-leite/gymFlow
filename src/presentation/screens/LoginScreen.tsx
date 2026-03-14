import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { Spacing, Typography } from '@/tokens';

export function LoginScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <Text style={[Typography.h1, { color: theme.text.primary }]}>GymFlow</Text>
      <Text style={[Typography.body, { color: theme.text.secondary, marginTop: Spacing.s2 }]}>
        Faça login para continuar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
