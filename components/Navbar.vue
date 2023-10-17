<template>
  <NuxtLink
    to="/"
    class="absolute opacity-0 flex justify-center items-start text-black dark:text-white gap-2 px-3 py-2 w-fit pointer-events-none transition duration-150 ease-in-out hover:opacity-100"
    :class="{ 'opacity-75 pointer-events-auto': $route.path !== '/' }"
  >Home
  </NuxtLink>
</template>
