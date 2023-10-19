<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="flex flex-col justify-center items-start gap-4 max-w-xl w-full p-4">
      <h1 class="text-4xl font-bold text-center text-black dark:text-white leading-none">Whois</h1>
      <p class="text-left text-black dark:text-white leading-none">{{ $t('index.description') }}</p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
        <input
          v-model="userId"
          type="text"
          :placeholder="$t('index.input.placeholder')"
          data-form-type="other"
          class="border-2 text-black dark:text-white bg-white dark:bg-black border-black dark:border-white rounded-md p-2 w-full focus:outline-none"
          @keyup.enter="openUser"
        />
        <button
          @click="openUser"
          class="w-full sm:w-fit border-2 border-black bg-black text-white dark:text-black dark:bg-white dark:border-white rounded-md p-2 px-4 hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition duration-150 ease-in-out"
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
