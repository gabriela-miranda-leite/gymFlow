import { act, renderHook, waitFor } from '@testing-library/react-native'

import { useEditProfileViewModel } from '@/presentation/viewModels/EditProfileViewModel/EditProfileViewModel'

const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}))

const mockGetProfile = jest.fn()
const mockUpdateProfile = jest.fn()

jest.mock('@/data/repositories/profile/ProfileRepository', () => ({
  profileRepository: {
    getProfile: () => mockGetProfile(),
    updateProfile: (...args: unknown[]) => mockUpdateProfile(...args),
  },
}))

const mockRequestPermission = jest.fn()
const mockLaunchImageLibrary = jest.fn()

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: () => mockRequestPermission(),
  launchImageLibraryAsync: () => mockLaunchImageLibrary(),
}))

describe('useEditProfileViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetProfile.mockResolvedValue({ name: 'Rafael Souza', phone: '(11) 98765-4321' })
    mockUpdateProfile.mockResolvedValue(undefined)
    mockRequestPermission.mockResolvedValue({ status: 'granted' })
    mockLaunchImageLibrary.mockResolvedValue({ canceled: true, assets: [] })
  })

  describe('initial state', () => {
    it('loads name from repository', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())

      await waitFor(() => {
        expect(result.current.name).toBe('Rafael Souza')
      })
    })

    it('loads phone from repository', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())

      await waitFor(() => {
        expect(result.current.phone).toBe('(11) 98765-4321')
      })
    })
  })

  describe('onChangeName', () => {
    it('updates name when called', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      act(() => {
        result.current.onChangeName('João Silva')
      })

      expect(result.current.name).toBe('João Silva')
    })
  })

  describe('onChangePhone', () => {
    it('formats phone with full 11 digits', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.phone).toBe('(11) 98765-4321'))

      act(() => {
        result.current.onChangePhone('11987654321')
      })

      expect(result.current.phone).toBe('(11) 98765-4321')
    })

    it('formats phone with only DDD', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.phone).toBe('(11) 98765-4321'))

      act(() => {
        result.current.onChangePhone('11')
      })

      expect(result.current.phone).toBe('(11')
    })

    it('formats phone with DDD and partial number', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.phone).toBe('(11) 98765-4321'))

      act(() => {
        result.current.onChangePhone('11987')
      })

      expect(result.current.phone).toBe('(11) 987')
    })

    it('strips non-digit characters before formatting', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.phone).toBe('(11) 98765-4321'))

      act(() => {
        result.current.onChangePhone('(11) 98765-4321')
      })

      expect(result.current.phone).toBe('(11) 98765-4321')
    })

    it('limits input to 11 digits', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.phone).toBe('(11) 98765-4321'))

      act(() => {
        result.current.onChangePhone('119876543210000')
      })

      expect(result.current.phone).toBe('(11) 98765-4321')
    })

    it('returns empty string when input has no digits', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.phone).toBe('(11) 98765-4321'))

      act(() => {
        result.current.onChangePhone('')
      })

      expect(result.current.phone).toBe('')
    })
  })

  describe('onPressSave', () => {
    it('calls updateProfile with current name and phone', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      await act(async () => {
        result.current.onPressSave()
      })

      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: 'Rafael Souza',
        phone: '(11) 98765-4321',
      })
    })

    it('does not call updateProfile when name is empty', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      act(() => {
        result.current.onChangeName('')
      })

      await act(async () => {
        result.current.onPressSave()
      })

      expect(mockUpdateProfile).not.toHaveBeenCalled()
      expect(mockGoBack).not.toHaveBeenCalled()
    })

    it('calls navigation.goBack after saving', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      await act(async () => {
        result.current.onPressSave()
      })

      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('onPressBack', () => {
    it('calls navigation.goBack', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      act(() => {
        result.current.onPressBack()
      })

      expect(mockGoBack).toHaveBeenCalledTimes(1)
    })
  })

  describe('onPressCameraBadge', () => {
    it('requests media library permission', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      await act(async () => {
        await result.current.onPressCameraBadge()
      })

      expect(mockRequestPermission).toHaveBeenCalledTimes(1)
    })

    it('does not open image picker when permission is denied', async () => {
      mockRequestPermission.mockResolvedValueOnce({ status: 'denied' })
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      await act(async () => {
        await result.current.onPressCameraBadge()
      })

      expect(mockLaunchImageLibrary).not.toHaveBeenCalled()
    })

    it('updates imageUri when user selects an image', async () => {
      mockLaunchImageLibrary.mockResolvedValueOnce({
        canceled: false,
        assets: [{ uri: 'file://photo.jpg' }],
      })
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      await act(async () => {
        await result.current.onPressCameraBadge()
      })

      expect(result.current.imageUri).toBe('file://photo.jpg')
    })

    it('does not update imageUri when user cancels', async () => {
      const { result } = renderHook(() => useEditProfileViewModel())
      await waitFor(() => expect(result.current.name).toBe('Rafael Souza'))

      await act(async () => {
        await result.current.onPressCameraBadge()
      })

      expect(result.current.imageUri).toBeUndefined()
    })
  })
})
