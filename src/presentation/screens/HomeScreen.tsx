import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';
import { AppText } from '@/presentation/components/AppText';
import { useTranslation } from '@/shared/i18n';
import { Spacing } from '@/tokens';

export function HomeScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <AppText variant="h2">{t('home.title')}</AppText>
      <AppText variant="body" color={theme.text.secondary} style={{ marginTop: Spacing.s2 }}>
        {t('home.emptyState')}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
