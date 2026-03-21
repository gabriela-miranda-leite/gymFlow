import styled from 'styled-components/native'

import { Typography } from '@/tokens'

type StyledTextProps = {
  color: string
}

export const DisplayText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.display.fontFamily};
  font-size: ${Typography.display.fontSize}px;
`

export const HeadingText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.heading.fontFamily};
  font-size: ${Typography.heading.fontSize}px;
`

export const SubheadingText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.subheading.fontFamily};
  font-size: ${Typography.subheading.fontSize}px;
`

export const BodyText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.body.fontFamily};
  font-size: ${Typography.body.fontSize}px;
`

export const CaptionText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.caption.fontFamily};
  font-size: ${Typography.caption.fontSize}px;
`

export const MicroText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.micro.fontFamily};
  font-size: ${Typography.micro.fontSize}px;
`

export const DataText = styled.Text<StyledTextProps>`
  color: ${({ color }) => color};
  font-family: ${Typography.data.fontFamily};
  font-size: ${Typography.data.fontSize}px;
`
