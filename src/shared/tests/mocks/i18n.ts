// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeProxy = (path: string): any =>
  new Proxy(
    Object.assign(() => path, {}),
    {
      get: (_, key: string) => makeProxy(path ? `${path}.${key}` : key),
    },
  )

export const tk = makeProxy('')
export const useTranslation = () => ({ t: (key: string) => key })
export const changeLanguage = () => Promise.resolve()
export default { changeLanguage }
