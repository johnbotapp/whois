<template>
  <div
    id="app"
    class="flex h-full min-h-svh flex-col justify-between"
  >
    <NuxtLoadingIndicator
      :color="colorMode.value === 'dark' ? 'white' : 'black'"
      :throttle="1"
      :duration="2000"
    />
    <Navbar />
    <NuxtPage />
    <Footer />
    <button class="fixed bottom-3 right-3 flex size-11 items-center justify-center rounded-full border-2 border-black bg-black text-white transition duration-150 ease-in-out hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
      <ColorScheme
        placeholder="..."
        tag="span"
      >
        <Sun
          v-if="$colorMode.preference !== 'light' && $colorMode.preference !== 'dark'"
          @click="$colorMode.preference = 'light'"
          class="size-full p-2"
        />
        <Moon
          v-if="$colorMode.preference !== 'dark' && $colorMode.preference !== 'system'"
          @click="$colorMode.preference = 'dark'"
          class="size-full p-2"
        />
        <Monitor
          v-if="$colorMode.preference !== 'system' && $colorMode.preference !== 'light'"
          @click="$colorMode.preference = 'system'"
          class="size-full p-2"
        />
      </ColorScheme>
    </button>
  </div>
</template>

<script setup>
  import {
    Sun,
    Moon,
    Monitor
  } from 'lucide-vue-next';
  import {
    transitionManager
  } from '@/utils/functions';

  const colorMode = useColorMode();

  onMounted(() => {
    watch(colorMode, () => {
      const transitions = transitionManager();
      transitions.disable();
      setTimeout(() => {
        transitions.enable();
      }, 0);
    });
  });

</script>
