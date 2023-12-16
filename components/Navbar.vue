<template>
  <div class="flex w-full items-center justify-between">
    <NuxtLink
      :to="localePath('/')"
      class="pointer-events-none flex w-fit items-start justify-center gap-2 px-3 py-2 text-black opacity-0 transition duration-150 ease-in-out hover:opacity-100 dark:text-white"
      :class="{ 'pointer-events-auto opacity-75': $route.path !== localePath('/') }"
    >
      {{ $t('navbar.home') }}
    </NuxtLink>
    <div class="flex w-fit items-start justify-center gap-2 px-3 py-2 text-black opacity-75 transition duration-150 ease-in-out hover:opacity-100 dark:text-white">
      <NuxtLink
        @click="locale = 'fr'"
        :to="switchLocalePath('fr')"
        class="text-black hover:underline dark:text-white"
        :class="{ 'pointer-events-none opacity-50': locale === 'fr' }"
      >
        FR
      </NuxtLink>
      <span class="text-black dark:text-white">/</span>
      <NuxtLink
        @click="locale = 'en'"
        :to="switchLocalePath('en')"
        class="text-black hover:underline dark:text-white"
        :class="{ 'pointer-events-none opacity-50': locale === 'en' }"
      >
        EN
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const { locale } = useI18n();
  const switchLocalePath = useSwitchLocalePath();
  const localePath = useLocalePath();

</script>
