import styled from 'styled-components/native'

export const StyledText = styled.Text<{ $textColor: string }>`
  color: ${({ $textColor }) => $textColor};
`
