import {
  Strings,
  StringsEnUs,
  StringsEs,
  StringsPtBr
} from '@/app/presentation/i18n'

export const makeStrings = (locale: string): Strings => {
  const language = locale && locale.split('-')[0].toLowerCase()
  switch (language) {
    case 'es':
      return new StringsEs()
    case 'en':
      return new StringsEnUs()
    case 'pt':
    default:
      return new StringsPtBr()
  }
}
