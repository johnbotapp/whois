<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="flex w-full max-w-xl flex-col items-start justify-center gap-4 p-4">
      <h1 class="text-center text-4xl font-bold leading-none text-black dark:text-white">Whois</h1>
      <p class="text-left leading-none text-black dark:text-white">{{ $t('index.description') }}</p>
      <div class="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
        <input
          v-model="userId"
          type="text"
          :placeholder="$t('index.input.placeholder')"
          data-form-type="other"
          class="w-full rounded-md border-2 border-black bg-white p-2 text-black focus:outline-none dark:border-white dark:bg-black dark:text-white"
          @keyup.enter="openUser"
        />
        <button
          @click="openUser"
          class="w-full rounded-md border-2 border-black bg-black p-2 px-4 text-white transition duration-150 ease-in-out hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white sm:w-fit"
        >
          {{ $t('index.cta.search') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const userId = ref('');
  const localePath = useLocalePath();

  const openUser = function() {
    if (!userId.value) return;
    return navigateTo(localePath(`/user/${userId.value.toLowerCase()}`));
  };

</script>
