import { colors } from '@/constants/colors'
import { fontFamilies } from '@/constants/fontFamilies'
import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor
  },

  text: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fontFamilies.regular
  },

  section: {
    marginHorizontal: 16,
    marginBottom: 20
  },

  row: {
    flexDirection: 'row'
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50
  },

  button: {
    height: 48,
    maxHeight: 48,
    minWidth: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputContainer: {
    marginTop: 8,
    marginBottom: 16,
    width: '100%'
  },

  inputContent: {
    height: 48,
    maxHeight: 48,
    minWidth: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.25)'
  },

  input: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'flex-start'
  },

  modalLoadng: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})
