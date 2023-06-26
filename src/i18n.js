import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en.json'
import esTranslation from './locales/es.json'

// Configura las opciones de i18next
i18n.use(initReactI18next).init({
  lng: 'es', // Establece el idioma predeterminado
  fallbackLng: 'en', // Idioma de respaldo si no se encuentra una traducción
  resources: {
    es: {
      translation: esTranslation
    },
    en: {
      translation: enTranslation
    }
  }
})

export default i18n
