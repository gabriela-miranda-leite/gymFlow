import { TouchableOpacity } from 'react-native'
import type { TextInputProps as RNTextInputProps } from 'react-native'

import { useTheme } from '@/contexts/ThemeContext'
import { Text } from '@/presentation/components/Text/Text'
import {
  Container,
  ErrorRow,
  InputRow,
  StyledInput,
} from '@/presentation/components/TextInput/TextInput.styles'
import type { AppIconName } from '@/presentation/components/icons/AppIcons'
import { AppIcons } from '@/presentation/components/icons/AppIcons'
import { tk, useTranslation } from '@/shared/i18n'

type TextInputProps = {
  label: string
  value: string
  onChangeText: (value: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  errorMessage?: string
  disabled?: boolean
  rightIcon?: AppIconName
  onPressRightIcon?: () => void
  autoCapitalize?: RNTextInputProps['autoCapitalize']
  keyboardType?: RNTextInputProps['keyboardType']
  testID?: string
}

export function TextInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  errorMessage,
  disabled = false,
  rightIcon,
  onPressRightIcon,
  autoCapitalize = 'none',
  keyboardType = 'default',
  testID,
}: TextInputProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const hasError = !!errorMessage
  const borderColor = hasError ? theme.destructive : theme.border
  const Icon = rightIcon ? AppIcons[rightIcon] : null
  const ErrorIcon = AppIcons.validationError

  return (
    <Container>
      <Text variant="body" color={(t) => (disabled ? t.mutedForeground : t.foreground)}>
        {label}
      </Text>
      <InputRow
        bgColor={theme.input}
        borderColor={borderColor}
        accessible
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
      >
        <StyledInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.mutedForeground}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          textColor={disabled ? theme.mutedForeground : theme.foreground}
          autoCorrect={false}
          editable={!disabled}
          accessibilityLabel={label}
          accessibilityHint={placeholder}
          accessibilityState={{ disabled }}
          testID={testID}
        />
        {Icon && (
          <TouchableOpacity
            onPress={onPressRightIcon}
            accessibilityRole="button"
            accessibilityLabel={
              secureTextEntry ? t(tk.common.showPassword) : t(tk.common.hidePassword)
            }
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        )}
      </InputRow>
      {hasError && (
        <ErrorRow
          accessible
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          accessibilityLabel={errorMessage}
        >
          <ErrorIcon size={14} color={theme.destructive} />
          <Text variant="caption" color={(t) => t.destructive}>
            {errorMessage}
          </Text>
        </ErrorRow>
      )}
    </Container>
  )
}
