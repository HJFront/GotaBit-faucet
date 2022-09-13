import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import index from '../locales/en/index.json'
import common from '../locales/en/common.json'
import index_zh from '../locales/zh/common.json'
import common_zh from '../locales/zh/common.json'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns: ['index', 'common'],
    react: {
      useSuspense: false,
    },
  })

// preload
i18n.addResourceBundle('en', 'index', index)
i18n.addResourceBundle('en', 'common', common)
i18n.addResourceBundle('zh', 'index', index_zh)
i18n.addResourceBundle('zh', 'common', common_zh)

export default i18n
