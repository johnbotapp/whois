<template>
  <div class="flex justify-between items-center w-full">
    <NuxtLink
      :to="localePath('/')"
      class="opacity-0 flex justify-center items-start text-black dark:text-white gap-2 px-3 py-2 w-fit pointer-events-none transition duration-150 ease-in-out hover:opacity-100"
      :class="{ 'opacity-75 pointer-events-auto': $route.path !== localePath('/') }"
    >
      {{ $t('navbar.home') }}
    </NuxtLink>
    <div class="opacity-75 flex justify-center items-start text-black dark:text-white gap-2 px-3 py-2 w-fit transition duration-150 ease-in-out hover:opacity-100">
      <NuxtLink
        @click="locale = 'fr'"
        :to="switchLocalePath('fr')"
        class="text-black dark:text-white hover:underline"
        :class="{ 'pointer-events-none opacity-50': locale === 'fr' }"
      >
        FR
      </NuxtLink>
      <span class="text-black dark:text-white">/</span>
      <NuxtLink
        @click="locale = 'en'"
        :to="switchLocalePath('en')"
        class="text-black dark:text-white hover:underline"
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
