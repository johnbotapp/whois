// https://nuxt.com/docs/api/configuration/nuxt-config
import {
  defineNuxtConfig
} from 'nuxt/config'

export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  extends: [
    'nuxt-lego'
  ],
  css: [
    '~/assets/main.css'
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    'nuxt-time',
  ],
  i18n: {
    locales: [
      'en',
      'fr'
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
  },
  runtimeConfig: {
    discord: {
      bot_token: process.env.NUXT_DISCORD_BOT_TOKEN,
    }
  },
  pages: true,
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'Whois / John-Bot',
      meta: [{
        charset: 'utf-8',
      },{
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      }, {
        name: 'description',
        content: 'Get information about a Discord user just by their ID!',
      }, {
        name: 'og:site_name',
        content: 'Whois / John-Bot'
      }, {
        name: 'twitter:card',
        content: 'summary_large_image'
      }, {
        name: 'twitter:image',
        content: '/img/Banner.png'
      }, {
        name: 'twitter:title',
        content: 'Whois / John-Bot'
      }, {
        name: 'twitter:description',
        content: 'Get information about a Discord user just by their ID!'
      }, {
        name: 'theme-color',
        content: '#2b2d31'
      }],
      link: [{
          rel: 'manifest',
          href: '/site.webmanifest'
      }]
    }
  },
  compatibilityDate: '2025-01-09'
});
