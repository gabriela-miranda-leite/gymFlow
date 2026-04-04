import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { forwardRef } from 'react'
import type { ReactNode } from 'react'

import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  children: ReactNode
  onDismiss: () => void
}

export const AppBottomSheet = forwardRef<BottomSheet, Props>(({ children, onDismiss }, ref) => {
  const { theme } = useTheme()

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing
      enablePanDownToClose
      onClose={onDismiss}
      backgroundStyle={{ backgroundColor: theme.card }}
      handleIndicatorStyle={{ backgroundColor: theme.mutedForeground }}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  )
})

AppBottomSheet.displayName = 'AppBottomSheet'
