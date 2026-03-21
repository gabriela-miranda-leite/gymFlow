import ptBR from '@/shared/i18n/locales/pt-BR'

type DeepKeys<T> = {
  [K in keyof T]: T[K] extends object ? DeepKeys<T[K]> : string
}

function createKeys<T extends object>(obj: T, prefix = ''): DeepKeys<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const path = prefix ? `${prefix}.${key}` : key
      return [key, typeof value === 'object' && value !== null ? createKeys(value, path) : path]
    }),
  ) as DeepKeys<T>
}

export const tk = createKeys(ptBR)
