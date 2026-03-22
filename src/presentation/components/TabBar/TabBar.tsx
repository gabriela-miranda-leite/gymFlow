import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import { useTheme } from '@/contexts/ThemeContext'
import {
  ActiveIndicator,
  Bar,
  TabItem,
  TabLabel,
} from '@/presentation/components/TabBar/TabBar.styles'

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { theme } = useTheme()

  return (
    <Bar bg={theme.tabBar.bg} border={theme.tabBar.border}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const iconColor = isFocused ? theme.tabBar.active : theme.tabBar.inactive
        const labelColor = isFocused ? theme.tabBar.active : theme.tabBar.inactive

        const icon = options.tabBarIcon?.({
          focused: isFocused,
          color: iconColor,
          size: 24,
        })

        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : (options.title ?? route.name)

        function onPress() {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TabItem
            key={route.key}
            testID={`tab-${route.name}`}
            onPress={onPress}
            accessibilityRole="button"
          >
            {isFocused && (
              <ActiveIndicator testID={`tab-indicator-${route.name}`} color={theme.tabBar.active} />
            )}
            {icon}
            <TabLabel color={labelColor}>{label}</TabLabel>
          </TabItem>
        )
      })}
    </Bar>
  )
}
