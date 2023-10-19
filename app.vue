<template>
  <div
    id="app"
    class="min-h-[100svh] h-full flex flex-col justify-between"
  >
    <NuxtLoadingIndicator
      :color="colorMode.value === 'dark' ? 'white' : 'black'"
      :throttle="1"
      :duration="2000"
    />
    <Navbar />
    <NuxtPage />
    <Footer />
    <button class="flex fixed bottom-3 right-3 justify-center items-center transition duration-150 ease-in-out rounded-full w-11 h-11 text-white dark:text-black bg-black border-2 border-black dark:bg-white dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white">
      <ColorScheme placeholder="..." tag="span">
        <Sun
          v-if="$colorMode.preference !== 'light' && $colorMode.preference !== 'dark'"
          @click="$colorMode.preference = 'light'"
          class="w-full h-full p-2"
        />
        <Moon
          v-if="$colorMode.preference !== 'dark' && $colorMode.preference !== 'system'"
          @click="$colorMode.preference = 'dark'"
          class="w-full h-full p-2"
        />
        <Monitor
          v-if="$colorMode.preference !== 'system' && $colorMode.preference !== 'light'"
          @click="$colorMode.preference = 'system'"
          class="w-full h-full p-2"
        />
      </ColorScheme>
    </button>
  </div>
</template>

<script setup>
  import { Sun, Moon, Monitor } from 'lucide-vue-next';
  import { transitionManager } from '~/utils/functions.ts';

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
