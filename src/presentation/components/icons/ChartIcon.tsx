import React from 'react'
import { Rect, Svg } from 'react-native-svg'

interface ChartIconProps {
  size?: number
  color?: string
}

export function ChartIcon({ size = 16, color = '#000000' }: ChartIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Rect x="4" y="16" width="6" height="14" rx="2" fill={color} opacity={0.6} />
      <Rect x="13" y="10" width="6" height="20" rx="2" fill={color} opacity={0.8} />
      <Rect x="22" y="6" width="6" height="28" rx="2" fill={color} />
      <Rect x="31" y="12" width="6" height="16" rx="2" fill={color} opacity={0.7} />
    </Svg>
  )
}
