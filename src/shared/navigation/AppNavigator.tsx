import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { TabBar } from '@/presentation/components/TabBar'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import { CheckInScreen } from '@/presentation/screens/CheckInScreen'
import { MapScreen } from '@/presentation/screens/MapScreen'
import { ProfileScreen } from '@/presentation/screens/ProfileScreen'
import { tk, useTranslation } from '@/shared/i18n'
import { TabRoutes } from '@/shared/navigation/routes'
import type { AppTabParamList } from '@/shared/navigation/types'

const Tab = createBottomTabNavigator<AppTabParamList>()

export function AppNavigator() {
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName={TabRoutes.Map}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={TabRoutes.Map}
        component={MapScreen}
        options={{
          tabBarLabel: t(tk.common.tabs.map),
          tabBarIcon: ({ color, size }) => <AppIcons.tabMap color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.CheckIn}
        component={CheckInScreen}
        options={{
          tabBarLabel: t(tk.common.tabs.checkIn),
          tabBarIcon: ({ color, size }) => <AppIcons.tabCheckIn color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.Profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: t(tk.common.tabs.profile),
          tabBarIcon: ({ color, size }) => <AppIcons.tabProfile color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}
