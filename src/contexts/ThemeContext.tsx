import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

import { AppTheme, darkTheme, lightTheme } from '@/tokens'

export type ThemeMode = 'system' | 'light' | 'dark'

interface ThemeContextValue {
  theme: AppTheme
  isDark: boolean
  themeKey: 'light' | 'dark'
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  initialMode?: ThemeMode
}

export function ThemeProvider({ children, initialMode = 'system' }: ThemeProviderProps) {
  const systemScheme = useColorScheme()
  const [mode, setModeState] = useState<ThemeMode>(initialMode)

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
  }, [])

  const isDark = useMemo(() => {
    if (mode === 'system') return systemScheme === 'dark'
    return mode === 'dark'
  }, [mode, systemScheme])

  const theme = isDark ? darkTheme : lightTheme
  const themeKey = theme.key

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark, themeKey, mode, setMode }),
    [theme, isDark, themeKey, mode, setMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
