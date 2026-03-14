import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AppTabParamList, RootStackParamList } from './types';

import { useTheme } from '@/contexts/ThemeContext';
import { HomeScreen } from '@/presentation/screens/HomeScreen';
import { LoginScreen } from '@/presentation/screens/LoginScreen';
import { ProfileScreen } from '@/presentation/screens/ProfileScreen';
import { useAuthStore } from '@/store/useAuthStore';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

function AppTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBar.bg,
          borderTopColor: theme.tabBar.border,
        },
        tabBarActiveTintColor: theme.tabBar.active,
        tabBarInactiveTintColor: theme.tabBar.inactive,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Academias' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { theme } = useTheme();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.bg.primary },
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
