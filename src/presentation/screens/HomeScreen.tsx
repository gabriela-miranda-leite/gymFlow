import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { Spacing, Typography } from '@/tokens';

export function HomeScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <Text style={[Typography.h2, { color: theme.text.primary }]}>Academias</Text>
      <Text style={[Typography.body, { color: theme.text.secondary, marginTop: Spacing.s2 }]}>
        Suas academias aparecerão aqui
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
