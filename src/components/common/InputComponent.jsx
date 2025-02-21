import RowComponent from '@/components/common/RowComponent'
import TextComponent from '@/components/common/TextComponent'
import { colors } from '@/constants/colors'
import { globalStyles } from '@/styles/globalStyles'
import { useState } from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const InputComponent = (props) => {
  const {
    value,
    onChange,
    affix,
    containerInputStyle,
    inputStyle,
    placeholder = '',
    placeholderTextColor = 'rgba(255, 255, 255, 0.6)',
    label = '',
    clear = false,
    isPassword = false,
    keyboardType,
    helpText = '',
    ...rest
  } = props

  if (!value && !onChange) {
    return null
  }

  const localInputContainerStyles = [globalStyles.inputContainer, {}, containerInputStyle]

  const localInputContentStyles = [
    globalStyles.inputContent,
    {
      marginTop: label ? 8 : 0,
      marginBottom: helpText ? 8 : 0
    }
  ]

  const [isShowPassword, setIsShowPassword] = useState(isPassword)

  return (
    <View style={localInputContainerStyles}>
      {/* Hiển thị label */}
      {label && <TextComponent text={label} />}

      <RowComponent styles={localInputContentStyles}>
        {/* Hiển thị icon */}
        {affix && affix}

        <TextInput
          autoCapitalize='none'
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={(val) => onChange(val)}
          keyboardType={keyboardType}
          secureTextEntry={isShowPassword}
          style={[
            globalStyles.input,
            globalStyles.text,
            {
              paddingLeft: affix ? 8 : 0
            },
            inputStyle
          ]}
          selectionColor={'#81ecec'} // Màu sắc của con trỏ và vùng chọn.
          // caretHidden={true} // Ẩn con trỏ nhập liệu.
          {...rest}
        />

        {/* Hiển thị Icon Clear */}
        {value && clear && (
          <TouchableOpacity onPress={() => onChange('')}>
            <Icon name='remove' size={20} color='rgba(255, 255, 255, 0.6)' />
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setIsShowPassword((prev) => !prev)}>
            <Icon name={isShowPassword ? 'eye-slash' : 'eye'} size={20} color='rgba(255, 255, 255, 0.6)' />
          </TouchableOpacity>
        )}
      </RowComponent>

      {/* Hiển thị helpText */}
      {helpText && <TextComponent text={helpText} color={colors.danger} />}
    </View>
  )
}

export default InputComponent
