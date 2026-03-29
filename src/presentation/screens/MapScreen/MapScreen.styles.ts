import styled from 'styled-components/native'

import { FontFamily, FontSize, Radius, Spacing } from '@/tokens'

export const Container = styled.View`
  flex: 1;
`

export const MapWrapper = styled.View`
  flex: 1;
`

export const ErrorContainer = styled.View<{ bg: string }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => bg};
  padding-top: ${Spacing.s4}px;
  padding-bottom: ${Spacing.s4}px;
  padding-left: ${Spacing.s6}px;
  padding-right: ${Spacing.s6}px;
`

export const ErrorText = styled.Text<{ color: string }>`
  font-size: ${FontSize.body}px;
  font-family: ${FontFamily.medium};
  color: ${({ color }) => color};
  text-align: center;
`

export const UserLocationDot = styled.View<{ color: string; borderColor: string }>`
  width: 20px;
  height: 20px;
  border-radius: ${Radius.full}px;
  background-color: ${({ color }) => color};
  border-width: 3px;
  border-color: ${({ borderColor }) => borderColor};
`

export const LoadingOverlay = styled.View<{ bg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => bg};
  opacity: 0.85;
  border-radius: ${Radius.md}px;
`
