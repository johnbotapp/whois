import * as i18n from '~/utils/i18n.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: i18n
}))
